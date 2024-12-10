import { drizzle } from "drizzle-orm/node-postgres";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request){
    const db = drizzle(process.env.DATABASE_URL)
    try {
        const {otp, username} = await request.json()
        const userDatabase = await db.select().from(userTable).where(eq(userTable.username,username))
        if(userDatabase.length == 0 ){
            return Response.json({success:false, message:'User does not exist'})
        }
        const checkOtp = userDatabase[0].verifyCode == otp
        const checkTime = userDatabase[0].verifyCodeExpiry > Date.now()
        
        if(checkOtp && checkTime){
            await db.update(userTable).set({isVerified:true}).where(eq(userTable.username,username))
            return Response.json({success:true, message:'User is now verified'})
        }else if(!checkTime){
            return Response.json({success:false, message:'Verification code has expired.Sign Up again for new Verification code'})
        }else if(!checkOtp){
            return Response.json({success:false, message:'Incorrect verification code'})
        }
    } catch (error) {
        console.log(error)
        return Response.json({success:true,message:"Unable to verify user"})
    }
}