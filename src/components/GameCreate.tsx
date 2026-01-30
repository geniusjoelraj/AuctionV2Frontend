'use client'

import { Game, NewGame } from "@/types/api"
import { createGame, getGames } from "@/utils/api"
import { Button, Input } from "@base-ui/react"
import { Label } from "@radix-ui/react-label"
import { randomInt } from "crypto"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function GameCreate() {
  const router = useRouter()
  const [gameId, setGameId] = useState<string>('')
  const [gameInitialAmount, setGameInitialAmount] = useState<string>('')
  const [gameName, setGameName] = useState<string>('')
  const [playerLimits, setPlayerLimits] = useState({
    total: ',',
    batsmen: '',
    bowler: '',
    allrounder: '',
    keeper: '',
    uncapped: ''
  })
  // setPlayerLimits(prev => ({ ...prev, batsmen: '5' }))

  const [isJoin, setIsJoin] = useState<boolean>(true)
  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    const newGame: NewGame = {
      setId: 1,
      name: gameName,
      initialBalance: parseInt(gameInitialAmount),
      playersPerTeam: parseInt(playerLimits.total),
      batsmenPerTeam: parseInt(playerLimits.batsmen),
      bowlersPerTeam: parseInt(playerLimits.bowler),
      allRounderPerTeam: parseInt(playerLimits.allrounder),
      wicketKeeperPerTeam: parseInt(playerLimits.keeper),
      unCappedPerTeam: parseInt(playerLimits.uncapped)
    }
    createGame(newGame)
  }
  const handleGame = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      getGames().then((games: Game[]) => {
        if (games) {
          const gameIds = games.map((game) => game.id)
          if (gameIds.includes(parseInt(gameId))) {
            localStorage.setItem('game', gameId)
            const game = games.find((game) => game.id === parseInt(gameId))
            if (game?.status === 'INACTIVE') {
              toast.error('Game not started yet')
            } else {
              router.push('/')
            }
          } else {
            toast.error('No such game exits')
          }
        }
      })
    } catch {
      toast.error('No such game')
    }
  }
  return (
    isJoin ?
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleGame} className="w-full max-w-md space-y-4 p-8">
          <h1 className="text-2xl font-bold">Join Game</h1>
          <Input
            type="text"
            placeholder="game id"
            value={gameId}
            className='outline-0'
            onChange={(e) => setGameId(e.target.value)}
            required
          />
          <Button type="submit" className='bg-primary text-secondary px-2 py-1 rounded-sm'>Join</Button>
          <p className="text-primary text-sm cursor-pointer underline" onClick={() => setIsJoin(false)}>Create Game</p>
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
              <div key={role} className="flex flex-col gap-2">
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
