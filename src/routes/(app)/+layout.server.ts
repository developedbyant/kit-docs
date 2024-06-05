import type { LayoutServerLoad } from './$types.js';
import type { DocTheme } from "../../lib/index.js"

export const load:LayoutServerLoad = async(event)=>{
    const theme = (event.cookies.get("theme") || "light") as DocTheme
    return { theme }
} 