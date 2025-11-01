'use client';

import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import '../css/admin.min.css';
import '../css/admin.css';
import '../css/icons.css';
import SideNavbar from '@/components/Dashboard/Sections/SideNavbar';
import Header from '@/components/Dashboard/Sections/Header';
import BreadCrumbLink from '@/components/Dashboard/Atoms/BreadCrumbLink';
import BreadCrumbSeparator from '@/components/Dashboard/Atoms/BreadCrumbSeparator';
import Footer from '@/components/Dashboard/Sections/Footer';

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="wrapper">
            
            <SideNavbar />
            <div className="page-content">
                <Header />
                <main className="min-h-[calc(100vh-140px)] py-8">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
