import { NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){
    const path=req.nextUrl.pathname;
    if(path==="/AdminPage"){
        const token = req.cookies.get('token')?.value;
        if (token !== process.env.NEXT_PUBLIC_TOKEN) {
          return NextResponse.redirect(new URL('/AdminLogin', req.url));
        }
        else{
            const response=NextResponse.next();
            response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
            return response;
        }
    }
    return NextResponse.next();
}
export const config={
    matcher:[
        "/AdminPage"
    ]
}