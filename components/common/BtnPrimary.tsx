import { ReactNode } from 'react';
import Link from 'next/link';;

export type IButtonType = {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    link?: boolean;
    to?: string;
    href?: any;
    disabled?: boolean;
};

const BtnPrimary = ({
    children,
    type,
    fullWidth,
    link,
    to = '',
    disabled,
    href = '',
}: IButtonType) => {
    return link || href ? (
        <Link
            href={href}
            className={`bg-gradient-to-br from-blue-400 to-blue-600 hover:to-blue-800 text-[white] py-2 px-5 rounded-md text-center ${
                !fullWidth && 'max-w-[300px]'
            } w-full block font-medium`}
        >
            {children}
        </Link>
    ) : (
        <button
            disabled={disabled}
            type={type}
            className={`bg-gradient-to-br from-blue-400 to-blue-600 hover:to-blue-800 text-[white] py-2 px-5 rounded-md ${
                !fullWidth && 'max-w-[300px]'
            } w-full block font-medium ${
                disabled && 'cursor-not-allowed opacity-40'
            }`}
        >
            {children}
        </button>
    );
};

export default BtnPrimary;
