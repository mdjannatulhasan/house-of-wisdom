'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { useSession } from 'next-auth/react';

type Props = {};

const Header = (props: Props) => {
    const { data: session } = useSession();
    const auth = { user: session?.user || null };
    const [show, setShow] = useState(false);

    return (
        <header className="app-header sticky top-0 z-50 h-topbar flex items-center px-5 bg-white border-b border-default-200">
            <div className="flex items-center gap-4 w-full">
                <a href="index.html" className="md:hidden flex">
                    <img
                        src="/assets/images/logo-sm.png"
                        className="h-6"
                        alt="Small logo"
                    />
                </a>

                <button
                    id="button-toggle-menu"
                    className="text-default-500 hover:text-default-600 p-2 rounded-full cursor-pointer"
                    data-hs-overlay="#app-menu"
                    aria-label="Toggle navigation"
                >
                    <i className="i-tabler-menu-2 text-2xl"></i>
                </button>

                <div className="md:flex hidden items-center relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i className="i-ph-magnifying-glass text-base"></i>
                    </div>
                    <input
                        type="search"
                        className="form-input px-10 rounded-lg  bg-gray-500/10 border-transparent focus:border-transparent w-80"
                        placeholder="Search..."
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                        <i className="i-ph-microphone text-base hover:text-black"></i>
                    </button>
                </div>

                <div className="ms-auto hs-dropdown relative inline-flex [--placement:bottom-right]">
                    <button
                        type="button"
                        className="hs-dropdown-toggle inline-flex items-center"
                    >
                        <img
                            src="/assets/images/flags/us.jpg"
                            alt="user-image"
                            className="h-4 w-6"
                        />
                    </button>

                    <div className="hs-dropdown-menu duration mt-2 min-w-48 rounded-lg border border-default-200 bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 hidden">
                        <a
                            href="javascript:void(0);"
                            className="flex items-center gap-2.5 py-2 px-3 rounded-md text-sm text-default-800 hover:bg-gray-100"
                        >
                            <img
                                src="/assets/images/flags/germany.jpg"
                                alt="user-image"
                                className="h-4"
                            />
                            <span className="align-middle">German</span>
                        </a>

                        <a
                            href="javascript:void(0);"
                            className="flex items-center gap-2.5 py-2 px-3 rounded-md text-sm text-default-800 hover:bg-gray-100"
                        >
                            <img
                                src="/assets/images/flags/italy.jpg"
                                alt="user-image"
                                className="h-4"
                            />
                            <span className="align-middle">Italian</span>
                        </a>

                        <a
                            href="javascript:void(0);"
                            className="flex items-center gap-2.5 py-2 px-3 rounded-md text-sm text-default-800 hover:bg-gray-100"
                        >
                            <img
                                src="/assets/images/flags/spain.jpg"
                                alt="user-image"
                                className="h-4"
                            />
                            <span className="align-middle">Spanish</span>
                        </a>

                        <a
                            href="javascript:void(0);"
                            className="flex items-center gap-2.5 py-2 px-3 rounded-md text-sm text-default-800 hover:bg-gray-100"
                        >
                            <img
                                src="/assets/images/flags/russia.jpg"
                                alt="user-image"
                                className="h-4"
                            />
                            <span className="align-middle">Russian</span>
                        </a>
                    </div>
                </div>

                <div className="md:flex hidden">
                    <button
                        data-toggle="fullscreen"
                        type="button"
                        className="p-2"
                    >
                        <span className="sr-only">Fullscreen Mode</span>
                        <span className="flex items-center justify-center size-6">
                            <i className="i-tabler-maximize text-2xl flex group-[-fullscreen]:hidden"></i>
                            <i className="i-tabler-minimize text-2xl hidden group-[-fullscreen]:flex"></i>
                        </span>
                    </button>
                </div>

                <div className="relative">
                    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                        <button
                            type="button"
                            className="hs-dropdown-toggle"
                            onClick={() => setShow(!show)}
                        >
                            {/* <img
                                src="assets/images/users/avatar-8.jpg"
                                alt="user-image"
                                className="rounded-full h-10"
                            /> */}
                            {auth?.user?.name}
                        </button>
                        <AnimatePresence>
                            {show && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 20 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-md"
                                >
                                    <a
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        href="#"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        href="#"
                                    >
                                        Feed
                                    </a>
                                    <a
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        href="#"
                                    >
                                        Analytics
                                    </a>
                                    <a
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        href="#"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        href="#"
                                    >
                                        Support
                                    </a>
                                    <hr className="my-2" />
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
