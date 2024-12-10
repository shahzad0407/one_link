"use client"

import { useMediaQuery } from "@uidotdev/usehooks"

export default function MainMenu() {
    let isDesktop = useMediaQuery("(min-width:768px)")
    return (<>{isDesktop?<ul className='flex items-center justify-center gap-6 text-slate-500'>
        <li>Templates</li>
        <li>Marketplace</li>
        <li>Dicover</li>
        <li>Pricing</li>
        <li>Learn</li>
    </ul>:"mibile"}</>)
}