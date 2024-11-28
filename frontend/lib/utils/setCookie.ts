// Core (Next)
import { cookies } from 'next/headers'

/**
 * Sets a cookie with the specified name and value.
 *
 * @param name - The name of the cookie to be set.
 * @param value - The value of the cookie to be set.
 *
 * @remarks
 * The cookie is set with the following options:
 * - maxAge: 30 days
 * - httpOnly: true
 * - secure: true
 * - sameSite: 'strict'
 */
export function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}
