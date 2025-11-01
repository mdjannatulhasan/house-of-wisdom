import Link from 'next/link';
import FooterLogo from '@/assets/FooterLogo';

const Footer = () => {
    return (
        <footer className="bg-[#0e1a32]">
            <div className="container py-6">
                <div className="grid lg:grid-cols-3 gap-6  lg:justify-center text-[#ffffff]">
                    <div>
                        <FooterLogo />
                    </div>
                    <div className="flex gap-20">
                        <ul className="space-y-2">
                            <li className="text-[#ffffff] font-bold">
                                Explore By
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/books">
                                    All Books
                                </Link>
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/dashboard/books/create">
                                    Add your book
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-20">
                        <ul className="space-y-2">
                            <li className="text-[#ffffff] font-bold">
                                Visitor's Corner
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/login">Sign in</Link>
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/register">Sign up</Link>
                            </li>
                            <li className="text-[#ffffff]">
                                <Link href="/wishlist">Wishlist</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-2 text-2xl"></div>
                </div>
            </div>
            <div className="text-center pb-4 text-white opacity-60">
                © 2023 - All rights reserved, Owner -{' '}
                <a
                    className="underline hover:text-blue-500"
                    href="https://smjhm.com"
                    target="blank"
                >
                    Hasan
                </a>
            </div>
        </footer>
    );
};

export default Footer;
