
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

import TopStatusStrip from './TopStatusStrip';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Nuestro Método', href: '/#metodo' },
        { name: 'Activos', href: '/#activos' },
        { name: 'Casos de Éxito', href: '/portfolio' },
        { name: 'ROI', href: '/#roi' },
    ];

    const isAcademy = pathname?.startsWith('/academy');

    return (
        <>
            <div className="fixed top-0 w-full z-[101]">
                <TopStatusStrip />
            </div>
            <nav className={`fixed top-[26px] w-full z-[100] transition-all duration-300 ${scrolled ? 'py-3 bg-btraffic-dark/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-lg bg-btraffic-lime flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(162,255,0,0.3)]">
                            <span className="font-black text-black text-base">B</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter uppercase leading-none">Btraffic</span>
                            <span className="text-[8px] uppercase tracking-[0.3em] text-btraffic-lime font-black opacity-70">Asset Factory</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-gray-400 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-btraffic-lime transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-btraffic-lime group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}

                        <Link
                            href="/academy"
                            className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${isAcademy ? 'bg-white/10 border border-white/20 text-white' : 'bg-btraffic-lime text-black hover:scale-105 glow-lime shadow-lg shadow-btraffic-lime/20'}`}
                        >
                            Aula <ArrowRight size={12} />
                        </Link>

                        <div className="w-px h-4 bg-white/10 mx-2" />

                        <div className="flex gap-4 items-center">
                            <a href="https://www.instagram.com/brandon_btraffic/" target="_blank" rel="noopener noreferrer" className="hover:text-btraffic-lime transition-colors"><Instagram size={14} /></a>
                            <a href="https://www.linkedin.com/company/btraffic" target="_blank" rel="noopener noreferrer" className="hover:text-btraffic-lime transition-colors"><Linkedin size={14} /></a>
                        </div>

                        <Link
                            href="/portal"
                            className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 transition-all font-black"
                        >
                            Acceso
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[99] bg-btraffic-dark md:hidden flex flex-col p-10 pt-32"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-black uppercase tracking-tighter hover:text-btraffic-lime transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/academy"
                                onClick={() => setIsOpen(false)}
                                className="text-4xl font-black uppercase tracking-tighter text-btraffic-lime flex items-center gap-4"
                            >
                                Aula <ArrowRight size={32} />
                            </Link>
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-6">
                            <Link
                                href="/portal"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest"
                            >
                                Acceso Clientes
                            </Link>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">Btraffic © 2026</span>
                                <div className="flex gap-4">
                                    <Instagram size={20} className="text-gray-500" />
                                    <Linkedin size={20} className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
