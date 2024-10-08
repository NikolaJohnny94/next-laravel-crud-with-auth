'use server'
// Core (Next)
import { cookies } from 'next/headers'
// Services
import apiService from '@/services/apiService'

export async function login(email: string, password: string) {
  try {
    const response = await apiService.login(email, password)

    if (response.data.success) {
      cookies().set('access_token_cookie', response.data.token, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      return { success: true, message: 'User successfully logged in!' }
    }
  } catch (error: any) {
    return { success: false, message: error.response.data.message }
  }
}
