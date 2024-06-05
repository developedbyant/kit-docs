import type { RequestEvent } from "@sveltejs/kit"

type ApiData<LoadData, ResData> = { load:LoadData,res: {error?:string,data:ResData} }
export type ApiEndpoints = {
    "/docs": ApiData<{action:"setTheme"}, { theme: "dark" | "light" }>;
};

/** Make api request */
export async function apiRequest<K extends keyof ApiEndpoints>(apiUrl: K,apiLoad: ApiEndpoints[K]["load"] | FormData) {
    const isAFile = apiLoad instanceof FormData;
    const requestHeaders = isAFile ? {} : { "Content-Type": "application/json" } as any;
    const requestBody = isAFile ? apiLoad : JSON.stringify(apiLoad);
    const request = await fetch(apiUrl, {
        method: "POST",
        headers: requestHeaders,
        body: requestBody,
    });
    const responseData = await request.json() as ApiEndpoints[K]["res"]
    return responseData;
}

/** Set cookie session */
export function cookieSet(event:RequestEvent,cookieName:string,cookieValue:string){
    event.cookies.set(cookieName,cookieValue,{
        path:"/",
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 26 * 30
    })
}

/** Remove cookie */
export function cookieDelete(event:RequestEvent,cookieName:string){
    event.cookies.set(cookieName,"",{
        path:"/",
        expires: new Date(0)
    })
}