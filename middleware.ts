import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware is optional - authentication is handled in page components
  return NextResponse.next()
}

export const config = {
  matcher: ['/builder/:path*'],
}

