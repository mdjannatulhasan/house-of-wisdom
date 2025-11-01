import React, { useRef } from 'react';
import Dropdown from './SideNavbar/Dropdown';
import { SolarBook2BoldDuotone } from '@/public/assets/Backend/SolarBook2BoldDuotone';
import { SolarPenNewSquareBoldDuotone } from '@/public/assets/Backend/SolarPenNewSquareBoldDuotone';
import Link from 'next/link';;
import { SolarThreeSquaresLineDuotone } from '@/public/assets/Backend/SolarThreeSquaresLineDuotone';
import { SolarFileTextBoldDuotone } from '@/public/assets/Backend/SolarFileTextBoldDuotone';

const componentsDropDownMenuItems = [
    {
        id: 1,
        name: 'Add a book',
        href: '/dashboard/books/create',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
    {
        id: 2,
        name: 'Add a chapter',
        href: '/dashboard/chapters/create',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
    {
        id: 3,
        name: 'Add chapter content',
        href: '/dashboard/chapters/content',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
];
const componentsDropDownMenuCategoryItems = [
    {
        id: 1,
        name: 'Add Category',
        href: '/dashboard',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
    {
        id: 2,
        name: 'Edit Category',
        href: '/dashboard',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
];
const componentsDropDownMenuPostItems = [
    {
        id: 1,
        name: 'Add Post',
        href: '/dashboard',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
    {
        id: 2,
        name: 'Edit Post',
        href: '/dashboard',
        icon: <SolarPenNewSquareBoldDuotone width={16} />,
    },
];

export default function AdminMenu() {
    const menuRef = useRef<HTMLUListElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id="app-menu"
            ref={scrollWrapperRef}
            className="simplebar-content-wrapper"
        >
            <ul
                ref={menuRef}
                className="admin-menu hs-accordion-group flex w-full flex-col gap-1.5"
            >
                <li className="menu-item">
                    <Link
                        className="group flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm font-medium text-default-700 transition-all hover:bg-default-900/5"
                        href={'/dashboard'}
                    >
                        <i className="i-solar-home-smile-bold-duotone text-2xl"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="px-5 py-2 text-sm font-medium text-default-600">
                    Elements
                </li>

                <li className="menu-item hs-accordion">
                    <Dropdown
                        name="Categories"
                        items={componentsDropDownMenuCategoryItems}
                        icon={<SolarThreeSquaresLineDuotone />}
                    />
                </li>
                <li className="menu-item hs-accordion">
                    <Dropdown
                        name="Books"
                        items={componentsDropDownMenuItems}
                        icon={<SolarBook2BoldDuotone />}
                    />
                </li>
                <li className="menu-item hs-accordion">
                    <Dropdown
                        name="Posts"
                        items={componentsDropDownMenuPostItems}
                        icon={<SolarFileTextBoldDuotone />}
                    />
                </li>

                <li className="menu-item hs-accordion">
                    <button className="hs-accordion-toggle group flex w-full items-center gap-x-3.5 rounded-md px-3 py-2 text-sm font-medium text-default-700 transition-all hover:bg-default-900/5 hs-accordion-active:bg-primary/10 hs-accordion-active:text-primary">
                        <i className="i-solar-document-text-bold-duotone text-2xl"></i>
                        <span className="menu-text"> Forms </span>
                        <span className="i-tabler-chevron-right ms-auto text-sm transition-all hs-accordion-active:rotate-90"></span>
                    </button>

                    <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
                        <ul className="mt-2 space-y-2">
                            <li className="menu-item">
                                <a
                                    href="forms-inputs.html"
                                    className="flex items-center gap-x-3.5 rounded-md px-5 py-2 text-sm font-medium text-default-700 hover:bg-default-900/5"
                                >
                                    <i className="i-tabler-circle-filled scale-[.25] text-lg opacity-75"></i>
                                    <span className="menu-text">Inputs</span>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a
                                    href="forms-check-radio.html"
                                    className="flex items-center gap-x-3.5 rounded-md px-5 py-2 text-sm font-medium text-default-700 hover:bg-default-900/5"
                                >
                                    <i className="i-tabler-circle-filled scale-[.25] text-lg opacity-75"></i>
                                    <span className="menu-text">
                                        Checkbox & Radio
                                    </span>
                                </a>
                            </li>
                            {/* Add more form submenu items here */}
                        </ul>
                    </div>
                </li>

                <li className="menu-item">
                    <a
                        href="maps-vector.html"
                        className="group flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm font-medium text-default-700 transition-all hover:bg-default-900/5"
                    >
                        <i className="i-solar-map-point-wave-bold-duotone text-2xl"></i>
                        <span className="menu-text"> Maps </span>
                    </a>
                </li>

                <li className="menu-item">
                    <a
                        href="tables-basic.html"
                        className="group flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm font-medium text-default-700 transition-all hover:bg-default-900/5 hs-accordion-active:bg-primary/10 hs-accordion-active:text-primary"
                    >
                        <i className="i-solar-server-minimalistic-bold-duotone text-2xl"></i>
                        <span className="menu-text"> Tables </span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
