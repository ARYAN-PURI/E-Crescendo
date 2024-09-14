import { NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){
    const path=req.nextUrl.pathname;
    if(path==="/AdminPage"){
        const token = req.cookies.get('token')?.value;
        if (token !== process.env.NEXT_PUBLIC_TOKEN) {
          return NextResponse.redirect(new URL('/AdminLogin', req.url));
        }
        else{
            const res = NextResponse.next();
            res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.headers.set('Expires', '0');
            res.headers.set('Pragma', 'no-cache');
            return res;
        }
    }
    return NextResponse.next();
}
export const config={
    matcher:[
        "/AdminPage"
    ]
}