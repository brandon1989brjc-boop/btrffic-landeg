'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Cpu,
    ShieldCheck,
    Zap,
    Instagram,
    Linkedin,
    X as CloseIcon,
    X,
    Layout,
    Database,
    Activity,
    Target,
    Share2,
    Server
} from 'lucide-react';
import ROISection from '@/components/ROISection';

// Lazy loading del widget Sherlock
const SherlockWidget = dynamic(
    () => import('@/components/diagnostic/SherlockWidget').then(mod => mod.SherlockWidget),
    {
        loading: () => (
            <div className="w-full max-w-xl mx-auto glass-panel rounded-[40px] p-10 border-btraffic-lime/20 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-btraffic-lime/20 border-t-btraffic-lime rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Cargando Sherlock...</p>
                </div>
            </div>
        ),
        ssr: false
    }
);

export default function Home() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const featureDetails: Record<string, any> = {
        'sistemas': {
            title: "Arquitectura de Orquestación",
            argument: "La orquestación de agentes transforma su estructura operativa en un activo digital inmutable. Desvinculamos el crecimiento de la facturación del aumento de la nómina.",
            icon: <Cpu className="text-btraffic-lime" size={48} />,
            color: "btraffic-lime",
            stats: [
                { label: "Operación", value: "24/7/365" },
                { label: "Error Humano", value: "~0%" },
                { label: "Protocolo", value: "B-OS Nexus" }
            ],
            steps: [
                "Captura Forense de Datos",
                "Orquestador de Agentes (n8n)",
                "Ejecución Autónoma Multitarea",
                "Entrega de Valor en Tiempo Real"
            ]
        },
        'datos': {
            title: "Inteligencia Forense 360°",
            argument: "Cada interacción es un punto de dato forense. No analizamos promedios, analizamos intenciones económicas individuales para predecir el comportamiento del lead.",
            icon: <BarChart3 className="text-btraffic-blue" size={48} />,
            color: "btraffic-blue",
            stats: [
                { label: "Tracking", value: "Específico" },
                { label: "Precisión", value: "99.8%" },
                { label: "Atribución", value: "Directa" }
            ],
            steps: [
                "Inyección de Pixeles Zero-Data",
                "Mapeo de Intención de Compra",
                "Optimización de Puja en Caliente",
                "Maximizador de LTV Automático"
            ]
        },
        'escalado': {
            title: "Despacho de Escalado Turbo",
            argument: "El escalado ya no es un riesgo financiero. Nuestra infraestructura permite procesar 10x o 100x el volumen actual con el mismo costo marginal de software.",
            icon: <Zap className="text-btraffic-purple" size={48} />,
            color: "btraffic-purple",
            stats: [
                { label: "Escalabilidad", value: "Infinita" },
                { label: "Costo Marginal", value: "$0" },
                { label: "Velocidad", value: "Instantánea" }
            ],
            steps: [
                "Despliegue de Enjambres",
                "Balanceo de Carga Agéntica",
                "Saturación de Mercado Dominal",
                "Consolidación de Activo Digital"
            ]
        }
    };

    return (
        <main className="relative min-h-screen bg-hero-mesh">

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="px-5 py-2 rounded-full bg-btraffic-lime/10 text-btraffic-lime text-[10px] font-black uppercase tracking-[0.3em] border border-btraffic-lime/20 mb-10 inline-block">
                        Fábrica de Activos Digitales v2.0
                    </span>
                    <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.8] tracking-tighter uppercase">
                        TRANSFORME SU NEGOCIO EN UN <br />
                        <span className="text-gradient">ACTIVO FINANCIERO</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                        Deje de gastar en "marketing". Empiece a invertir en <span className="text-white italic">Ecosistemas Digitales</span> que funcionan de forma autónoma basados en datos profundos y orquestación de agentes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => {
                                const el = document.getElementById('sherlock');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-premium"
                        >
                            Iniciar Diagnóstico Btraffic
                        </button>
                        <button className="px-10 py-5 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-all flex items-center gap-2 text-sm uppercase tracking-widest text-white">
                            Ver el Método Swarm <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* The Mantra Section */}
            <section className="py-24 glass-panel border-y border-white/5 bg-btraffic-dark/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-btraffic-dark via-transparent to-btraffic-dark z-10" />
                <div className="whitespace-nowrap flex animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-6xl md:text-8xl font-black opacity-25 mx-10 tracking-tighter uppercase italic hover:opacity-100 transition-all duration-500 cursor-default hover:text-btraffic-lime">
                            SIN DATO NO HAY RELATO • ACTIVO VS GASTO •
                        </span>
                    ))}
                </div>
            </section>

            <section id="metodo" className="py-40 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <FeatureCard
                        icon={<Cpu className="text-btraffic-lime" size={32} />}
                        title="Sistemas Autosuficientes"
                        desc="Diseñamos infraestructuras que operan independientemente del personal clave mediante orquestación de agentes."
                        onClick={() => setActiveModal('sistemas')}
                    />
                    <FeatureCard
                        icon={<BarChart3 className="text-btraffic-blue" size={32} />}
                        title="Optimización por Datos"
                        desc="Cero suposiciones. Cada click se traquea. Cada dato cuenta una historia de rentabilidad real."
                        onClick={() => setActiveModal('datos')}
                    />
                    <FeatureCard
                        icon={<Zap className="text-btraffic-purple" size={32} />}
                        title="Escalado Turbo"
                        desc="Crezca su capacidad operativa sin aumentar sus costos fijos. Automatización de alto rendimiento."
                        onClick={() => setActiveModal('escalado')}
                    />
                </div>
            </section>

            <AnimatePresence>
                {activeModal && (
                    <FeatureModal
                        data={featureDetails[activeModal]}
                        onClose={() => setActiveModal(null)}
                    />
                )}
            </AnimatePresence>

            {/* Sherlock Diagnostic Section */}
            <section id="sherlock" className="py-40 px-8 max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">¿Es su negocio un <br /><span className="text-btraffic-lime italic">Candidato Btraffic</span>?</h2>
                    <p className="text-gray-500 max-w-xl mx-auto font-medium">Nuestro filtro agéntico Sherlock analiza su estructura actual para determinar si podemos generar un ROI masivo de inmediato.</p>
                </div>
                <SherlockWidget />
            </section>

            <ROISection />

            <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-10">
                <div className="flex gap-10">
                    <a href="https://www.instagram.com/brandon_btraffic/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><Instagram size={24} /></a>
                    <a href="https://www.linkedin.com/company/btraffic" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><Linkedin size={24} /></a>
                    <a href="https://twitter.com/btraffic" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><X size={24} /></a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    <Link href="/legal/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/legal/privacy" className="hover:text-white transition-colors">Aviso Legal</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/legal/privacy" className="hover:text-white transition-colors">Cookies</Link>
                </div>

                <div className="opacity-30 text-[10px] font-bold tracking-[0.4em] uppercase text-center leading-relaxed">
                    © 2026 BTRAFFIC DIGITAL ASSET FACTORY. <br className="md:hidden" /> SIN DATO NO HAY RELATO.
                </div>
            </footer>
        </main>
    );
}

