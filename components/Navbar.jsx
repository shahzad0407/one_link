"use client"
import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { MenuIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: "900"
});

const Navbar = () => {
    const session = useSession()
    let screenWidth;
    if (typeof window !== 'undefined') {
        screenWidth = window.screen.availWidth
    }


    return (
        <div className='flex items-center justify-center'>
            <div className='flex items-center justify-between w-[93%] h-20 bg-white rounded-full relative top-12'>
                <div className='flex items-center justify-center gap-4 ml-4'>
                    <Link href='/'>
                        <Image alt='oneLink Image' width={40} height={40} className='w-10' src='/oneLink.png'></Image>
                    </Link>
                    {screenWidth > "786" ? <ul className='flex items-center justify-center gap-6 text-slate-500'>
                        <li>Templates</li>
                        <li>Marketplace</li>
                        <li>Dicover</li>
                        <li>Pricing</li>
                        <li>Learn</li>
                    </ul> : <Drawer>
                        <DrawerTrigger>
                            <MenuIcon />
                        </DrawerTrigger>
                        <DrawerContent className='h-[90vh]'>
                            <DrawerTitle>
                                <ul className={`text-2xl mt-8 flex flex-col items-center justify-center gap-6 text-black-500 ${poppins.className}`}>
                                    <li>Templates</li>
                                    <li>Marketplace</li>
                                    <li>Dicover</li>
                                    <li>Pricing</li>
                                    <li>Learn</li>
                                </ul></DrawerTitle>
                        </DrawerContent>
                    </Drawer>}
                </div>
                {session.status == "unauthenticated" ? <div className='flex items-center justify-center gap-3'>
                    <Link href='/signin'>
                        <button className='py-4 md:px-6 px-4 font-semibold rounded-lg bg-slate-300'>Login</button>
                    </Link>
                    <Link href='/register'>
                        <button className='md:py-4 p-3 md:px-6  font-semibold md:rounded-full rounded-3xl text-white bg-black mr-4'>Signup for free</button>
                    </Link>
                </div> : <div className='flex items-center justify-center gap-3 pr-4'>
                    <button onClick={() => { signOut() }} className='py-4 px-6 font-semibold rounded-lg bg-slate-300'>Log out</button>

                </div>}
            </div>
        </div>
    )
}

export default Navbar
