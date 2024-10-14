'use server'
// Core (Next)
import { cookies } from 'next/headers'
// Services
import apiService from '@/services/apiService'
//Types
import type { Task } from '@/types'
import { AxiosResponse } from 'axios'

export async function login(email: string, password: string) {
  try {
    const response = await apiService.login(email, password)
    console.log(response.data.data.name)
    if (response.data.success) {
      cookies().set('access_token_cookie', response.data.token, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      cookies().set('username', response.data.data.name, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      return {
        success: true,
        message: 'User successfully logged in!',
        data: response.data.data,
      }
    }
  } catch (error: any) {
    return { success: false, message: error.response.data.message }
  }
}

export async function registration(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  try {
    const response = await apiService.registration(
      name,
      email,
      password,
      password_confirmation
    )

    if (response.data.success) {
      cookies().set('access_token_cookie', response.data.token, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      return { success: true, message: 'User successfully registered!' }
    }
  } catch (error: any) {
    return { success: false, message: error.response.data.message }
  }
}

export const logout = async () => {
  try {
    const response = await apiService.logout()

    if (response.data.success) {
      cookies().delete('access_token_cookie')
      cookies().delete('username')
      return response.data
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message as string,
    }
  }
}

type TasksResponse = {
  success: boolean
  data: Task[]
  message: string
}

export async function getTasks() {
  try {
    const response: AxiosResponse<TasksResponse> = await apiService.getTasks()
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: [] as Task[],
      message: error.response.data.message as string,
    }
  }
}
export type TaskResponse = {
  success: boolean
  data: Task
  message: string
}

export async function getTask(id: number) {
  try {
    const response: AxiosResponse<TaskResponse> = await apiService.getTask(id)
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

export async function getCookies() {
  const cookieUsername = cookies().get('username')?.value as string
  const cookieToken = cookies().get('access_token_cookie')?.value as string
  return { username: cookieUsername, token: cookieToken }
}

// export type TaskResponse = {
//   success: boolean
//   data: Task
//   message: string
// }

export async function createTask(
  title: string,
  description: string,
  category: string,
  finished: boolean
) {
  try {
    const response: AxiosResponse<TaskResponse> = await apiService.createTask(
      title,
      description,
      category,
      finished
    )
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

type Data = {
  title?: string
  description?: string
  category?: 'work' | 'personal' | 'other'
  finished?: boolean
}

// export type ErrorResponse = {
//   success: boolean
//   message: string
// }

export async function editTask(id: number, data: Data) {
  try {
    const response: AxiosResponse<TaskResponse> = await apiService.editTask(
      id,
      data
    )
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}
