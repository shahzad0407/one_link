import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { getServerSession } from "next-auth"
import authOptions from "../auth/[...nextauth]/option"

export async function POST(request) {
    const db = drizzle(process.env.DATABASE_URL)
    try {
        const {picture,username} = await request.json()
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return Response.json({ success: false, message: "User not authenticated" })
        }
        const userUpdated = await db.update(userTable).set({picture}).where(eq(userTable.username, username))
        console.log(userUpdated)
        return Response.json({success:true,message:"Profile Picture updated successfully"})
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "An error occured while sending picture" })
    }
}