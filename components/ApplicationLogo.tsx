import { SVGAttributes } from 'react';
import logo from './../assets/images/logo.png';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return <img className="h-[50px]" src={logo} alt="log" />;
}
