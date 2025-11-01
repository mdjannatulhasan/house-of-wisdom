'use client';

import { FormEvent, ChangeEvent, useState } from 'react';
import { useToast } from '../ui/use-toast';
import Container from '../common/Container';
import SecTitle from '../common/SecTitle';
import InputCustom from '../common/InputCustom';
import BtnPrimary from '../common/BtnPrimary';
import { IBook } from '@/types/homeType';
import { useRouter } from 'next/navigation';

interface BookFormProps {
    book: any;
}

const BookForm = ({ book }: BookFormProps) => {
    const [data, setData] = useState({
        title: book.title || '',
        cover_image: null as File | null,
        genre: book.genre || '',
        publication_date: book.publication_date || '',
        author: book.author || '',
        pdf_file: null as File | null,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('title', data.title);
        if (data.cover_image) {
            formData.append('cover_image', data.cover_image);
        }
        formData.append('genre', data.genre);
        formData.append('publication_date', data.publication_date);
        formData.append('author', data.author);
        if (data.pdf_file) {
            formData.append('pdf_file', data.pdf_file);
        }

        try {
            const response = await fetch(`/api/books/${book.id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json();
                setErrors(result.errors || {});
                toast({
                    variant: 'destructive',
                    title: 'Book update Failed.',
                    description: result.message || 'Error in form submission',
                });
            } else {
                toast({
                    variant: 'success',
                    title: 'Book updated successfully.',
                    description: '',
                });
                router.push(`/books/${book.id}`);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Book update Failed.',
                description: 'An error occurred',
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData({ ...data, [name]: files?.[0] || null });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    return (
        <section className="pt-16 pb-8">
            <Container>
                <div className="text-center mb-4">
                    <SecTitle>Edit a Book</SecTitle>
                </div>
                <div className="shadow p-8 max-w-4xl mx-auto">
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
                                <InputCustom
                                    type="text"
                                    name="genre"
                                    placeholder="Enter genre"
                                    value={data.genre}
                                    onChange={handleInputChange}
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
                                <label
                                    className="m-0 pb-1 block"
                                    htmlFor="pdf_file"
                                >
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
                        <BtnPrimary fullWidth disabled={processing} type="submit">
                            {processing ? 'Updating book....' : 'Update Book'}
                        </BtnPrimary>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default BookForm;
