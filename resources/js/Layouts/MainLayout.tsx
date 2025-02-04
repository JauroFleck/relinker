import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    title: string | null;
}

const MainLayout = ({ children, title }: LayoutProps) => {
    return (
        <div className="bg-gray-300 dark:bg-slate-700 block min-h-screen relative pb-14">
            <Head title={title || 'Relinker'} />
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
