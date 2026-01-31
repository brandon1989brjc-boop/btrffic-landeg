'use client';

import { motion } from 'framer-motion';
import {
    ChevronLeft,
    PlayCircle,
    FileText,
    CheckCircle2,
    Clock,
    BarChart3,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const modules = [
    {
        title: 'Módulo 1: ADN y Mentalidad del Estratega',
        lessons: [
            { id: '1', title: 'De la Web Pasiva al Activo de Datos', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '2', title: 'La Identidad del Estratega Pragmático', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '3', title: 'El Manifiesto Btraffic', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '4', title: 'Softuarización y Regla 80/20', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    },
    {
        title: 'Módulo 2: Infraestructura y Stack Tecnológico',
        lessons: [
            { id: '5', title: 'Orquestación con n8n', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '6', title: 'Inteligencia con GraphRAG', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '7', title: 'Google AI Stack', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '8', title: 'Lógica vs. Agentes', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    },
    {
        title: 'Módulo 3: Estrategia de Ventas Forense',
        lessons: [
            { id: '9', title: 'El Auditor Junior: El Gancho Maestro', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '10', title: 'Protocolos de Arranque y Auditoría en Vivo', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '11', title: 'La Propuesta Irrechazable: ROI Forense', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '12', title: 'El Cierre de Autoridad: Número de Tranquilidad', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    },
    {
        title: 'Módulo 4: Operaciones y Modelos de Negocio',
        lessons: [
            { id: '13', title: 'El Modelo Partnership', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '14', title: 'Suscripción y Mantenimiento de Inteligencia', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '15', title: 'Onboarding y la Primera Victoria', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '16', title: 'Reporte de Transparencia: Sin Relato, Solo Dato', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    },
    {
        title: 'Módulo 5: Inteligencia Total y Escalado',
        lessons: [
            { id: '17', title: 'Eficiencia Operativa: Btraffic OS', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '18', title: 'Inteligencia Total: Las 4 Capas del Éxito', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '19', title: 'Diversificación de Portfolio y Sectores', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '20', title: 'El Futuro del Trabajo: Horizonte 2026', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    }
];

export default function CourseDetailPage() {
    const params = useParams();
    const id = params.id as string || 'default';
    const [progress, setProgress] = useState(0);
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const updateStats = () => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        setCompletedIds(completed);
        const calculated = Math.round((completed.length / 20) * 100);
        setProgress(calculated > 100 ? 100 : calculated);
    };

    useEffect(() => {
        updateStats();
        window.addEventListener('storage_update', updateStats);
        return () => window.removeEventListener('storage_update', updateStats);
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 font-['Outfit']">
            {/* Back Link */}
            <Link href="/academy" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-btraffic-lime transition-all active:scale-95">
                <ChevronLeft size={16} />
                Volver a las Aulas
            </Link>

            {/* Course Header */}
            <header className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-80 aspect-video rounded-[40px] bg-btraffic-gray/20 border border-white/5 flex items-center justify-center overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                    <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center" />
                    <PlayCircle className="absolute z-20 text-white/20" size={48} />
                </div>
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-btraffic-lime/10 border border-btraffic-lime/30 text-btraffic-lime text-[10px] font-black uppercase tracking-widest rounded-full">
                            GRATUITO
                        </span>
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                            20 Lecciones • 30 Horas
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                        Formación de <span className="text-btraffic-lime">Estrategas</span> Btraffic
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl font-medium">
                        Aprende la metodología exacta que utilizamos en Btraffic para transformar infraestructuras digitales en activos financieros. Domina la autoridad del dato y conviértete en un arquitecto de la nueva economía.
                    </p>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Completado</span>
                    <span className="text-2xl font-black text-btraffic-lime">{progress}%</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nivel Actual</span>
                    <span className="text-2xl font-black text-btraffic-blue">{progress >= 100 ? 'Master' : 'Arquitecto'}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Documentos</span>
                    <span className="text-2xl font-black text-white">32</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Certificación</span>
                    <span className="text-xs font-black text-btraffic-purple bg-btraffic-purple/10 px-3 py-1 rounded border border-btraffic-purple/20 w-fit">PENDIENTE</span>
                </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-10 pt-4">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-btraffic-blue shadow-[0_0_10px_rgba(30,132,255,0.4)]"></div>
                    Programa de Estudios
                </h3>

                <div className="space-y-12">
                    {modules.map((module, mIndex) => (
                        <div key={mIndex} className="space-y-6">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-4 pl-4">
                                {module.title}
                                <div className="flex-1 h-px bg-white/5" />
                            </h4>
                            <div className="grid gap-3">
                                {module.lessons.map((lesson) => (
                                    <Link
                                        key={lesson.id}
                                        href={`/academy/lesson/${lesson.id}`}
                                        className="group flex items-center gap-6 p-6 bg-btraffic-gray/10 rounded-[32px] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all active:scale-[0.99]"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xs font-black transition-all ${completedIds.includes(lesson.id) ? 'bg-btraffic-lime border-btraffic-lime text-black shadow-lg shadow-btraffic-lime/20' : 'bg-black/40 border-white/10 text-gray-500 group-hover:text-white'}`}>
                                            {completedIds.includes(lesson.id) ? <CheckCircle2 size={20} strokeWidth={3} /> : lesson.id.padStart(2, '0')}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-base font-black uppercase tracking-tight group-hover:text-btraffic-lime transition-colors">
                                                {lesson.title}
                                            </h5>
                                            <div className="flex items-center gap-4 mt-1.5">
                                                <span className="text-[9px] font-bold text-gray-600 flex items-center gap-1.5 uppercase tracking-widest">
                                                    <Clock size={12} /> {lesson.duration}
                                                </span>
                                                <span className="text-[9px] font-bold text-gray-600 flex items-center gap-1.5 uppercase tracking-widest">
                                                    <BarChart3 size={12} /> {lesson.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 text-gray-700 group-hover:text-btraffic-lime group-hover:bg-btraffic-lime/10 transition-all">
                                            <PlayCircle size={24} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
