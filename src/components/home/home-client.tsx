'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { Button } from "../ui/button"
import StudentList from "./student-list"
import useTranslation from "@/hooks/useTranslation"

interface HomeProps {
    transferedList: any
    user?: any
}

const HomwClient = ({ transferedList, user }: HomeProps) => {
    const local = useLocale()
    const { t } = useTranslation('Home')

    const transferedSent = transferedList
        .filter((e: any) => e.studentId.toString() === user?._id) // Filter by 'pending' status if needed
        // .filter((e: any) => e.requests.some((r: any) => r.status === 'pending')) // Filter by 'pending' status if needed
        .map((e: any) =>
            e.requests.map((r: any) => ({
                status: r.status,
                studentId: {
                    _id: r.userId._id.toString(),
                    gender: r.userId.gender,
                },
                _id: e._id.toString(),
                email: r.userId.email,
                name: r.userId.name,
                fromSpecialty: r.userId.specialty,
                fromClass: r.userId.class,
                toSpecialty: e.fromSpecialty,
                toClass: e.fromClass,
            }))
        ).flat();  // Flatten the array to avoid nested arrays

    const transferedRequest = transferedList.filter((e: any) =>
        e.requests.some((r: any) => r.userId?._id.toString() === user?._id)
    );

    const myTransfered = transferedList.filter((e: any) =>
        e.studentId.toString() === user?._id
    );



    return (
        <div className="mt-8">
            <Tabs
                defaultValue="transferedList"
                className={cn("overflow-auto", local === 'ar' && '__rtl_lang')}
            >

                <div className={cn("flex items-center justify-between",)} >
                    <TabsList className={cn("max-sm:grid max-sm:h-full grid-cols-2", local === 'ar' && '__rtl_lang')}>
                        <TabsTrigger className="max-sm:px-2 py-1" value="transferedList">{('Transfered List')}</TabsTrigger>
                        <TabsTrigger className="max-sm:px-2 py-1" value="transferedSent">{('Transfered sent')}</TabsTrigger>
                        <TabsTrigger className="max-sm:px-2 py-1" value="transferedRequest">{('Transfered requset')}</TabsTrigger>
                        <TabsTrigger className="max-sm:px-2 py-1" value="myTransfered">{('My Transfered')}</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent className="" value="transferedList" >
                    <StudentList role="all" user={user} transferedList={transferedList} />
                </TabsContent>
                <TabsContent className="" value="transferedSent" >
                    <StudentList role="sent" user={user} transferedList={transferedSent} />
                </TabsContent>
                <TabsContent className="" value="transferedRequest" >
                    <StudentList role="request" user={user} transferedList={transferedRequest} />
                </TabsContent>
                <TabsContent className="" value="myTransfered" >
                    <StudentList role="my" user={user} transferedList={myTransfered} />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default HomwClient