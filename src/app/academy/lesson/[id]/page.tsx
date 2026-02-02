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
    const [activeTab, setActiveTab] = useState('Resumen');

    const resources = [
        { name: `PDF: Framework S${id.padStart(2, '0')}`, size: '12MB', url: `/assets/academy/resources/SESION_${id.padStart(2, '0')}_BTRAFFIC.pdf` },
        { name: 'XLSX: Calculadora ROI v2', size: '2MB', url: '#' },
    ];

    const handleFileClick = (url: string) => {
        if (!url || url === '#') return;
        window.open(url, '_blank');
    };

    // List of sessions that actually have local videos with correct paths
    const videoMap: Record<string, string> = {
        '1': '/assets/academy/videos/session_01.mp4',
        '2': '/assets/academy/videos/session_02.mp4',
        '3': '/assets/academy/videos/session_03.mp4',
        '4': '/assets/academy/videos/session_04.mp4',
        '5': '/assets/academy/videos/session_05.mp4',
        '6': '/assets/academy/videos/session_06.mp4',
        '7': '/assets/academy/videos/El_Google_AI_Stack.mp4',
        '8': '/assets/academy/videos/session_08.mp4',
        '9': '/assets/academy/videos/El_Gancho_Maestro.mp4',
        '10': '/assets/academy/videos/Auditoría_en_Vivo__Diagnóstico_BTraffic.mp4',
        '11': '/assets/academy/videos/ROI_y_Descubrimiento.mp4',
        '12': '/assets/academy/videos/session_12.mp4',
        '13': '/assets/academy/videos/Modelo_Partnership_BTraffic.mp4',
        '14': '/assets/academy/videos/Blueprint_y_Recurrencia.mp4',
        '15': '/assets/academy/videos/session_15.mp4',
        '16': '/assets/academy/videos/session_16.mp4',
        '17': '/assets/academy/videos/session_17.mp4',
        '18': '/assets/academy/videos/El_Go-Live_Estratégico.mp4',
        '19': '/assets/academy/videos/Inteligencia_de_Ecosistema.mp4',
        '20': '/assets/academy/videos/session_20.mp4',
    };

    const getVideoPath = (sessionId: string) => {
        return videoMap[sessionId] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    };

    const isLocalVideo = !!videoMap[id];

    useEffect(() => {
        // Auth Check
        const unlocked = localStorage.getItem('btraffic_academy_unlocked');
        if (unlocked !== 'true') {
            router.push('/academy/course/estrategas-btraffic?lock_redirect=true');
        }

        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        setIsCompleted(completed.includes(id));
    }, [id, router]);

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

    const sessionTitles: Record<string, string> = {
        '1': 'El ADN del Estratega',
        '2': 'La Identidad del Estratega Pragmático',
        '3': 'El Manifiesto BitTraffic',
        '4': 'Softuarización y Regla 80/20',
        '5': 'Orquestación con n8n',
        '6': 'Inteligencia con GraphRAG',
        '7': 'Google AI Stack',
        '8': 'Lógica vs. Agentes',
        '9': 'El Gancho Maestro',
        '10': 'Auditoría en Vivo',
        '11': 'La Propuesta Irrechazable',
        '12': 'El Cierre de Autoridad',
        '13': 'El Modelo Partnership',
        '14': 'Suscripción y Recurrencia',
        '15': 'Onboarding del Ecosistema',
        '16': 'Reporte de Transparencia',
        '17': 'Eficiencia Operativa',
        '18': 'Inteligencia Total',
        '19': 'Diversificación de Portfolio',
        '20': 'El Futuro del Trabajo',
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12 font-['Outfit']">
            {/* Header / Breadcrumbs */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                        <Link href="/academy/course/estrategas-btraffic" className="hover:text-btraffic-lime transition-colors">Aulas</Link>
                        <span>/</span>
                        <span className="text-white">Módulo de Estrategia</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                        Sesión {id.padStart(2, '0')}: <span className="text-btraffic-lime">{sessionTitles[id] || 'Arquitectura de Activos'}</span>
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
                    <button
                        onClick={() => handleFileClick(resources[0].url)}
                        className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/5 transition-colors"
                        title="Descargar recursos de sesión"
                    >
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
                        playsInline
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
                            className="absolute inset-0 bg-btraffic-lime/10 pointer-events-none flex items-center justify-center p-4 text-center"
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
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab ? 'border-btraffic-lime text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 space-y-6">
                        {activeTab === 'Resumen' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
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
                            </motion.div>
                        )}

                        {activeTab === 'Recursos' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-black uppercase tracking-tighter text-btraffic-blue">Material Descargable</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {resources.map((file) => (
                                        <div
                                            key={file.name}
                                            onClick={() => handleFileClick(file.url)}
                                            className="flex items-center justify-between p-6 rounded-[24px] bg-black/40 border border-white/5 group hover:border-btraffic-blue/50 hover:bg-btraffic-blue/5 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-btraffic-blue/20 flex items-center justify-center text-btraffic-blue">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-tight">{file.name}</div>
                                                    <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{file.size}</div>
                                                </div>
                                            </div>
                                            <Download size={16} className="text-gray-500 group-hover:text-btraffic-blue group-hover:scale-110 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'Comunidad' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-12 space-y-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                                    <CheckCircle size={32} />
                                </div>
                                <h4 className="text-lg font-black uppercase italic text-white">Próximamente...</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Chat de comunidad habilitado próximamente</p>
                            </motion.div>
                        )}
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
                            <span className="text-[10px] font-black text-btraffic-blue">{resources.length} archivos</span>
                        </div>
                        <div className="space-y-2">
                            {resources.map((file) => (
                                <div
                                    key={file.name}
                                    onClick={() => handleFileClick(file.url)}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-btraffic-blue/30 hover:bg-white/5 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className={`group-hover:text-btraffic-blue transition-colors ${file.url === '#' ? 'text-gray-700' : 'text-btraffic-blue'}`} />
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
