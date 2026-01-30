'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { teams } from '@/utils/constants'
import { toast, ToastContainer } from 'react-toastify'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

function AuthUser(username: string, password: string, router: AppRouterInstance) {
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
  return true
}

export default function LoginPage() {
  const [teamSlug, setTeamSlug] = useState('')
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const isAuthenticated = AuthUser(teamSlug, password, router)
    localStorage.setItem('game', roomId)
    if (isAuthenticated && teamSlug !== 'admin') {
      localStorage.setItem('teamName', teamSlug)
      router.push(`/team/view`)
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


        {/* Add other fields like password, etc. */}

        <Button
          type="submit"
          className="w-full "
        >
          View
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
