import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from "next-auth/react"

export async function middleware(request: NextRequest) {
    const session = await getSession({ request: request });

    if (!session?.user?.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/api/admin/test:path*',
}
