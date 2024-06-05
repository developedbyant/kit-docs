/** Page meta tags (required) */
export type MetaData = { [key:string]:string }

/** Current page being created */
export type CurrentPage = {
    /** Custom js/ts code to add to page */
    code:string
    /** Current to to add to page body (content) */
    content:string
    /** Custom css code to add to page */
    css:string
    /** Page meta data tags (required) */
    metaData:MetaData
    /** Headers founded in file */
    headers:{ id: string,text: string }[]
}
export type PageData = {
    layout:string
    /** Page link (href) */
    href:string
    /** Page title */
    title:string
    /** Page description */
    description:string
    /** Indicate if it's a new feature (add badge next to link) */
    new:boolean
    /** Headers founded in file */
    headers:{ id: string,text: string }[]
}
/** Data returned from function */
export type ResultData = { 
    /** Page layout key */
    [key:string]:PageData
}

/** Function options */
export type Options = {
    /** App name, so we can use to add app name after title example title here | appName */
    appName:string
    /** Website domain, it's use to add to meta data url property */
    domainUrl:string
    /** Default image to use when there was not image founded on markdown meta tag */
    defaultImage:string
    /** If set to true, it will delete everything on parent folder example /docs/ will delete everything in folder docs */
    devMode?:boolean
    /** When set to true, we only create the md file that was updated */
    singleFileMode?:boolean
    /** Only if you are working on kitDocs */
    localDev?:boolean
}