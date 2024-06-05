export { default as Layout } from "./comps/Layout.svelte";
import { writable } from "svelte/store";
export type { Snippet } from "svelte";
import type { Writable } from "svelte/store";

/** App json data store */
export const appJsonDataStore:Writable<AppJsonData> = writable()

/** App store */
export const appStore = writable({
    theme:"light",
    isTopNavLinksOpen:false,
    isSideNavOpen:false,
    isSearchOpen:false,
    scrollY:0
})
/** set meta tags */
export const metaTagsStore:Writable<{
    appName:string
    url?:string
    title?:string
    description?:string
    image?:string
    ogType?:"website"|"article"
}> = writable({ appName:"KitDocs" })

export type DocTheme = "dark" | "light"
export type TopNavLinkData = { text:string, href:string, external:boolean }
export type SideNavLinkData = {
    title:string
    links:{ text:string, href:string, newFeature:boolean }[]
}

/** Type for src/app.json file */
export type AppJsonData = {
    projectName:string;
    socialMedia:{ name:string,link:string }[]
    navLinks:{ text:string, href:string, external:boolean }[];
    footerLinks:{ title:string, links:{ text:string, href:string, external:boolean }[] }[];
    kitDocs:{
        [key:string]:{
            layout:string
            title:string;
            description:string;
            href:string;
            new:boolean;
            headers:{
                id:string;
                text:string;
            }[];
            /** All meta data from file */
            // [key:string]:any
        }[]
    }
}