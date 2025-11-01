'use client';

// Rewritten to use useState + fetch instead of Inertia useForm
import InputCustom from '../common/InputCustom';
import SubTitle from '../common/SubTitle';
import BtnPrimary from '../common/BtnPrimary';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { IChapter } from '@/types/globalTypes';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('../CustomEditor'), { ssr: false });

type Props = {};

function AddChapterContents({}: Props) {
    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state) => state.book);
    const [localBooks, setLocalBooks] = useState<Array<{ id: number; title: string }>>([]);
    const [bookId, setBookId] = useState<number | ''>('');
    const [chapterId, setChapterId] = useState<number | ''>('');
    const [content, setContent] = useState<string>('');
    const [chapters, setChapters] = useState<IChapter[]>([]);

    // Load books if not in Redux state
    useEffect(() => {
        const fromRedux = (books || []).map((b: any) => ({ id: b.id, title: b.title }));
        if (fromRedux.length) {
            setLocalBooks(fromRedux);
            return;
        }
        let ignore = false;
        const controller = new AbortController();
        const loadBooks = async () => {
            try {
                const res = await fetch('/api/books', { signal: controller.signal });
                if (!res.ok) throw new Error('Failed to load books');
                const json = await res.json();
                const list = (json?.books || []).map((b: any) => ({ id: b.id, title: b.title }));
                if (!ignore) setLocalBooks(list);
            } catch (_) {
                // ignore
            }
        };
        loadBooks();
        return () => {
            ignore = true;
            controller.abort();
        };
    }, [books]);

    useEffect(() => {
        if (!bookId) {
            setChapters([]);
            return;
        }
        const controller = new AbortController();
        const load = async () => {
            try {
                const res = await fetch(`/api/chapters?book_id=${bookId}`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error('Failed to load chapters');
                const json = await res.json();
                setChapters(json || []);
            } catch (_) {
                // noop toast for now
            }
        };
        load();
        return () => controller.abort();
    }, [bookId]);

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!bookId || !chapterId || !content) {
            toast({
                variant: 'destructive',
                title: 'Missing required fields',
                description: 'Select book, chapter and add content.',
            });
            return;
        }
        try {
            const res = await fetch('/api/book-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chapter_id: Number(chapterId),
                    content,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || 'Failed to add content');
            toast({ variant: 'success', title: 'Content added successfully.' });
            // reset
            setBookId('');
            setChapterId('');
            setContent('');
            setChapters([]);
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'An error occurred. Please try again.',
                description: e?.message,
            });
        }
    };

    return (
        <section>
            <div className="card p-8 mt-8 pt-6">
                <SubTitle>Add a page content</SubTitle>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-3">
                        <select
                            className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800`}
                            onChange={(e) => setBookId(e.target.value ? parseInt(e.target.value) : '')}
                            value={bookId}
                        >
                            <option value="">Select a book</option>
                            {(localBooks || []).map((book) => (
                                <option key={book.id} value={book.id as number}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 mt-3">
                        <select
                            className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800`}
                            onChange={(e) => setChapterId(e.target.value ? parseInt(e.target.value) : '')}
                            value={chapterId}
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
