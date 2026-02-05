'use client'
import { useSearchParams } from "next/navigation"

export default function CardPreview() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  return <div>Hello {name}</div>
}
