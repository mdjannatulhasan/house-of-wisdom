'use client';

import { FormEvent, ChangeEvent, useEffect, useState } from 'react';
// TODO: Replace Inertia useForm with useState + fetch
// import { useForm } from '@inertiajs/react';
import { useToast } from '../ui/use-toast';
import InputCustom from '../common/InputCustom';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { categoriesList } from '@/redux/features/category/categorySlice';
import SelectCustom from '../common/SelectCustom';
import { ICategory } from '@/types/globalTypes';

interface BookFormProps {
    book?: any;
}

const BookForm = ({ book }: BookFormProps = {} as BookFormProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesList);

    const [data, setData] = useState({
        title: '',
        cover_image: null as File | null,
        price: 0,
        category_id: '',
        publication_date: '',
        author: '',
        pdf_file: null as File | null,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // categories should be preloaded by server or provided; no fetch here to avoid build deps

    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('title', data.title);
        if (data.cover_image) formData.append('cover_image', data.cover_image);
        formData.append('price', String(data.price));
        formData.append('category_id', data.category_id);
        formData.append('publication_date', data.publication_date);
        formData.append('author', data.author);
        if (data.pdf_file) formData.append('pdf_file', data.pdf_file);

        try {
            const res = await fetch('/api/books', { method: 'POST', body: formData });
            const result = await res.json();
            if (!res.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Book creation Failed.',
                    description: result?.error || 'Error in form submission',
                });
            } else {
                toast({ variant: 'success', title: 'Book added successfully.', description: '' });
                setData({
                    title: '',
                    cover_image: null,
                    price: 0,
                    category_id: '',
                    publication_date: '',
                    author: '',
                    pdf_file: null,
                });
            }
        } catch (err) {
            toast({ variant: 'destructive', title: 'Book creation Failed.', description: 'Network error' });
        } finally {
            setProcessing(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData((prev) => ({ ...prev, [name]: files?.[0] || null }));
        } else if (type === 'number') {
            setData((prev) => ({ ...prev, [name]: Number(value) }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <section className="py-6">
            <div className="card shadow p-8 max-w-4xl mx-auto">
                <form id="bookForm" onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-5 mb-5">
                        <div className="lg:col-span-2">
                            <InputCustom
                                type="text"
                                name="title"
                                placeholder="Enter book title"
                                value={data.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <InputCustom
                                type="file"
                                name="cover_image"
                                placeholder="Upload cover image"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <SelectCustom
                                name="Please select a category"
                                onChange={(item: any) => setData((prev) => ({ ...prev, category_id: item?.id }))}
                                options={categories as any}
                            />
                        </div>
                        <div>
                            <InputCustom
                                type="text"
                                name="author"
                                placeholder="Enter the author name"
                                value={data.author}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <InputCustom
                                type="date"
                                name="publication_date"
                                placeholder="Enter publication date"
                                value={data.publication_date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <label className="m-0 pb-1 block" htmlFor="pdf_file">
                                Please add PDF (optional):
                            </label>
                            <InputCustom
                                id="pdf_file"
                                type="file"
                                name="pdf_file"
                                placeholder="Upload book pdf"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <BtnPrimary fullWidth disabled={processing}>
                        {processing ? 'Adding book....' : 'Add Book'}
                    </BtnPrimary>
                </form>
            </div>
        </section>
    );
};

export default BookForm;
