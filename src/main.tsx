import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { QuoteProvider } from './context/QuoteContext'
import './index.css'
import { router } from './App'

if (import.meta.env.MODE === 'development') {
  const whyDidYouRender = (await import('@welldone-software/why-did-you-render')).default
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOnDifferentValues: true,
    include: [/LabelVisualizer/, /QuoteForm/],
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QuoteProvider>
        <RouterProvider router={router} />
      </QuoteProvider>
    </ThemeProvider>
  </StrictMode>,
)
