'use client';

import AuthenticatedLayout from '@/components/layouts/Layouts/AuthenticatedLayout';
import { useState, FormEvent } from 'react';
import InputCustom from '@/components/common/InputCustom';
import BtnPrimary from '@/components/common/BtnPrimary';
import { useToast } from '@/components/ui/use-toast';

export default function CreateChapterPage() {
    const { toast } = useToast();
    const [processing, setProcessing] = useState(false);
    const [form, setForm] = useState({ book_id: '', title: '', order: 1 });

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const res = await fetch('/api/chapters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    book_id: Number(form.book_id),
                    title: form.title,
                    order: Number(form.order) || 1,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || 'Failed');
            toast({ variant: 'success', title: 'Chapter created' });
            setForm({ book_id: '', title: '', order: 1 });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Failed', description: e.message });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout header="Add Chapter">
            <section className="py-6">
                <div className="card shadow p-8 max-w-3xl mx-auto">
                    <form onSubmit={submit}>
                        <div className="grid lg:grid-cols-2 gap-5 mb-5">
                            <InputCustom
                                type="number"
                                name="book_id"
                                placeholder="Book ID (e.g. from URL /books/123)"
                                value={form.book_id}
                                onChange={(e) => setForm({ ...form, book_id: e.target.value })}
                            />
                            <InputCustom
                                type="text"
                                name="title"
                                placeholder="Chapter title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                            
                            <InputCustom
                                type="number"
                                name="order"
                                placeholder="Order"
                                value={form.order as any}
                                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                            />
                        </div>
                        <BtnPrimary fullWidth disabled={processing} type="submit">
                            {processing ? 'Adding chapter...' : 'Add Chapter'}
                        </BtnPrimary>
                    </form>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
