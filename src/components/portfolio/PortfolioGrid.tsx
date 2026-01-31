'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Rocket, Zap, Search, Instagram, Linkedin, X } from 'lucide-react';

const projects = [
    {
        id: 'munay',
        title: 'Munay Ecosystem',
        description: 'Transformación de retail tradicional a activo digital autónomo con protocolo Zero-Data.',
        status: 'Lanzado / Periodo de Prueba',
        updateDate: '20/01/2026',
        image: '/assets/portfolio/munay/munay_home.png',
        tags: ['Retail', 'AI', 'n8n', 'Next.js'],
        link: '/portfolio/munay'
    },
    // Placeholder para futuros proyectos
    {
        id: 'btraffic-v2',
        title: 'Btraffic Agency V2',
        description: 'Infraestructura de captación forense para agencias de alto nivel.',
        status: 'En Desarrollo / Fase Beta',
        updateDate: '15/01/2026',
        image: '/assets/portfolio/munay/munay_vton.png',
        tags: ['Agency', 'Automation', 'CRM'],
        link: '#'
    }
];

export default function PortfolioGrid() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-btraffic-lime selection:text-black">

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto space-y-16">
                    <header className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-btraffic-lime/10 border border-btraffic-lime/20 text-btraffic-lime text-[10px] font-bold uppercase tracking-widest">
                            <Rocket size={12} /> Ecosistemas Activos
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                            Casos de Éxito <br />
                            <span className="text-btraffic-lime italic">B-OS Ecosystems</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-lg font-light italic">
                            Visualización en tiempo real de los proyectos integrados en la infraestructura Btraffic. Monitoreamos cada activo para asegurar su ROI.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col glass-card border border-white/10 rounded-[40px] overflow-hidden"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[8px] font-bold uppercase tracking-wider text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.title}</h3>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6 flex-1 flex flex-col">
                                    <p className="text-gray-400 text-sm leading-relaxed italic">
                                        {project.description}
                                    </p>

                                    <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                            <span className="text-gray-500 flex items-center gap-2">
                                                <Clock size={14} /> Última Act: {project.updateDate}
                                            </span>
                                            <span className="text-btraffic-lime animate-pulse">
                                                {project.status}
                                            </span>
                                        </div>

                                        <Link href={project.link}>
                                            <button className="w-full btn-premium py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                                Ver Reporte Forense <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Info Card */}
                    <div className="p-10 rounded-[40px] bg-btraffic-lime/5 border border-btraffic-lime/20 flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold uppercase tracking-tight">¿No encuentra su proyecto?</h4>
                            <p className="text-gray-500 italic text-sm">Inicie un diagnóstico para evaluar la viabilidad de su integración en el ecosistema B-OS.</p>
                        </div>
                        <Link href="/#sherlock">
                            <button className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-btraffic-lime transition-colors">
                                Iniciar Auditoría Sherlock
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
