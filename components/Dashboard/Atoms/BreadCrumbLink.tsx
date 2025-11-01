type Props = { name: string };

function BreadCrumbLink({ name }: Props) {
    return (
        <a
            href="#"
            className="text-sm font-medium text-default-700"
            aria-current="page"
        >
            {name}
        </a>
    );
}

export default BreadCrumbLink;
