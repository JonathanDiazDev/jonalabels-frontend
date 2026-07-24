import '@testing-library/jest-dom/vitest'

class MockIntersectionObserver {
  constructor(_: IntersectionObserverCallback, __?: IntersectionObserverInit) {}

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
