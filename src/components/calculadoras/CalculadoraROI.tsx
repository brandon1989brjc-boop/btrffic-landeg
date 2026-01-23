'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, TrendingUp, ArrowRight, CheckCircle2, DollarSign, Users, Target } from 'lucide-react';

interface CalculadoraROIProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CalculadoraROI({ isOpen, onClose }: CalculadoraROIProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState<any>(null);

    const [datos, setDatos] = useState({
        facturacionMensual: '',
        gastoMarketing: '',
        leadsMensuales: '',
        tasaConversion: '',
    });

    const calcularROI = () => {
        setLoading(true);

        // Simulación de lógica de negocio BTraffic
        const fact = parseFloat(datos.facturacionMensual);
        const gasto = parseFloat(datos.gastoMarketing);
        const leads = parseFloat(datos.leadsMensuales);
        const conv = parseFloat(datos.tasaConversion) / 100;

        // Cálculo de CAC Actual (Costo de Adquisición de Cliente)
        const ventasActuales = leads * conv;
        const cacActual = ventasActuales > 0 ? gasto / ventasActuales : 0;

        // Proyección BTraffic (Mejora estimada del 35% en eficiencia)
        const cacProyectado = cacActual * 0.65;
        const ahorroMensual = (cacActual - cacProyectado) * ventasActuales;
        const ahorroAnual = ahorroMensual * 12;

        // Simulación de respuesta de IA (Architect Prime)
        setTimeout(() => {
            setResultado({
                cacActual: cacActual.toFixed(2),
                cacProyectado: cacProyectado.toFixed(2),
                ahorroMensual: ahorroMensual.toLocaleString('es-CO'),
                ahorroAnual: ahorroAnual.toLocaleString('es-CO'),
                roiAnual: ((ahorroAnual / 8500) * 100).toFixed(1), // Basado en inversión de setup
            });
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Cabecera */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gradient-to-r from-lime-500/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-lime-500 rounded-xl text-black">
                                    <Calculator size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Calculadora de ROI BTraffic</h2>
                                    <p className="text-xs text-lime-500 font-bold uppercase tracking-widest">Architect Prime v1.0</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Contenido */}
                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <DollarSign size={14} className="text-lime-500" /> Facturación Mensual (EUR)
                                            </label>
                                            <input
                                                type="number"
                                                name="facturacionMensual"
                                                value={datos.facturacionMensual}
                                                onChange={handleChange}
                                                placeholder="Ej: 50000"
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-lime-500 outline-none transition-all font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <DollarSign size={14} className="text-lime-500" /> Gasto en Marketing
                                            </label>
                                            <input
                                                type="number"
                                                name="gastoMarketing"
                                                value={datos.gastoMarketing}
                                                onChange={handleChange}
                                                placeholder="Ej: 5000"
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-lime-500 outline-none transition-all font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Users size={14} className="text-lime-500" /> Leads Mensuales
                                            </label>
                                            <input
                                                type="number"
                                                name="leadsMensuales"
                                                value={datos.leadsMensuales}
                                                onChange={handleChange}
                                                placeholder="Ej: 200"
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-lime-500 outline-none transition-all font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <Target size={14} className="text-lime-500" /> Tasa de Conversión (%)
                                            </label>
                                            <input
                                                type="number"
                                                name="tasaConversion"
                                                value={datos.tasaConversion}
                                                onChange={handleChange}
                                                placeholder="Ej: 5"
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:border-lime-500 outline-none transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!datos.facturacionMensual || !datos.gastoMarketing}
                                        className="w-full group bg-lime-500 hover:bg-lime-400 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:grayscale uppercase tracking-widest"
                                    >
                                        Siguiente <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            className="absolute inset-0 border-t-4 border-lime-500 rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <TrendingUp size={32} className="text-lime-500 animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white uppercase">Architect Prime Analizando...</h3>
                                        <p className="text-zinc-500 text-sm italic">Calculando modelo de eficiencia financiera para su ecosistema.</p>
                                    </div>
                                    <button
                                        onClick={calcularROI}
                                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-all"
                                    >
                                        Confirmar Datos y Procesar
                                    </button>
                                </div>
                            )}

                            {step === 3 && resultado && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Ahorro Mensual Estimado</p>
                                            <p className="text-3xl font-black text-lime-500">€{resultado.ahorroMensual}</p>
                                        </div>
                                        <div className="bg-lime-500 p-6 rounded-3xl text-center">
                                            <p className="text-black/50 text-[10px] font-bold uppercase tracking-widest mb-2">Ahorro Anual Garantizado</p>
                                            <p className="text-3xl font-black text-black">€{resultado.ahorroAnual}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <CheckCircle2 className="text-lime-500 shrink-0" />
                                            <div>
                                                <p className="text-sm font-bold text-white">Optimización del CAC</p>
                                                <p className="text-xs text-zinc-500">
                                                    Reduciremos su costo de adquisición de €{resultado.cacActual} a €{resultado.cacProyectado}.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <CheckCircle2 className="text-lime-500 shrink-0" />
                                            <div>
                                                <p className="text-sm font-bold text-white">Retorno sobre Inversión (ROI)</p>
                                                <p className="text-xs text-zinc-500">
                                                    Su ecosistema BTraffic se paga solo en menos de 45 días con un ROI anual del {resultado.roiAnual}%.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                                    >
                                        Obtener Mi Blueprint Completo AI
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
