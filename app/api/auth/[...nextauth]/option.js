import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { drizzle } from "drizzle-orm/node-postgres";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const authOptions ={
    session:{
        strategy:"jwt"
    },
    providers:[
        CredentialsProvider({
            type:"credentials",
            credentials:{
                Email: { label: "email", type: "email", placeholder: "jsmith@web.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials,req){
                const {email,password} = credentials
                const db = drizzle(process.env.DATABASE_URL);
                const IfUserAvailable = await db.select().from(userTable).where(eq(userTable.email,email))
                
                    if(IfUserAvailable.length == 0){
                        throw new Error("User not found")
                    }
                    if(!IfUserAvailable[0].isVerified){
                        throw new Error("User not verified")
                    }
                    const isPasswordCorrect = await bcrypt.compare(password,IfUserAvailable[0].password)
                    if(isPasswordCorrect){
                        return IfUserAvailable[0]
                    }else{
                        throw new Error("Invalid Credentials")
                    }
                 
              }
        })
    ],
    pages:{
        signIn:'/signin'
    },
    callbacks:{
        async jwt({token,user}){
            if (user) {
                token.id = user.id
                token.isVerified = user.isVerified
                token.username = user.username
                token.description = user.description
                token.picture = user.picture
            }
            return token
        },
        async session({session,token}){
            if(session?.user){
                session.user.id = token.id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
                session.user.description = token.description
                session.user.picture = token.picture
            }
            return session
        }
    }
}

export default authOptions