
'use client';

import { motion } from 'framer-motion';
import { Play, Lock, ChevronRight, BarChart, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

const courses = [
    {
        id: 'estrategas-btraffic',
        title: 'Formación de Estrategas BitTraffic',
        description: 'Domina el ADN de BitTraffic y conviértete en un arquitecto de sistemas operativos para captar clientes de alto valor.',
        image: '/academy/covers/estrategas.jpg', // Placeholder
        progress: 0,
        lessonCount: 20,
        type: 'FREE',
        color: 'btraffic-lime',
        tag: '¡EMPIEZA AQUÍ!'
    },
    {
        id: 'automatizacion-avanzada',
        title: 'Arquitectura y Automatización Senior',
        description: 'Flujos complejos en n8n, entrenamiento de LLMs forenses y orquestación masiva de agentes.',
        image: '/academy/covers/advanced.jpg', // Placeholder
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
        image: '/academy/covers/sales.jpg', // Placeholder
        progress: 0,
        lessonCount: 10,
        type: 'PREMIUM',
        color: 'btraffic-blue',
        tag: 'Unlock with Premium'
    }
];

export default function ClassroomPage() {
    return (
        <div className="space-y-10">
            {/* Hero / Welcome */}
            <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-btraffic-gray to-black border border-white/5 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-hero-mesh opacity-30 pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                        BIENVENIDO AL <span className="text-btraffic-lime text-shadow-lime">CENTRO DE MANDO</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Aquí forjamos a los próximos líderes de la economía agéntica. Tu camino para convertirte en socio de BitTraffic comienza con el dominio del dato.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold text-btraffic-lime">
                            <BarChart size={14} />
                            20 SESIONES ACTIVAS
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold text-btraffic-blue">
                            <BookOpen size={14} />
                            32 MANUALES TÉCNICOS
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-btraffic-lime"></div>
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
                            className="group relative flex flex-col bg-btraffic-gray/30 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all hover:shadow-2xl hover:shadow-black/50"
                        >
                            {/* Course Image / Cover */}
                            <div className="relative aspect-video overflow-hidden">
                                {course.type === 'PREMIUM' && (
                                    <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                            <Lock size={20} className="text-btraffic-purple" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest bg-btraffic-purple px-4 py-1.5 rounded-full shadow-lg shadow-btraffic-purple/20">
                                            Unlock with Premium
                                        </span>
                                    </div>
                                )}

                                <div className={`absolute inset-0 bg-gradient-to-br from-btraffic-dark via-transparent to-${course.color}/10 z-10 opacity-60`} />

                                {/* Placeholder for visuals */}
                                <div className={`w-full h-full bg-btraffic-gray flex items-center justify-center overflow-hidden`}>
                                    <div className={`w-full h-full absolute transition-transform duration-700 group-hover:scale-110 opacity-40 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center`} />
                                    <h4 className={`relative z-10 text-4xl font-black tracking-tighter text-white/20 uppercase`}>
                                        {course.id.split('-')[0]}
                                    </h4>
                                </div>

                                {course.type === 'FREE' && (
                                    <button className="absolute bottom-4 right-4 z-30 w-12 h-12 rounded-full bg-btraffic-lime flex items-center justify-center shadow-xl shadow-btraffic-lime/20 group-hover:scale-110 transition-transform">
                                        <Play size={20} className="text-black fill-black ml-1" />
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-${course.color}/30 text-${course.color}`}>
                                        {course.tag}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-auto">
                                        <Clock size={12} />
                                        {course.lessonCount} Clases
                                    </div>
                                </div>

                                <h4 className="text-lg font-black tracking-tight mb-2 group-hover:text-btraffic-lime transition-colors">
                                    {course.title}
                                </h4>

                                <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-1">
                                    {course.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Progreso</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${course.color} transition-all duration-1000`}
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {course.type === 'FREE' ? (
                                    <Link
                                        href={`/academy/course/${course.id}`}
                                        className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-bold uppercase tracking-widest hover:bg-btraffic-lime hover:text-black hover:border-btraffic-lime transition-all"
                                    >
                                        Entrar al Aula
                                    </Link>
                                ) : (
                                    <button className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-50 cursor-not-allowed">
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
