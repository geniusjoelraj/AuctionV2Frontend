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
import { formatNumber } from "@/utils/bid";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function page() {
  const [lockedTeam, setLockedTeam] = useState<{ lockedInCount: number, lockedInTeams: string[] }>()
  const [game, setGame] = useState<number>()
  const [results, setReults] = useState<TeamResult[]>()

  useEffect(() => {
    const id = parseInt(localStorage.getItem('game')!)
    setGame(id)
    handleLockedIn()
    handleEndGame()
  }, [])

  const handleLockedIn = () => {
    if (game) {
      getLockedIn(game!).then((data) => {
        setLockedTeam(data)
      })
    }
  }
  const handleEndGame = () => {
    if (game) {
      EndGameAndFinalize(game!).then((data) => {
        if (data.length > 0) {
          setReults(data)
        }
      })
    }
  }

  return (
    <div className="p-10">
      <Header />
      <div className="flex w-screen justify-center items-center flex-col">
        <p className="text-4xl m-5">Game ended</p>
        <Button onClick={handleLockedIn}>Get Locked In</Button>
        <p>{lockedTeam?.lockedInCount ?? 0}</p>
        <div className="flex gap-3">
          {lockedTeam?.lockedInTeams?.map(team => <p key={team}>{team}</p>)}
        </div>
        <Button onClick={handleEndGame}>End game and show results</Button>
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
                <TableCell>{formatNumber(result.teamStats.balance)}</TableCell>
                <TableCell>{result.teamStats.points}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>)
}
