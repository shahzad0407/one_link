"use client"
import { Poppins } from 'next/font/google';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/ImageDropzone';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: "900"
});



const Generate = () => {
    const [links, setlinks] = useState([{ link: "", linktext: "", messageId: "" }])
    const [description, setdescription] = useState("")
    const [picture, setpicture] = useState("")
    const [deleteMsg, setDeleteMsg] = useState(false)
    const [file, setFile] = React.useState();
    const [uploading, setuploading] = useState(false)
    const [savingDesc, setsavingDesc] = useState(false)

    useEffect(() => {
        getMessages()
        getDescription()
        getPicture()
    }, [])

    const getMessages = async () => {
        let req = await fetch('/api/getLinks')
        const response = await req.json()
        setlinks(response.message)
    }
    const getDescription = async () => {
        let req = await fetch('/api/getDescription')
        const response = await req.json()
        setdescription(response.message)
    }
    const getPicture = async () => {
        let req = await fetch('/api/getPicture')
        const response = await req.json()
        setpicture(response.message)
    }



    const { edgestore } = useEdgeStore();
    const session = useSession()
    const { toast } = useToast()
    const user = session?.data?.user

    let screenWidth;
    if (typeof window !== "undefined") {
        screenWidth = window.screen.availWidth
    }
    if (session.status == 'loading') {
        return <div className={`bg-black text-xl text-white h-[100vh] w-[100vw] font-bold flex items-center justify-center ${poppins.className}`}><div>Loading..</div>.</div >
    }
    if (session.status == 'unauthenticated') {
        return <div className={`bg-black text-xl text-white h-[100vh] w-[100vw] font-bold flex items-center justify-center ${poppins.className}`}><Link href='/signin' className='text-blue-500 underline'>Please Login first</Link></div>
    }

    const addLink = async () => {
        setlinks(links.concat({ link: "", linktext: "", messageId: uuidv4() }))
    }

    const handleChange = async (index, link, linktext, messageId) => {
        setlinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { linktext, link, messageId }
                } else {
                    return item
                }
            })
        })
        const data = JSON.stringify({
            link: links[index].link,
            linkText: links[index].linktext,
            userId: user.id,
            messageId: links[index].messageId
        })
        const res = await fetch('/api/send', {
            method: "POST",
            body: data
        })
    }

    const handleDelete = async (messageId) => {
        setDeleteMsg(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "messageId": messageId
        });

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch("/api/delete", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
        getMessages()
        setDeleteMsg(false)
    }
    let profileUrl;
    if (typeof window != 'undefined') {
        profileUrl = `${window.location.origin}/${session.data?.user.username}`
    }

    const copyToCipboard = () => {
        navigator.clipboard.writeText(profileUrl)
        toast({
            title: "URL Copied"
        })
    }

    const handleSubmit = async (prop) => {
        if (prop == 'editDescription') {
            setsavingDesc(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                description,
                username: user.username
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const req = await fetch(`/api/${prop}`, requestOptions)
            const response = await req.json()
            if (response.success) {
                toast({
                    title: response.message
                })
                setsavingDesc(false)

            }
            setsavingDesc(false)

        } else if (prop == 'editDisplay') {

        }
    }

    const handlePicture = async () => {
        {
            if (file) {
                setuploading(true)
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                    },
                });
                const req = await fetch("/api/editPicture", {
                    method: "POST",
                    body: JSON.stringify({
                        username: user.username,
                        picture: res.url
                    })
                })
                const response = await req.json()
                if (response.message == 'Profile Picture updated successfully') {
                    toast({
                        title: response.message
                    })
                    getPicture()
                } else {
                    toast({
                        title: response.message,
                        variant: "destructive"
                    })
                }

                setuploading(false)

            }
        }
    }

    return (
        <div >
            <div className='grid md:grid-cols-2 grid-cols-1 h-[100vh]'>
                <div className="bg-purple-600 flex flex-col items-center justify-center gap-8">
                    <div className='border-black px-3 gap-2 border-2 flex md:flex-row flex-col items-center justify-center w-[90%] bg-blue-200 rounded-xl py-4'>
                        <span className='font-semibold'>Your Linktree is live: <Link target='_blank' href={user?.username} className='text-blue-500 underline'>localhost:3000/{user?.username}</Link></span>
                        <Button onClick={copyToCipboard} className={`${poppins.className}`}>Copy your OneLink URL</Button>
                    </div>
                    <div className='flex items-center justify-between w-[88%]'>
                        <div className='flex gap-4  '>
                            <Avatar className='border-black border'>
                                <AvatarImage src={`${picture}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>

                                <div className='font-bold '>@{user?.username}</div>
                                <div className='text-slate-200'>{description}</div>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className={`border-black border-2 ${poppins.className}`} variant="outline">Edit</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 flex flex-col">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className={`${poppins.className}`} variant="outline">Edit Picture</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Change Pofile Picture</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click upload when you&#39;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <SingleImageDropzone
                                            width={200}
                                            height={200}
                                            value={file}
                                            onChange={(file) => {
                                                setFile(file);
                                            }}
                                        />
                                        <DialogFooter>
                                            <Button onClick={handlePicture}>{uploading ? "Uploading..." : "Upload"}</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className={`${poppins.className}`} variant="outline">Edit Description</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit Description</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your description here. Click save when you&#39;e done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Description
                                                </Label>
                                                <Input
                                                    id="name"
                                                    defaultValue={description}
                                                    className="col-span-3"
                                                    onChange={(e) => setdescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={() => handleSubmit("editDescription")}>{savingDesc ? "Saving" :"Save changes"}</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button onClick={addLink} className='w-[90%] rounded-full font-bold bg-black text-white'>{deleteMsg ? "Deleting..." : "+ Add Link"}</Button>
                    <div className='w-[98%] flex flex-col items-center justify-center gap-3'>
                        {links.length > 0 ? links.map((item, index) => {
                            return (<div key={index} className='border-black border py-3 w-[95%] gap-4 flex items-center  bg-purple-400 rounded-lg'>
                                <div className='w-[90%] flex flex-col items-center justify-center gap-3 '>
                                    <Input className='w-[85%] bg-green-100' value={item.link} onChange={(e) => handleChange(index, e.target.value, item.linktext, item.messageId)} type="text" placeholder='URL' />
                                    <Input className='w-[85%] bg-green-100' value={item.linktext} onChange={(e) => handleChange(index, item.link, e.target.value, item.messageId)} type="text" placeholder='title' />
                                </div>
                                <div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className='bg-black text-white mr-4' variant="outline">Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    link and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => { handleDelete(item.messageId) }}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>)
                        }) : ""}
                    </div>

                </div>
                {screenWidth > "786" && <div className=" h-[100vh]">
                    <div className='gap-8 flex flex-col items-center justify-center w-[100wh] h-[100vh] bg-slate-800 text-white'>
                        <Avatar className='w-24 h-24'>
                            <AvatarImage src={`${picture}`} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='font-bold '>@{user?.username}</div>
                        <div className=' text-center w-[60%] font-semibold'>{description}</div>
                        <div className='flex flex-col items-center justify-center  w-full'>
                            {links.map((item, i) => {
                                return (
                                    <a target='_blank' href={item.link} key={item.messageId} className='hover:bg-white hover:text-slate-800 font-semibold my-3 w-[70%] h-12 border border-white rounded-full flex items-center justify-center'>
                                        <div className='text-center'>
                                            {item.linktext}
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Generate
