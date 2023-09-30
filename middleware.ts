import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axiosInstance from '@/app/axios-instance'

async function isAuthenticated(request: NextRequest) {

  const cookie = request.cookies.get('Authorization')
  if (!cookie) {
    return false 
  }
  const token = cookie.value
  if(!token){
    return false
  }
  console.log(token)
   const res = await fetch("http://192.168.0.2:8080/auth/verify", {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: token
   })
   if(res.status == 200){
    console.log("true")
       return true
   }else{
    console.log("false")
       return false
   }
 
}
 
export async function middleware(request: NextRequest) {


  // If request is for /_next, /api, /login or /logout, just return next()
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  // Redirect to /login if user is not authenticated and path is not /login
  if (!request.nextUrl.pathname.startsWith("/login") && !(await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to /home if user is authenticated and path is /login
  if (request.nextUrl.pathname.startsWith("/login") && (await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

}
 
export const config = {
}