import http from '../../lib/axios'

const MATERIAL_PRODUCT_MAP: Record<string, number> = {
  SATEN: 1,
  DAMASCO: 2,
  ALGODON: 3,
}

export interface IPedidoResponse {
  id: number
  usuarioId: number
  productoId: number
  disenoId: number
  tallerId: number | null
  estado: string
  cantidad: number
  precioFinalCotizado: number | null
  costoTallerAcordado: number | null
  comentariosAdmin: string | null
  urlDiseno: string | null
  fechaCreacion: string
  fechaActualizacion: string
}

export function getProductoIdByMaterial(tipo: string): number {
  const id = MATERIAL_PRODUCT_MAP[tipo]
  if (!id) {
    throw new Error(`Tipo de material no válido: ${tipo}`)
  }
  return id
}

export async function crearPedido(formData: FormData): Promise<IPedidoResponse> {
  const { data } = await http.post<IPedidoResponse>('/pedidos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
