import { Suspense } from 'react'
import HomeClient from './home-client'

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-600">Loading…</div>}>
      <HomeClient />
    </Suspense>
  )
}
