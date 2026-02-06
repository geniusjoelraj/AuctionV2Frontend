'use client'
import PlayerCard from "@/components/PlayerCard"
import { Player } from "@/types/api"
import { fetchPlayer } from "@/utils/api"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CardPreview() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const [player, setPlayer] = useState<Player>()
  useEffect(() => {
    const gameId = localStorage.getItem('game')
    if (gameId && name) {
      console.log(gameId, name);
      fetchPlayer(parseInt(gameId), name).then(data => setPlayer(data))
    }
  })

  return <div className="flex w-full justify-center h-screen bg-[url(https://i.pinimg.com/736x/59/97/87/599787dcbb631c69e37a2b369b491ba3.jpg)] md:bg-[url(/ipl-stadium-bg.png)] md:bg-top bg-cover bg-center pb-15 items-center">
    <div className="">
      {player ? <PlayerCard player={player} downloadable={true} /> : <></>}
    </div>
  </div>
}
