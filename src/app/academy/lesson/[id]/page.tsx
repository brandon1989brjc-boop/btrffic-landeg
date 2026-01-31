'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    FileText,
    Download,
    CheckCircle,
    Play
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string || '1';
    const currentId = parseInt(id);

    const [isCompleted, setIsCompleted] = useState(false);

    // List of sessions that actually have local videos
    const sessionsWithVideo = ['1', '2', '3', '4', '5', '6', '8', '12', '15', '16', '17', '20'];
    const getVideoPath = (sessionId: string) => {
        if (sessionsWithVideo.includes(sessionId)) {
            return `/videos/session-${sessionId.padStart(2, '0')}.mp4`;
        }
        return 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Rickroll as fallback or placeholder
    };

    const isLocalVideo = sessionsWithVideo.includes(id);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        setIsCompleted(completed.includes(id));
    }, [id]);

    const toggleComplete = () => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        let newCompleted;
        if (completed.includes(id)) {
            newCompleted = completed.filter((i: string) => i !== id);
        } else {
            newCompleted = [...completed, id];
        }
        localStorage.setItem('btraffic_completed_lessons', JSON.stringify(newCompleted));
        setIsCompleted(!isCompleted);

        // Custom event for layout progress update
        window.dispatchEvent(new Event('storage_update'));
    };

    const nextId = currentId < 20 ? currentId + 1 : null;
    const prevId = currentId > 1 ? currentId - 1 : null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12 font-['Outfit']">
            {/* Header / Breadcrumbs */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                        <Link href="/academy" className="hover:text-btraffic-lime transition-colors">Aulas</Link>
                        <span>/</span>
                        <span className="text-white">Módulo de Estrategia</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                        Sesión {id.padStart(2, '0')}: <span className="text-btraffic-lime">Arquitectura de Activos</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleComplete}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 touch-manipulation ${isCompleted ? 'bg-btraffic-lime text-black' : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'}`}
                    >
                        <CheckCircle size={16} fill={isCompleted ? 'currentColor' : 'none'} />
                        {isCompleted ? 'Completado' : 'Marcar como completado'}
                    </button>
                    <button className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/5 transition-colors">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Video Player Section */}
            <div className="aspect-video bg-black rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative group">
                {isLocalVideo ? (
                    <video
                        key={id}
                        controls
                        className="w-full h-full object-cover"
                        poster="/images/video-poster.jpg"
                    >
                        <source src={getVideoPath(id)} type="video/mp4" />
                        Tu navegador no soporta el tag de video.
                    </video>
                ) : (
                    <iframe
                        src={getVideoPath(id)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}

                <AnimatePresence>
                    {isCompleted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-btraffic-lime/10 pointer-events-none flex items-center justify-center"
                        >
                            <div className="bg-btraffic-lime text-black px-6 py-3 rounded-full font-black uppercase text-xs shadow-2xl border-4 border-black/20">
                                SESIÓN COMPLETADA
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation & Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex gap-4 border-b border-white/5 pb-1">
                        {['Resumen', 'Recursos', 'Comunidad'].map((tab) => (
                            <button key={tab} className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${tab === 'Resumen' ? 'border-btraffic-lime text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 space-y-6">
                        <h3 className="text-xl font-black uppercase tracking-tighter">¿Qué aprenderás en esta sesión?</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            En esta sesión profundizamos en la transición de "hacer webs" a "construir activos". Analizamos por qué el mercado está saturado de diseñadores pero hambriento de estrategas que sepan leer datos forenses.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {[
                                'Análisis de fugas de tráfico',
                                'Psicología del scroll premium',
                                'Integración de n8n básica',
                                'El cierre de 15 minutos'
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-btraffic-lime shadow-[0_0_10px_rgba(162,255,0,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 rounded-[32px] p-6 border border-white/5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Navegación</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => prevId && router.push(`/academy/lesson/${prevId}`)}
                                disabled={!prevId}
                                className={`flex flex-col gap-2 p-6 rounded-2xl transition-all border touch-manipulation active:scale-95 ${prevId ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white shadow-lg' : 'bg-transparent border-white/5 text-gray-700 cursor-not-allowed'}`}
                            >
                                <ChevronLeft size={20} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-left">Anterior</span>
                            </button>
                            <button
                                onClick={() => nextId && router.push(`/academy/lesson/${nextId}`)}
                                disabled={!nextId}
                                className={`flex flex-col items-end gap-2 p-6 rounded-2xl transition-all border touch-manipulation active:scale-95 ${nextId ? 'bg-btraffic-lime border-transparent hover:scale-105 shadow-xl shadow-btraffic-lime/20 text-black' : 'bg-transparent border-white/5 text-gray-700 cursor-not-allowed'}`}
                            >
                                <ChevronRight size={20} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-right">Siguiente</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-[32px] p-6 border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Recursos de Sesión</p>
                            <span className="text-[10px] font-black text-btraffic-blue">4 archivos</span>
                        </div>
                        <div className="space-y-2">
                            {[
                                { name: 'PDF: Framework de Estrategia', size: '12MB' },
                                { name: 'XLSX: Calculadora ROI v2', size: '2MB' },
                            ].map((file) => (
                                <div key={file.name} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-btraffic-blue/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-btraffic-blue" />
                                        <div className="text-[9px] font-black uppercase tracking-tight">{file.name}</div>
                                    </div>
                                    <div className="text-[8px] font-bold text-gray-600">{file.size}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
