'use client';

import MainLayout from '@/components/layouts/MainLayout';
import UpdateProfileInformationForm from '@/components/Profile/Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from '@/components/Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from '@/components/Profile/Partials/DeleteUserForm';

export default function Edit() {
    return (
        <MainLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

