// Core (React and Next)
import React from 'react'
// Components
import { LoginForm } from '@/components'

export default async function LoginPage() {
  return (
    <div>
      <h2 className='text-2xl mb-4'>Login</h2>
      <LoginForm />
    </div>
  )
}
