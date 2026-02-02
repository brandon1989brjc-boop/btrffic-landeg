'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import CalculatorModal from './roi/CalculatorModal';

const pricingData = {
    COP: {
        traditional: [
            { role: 'Administrador', cost: '~1.3M COP/mes', annual: '15.6M/año' },
            { role: 'Community Manager', cost: '~1.0M COP/mes', annual: '12M/año' },
            { role: 'Atención 24/7', cost: '~1.5M COP/mes', annual: '18M/año' }
        ],
        totalAnnual: '~45.6M COP',
        setupMin: 'Desde 5M COP',
        setup: '~5M COP',
        maintenance: '200K COP',
        savings: '~40.6M COP',
        savingsPercent: '-89%',
        setupNote: 'VPS propio incluido 12 meses',
        paymentNote: 'Pago único • Facilidades hasta 6 meses'
    },
    EUR: {
        traditional: [
            { role: 'Administrador', cost: '~2.8K EUR/mes', annual: '33.6K/año' },
            { role: 'Community Manager', cost: '~2.2K EUR/mes', annual: '26.4K/año' },
            { role: 'Atención 24/7', cost: '~3.0K EUR/mes', annual: '36K/año' }
        ],
        totalAnnual: '~96K EUR',
        setupMin: 'Desde 3.5K EUR',
        setup: '~3.5K EUR',
        maintenance: '200 EUR',
        savings: '~90.1K EUR',
        savingsPercent: '-96%',
        setupNote: 'VPS propio incluido 12 meses',
        paymentNote: 'Pago único • Facilidades hasta 6 meses'
    }
};

export default function ROISection() {
    const [currency, setCurrency] = useState<'COP' | 'EUR'>('EUR');
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const data = pricingData[currency];

    return (
        <section id="roi" className="py-40 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <span className="px-5 py-2 rounded-full bg-btraffic-lime/10 text-btraffic-lime text-[10px] font-black uppercase tracking-[0.3em] border border-btraffic-lime/20 mb-6 inline-block">
                    Transparencia Total
                </span>
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
                    La Fórmula del <br />
                    <span className="text-btraffic-lime italic">Retorno Real</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg font-light leading-relaxed mb-8">
                    No vendemos ilusiones. Le mostramos exactamente cuánto dinero y tiempo recupera al automatizar su operación con un ecosistema B-OS.
                </p>

                {/* Currency Toggle */}
                <div className="inline-flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
                    <button
                        onClick={() => setCurrency('EUR')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currency === 'EUR'
                            ? 'bg-btraffic-lime text-black'
                            : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        EUR (Europa)
                    </button>
                    <button
                        onClick={() => setCurrency('COP')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currency === 'COP'
                            ? 'bg-btraffic-lime text-black'
                            : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        COP (Colombia)
                    </button>
                </div>
            </div>

            {/* The Savings Anchor */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
                <motion.div
                    key={`traditional-${currency}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card p-12 border-red-500/20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-400">Modelo Tradicional</h3>
                    </div>
                    <div className="space-y-6">
                        {data.traditional.map((item, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                                <div>
                                    <p className="text-white font-bold text-sm">{item.role}</p>
                                    <p className="text-gray-500 text-xs font-mono">{item.cost}</p>
                                </div>
                                <span className="text-red-400 font-black text-lg">{item.annual}</span>
                            </div>
                        ))}
                        <div className="pt-6 border-t border-red-500/30">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Total Anual</span>
                                <span className="text-4xl font-black text-red-500">{data.totalAnnual}</span>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-2 italic">Gestión humana tradicional limitada a horario laboral</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    key={`bos-${currency}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card p-12 border-btraffic-lime/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-btraffic-lime/10 blur-[80px] rounded-full" />
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-btraffic-lime animate-pulse" />
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-btraffic-lime">Ecosistema B-OS</h3>
                    </div>
                    <div className="space-y-8 relative z-10">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Inversión Inicial (Setup)</p>
                                <p className="text-5xl font-black text-white">{data.setupMin}</p>
                                <p className="text-xs text-gray-600 mt-1 font-mono">{data.setupNote}</p>
                                <p className="text-[10px] text-btraffic-lime/70 mt-2 font-bold">{data.paymentNote}</p>
                            </div>
                            <div className="px-4 py-2 rounded-full bg-btraffic-lime/20 border border-btraffic-lime/30">
                                <span className="text-btraffic-lime font-black text-sm">{data.savingsPercent}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-btraffic-lime/20">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Mantenimiento Mensual</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white">{data.maintenance}</span>
                                <span className="text-gray-500 text-sm">/mes</span>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-2 italic">Hosting + soporte técnico + actualizaciones de IA</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-btraffic-lime/5 border border-btraffic-lime/20">
                            <p className="text-xs font-black uppercase tracking-widest text-btraffic-lime mb-3">Ahorro Anual Garantizado</p>
                            <p className="text-5xl font-black text-btraffic-lime mb-2">{data.savings}</p>
                            <p className="text-xs text-gray-500 italic">Opera 24/7 • Escalable según crece tu negocio</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* The Formula Breakdown */}
            <div className="glass-card p-12 border-btraffic-purple/20 mb-20">
                <h3 className="text-3xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                    <Zap className="text-btraffic-purple" size={32} />
                    Cómo Calculamos Su ROI
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-btraffic-purple/20 border border-btraffic-purple/30 flex items-center justify-center text-2xl font-black">1</div>
                        <h4 className="text-xl font-bold text-white">Costo de No Contratarnos</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Sumamos todos los salarios que su negocio necesita para operar sin automatización (administrador, community manager, atención al cliente).
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-btraffic-blue/20 border border-btraffic-blue/30 flex items-center justify-center text-2xl font-black">2</div>
                        <h4 className="text-xl font-bold text-white">Inversión en B-OS</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Setup inicial + mantenimiento mensual. La diferencia entre ambos números es su <strong>ahorro neto operativo</strong>.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-btraffic-lime/20 border border-btraffic-lime/30 flex items-center justify-center text-2xl font-black">3</div>
                        <h4 className="text-xl font-bold text-white">Comisión por Resultados (Opcional)</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            En algunos casos, trabajamos con un % variable sobre resultados (5-10% de ventas generadas). Solo ganamos si usted gana.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Final */}
            <div className="text-center">
                <p className="text-gray-500 mb-8 text-lg font-light italic max-w-2xl mx-auto">
                    ¿Quiere saber cuánto ahorraría <strong>su</strong> negocio específicamente?
                </p>
                <button
                    onClick={() => setIsCalculatorOpen(true)}
                    className="btn-premium px-12 py-5 text-lg"
                >
                    Calcular Mi ROI Personalizado
                </button>
            </div>

            {/* Calculator Modal */}
            <CalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
            />
        </section>
    );
}
