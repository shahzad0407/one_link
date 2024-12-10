"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const Login = () => {
  const [form, setform] = useState({})
  const [isSubmitting, setisSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleClick = async () => {
    setisSubmitting(true)
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    })
    if (res.status == 200) {
      toast({
        title: "User registered",
      })
      setisSubmitting(false)
      router.push("/")
    }else{
      toast({
        title:res.error,
        variant:"destructive"
      })
      setisSubmitting(false)
    }
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  return (
    <div className='bg-slate-600'>
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                onChange={handleChange}
                name='email'
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                onChange={handleChange}
                name='password'
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </Link>
            </div>
            <div className="mt-8">
              <button onClick={handleClick} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                {isSubmitting ? "Logging in ..." : "Login"}
              </button>
            </div>
            <Link
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
            </Link>
            <div className="mt-4 flex items-center w-full text-center">
              <Link href='/register'
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?

                <span className="text-blue-700"> Sign Up</span>

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login