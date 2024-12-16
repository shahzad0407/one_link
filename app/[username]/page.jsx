import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { links, userTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import Link from 'next/link'
import React from 'react'

export default async function Page({ params }) {
  const username = (await params).username
  const db = drizzle(process.env.DATABASE_URL)
  const userAvailable = await db.select().from(userTable).where(eq(userTable.username,username))
  if(userAvailable.length ===0){
    return <>User not available</>
  }
  const linksAvailable = await db.select().from(links).where(eq(links.userId,userAvailable[0].id))
  
  return  <div className='gap-8 flex flex-col items-center justify-center w-[100wh] h-[100vh] bg-slate-800 text-white'>
      <Avatar className='w-24 h-24'>
        <AvatarImage src={userAvailable[0].picture} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='font-bold '>@{username}</div>
      <div className=' text-center w-[60%]'>{userAvailable[0].description}</div>
      <div className='flex flex-col items-center justify-center  w-full'>
        {linksAvailable.map((item,i)=>{
          return <Link target="_blank" key={i} href={`${item.link}`} className='hover:bg-white hover:text-slate-800 font-semibold my-3 w-[70%] h-12 border border-white rounded-full flex items-center justify-center' >
          <div className='text-center'>
            {item.linkText} 
           </div>
          </Link> 
        })}
      </div>
    </div>

}
