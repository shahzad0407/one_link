"use client"
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: "900"
});

export default function Home() {
  const session = useSession()
  return (
    <div className='bg-[#254F1A]'>
      <Navbar/>
      <div className="grid md:grid-cols-2 grid-cols-1  ">
        <div className="md:pl-8 pl-5 text-[#D2E823] h-[100vh] flex flex-col items-start justify-center gap-5">
          <span className={`${poppins.className} md:text-6xl text-4xl`}>Everything you are. In one, simple link in bio.</span>
          <span className='md:text-lg text-base md:p-0 pr-4'>Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</span>
          <div className='flex items-center justify-start gap-3 w-full mt-4'>
            <input className='w-[30%] h-[90%] rounded-md'/>
            <Link href={session.status === 'authenticated'?"/generate":"/register"}>
            <button className='bg-[#E0C0E9] rounded-full py-4 px-6 text-black font-semibold'>Claim your OneLink</button>
            </Link>
          </div>
        </div>
        <img  src="/image.png"></img>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 bg-[#E9C0E9]">
        <img alt='image2'  src="/image2.png"></img >
        <div className="pl-8 text-[#D2E823] h-[100vh] flex flex-col items-start justify-center gap-5">
          <span className={`${poppins.className} md:text-6xl text-4xl text-[#502274]`}>Create and customize your Linktree in minutes</span>
          <span className='text-lg text-[#502274] md:p-0 pr-4'>Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</span>
          <div className='flex items-center justify-start gap-3 w-full mt-4'>
            <Link href='/register'>
            <button className='bg-[#502274] rounded-full py-4 px-6 text-white font-semibold'>Get Started for free</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
