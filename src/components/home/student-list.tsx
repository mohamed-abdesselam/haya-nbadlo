'use client'

import { TransferPopulateType } from "@/types/type"
import menIcon from '@/../public/images/menIcon.png'
import womenIcon from '@/../public/images/womenIcon.png'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import SentRequest from "./sent-request"
import { Button } from "../ui/button"
import { useState } from "react"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

interface StudentListProps {
    transferedList: any
    user?: any
    role?: string
}

const StudentList = ({ transferedList, user, role }: StudentListProps) => {
    // console.log(transferedList);
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleAccept = async (trId: string, userId: string) => {
        setLoading(true)
        try {
            const data = { trId, userId }
            console.log(data);
            
            await axios.post('/api/transfer/accept', data);
            toast.success('Transfer request accepted')
            router.refresh()
        } catch (error) {
            console.error("Error accepting transfer request:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleRefuse = async (trId: string, userId: string) => {
        setLoading(true)
        try {
            await axios.post('/api/transfer/delete', { trId, userId });
            toast.success('Transfer request deleted')
            router.refresh()
        } catch (error) {
            console.error("Error deleting transfer request:", error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="">
            {
                transferedList.length ? (
                    transferedList.map((transfer: any) => {
                        // const isRequest = role === ('request' || 'all') ? (transfer.requests.findLast((r: any) => user?.email === r?.userId.email).status) : ''
                        const isRequest = (role === 'request')
                            ? transfer.requests.findLast((r: any) => user?.email === r?.userId.email)?.status
                            : '';

                        const isAll = (role === 'all')
                            ? transfer.requests.some((r: any) => r?.status === 'accepted')
                            : '';

                        return (
                            <div
                                key={transfer._id}
                                className={cn(
                                    "flex items-center justify-between border border-border rounded-lg",
                                    user?.email === transfer.email && 'border-primary bottom-2',
                                    role === 'sent' && (transfer.status === "deleted" ? 'bg-red-500/10' : transfer.status === "accepted" ? 'bg-green-500/10' : 'bg-yellow-500/10'),
                                    role === 'request' && (isRequest === "deleted" ? 'bg-red-500/10' : isRequest === "accepted" ? 'bg-green-500/10' : 'bg-yellow-500/10'),
                                    role === 'all' && (isAll && 'bg-green-500/10')
                                )}>
                                <div className="flex items-center gap-4 px-2 py-4 sm:p-4">
                                    <Image
                                        src={transfer?.studentId?.gender === 'women' ? womenIcon : menIcon}
                                        alt={transfer?.studentId?.gender === 'women' ? 'womenIcon' : 'menIcon'}
                                        width={70}
                                        height={70}
                                        className="w-10 h-10 md:w-16 md:h-16"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-sm sm:text-base font-semibold">{transfer?.name}</p>
                                        <a href="mailto:" className="text-xs sm:text-sm text-muted-foreground">{transfer?.email}</a>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs sm:text-sm"><span className="text-muted-foreground">From</span>  {transfer?.fromSpecialty} - {transfer?.fromClass}</p>
                                            <Separator orientation="vertical" />
                                            <p className="text-xs sm:text-sm"><span className="text-muted-foreground">To</span>  {transfer?.toSpecialty} - {transfer?.toClass}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cn("border-l border-border self-stretch p-2 flex items-center gap-2 md:gap-4", user?.email === transfer?.email && 'border-l-2 border-primary')}>
                                    {role === 'sent' ? (
                                        <div className="">
                                            {transfer.status === "accepted" ? <Button disabled={loading} variant={"outline"} size={"sm"} onClick={() => handleRefuse(transfer._id, transfer.studentId._id)}>
                                                <span className="sr-only">check</span>
                                                <X className="text-muted-foreground w-4 sm:w-5 hover:text-foreground" />
                                            </Button> : <Button disabled={loading} variant={"outline"} size={"sm"} onClick={() => handleAccept(transfer._id, transfer.studentId._id)}>
                                                <span className="sr-only">check</span>
                                                <Check className="text-muted-foreground w-4 sm:w-5 hover:text-foreground" />
                                            </Button>}
                                        </div>
                                    ) : role === 'request' ? (
                                        <div className="">
                                            <Button disabled={loading} variant={"outline"} size={"sm"}>
                                                <span className="sr-only">check</span>
                                                <X className="text-muted-foreground w-4 sm:w-5 hover:text-foreground" />
                                            </Button>
                                        </div>
                                    ) : role === 'my' ? (
                                        <div className="">
                                            <Button disabled={loading} variant={"outline"} size={"sm"}>
                                                <span className="sr-only">check</span>
                                                <X className="text-muted-foreground w-4 sm:w-5 hover:text-foreground" />
                                            </Button>
                                        </div>
                                    ) : (
                                        !isAll && <SentRequest transfer={transfer} user={user} />
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No data found</div>
                )
            }
        </div>
    )
}

export default StudentList