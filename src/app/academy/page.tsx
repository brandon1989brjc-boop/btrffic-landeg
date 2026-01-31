'use client';

import { motion } from 'framer-motion';
import { Play, Lock, ChevronRight, BarChart, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ClassroomPage() {
    const [mainProgress, setMainProgress] = useState(0);

    const updateProgress = () => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        // Based on 20 total lessons for the main course
        const calculated = Math.round((completed.length / 20) * 100);
        setMainProgress(calculated > 100 ? 100 : calculated);
    };

    useEffect(() => {
        updateProgress();
        window.addEventListener('storage_update', updateProgress);
        return () => window.removeEventListener('storage_update', updateProgress);
    }, []);

    const courses = [
        {
            id: 'estrategas-btraffic',
            title: 'Formación de Estrategas Btraffic',
            description: 'Domina el ADN de Btraffic y conviértete en un arquitecto de sistemas operativos para captar clientes de alto valor.',
            image: '/academy/covers/estrategas.jpg',
            progress: mainProgress,
            lessonCount: 20,
            type: 'FREE',
            color: 'btraffic-lime',
            tag: '¡EMPIEZA AQUÍ!'
        },
        {
            id: 'automatizacion-avanzada',
            title: 'Arquitectura y Automatización Senior',
            description: 'Flujos complejos en n8n, entrenamiento de LLMs forenses y orquestación masiva de agentes.',
            image: '/academy/covers/advanced.jpg',
            progress: 0,
            lessonCount: 15,
            type: 'PREMIUM',
            color: 'btraffic-purple',
            tag: 'Unlock with Premium'
        },
        {
            id: 'ventas-forenses',
            title: 'Psicología y Ventas Basadas en Datos',
            description: 'Cierre de contratos 5-figuras utilizando auditorías en vivo y ganchos de autoridad forense.',
            image: '/academy/covers/sales.jpg',
            progress: 0,
            lessonCount: 10,
            type: 'PREMIUM',
            color: 'btraffic-blue',
            tag: 'Unlock with Premium'
        }
    ];

    return (
        <div className="space-y-10 font-['Outfit']">
            {/* Hero / Welcome */}
            <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-btraffic-gray to-black border border-white/5 p-8 md:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-hero-mesh opacity-20 pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-btraffic-lime/10 border border-btraffic-lime/20 rounded-full text-btraffic-lime text-[10px] font-black uppercase tracking-widest mb-6">
                        <BarChart size={12} /> Centro de Operaciones
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase italic">
                        FORJANDO <span className="text-btraffic-lime">ARQUITECTOS</span> DE ÉLITE
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium max-w-lg">
                        Bienvenido al ecosistema donde el código y la estrategia se fusionan. Domina los activos digitales y escala tu valor en la economía agéntica.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-xl">
                            <span className="text-btraffic-lime text-lg leading-none">20</span>
                            Sesiones de Estrategia
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-xl">
                            <span className="text-btraffic-blue text-lg leading-none">32</span>
                            Activos Técnicos
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] flex items-center gap-3">
                        <div className="w-1 h-6 bg-btraffic-lime shadow-[0_0_10px_rgba(162,255,0,0.5)]"></div>
                        Aulas de Formación
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex flex-col bg-btraffic-gray/20 border border-white/5 rounded-[40px] overflow-hidden hover:border-white/10 transition-all hover:shadow-2xl hover:shadow-black/60"
                        >
                            {/* Course Image / Cover */}
                            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                                {course.type === 'PREMIUM' && (
                                    <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-[4px] flex flex-col items-center justify-center gap-5">
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                            <Lock size={24} className="text-btraffic-purple" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-btraffic-purple text-white px-5 py-2 rounded-full shadow-xl shadow-btraffic-purple/30">
                                            Desbloquear con Premium
                                        </span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />

                                {/* Placeholder for visuals */}
                                <div className={`w-full h-full bg-btraffic-gray flex items-center justify-center`}>
                                    <div className={`w-full h-full absolute transition-transform duration-1000 group-hover:scale-110 opacity-60 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center`} />
                                    <h4 className="relative z-10 text-5xl font-black tracking-tighter text-white/10 uppercase italic">
                                        ESTRATEGAS
                                    </h4>
                                </div>

                                {course.type === 'FREE' && (
                                    <button className="absolute bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-btraffic-lime flex items-center justify-center shadow-2xl shadow-btraffic-lime/30 group-hover:scale-110 active:scale-95 transition-all">
                                        <Play size={24} className="text-black fill-black ml-1" />
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-${course.color}/30 bg-${course.color}/10 text-${course.color}`}>
                                        {course.tag}
                                    </span>
                                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest ml-auto">
                                        <Clock size={12} />
                                        {course.lessonCount} Clases
                                    </div>
                                </div>

                                <h4 className="text-xl font-black tracking-tighter uppercase leading-tight group-hover:text-btraffic-lime transition-colors">
                                    {course.title}
                                </h4>

                                <p className="text-[11px] text-gray-400 leading-relaxed font-medium flex-1">
                                    {course.description}
                                </p>

                                <div className="h-px bg-white/5 my-2" />

                                {/* Progress Bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-500">Progreso</span>
                                        <span className="text-btraffic-lime">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full bg-${course.color} shadow-[0_0_15px_rgba(162,255,0,0.3)]`}
                                        />
                                    </div>
                                </div>

                                {course.type === 'FREE' ? (
                                    <Link
                                        href={`/academy/lesson/1`}
                                        className="mt-4 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-[0.98] shadow-lg"
                                    >
                                        Entrar al Aula
                                    </Link>
                                ) : (
                                    <button className="mt-4 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest opacity-30 cursor-not-allowed">
                                        Contenido Protegido
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
