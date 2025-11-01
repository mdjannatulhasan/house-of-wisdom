import { FormEvent, ChangeEvent, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useToast } from '../ui/use-toast';
import InputCustom from '../common/InputCustom';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
    categoriesList,
    fetchCategories,
} from '@/redux/features/category/categorySlice';
import SelectCustom from '../common/SelectCustom';
import { ICategory } from '@/types/globalTypes';

const BookForm = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(categoriesList);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        cover_image: null as any, // Handle file uploads
        price: 0,
        category_id: '',
        publication_date: '',
        author: '',
        pdf_file: null as any,
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('cover_image', data.cover_image as File); // Append file
        formData.append('price', String(data.price));
        formData.append('category_id', data.category_id);
        formData.append('publication_date', data.publication_date);
        formData.append('author', data.author);
        formData.append('pdf_file', data.pdf_file as File); // Append file

        post('/books', {
            data: formData,
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Book added successfully.',
                    description: '',
                });
                reset();
            },
            onError: (errors) => {
                const errorMessage =
                    errors?.message || 'Error in form submission';
                toast({
                    variant: 'destructive',
                    title: 'Book creation Failed.',
                    description: errorMessage,
                });
            },
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData(name as any, files?.[0] || null);
        } else {
            setData(name as any, type === 'number' ? parseFloat(value) : value);
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
                                onChange={(item: any) =>
                                    setData('category_id', item?.id)
                                }
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
                    <BtnPrimary fullWidth disabled={processing}>
                        {processing ? 'Adding book....' : 'Add Book'}
                    </BtnPrimary>
                </form>
            </div>
        </section>
    );
};

export default BookForm;
