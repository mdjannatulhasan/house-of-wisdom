'use client';

import { MessageCircle, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import CommentForm from './CommentForm';

type CommentItem = {
    id: string;
    author: string;
    date: string;
    content: string;
    likes: number;
    replies: CommentItem[];
};

type Props = {
    comment: CommentItem;
    level?: number;
    onReply: (content: string, parentId: string | null) => void;
};

const Comment = ({ comment, level = 0, onReply }: Props) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <div className={`${level > 0 ? 'ml-8' : ''} mb-4`}>
            <div className="bg-red-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                        {comment.date}
                    </span>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                        <ThumbsUp size={16} className="mr-1" />
                        <span>{comment.likes}</span>
                    </button>
                    <button
                        className="flex items-center text-gray-500 hover:text-blue-500"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                    >
                        <MessageCircle size={16} className="mr-1" />
                        <span>Reply</span>
                    </button>
                </div>
            </div>
            {showReplyForm && (
                <CommentForm
                    parentId={comment.id}
                    onSubmit={(content, parentId) => {
                        onReply(content, parentId);
                        setShowReplyForm(false);
                    }}
                />
            )}
            {comment.replies.map((reply) => (
                <Comment
                    key={reply.id}
                    comment={reply}
                    level={level + 1}
                    onReply={onReply}
                />
            ))}
        </div>
    );
};
export default Comment;
