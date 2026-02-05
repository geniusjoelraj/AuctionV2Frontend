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
import { NewGame, TeamDetails, Transaction } from "@/types/api"
import { useEffect, useState } from "react"
import { socketService } from "@/socket"
import { formatNumber } from "@/utils/bid"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { getGame } from "@/utils/api"
import { Button } from "./ui/button"
import SetSubstitute from "./SetSubstitute"
import { FiDownload } from 'react-icons/fi'
import { useRouter } from "next/navigation"


export function DataTable({ players, teamDetails, teamName }: { players: Array<Transaction>, teamDetails: TeamDetails, teamName: string }) {
  const [playersData, setPlayersData] = useState<Transaction[]>(players)
  const [team, setTeams] = useState(teamDetails)
  const [bid, setBid] = useState(0)
  const [gameDetails, setGameDetails] = useState<NewGame>()
  const [teamComplete, setTeamComplete] = useState(false)
  const [setTeam, setSetTeam] = useState(false)
  const isAdmin = localStorage.getItem('teamName') === 'admin';
  const router = useRouter()
  useEffect(() => {
    getGame(parseInt(localStorage.getItem('game')!)).then((game) => {
      if (game) {
        setGameDetails(game)
      }
    })
  }, [])

  useEffect(() => {
    if (playersData.length === gameDetails?.playersPerTeam) {
      setTeamComplete(true)
    } else {
      setTeamComplete(false)
    }
  })


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
  }, [team]);

  const validTeam: Transaction[] = [
    { name: "Virat Kohli", playerType: "BATSMAN", boughtFor: 15000000, points: 95, isForeign: false, isLegend: true, isUncapped: false },
    { name: "Steve Smith", playerType: "BATSMAN", boughtFor: 12000000, points: 92, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Joe Root", playerType: "BATSMAN", boughtFor: 10000000, points: 90, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Kane Williamson", playerType: "BATSMAN", boughtFor: 11000000, points: 91, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Jasprit Bumrah", playerType: "BOWLER", boughtFor: 12000000, points: 94, isForeign: false, isLegend: false, isUncapped: false },
    { name: "Pat Cummins", playerType: "BOWLER", boughtFor: 13000000, points: 93, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Kagiso Rabada", playerType: "BOWLER", boughtFor: 9000000, points: 89, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Trent Boult", playerType: "BOWLER", boughtFor: 8000000, points: 88, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Hardik Pandya", playerType: "ALL_ROUNDER", boughtFor: 14000000, points: 90, isForeign: false, isLegend: false, isUncapped: false },
    { name: "Ben Stokes", playerType: "ALL_ROUNDER", boughtFor: 16000000, points: 94, isForeign: true, isLegend: false, isUncapped: false },
    { name: "Ravindra Jadeja", playerType: "ALL_ROUNDER", boughtFor: 10000000, points: 89, isForeign: false, isLegend: false, isUncapped: false },
    { name: "MS Dhoni", playerType: "WICKET_KEEPER", boughtFor: 12000000, points: 88, isForeign: false, isLegend: false, isUncapped: false },
    { name: "Prithvi Shaw", playerType: "BATSMAN", boughtFor: 2000000, points: 75, isForeign: false, isLegend: false, isUncapped: true },
    { name: "Arshdeep Singh", playerType: "BOWLER", boughtFor: 1500000, points: 72, isForeign: false, isLegend: false, isUncapped: false },
    { name: "Shubman Gill", playerType: "BATSMAN", boughtFor: 8000000, points: 85, isForeign: false, isLegend: false, isUncapped: false }
  ];
  return (
    <>
      {!isAdmin ?
        <div className="float-right">Current Bid: <span className="font-semibold text-green-500 text-xl">{formatNumber(bid)}</span></div>
        :
        <></>
      }
      {!setTeam ?
        <div>
          <div className="w-full flex flex-col-reverse md:flex-row ">
            <Table className="flex-1/2">
              {/* <TableCaption>The list of players you have purchased</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Type</TableHead> */}
                  <TableHead>Tags</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playersData.map((player) => (
                  <TableRow key={player.name} >
                    <TableCell>
                      {player.name}
                      <FiDownload className="inline ml-3" onClick={() => router.push(`/card/preview?name=${player.name}`)} />
                      {<Badge variant="secondary"
                        className={'block mt-2 ' +
                          (player.playerType === 'BATSMAN' ? 'border-blue-800 text-blue-800 bg-gray-100 text-[12px]' : '') +
                          (player.playerType === 'BOWLER' ? 'border-green-800 text-green-800 bg-gray-100 text-[12px]' : '') +
                          (player.playerType === 'ALL_ROUNDER' ? 'border-violet-800 text-violet-800 bg-gray-100 text-[12px]' : '') +
                          (player.playerType === 'WICKET_KEEPER' ? 'border-orange-800 text-orange-800 bg-gray-100 text-[12px]' : '')
                        }>
                        {player.playerType}</Badge>}
                    </TableCell>
                    {/* <TableCell>{player.playerType}</TableCell> */}
                    <TableCell>
                      {player.isUncapped && <Badge variant="default">uncapped</Badge>}
                      {player.isForeign && <Badge variant="secondary">foreign</Badge>}
                      {player.isLegend && <Badge variant="destructive" style={{ background: "linear-gradient(135deg, #E5CD6D 0%, #B47B11 100%)" }}>legend</Badge>}
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
            <Accordion type="single" collapsible className="flex-1/2" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Additional details</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 rounded-xl shadow-sm ">
                    <div className="p-2 border-b">Balance: <span className="font-bold text-green-500">₹{formatNumber(team.balance)}</span></div>
                    <div className="p-2 border-b">Spent: <span className="font-bold text-red-500">₹{formatNumber((gameDetails?.initialBalance || 0) - team.balance)}</span></div>

                    <div className="p-2 border-b">Total Points: <span className="font-bold text-yellow-500">{team.points}</span></div>
                    <div className="p-2 border-b">All Rounders: <span className="font-bold">{team.allRounderCount}/{gameDetails?.allRounderPerTeam}</span></div>

                    <div className="p-2 border-b">Batsman: <span className="font-bold">{team.batsmanCount}/{gameDetails?.batsmenPerTeam}</span></div>
                    <div className="p-2 border-b">Bowler: <span className="font-bold">{team.bowlerCount}/{gameDetails?.bowlersPerTeam}</span></div>

                    <div className="p-2 border-b">Uncapped: <span className="font-bold">{team.uncappedCount}/{gameDetails?.unCappedPerTeam}</span></div>
                    <div className="p-2 border-b">Legends: <span className="font-bold">{team.legendsCount}/{gameDetails?.legendsPerTeam}</span></div>

                    <div className="p-2">Wicket Keeper: <span className="font-bold">{team.wicketKeeperCount}/{gameDetails?.wicketKeeperPerTeam}</span></div>
                    <div className="p-2">Player Count: <span className="font-bold">{team.playerCount}/{gameDetails?.playersPerTeam}</span></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button className={!teamComplete || isAdmin ? 'hidden' : ''} onClick={() => setSetTeam(true)} >Set Team</Button>
        </div>
        :
        <SetSubstitute players={players} setSetTeam={setSetTeam} />
      }
    </>
  )
}
