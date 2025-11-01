import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { FormEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UpdateProfileInformation({
    mustVerifyEmail = false,
    status,
    className = '',
}: {
    mustVerifyEmail?: boolean;
    status?: string;
    className?: string;
}) {
    const { data: session, update } = useSession();
    const user = session?.user;

    const [data, setData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                setErrors(result.errors || {});
            } else {
                setRecentlySuccessful(true);
                await update({ name: data.name, email: data.email });
                setTimeout(() => setRecentlySuccessful(false), 2000);
            }
        } catch {
            setErrors({ general: 'An error occurred' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account&apos;s profile information and email
                    address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified. Please check your
                            inbox for a verification link.
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
