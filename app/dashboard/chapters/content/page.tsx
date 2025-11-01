'use client';

import AuthenticatedLayout from '@/components/layouts/Layouts/AuthenticatedLayout';
import AddChapterContents from '@/components/Chapter/AddChapterContents';

export default function AddChapterContentPage() {
    return (
        <AuthenticatedLayout header="Add Chapter Content">
            <section className="py-6">
                <div className="max-w-4xl mx-auto">
                    <AddChapterContents />
                </div>
            </section>
        </AuthenticatedLayout>
    );
}


