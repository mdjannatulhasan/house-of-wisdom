'use client';

import MainLayout from '@/components/layouts/MainLayout';
import PostList from '@/components/post/PostList';
import { useEffect, useState } from 'react';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error('Error fetching posts:', err));
    }, []);

    return (
        <MainLayout>
            <div className="container py-12">
                <h1 className="text-4xl font-bold mb-8">All Posts</h1>
                <PostList posts={posts} />
            </div>
        </MainLayout>
    );
};

export default Posts;
