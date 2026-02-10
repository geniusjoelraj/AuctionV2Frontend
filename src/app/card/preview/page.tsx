'use client'

import PlayerCard from "@/components/PlayerCard"
import { Player } from "@/types/api"
import { fetchPlayer } from "@/utils/api"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

function CardPreviewContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const gameId = typeof window !== 'undefined' ? localStorage.getItem('game') : null

    if (gameId && name) {
      setLoading(true)
      fetchPlayer(parseInt(gameId), name)
        .then((data) => setPlayer(data))
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [name])

  if (loading) return <div className="text-white">Loading Card...</div>
  if (!name) return <div className="text-white">No player name provided in URL.</div>
  if (!player) return <div className="text-white">Player data not found.</div>

  return <PlayerCard player={player} downloadable={true} />
}

export default function CardPreview() {
  return (
    <div className="flex w-full justify-center h-screen bg-[url(/bg-phone-stadium.jpg)] md:bg-[url(/ipl-stadium-bg.png)] md:bg-top bg-cover bg-center pb-0 items-center">
      <div className="">
        <Suspense fallback={<div className="text-white">Initialising...</div>}>
          <CardPreviewContent />
        </Suspense>
      </div>
    </div>
  )
}
