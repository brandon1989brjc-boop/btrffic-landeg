
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

const modules = [
    {
        title: 'Módulo 1: ADN y Mentalidad del Estratega',
        lessons: [
            { id: '1', title: 'De la Web Pasiva al Activo de Datos', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '2', title: 'La Identidad del Estratega Pragmático', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '3', title: 'El Manifiesto BitTraffic', duration: '1.5h', type: 'VIDEO + PDF' },
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
            { id: '17', title: 'Eficiencia Operativa: BitTraffic OS', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '18', title: 'Inteligencia Total: Las 4 Capas del Éxito', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '19', title: 'Diversificación de Portfolio y Sectores', duration: '1.5h', type: 'VIDEO + PDF' },
            { id: '20', title: 'El Futuro del Trabajo: Horizonte 2026', duration: '1.5h', type: 'VIDEO + PDF' },
        ]
    }
];

export default function CourseDetailPage() {
    const params = useParams();
    const id = params.id as string || 'default';

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Back Link */}
            <Link href="/academy" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-btraffic-lime transition-colors">
                <ChevronLeft size={16} />
                Volver a las Aulas
            </Link>

            {/* Course Header */}
            <header className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-64 aspect-video rounded-3xl bg-btraffic-gray border border-white/5 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-btraffic-lime/10 border border-btraffic-lime/30 text-btraffic-lime text-[10px] font-black uppercase tracking-widest rounded-full">
                            GRATUITO
                        </span>
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            20 Lecciones • 30 Horas de contenido
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
                        Formación de Estrategas BitTraffic
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                        Aprende la metodología exacta que utilizamos en BitTraffic para transformar infraestructuras digitales en activos financieros. Domina la autoridad del dato y conviértete en un arquitecto de la nueva economía.
                    </p>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Completado</span>
                    <span className="text-xl font-black">0%</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Calificación</span>
                    <span className="text-xl font-black">N/A</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Documentos</span>
                    <span className="text-xl font-black">32</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Certificación</span>
                    <span className="text-xl font-black">BitTraffic Master</span>
                </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-btraffic-blue"></div>
                    Programa de Estudios
                </h3>

                <div className="space-y-8">
                    {modules.map((module, mIndex) => (
                        <div key={mIndex} className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-btraffic-blue/80 flex items-center gap-3 pl-4">
                                {module.title}
                            </h4>
                            <div className="space-y-2">
                                {module.lessons.map((lesson, lIndex) => (
                                    <motion.div
                                        key={lesson.id}
                                        whileHover={{ x: 8 }}
                                        className="group flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-btraffic-dark border border-white/5 flex items-center justify-center text-xs font-black text-gray-500 group-hover:text-btraffic-lime group-hover:border-btraffic-lime/30 transition-colors">
                                            {lesson.id}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-bold group-hover:text-btraffic-lime transition-colors">
                                                {lesson.title}
                                            </h5>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase tracking-tighter">
                                                    <Clock size={10} /> {lesson.duration}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 uppercase tracking-tighter">
                                                    <BarChart3 size={10} /> {lesson.type}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/academy/lesson/${lesson.id}`}
                                            className="p-2 text-gray-600 hover:text-btraffic-lime transition-colors"
                                        >
                                            <PlayCircle size={24} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
