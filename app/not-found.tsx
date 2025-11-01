import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-4xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}

