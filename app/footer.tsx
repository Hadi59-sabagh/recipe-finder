// app/footer.tsx
'use client'

import { useEffect, useState } from 'react'

export function Footer() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-orange-100 text-center text-sm text-gray-600 py-4 mt-8">
      © {year ?? '----'} Recipe Finder
    </footer>
  )
}
