'use client'
import { Player } from "@/types/api";
import { purchasePlayer, refundPlayer } from "@/utils/api";
import { teams } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function Bidder({ player, finalBid }: { player: Player, finalBid: number }) {
  const [gameId, setGameId] = useState(0)

  useEffect(() => {
    const id = parseInt(localStorage.getItem('game')!);
    setGameId(id)
  })
  const logos = ["/logos/Chennai-Super-Kings.png", "/logos/Delhi-Capitals-Logo.png", "/logos/Gujarat-Titans-Logo.png", "/logos/Kolkata-Knight-Riders.png", "/logos/Lucknow-Super-Giants-Logo.png", "/logos/Mumbai-Indians.png", "/logos/Punjab-Kings-Logo.png", "/logos/Rajasthan-Royals-Logo.png", "/logos/Royal-Challengers-Bengaluru.png", "/logos/Sunrisers-Hyderabad.png"]
  return (
    <div className="grid grid-cols-2 grid-rows-5 gap-3 p-4 scale-105" >
      {teams.map((team, ind) => (
        <button
          key={team}
          className="glass-btn p-3 pl-1 text-xl font-semibold rounded-sm w-full"
          onClick={() => purchasePlayer(team, player.id, finalBid, gameId)}
        >
          {/* <div className="absolute top-0 right-1 text-sm text-gray-50">{ind === 9 ? 0 : ind + 1}</div> */}
          <img src={logos[ind]} alt={team} className="inline -m-2" width={90} />
          {team}
        </button>
      ))}
      <button className="bg-red-500 p-2 rounded-md hover:bg-red-400 cursor-pointer col-span-2 text-center red-glass-btn" onClick={() => refundPlayer(player.id, gameId)}>refund</button>
    </div>
  )
}
