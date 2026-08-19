import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type LabelType = 'SATIN' | 'COLGANTE'

export type GarmentZoneKey =
  | 'cuello_playera'
  | 'dobladillo_sudadera'
  | 'cuello_negro'
  | 'colgante_1'
  | 'colgante_2'
  | 'colgante_3'
  | 'colgante_4'

const ZONE_DEFAULTS: Record<LabelType, GarmentZoneKey> = {
  SATIN: 'cuello_playera',
  COLGANTE: 'colgante_1',
}

interface QuoteContextValue {
  labelType: LabelType
  garmentZone: GarmentZoneKey
  logoFile: File | null
  setLabelType: (type: LabelType) => void
  setGarmentZone: (zone: GarmentZoneKey) => void
  setLogoFile: (file: File | null) => void
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [labelType, setLabelType] = useState<LabelType>('SATIN')
  const [garmentZone, setGarmentZone] = useState<GarmentZoneKey>(ZONE_DEFAULTS.SATIN)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const handleSetLabelType = useCallback((type: LabelType) => {
    setLabelType(type)
    setGarmentZone(ZONE_DEFAULTS[type])
  }, [])
  const handleSetGarmentZone = useCallback((zone: GarmentZoneKey) => setGarmentZone(zone), [])
  const handleSetLogoFile = useCallback((file: File | null) => setLogoFile(file), [])

  const value = useMemo(
    () => ({ labelType, garmentZone, logoFile, setLabelType: handleSetLabelType, setGarmentZone: handleSetGarmentZone, setLogoFile: handleSetLogoFile }),
    [labelType, garmentZone, logoFile, handleSetLabelType, handleSetGarmentZone, handleSetLogoFile],
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
