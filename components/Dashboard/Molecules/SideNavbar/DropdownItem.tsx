import { TDropdownItem } from '@/types/dashboardTypes';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// type Props = { name: string; icon?: string; id: number; href?: string };

const DropdownItem = ({ name, icon, id, href }: TDropdownItem) => {
    const [active, setActive] = useState(false);
    const { url } = usePage();
    useEffect(() => {
        if (url === new URL(href).pathname) {
            setActive(true);
        }
    }, [url]);
    return (
        <li className="menu-item">
            <Link
                className={`flex items-center gap-x-3.5 rounded-md px-5 py-2 text-sm font-medium text-default-700 hover:!bg-default-900/5 ${
                    active ? 'active !bg-[#00000000]' : ''
                }`}
                href={href}
            >
                {icon}
                {name}
            </Link>
        </li>
    );
};

export default DropdownItem;
