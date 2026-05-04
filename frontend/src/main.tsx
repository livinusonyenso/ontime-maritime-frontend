import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { GlobalSEO } from './seo'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <GlobalSEO />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
