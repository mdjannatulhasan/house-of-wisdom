'use client';

import { TDropdownItem } from '@/types/dashboardTypes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// type Props = { name: string; icon?: string; id: number; href?: string };

const DropdownItem = ({ name, icon, id, href }: TDropdownItem) => {
    const [active, setActive] = useState(false);
    const url = usePathname();
    useEffect(() => {
        const target = href || '';
        const normalized = target.startsWith('http')
            ? (() => {
                  try {
                      return new URL(target).pathname;
                  } catch {
                      return target;
                  }
              })()
            : target;
        if (url === normalized || url.startsWith(normalized)) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [url, href]);
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
