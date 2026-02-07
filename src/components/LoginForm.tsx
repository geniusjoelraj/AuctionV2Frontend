'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './LoginPage'
import { useEffect, useState } from 'react'

function Login() {

  useEffect(() => {
    localStorage.clear()
  })
  const [asAdmin, setAsAdmin] = useState(false)
  return (
    <div className='relative flex h-dvh items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
      </div>

      <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
        <CardHeader className='gap-6'>
          <div>
            <CardTitle className='text-2xl text-center'>Welcome to <span className='text-violet-500 font-semibold text-4xl block text-nowrap'>Grand Theft Auction</span> </CardTitle>
            {/* <CardDescription className='text-base'></CardDescription> */}
          </div>
        </CardHeader>

        <CardContent>
          {/* Login Select */}
          <div className='mb-6 flex flex-wrap gap-4 sm:gap-6'>
            <Button variant={asAdmin ? 'outline' : 'default'} onClick={() => setAsAdmin(false)} className='grow'>
              Login as Team
            </Button>
            <Button variant={asAdmin ? 'default' : 'outline'} onClick={() => setAsAdmin(true)} className='grow'>
              Login as Admin
            </Button>
          </div>

          {/* Login Form */}
          <div className='space-y-4'>
            <LoginForm isAdmin={asAdmin} />
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default Login
