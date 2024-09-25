'use client'

import { Button } from "../ui/button"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { useSession } from "next-auth/react"
import { SendHorizontal } from "lucide-react"
import Image from "next/image"
import menIcon from '@/../public/images/menIcon.png'
import womenIcon from '@/../public/images/womenIcon.png'

interface SentRequestProps {
    user?: any
    transfer?: any;
}

const SentRequest = ({ transfer, user }: SentRequestProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleAddRequest = async () => {
        if (!user?._id) {
            toast.error('please login first')
            return
        }
        setLoading(true)
        try {
            await axios.patch('/api/transfer/addRequest', { transferId: transfer._id, userId: user._id })
            toast.success('Successfully added transfer request')
            router.refresh()
        } catch (error) {
            toast.error('Failed to create transfer request')
            console.error(error)
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="">
            <Dialog>
                <DialogTrigger disabled={!user?._id && loading} asChild>
                    <Button disabled={!user?._id && loading} variant={"outline"} size={"sm"}>
                        <span className="sr-only">send</span>
                        <SendHorizontal className="text-muted-foreground w-4 sm:w-5 hover:text-foreground" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>transfer information</DialogTitle>
                        <DialogDescription>please add the spesiality and class where u want transfer to it</DialogDescription>
                        <div className="flex flex-col gap-4 pt-4">
                            <p className="text-sm font-medium -mb-2">your information</p>
                            <div className="border border-border rounded-lg flex items-center gap-4 px-2 py-4 sm:p-4">
                                <Image
                                    src={user?.gender === 'women' ? womenIcon : menIcon}
                                    alt={user?.gender === 'women' ? 'womenIcon' : 'menIcon'}
                                    width={70}
                                    height={70}
                                    className="w-16 md:h-16"
                                />
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm sm:text-base font-semibold">{user?.name}</p>
                                    <a href="mailto:" className="text-xs sm:text-sm text-muted-foreground">{user?.email}</a>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs sm:text-sm"><span className="text-muted-foreground">From</span>  {user?.specialty} - {user?.class}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-medium -mb-2">exchange information</p>
                            <div className="border border-border rounded-lg flex items-center gap-4 px-2 py-4 sm:p-4">
                                <Image
                                    src={transfer.studentId?.gender === 'women' ? womenIcon : menIcon}
                                    alt={transfer.studentId?.gender === 'women' ? 'womenIcon' : 'menIcon'}
                                    width={70}
                                    height={70}
                                    className="w-16 md:h-16"
                                />
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm sm:text-base font-semibold">{transfer.name}</p>
                                    <a href="mailto:" className="text-xs sm:text-sm text-muted-foreground">{transfer.email}</a>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs sm:text-sm"><span className="text-muted-foreground">From</span>  {transfer.fromSpecialty} - {transfer.fromClass}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button onClick={handleAddRequest} className="w-min">Request</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default SentRequest