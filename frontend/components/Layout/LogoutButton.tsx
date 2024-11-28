'use client'
//Core (React and Next)
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// Next UI
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
// React Icons
import { CgLogOut } from 'react-icons/cg'
// Actions
import { logout } from '@/lib/actions'

export const Logout = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    const response = await logout()

    if (response.success) {
      router.push('/auth/login')
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={() => handleLogout()}>
      {' '}
      <CgLogOut size={20} />
      {isLoading ? (
        <span className='flex items-center'>
          {' '}
          Logging out...
          <Spinner color='white' size='sm' />
        </span>
      ) : (
        <span>Logout</span>
      )}
    </Button>
  )
}
