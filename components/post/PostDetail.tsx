'use client';

interface PostDetailProps {
    post: any;
}

export default function PostDetail({ post }: PostDetailProps) {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    );
}

