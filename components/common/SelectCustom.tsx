'use client';

import { useState } from 'react';

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
    const addedOptions = [{ id: 99999999, title: name, value: '' }, ...options];
    const [selected, setSelected] = useState(value || '');

    return (
        <select
            className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm`}
            value={selected as any}
            onChange={(e) => {
                setSelected(e.target.value);
                onChange(e.target.value);
            }}
        >
            {addedOptions.map((opt, i) => (
                <option key={opt.id || i} value={opt.value as any}>
                    {opt.title}
                </option>
            ))}
        </select>
    );
};

export default SelectCustom;
