
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Users, Calendar, Trophy, Search, Bell, Menu, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AcademyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const tabs = [
        { name: 'Comunidad', href: '/academy/community', icon: Users },
        { name: 'Aulas', href: '/academy', icon: Layout },
        { name: 'Calendario', href: '/academy/calendar', icon: Calendar },
        { name: 'Líderes', href: '/academy/leaderboard', icon: Trophy },
        { name: 'Ajustes', href: '/academy/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-btraffic-dark text-white selection:bg-btraffic-lime selection:text-black">
            {/* Academy Header */}
            <header className="sticky top-0 z-50 bg-btraffic-dark/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-btraffic-lime flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                            <span className="font-black text-black text-lg">B</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-black text-xl tracking-tighter uppercase leading-none">Btraffic</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-btraffic-lime font-bold">Academy</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar cursos, lecciones o estrategias..."
                            className="w-full bg-btraffic-gray/50 border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-btraffic-lime/50 transition-colors"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-btraffic-lime relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-btraffic-blue rounded-full"></span>
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <div className="flex items-center gap-2 pl-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-btraffic-lime to-btraffic-blue border border-white/20"></div>
                            <span className="text-sm font-bold hidden lg:block">Estratega Junior</span>
                        </div>
                        <button className="md:hidden p-2">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Sub-navigation Tabs (Skool Style) */}
            <nav className="bg-btraffic-dark border-b border-white/5 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => {
                        const isActive = (tab.href === '/academy' && (pathname === '/academy' || pathname.startsWith('/academy/course') || pathname.startsWith('/academy/lesson'))) ||
                            (tab.href !== '/academy' && pathname.startsWith(tab.href));
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`relative flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${isActive ? 'text-btraffic-lime' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <tab.icon size={16} />
                                {tab.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-btraffic-lime"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
