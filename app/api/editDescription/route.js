import { drizzle } from "drizzle-orm/node-postgres";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request){
    const db = drizzle(process.env.DATABASE_URL)
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({success:false, message:"User not authenticated"})
        }
        const {description,username} = await request.json()
        await db.update(userTable).set({description}).where(eq(userTable.username,username))
        return Response.json({success:true, message:"Description updated"})
    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Description not updated"})
    }
}