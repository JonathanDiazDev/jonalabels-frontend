import { createContext, useContext, useState, type ReactNode } from 'react'

export type LabelType = 'SATIN' | 'COLGANTE'

interface QuoteContextValue {
  labelType: LabelType
  logoFile: File | null
  setLabelType: (type: LabelType) => void
  setLogoFile: (file: File | null) => void
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [labelType, setLabelType] = useState<LabelType>('SATIN')
  const [logoFile, setLogoFile] = useState<File | null>(null)

  return (
    <QuoteContext.Provider value={{ labelType, logoFile, setLabelType, setLogoFile }}>
      {children}
    </QuoteContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) throw new Error('useQuote debe usarse dentro de QuoteProvider')
  return context
}
