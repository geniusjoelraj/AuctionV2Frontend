'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TeamDetails, Transaction } from "@/types/api"
import { useEffect, useState } from "react"
import { socket } from "@/socket"


export function DataTable({ players, teamDetails }: { players: Array<Transaction>, teamDetails: TeamDetails }) {
  const [playersData, setPlayersData] = useState(players)
  const [team, setTeams] = useState(teamDetails)

  useEffect(() => {
    const handlePurchase = (newPlayer: Transaction) => {
      console.log(newPlayer);
      // const newPlayersData = [...playersData, newPlayer]
      // setPlayersData(newPlayersData)
    }

    socket.on("purchase", handlePurchase)
    return () => {
      socket.off("purchase", handlePurchase)
    }
  }, [setPlayersData])
  return (
    <>
      <Table>
        <TableCaption>The list of players you have purchased</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capped</TableHead>
            <TableHead>Points</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playersData.map((player) => (
            <TableRow key={player.name}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.playerType}</TableCell>
              <TableCell>{player.isUncapped ? <Badge variant="default" >uncapped</ Badge> : null}{player.isForeign ? <Badge variant="secondary" >foreign</ Badge> : null}</TableCell>
              <TableCell>{player.points}</TableCell>
              <TableCell className="text-right">{player.boughtFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{playersData.reduce((acc, curr) => acc + curr.points, 0)}</TableCell>
            <TableCell className="text-right">{playersData.reduce((acc, curr) => acc + curr.boughtFor, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="text-center mt-10">Additional details</p>
      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl shadow-sm">
        <div className="p-2 border-b">Balance: <span className="font-bold">₹{team.balance.toFixed(2)}</span></div>
        <div className="p-2 border-b">Spent: <span className="font-bold">₹{(10000000 - team.balance).toFixed(2)}</span></div>

        <div className="p-2 border-b">Total Points: <span className="font-bold">{team.points}</span></div>
        <div className="p-2 border-b">All Rounders: <span className="font-bold">{team.allRounderCount}</span></div>

        <div className="p-2 border-b">Batsman: <span className="font-bold">{team.batsmanCount}</span></div>
        <div className="p-2 border-b">Bowler: <span className="font-bold">{team.bowlerCount}</span></div>

        <div className="p-2">Wicket Keeper: <span className="font-bold">{team.wicketKeeperCount}</span></div>
        <div className="p-2">Player Count: <span className="font-bold">{team.playerCount}</span></div>
      </div>
    </>
  )
}
