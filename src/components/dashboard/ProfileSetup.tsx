'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import honoClient from "@/lib/rpc/client/hono-client"
import { cn } from "@/lib/utils"
import useUserStore from "@/stores/userStore";
import { PartialUpdateUserProfileSchema, PartialUpdateUserProfileType } from "@/types/schema";
import { RESPONSE_STATUS } from "@/utils/constants"
import { parseApiResponse } from "@/utils/parseResponse"
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

const ProfileSetup = ({ editMode }: { editMode?: boolean }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast()
    const { user, userProfile, isLoadingUser, updateCurrentUser } = useUserStore()
    const form = useForm<PartialUpdateUserProfileType>({
        resolver: zodResolver(PartialUpdateUserProfileSchema),
        defaultValues: {
            id: "",
            email: "",
            displayName: ""
        },
    });

    const { setValue } = form;

    useEffect(() => {
        if (user) {
            const { user_metadata, id, email } = user;
            if (user_metadata?.full_name || userProfile?.displayName) {
                setValue('displayName', userProfile?.displayName || user_metadata.full_name)
            }
            if (id) {
                setValue('id', id)
            }
            if (email) {
                setValue('email', email)
            }
        }
    }, [user, userProfile])

    const onSubmit = async (userProfilePayload: PartialUpdateUserProfileType) => {
        if (!user) {
            return;
        }
        const response = await parseApiResponse(honoClient.api.profile["update-user-profile"].$post({
            json: userProfilePayload
        }))
        if (response.status === RESPONSE_STATUS.SUCCESS) {
            updateCurrentUser();
            toast({ title: response.message, description: `User profile updated for ${user.id}.` })
            setOpen(false);
        }
        else {
            toast({ variant: "destructive", title: response.message, description: `Failed updating user profile for ${user.id}.` })
        }
    }

    if (isLoadingUser) {
        return null;
    }

    return (
        <Dialog open={open || !userProfile} onOpenChange={setOpen}>
            {editMode ? <DialogTrigger asChild>
                <a className="flex gap-2 cursor-pointer">
                    {user?.user_metadata.picture ? <Image
                        width={200}
                        height={200}
                        src={user?.user_metadata.picture}
                        alt={user?.user_metadata?.full_name}
                        className="w-6 h-6 rounded-full"
                    />
                        : null}
                    <span>{(userProfile) ? userProfile.displayName : user?.user_metadata?.full_name}</span>
                </a>
            </DialogTrigger> : null}
            <DialogContent
                className={cn("sm:max-w-[425px]", userProfile ? "" : "[&>button]:hidden")}
                onEscapeKeyDown={(e) => {
                    if (!editMode) {
                        e.preventDefault();
                    }
                }}
                onInteractOutside={(e) => {
                    if (!editMode) {
                        e.preventDefault();
                    }
                }}>
                <DialogHeader>
                    <DialogTitle>Setup Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-bold">
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Juan Dela Cruz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" variant="neutral">Save changes</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileSetup;
