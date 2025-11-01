import { useForm } from '@inertiajs/react';
import InputCustom from '../common/InputCustom';
import SubTitle from '../common/SubTitle';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { IChapter } from '@/types/globalTypes';
import CustomEditor from '../CustomEditor';

type Props = {};

function AddChapterContents({}: Props) {
    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state) => state.book);
    const { data, setData, post, errors, reset } = useForm({
        book_id: 0,
        chapter_id: 0,
        title: '',
        content: '',
    } as any);
    const [chapters, setChapters] = useState<IChapter[]>([]);

    useEffect(() => {
        console.log(books);

        if (data.book_id) {
            console.log('here');

            const book = books.find((book) => book.id == data.book_id);
            console.log(book);
            if (book?.chapters) {
                setChapters(book?.chapters as IChapter[]);
            }
        }
    }, [data.book_id]);

    const handleEditorChange = (content: string) => {
        setData('content', content);
    };

    console.log(data);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('content_create'), {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Content added successfully.',
                    description: '',
                });
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
        <section>
            <div className="card p-8 mt-8 pt-6">
                <SubTitle>Add a page content</SubTitle>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-3">
                        <select
                            className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800`}
                            onChange={(e) =>
                                setData('book_id', parseInt(e.target.value))
                            }
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
                        <select
                            className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800`}
                            onChange={(e) =>
                                setData('chapter_id', parseInt(e.target.value))
                            }
                            value={data?.chapter_id}
                        >
                            <option value="">Select a chapter</option>
                            {chapters?.map((chapter) => (
                                <option
                                    key={chapter.id}
                                    value={chapter.id as number}
                                >
                                    {chapter.title}
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
                            placeholder="Enter title"
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
                        <BtnPrimary type="submit">Add Content</BtnPrimary>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddChapterContents;
