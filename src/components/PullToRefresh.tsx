import { type ReactNode } from 'react'
import { usePullToRefresh } from '../hooks/usePullToRefresh'

interface Props {
  onRefresh: () => void | Promise<void>
  children: ReactNode
}

export default function PullToRefresh({ onRefresh, children }: Props) {
  const { pullDistance, refreshing, shouldRefresh, onTouchStart, onTouchMove, onTouchEnd } =
    usePullToRefresh(onRefresh)

  const progress = Math.min(pullDistance / 60, 1)
  const showIndicator = pullDistance > 10 || refreshing

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-screen"
    >
      <div
        className="absolute left-0 right-0 top-0 z-50 flex items-center justify-center overflow-hidden transition-none"
        style={{ height: refreshing ? 48 : pullDistance }}
      >
        {(showIndicator || refreshing) && (
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-5 w-5 text-stone-400 transition-transform ${
                refreshing ? 'animate-spin' : ''
              }`}
              style={!refreshing ? { transform: `rotate(${progress * 360}deg)` } : undefined}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <span className="text-xs text-stone-400">
              {refreshing ? 'Actualizando...' : shouldRefresh ? 'Soltar para actualizar' : 'Desliza para actualizar'}
            </span>
          </div>
        )}
      </div>

      <div
        className="transition-transform"
        style={{ transform: `translateY(${refreshing ? 48 : pullDistance}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
