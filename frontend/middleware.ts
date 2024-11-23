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
  // Apply middleware to `/tasks/:path*` and `/`
  matcher: ['/', '/tasks/:path*'],
}

// export function middleware(request: NextRequest) {
//   const token = cookies().get('access_token_cookie')?.value;
//   if (!token) {
//     return NextResponse.redirect(
//       `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`
//     );
//   }

//   const url = new URL(request.url);
//   const pathname = url.pathname;
//   const pathParts = pathname.split('/');

//   if (pathParts[1] !== 'user') return NextResponse.next();

//   const username = pathParts[2];
//   const taskId = pathParts[5];
//   const taskTitle = pathParts[6];

//   const cookieUsername = cookies().get('username')?.value;
//   if (username !== cookieUsername) {
//     return NextResponse.rewrite(new URL('/404', request.url));
//   }

//   const taskSlug = `${taskTitle}-${taskId}`;
//   const taskSlugFromParams = getTaskIdFromSlug(taskSlug);
//   if (!taskSlugFromParams) {
//     return NextResponse.rewrite(new URL('/404', request.url));
//   }

//   return NextResponse.next();
// }
