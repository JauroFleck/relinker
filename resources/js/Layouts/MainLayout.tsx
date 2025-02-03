import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-gray-300 dark:bg-slate-700 h-screen">
            <header>
                <Navbar />
            </header>
            <main className="h-5/6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
