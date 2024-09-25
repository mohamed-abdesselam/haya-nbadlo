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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import useTranslation from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

interface TopHomeProps {
    user?: any;
}

const TopHome = ({ user }: TopHomeProps) => {
    const router = useRouter()
    const local = useLocale()
    const { t } = useTranslation('Home')

    const [data, setData] = useState({
        email: user?.email || '',
        name: user?.name || '',
        fromSpecialty: user?.specialty || '',
        fromClass: user?.class || '',
        toSpecialty: '',
        toClass: '',
    })

    const createTransfer = async () => {
        if (!user?.email) {
            toast.error('please login first')
            return
        }
        if (!data.email) {
            toast.error('please provide a valid email')
            return
        }
        if (!data.fromSpecialty || !data.toSpecialty) {
            toast.error('please provide a valid specialty')
            return
        }
        if (!data.fromClass || !data.toClass) {
            toast.error('please provide a valid class')
            return
        }
        console.log({ studentId: user?._id, ...data });

        try {
            const res = await axios.post('/api/transferReq', { studentId: user?._id, ...data })
            toast.success('Successfully added transfer request')
            router.refresh()
        } catch (error) {
            toast.error('Failed to create transfer request')
            console.error(error)
        }
    }

    return (
        <div className="flex items-center justify-between mt-8">
            <h1 className="font-bold text-xl">Tabadle Shop</h1>
            <Dialog>
                <DialogTrigger asChild className={cn(local === 'ar' ? 'text-right' : 'text-left',)}><Button>{t('createATransferRequest')}</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader className={cn(local === 'ar' ? 'text-right' : 'text-left',)}>
                        <DialogTitle>{t('transferInformation')}</DialogTitle>
                        <DialogDescription>{t('transferDesc')}</DialogDescription>
                        <div className="flex flex-col gap-4 pt-4">
                            <p className={cn("text-sm font-medium -mb-2", local === 'ar' ? 'text-right' : 'text-left')}>{t('yourInformation')}</p>
                            <Input
                                type="text"
                                value={data.name}
                                placeholder={('Name')}
                                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value, }))}
                            />
                            <Input
                                type="text"
                                value={data.email}
                                placeholder={('Email')}
                                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value, }))}
                            />
                            <div className="flex gap-4 sm:gap-6 items-center">
                                <Select onValueChange={(e) => setData((prev) => ({ ...prev, fromSpecialty: e, }))} defaultValue={data.fromSpecialty}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Specialty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Idtw">Idtw</SelectItem>
                                        <SelectItem value="Rsd">Rsd</SelectItem>
                                        <SelectItem value="F3i">F3i</SelectItem>
                                        <SelectItem value="Cs">Cs</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder={('Class')}
                                    value={data.fromClass}
                                    onChange={(e) => setData((prev) => ({ ...prev, fromClass: e.target.value, }))}
                                />
                            </div>
                            <p className={cn("text-sm font-medium -mb-2", local === 'ar' ? 'text-right' : 'text-left')}>{t('exchangeInformation')}</p>
                            <div className="flex gap-4 sm:gap-6 items-center">
                                <Select onValueChange={(e) => setData((prev) => ({ ...prev, toSpecialty: e, }))} defaultValue={data.toSpecialty}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Specialty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Idtw">Idtw</SelectItem>
                                        <SelectItem value="Rsd">Rsd</SelectItem>
                                        <SelectItem value="F3i">F3i</SelectItem>
                                        <SelectItem value="Cs">Cs</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder={('Class')}
                                    value={data.toClass}
                                    onChange={(e) => setData((prev) => ({ ...prev, toClass: e.target.value, }))}
                                />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button onClick={createTransfer} className="w-min">{t('add')}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default TopHome