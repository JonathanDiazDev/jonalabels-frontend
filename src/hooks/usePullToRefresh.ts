import { useCallback, useRef, useState } from 'react'

const THRESHOLD = 60
const MAX_PULL = 100

export function usePullToRefresh(onRefresh: () => void | Promise<void>) {
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const pulling = useRef(false)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0 && !refreshing) {
      startY.current = e.touches[0].clientY
      pulling.current = true
    }
  }, [refreshing])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling.current) return
    const diff = e.touches[0].clientY - startY.current
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, MAX_PULL))
    }
  }, [])

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return
    pulling.current = false

    if (pullDistance >= THRESHOLD && !refreshing) {
      setRefreshing(true)
      setPullDistance(THRESHOLD)
      await onRefresh()
      await new Promise((r) => setTimeout(r, 600))
      setRefreshing(false)
    }
    setPullDistance(0)
  }, [pullDistance, refreshing, onRefresh])

  const shouldRefresh = pullDistance >= THRESHOLD && !refreshing

  return { pullDistance, refreshing, shouldRefresh, onTouchStart, onTouchMove, onTouchEnd }
}
