'use client'
import { Button } from "@/components/ui/button";
import { EndGameAndFinalize, getLockedIn, getResults } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TeamResult } from "@/types/api";

export default function page() {
  const [lockedTeam, setLockedTeam] = useState(0)
  const [game, setGame] = useState<number>()
  const router = useRouter()
  const [gameEnd, setGameEnd] = useState(false)
  const [results, setReults] = useState<TeamResult[]>()

  useEffect(() => {
    const id = parseInt(localStorage.getItem('game')!)
    setGame(id)
  })

  const handleLockedIn = () => {
    getLockedIn(game!).then((data) => {
      setLockedTeam(data.LockedInTeams)
    })
  }
  const handleEndGame = () => {
    // try {
    //   EndGameAndFinalize(game!).then((data) => {
    //     setReults(data)
    //   })
    // } catch (err) {
    getResults(game!).then((data) => {
      setReults(data)
    })
  }


  return <div className="flex w-screen h-screen justify-center items-center flex-col">
    <p className="text-4xl m-5">Game ended</p>
    <Button onClick={handleLockedIn}>Get Locked In</Button>
    <p>{lockedTeam.toString()}</p>
    <Button onClick={handleEndGame}>Show Results</Button>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results?.map((result) =>
          <TableRow key={result.place} >
            <TableCell>{result.place}</TableCell>
            <TableCell className={!result.isQualified ? 'text-red-500' : ''}>{result.teamStats.name}</TableCell>
            <TableCell>{result.teamStats.balance}</TableCell>
            <TableCell>{result.teamStats.points}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
}
