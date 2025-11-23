import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Notification, NotificationType } from '../types'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
  createNotification: (data: {
    user_id: string
    type: NotificationType
    title: string
    body: string
  }) => Promise<Notification>
  getMyNotifications: (skip?: number, take?: number) => Promise<Notification[]>
  getNotificationDetails: (id: string) => Promise<Notification>
  markAsSent: (id: string) => Promise<Notification>
  markAsFailed: (id: string) => Promise<Notification>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createNotification = async (data: {
    user_id: string
    type: NotificationType
    title: string
    body: string
  }): Promise<Notification> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/notifications', data)
      const newNotification = response.data

      setNotifications((prev) => [newNotification, ...prev])
      setUnreadCount((prev) => prev + 1)
      return newNotification
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create notification'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyNotifications = async (skip = 0, take = 20): Promise<Notification[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/notifications/my-notifications', {
        params: { skip, take },
      })
      const data = response.data

      setNotifications(data)
      
      // Count pending notifications as unread
      const pending = data.filter((n: Notification) => n.status === 'pending').length
      setUnreadCount(pending)
      
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch notifications'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getNotificationDetails = async (id: string): Promise<Notification> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/notifications/${id}`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch notification details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const markAsSent = async (id: string): Promise<Notification> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/notifications/${id}/sent`)
      const updatedNotification = response.data

      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? updatedNotification : notif))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
      
      return updatedNotification
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to mark notification as sent'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const markAsFailed = async (id: string): Promise<Notification> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/notifications/${id}/failed`)
      const updatedNotification = response.data

      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? updatedNotification : notif))
      )
      
      return updatedNotification
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to mark notification as failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        createNotification,
        getMyNotifications,
        getNotificationDetails,
        markAsSent,
        markAsFailed,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
