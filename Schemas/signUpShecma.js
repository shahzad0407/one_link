import { z } from "zod"

export const username = z
    .string()
    .min(2,"Username must be atleast 2 character long")
    .max(20,"Username should not contain special characters")
    .regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/,"Username cannot contain special characters")

export const signUpSchema = z.object({
    username:username,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password should be longer than 6 characters"})
})