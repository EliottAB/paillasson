import { NextResponse } from "next/server";

export async function middleware(req: any) {
  // return NextResponse.redirect(new URL('/authentication/login', req.url));
}

export const config = {
  matcher: ['/']
}