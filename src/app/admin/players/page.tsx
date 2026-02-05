'use client'
import { MasterDataTable } from "@/components/MasterPlayersTable";
import { Player, Transaction } from "@/types/api";
import { fetchPlayers } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Players() {
  const [players, setPlayers] = useState<Player[]>()
  useEffect(() => {
    const gameId = localStorage.getItem('game')!
    fetchPlayers(parseInt(gameId)).then((data) => {
      if (data) {
        setPlayers(data)
      }
    })
  })
  return (
    <>
    </>
  )
}
