'use client';

// TODO: Replace Inertia useForm with useState + fetch
// import { useForm } from '@inertiajs/react';
import InputCustom from '../common/InputCustom';
import SubTitle from '../common/SubTitle';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect } from 'react';
import { fetchBooks } from '@/redux/features/book/bookSlice';
import CustomEditor from './../../components/CustomEditor';
import { toast } from '../ui/use-toast';

type Props = {};

function AddChapter({}: Props) {
    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state) => state.book);
    const { data, setData, post, errors, reset } = useForm({
        book_id: 0,
        title: '',
        content: '',
    } as any);

    useEffect(() => {
        dispatch(fetchBooks({}));
    }, []);

    const handleEditorChange = (content: string) => {
        setData('content', content);
    };
    console.log(data);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('chapter_create'), {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Chapter added successfully.',
                    description: '',
                });
                dispatch(fetchBooks({}));
                reset(); // Reset form fields
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'An error occurred. Please check the form and try again.',
                    description: '',
                });
            },
        });
    };

    return (
        <div className="card p-8 pt-6">
            <SubTitle>Add a Chapter</SubTitle>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-3">
                    <select
                        className={`form-select focus:!ring-primary focus:!ring-1 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50`}
                        onChange={(e) => setData('book_id', e.target.value)}
                        value={data?.book_id}
                    >
                        <option value="">Select a book</option>
                        {books?.map((book) => (
                            <option key={book.id} value={book.id as number}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 mt-3">
                    <label
                        htmlFor="chapterTitle"
                        className="block font-medium text-gray-700 pb-1"
                    >
                        Title
                    </label>
                    <InputCustom
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder="Enter chapter title"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="chapterContent"
                        className="block font-medium text-gray-700 pb-1"
                    >
                        Description
                    </label>
                    <CustomEditor
                        handleEditorChange={handleEditorChange}
                        // initialContent="kmkm"
                    />
                </div>
                <div className="flex items-center">
                    <BtnPrimary type="submit">Add Chapter</BtnPrimary>
                </div>
            </form>
        </div>
    );
}

export default AddChapter;
