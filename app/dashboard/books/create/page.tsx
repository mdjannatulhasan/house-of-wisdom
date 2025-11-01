'use client';

import AuthenticatedLayout from '@/components/layouts/Layouts/AuthenticatedLayout';
import BookForm from '@/components/add-new-book/BookForm';

export default function CreateBookPage() {
    return (
        <AuthenticatedLayout header="Add Book">
            <BookForm />
        </AuthenticatedLayout>
    );
}
