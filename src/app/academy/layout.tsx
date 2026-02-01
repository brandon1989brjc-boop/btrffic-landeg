
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Users, Calendar, Trophy, Search, Bell, Menu, Settings, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AcademyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    // Dynamic progress based on localStorage
    useEffect(() => {
        const updateProgress = () => {
            const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
            const total = 20; // Total sessions
            setProgress(Math.round((completed.length / total) * 100));
        };

        updateProgress();
        // Listen for storage changes in the same window
        window.addEventListener('storage_update', updateProgress);
        return () => window.removeEventListener('storage_update', updateProgress);
    }, []);

    const tabs = [
        { name: 'Aulas', href: '/academy', icon: BookOpen },
        { name: 'Ajustes', href: '/academy/settings', icon: Settings },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsSidebarOpen(false)}>
                    <div className="w-9 h-9 rounded-lg bg-btraffic-lime flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                        <span className="font-black text-black text-base">B</span>
                    </div>
                    <div>
                        <h1 className="font-black text-base tracking-tighter uppercase leading-none">Btraffic</h1>
                        <p className="text-[7px] uppercase tracking-[0.3em] text-btraffic-lime font-black">Academy</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {tabs.map((tab) => {
                    const isActive = (tab.href === '/academy' && (pathname === '/academy' || pathname.startsWith('/academy/course') || pathname.startsWith('/academy/lesson'))) ||
                        (tab.href !== '/academy' && pathname.startsWith(tab.href));

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-btraffic-lime text-black shadow-[0_0_20px_rgba(162,255,0,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <tab.icon size={16} />
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-gray-500">
                        <span>Tu Progreso</span>
                        <span className="text-btraffic-lime">{progress}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-btraffic-lime"
                        />
                    </div>
                    <Link href="/academy/settings" className="block text-[8px] font-bold text-center uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        Ver Certificaciones
                    </Link>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-btraffic-dark text-white selection:bg-btraffic-lime selection:text-black flex font-['Outfit']">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-btraffic-dark sticky top-0 h-screen z-[110]">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-btraffic-dark border-r border-white/10 z-[201] lg:hidden flex flex-col"
                        >
                            <SidebarContent />
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute top-6 right-4 p-2 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header / Desktop Top Bar */}
                <header className="sticky top-0 z-[100] bg-btraffic-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                        {/* Mobile Toggle & Brand */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors active:scale-90"
                            >
                                <Menu size={20} />
                            </button>
                            <Link href="/" className="w-8 h-8 rounded bg-btraffic-lime flex items-center justify-center">
                                <span className="font-black text-black">B</span>
                            </Link>
                        </div>

                        <div className="flex-1 hidden sm:block"></div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <div className="w-px h-5 bg-white/10"></div>
                            <div className="flex items-center gap-3 pl-1 group cursor-pointer">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-1 text-white group-hover:text-btraffic-lime transition-colors">Estratega Junior</p>
                                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none">VIP</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-btraffic-lime to-btraffic-blue border border-white/20 shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Btraffic" alt="Avatar" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 md:p-10 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
