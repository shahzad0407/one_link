import { links } from "@/db/schema"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { getServerSession } from "next-auth"
import authOptions from "../auth/[...nextauth]/option"

export async function GET() {
    const db = drizzle(process.env.DATABASE_URL)
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return Response.json({ success: false, message: "User not authenticated" })
        }
        const id = session.user.id
        const LINKS = await db.select().from(links).where(eq(links.userId,id))
        let newLinks = []
        LINKS.map((item,i)=>{
            newLinks.push({link:item.link,linktext:item.linkText,messageId:item.messageId})
        })
        return Response.json({ success: true, message: newLinks })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "An error occurred" })
    }
}