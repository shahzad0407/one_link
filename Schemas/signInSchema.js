import { z } from "zod";

export const signInSchmea = z.object({
    identifier:z.string().email({message:"Invalid email address"}),
    password:z.string()
})