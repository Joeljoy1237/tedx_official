import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@api/auth/[...nextauth]';

export async function middleware(request: NextRequest) {
    // const session = await getServerSession(request, authOptions);
    const session = "";
    if (!session) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow the request to continue if the user is an admin
    return NextResponse.next();
}

export const config = {
    matcher: '/api/admin/test:path*',
};
