"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useParams, useRouter } from 'next/navigation'
import { otpSchema } from "@/Schemas/otpSchema"


const Verify = () => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm(({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  }))
  const params = useParams()
  const username = params.username

  const onSubmit = async (data) => {
    const req = await fetch('/api/verify', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...params, ...data })
    })
    const response = await req.json()
    if(response.message == 'User is now verified'){
      router.push('/signin')
      toast({
        title: `${response.message}`,
      })
    }else{
      toast({
        title: `${response.message}`,
        variant:"destructive"
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center text-white bg-black h-[100vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 flex flex-col items-center justify-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center'>
                <FormLabel className=' font-bold text-xl'>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Verify
