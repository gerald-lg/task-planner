import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import { Toast } from '@planner/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toast.Root>
      <App />
    </Toast.Root>
  </StrictMode>,
)
