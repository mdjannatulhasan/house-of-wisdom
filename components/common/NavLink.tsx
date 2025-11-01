import { ReactNode } from 'react';
import Link from 'next/link';;

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => {
    return (
        <Link href={href} className="flex items-center gap-3 nav-link">
            {children}
        </Link>
    );
};

export default NavLink;
