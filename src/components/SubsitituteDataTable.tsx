"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { formatNumber, substituteCheck } from "@/utils/bid"
import { PlayerSelection, TeamSelection, Transaction } from "@/types/api"
import { Button } from "./ui/button"
import { toast, ToastContainer } from "react-toastify"
import { fetchSelection, finalizeGame, getLockedIn, LockInSelection } from "@/utils/api"
import Image from "next/image"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function SubstituteDataTable<TData extends Transaction, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})

  const [message, setMessage] = useState<string>('')
  const [isValid, setIsValid] = useState(true)
  const [teamFinal, setTeamFinal] = useState(false)
  const [gameId, setGameId] = useState<number>()
  const [teamName, setTeamName] = useState<string>('')
  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
  })

  const allPlayers: Transaction[] = table.getRowModel().rows.map(row => row.original);
  const selectedRowsData: Transaction[] = table.getFilteredSelectedRowModel().rows.map(row => row.original);
  const [teamPlayers, setTeamPlayers] = useState<Transaction[]>()
  const [keepers, setKeepers] = useState<PlayerSelection[]>()
  const [batsmen, setBatsmen] = useState<PlayerSelection[]>()
  const [bowlers, setBowlers] = useState<PlayerSelection[]>()
  const [allRounders, setALlRounders] = useState<PlayerSelection[]>()
  const [lockedIn, setLockedIn] = useState(false)
  const [finalTeam, setFinalTeam] = useState<TeamSelection>()
  const finalizeTeam = () => {
    const teamP: Transaction[] = allPlayers.filter((player) => !selectedRowsData.includes(player))
    const subs = allPlayers.filter((player) => selectedRowsData.includes(player)).map((player) => player.playerId)
    LockInSelection(gameId!, teamName, subs)
    const game = parseInt(localStorage.getItem('game')!)
    const team = localStorage.getItem('teamName')
    fetchSelection(game, team!).then((data) => {
      setFinalTeam(data)
    })
    const keep = finalTeam?.finalTeam.filter((player) => player.type === 'WICKET_KEEPER')
    const bats = finalTeam?.finalTeam.filter((player) => player.type === 'BATSMAN')
    const bowls = finalTeam?.finalTeam.filter((player) => player.type === 'BOWLER')
    const all = finalTeam?.finalTeam.filter((player) => player.type === 'ALL_ROUNDER')
    setKeepers(keep)
    setBatsmen(bats)
    setBowlers(bowls)
    setALlRounders(all)
    setTeamPlayers(teamP)
    setTeamFinal(true)
    setLockedIn(true)
  }
  useEffect(() => {
    setGameId(parseInt(localStorage.getItem('game')!))
    setTeamName(localStorage.getItem('teamName')!)
    substituteCheck(selectedRowsData, allPlayers, setMessage, setIsValid)
  }, [selectedRowsData])

  useEffect(() => {
    const game = parseInt(localStorage.getItem('game')!)
    const team = localStorage.getItem('teamName')
    getLockedIn(game).then((data) => {
      setLockedIn(data?.lockedInTeams?.includes(team))
    })
    fetchSelection(game, team!).then((data) => {
      const keep = data?.finalTeam.filter((player) => player.type === 'WICKET_KEEPER')
      const bats = data?.finalTeam.filter((player) => player.type === 'BATSMAN')
      const bowls = data?.finalTeam.filter((player) => player.type === 'BOWLER')
      const all = data?.finalTeam.filter((player) => player.type === 'ALL_ROUNDER')
      setFinalTeam(data)
      setKeepers(keep)
      setBatsmen(bats)
      setBowlers(bowls)
      setALlRounders(all)
    })
  }, [])


  function shorten(text: string) {
    const n = text.split(' ').length - 1
    const words = text.split(/\s+/);
    return words.map((w, i) => i < n ? w[0] : w).join(' ');
  }
  return (
    <>
      {teamFinal || lockedIn ?
        <div className="h-screen w-screen absolute bg-[url(/field.png)] bg-center bg-cover md:bg-contain bg-no-repeat bg-black top-0 left-0 flex items-center flex-col gap-5 p-4 justify-center text-sm font-semibold">
          <p className="text-2xl">Total Points: {finalTeam?.teamStats.points}</p>
          <div className="flex flex-col items-center">
            WICKET KEEPERS
            <div className="flex gap-2">
              <>
                {keepers?.map((keeper) => {
                  return <div className="flex justify-center flex-col w-fit items-center text-base/5" key={keeper.name}>
                    <Image
                      src={'/players_images/' + keeper?.name.toString() + '.png'}
                      alt={keeper.name}
                      width={70}
                      height={100}
                    />
                    <p className="bg-white rounded-xs inline text-black text-center px-2">{shorten(keeper.name)}</p>
                    <p>{formatNumber(keeper.boughtFor)}</p>
                  </div>
                })}
              </>
            </div>
          </div>
          <div className="flex flex-col items-center">
            BOWLERS
            <div className="flex gap-3">
              <>
                {bowlers?.map((player) => {
                  return <div className="flex justify-center flex-col w-fit items-center text-base/5" key={player.name}>
                    <img src={'/players_images/' + player?.name.toString() + '.png'} alt={player.name} width={70} />
                    <p className="bg-white rounded-xs inline text-black text-center px-2 text-nowrap">{shorten(player.name)}</p>
                    <p>{formatNumber(player.boughtFor)}</p>
                  </div>
                })}
              </>
            </div>
          </div>
          <div className="flex flex-col items-center">
            BATSMEN
            <div className="flex gap-3">
              <>
                {batsmen?.map((player) => {
                  return <div className="flex justify-center flex-col w-fit items-center text-base/5" key={player.name}>
                    <img src={'/players_images/' + player?.name.toString() + '.png'} alt={shorten(player.name)} width={70} />
                    <p className="bg-white rounded-xs inline text-black text-center px-2">{shorten(player.name)}</p>
                    <p>{formatNumber(player.boughtFor)}</p>
                  </div>
                })}
              </>
            </div>
          </div>

          <div className="flex flex-col items-center">
            ALL ROUNDERS
            <div className="flex gap-3">
              <>
                {allRounders?.map((player) => {
                  return <div className="flex justify-center flex-col w-fit items-center text-base/5" key={player.name}>
                    <img src={'/players_images/' + player?.name.toString() + '.png'} alt={player.name} width={70} />
                    <p className="bg-white rounded-xs inline text-black text-center px-2">{shorten(player.name)}</p>
                    <p>{formatNumber(player.boughtFor)}</p>
                  </div>
                })}
              </>
            </div>
          </div>
        </div>
        :
        <div className="overflow-hidden rounded-md border">
          <div className={`flex text-lg p-3 text-center justify-between items-center ${isValid ? 'text-green-400' : 'text-red-400'}`}>
            <span>
              {message}
            </span>
            <Button
              disabled={!isValid}
              className={!isValid ? 'text-gray-70 border-2' : ''}
              variant={isValid ? 'default' : 'ghost'}
              onClick={finalizeTeam}>
              Finalize Team
            </Button>
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => row.toggleSelected()}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
        </div>
      }
    </>
  )
}
