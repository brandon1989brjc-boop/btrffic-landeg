'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Database,
    Cpu,
    Zap,
    Share2,
    MessageSquare,
    ShieldCheck,
    BarChart3,
    Layers,
    Smartphone,
    Trophy,
    ArrowRight,
    Instagram,
    Linkedin,
    X
} from 'lucide-react';

const CaseStudyImage = ({ src, alt, caption }: { src: string, alt: string, caption: string }) => (
    <div className="space-y-4 group">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 glass-card">
            <img
                src={src}
                alt={alt}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-btraffic-lime font-mono text-xs uppercase tracking-widest">{caption}</p>
            </div>
        </div>
        <p className="text-xs text-gray-500 italic text-center">{alt}</p>
    </div>
);

const TechPill = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
        {children}
    </span>
);

export default function MunayPortfolio() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-btraffic-lime selection:text-black">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-btraffic-lime/5 to-transparent blur-3xl opacity-30 select-none pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <TechPill>Case Study: Retail Biointeligente</TechPill>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                            Munay <br />
                            <span className="text-btraffic-lime italic">Ecosystem</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
                            Cómo transformamos una tienda de moda infantil en un <span className="text-white font-medium">Activo Digital Autónomo</span> mediante el Protocolo de Cero Datos y Orquestación n8n.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Narrative Section - The Problem */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold uppercase tracking-tight">El Desafío: <br /><span className="text-gray-500">La Escala Humana</span></h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Munay operaba bajo el modelo tradicional: dependencia total de la gestión manual y ceguera de datos. Cada venta requería atención humana, y cada carrito abandonado era una oportunidad perdida en el vacío.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-white/5 rounded-xl bg-white/5">
                                <span className="text-btraffic-lime font-black text-2xl">0%</span>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Traqueo Propietario</p>
                            </div>
                            <div className="p-4 border border-white/5 rounded-xl bg-white/5">
                                <span className="text-red-500 font-black text-2xl">100%</span>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Gestión Manual</p>
                            </div>
                        </div>
                    </div>
                    <CaseStudyImage
                        src="/assets/portfolio/munay/munay_home.png"
                        alt="Interfaz Principal Munay"
                        caption="Visualización del Ecosistema en Producción"
                    />
                </div>
            </section>

            {/* The Solution - Architecture */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center space-y-4">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">La Arquitectura Nexus</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto italic">Diseñamos un cerebro digital que no duerme, no olvida y no comete errores.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Cpu className="text-btraffic-lime" />,
                                title: "Next.js Core",
                                desc: "Motor de alto rendimiento con SSR para carga instantánea y SEO agresivo."
                            },
                            {
                                icon: <Database className="text-btraffic-lime" />,
                                title: "Supabase DB",
                                desc: "Protocolo de Cero Datos. Gestión de inventario y clientes en tiempo real."
                            },
                            {
                                icon: <Zap className="text-btraffic-lime" />,
                                title: "n8n Engine",
                                desc: "Orquestación de procesos: WhatsApp, logística y recuperación de carritos."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-3xl glass-card hover:border-btraffic-lime/50 transition-colors group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Intelligence / Zero Data Protocol */}
            <section className="py-20 px-6 bg-btraffic-lime/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <CaseStudyImage
                        src="/assets/portfolio/munay/munay_catalog.png"
                        alt="Catálogo y Traqueo de Eventos"
                        caption="Sensores de intención en tiempo real"
                    />
                    <div className="space-y-8">
                        <TechPill>Protocolo Cero Datos</TechPill>
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                            Control Total <br />
                            <span className="text-btraffic-lime">Sin Terceros</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-light italic">
                            A diferencia de las webs tradicionales que dependen de Facebook o Google para "entender" lo que pasa, Munay posee su propia capa de inteligencia. Cada clic es un sensor que alimenta al cerebro n8n.
                        </p>
                        <ul className="space-y-4">
                            {[
                                { icon: <ShieldCheck size={16} />, text: "Soberanía de Datos del Cliente" },
                                { icon: <BarChart3 size={16} />, text: "Medición de Eventos Personalizados" },
                                { icon: <Smartphone size={16} />, text: "PWA: Experiencia Nativa sin Descargas" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                                    <span className="text-btraffic-lime">{item.icon}</span>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tracking Logic - Deep Dive */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 grid md:grid-cols-2 gap-8 items-end">
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                            La Lógica <br /> de los Sucesos
                        </h2>
                        <p className="text-gray-500 font-medium italic">
                            "Sin dato no hay relato". En Munay, cada botón es un gatillo de automatización.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CaseStudyImage
                            src="/assets/portfolio/munay/munay_product.png"
                            alt="Página de Producto y Traqueo"
                            caption="Evento: ViewContent & AddToCart"
                        />
                        <CaseStudyImage
                            src="/assets/portfolio/munay/munay_reviews.png"
                            alt="Sistema de Reseñas y Social Proof"
                            caption="Evento: ReviewSubmission"
                        />
                        <CaseStudyImage
                            src="/assets/portfolio/munay/munay_vton.png"
                            alt="Probador Virtual IA"
                            caption="Interacción con Agente Gemini Vision"
                        />
                    </div>

                    <div className="mt-16 p-10 border border-btraffic-lime/20 rounded-[40px] glass-card flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-1 space-y-4">
                            <h3 className="text-2xl font-bold uppercase tracking-tight text-btraffic-lime italic font-serif">¿Qué gana el negocio?</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Al traquear cada suceso de manera propietaria, Munay puede automatizar procesos de retargeting por WhatsApp sin depender de costosas herramientas de terceros. El sistema sabe qué talla buscó el cliente y qué color prefirió, permitiendo una comunicación quirúrgica.
                            </p>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <span className="block text-4xl font-black text-white">40%</span>
                                <p className="text-[10px] text-gray-500 uppercase font-black">Ahorro Operativo</p>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-black text-white">+25%</span>
                                <p className="text-[10px] text-gray-500 uppercase font-black">Conversión LTV</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-btraffic-lime/10 blur-[120px] rounded-full scale-150 -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">¿Listo para evolucionar <br /> su infraestructura?</h2>
                    <p className="text-xl text-gray-400 font-light italic">
                        El caso Munay es solo la punta del iceberg de lo que un Ecosistema B-OS puede hacer por su compañía.
                    </p>
                    <Link href="/#sherlock">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-premium px-12 py-5 text-lg font-black uppercase tracking-widest flex items-center gap-3 mx-auto"
                        >
                            Iniciar Diagnóstico Sherlock <ArrowRight />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Footer / Back to Portfolio */}
            <footer className="py-10 border-t border-white/10 px-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                    <span>Btraffic Agency © 2026</span>
                    <Link href="/portfolio" className="text-btraffic-lime hover:text-white transition-colors cursor-pointer">
                        Ver Casos de Éxito
                    </Link>
                </div>
            </footer>
        </div>
    );
}
