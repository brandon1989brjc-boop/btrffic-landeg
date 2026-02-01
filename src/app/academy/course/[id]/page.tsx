'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    PlayCircle,
    Play,
    FileText,
    CheckCircle2,
    Clock,
    BarChart3,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

const GLOBAL_PASSWORD = 'B-OS'; // Simple global password for demo purposes HTMLInputElement

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
    const router = useRouter();
    const id = params.id as string || 'default';
    const [progress, setProgress] = useState(0);
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const updateStats = () => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        setCompletedIds(completed);
        const calculated = Math.round((completed.length / 20) * 100);
        setProgress(calculated > 100 ? 100 : calculated);
    };

    useEffect(() => {
        updateStats();
        window.addEventListener('storage_update', updateStats);

        // Check global auth
        const unlocked = localStorage.getItem('btraffic_academy_unlocked');
        if (unlocked === 'true') {
            setIsUnlocked(true);
        }

        return () => window.removeEventListener('storage_update', updateStats);
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === GLOBAL_PASSWORD) {
            localStorage.setItem('btraffic_academy_unlocked', 'true');
            setIsUnlocked(true);
            setShowPasswordModal(false);
            setErrorMsg('');
        } else {
            setErrorMsg('Código de acceso incorrecto');
        }
    };

    const handleLessonAccess = (lessonId: string) => {
        if (isUnlocked) {
            router.push(`/academy/lesson/${lessonId}`);
        } else {
            setShowPasswordModal(true);
        }
    };

    // Calculate next lesson
    const getNextLessonId = () => {
        // Flatten modules to get all lessons
        const allLessons = modules.flatMap(m => m.lessons);
        // Find first uncompleted lesson
        const next = allLessons.find(l => !completedIds.includes(l.id));
        return next ? next.id : (allLessons.length > 0 ? allLessons[0].id : '1');
    };

    const nextLessonId = getNextLessonId();
    const isCourseStarted = completedIds.length > 0;
    const isCourseCompleted = progress === 100;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 font-['Outfit']">
            {/* Back Link */}
            <Link href="/academy" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-btraffic-lime transition-all active:scale-95">
                <ChevronLeft size={16} />
                Volver a las Aulas
            </Link>

            {/* Course Header */}
            <header className="flex flex-col md:flex-row gap-10 items-start">
                <div
                    onClick={() => handleLessonAccess(nextLessonId)}
                    className="w-full md:w-80 aspect-video rounded-[40px] bg-btraffic-gray/20 border border-white/5 flex items-center justify-center overflow-hidden relative shadow-2xl group cursor-pointer hover:border-btraffic-lime/50 transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                    <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute z-20 w-16 h-16 rounded-full bg-btraffic-lime flex items-center justify-center shadow-lg shadow-btraffic-lime/20 group-hover:scale-110 transition-transform">
                        {isUnlocked ? (
                            <Play className="text-black ml-1" size={24} fill="currentColor" />
                        ) : (
                            <Lock className="text-black" size={24} />
                        )}
                    </div>
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

                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                            Formación de <span className="text-btraffic-lime">Estrategas</span> Btraffic
                        </h1>

                        {(isCourseStarted && !isCourseCompleted) && (
                            <button
                                onClick={() => handleLessonAccess(nextLessonId)}
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black bg-btraffic-lime px-4 py-2 rounded-lg hover:bg-btraffic-lime/90 transition-colors"
                            >
                                <Play size={12} fill="currentColor" /> Continuar Lección {nextLessonId}
                            </button>
                        )}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl font-medium">
                        Aprende la metodología exacta que utilizamos en Btraffic para transformar infraestructuras digitales en activos financieros. Domina la autoridad del dato y conviértete en un arquitecto de la nueva economía.
                    </p>

                    {!isUnlocked && (
                        <div className="flex items-center gap-2 text-btraffic-lime/80 text-xs font-medium bg-btraffic-lime/5 border border-btraffic-lime/20 px-4 py-2 rounded-lg w-fit animate-pulse">
                            <Lock size={14} /> Contenido protegido. Ingresa tu código para desbloquear el temario completo.
                        </div>
                    )}
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
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleLessonAccess(lesson.id)}
                                        className={`group relative flex items-center gap-6 p-6 bg-btraffic-gray/10 rounded-[32px] border transition-all active:scale-[0.99] cursor-pointer ${isUnlocked ? 'border-white/5 hover:bg-white/5 hover:border-white/10' : 'border-white/5 opacity-80 hover:opacity-100 hover:border-white/20'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xs font-black transition-all ${completedIds.includes(lesson.id) ? 'bg-btraffic-lime border-btraffic-lime text-black shadow-lg shadow-btraffic-lime/20' : 'bg-black/40 border-white/10 text-gray-500 group-hover:text-white'}`}>
                                            {completedIds.includes(lesson.id) ? <CheckCircle2 size={20} strokeWidth={3} /> : (
                                                isUnlocked || mIndex === 0 ? lesson.id.padStart(2, '0') : <Lock size={14} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-base font-black uppercase tracking-tight group-hover:text-btraffic-lime transition-colors flex items-center gap-2">
                                                {lesson.title}
                                                {(!isUnlocked && mIndex > 0) && <Lock size={12} className="text-gray-600" />}
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
                                        <div className={`p-3 rounded-xl transition-all ${isUnlocked ? 'bg-white/5 text-gray-700 group-hover:text-btraffic-lime group-hover:bg-btraffic-lime/10' : 'bg-white/5 text-gray-600'}`}>
                                            {isUnlocked ? <PlayCircle size={24} /> : <Lock size={18} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-btraffic-lime to-transparent opacity-50" />

                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                    <Lock size={32} className="text-btraffic-lime" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                                        Acceso Restringido
                                    </h3>
                                    <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-[280px] mx-auto">
                                        Ingresa tu código de acceso global para desbloquear todo el contenido del ecosistema de formación.
                                    </p>
                                </div>

                                <form onSubmit={handleUnlock} className="w-full space-y-4">
                                    <div className="space-y-2">
                                        <input
                                            type="password"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value)}
                                            placeholder="Ingresa el código..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-white placeholder:text-gray-600 focus:outline-none focus:border-btraffic-lime/50 transition-all font-mono text-lg tracking-widest"
                                            autoFocus
                                        />
                                        {errorMsg && (
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                                                {errorMsg}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setShowPasswordModal(false); setErrorMsg(''); }}
                                            className="flex-1 py-4 rounded-xl bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] py-4 rounded-xl bg-btraffic-lime text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-btraffic-lime/20 flex items-center justify-center gap-2"
                                        >
                                            <Unlock size={14} /> Desbloquear
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
