import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { getServerSession } from "next-auth"
import authOptions from "../auth/[...nextauth]/option"

export async function GET(){
    const db = drizzle(process.env.DATABASE_URL)
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            return Response.json({success:false,message:"User not authenticated"})
        }
        const user = await db.select().from(userTable).where(eq(userTable.username,session.user.username))
        return Response.json({success:true,message:user[0].picture})
    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"An error occured while sending picture"})
    }
}