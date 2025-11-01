'use client';

import { setContent } from '@/redux/features/chapter/chapterSlice';
import { useAppDispatch } from '@/redux/hook';
import { IChapter } from '@/types/globalTypes';
import { FaCircle, FaCircleDot } from 'react-icons/fa6';

type Props = { chapter: IChapter };

const BookIndex = ({ chapter }: Props) => {
    const dispatch = useAppDispatch();
    const bookIndexes = (chapter.contents as IChapter[]).map((content) => (
        <button
            className="ml-5 flex items-center gap-2"
            onClick={() => dispatch(setContent(content.content))}
        >
            <FaCircle className="text-[8px]" /> {content.title}
        </button>
    ));
    return (
        <li className="last:border-b border-t border-slate-300 py-2">
            <button
                className={`flex items-center gap-2 ${
                    bookIndexes?.length
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                }`}
                onClick={() => {
                    if (chapter.contents?.length > 0) {
                        dispatch(
                            setContent((chapter.contents[0] as any)?.content)
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
