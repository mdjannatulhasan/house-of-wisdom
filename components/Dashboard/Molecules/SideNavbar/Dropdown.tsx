import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import DropdownToggleButton from '../../Atoms/DropdownToggleButton';
import { TDropdownItem } from '@/types/dashboardTypes';
import DropdownItem from './DropdownItem';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

type Props = { name: string; items: TDropdownItem[]; icon: ReactElement };

const Dropdown = ({ name, items, icon }: Props) => {
    const { url } = usePage();
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
        items.forEach((item) => {
            if (url === new URL(item.href).pathname) {
                setShowItems(true);
            }
        });
    }, [items, url]);

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
