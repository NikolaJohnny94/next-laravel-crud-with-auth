'use server'
// Core (Next)
import { cookies } from 'next/headers'
// Services
import apiService from '@/services/apiService'
//Types
import type {
  Task,
  Response,
  TaskResponse,
  EditTaskDTO,
  AuthResponse,
} from '@/types'
import type { AxiosResponse } from 'axios'

export async function login(
  email: string,
  password: string
): Promise<Response> {
  try {
    const response: AxiosResponse<AuthResponse> = await apiService.login(
      email,
      password
    )

    setCookie('access_token_cookie', response.data.token)
    setCookie('username', response.data.data.name)

    return {
      success: true,
      message: 'User successfully logged in!',
    }
  } catch (error: any) {
    return { success: false, message: error.response.data.message as string }
  }
}

export async function registration(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<Response> {
  try {
    const response: AxiosResponse<AuthResponse> = await apiService.registration(
      name,
      email,
      password,
      password_confirmation
    )

    // setCookie('access_token_cookie', response.data.token)
    // setCookie('username', response.data.data.name)

    return { success: true, message: 'User successfully registered!' }
  } catch (error: any) {
    return { success: false, message: error.response.data.message as string }
  }
}

export const logout = async (): Promise<Response> => {
  try {
    const response: AxiosResponse<{ success: boolean; message: string }> =
      await apiService.logout()

    cookies().delete('access_token_cookie')
    cookies().delete('username')

    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message as string,
    }
  }
}

/**
 * Retrieves a list of all tasks.
 * @returns A promise resolving to a TaskResponse containing the success status, the list of tasks and a message.
 */
export async function getTasks() {
  try {
    const response: AxiosResponse<TaskResponse<Task[]>> =
      await apiService.getTasks()
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: [] as Task[],
      message: error.response.data.message as string,
    }
  }
}

/**
 * Retrieves a single task by its ID.
 * @param id - The ID of the task to be retrieved.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function getTask(id: number) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await apiService.getTask(id)
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

/**
 * Creates a new task.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param category - The category of the task.
 * @param finished - Whether the task is finished or not.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function createTask(
  title: string,
  description: string,
  category: string,
  finished: boolean
) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await apiService.createTask(title, description, category, finished)
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

/**
 * Edits a task with the specified ID.
 * @param id - The ID of the task to be edited.
 * @param data - The new data for the task.
 * @returns A promise resolving to a TaskResponse containing the success status, the task data and a message.
 */
export async function editTask(id: number, data: EditTaskDTO) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await apiService.editTask(id, data)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      data: {} as Task,
      message: error.response.data.message as string,
    }
  }
}

/**
 * Deletes a task with the specified ID.
 * @param id - The ID of the task to be deleted.
 * @returns A promise resolving to a TaskResponse containing the success status and message.
 */
export async function deleteTask(id: number) {
  try {
    const response: AxiosResponse<TaskResponse<Task>> =
      await apiService.deleteTask(id)
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

/**
 * Sets a cookie with the specified name and value.
 * @param name - The name of the cookie to be set.
 * @param value - The value of the cookie to be set.
 * @remarks
 * The cookie is set with the following options:
 * - maxAge: 30 days
 * - httpOnly: true
 * - secure: true
 * - sameSite: 'strict'
 */
function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

// export async function getCookies() {
//   const cookieUsername = cookies().get('username')?.value as string
//   const cookieToken = cookies().get('access_token_cookie')?.value as string
//   return { username: cookieUsername, token: cookieToken }
// }
