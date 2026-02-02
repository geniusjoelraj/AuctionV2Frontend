'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TeamDetails, Transaction } from "@/types/api"
import { useEffect, useState } from "react"
import { socketService } from "@/socket"
import { formatNumber } from "@/utils/bid"


export function DataTable({ players, teamDetails, teamName }: { players: Array<Transaction>, teamDetails: TeamDetails, teamName: string }) {
  const [playersData, setPlayersData] = useState<Transaction[]>(players)
  const [team, setTeams] = useState(teamDetails)
  const [bid, setBid] = useState(0)


  useEffect(() => {
    socketService.connect(() => {
      const gameId = parseInt(localStorage.getItem('game')!);
      const subPurchase = socketService.subscribe(
        `/topic/game/${gameId}/purchases/${teamName}`,
        (data) => setPlayersData(prev => [...prev, data.payload])
      );

      const subRefund = socketService.subscribe(
        `/topic/game/${gameId}/refunds/${teamName}`,
        (data) => setPlayersData(prev => prev.filter((p) => p.name !== data.payload.playerName))
      );

      const subTeam = socketService.subscribe(
        `/topic/game/${gameId}/team/${teamName}`,
        (data) => setTeams(data.payload)
      );

      const subBids = socketService.subscribe(
        `/topic/game/${gameId}/bids`,
        (data) => setBid(data.payload.currentBid)
      );

      return () => {
        subPurchase?.unsubscribe();
        subRefund?.unsubscribe();
        subTeam?.unsubscribe();
        subBids?.unsubscribe();
      };
    });
  }, [teamName]);

  return (
    <>
      <div className="">Current Bid: {formatNumber(bid)}</div>
      <Table>
        {/* <TableCaption>The list of players you have purchased</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Points</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playersData.map((player) => (
            <TableRow key={player.name} className={player.isForeign ? `bg-secondary` : ''}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.playerType}</TableCell>
              <TableCell>
                {player.isUncapped && <Badge variant="default">uncapped</Badge>}
                {player.isForeign && <Badge variant="secondary">foreign</Badge>}
              </TableCell>
              <TableCell>{player.points}</TableCell>
              <TableCell className="text-right">{formatNumber(player.boughtFor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{playersData.reduce((acc, curr) => acc + curr.points, 0)}</TableCell>
            <TableCell className="text-right">{formatNumber(playersData.reduce((acc, curr) => acc + curr.boughtFor, 0))}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center mt-10 font-bold">Additional details</p>
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl shadow-sm ">
          <div className="p-2 border-b">Balance: <span className="font-bold">₹{formatNumber(team.balance)}</span></div>
          <div className="p-2 border-b">Spent: <span className="font-bold">₹{formatNumber(100000000 - team.balance)}</span></div>

          <div className="p-2 border-b">Total Points: <span className="font-bold">{team.points}</span></div>
          <div className="p-2 border-b">All Rounders: <span className="font-bold">{team.allRounderCount}</span></div>

          <div className="p-2 border-b">Batsman: <span className="font-bold">{team.batsmanCount}</span></div>
          <div className="p-2 border-b">Bowler: <span className="font-bold">{team.bowlerCount}</span></div>

          <div className="p-2">Wicket Keeper: <span className="font-bold">{team.wicketKeeperCount}</span></div>
          <div className="p-2">Player Count: <span className="font-bold">{team.playerCount}</span></div>
        </div>
      </div>
    </>
  )
}
