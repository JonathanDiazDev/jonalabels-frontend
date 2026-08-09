import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

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

  const handleSetLabelType = useCallback((type: LabelType) => setLabelType(type), [])
  const handleSetLogoFile = useCallback((file: File | null) => setLogoFile(file), [])

  const value = useMemo(
    () => ({ labelType, logoFile, setLabelType: handleSetLabelType, setLogoFile: handleSetLogoFile }),
    [labelType, logoFile, handleSetLabelType, handleSetLogoFile],
  )

  return (
    <QuoteContext.Provider value={value}>
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
