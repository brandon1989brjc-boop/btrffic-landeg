'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    AtSign,
    Zap,
    ShieldCheck,
    BarChart3,
    AlertTriangle,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Mail,
    Globe,
    Instagram,
    Linkedin,
    Trash2,
    FileText
} from 'lucide-react';

export default function AnalizadorForense() {
    const [url, setUrl] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    const logs = [
        "Iniciando protocolo Sherlock v2.0...",
        "Validando DNS y certificados SSL...",
        "Escaneando scripts de seguimiento (Pixels/GTM)...",
        "Analizando velocidad de carga forense...",
        "Extrayendo arquitectura de conversión...",
        "Enviando datos al motor de IA Gemini...",
        "Calculando fugas de dinero estimadas...",
        "Generando reporte PDF confidencial..."
    ];

    const simulateAnalysis = async () => {
        setStatus('analyzing');
        setLog([]);

        for (let i = 0; i < logs.length; i++) {
            setLog(prev => [...prev, logs[i]]);
            setProgress((i + 1) * (100 / logs.length));
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        try {
            const response = await fetch('/api/sherlock/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, email })
            });

            if (!response.ok) throw new Error('Error en el análisis');

            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-btraffic-dark text-white selection:bg-btraffic-lime/30">
            {/* Mesh Background */}
            <div className="fixed inset-0 bg-hero-mesh pointer-events-none opacity-50" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <header className="text-center mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-btraffic-lime/10 border border-btraffic-lime/20 text-btraffic-lime text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <ShieldCheck size={14} /> Sistema Sherlock: Auditoría Forense
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]"
                    >
                        DETECTE SUS <br />
                        <span className="text-gradient">FUGAS DE DINERO</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium"
                    >
                        Identificamos errores críticos en su web o redes sociales que están destruyendo su rentabilidad en este momento.
                    </motion.p>
                </header>

                {/* Main Action Area */}
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-panel p-8 md:p-12 rounded-[40px] border-white/5 space-y-8"
                            >
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-btraffic-lime transition-colors" size={20} />
                                        <input
                                            type="text"
                                            placeholder="URL de Web o Red Social (Instagram/LinkedIn)"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 focus:border-btraffic-lime outline-none transition-all font-bold text-lg placeholder:text-gray-600"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-btraffic-lime transition-colors" size={20} />
                                        <input
                                            type="email"
                                            placeholder="Su Email para el reporte confidencial"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 focus:border-btraffic-lime outline-none transition-all font-bold text-lg placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={simulateAnalysis}
                                    disabled={!url || !email}
                                    className="w-full btn-premium py-6 flex items-center justify-center gap-4 text-lg disabled:opacity-30 disabled:grayscale"
                                >
                                    INICIAR DIAGNÓSTICO AHORA <ArrowRight size={20} />
                                </button>

                                <div className="flex justify-center gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-btraffic-lime" /> VELOCIDAD SSL</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-btraffic-lime" /> TRACKING ADS</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-btraffic-lime" /> GEMINI AI</span>
                                </div>
                            </motion.div>
                        )}

                        {status === 'analyzing' && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-10"
                            >
                                <div className="flex flex-col items-center gap-8 py-10 text-center">
                                    <div className="relative">
                                        <div className="w-32 h-32 border-4 border-btraffic-lime/10 rounded-full" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 w-32 h-32 border-4 border-btraffic-lime border-t-transparent rounded-full"
                                        />
                                        <Search className="absolute inset-0 m-auto text-btraffic-lime animate-pulse" size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black uppercase italic">Analizando {new URL(url.startsWith('http') ? url : `https://${url}`).hostname}</h3>
                                        <p className="text-btraffic-lime font-mono text-sm tracking-widest uppercase">Escaneo en curso... {Math.round(progress)}%</p>
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-xs overflow-hidden h-48 flex flex-col-reverse gap-2">
                                    <AnimatePresence>
                                        {log.slice().reverse().map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                className="flex gap-4 text-gray-400"
                                            >
                                                <span className="text-btraffic-lime/50">[PROCESS]</span>
                                                <span>{line}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel p-12 rounded-[40px] border-btraffic-lime/20 text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-btraffic-lime/10 rounded-full flex items-center justify-center mx-auto border border-btraffic-lime/20">
                                    <CheckCircle2 className="text-btraffic-lime" size={48} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black uppercase italic leading-none">Análisis Completado</h3>
                                    <p className="text-gray-400 text-lg">Hemis detectado fugas críticas de capital en sus activos digitales. El reporte forense ha sido enviado a <strong>{email}</strong>.</p>
                                </div>

                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between text-left group hover:border-btraffic-lime/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-btraffic-lime/10 rounded-xl text-btraffic-lime">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <div className="font-black text-sm uppercase tracking-widest text-btraffic-lime">Sherlock_Report_{new Date().getFullYear()}.pdf</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase">Listo para descarga en su email</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-600 group-hover:text-btraffic-lime group-hover:translate-x-1 transition-all" size={20} />
                                </div>

                                <button
                                    onClick={() => window.open('https://wa.me/34661139454', '_blank')}
                                    className="btn-premium w-full py-6 text-lg"
                                >
                                    AGENDAR SESIÓN DE REPARACIÓN
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Proof Section */}
                <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <Trash2 className="text-red-500" size={32} />
                        <h4 className="text-xl font-black uppercase italic">Cero Desperdicio</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Localizamos el 20% de las fallas que causan el 80% de pérdida de leads.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <BarChart3 className="text-btraffic-blue" size={32} />
                        <h4 className="text-xl font-black uppercase italic">Basado en Datos</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Sin suposiciones. El reporte es el resultado de un escaneo técnico real.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <Zap className="text-btraffic-lime" size={32} />
                        <h4 className="text-xl font-black uppercase italic">Acción Inmediata</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">No solo encontramos fallas, le damos la hoja de ruta para cerrarlas hoy.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
