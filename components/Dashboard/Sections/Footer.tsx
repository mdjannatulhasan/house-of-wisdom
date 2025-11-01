import React from 'react';

type Props = {};

function Footer({}: Props) {
    return (
        <footer className="footer bg-white h-16 flex items-center px-6 border-t border-gray-200 ">
            <div className="container flex md:justify-between justify-center w-full gap-4">
                <div>
                    {new Date().getFullYear()} © Hasans co.
                </div>
                <div className="md:flex hidden gap-2 item-center md:justify-end">
                    Design &amp; Develop by
                    <a href="#" className="text-primary">
                        Hasan
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
