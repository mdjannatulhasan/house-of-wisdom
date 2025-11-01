'use client';

interface PostListProps {
    posts: any[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-6">All Posts</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.id} className="border p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-600 mb-4">By {post.author?.name || 'Unknown'}</p>
                        <div 
                            className="prose max-w-none" 
                            dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 200) + '...' }}
                        ></div>
                        <a 
                            href={`/posts/${post.id}`} 
                            className="text-blue-600 hover:underline mt-4 inline-block"
                        >
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

