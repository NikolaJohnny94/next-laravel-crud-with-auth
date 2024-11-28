// Core (Next)
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
// Types
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = cookies().get('access_token_cookie')?.value
  const currentPath = request.nextUrl.pathname

  // Redirect logic for the `/` route
  if (currentPath === '/') {
    if (token) {
      // Redirect logged-in users to `/tasks/dashboard`
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/tasks/dashboard`
      )
    } else {
      // Redirect unauthenticated users to `/auth/login`
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`
      )
    }
  }

  // Redirect unauthenticated users for protected routes
  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`
    )
  }

  // Allow access for authenticated users
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/tasks/:path*'],
}
