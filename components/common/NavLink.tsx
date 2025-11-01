import Link from 'next/link';
import { ReactNode } from 'react';

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
    return (
        <Link href={href} className="nav-link flex items-center gap-2">
            {children}
        </Link>
    );
};

export default NavLink;
