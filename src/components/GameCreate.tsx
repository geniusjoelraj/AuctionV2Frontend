'use client'

import { Game, NewGame } from "@/types/api"
import { createGame, getGames, startGame } from "@/utils/api"
import { Button, Input } from "@base-ui/react"
import { Label } from "@radix-ui/react-label"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function GameCreate() {
  const [gameId, setGameId] = useState<string>('')
  const [gameInitialAmount, setGameInitialAmount] = useState<string>('')
  const [gameName, setGameName] = useState<string>('')
  const [gamesList, setGamesList] = useState<Game[]>()
  const router = useRouter()
  const [playerLimits, setPlayerLimits] = useState({
    total: ',',
    batsmen: '',
    bowler: '',
    allrounder: '',
    keeper: '',
    uncapped: '',
    legends: '',
    special: '',
    substitute: '',
    foreign: ''
  })
  const [trigger, setTrigger] = useState(false)

  const [isJoin, setIsJoin] = useState<boolean>(true)
  const handleCreateGame = async (e: React.FormEvent) => {
    const newGame: NewGame = {
      setId: 1,
      name: gameName,
      initialBalance: parseInt(gameInitialAmount),
      playersPerTeam: parseInt(playerLimits.total),
      batsmenPerTeam: parseInt(playerLimits.batsmen),
      bowlersPerTeam: parseInt(playerLimits.bowler),
      allRounderPerTeam: parseInt(playerLimits.allrounder),
      wicketKeeperPerTeam: parseInt(playerLimits.keeper),
      specialPlayersPerTeam: parseInt(playerLimits.special),
      maxForeignAllowed: parseInt(playerLimits.foreign),
      substitutesPerTeam: parseInt(playerLimits.substitute),
      foreignPlayersPerTeam: parseInt(playerLimits.foreign),
      legendsPerTeam: parseInt(playerLimits.legends),
      unCappedPerTeam: parseInt(playerLimits.uncapped)
    }
    createGame(newGame)
  }
  const handleGame = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const games = await getGames()
      if (games) {
        const gameIds = games.map((game) => game.id)
        if (gameIds.includes(parseInt(gameId))) {
          await startGame(parseInt(gameId))
          setTrigger((prev) => !prev)
        } else {
          toast.error('No such game')
        }
      }
    } catch (error) {
      toast.error('Failed to load games')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('teamName') !== 'host') router.push('/')
    getGames().then((games: Game[]) => {
      setGamesList(games)
    })
  }, [trigger, isJoin])

  const createDefault = () => {
    if (gameName === '') {
      toast.error('Your game needs a name')
      return
    } else {
      const newGame: NewGame = {
        setId: 1,
        name: gameName,
        initialBalance: parseInt(gameInitialAmount),
        playersPerTeam: parseInt(playerLimits.total) | 12,
        batsmenPerTeam: parseInt(playerLimits.batsmen) | 4,
        bowlersPerTeam: parseInt(playerLimits.bowler) | 4,
        allRounderPerTeam: parseInt(playerLimits.allrounder) | 2,
        wicketKeeperPerTeam: parseInt(playerLimits.keeper) | 1,
        specialPlayersPerTeam: parseInt(playerLimits.special) | 3,
        substitutesPerTeam: parseInt(playerLimits.substitute) | 3,
        foreignPlayersPerTeam: parseInt(playerLimits.foreign) | 3,
        maxForeignAllowed: parseInt(playerLimits.foreign) | 5,
        legendsPerTeam: parseInt(playerLimits.legends) | 2,
        unCappedPerTeam: parseInt(playerLimits.uncapped) | 2
      }
      createGame(newGame)
    }
  }

  return (
    isJoin ?
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleGame} className="w-full max-w-md space-y-4 p-8">
          <h1 className="text-2xl font-bold">Start Game</h1>
          <Input
            type="text"
            placeholder="game id"
            value={gameId}
            className='outline-0'
            onChange={(e) => setGameId(e.target.value)}
            required
          />
          <Button type="submit" className='bg-primary text-secondary px-2 py-1 rounded-sm'>Start</Button>
          <p className="text-primary text-sm cursor-pointer underline" onClick={() => setIsJoin(false)}>Create Game</p>
          <Button type="button" className='bg-primary text-secondary px-2 py-1 rounded-sm'
            onClick={() => {
              localStorage.setItem('game', gameId)
              router.push('/host/view')
            }}>
            Go to dashboard</Button>
        </form>
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
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Active games</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gamesList?.map((game) => (
                <TableRow key={game.id} className={game.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}>
                  <TableCell>{game.id}</TableCell>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      :
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleCreateGame} className="w-full max-w-md space-y-4 p-8">
          <h1 className="text-2xl font-bold">Create Game</h1>

          <div className="grid gap-2">
            <Label className="pr-3" htmlFor="gameName">Game Name</Label>
            <Input
              type="text"
              id="gameName"
              placeholder="game name"
              value={gameName}
              className='outline-0 '
              onChange={(e) => setGameName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="pr-3" htmlFor="gameInitialAmount">Initial Amount</Label>
            <Input
              type="number"
              id="gameInitialAmount"
              placeholder="Enter initial amount"
              value={gameInitialAmount}
              className='outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              onChange={(e) => setGameInitialAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4 pt-4">
            {Object.keys(playerLimits).map((role) => (
              <div key={role} className="grid grid-cols-2 gap-2">
                <Label className="capitalize" htmlFor={role}>
                  {role} Limit
                </Label>
                <Input
                  type="number"
                  id={role}
                  placeholder={`Max ${role}`}
                  value={playerLimits[role as keyof typeof playerLimits]}
                  className='outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  onChange={(e) => setPlayerLimits(prev => ({
                    ...prev,
                    [role]: e.target.value
                  }))}
                  required
                />
              </div>
            ))}
          </div>
          <Button type="submit" className='bg-primary text-secondary px-2 py-1 rounded-sm'>Create</Button>
          <Button type="button" onClick={createDefault} className='bg-primary text-secondary px-2 py-1 ml-4 rounded-sm'>Create Using defaults</Button>
          <p className="text-primary text-sm cursor-pointer underline" onClick={() => setIsJoin(true)}>Join Game</p>
        </form>
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

