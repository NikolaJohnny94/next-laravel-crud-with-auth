//Core (Next)
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
//Types
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = cookies().get('access_token_cookie')?.value
  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/login-universal`
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*'],
}
