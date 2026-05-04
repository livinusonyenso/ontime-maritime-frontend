import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { SecurityReport, SecurityContact } from '../../types/maritime'
import api from '../../lib/api'
import { deepCamelize } from '../../lib/utils'

export const fetchSecurityData = createAsyncThunk('security/fetchAll', async () => {
  const [reportsRes, contactsRes] = await Promise.all([
    api.get('/security/reports'),
    api.get('/security/contacts'),
  ])
  return {
    reports: deepCamelize(reportsRes.data) as SecurityReport[],
    contacts: deepCamelize(contactsRes.data) as SecurityContact[],
  }
})

interface SecurityState {
  reports: SecurityReport[]
  contacts: SecurityContact[]
  selectedReport: SecurityReport | null
  loading: boolean
  error: string | null
  submissionSuccess: boolean
}

const initialState: SecurityState = {
  reports: [],
  contacts: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecurityData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchSecurityData.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload.reports
        state.contacts = action.payload.contacts
      })
      .addCase(fetchSecurityData.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load security data' })
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
