import { drizzle } from "drizzle-orm/node-postgres";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";
import {  userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(){
    const db = drizzle(process.env.DATABASE_URL)    
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({success:false, message:"User not authenticated"})
        }
        const userData = await db.select().from(userTable).where(eq(userTable.username,session.user.username))
        return Response.json({success:true, message:userData[0].description})
    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"An error occured while retrieving description"})
    }
}