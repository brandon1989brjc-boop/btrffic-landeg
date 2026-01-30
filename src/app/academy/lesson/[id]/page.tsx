
'use client';

import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    FileText,
    MessageSquare,
    Download,
    Eye,
    CheckCircle,
    Play
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LessonPage() {
    const params = useParams();
    const id = params.id as string || '1';

    // List of sessions that actually have local videos
    const sessionsWithVideo = ['1', '2', '3', '4', '5', '6', '8', '12', '15', '16', '17', '20'];

    const getLocalVideoPath = (sessionId: string) => {
        if (sessionsWithVideo.includes(sessionId)) {
            return `/assets/academy/videos/session_${sessionId.padStart(2, '0')}.mp4`;
        }
        return null; // Fallback if no video exists
    };

    const sessionTitleMapping: Record<string, string> = {
        '1': 'De la Web Pasiva al Activo de Datos',
        '2': 'La Identidad del Estratega Pragmático',
        '3': 'El Manifiesto Btraffic',
        '4': 'Softuarización y Regla 80/20',
        '5': 'Orquestación con n8n',
        '6': 'Inteligencia con GraphRAG',
        '7': 'Google AI Stack',
        '8': 'Lógica vs. Agentes',
        '9': "El Gancho Maestro - 'Regalo de Venta Diaria'",
        '10': 'Auditoría en Vivo - Cualificación por Fugas',
        '11': 'La Propuesta Irrechazable - ROI',
        '12': 'El Cierre de Autoridad',
        '13': 'El Modelo Partnership',
        '14': 'Suscripción y Recurrencia',
        '15': 'Onboarding del Ecosistema',
        '16': 'Reporte de Transparencia',
        '17': 'Eficiencia Operativa',
        '18': 'Inteligencia Total - Las 4 Capas',
        '19': 'Diversificación de Portfolio',
        '20': 'El Futuro del Trabajo - Ecosistema 2026',
    };

    const lesson = {
        id,
        title: sessionTitleMapping[id] || `Sesión ${id} de Btraffic Academy`,
        module: parseInt(id) <= 4 ? 'Módulo 1: ADN y Mentalidad' :
            parseInt(id) <= 8 ? 'Módulo 2: Infraestructura y Datos' :
                parseInt(id) <= 12 ? 'Módulo 3: Estrategia de Ventas' :
                    parseInt(id) <= 16 ? 'Módulo 4: Operaciones y Delivery' :
                        'Módulo 5: Escala y Futuro',
        description: `Protocolo avanzado de Btraffic para la Sesión ${id}.`,
        videoUrl: getLocalVideoPath(id),
        resources: [
            {
                name: `SESION_${id.padStart(2, '0')}_BTRAFFIC.pdf`,
                type: 'Estructura',
                path: `/assets/academy/resources/SESION_${id.padStart(2, '0')}_BTRAFFIC.pdf`
            },
            {
                name: `T-BTRAFFIC_P_S${id.padStart(2, '0')}.pdf`,
                type: 'Profundización',
                path: `/assets/academy/resources/T-BTRAFFIC_P_S${id.padStart(2, '0')}.pdf`
            }
        ]
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
            {/* Left Column: Video & Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                    <Link href="/academy/course/estrategas-btraffic" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-btraffic-lime transition-colors">
                        <ChevronLeft size={16} /> Ver Programa
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                            Anterior
                        </button>
                        <button className="text-[10px] font-black uppercase tracking-widest text-btraffic-lime hover:text-white flex items-center gap-1 transition-colors">
                            Siguiente <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video rounded-3xl bg-black border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                    {lesson.videoUrl ? (
                        <video
                            src={lesson.videoUrl}
                            controls
                            className="w-full h-full object-cover"
                            poster="/og-image.png"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-btraffic-dark via-transparent to-btraffic-lime/5">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Play size={32} className="text-gray-500 fill-gray-500 ml-1 opacity-20" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-xs font-black uppercase tracking-widest text-btraffic-lime">
                                    Sesión en producción
                                </p>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                                    El contenido estratégico estará disponible pronto
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lesson Info */}
                <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-btraffic-lime">{lesson.module}</span>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mt-1">
                                {lesson.id}. {lesson.title}
                            </h1>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-btraffic-lime hover:text-black transition-all">
                            <CheckCircle size={16} /> Completar
                        </button>
                    </div>

                    <div className="p-6 bg-btraffic-gray/30 border border-white/5 rounded-3xl">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                            <MessageSquare size={14} className="text-btraffic-blue" />
                            Propósito de la sesión
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed italic">
                            "{lesson.description}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Resources & Community (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                {/* Resources */}
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <FileText size={16} className="text-btraffic-lime" />
                        Material de Apoyo
                    </h3>
                    <div className="space-y-3">
                        {lesson.resources.map((res, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-btraffic-lime/30 transition-all">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold truncate max-w-[150px]">{res.name}</p>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{res.type}</p>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={res.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-btraffic-blue transition-colors"
                                    >
                                        <Eye size={16} />
                                    </a>
                                    <a
                                        href={res.path}
                                        download
                                        className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-btraffic-lime transition-colors"
                                    >
                                        <Download size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Simple Community Placeholder */}
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={16} className="text-btraffic-blue" />
                        Discusión de la clase
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-btraffic-lime/20 border border-btraffic-lime/20 flex items-center justify-center text-[10px] font-bold">JD</div>
                            <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5">
                                <p className="text-[10px] text-gray-400 leading-tight">Increíble cómo cambia el pitch cuando hablas de activos y no de webs.</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Escribe un comentario..."
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-[10px] focus:outline-none focus:border-btraffic-lime/50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
