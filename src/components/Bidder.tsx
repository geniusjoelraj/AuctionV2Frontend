'use client'
import { Player } from "@/types/api";
import { purchasePlayer, refundPlayer } from "@/utils/api";
import { teams } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function Bidder({ player, finalBid }: { player: Player, finalBid: number }) {
  const [gameId, setGameId] = useState(0)
  useEffect(() => {
    const id = parseInt(localStorage.getItem('game')!);
    setGameId(id)
  })
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-3 bg-blue-500 p-4 w-72">
      {teams.map((team) => <div key={team} className="bg-blue-400 p-3 rounded-sm hover:bg-blue-600" onClick={() => { purchasePlayer(team, player.id, finalBid, gameId) }}>{team}</div>)}
      <div className="bg-red-500 p-2 rounded-md hover:bg-red-400 cursor-pointer col-span-2 text-center" onClick={() => refundPlayer(player.id, gameId)}>refund</div>
    </div>
  )
}
