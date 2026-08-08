export default function RouteSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8" role="status" aria-label="Cargando contenido">
      <div className="mb-10 animate-pulse">
        <div className="mb-3 h-3 w-24 rounded-full bg-stone-200 dark:bg-stone-700" />
        <div className="h-8 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-700 sm:w-1/2" />
        <div className="mt-4 h-4 w-full max-w-xl rounded-lg bg-stone-100 dark:bg-stone-800" />
        <div className="mt-2 h-4 w-2/3 max-w-md rounded-lg bg-stone-100 dark:bg-stone-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-stone-100 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
            <div className="mb-4 h-28 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700" />
            <div className="mb-3 h-4 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-700" />
            <div className="mb-2 h-3 w-full rounded-lg bg-stone-100 dark:bg-stone-800" />
            <div className="h-3 w-5/6 rounded-lg bg-stone-100 dark:bg-stone-800" />
            <div className="mt-5 h-9 w-32 rounded-full bg-brand-orange/15 dark:bg-brand-orange/20" />
          </div>
        ))}
      </div>
    </div>
  )
}
