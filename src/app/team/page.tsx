'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { teams } from '@/utils/constants'
import { toast, ToastContainer } from 'react-toastify'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { getGames } from '@/utils/api'
import { Game } from '@/types/api'



async function gameExists(gameId: string) {
  try {
    getGames().then((games: Game[]) => {
      if (games) {
        const gameIds = games.map((game) => game.id)
        if (gameIds.includes(parseInt(gameId))) {
          localStorage.setItem('game', gameId)
          const game = games.find((game) => game.id === parseInt(gameId))
          if (game?.status === 'INACTIVE') {
            toast.error('Game not started yet')
            return false
          }
        } else {
          toast.error('No such game exits')
          return false
        }
        return true
      }
      return false
    })
  } catch {
    toast.error('No such game')
    return false
  }
}
function AuthUser(username: string, password: string, router: AppRouterInstance, gameId: string) {
  if (username === 'admin') {
    if (password !== 'password') {
      toast.error('Incorrect password')
      return false
    }

    localStorage.setItem('teamName', 'admin')
    router.push('/')
    return true
  }
  if (!teams.includes(username)) {
    toast.error('Enter a proper team name')
    return false
  }
  if (password !== '1234') {
    toast.error('Incorrect password')
    return false
  }
  if (!gameExists(gameId)) {
    return false
  }

  return true
}

export default function LoginPage() {
  const [teamSlug, setTeamSlug] = useState('')
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function gameExists(gameId: string): Promise<boolean> {
    try {
      const games: Game[] = await getGames()
      if (!games) return false

      const game = games.find((g) => g.id === parseInt(gameId))
      if (!game) {
        toast.error('No such game exists')
        return false
      }
      if (game.status === 'INACTIVE') {
        toast.error('Game not started yet')
        return false
      }

      localStorage.setItem('game', gameId)
      return true
    } catch {
      toast.error('No such game')
      return false
    }
  }

  async function AuthUser(
    username: string,
    password: string,
    router: AppRouterInstance,
    gameId: string
  ): Promise<boolean> {
    if (username === 'admin') {
      if (password !== 'password') {
        toast.error('Incorrect password')
        return false
      }
      localStorage.setItem('teamName', 'admin')
      router.push('/')
      return true
    }

    if (!teams.includes(username)) {
      toast.error('Enter a proper team name')
      return false
    }
    if (password !== '1234') {
      toast.error('Incorrect password')
      return false
    }

    const valid = await gameExists(gameId)
    if (!valid) return false

    return true
  }

  // In handleLogin:
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const isAuthenticated = await AuthUser(teamSlug, password, router, roomId)
    if (isAuthenticated && teamSlug !== 'admin') {
      localStorage.setItem('teamName', teamSlug)
      router.push('/team/view')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Enter Team</h1>

        <Input
          type="text"
          placeholder="Team Name"
          value={teamSlug}
          onChange={(e) => setTeamSlug(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="passowrd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <Button
          type="submit"
          className="w-full "
        >
          Join
        </Button>
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
  )
}
