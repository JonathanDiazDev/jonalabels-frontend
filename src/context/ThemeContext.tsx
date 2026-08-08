import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): boolean {
  const saved = localStorage.getItem('jona-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('jona-theme', isDark ? 'dark' : 'light')
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
