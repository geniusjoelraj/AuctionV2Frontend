'use client'

import { Button, Input } from "@base-ui/react"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

export default function GameCreate() {

  const [gameId, setGameId] = useState<string>('')
  const [game, setGame] = useState<'CREATE' | 'JOIN'>('CREATE')
  const handleGame = async (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('game', gameId)
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleGame} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Join Game</h1>

        <Input
          type="text"
          placeholder="Team Name"
          value={gameId}
          className='outline-0'
          onChange={(e) => setGameId(e.target.value)}
          required
        />
        <Button type="submit">Join</Button>
        <p className="text-primary text-sm">Create Game</p>
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
