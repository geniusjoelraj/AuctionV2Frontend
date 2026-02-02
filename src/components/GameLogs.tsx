'use client'

import { GameLog } from "@/types/api"
import { getLogs } from "@/utils/api"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function GameLogs() {
  const [logs, setLogs] = useState<GameLog[]>()
  useEffect(() => {
    const gameId = localStorage.getItem('game')
    getLogs(parseInt(gameId!)).then((res) => setLogs(res))
  })
  return (
    <>
      <Table>
        {/* <TableCaption>The list of players you have purchased</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs?.map((log) => (
            <TableRow key={log.time} className={log.transactionType === 'REFUND' ? `bg-secondary` : ''}>
              <TableCell>{log.playerName}</TableCell>
              <TableCell>{log.team}</TableCell>
              <TableCell>{log.transactionType}</TableCell>
              {/* <TableCell>{formatNumber(log.amount)}</TableCell> */}
              <TableCell className="text-right">{log.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
