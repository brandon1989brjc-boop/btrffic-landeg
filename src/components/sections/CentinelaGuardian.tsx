'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, TrendingUp, Info } from 'lucide-react';

const INSIGHTS = [
    {
        icon: <ShieldCheck className="text-lime-500" size={18} />,
        title: "OPERACIÓN 24/7",
        text: "El 85% de los leads se pierden por responder fuera de horario. Los agentes BTraffic no descansan."
    },
    {
        icon: <Zap className="text-purple-500" size={18} />,
        title: "EFICIENCIA FINANCIERA",
        text: "La orquestación de agentes permite escalar su negocio sin aumentar un solo euro en su nómina mensual."
    },
    {
        icon: <TrendingUp className="text-blue-500" size={18} />,
        title: "MÉTRICA FORENSE",
        text: "Sin dato no hay relato. El tracking profundo de BTraffic detecta fugas de capital en tiempo real."
    },
    {
        icon: <Info className="text-orange-500" size={18} />,
        title: "ROI GARANTIZADO",
        text: "Un ecosistema digital BTraffic se paga solo en menos de 45 días mediante la optimización del CAC."
    }
];

export function CentinelaGuardián() {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 5000);
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % INSIGHTS.length);
        }, 12000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="fixed bottom-8 right-8 z-[60] w-80"
                >
                    <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500/5 blur-3xl rounded-full" />

                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/5 rounded-xl">
                                {INSIGHTS[current].icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Centinela Insight</p>
                                <h4 className="text-xs font-bold text-white uppercase tracking-tighter">{INSIGHTS[current].title}</h4>
                            </div>
                            <button
                                onClick={() => setVisible(false)}
                                className="ml-auto text-zinc-500 hover:text-white transition-colors"
                            >
                                <Zap size={14} className="opacity-20 group-hover:opacity-100" />
                            </button>
                        </div>

                        <p className="text-[11px] leading-relaxed text-zinc-400 font-medium">
                            "{INSIGHTS[current].text}"
                        </p>

                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                key={current}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 12, ease: "linear" }}
                                className="h-full bg-lime-500"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
