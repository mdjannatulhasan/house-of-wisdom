import AdminMenu from '../Molecules/AdminMenu';
import ApplicationLogo from '@/components/ApplicationLogo';

const SideNavbar = () => {
    return (
        <aside
            id="app-menu"
            className="hs-overlay fixed inset-y-0 start-0 z-60 hidden w-sidenav min-w-sidenav bg-white border-e border-default-200 overflow-y-auto -translate-x-full transform transition-all duration-300 hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:z-30 lg:block lg:translate-x-0 rtl:translate-x-full rtl:hs-overlay-open:translate-x-0 rtl:lg:translate-x-0 print:hidden [--body-scroll:true] [--overlay-backdrop:true] lg:[--overlay-backdrop:false]"
        >
            <div className="sticky top-0 flex h-topbar items-center justify-center px-6 border-b border-default-200 .bg-primary/5">
                <a href="/">
                    <ApplicationLogo />
                </a>
            </div>

            <div className="p-4" data-simplebar>
                <AdminMenu />
            </div>
        </aside>
    );
};

export default SideNavbar;
