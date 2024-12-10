import z from 'zod'

export const descSchema = z.object({
    description:z.string().min(10, {
        message: "Your description must be 10 characters long.",
      }),
})