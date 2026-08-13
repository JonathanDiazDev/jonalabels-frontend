import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): boolean {
  // Light by default on first visit — do not mirror OS dark mode (common on mobile).
  return localStorage.getItem('jona-theme') === 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('jona-theme', isDark ? 'dark' : 'light')
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', isDark ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0c0a09' : '#fafaf9')
  }, [isDark])

  const toggle = useCallback(() => setIsDark((prev) => !prev), [])

  const value = useMemo(() => ({ isDark, toggle }), [isDark, toggle])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
