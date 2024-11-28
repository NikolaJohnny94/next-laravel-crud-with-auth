'use server'
// Core (Next)
import { cookies } from 'next/headers'
// Services
import { AuthService } from '@/services'
//Utils
import { setCookie } from '@/lib/utils/setCookie'
//Types
import type { Response, AuthResponse, LoginDTO, RegistrationDTO } from '@/types'
import type { AxiosResponse } from 'axios'

// Creating an instance of the AuthService
const authService = new AuthService()

/**
 * Logs a user in.
 * @param email - The email of the user to be logged in.
 * @param password - The password of the user to be logged in.
 * @returns A promise resolving to a Response containing the success status and a message.
 */
export async function login(loginDto: LoginDTO): Promise<Response> {
  try {
    const response: AxiosResponse<AuthResponse> =
      await authService.login(loginDto)

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

/**
 * Registers a new user.
 * @param name - The name of the user to be registered.
 * @param email - The email address of the user to be registered.
 * @param password - The password of the user to be registered.
 * @param password_confirmation - The password confirmation of the user to be registered.
 * @returns A promise resolving to a Response containing the success status and a message.
 */
export async function registration(
  registrationDTO: RegistrationDTO
): Promise<Response> {
  try {
    await authService.registration(registrationDTO)

    return { success: true, message: 'User successfully registered!' }
  } catch (error: any) {
    return { success: false, message: error.response.data.message as string }
  }
}

/**
 * Logs the user out.
 * @returns A promise resolving to a Response containing the success status and a message.
 */
export const logout = async (): Promise<Response> => {
  try {
    const response: AxiosResponse<{ success: boolean; message: string }> =
      await authService.logout()

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
