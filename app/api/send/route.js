import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export async function POST(request) {
    const db = drizzle(process.env.DATABASE_URL);

    try {
        const { link, linkText, userId, messageId } = await request.json()

        const checkIfRowAvailable = await db.select().from(links).where(eq(links.messageId, messageId));
        if (checkIfRowAvailable.length == 0) {
            await db.insert(links).values({ link, linkText, userId, messageId });
        } else if (checkIfRowAvailable.length > 1) {
            await db.delete(links).where(eq(links.messageId, messageId));
            await db.insert(links).values({ link, linkText, userId, messageId });
        } else {
            await db.update(links).set({ link: link }).where(eq(links.messageId, messageId))
            await db.update(links).set({ linkText: linkText }).where(eq(links.messageId, messageId))
        }
        return Response.json({ success: true, message: "working", data: checkIfRowAvailable })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "Error sending links" })
    } finally {

    }
}

