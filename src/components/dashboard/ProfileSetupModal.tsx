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
import { useGetUserInfo, useGetUserProfile, useUpdateUserProfile } from "@/features/user"
import { cn } from "@/lib/utils"
import { PartialUpdateUserProfileSchema, PartialUpdateUserProfileType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

const ProfileSetupModal = ({ editMode }: { editMode?: boolean }) => {
    const [open, setOpen] = useState(false);
    const { data: user, isLoading: isLoadingUser } = useGetUserInfo();
    const { data: userProfile, isLoading: isLoadingUserProfile } = useGetUserProfile(user!);
    const { mutate: updateUserProfile, isPending: isPendingProfileUpdate } = useUpdateUserProfile(user!);
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

    const onSubmit = (userProfilePayload: PartialUpdateUserProfileType) => {
        updateUserProfile(userProfilePayload)
        setOpen(false)
    }

    if (isLoadingUser || isLoadingUserProfile || isPendingProfileUpdate) {
        return null;
    }

    return (
        <Dialog open={open || !userProfile} onOpenChange={setOpen}>
            {editMode ? <DialogTrigger asChild>
                <a className="flex gap-2 cursor-pointer items-center">
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

export default ProfileSetupModal;
