
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

    // Mock lesson data (this would come from a CMS or DB)
    const lesson = {
        id,
        title: id === '1' ? 'De la Web Pasiva al Activo de Datos' : 'Lección de BitTraffic Academy',
        module: 'Módulo 1: ADN y Mentalidad',
        description: 'En esta sesión aprenderás a transformar la percepción del cliente de un gasto estético a una inversión necesaria basada en datos.',
        videoUrl: 'https://notebooklm.google.com/notebook/6455d30e-358e-4737-b0c5-ef2e97e2b51d', // Link to the brain for now
        resources: [
            { name: `SESION_${id.toString().padStart(2, '0')}_BITTRAFFIC.pdf`, type: 'Estructura' },
            { name: `T-BTRAFFIC_P_S${id.toString().padStart(2, '0')}.pdf`, type: 'Profundización' }
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

                {/* Video Player Placeholder */}
                <div className="relative aspect-video rounded-3xl bg-black border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-btraffic-dark via-transparent to-btraffic-lime/5">
                        <div className="w-20 h-20 rounded-full bg-btraffic-lime flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-btraffic-lime/20">
                            <Play size={32} className="text-black fill-black ml-1" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                            Haz clic para iniciar el Vídeo de la Sesión {id}
                        </p>
                    </div>
                    {/* Progress overlay */}
                    <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-btraffic-lime w-1/3 shadow-[0_0_10px_rgba(162,255,0,0.5)]" />
                    </div>
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
                                    <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-btraffic-blue transition-colors">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-btraffic-lime transition-colors">
                                        <Download size={16} />
                                    </button>
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
