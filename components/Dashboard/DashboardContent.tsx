'use client';

import BreadCrumbLink from '@/components/Dashboard/Atoms/BreadCrumbLink';
import BreadCrumbSeparator from '@/components/Dashboard/Atoms/BreadCrumbSeparator';
import BookForm from '@/components/add-new-book/BookForm';

export default function DashboardContent() {
    return (
        <>
            <div className="flex items-center md:justify-between flex-wrap gap-2 mb-6 w-full">
                <h4 className="text-default-900 text-lg font-medium mb-2">
                    Dashboard
                </h4>

                <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                    <BreadCrumbLink name="OpenDash" />
                    <BreadCrumbSeparator />
                    <BreadCrumbLink name="Menu" />
                    <BreadCrumbSeparator />
                    <BreadCrumbLink name="Dashboard" />
                </div>
            </div>
            <div className="card">
                <BookForm />
            </div>
        </>
    );
}
