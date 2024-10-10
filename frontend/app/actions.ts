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

    if (response.data.success) {
      cookies().set('access_token_cookie', response.data.token, {
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
      data: [],
      message: error.response.data.message as string,
    }
  }
}
type TaskResponse = {
  success: boolean
  data: Task
  message: string
}

export async function getTask(id: number) {
  try {
    const response: AxiosResponse<any> = await apiService.getTask(id)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: {},
      message: error.response.data.message as string,
    }
  }
}
