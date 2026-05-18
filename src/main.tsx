import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from '@/App.tsx'
import { ToastDisplay } from './planner/components/shared/toast/parts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastDisplay />
    <App />
  </StrictMode>,
)
