'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Send, User, Building2, TrendingUp, MessageCircle, Briefcase, Wallet, Timer, AtSign } from 'lucide-react';

export function SherlockWidget() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        name: '',
        email: '',
        web: '',
        role: '',
        pain: '',
        assetStatus: '',
        tranquilityNumber: '',
        revenue: ''
    });
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');

    // Validación de URLs para evitar gastos de API innecesarios
    const isValidUrl = (url: string): boolean => {
        if (!url || url.length < 4) return false;
        // Acepta URLs completas o dominios simples, o redes sociales conocidas
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        const socialPattern = /(instagram|linkedin|twitter|x\.com|facebook|tiktok)/i;
        return urlPattern.test(url) || socialPattern.test(url);
    };

    const nextStep = () => setStep(s => s + 1);

    const [intelligenceResult, setIntelligenceResult] = useState<any>(null);

    const analyze = async () => {
        setStatus('analyzing');

        try {
            // FASE 1: Análisis técnico con Sherlock (auditoría web)
            const sherlockResponse = await fetch('/api/sherlock/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: data.web,
                    ...data,
                    timestamp: new Date().toISOString(),
                    source: 'btraffic-agency-v2-widget'
                })
            });

            // FASE 2: Cualificación inteligente con Groq (análisis de perfil)
            const intelligenceResponse = await fetch('/api/intelligence/qualify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    role: data.role,
                    web: data.web,
                    pain: data.pain,
                    revenue: data.revenue,
                    action: 'qualify'
                })
            });

            if (intelligenceResponse.ok) {
                const intelligenceData = await intelligenceResponse.json();
                const qual = intelligenceData.qualification;
                setIntelligenceResult(qual);

                // FASE 3: Orquestación y Persistencia (Mover esto aquí asegura que tengamos los datos de IA)
                await fetch('/api/sherlock/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: data.web,
                        email: data.email,
                        leadMetadata: {
                            name: data.name,
                            role: data.role,
                            pain: data.pain,
                            revenue: data.revenue === 'yes' ? '+$10k USD/mes' : 'Menos de $10k',
                            score: qual.score,
                            isQualified: qual.isQualified
                        }
                    })
                });
            }

            // Simulación de procesamiento de IA tras envío exitoso para UX
            setTimeout(() => setStatus('result'), 3000);
        } catch (error) {
            console.error('Analysis Error:', error);
            // Fallback para no romper la UX
            setTimeout(() => setStatus('result'), 3000);
        }
    };

    // Lógica de Cualificación Basada en Guion Maestro
    const isHighValueRole = ['CEO/Founder', 'Director', 'Gerente'].includes(data.role);
    const hasDigitalPain = data.assetStatus === 'gasto';
    const isQualified = isHighValueRole && data.revenue === 'yes';

    const handleWhatsAppRedirect = () => {
        const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34661139454";
        const message = isQualified
            ? `Hola Btraffic, soy ${data.name} (${data.role}). He completado el diagnóstico forense de ${data.web}. Soy CANDIDATO POSITIVO. Mi número de tranquilidad es ${data.tranquilityNumber}. Quiero agendar la sesión estratégica.`
            : `Hola Btraffic, soy ${data.name}. He analizado ${data.web} con Sherlock. Entiendo que mi negocio está en fase de cimentación y quiero recibir el Argumento Estratégico a medida.`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="w-full max-w-xl mx-auto glass-panel rounded-[30px] md:rounded-[40px] p-6 md:p-10 border-btraffic-lime/20 shadow-[0_0_80px_rgba(162,255,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none hidden md:block">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <TrendingUp size={120} />
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="space-y-6 md:space-y-8"
                    >
                        {step === 0 && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[9px] md:text-[10px] font-black text-btraffic-lime uppercase tracking-[0.3em]">Fase 1: Identificación de Autoridad</label>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Radiografía de Operación</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-btraffic-lime transition-colors" size={18} />
                                        <input
                                            placeholder="Su Nombre Completo"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:border-btraffic-lime outline-none transition-all font-bold text-lg"
                                            value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-4 text-gray-500 group-focus-within:text-btraffic-lime transition-colors" size={18} />
                                        <input
                                            type="email"
                                            placeholder="Su Email de Empresa"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:border-btraffic-lime outline-none transition-all font-bold text-lg"
                                            value={data.email || ''} onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>

                                    {data.name.length > 2 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-2">
                                            <div className="grid grid-cols-2 gap-3">
                                                {['CEO/Founder', 'Director', 'Gerente', 'Estratega'].map(r => (
                                                    <button
                                                        key={r}
                                                        onClick={() => setData({ ...data, role: r })}
                                                        className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${data.role === r ? 'border-btraffic-lime bg-btraffic-lime/10 text-btraffic-lime' : 'border-white/5 bg-white/5 hover:border-white/20 text-gray-500'}`}
                                                    >
                                                        {r}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="relative group">
                                                <div className="absolute left-4 top-4 text-gray-500 font-black text-[10px] tracking-tighter uppercase group-focus-within:text-btraffic-lime transition-colors">HTTPS://</div>
                                                <input
                                                    placeholder="www.empresa.com o Red Social"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-20 focus:border-btraffic-lime outline-none transition-all font-bold text-lg"
                                                    value={data.web} onChange={e => setData({ ...data, web: e.target.value })}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <button
                                    onClick={nextStep}
                                    disabled={!data.role || !isValidUrl(data.web)}
                                    className="w-full btn-premium py-5 disabled:opacity-20 disabled:grayscale transition-all"
                                >
                                    Iniciar Diagnóstico Forense
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-btraffic-blue uppercase tracking-[0.3em]">Fase 2: La Brecha del Autoempleo</label>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">¿Dónde está el cuello de botella?</h3>
                                </div>
                                <p className="text-gray-400 text-sm italic">"Si hoy dejas de operar una semana, ¿tu negocio se detiene porque los procesos están solo en tu cabeza?"</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'marketing', label: 'Cierre de Ventas Manual' },
                                        { id: 'ops', label: 'Operación Dependiente de Mí' },
                                        { id: 'data', label: 'Desconocimiento de Márgenes' }
                                    ].map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => { setData({ ...data, pain: p.label }); nextStep(); }}
                                            className="text-left p-5 rounded-2xl border border-white/5 bg-white/5 hover:border-btraffic-blue hover:bg-btraffic-blue/5 transition-all group"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-300 group-hover:text-white">{p.label}</span>
                                                <AlertCircle size={16} className="text-gray-600 group-hover:text-btraffic-blue" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-btraffic-purple uppercase tracking-[0.3em]">Fase 3: Activo vs Gasto</label>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Rendimiento Digital</h3>
                                </div>
                                <p className="text-gray-400 text-sm">Tu presencia online actual, ¿te trae clientes todos los días automáticamente o es solo un gasto que 'hay que tener'?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => { setData({ ...data, assetStatus: 'activo' }); nextStep(); }} className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-btraffic-lime hover:bg-btraffic-lime/5 transition-all text-center group">
                                        <CheckCircle2 size={32} className="mx-auto mb-3 text-gray-600 group-hover:text-btraffic-lime" />
                                        <div className="font-black uppercase text-xs">Es un Activo</div>
                                    </button>
                                    <button onClick={() => { setData({ ...data, assetStatus: 'gasto' }); nextStep(); }} className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-red-500/50 hover:bg-red-500/5 transition-all text-center group">
                                        <AlertCircle size={32} className="mx-auto mb-3 text-gray-600 group-hover:text-red-500" />
                                        <div className="font-black uppercase text-xs">Es un Gasto</div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-btraffic-lime uppercase tracking-[0.3em]">Fase 4: El Número de Tranquilidad</label>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">Visión Estratégica</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm italic">"¿Cuál es el monto mensual que te permitiría saber que el negocio fluye sin tu presencia 24/7?"</p>
                                    <div className="relative group">
                                        <Wallet className="absolute left-4 top-4 text-gray-500 group-focus-within:text-btraffic-lime" size={18} />
                                        <input
                                            placeholder="Ej: $15,000"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:border-btraffic-lime outline-none transition-all font-bold text-lg"
                                            value={data.tranquilityNumber} onChange={e => setData({ ...data, tranquilityNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => { setData({ ...data, revenue: 'yes' }); analyze(); }} className="flex-1 p-5 rounded-2xl border border-white/5 bg-white/5 hover:border-btraffic-lime transition-all text-center">
                                            <div className="font-black text-btraffic-lime">+$10k USD/mes</div>
                                        </button>
                                        <button onClick={() => { setData({ ...data, revenue: 'no' }); analyze(); }} className="flex-1 p-5 rounded-2xl border border-white/5 bg-white/5 hover:border-red-500/50 transition-all text-center opacity-50">
                                            <div className="font-black">Menos de $10k</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {status === 'analyzing' && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-btraffic-lime/20 rounded-full"></div>
                            <div className="absolute inset-0 w-24 h-24 border-4 border-btraffic-lime border-t-transparent rounded-full animate-spin"></div>
                            <Timer className="absolute inset-0 m-auto text-btraffic-lime animate-pulse" size={32} />
                        </div>
                        <div className="space-y-4">
                            <div className="text-2xl font-black tracking-tighter uppercase italic">Analizando {data.web}</div>
                            <div className="space-y-1 font-mono text-[10px] text-btraffic-lime/60 bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex gap-2"><span>[RUN]</span> <span>SCANNING_MANUAL_PROCESSES...</span></div>
                                <div className="flex gap-2"><span>[RUN]</span> <span>CALCULATING_OPEX_LEAKAGE...</span></div>
                                <div className="flex gap-2"><span>[RUN]</span> <span>EVALUATING_B-OS_COMPATIBILITY...</span></div>
                                <div className="flex gap-2 text-btraffic-blue/80"><span>[AI]</span> <span>GROQ_INTELLIGENCE_QUALIFYING...</span></div>
                                <div className="flex gap-2 text-btraffic-purple/80"><span>[AI]</span> <span>GENERATING_PERSONALIZED_MESSAGE...</span></div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8"
                    >
                        {/* Score de Inteligencia (si está disponible) */}
                        {intelligenceResult && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-2xl bg-btraffic-lime/5 border border-btraffic-lime/20"
                            >
                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Score de Cualificación IA</div>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="text-5xl font-black text-btraffic-lime">{intelligenceResult.score}</div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-gray-400">de 100 puntos</div>
                                        <div className="text-[10px] text-gray-600 uppercase tracking-wide">{intelligenceResult.recommendedAction}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {isQualified || (intelligenceResult && intelligenceResult.isQualified) ? (
                            <>
                                <div className="inline-block p-6 bg-btraffic-lime/10 rounded-full border border-btraffic-lime/20">
                                    <CheckCircle2 className="text-btraffic-lime" size={64} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Candidato Positivo</h3>
                                    <div className="text-btraffic-lime font-bold uppercase tracking-widest text-xs">Perfil Estratégico Detectado</div>
                                </div>

                                {/* Mensaje personalizado de la IA o mensaje estándar */}
                                <p className="text-gray-400 font-medium leading-relaxed">
                                    {intelligenceResult?.personalizedMessage || (
                                        <>
                                            {data.name}, el análisis de <span className="text-white">{data.web}</span> confirma una operación dependiente de tu presencia física. <br /><br />
                                            Como <span className="text-white font-bold">{data.role}</span>, estás en la posición clave para ejecutar una arquitectura de orquestación. Tu <span className="italic">Número de Tranquilidad</span> ({data.tranquilityNumber}) es matemáticamente alcanzable eliminando tus cuellos de botella actuales.
                                        </>
                                    )}
                                </p>

                                <button onClick={handleWhatsAppRedirect} className="btn-premium w-full py-6 flex items-center justify-center gap-3 group text-base">
                                    <MessageCircle size={24} className="group-hover:scale-110 transition-all" />
                                    AGENDAR SESIÓN ESTRATÉGICA
                                </button>
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">
                                    Cupos Limitados: 2 espacios disponibles este mes
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="inline-block p-6 bg-btraffic-blue/10 rounded-full border border-btraffic-blue/20">
                                    <AlertCircle className="text-btraffic-blue" size={64} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-btraffic-blue leading-none">Análisis Completado</h3>
                                    <div className="text-btraffic-blue font-bold uppercase tracking-widest text-xs">Fase de Cimentación Requerida</div>
                                </div>

                                <p className="text-gray-400 font-medium leading-relaxed">
                                    {intelligenceResult?.personalizedMessage || (
                                        <>
                                            {data.name}, Sherlock ha detectado que <span className="text-white font-bold">{data.web}</span> necesita una base de procesos más robusta antes de escalar con un B-OS completo. <br /><br />
                                            He preparado un <span className="text-btraffic-blue font-bold">Argumento Estratégico a medida</span> para que {data.web} logre su primer hito de facturación y califique pronto.
                                        </>
                                    )}
                                </p>

                                <button onClick={handleWhatsAppRedirect} className="w-full py-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3 group font-black uppercase tracking-widest text-sm">
                                    <MessageCircle size={24} className="group-hover:scale-110 transition-all" />
                                    RECIBIR ARGUMENTO A MEDIDA
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
