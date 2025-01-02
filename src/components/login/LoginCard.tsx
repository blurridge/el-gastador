'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LoginSchema, LoginType } from '@/types/schema';
import { useForm } from 'react-hook-form';
import GoogleSignIn from './GoogleSignIn';

const LoginCard = () => {
    const form = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: LoginType) => {
        console.log(values);
    };
    return (
        <Card className="w-[400px]">
            <CardHeader className="flex justify-center items-center">
                <CardTitle>Howdy, El Gastador!</CardTitle>
                <CardDescription>You&apos;ve been around these parts?</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center">
                    <GoogleSignIn />
                </div>
                <Separator className="my-6" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-bold">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center items-center">
                            <Button type="submit" className="w-full" variant="neutral">
                                Login
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <span className="text-sm font-base">Not from around here? Create an account.</span>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
