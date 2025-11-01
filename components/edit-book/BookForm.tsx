import { FormEvent, ChangeEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useToast } from '../ui/use-toast';
import Container from '../common/Container';
import SecTitle from '../common/SecTitle';
import InputCustom from '../common/InputCustom';
import BtnPrimary from '../common/BtnPrimary';
import { IBook } from '@/types/homeType';

const BookForm = () => {
    const { book }: { book: IBook } = usePage().props as any;
    const { data, setData, patch, processing, errors } = useForm({
        title: book.title || '',
        cover_image: book.cover_image || (null as any), // Handle file uploads
        genre: book.genre || '',
        publication_date: book.publication_date || '',
        author: book.author || '',
        pdf_file: book.pdf_file || (null as any),
    });
    console.log(book);

    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title || book.title);
        formData.append(
            'cover_image',
            (data.cover_image as File) || book.cover_image
        ); // Append file
        formData.append('genre', data.genre || book.genre);
        formData.append(
            'publication_date',
            data.publication_date || (book.publication_date as string)
        );
        formData.append('author', data.author || (book.author as string));
        formData.append('pdf_file', (data.pdf_file as File) || book.pdf_file); // Append file
        console.log(formData);

        patch('/books', {
            data: formData,
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Book added successfully.',
                    description: '',
                });
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
                        <BtnPrimary fullWidth disabled={processing}>
                            {processing ? 'Updating book....' : 'Update Book'}
                        </BtnPrimary>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default BookForm;
