'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    Users,
    DollarSign,
    Wrench,
    Clock,
    TrendingUp,
    Check,
    Building2,
    Calculator,
    Zap,
    BrainCircuit,
    CheckCircle2
} from 'lucide-react';

interface CalculatorState {
    currency: 'COP' | 'EUR';
    business: {
        type: string;
        monthlyRevenue: number;
    };
    humanCosts: {
        totalMonthly: number;
    };
    toolsCosts: {
        totalMonthly: number;
    };
    timeCosts: {
        weeklyHours: number;
        hourlyRate: number;
    };
}

interface ROICalculatorProps {
    onClose: () => void;
}

export default function ROICalculator({ onClose }: ROICalculatorProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<CalculatorState>({
        currency: 'EUR',
        business: {
            type: '',
            monthlyRevenue: 0
        },
        humanCosts: {
            totalMonthly: 0
        },
        toolsCosts: {
            totalMonthly: 0
        },
        timeCosts: {
            weeklyHours: 0,
            hourlyRate: 0
        }
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(state.currency === 'COP' ? 'es-CO' : 'es-ES', {
            style: 'currency',
            currency: state.currency,
            minimumFractionDigits: 0
        }).format(value);
    };

    const nextStep = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const calculateROI = () => {
        const annualCurrentCosts = (state.humanCosts.totalMonthly + state.toolsCosts.totalMonthly + (state.timeCosts.weeklyHours * state.timeCosts.hourlyRate * 4)) * 12;

        const bosSetup = state.currency === 'COP' ? 5000000 : 3500;
        const bosMaintenance = state.currency === 'COP' ? 1200000 : 1200; // Anual
        const bosYear1 = bosSetup + bosMaintenance;

        const savingsYear1 = annualCurrentCosts - bosYear1;
        const roi = (savingsYear1 / bosYear1) * 100;

        return {
            annualCurrentCosts,
            bosYear1,
            savingsYear1,
            roi: roi.toFixed(1),
            monthlySavings: (savingsYear1 / 12).toFixed(0)
        };
    };

    const handleFinalize = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextStep();
        }, 2500);
    };

    const results = calculateROI();

    return (
        <div className="w-full max-w-4xl mx-auto py-4">
            {/* Progress Bar */}
            {currentStep <= 5 && !loading && (
                <div className="mb-12">
                    <div className="flex items-center justify-between px-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 border-2 ${currentStep >= s ? 'bg-btraffic-lime border-btraffic-lime text-black' : 'bg-black/40 border-white/10 text-zinc-500'
                                    }`}>
                                    {currentStep > s ? <Check size={18} /> : s}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-20 space-y-8"
                    >
                        <div className="relative w-32 h-32 mx-auto">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-4 border-btraffic-lime rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <BrainCircuit size={48} className="text-btraffic-lime animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Architect Prime está analizando</h3>
                            <p className="text-zinc-500 max-w-sm mx-auto">Calculando modelo de eficiencia operativa y proyecciones de ahorro anual para su industria...</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-btraffic-lime/10 rounded-2xl text-btraffic-lime">
                                        <Building2 size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Contexto del Negocio</h2>
                                        <p className="text-zinc-500">Defina la moneda y la escala de su operación.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Divisa Operativa</label>
                                        <div className="flex gap-4">
                                            {['EUR', 'COP'].map((curr) => (
                                                <button
                                                    key={curr}
                                                    onClick={() => setState({ ...state, currency: curr as 'EUR' | 'COP' })}
                                                    className={`flex-1 py-4 rounded-xl font-black text-sm transition-all border-2 ${state.currency === curr ? 'bg-btraffic-lime border-btraffic-lime text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                                        }`}
                                                >
                                                    {curr === 'EUR' ? '€ EUR' : '$ COP'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Facturación Mensual</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={state.business.monthlyRevenue || ''}
                                                onChange={(e) => setState({ ...state, business: { ...state.business, monthlyRevenue: Number(e.target.value) } })}
                                                className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-btraffic-lime/50 transition-all font-mono"
                                                placeholder="0.00"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">{state.currency}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-btraffic-lime/10 rounded-2xl text-btraffic-lime">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Gasto en Personal</h2>
                                        <p className="text-zinc-500">Costos mensuales de administración y atención al cliente.</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Total Nómina Marketing/Admin Mensual</label>
                                    <input
                                        type="number"
                                        value={state.humanCosts.totalMonthly || ''}
                                        onChange={(e) => setState({ ...state, humanCosts: { totalMonthly: Number(e.target.value) } })}
                                        className="w-full bg-white/5 border-2 border-white/10 p-6 rounded-2xl text-2xl text-white outline-none focus:border-btraffic-lime/50 transition-all font-mono"
                                        placeholder="Ingrese el monto total"
                                    />
                                    <p className="text-xs text-zinc-600">Incluya administradores, social media e intermediarios.</p>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-btraffic-lime/10 rounded-2xl text-btraffic-lime">
                                        <Wrench size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Software y Herramientas</h2>
                                        <p className="text-zinc-500">Inversión mensual en CRM, hosting, bots y suscripciones.</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Gasto Mensual en SaaS/Herramientas</label>
                                    <input
                                        type="number"
                                        value={state.toolsCosts.totalMonthly || ''}
                                        onChange={(e) => setState({ ...state, toolsCosts: { totalMonthly: Number(e.target.value) } })}
                                        className="w-full bg-white/5 border-2 border-white/10 p-6 rounded-2xl text-2xl text-white outline-none focus:border-btraffic-lime/50 transition-all font-mono"
                                        placeholder="Ingrese el monto total"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-btraffic-lime/10 rounded-2xl text-btraffic-lime">
                                        <Clock size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Costo de Tiempo</h2>
                                        <p className="text-zinc-500">Valor de las horas que usted o su equipo dedican a tareas manuales.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Horas Manuales / Semana</label>
                                        <input
                                            type="number"
                                            value={state.timeCosts.weeklyHours || ''}
                                            onChange={(e) => setState({ ...state, timeCosts: { ...state.timeCosts, weeklyHours: Number(e.target.value) } })}
                                            className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white font-mono outline-none focus:border-btraffic-lime/50"
                                            placeholder="Ej: 15"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Valor Hora del Gestor</label>
                                        <input
                                            type="number"
                                            value={state.timeCosts.hourlyRate || ''}
                                            onChange={(e) => setState({ ...state, timeCosts: { ...state.timeCosts, hourlyRate: Number(e.target.value) } })}
                                            className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white font-mono outline-none focus:border-btraffic-lime/50"
                                            placeholder="Ej: 50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-8 animate-in fade-in zoom-in duration-700">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-btraffic-lime text-black rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingUp size={32} />
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">Blueprint de Retorno B-OS</h2>
                                    <p className="text-zinc-500">Análisis proyectado por Architect Prime basado en sus datos actuales.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-3xl bg-zinc-900 border-2 border-btraffic-lime shadow-[0_0_50px_-12px_rgba(195,255,2,0.3)]">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-btraffic-lime mb-2">Ahorro Anual Proyectado</p>
                                        <p className="text-5xl font-black text-white">{formatCurrency(results.savingsYear1)}</p>
                                        <div className="mt-4 flex items-center gap-2 text-btraffic-lime text-xs font-bold bg-btraffic-lime/10 px-3 py-1 rounded-full w-fit">
                                            <Zap size={14} /> ROI del {results.roi}% en el primer año
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Capital Recuperado Mensual</p>
                                        <p className="text-4xl font-black text-white">{formatCurrency(Number(results.monthlySavings))}</p>
                                        <p className="mt-2 text-zinc-500 text-xs italic">Equivalente a {Number(results.roi) > 500 ? '5x' : '2x'} eficiencia operativa.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        "Reducción garantizada de costos fijos mediante orquestación.",
                                        "Escalabilidad ilimitada sin depender de contrataciones.",
                                        "Eliminación total del error humano en captura de leads."
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                            <CheckCircle2 size={20} className="text-btraffic-lime" />
                                            <span className="text-sm font-medium text-zinc-300">{text}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all"
                                >
                                    Descargar Blueprint PDF Completo
                                </button>
                            </div>
                        )}

                        {currentStep < 5 && (
                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold disabled:opacity-30 flex items-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <ArrowLeft size={18} /> Anterior
                                </button>
                                <button
                                    onClick={currentStep === 4 ? handleFinalize : nextStep}
                                    className="flex-1 px-8 py-4 rounded-xl bg-btraffic-lime text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                                >
                                    {currentStep === 4 ? "Calcular ROI" : "Siguiente"} <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
