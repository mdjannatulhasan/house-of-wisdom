import { ChangeEvent } from 'react';

type IInput = {
    type: string;
    id?: string;
    name: string;
    placeholder: string;
    defaultValue?: string | number;
    value?: string | number;
    hidden?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputCustom = ({
    type,
    id,
    name,
    placeholder,
    defaultValue,
    value,
    hidden,
    onChange = () => {},
}: IInput) => {
    return type == 'number' ? (
        <input
            type={type}
            className={`form-input focus:!ring-primary focus:!ring-1 focus:border-primary/50`}
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            min={0}
            hidden={hidden}
            onChange={onChange}
        />
    ) : (
        <input
            type={type}
            className={`form-input focus:!ring-primary focus:!ring-1 focus:border-primary/50`}
            // className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800`}
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            hidden={hidden}
            onChange={onChange}
        />
    );
};

export default InputCustom;
