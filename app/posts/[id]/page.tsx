'use client';

import MainLayout from '@/components/layouts/MainLayout';
import PostDetail from '@/components/post/PostDetail';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Post = () => {
    const params = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`/api/posts/${params.id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error('Error fetching post:', err));
    }, [params.id]);

    return (
        <MainLayout>
            {post ? <PostDetail post={post} /> : <div className="container py-12">Loading...</div>}
        </MainLayout>
    );
};

export default Post;
