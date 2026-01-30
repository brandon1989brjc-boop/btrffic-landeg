'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, ArrowLeft, Instagram, Linkedin, X } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass-panel py-4 px-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded bg-btraffic-lime flex items-center justify-center border border-white/10">
                        <span className="font-black text-black text-sm">B</span>
                    </div>
                    <span className="font-black text-2xl tracking-tighter uppercase">Btraffic</span>
                </Link>
                <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 items-center">
                    <Link href="/#metodo" className="hover:text-btraffic-lime transition-colors">Nuestro Método</Link>
                    <Link href="/#roi" className="hover:text-btraffic-lime transition-colors">ROI</Link>
                    <Link href="/portfolio" className="hover:text-btraffic-lime transition-colors">Casos de Éxito</Link>
                </div>
                <Link href="/">
                    <button className="text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                        <ArrowLeft size={12} /> Volver
                    </button>
                </Link>
            </nav>

            <main className="pt-40 pb-20 px-8 max-w-4xl mx-auto space-y-20">
                <header className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-btraffic-lime/10 border border-btraffic-lime/20 text-btraffic-lime text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Shield size={12} /> Seguridad & Transparencia
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        POLÍTICA DE <br />
                        <span className="text-btraffic-lime italic">PRIVACIDAD</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-light italic border-l border-btraffic-lime/30 pl-6">
                        "Sin dato no hay relato, pero sin protección no hay confianza."
                    </p>
                </header>

                <section className="space-y-12 text-gray-300 leading-relaxed font-medium">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <Database className="text-btraffic-lime" size={24} />
                            1. Captura Forense de Datos
                        </h2>
                        <p>
                            En el ecosistema Btraffic, tratamos los datos como activos financieros. Recopilamos información técnica y de comportamiento mediante nuestro protocolo de tracking forense (n8n-bus) para entender la intención de compra y optimizar el ROI de las campañas.
                        </p>
                        <p>
                            Los datos capturados incluyen, pero no se limitan a: interacciones con widgets (Sherlock), tiempos de permanencia, y flujos de navegación. Todo procesado de forma segura y ética.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <Lock className="text-btraffic-blue" size={24} />
                            2. Protección y Almacenamiento
                        </h2>
                        <p>
                            Su información se almacena en infraestructuras cifradas de alta seguridad (B-OS Secure Layer). No vendemos sus datos a terceros. Nuestra prioridad es la integridad del activo digital.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <Eye className="text-btraffic-purple" size={24} />
                            3. Sus Derechos
                        </h2>
                        <p>
                            Usted mantiene el control total sobre su información. Puede solicitar el acceso, rectificación o eliminación de sus datos en cualquier momento enviando un correo a <span className="text-white underline">legal@btraffic.com</span>.
                        </p>
                    </div>
                </section>

                <footer className="pt-20 border-t border-white/5 flex flex-col items-center gap-8">
                    <div className="flex gap-10">
                        <a href="#" className="text-gray-500 hover:text-btraffic-lime transition-all"><Instagram size={24} /></a>
                        <a href="#" className="text-gray-500 hover:text-btraffic-lime transition-all"><Linkedin size={24} /></a>
                        <a href="#" className="text-gray-500 hover:text-btraffic-lime transition-all"><X size={24} /></a>
                    </div>
                    <div className="opacity-30 text-[10px] font-bold tracking-[0.4em] uppercase text-center">
                        © 2026 BTRAFFIC DIGITAL ASSET FACTORY. <br /> ÚLTIMA ACTUALIZACIÓN: 21 ENERO 2026.
                    </div>
                </footer>
            </main>
        </div>
    );
}
