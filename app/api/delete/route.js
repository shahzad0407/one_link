import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export async function DELETE(request) {
    const db = drizzle(process.env.DATABASE_URL);
    try {
        const {messageId} = await request.json();
        await db.delete(links).where(eq(links.messageId, messageId));
        return Response.json({ success: true, message: "Message deleted successfully" })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "An error while deleting" })
    }
}