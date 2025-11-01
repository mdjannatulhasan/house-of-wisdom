'use client';

import { useState } from 'react';

type Props = {
    parentId?: string | null;
    onSubmit: (content: string, parentId: string | null) => void;
};

const CommentForm = ({ parentId = null, onSubmit }: Props) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(content, parentId);
        setContent('');
    };
    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Write a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
