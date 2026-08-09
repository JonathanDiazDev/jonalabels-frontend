import { useCallback, useRef, useState } from 'react'

const THRESHOLD = 60
const MAX_PULL = 100
const REFRESH_HEIGHT = 48

interface PullToRefreshElements {
  indicatorRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  iconRef: React.RefObject<SVGSVGElement | null>
}

export function usePullToRefresh(
  onRefresh: () => void | Promise<void>,
  { indicatorRef, contentRef, iconRef }: PullToRefreshElements,
) {
  const [refreshing, setRefreshing] = useState(false)
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const startY = useRef(0)
  const pulling = useRef(false)
  const pullDistance = useRef(0)
  const shouldRefreshRef = useRef(false)

  const applyPull = useCallback(
    (value: number, isRefreshing: boolean) => {
      pullDistance.current = value
      const indicator = indicatorRef.current
      const content = contentRef.current
      const icon = iconRef.current
      if (indicator) {
        indicator.style.height = `${isRefreshing ? REFRESH_HEIGHT : value}px`
        indicator.style.opacity = value > 10 || isRefreshing ? '1' : '0'
      }
      if (content) content.style.transform = `translateY(${isRefreshing ? REFRESH_HEIGHT : value}px)`
      if (icon && !isRefreshing) {
        icon.style.transform = `rotate(${Math.min(value / THRESHOLD, 1) * 360}deg)`
      }
      const next = value >= THRESHOLD
      if (next !== shouldRefreshRef.current) {
        shouldRefreshRef.current = next
        setShouldRefresh(next)
      }
    },
    [indicatorRef, contentRef, iconRef],
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (window.scrollY === 0 && !refreshing) {
        startY.current = e.touches[0].clientY
        pulling.current = true
      }
    },
    [refreshing],
  )

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current) return
      const diff = e.touches[0].clientY - startY.current
      if (diff > 0) {
        applyPull(Math.min(diff * 0.5, MAX_PULL), false)
      }
    },
    [applyPull],
  )

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return
    pulling.current = false

    if (pullDistance.current >= THRESHOLD && !refreshing) {
      setRefreshing(true)
      applyPull(REFRESH_HEIGHT, true)
      await onRefresh()
      await new Promise((r) => setTimeout(r, 600))
      setRefreshing(false)
    }
    applyPull(0, false)
  }, [refreshing, onRefresh, applyPull])

  return { refreshing, shouldRefresh, onTouchStart, onTouchMove, onTouchEnd }
}
