import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { LegalConsultant, LegalTemplate, LegalService, LegalResource } from '../../types/maritime'
import api from '../../lib/api'
import { deepCamelize } from '../../lib/utils'

const staticTemplates: LegalTemplate[] = [
  {
    id: 'tpl-001',
    name: 'GENCON 2022 – Voyage Charter Party',
    category: 'charterparty',
    description: 'BIMCO standard voyage charter party covering freight, demurrage, laytime calculation, and general maritime terms for bulk cargo shipments.',
    downloadUrl: '#',
    premium: false,
    downloads: 4821,
  },
  {
    id: 'tpl-002',
    name: 'NYPE 2015 – Time Charter Party',
    category: 'charterparty',
    description: 'New York Produce Exchange time charter form with hire, off-hire, redelivery, vessel performance warranty, and BIMCO standard clauses.',
    downloadUrl: '#',
    premium: true,
    downloads: 3102,
  },
  {
    id: 'tpl-003',
    name: 'Notice of Readiness (NOR)',
    category: 'charterparty',
    description: 'Standard NOR template for masters to formally tender readiness to load or discharge, establishing laytime commencement under charter party.',
    downloadUrl: '#',
    premium: false,
    downloads: 2543,
  },
  {
    id: 'tpl-004',
    name: 'CONLINEBILL 2016 – Liner Bill of Lading',
    category: 'bol',
    description: 'BIMCO standard liner bill of lading incorporating Hague-Visby Rules, suitable for containerised and general cargo movements worldwide.',
    downloadUrl: '#',
    premium: false,
    downloads: 6540,
  },
  {
    id: 'tpl-005',
    name: 'Letter of Indemnity (Switch B/L)',
    category: 'bol',
    description: 'P&I Club approved LOI template for release of cargo without original bill of lading or for switching bills of lading mid-voyage.',
    downloadUrl: '#',
    premium: true,
    downloads: 2287,
  },
  {
    id: 'tpl-006',
    name: 'Seaway Bill / Express Release',
    category: 'bol',
    description: 'Non-negotiable transport document for cargo requiring rapid express release without original bill of lading presentation at destination port.',
    downloadUrl: '#',
    premium: false,
    downloads: 1654,
  },
  {
    id: 'tpl-007',
    name: 'NVOCC Service Arrangement (NSA)',
    category: 'nvocc',
    description: 'Confidential service contract between an NVOCC and a shipper setting out rates, service lanes, and commitments per FMC 46 CFR regulations.',
    downloadUrl: '#',
    premium: false,
    downloads: 1893,
  },
  {
    id: 'tpl-008',
    name: 'NVOCC Tariff & Rate Filing',
    category: 'nvocc',
    description: 'Standardised tariff structure and FMC-compliant rate filing document covering surcharges, detention/demurrage, and service scope.',
    downloadUrl: '#',
    premium: true,
    downloads: 1456,
  },
  {
    id: 'tpl-009',
    name: 'OTI Bond Application – NVOCC',
    category: 'nvocc',
    description: 'Ocean Transportation Intermediary surety bond application template for FMC NVOCC licensing, meeting the $75,000 bond requirement.',
    downloadUrl: '#',
    premium: false,
    downloads: 987,
  },
  {
    id: 'tpl-010',
    name: 'ISM & ISPS Compliance Checklist',
    category: 'compliance',
    description: 'Comprehensive vessel audit checklist covering ISM Code, ISPS Code, MLC 2006, and MARPOL requirements for Port State Control inspections.',
    downloadUrl: '#',
    premium: false,
    downloads: 5312,
  },
  {
    id: 'tpl-011',
    name: 'MLC 2006 – Seafarer Employment Agreement',
    category: 'compliance',
    description: 'Maritime Labour Convention compliant employment contract for officers and ratings, including ITF-standard wage scales and repatriation terms.',
    downloadUrl: '#',
    premium: true,
    downloads: 3874,
  },
  {
    id: 'tpl-012',
    name: 'MARPOL Garbage Management Plan',
    category: 'compliance',
    description: 'Vessel Garbage Management Plan template compliant with MARPOL Annex V, covering waste categorisation, handling, and port reception.',
    downloadUrl: '#',
    premium: false,
    downloads: 2198,
  },
  {
    id: 'tpl-013',
    name: 'Norwegian Saleform 2012 (MOA)',
    category: 'contract',
    description: 'Industry-standard Memorandum of Agreement for second-hand vessel sale and purchase, including deposit, inspection, and delivery terms.',
    downloadUrl: '#',
    premium: true,
    downloads: 2019,
  },
  {
    id: 'tpl-014',
    name: 'Port Agency Agreement',
    category: 'contract',
    description: 'Standard port agency appointment covering scope of service, port disbursements, principal liability, and authority of the ship agent.',
    downloadUrl: '#',
    premium: false,
    downloads: 2765,
  },
  {
    id: 'tpl-015',
    name: 'SHIPMAN 2009 – Ship Management Agreement',
    category: 'contract',
    description: 'BIMCO standard ship management agreement for crew, technical, insurance, and commercial management with liability cap provisions.',
    downloadUrl: '#',
    premium: true,
    downloads: 1543,
  },
]

export const fetchLegalData = createAsyncThunk('legalHub/fetchAll', async () => {
  const [consultantsRes, templatesRes, servicesRes, resourcesRes] = await Promise.all([
    api.get('/legal/consultants'),
    api.get('/legal/templates'),
    api.get('/legal/services'),
    api.get('/legal/resources'),
  ])
  return {
    consultants: deepCamelize(consultantsRes.data) as LegalConsultant[],
    templates: deepCamelize(templatesRes.data) as LegalTemplate[],
    services: deepCamelize(servicesRes.data) as LegalService[],
    resources: deepCamelize(resourcesRes.data) as LegalResource[],
  }
})

interface LegalHubState {
  consultants: LegalConsultant[]
  templates: LegalTemplate[]
  services: LegalService[]
  resources: LegalResource[]
  selectedConsultant: LegalConsultant | null
  searchQuery: string
  filterCategory: string
  loading: boolean
  error: string | null
}

const initialState: LegalHubState = {
  consultants: [],
  templates: staticTemplates,
  services: [],
  resources: [],
  selectedConsultant: null,
  searchQuery: '',
  filterCategory: 'all',
  loading: false,
  error: null,
}

const legalHubSlice = createSlice({
  name: 'legalHub',
  initialState,
  reducers: {
    setConsultants: (state, action: PayloadAction<LegalConsultant[]>) => {
      state.consultants = action.payload
    },
    selectConsultant: (state, action: PayloadAction<string>) => {
      state.selectedConsultant = state.consultants.find(c => c.id === action.payload) || null
    },
    clearSelectedConsultant: (state) => {
      state.selectedConsultant = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload
    },
    incrementTemplateDownloads: (state, action: PayloadAction<string>) => {
      const template = state.templates.find(t => t.id === action.payload)
      if (template) {
        template.downloads += 1
      }
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
      .addCase(fetchLegalData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchLegalData.fulfilled, (state, action) => {
        state.loading = false
        state.consultants = action.payload.consultants
        if (action.payload.templates.length > 0) {
          state.templates = action.payload.templates
        }
        state.services = action.payload.services
        state.resources = action.payload.resources
      })
      .addCase(fetchLegalData.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load legal data' })
  },
})

export const {
  setConsultants,
  selectConsultant,
  clearSelectedConsultant,
  setSearchQuery,
  setFilterCategory,
  incrementTemplateDownloads,
  setLoading,
  setError,
} = legalHubSlice.actions

export default legalHubSlice.reducer
