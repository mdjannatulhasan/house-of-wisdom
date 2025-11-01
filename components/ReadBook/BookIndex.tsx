'use client';

import { setContent } from '@/redux/features/chapter/chapterSlice';
import { useAppDispatch } from '@/redux/hook';
import { IChapter } from '@/types/globalTypes';
import { FaCircle, FaCircleDot } from 'react-icons/fa6';

type Props = { chapter: IChapter };

const BookIndex = ({ chapter }: Props) => {
    const dispatch = useAppDispatch();
    const bookIndexes = (chapter as any)?.bookContents?.map(
        (content: any, idx: number) => (
            <button
                key={content.id || idx}
                className="ml-5 flex items-center gap-2"
                onClick={() => dispatch(setContent(content.content))}
            >
                <FaCircle className="text-[8px]" /> Page {idx + 1}
            </button>
        )
    );
    return (
        <li className="last:border-b border-t border-slate-300 py-2">
            <button
                className={`flex items-center gap-2 ${
                    bookIndexes?.length
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                }`}
                onClick={() => {
                    if ((chapter as any)?.bookContents?.length > 0) {
                        dispatch(
                            setContent((chapter as any).bookContents[0]?.content)
                        );
                    }
                }}
            >
                <FaCircleDot className="text-[8px]" />
                {chapter.title}
            </button>
            {bookIndexes?.length > 1 && bookIndexes}
        </li>
    );
};

export default BookIndex;
