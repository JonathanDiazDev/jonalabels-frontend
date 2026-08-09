import { type ReactNode, useRef } from 'react'
import { usePullToRefresh } from '../hooks/usePullToRefresh'

interface Props {
  onRefresh: () => void | Promise<void>
  children: ReactNode
}

export default function PullToRefresh({ onRefresh, children }: Props) {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  const { refreshing, shouldRefresh, onTouchStart, onTouchMove, onTouchEnd } =
    usePullToRefresh(onRefresh, { indicatorRef, contentRef, iconRef })

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-screen"
    >
      <div
        ref={indicatorRef}
        className="pointer-events-none absolute left-0 right-0 top-0 z-50 flex items-center justify-center overflow-hidden opacity-0"
        style={{ height: 0 }}
      >
        <div className="flex items-center gap-2">
          <svg
            ref={iconRef}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`h-5 w-5 text-stone-400 ${refreshing ? 'animate-spin' : ''}`}
          >
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
          <span className="text-xs text-stone-400">
            {refreshing ? 'Actualizando...' : shouldRefresh ? 'Soltar para actualizar' : 'Desliza para actualizar'}
          </span>
        </div>
      </div>

      <div ref={contentRef} className="transition-transform">
        {children}
      </div>
    </div>
  )
}
