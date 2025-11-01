'use client';

import BtnPrimary from '@/components/common/BtnPrimary';
import { FormEvent, FormEventHandler } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TopbarLogo from '@/public/assets/TopbarLogo';

const SignIn = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                toast({
                    variant: 'destructive',
                    title: 'Login Failed',
                    description: 'Invalid credentials',
                });
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'An error occurred',
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className="flex flex-col h-[100vh] justify-center items-center">
            <Link href="/">
                <TopbarLogo />
            </Link>
            <Tabs defaultValue="account" className="max-w-[400px] w-full mt-5">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Sign In</TabsTrigger>
                    <TabsTrigger value="password">New User?</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Please enter your email and password to
                                    login
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <BtnPrimary fullWidth type="submit">
                                    Login
                                </BtnPrimary>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome</CardTitle>
                            <CardDescription>
                                Please click below to go to the registration
                                page
                            </CardDescription>
                        </CardHeader>

                        <CardFooter>
                            <BtnPrimary fullWidth link href="/register">
                                Register now
                            </BtnPrimary>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default SignIn;
