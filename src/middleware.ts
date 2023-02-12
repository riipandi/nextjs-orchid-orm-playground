import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { query as UrlQuery } from 'urlcat'

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const protectedPaths = ['/admin']
  const matchesProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (matchesProtectedPath) {
    const token = await getToken({ req: request })

    if (!token) {
      const urlParams = UrlQuery({ callbackUrl: encodeURI(request.url) })
      const url = new URL(`/api/auth/signin?${urlParams}`, request.url)
      return NextResponse.redirect(url)
    }
    if (token.role !== 'admin') {
      const url = new URL(`/403`, request.url)
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}
