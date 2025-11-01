'use client';

import AuthenticatedLayout from '@/components/layouts/Layouts/AuthenticatedLayout';
import DashboardContent from '@/components/Dashboard/DashboardContent';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard">
            <DashboardContent />
        </AuthenticatedLayout>
    );
}
