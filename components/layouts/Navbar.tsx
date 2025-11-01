'use client';

import Link from 'next/link';
import { LucideAlignRight } from 'lucide-react';
import { GiBookCover, GiHearts, GiHouse, GiNotebook } from 'react-icons/gi';
import { BiLogIn, BiSolidUserPlus } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { handleLogout } from '@/redux/features/user/userSlice';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import NavLink from '@/components/common/NavLink';
import TopbarLogo from '@/public/assets/TopbarLogo';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    const { email } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    return (
        <nav className="w-full h-16 backdrop-blur-lg z-10 py-2">
            <div className="container bg-white/60">
                <div className="flex items-center justify-between w-full h-full mx-auto ">
                    <div>
                        <Link href="/">
                            <TopbarLogo />
                        </Link>
                    </div>
                    <div className="min-w-[200px]">
                        <ul className="flex justify-end">
                            {session?.user ? (
                                <li>
                                    <Button
                                        className="text-md"
                                        variant="link"
                                        onClick={() => {
                                            dispatch(handleLogout());
                                            signOut({ callbackUrl: '/' });
                                        }}
                                    >
                                        Log out
                                    </Button>
                                </li>
                            ) : (
                                <li>
                                    <Button
                                        className="text-md"
                                        variant="link"
                                        asChild
                                    >
                                        <Link href="/login">
                                            Sign In
                                        </Link>
                                    </Button>
                                </li>
                            )}
                            <li>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant={'ghost'}>
                                            <LucideAlignRight />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle className="lg:text-2xl text-xl">
                                                Bookish Pathways
                                            </SheetTitle>
                                            <SheetDescription className="lg:text-lg text-md">
                                                Unleash Your Imagination,
                                                Explore Boundless Stories with
                                                us. Here are our main pages for
                                                you:
                                            </SheetDescription>
                                        </SheetHeader>

                                        <div className="mt-7 lg:text-xl text-lg font-semibold">
                                            <ul className="flex flex-col gap-4">
                                                <li>
                                                    <NavLink href="/">
                                                        <GiHouse />
                                                        <SheetClose asChild>
                                                            <span>Home</span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink href="/books">
                                                        <GiBookCover />
                                                        <SheetClose asChild>
                                                            <span>
                                                                All Books
                                                            </span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink href="/my-books">
                                                        <GiBookCover />
                                                        <SheetClose asChild>
                                                            <span>
                                                                My Books
                                                            </span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                <li className="">
                                                    <NavLink href="/dashboard/books/create">
                                                        <GiNotebook />
                                                        <SheetClose asChild>
                                                            <span>
                                                                Add A Book
                                                            </span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                <li className="">
                                                    <NavLink href="/dashboard/chapters/content">
                                                        <GiNotebook />
                                                        <SheetClose asChild>
                                                            <span>
                                                                Add Chapter
                                                                Content
                                                            </span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                <li className="">
                                                    <NavLink href="/posts">
                                                        <GiHearts />
                                                        <SheetClose asChild>
                                                            <span>Posts</span>
                                                        </SheetClose>
                                                    </NavLink>
                                                </li>
                                                {!email && (
                                                    <>
                                                        <li className="border-t pt-4 border-t-[#cccccc]">
                                                            <NavLink href="/login">
                                                                <BiLogIn />
                                                                <SheetClose
                                                                    asChild
                                                                >
                                                                    <span>
                                                                        Sign in
                                                                    </span>
                                                                </SheetClose>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink href="/register">
                                                                <BiSolidUserPlus />
                                                                <span>
                                                                    Sign up
                                                                </span>
                                                            </NavLink>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
