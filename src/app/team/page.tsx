'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { teams } from '@/utils/constants'
import { toast, ToastContainer } from 'react-toastify'

function AuthUser(username: string, password: string) {
  if (!teams.includes(username)) {
    toast.error('Enter a proper team name')
    return false
  } else if (password !== '1234') {
    toast.error('Incorrect password')
    return false
  }
  return true
}

export default function LoginPage() {
  const [teamSlug, setTeamSlug] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const isAuthenticated = AuthUser(teamSlug, password)

    if (isAuthenticated) {
      router.push(`/team/${teamSlug}`)
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
