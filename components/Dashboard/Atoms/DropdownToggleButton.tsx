import { ReactElement } from 'react';

type Props = {
    name: string;
    icon: ReactElement;
    showItems: boolean;
    onClick?: () => void;
};

function DropdownToggleButton({
    name,
    showItems,
    icon,
    onClick = () => {},
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`hs-accordion-toggle group flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm font-medium text-default-700 transition-all hover:bg-default-900/5 ${
                showItems
                    ? '!bg-primary/10 hover:!bg-primary/20 !text-primary'
                    : ''
            } w-full`}
        >
            {icon}
            <span className="menu-text">{name} </span>
            <span
                className={`i-tabler-chevron-right ms-auto text-sm transition-all ${
                    showItems ? 'rotate-90' : ''
                }`}
            ></span>
        </button>
    );
}

export default DropdownToggleButton;
