import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request) {
    const db = drizzle(process.env.DATABASE_URL)
    try {
        
        const { username, email, password } = await request.json()
        
        const existingUserByUsername = await db.select().from(userTable).where(eq(userTable.username,username))

        if (existingUserByUsername.length) {
            return Response.json({ success: false, message: "Username already exits" })
        }
        const existingUserByEmail = await db.select().from(userTable).where(eq(userTable.email,email))
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail.length == 1 ) {
            
            if(existingUserByEmail[0].isVerified){
                return Response.json({success:false,message:"User already exists with this email"})
            }else{
                let hashedPassword;
                try {
                    hashedPassword = await bcrypt.hash(password, 10)
                } catch (error) {
                    return NextResponse.json({ message: "Password was unable to hash" })
                }
    
                const verifyCodeExpiry = new Date()
                verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 15)
                await db.update(userTable).set({password:hashedPassword}).where(eq(userTable.email,email))
                await db.update(userTable).set({username}).where(eq(userTable.email,email))
                await db.update(userTable).set({verifyCodeExpiry}).where(eq(userTable.email,email))
                await db.update(userTable).set({verifyCode}).where(eq(userTable.email,email))
            }

        } else {
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 10)
            } catch (error) {
                console.log(error)
                return NextResponse.json({ message: "Password was unable to hash" })
            }

            const verifyCodeExpiry = new Date()
            verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 15)
            await db.insert(userTable).values({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: true,
            })
        }
        try {
            await sendVerificationEmail(
                email, username, verifyCode
            )
        } catch (error) {
            console.log(error)
            return Response.json({success:false,message:"Incorrect Email"})
        }
        return Response.json({ success: true, message: "User registered" })
    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "Unable to register user" })
    }
}