function FeatureCard({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick?: () => void }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="mb-8 p-6 w-fit rounded-3xl bg-white/5 group-hover:bg-btraffic-lime/20 transition-all duration-500 border border-white/5 group-hover:border-btraffic-lime/30">
                {icon}
            </div>
            <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">{title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg mb-4">{desc}</p>
            <div className="flex items-center gap-2 text-btraffic-lime text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Ver Argumento de Valor <ArrowRight size={14} />
            </div>
        </motion.div>
    );
}

function FeatureModal({ data, onClose }: { data: any, onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                    <CloseIcon size={20} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left side: Argument and Stats */}
                    <div className="p-12 md:p-16 space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-white/5">
                                {data.icon}
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter">{data.title}</h2>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic">
                            "{data.argument}"
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            {data.stats.map((stat: any, i: number) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className={`text-lg font-black text-${data.color}`}>{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <button className="btn-premium w-full md:w-auto">
                                Desplegar en mi Negocio
                            </button>
                        </div>
                    </div>

                    {/* Right side: Visualization / Steps */}
                    <div className="bg-white/[0.02] p-12 md:p-16 border-l border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-10">Flujo de Orquestación</h4>

                        <div className="space-y-6 relative">
                            {/* Vertical line */}
                            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-btraffic-lime via-btraffic-blue to-btraffic-purple opacity-20" />

                            {data.steps.map((step: string, i: number) => (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-btraffic-dark border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:border-btraffic-lime group-hover:text-btraffic-lime transition-all z-10">
                                        {i + 1}
                                    </div>
                                    <div className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{step}</div>
                                </motion.div>
                            ))}

                            <div className="mt-12 p-8 rounded-3xl bg-btraffic-lime/5 border border-btraffic-lime/20 flex flex-col items-center text-center gap-4">
                                <Activity className="text-btraffic-lime animate-pulse" size={32} />
                                <div className="text-xs font-bold uppercase tracking-widest italic text-gray-400">
                                    Monitoreo en Tiempo Real Activado
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
