
'use client'

import { useRef, useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './ui/combobox'
import { teams } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Authenticate, getGames } from '@/utils/api'
import { Game } from '@/types/api'

const LoginForm = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const searchRef = useRef(null)

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

  async function authUser(
    username: string,
    password: string,
    router: AppRouterInstance,
    gameId: string
  ): Promise<boolean> {
    if (username !== 'host' && username !== 'admin' && !teams.includes(username)) {
      toast.error('Enter a proper team name')
      return false
    }

    if (username === 'host' && password === 'gta6') {
      localStorage.setItem('teamName', selectedTeam)
      router.push('/create')
    }
    const isCorrect = await Authenticate(parseInt(gameId), username, password)
    if (!isCorrect) {
      return false
    }

    const valid = await gameExists(gameId)
    if (!valid) {
      if (username === 'host' && password === 'gta6') {
        localStorage.setItem('teamName', selectedTeam)
        router.push('/create')
      }
      return false
    }

    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const isAuthenticated = await authUser(selectedTeam, password, router, roomId)
    if (isAuthenticated && selectedTeam !== 'admin') {
      localStorage.setItem('teamName', selectedTeam)
      router.push('/team/view')
    }
    if (isAuthenticated && selectedTeam === 'admin') {
      localStorage.setItem('teamName', selectedTeam)
      router.push('/admin/team')
    }
    if (isAuthenticated && selectedTeam === 'host') {
      localStorage.setItem('teamName', selectedTeam)
      router.push('/host/view')
    }
  }
  return (
    <form className='space-y-4' onSubmit={handleLogin}>
      {/* Username */}
      <div className='space-y-1'>
        <Label htmlFor='userEmail' className='leading-5'>
          {isAdmin ? 'Username*' : 'Team*'}
        </Label>
        {isAdmin ?
          <Input
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            name="player"
            placeholder='username'
          />
          :
          <Combobox
            value={selectedTeam}
            onValueChange={(value) => setSelectedTeam(value || "")}
            name="player"
            autoHighlight
            items={teams}
          >

            <ComboboxInput placeholder="Search" ref={searchRef} />
            <ComboboxContent>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>

            </ComboboxContent>
          </Combobox>
        }

      </div>
      {/* Room Id */}

      <div className='w-full space-y-1'>
        <Label htmlFor='roomId' className='leading-5'>
          Room Id*
        </Label>
        <Input
          id='roomId'
          type="text"
          placeholder="Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className='w-full space-y-1'>
        <Label htmlFor='password' className='leading-5'>
          Password*
        </Label>
        <div className='relative'>
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='••••••••'
            className='pr-9'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='ghost'
            size='icon'
            type='button'
            onClick={() => setIsVisible(prevState => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>

      <Button className='w-full' type='submit'>
        Join
      </Button>

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
    </form>
  )
}

export default LoginForm
