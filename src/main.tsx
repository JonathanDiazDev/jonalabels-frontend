import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { QuoteProvider } from './context/QuoteContext'
import './index.css'
import { router } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QuoteProvider>
        <RouterProvider router={router} />
      </QuoteProvider>
    </ThemeProvider>
  </StrictMode>,
)
