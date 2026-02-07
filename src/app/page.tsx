'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Cpu,
    Zap,
    Activity,
    Instagram,
    Linkedin,
    X
} from 'lucide-react';
import ROISection from '@/components/ROISection';
import { FeatureCard, FeatureModal } from '@/components/sections/FeatureComponents';

// Lazy loading del widget Sherlock
const SherlockWidget = dynamic(
    () => import('@/components/diagnostic/SherlockWidget').then(mod => mod.SherlockWidget),
    {
        loading: () => (
            <div className="w-full max-w-xl mx-auto glass-panel rounded-[40px] p-10 border-btraffic-lime/20 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-btraffic-lime/20 border-t-btraffic-lime rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Iniciando Diagnóstico...</p>
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
                            data-track="hero-diagnose"
                        >
                            Iniciar Diagnóstico Btraffic
                        </button>
                        <button
                            className="px-10 py-5 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-all flex items-center gap-2 text-sm uppercase tracking-widest text-white"
                            data-track="hero-method"
                        >
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
                    <p className="text-gray-500 max-w-xl mx-auto font-medium">Nuestro sistema de Diagnóstico Forense analiza su estructura actual para determinar si podemos generar un ROI masivo de inmediato.</p>
                </div>
                <SherlockWidget />
            </section>

            <ROISection />

            <section id="last-call" className="py-32 px-8 bg-btraffic-lime/[0.02] border-y border-btraffic-lime/10">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        ¿LISTO PARA <span className="text-btraffic-lime">DEJAR DE PERDER</span> DINERO?
                    </h2>
                    <p className="text-xl text-gray-400 font-medium">
                        Su tabla de ROI es teórica hasta que conectamos los sensores reales. Inicie el diagnóstico forense ahora y descubra cuánto está dejando sobre la mesa.
                    </p>
                    <div className="pt-6">
                        <button
                            onClick={() => {
                                document.getElementById('sherlock')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-premium px-16 py-6 text-xl"
                            data-track="last-call-diagnose"
                        >
                            EJECUTAR DIAGNÓSTICO AHORA
                        </button>
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-10">
                <div className="flex gap-10">
                    <a href="https://www.instagram.com/brandon_btraffic/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><Instagram size={24} /></a>
                    <a href="https://www.linkedin.com/company/btraffic" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><Linkedin size={24} /></a>
                    <a href="https://twitter.com/btraffic" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-btraffic-lime transition-all"><X size={24} /></a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    <Link href="/legal/privacy" className="hover:text-white transition-colors" data-track="footer-privacy">Política de Privacidad</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/legal/terms" className="hover:text-white transition-colors" data-track="footer-terms">Aviso Legal</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/legal/cookies" className="hover:text-white transition-colors" data-track="footer-cookies">Cookies</Link>
                </div>

                <div className="opacity-30 text-[10px] font-bold tracking-[0.4em] uppercase text-center leading-relaxed">
                    © 2026 FÁBRICA DE ACTIVOS DIGITALES BTRAFFIC. <br className="md:hidden" /> SIN DATO NO HAY RELATO.
                </div>
            </footer>
        </main>
    );
}

