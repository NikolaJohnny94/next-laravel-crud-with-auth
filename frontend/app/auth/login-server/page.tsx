import React from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
// import apiService from '@/services/apiService'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { cookies } from 'next/headers'

export default function LoginServerPage() {
  let errorMessage = null

  async function login(formData: FormData) {
    'use server'

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    try {
      const response: any = await api.post('/login', {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })
      console.log(response)

      if (response.data.success) {
        cookies().set('access_token_cookie', response.token, {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
      }
    } catch (error: any) {
      console.log(error.response.data)
      //   errorMessage = 'Error'
      //   console.error('EROR!!!!!!!!!:', error)
    }

    // mutate data
    // revalidate cache
  }

  return (
    <form action={login}>
      <div className='mb-4'>
        {/* {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} */}
        <Input
          isRequired
          type='email'
          label='Email'
          name='email'
          className='max-w-xs'
        />
      </div>
      <div className='mb-4'>
        <Input
          isRequired
          type='password'
          label='Password'
          name='password'
          className='max-w-xs'
        />
      </div>
      <Button type='submit' color='danger' className='text-white'>
        Submit
      </Button>
    </form>
  )
}
