'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, User, TrendingUp, MessageCircle, Briefcase, Wallet, Timer, AtSign, Building2 } from 'lucide-react';

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
    const [intelligenceResult, setIntelligenceResult] = useState<any>(null);

    // Validación de URLs para evitar gastos de API innecesarios
    const isValidUrl = (url: string): boolean => {
        if (!url || url.length < 4) return false;
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        const socialPattern = /(instagram|linkedin|twitter|x\.com|facebook|tiktok)/i;
        return urlPattern.test(url) || socialPattern.test(url);
    };

    const nextStep = (stepNumber: number) => {
        setStep(stepNumber);
        // Track step change
        if (typeof window !== 'undefined') {
            console.log(`🔍 Btraffic Diagnostic - Step ${stepNumber}`);
        }
    };

    const analyze = async () => {
        setStatus('analyzing');

        try {
            // FASE 1: Cualificación inteligente con Groq
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

            let qualification = { score: 0, isQualified: false, recommendedAction: 'evaluando' };
            if (intelligenceResponse.ok) {
                const intelligenceData = await intelligenceResponse.json();
                qualification = intelligenceData.qualification;
                setIntelligenceResult(qualification);
            }

            // FASE 2: Orquestación completa
            await fetch('/api/sherlock/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: data.web,
                    email: data.email,
                    timestamp: new Date().toISOString(),
                    source: 'btraffic-agency-v2-widget',
                    leadMetadata: {
                        name: data.name,
                        role: data.role,
                        pain: data.pain,
                        revenue: data.revenue === 'yes' ? '+$10k USD/mes' : 'Menos de $10k',
                        score: qualification.score,
                        isQualified: qualification.isQualified,
                        tranquilityRequested: data.tranquilityNumber,
                        assetStatus: data.assetStatus
                    }
                })
            });

            // 🚀 INTEGRACIÓN COMMAND CENTER: Crear proyecto automáticamente en Discovery
            try {
                fetch('http://localhost:3000/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: `Lead: ${data.web}`,
                        client_name: data.name,
                        status: 'discovery',
                        industry: 'General',
                        progress_percent: 15,
                        metadata: {
                            email: data.email,
                            score: qualification.score,
                            role: data.role,
                            revenue: data.revenue,
                            pains: qualification.recommendedAction || ['Auditoría Sherlock pendiente'],
                            source: 'web_sherlock_widget'
                        }
                    }),
                    mode: 'no-cors'
                }).catch(() => { }); // Fire and forget
                console.log('🏛️ COMMAND_CENTER: Discovery project registered sync.');
            } catch (err) { }

            setTimeout(() => setStatus('result'), 2500);
        } catch (error) {
            console.error('CRITICAL_DIAGNOSTIC_ERROR:', error);
            setTimeout(() => setStatus('result'), 2000);
        }
    };

    // Lógica de Cualificación Fallback
    const isHighValueRole = ['CEO/Founder', 'Director', 'Gerente'].includes(data.role);
    const isQualifiedByRules = isHighValueRole && data.revenue === 'yes';
    const isQualified = intelligenceResult ? intelligenceResult.isQualified : isQualifiedByRules;

    const handleWhatsAppRedirect = () => {
        const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34661139454";
        const message = isQualified
            ? `Hola Btraffic, soy ${data.name} (${data.role}). He completado el diagnóstico forense de ${data.web}. Score: ${intelligenceResult?.score || 'N/A'}. Quiero agendar sesión.`
            : `Hola Btraffic, soy ${data.name}. He analizado ${data.web} con el Diagnóstico Forense. Quiero recibir el Argumento Estratégico a medida.`;

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
                                    <label className="text-[10px] font-black text-btraffic-lime uppercase tracking-[0.3em]">Fase 1: Identificación</label>
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
                                            value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-4 text-gray-500 group-focus-within:text-btraffic-lime transition-colors" size={18} />
                                        <input
                                            placeholder="Sitio Web (ej: minegocio.com)"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:border-btraffic-lime outline-none transition-all font-bold text-lg"
                                            value={data.web} onChange={e => setData({ ...data, web: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={!data.name || !data.email || !isValidUrl(data.web)}
                                    onClick={() => nextStep(1)}
                                    className="btn-premium w-full py-5 text-lg disabled:opacity-30 disabled:grayscale"
                                    data-track="diagnostic-go-step-1"
                                >
                                    Siguiente Paso
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-btraffic-blue uppercase tracking-[0.3em]">Fase 2: Estratificación</label>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Perfil de Autoridad</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {['CEO/Founder', 'Director', 'Gerente', 'Freelancer/Inversor'].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => { setData({ ...data, role }); nextStep(2); }}
                                            className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between group ${data.role === role ? 'bg-btraffic-blue/10 border-btraffic-blue text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                                            data-track={`diagnostic-role-${role.toLowerCase()}`}
                                        >
                                            <span className="font-bold text-lg">{role}</span>
                                            <Briefcase size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-btraffic-purple uppercase tracking-[0.3em]">Fase 3: Diagnóstico de Dolor</label>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">¿Cuál es su cuello de botella?</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'time', label: 'Falta de Tiempo Personal', icon: <Timer size={20} /> },
                                        { id: 'sales', label: 'Ventas Estancadas / Inestables', icon: <TrendingUp size={20} /> },
                                        { id: 'chaos', label: 'Caos Operativo / Dependencia', icon: <AtSign size={20} /> }
                                    ].map((pain) => (
                                        <button
                                            key={pain.id}
                                            onClick={() => { setData({ ...data, pain: pain.label }); nextStep(3); }}
                                            className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left flex items-center justify-between group hover:border-btraffic-purple/50 transition-all"
                                            data-track={`diagnostic-pain-${pain.id}`}
                                        >
                                            <span className="font-bold text-lg">{pain.label}</span>
                                            <span className="text-btraffic-purple opacity-50 group-hover:opacity-100 transition-opacity">{pain.icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Fase 4: Análisis de Activo</label>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">¿Cómo percibe su web actual?</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => { setData({ ...data, assetStatus: 'activo' }); nextStep(4); }}
                                        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-btraffic-lime transition-all flex flex-col items-center gap-4 group"
                                        data-track="diagnostic-status-activo"
                                    >
                                        <div className="p-4 rounded-full bg-btraffic-lime/10 text-btraffic-lime group-hover:scale-110 transition-transform"><Wallet size={32} /></div>
                                        <span className="font-black uppercase tracking-widest text-[10px]">Un Activo</span>
                                    </button>
                                    <button
                                        onClick={() => { setData({ ...data, assetStatus: 'gasto' }); nextStep(4); }}
                                        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500 transition-all flex flex-col items-center gap-4 group"
                                        data-track="diagnostic-status-gasto"
                                    >
                                        <div className="p-4 rounded-full bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform"><TrendingUp className="rotate-180" size={32} /></div>
                                        <span className="font-black uppercase tracking-widest text-[10px]">Un Gasto</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-8">
                                <div className="space-y-2 text-center">
                                    <label className="text-[10px] font-black text-btraffic-lime uppercase tracking-[0.4em]">Calibración de Resultados</label>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Su Número de Tranquilidad</h3>
                                    <p className="text-gray-500 text-sm font-medium">¿Cuánto debería facturar su negocio al mes para que usted pueda desconectarse 100%?</p>
                                </div>

                                <div className="space-y-6">
                                    <input
                                        type="text"
                                        placeholder="Ej: $15,000 USD"
                                        className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-center text-4xl font-black outline-none focus:border-btraffic-lime transition-all placeholder:opacity-20"
                                        value={data.tranquilityNumber} onChange={e => setData({ ...data, tranquilityNumber: e.target.value })}
                                    />

                                    <div className="flex flex-col gap-4">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">¿Su negocio ya factura más de $10,000 USD/mes?</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => { setData({ ...data, revenue: 'yes' }); analyze(); }}
                                                className={`py-4 rounded-2xl border font-black uppercase tracking-widest text-xs transition-all ${data.revenue === 'yes' ? 'bg-btraffic-lime text-black border-btraffic-lime' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                                data-track="diagnostic-revenue-yes"
                                            >
                                                SÍ
                                            </button>
                                            <button
                                                onClick={() => { setData({ ...data, revenue: 'no' }); analyze(); }}
                                                className={`py-4 rounded-2xl border font-black uppercase tracking-widest text-xs transition-all ${data.revenue === 'no' ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                                data-track="diagnostic-revenue-no"
                                            >
                                                AÚN NO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {status === 'analyzing' && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                        className="flex flex-col items-center justify-center py-20 space-y-8 text-center"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-btraffic-lime/20 border-t-btraffic-lime animate-spin" />
                            <TrendingUp className="absolute inset-0 m-auto text-btraffic-lime" size={32} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Ejecutando Análisis Forense</h3>
                            <p className="text-gray-500 font-mono text-[10px] animate-pulse">INICIALIZANDO MOTOR DE INTELIGENCIA BTRAFFIC...</p>
                        </div>
                        <div className="w-full max-w-xs bg-white/5 h-1 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }}
                                className="h-full bg-btraffic-lime shadow-[0_0_10px_#A2FF00]"
                            />
                        </div>
                    </motion.div>
                )}

                {status === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-center space-y-8 py-4"
                    >
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

                        {isQualified ? (
                            <>
                                <div className="inline-block p-6 bg-btraffic-lime/10 rounded-full border border-btraffic-lime/20">
                                    <CheckCircle2 className="text-btraffic-lime" size={64} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Candidato Positivo</h3>
                                    <div className="text-btraffic-lime font-bold uppercase tracking-widest text-xs">Perfil Estratégico Detectado</div>
                                </div>

                                <p className="text-gray-400 font-medium leading-relaxed">
                                    {intelligenceResult?.personalizedMessage || (
                                        <>
                                            {data.name}, el análisis de <span className="text-white">{data.web}</span> confirma una operación dependiente de tu presencia física. <br /><br />
                                            Como <span className="text-white font-bold">{data.role}</span>, estás en la posición clave para ejecutar una arquitectura de orquestación.
                                        </>
                                    )}
                                </p>

                                <button onClick={handleWhatsAppRedirect} className="btn-premium w-full py-6 flex items-center justify-center gap-3 group text-base" data-track="diagnostic-cta-qualified">
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
                                            {data.name}, el sistema ha detectado que <span className="text-white font-bold">{data.web}</span> necesita una base de procesos más robusta antes de escalar.
                                        </>
                                    )}
                                </p>

                                <button onClick={handleWhatsAppRedirect} className="w-full py-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3 group font-black uppercase tracking-widest text-sm" data-track="diagnostic-cta-cimentacion">
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
