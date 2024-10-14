'use client'
//Core (React and Next)
import { useRouter } from 'next/navigation'
import React from 'react'
// Next UI
import { Button } from '@nextui-org/button'
// Actions
import { logout } from '@/app/actions'

export const Logout = () => {
  const router = useRouter()
  const handleLogout = async () => {
    const response = await logout()
    if (response.success) router.push('/auth/login')
  }
  return <Button onClick={() => handleLogout()}>Logout</Button>
}
