import React from 'react';

type Props = { icon?: string };

const BreadCrumbSeparator = ({ icon = 'chevron_right' }: Props) => {
    return (
        <i className="material-symbols-rounded text-xl flex-shrink-0 text-default-500">
            {icon}
        </i>
    );
};

export default BreadCrumbSeparator;
