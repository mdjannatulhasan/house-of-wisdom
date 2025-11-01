'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BtnPrimary from '@/components/common/BtnPrimary';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import TopbarLogo from '@/public/assets/TopbarLogo';

const SignUp = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePassword] = useState('');
    const [processing, setProcessing] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Registration Failed',
                    description: result.message || 'An error occurred',
                });
            } else {
                toast({
                    variant: 'success',
                    title: 'Registration Successful',
                    description: 'Please log in with your credentials',
                });
                router.push('/login?status=Registration successful! Please log in.');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Registration Failed',
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
                    <TabsTrigger value="account">Registration</TabsTrigger>
                    <TabsTrigger value="password">Existing User?</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Please enter your information to register
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="name"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="retypePassword">
                                        Retype Password
                                    </Label>
                                    <Input
                                        className={`${
                                            password !== retypePass &&
                                            'bg-[#ffcece]'
                                        }`}
                                        onChange={(e) => {
                                            setRetypePassword(e.target.value);
                                            setData({
                                                ...data,
                                                password_confirmation:
                                                    e.target.value,
                                            });
                                        }}
                                        id="retypePassword"
                                        type="password"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <BtnPrimary
                                    disabled={password !== retypePass || processing}
                                    fullWidth
                                    type="submit"
                                >
                                    {processing
                                        ? 'Registering. Please wait.....'
                                        : 'Register'}
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
                                Please click below to go to the login page
                            </CardDescription>
                        </CardHeader>

                        <CardFooter>
                            <BtnPrimary fullWidth link href="/login">
                                Login
                            </BtnPrimary>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default SignUp;
