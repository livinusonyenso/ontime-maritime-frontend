"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notif: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Dummy notifications
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Shipment Update",
    message: "Your shipment OM-2024-001 has cleared customs",
    type: "success",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    title: "Auction Ending Soon",
    message: "Container Slot - Shanghai to LA auction ends in 2 hours",
    type: "warning",
    timestamp: new Date().toISOString(),
    read: false,
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications)

  const addNotification = (notif: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotif, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
