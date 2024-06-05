import { json } from "@sveltejs/kit";
                import { cookieSet } from "kitdocs/utils";
                import type { DocTheme } from "kitdocs"
                import type { RequestHandler } from "./$types.js";
                
                export const POST:RequestHandler = async(event)=>{
                    // set theme
                    const currentTheme = (event.cookies.get("theme") || "light") as DocTheme
                    cookieSet(event,"theme",(currentTheme==="dark" ? "light" : "dark"))
                    return json({ message:"test" })
                }