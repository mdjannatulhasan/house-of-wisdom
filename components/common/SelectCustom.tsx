import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

type Option = {
    id?: number;
    value: string | number | null;
    title: string;
};
type Props = {
    name?: string;
    value?: string | number;
    onChange: any;
    options?: Option[];
};

const SelectCustom = ({ name, value, onChange, options = [] }: Props) => {
    const addedOptions = [{ id: 99999999, title: name }, ...options];

    const [selected, setSelected] = useState(value || addedOptions[0]);

    const optionElements = addedOptions.map((option, index) => (
        <ListboxOption
            key={option?.id || index}
            value={option}
            className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-blue-100 cursor-pointer "
        >
            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />

            {option?.title}
        </ListboxOption>
    ));
    console.log(selected);

    return (
        <Listbox
            value={selected}
            onChange={(data) => {
                setSelected(data);
                onChange(data);
            }}
        >
            <ListboxButton
                className={clsx(
                    'relative block w-full rounded-lg border bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 cursor-pointer ',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
            >
                {(selected as any)?.title}
                <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                />
            </ListboxButton>
            <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'w-[var(--button-width)] rounded-lg border border-dark/5 bg-gray-100 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none shadow-sm',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 mt-1'
                )}
            >
                {optionElements}
            </ListboxOptions>
        </Listbox>
    );
};

export default SelectCustom;
