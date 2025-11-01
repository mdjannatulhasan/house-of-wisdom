'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import ApplicationLogo from '@/components/ApplicationLogo';

export default function ForgotPassword() {
    const [data, setData] = useState({ email: '' });
    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('');

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setStatus('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors || { email: result.message });
            } else {
                setStatus('We have emailed your password reset link!');
                setData({ email: '' });
            }
        } catch (error) {
            setErrors({ email: 'An error occurred' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData({ email: e.target.value })}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
