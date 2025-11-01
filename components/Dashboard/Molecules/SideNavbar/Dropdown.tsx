'use client';

import React, { Fragment, ReactElement, useEffect, useMemo, useState } from 'react';
import DropdownToggleButton from '../../Atoms/DropdownToggleButton';
import { TDropdownItem } from '@/types/dashboardTypes';
import DropdownItem from './DropdownItem';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = { name: string; items: TDropdownItem[]; icon: ReactElement };

const Dropdown = ({ name, items, icon }: Props) => {
    const url = usePathname();
    const storageKey = `admin.dropdown.${name}`;

    const isActiveByUrl = useMemo(() => {
        return items.some((item) => {
            const target = item.href || '';
            const normalized = target.startsWith('http')
                ? (() => {
                      try {
                          return new URL(target).pathname;
                      } catch {
                          return target;
                      }
                  })()
                : target;
            return url === normalized || url.startsWith(normalized);
        });
    }, [items, url]);

    const [showItems, setShowItems] = useState<boolean>(() => {
        // initialize from localStorage if present, else derive from URL
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === 'true') return true;
            if (saved === 'false') return false;
        } catch {}
        return isActiveByUrl;
    });

    // Persist user preference
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, String(showItems));
        } catch {}
    }, [showItems, storageKey]);

    // On route change, only open if currently closed and the URL matches; never force-close
    useEffect(() => {
        if (!showItems && isActiveByUrl) setShowItems(true);
    }, [isActiveByUrl, showItems]);

    const dropdownItems = items.map((item) => {
        return (
            <DropdownItem
                key={item.id}
                name={item.name}
                id={item.id}
                icon={item?.icon}
                href={item.href}
            />
        );
    });

    return (
        <Fragment>
            <DropdownToggleButton
                name={name}
                onClick={() => setShowItems(!showItems)}
                showItems={showItems}
                icon={icon}
            />

            {/* <div
                className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                    showItems ? '' : 'hidden'
                }`}
            >
                <ul className="mt-2 space-y-2">{dropdownItems}</ul>
            </div> */}
            <AnimatePresence initial={false}>
                {showItems && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <ul className="mt-2 space-y-2 ml-4">{dropdownItems}</ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default Dropdown;
