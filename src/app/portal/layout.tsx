'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Key, FileText, Activity, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [clientName, setClientName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const isLoginPage = pathname === '/portal';

    useEffect(() => {
        const auth = localStorage.getItem('btraffic_client_auth');

        if (isLoginPage) {
            if (auth) {
                router.push('/portal/dashboard');
            } else {
                setLoading(false);
            }
            return;
        }

        if (!auth) {
            router.push('/portal');
            return;
        }

        setClientName(localStorage.getItem('btraffic_client_name') || 'Cliente');
        setLoading(false);
    }, [router, isLoginPage]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-btraffic-lime font-black uppercase tracking-[0.3em] animate-pulse">
                    Verificando Credenciales...
                </div>
            </div>
        );
    }

    // Si es la página de login, renderizamos el contenido directamente sin el contenedor del dashboard
    if (isLoginPage) {
        return <>{children}</>;
    }

    const handleLogout = () => {
        localStorage.removeItem('btraffic_client_auth');
        localStorage.removeItem('btraffic_client_name');
        router.push('/portal');
    };

    const sidebarItems = [
        { icon: Activity, label: 'Estado del Ecosistema', href: '/portal/dashboard' },
        { icon: Key, label: 'Bóveda de Credenciales', href: '/portal/dashboard?tab=vault' },
        { icon: FileText, label: 'Centro de Documentación', href: '/portal/dashboard?tab=files' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex font-['Outfit']">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-black sticky top-0 h-screen z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-btraffic-lime flex items-center justify-center font-black text-black">B</div>
                        <div className="flex flex-col">
                            <span className="font-black text-sm uppercase tracking-tight">Btraffic</span>
                            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Portal Cliente</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon size={16} className="group-hover:text-btraffic-lime transition-colors" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/5">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-btraffic-blue to-purple-600 flex items-center justify-center text-xs font-bold">
                            {clientName.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">{clientName}</p>
                            <p className="text-[10px] text-btraffic-lime uppercase tracking-wider font-bold">Plan Activo</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 justify-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <LogOut size={14} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="lg:hidden sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="w-8 h-8 rounded bg-btraffic-lime flex items-center justify-center font-black text-black">B</Link>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-30 bg-black/95 pt-20 px-6 lg:hidden">
                        <nav className="space-y-4">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-4 text-lg font-bold text-gray-300 py-2 border-b border-white/5"
                                >
                                    <item.icon size={20} /> {item.label}
                                </Link>
                            ))}
                            <button onClick={handleLogout} className="text-red-500 font-bold mt-8 flex items-center gap-2">
                                <LogOut size={20} /> Salir
                            </button>
                        </nav>
                    </div>
                )}

                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
