
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
        <div className="min-h-screen bg-btraffic-dark text-white selection:bg-btraffic-lime selection:text-black flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-btraffic-dark sticky top-0 h-screen z-[110]">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3 group">
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
                            <span className="text-btraffic-lime">12%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-btraffic-lime w-[12%]" />
                        </div>
                        <Link href="/academy/settings" className="block text-[8px] font-bold text-center uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                            Ver Certificaciones
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header / Desktop Top Bar */}
                <header className="sticky top-0 z-[100] bg-btraffic-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                        {/* Mobile Toggle & Brand */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <button className="p-2 -ml-2 text-gray-400">
                                <Menu size={20} />
                            </button>
                            <Link href="/" className="w-8 h-8 rounded bg-btraffic-lime flex items-center justify-center">
                                <span className="font-black text-black">B</span>
                            </Link>
                        </div>

                        {/* Search Bar - Premium Style */}
                        <div className="flex-1 max-w-xl relative hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar en el Ecosistema..."
                                className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-btraffic-lime/30 focus:bg-white/10 transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-btraffic-lime transition-colors relative">
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-btraffic-blue rounded-full"></span>
                            </button>
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
