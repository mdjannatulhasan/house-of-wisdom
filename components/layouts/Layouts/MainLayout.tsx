import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: any) {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-296px)]">{children}</main>
            <Footer />
        </>
    );
}
