import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SecurityReport, SecurityContact } from '../../types/maritime'
import { dummySecurityReports, dummySecurityContacts } from '../../data/dummyData'

interface SecurityState {
  reports: SecurityReport[]
  contacts: SecurityContact[]
  selectedReport: SecurityReport | null
  loading: boolean
  error: string | null
  submissionSuccess: boolean
}

const initialState: SecurityState = {
  reports: dummySecurityReports,
  contacts: dummySecurityContacts,
  selectedReport: null,
  loading: false,
  error: null,
  submissionSuccess: false,
}

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Omit<SecurityReport, 'id' | 'caseNumber' | 'status' | 'createdAt' | 'updatedAt'>>) => {
      const newReport: SecurityReport = {
        ...action.payload,
        id: `sr${Date.now()}`,
        caseNumber: `${action.payload.agency.toUpperCase()}-MAR-${new Date().getFullYear()}-${String(state.reports.length + 1).padStart(4, '0')}`,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.reports.unshift(newReport)
      state.submissionSuccess = true
    },
    updateReportStatus: (state, action: PayloadAction<{ id: string; status: SecurityReport['status'] }>) => {
      const report = state.reports.find(r => r.id === action.payload.id)
      if (report) {
        report.status = action.payload.status
        report.updatedAt = new Date().toISOString()
      }
    },
    selectReport: (state, action: PayloadAction<string>) => {
      state.selectedReport = state.reports.find(r => r.id === action.payload) || null
    },
    clearSelectedReport: (state) => {
      state.selectedReport = null
    },
    resetSubmissionSuccess: (state) => {
      state.submissionSuccess = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addReport,
  updateReportStatus,
  selectReport,
  clearSelectedReport,
  resetSubmissionSuccess,
  setLoading,
  setError,
} = securitySlice.actions

export default securitySlice.reducer
