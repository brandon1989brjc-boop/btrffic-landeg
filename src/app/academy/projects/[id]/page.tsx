'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ShieldCheck,
    Target,
    TrendingUp,
    Cpu,
    FileSearch,
    Layout,
    Rocket,
    Clock,
    Zap,
    CheckCircle2,
    Download,
    Play,
    Pause,
    Save,
    ExternalLink,
    Database,
    Binary,
    Server,
    CheckCircle,
    FileText,
    Video
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { BTRAFFIC_WORKFLOW_TEMPLATE, BtrafficPhase, BtrafficTask, TaskStatus } from '../workflow-logic';

export default function ProjectOrchestrationPage() {
    const params = useParams();
    const id = params.id as string;

    // State management for the Smart System
    const [phases, setPhases] = useState<BtrafficPhase[]>(BTRAFFIC_WORKFLOW_TEMPLATE);
    const [activePhaseId, setActivePhaseId] = useState('diagnosis');
    const [runningTaskId, setRunningTaskId] = useState<string | null>(null);
    const [elapsedTimes, setElapsedTimes] = useState<Record<string, number>>({});
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Mock Project Info
    const projectInfo = {
        name: id === '1' ? 'Ecosistema Munay Kids' : 'Nuevo Activo Digital',
        client: id === '1' ? 'Munay Kids' : 'Cliente Btraffic',
        status: 'En Construcción',
        protocol: 'Protocolo C (Optimización)'
    };

    // Load state from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`btraffic_proj_${id}`);
        if (saved) {
            const { phases: savedPhases, times: savedTimes } = JSON.parse(saved);
            setPhases(savedPhases);
            setElapsedTimes(savedTimes);
        }
    }, [id]);

    // Save state whenever it changes
    const saveState = (updatedPhases: BtrafficPhase[], updatedTimes: Record<string, number>) => {
        localStorage.setItem(`btraffic_proj_${id}`, JSON.stringify({
            phases: updatedPhases,
            times: updatedTimes
        }));
    };

    // Timer Logic
    useEffect(() => {
        if (runningTaskId) {
            timerRef.current = setInterval(() => {
                setElapsedTimes(prev => {
                    const newTimes = {
                        ...prev,
                        [runningTaskId]: (prev[runningTaskId] || 0) + 1
                    };
                    return newTimes;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [runningTaskId]);

    // Task Actions
    const toggleTask = (phaseId: string, taskId: string) => {
        const newPhases = phases.map(p => {
            if (p.id !== phaseId) return p;
            return {
                ...p,
                tasks: p.tasks.map(t => {
                    if (t.id !== taskId) return t;
                    const newStatus: TaskStatus = t.status === 'completed' ? 'pending' : 'completed';
                    if (newStatus === 'completed' && runningTaskId === taskId) {
                        setRunningTaskId(null);
                    }
                    return { ...t, status: newStatus };
                })
            };
        });
        setPhases(newPhases);
        saveState(newPhases, elapsedTimes);
    };

    const toggleTimer = (taskId: string) => {
        if (runningTaskId === taskId) {
            setRunningTaskId(null);
            saveState(phases, elapsedTimes);
        } else {
            setRunningTaskId(taskId);
        }
    };

    // Calculations
    const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedTasks = phases.reduce((acc, p) => acc + p.tasks.filter(t => t.status === 'completed').length, 0);
    const progress = Math.round((completedTasks / totalTasks) * 100);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
    };

    const activePhase = phases.find(p => p.id === activePhaseId)!;

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-32 font-['Outfit']">
            {/* Navigation Header */}
            <div className="flex items-center justify-between">
                <Link href="/academy/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-btraffic-lime transition-all">
                    <ChevronLeft size={16} /> Volver al Mando
                </Link>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Progreso Sistema</p>
                        <p className="text-sm font-black text-btraffic-lime">{progress}%</p>
                    </div>
                    <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-btraffic-lime shadow-[0_0_10px_rgba(162,255,0,0.5)]" />
                    </div>
                </div>
            </div>

            {/* Project Hero */}
            <header className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <ShieldCheck size={200} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-btraffic-lime text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                                {projectInfo.status}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                ID: {id.toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter italic premium-gradient-text">
                            {projectInfo.name}
                        </h1>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Cliente: <span className="text-white">{projectInfo.client}</span> • {projectInfo.protocol}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center min-w-[140px]">
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Métrica Norte</p>
                            <p className="text-xl font-black text-btraffic-blue italic">VENTAS IA</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-btraffic-lime/5 border border-btraffic-lime/10 text-center min-w-[140px]">
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Tiempo Total</p>
                            <p className="text-xl font-black text-white">
                                {formatTime(Object.values(elapsedTimes).reduce((a, b) => a + b, 0))}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Smart Orchestration Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                {/* Phase Navigator Sidebar */}
                <aside className="space-y-3">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 mb-4">Pipeline Btraffic</p>
                    {phases.map((phase) => {
                        const isCompleted = phase.tasks.every(t => t.status === 'completed');
                        const isActive = activePhaseId === phase.id;
                        const completedInPhase = phase.tasks.filter(t => t.status === 'completed').length;

                        return (
                            <button
                                key={phase.id}
                                onClick={() => setActivePhaseId(phase.id)}
                                className={`w-full p-5 rounded-[24px] border transition-all flex items-center justify-between group ${isActive ? 'bg-btraffic-lime text-black border-btraffic-lime shadow-xl shadow-btraffic-lime/10' : 'bg-white/2 border-white/5 text-gray-500 hover:border-white/20'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                        <span className="text-xs font-black">{phase.order}</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-tight text-left">
                                        {phase.name.split(': ')[1]}
                                    </span>
                                </div>
                                {isCompleted ? (
                                    <CheckCircle size={14} className={isActive ? 'text-black' : 'text-btraffic-lime'} />
                                ) : (
                                    <span className="text-[8px] font-bold opacity-60 italic">{completedInPhase}/{phase.tasks.length}</span>
                                )}
                            </button>
                        );
                    })}
                </aside>

                {/* Task Execution Area */}
                <main className="lg:col-span-3 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePhaseId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Phase Header */}
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                    {activePhase.name.split(': ')[1]}
                                </h2>
                            </div>

                            {/* Task List */}
                            <div className="grid grid-cols-1 gap-4">
                                {activePhase.tasks.map((task) => {
                                    const isRunning = runningTaskId === task.id;
                                    const isDone = task.status === 'completed';
                                    const time = elapsedTimes[task.id] || 0;

                                    return (
                                        <div
                                            key={task.id}
                                            className={`group p-8 rounded-[32px] border transition-all ${isDone ? 'bg-btraffic-lime/[0.03] border-btraffic-lime/20' : isRunning ? 'bg-white/5 border-btraffic-blue/30' : 'bg-white/2 border-white/5 hover:border-white/10'}`}
                                        >
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                                <div className="flex gap-6 items-start flex-1">
                                                    {/* Toggle Checkbox */}
                                                    <button
                                                        onClick={() => toggleTask(activePhaseId, task.id)}
                                                        className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all shrink-0 mt-1 ${isDone ? 'bg-btraffic-lime border-btraffic-lime text-black shadow-lg shadow-btraffic-lime/20' : 'border-white/10 hover:border-btraffic-lime/50 text-transparent'}`}
                                                    >
                                                        <CheckCircle2 size={18} />
                                                    </button>

                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className={`text-lg font-black uppercase tracking-tight transition-all ${isDone ? 'text-gray-400 line-through' : 'text-white'}`}>
                                                                {task.label}
                                                            </h3>
                                                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-black text-gray-500 uppercase tracking-widest">
                                                                EST: {task.estimatedTime}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 font-medium max-w-xl leading-relaxed">
                                                            {task.description}
                                                        </p>
                                                        {/* Materials / Templates Section */}
                                                        {task.materials && task.materials.length > 0 && (
                                                            <div className="mt-4 flex flex-wrap gap-2">
                                                                {task.materials.map((mat, mIdx) => (
                                                                    <button
                                                                        key={mIdx}
                                                                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-btraffic-lime/50 transition-all"
                                                                    >
                                                                        {mat.type === 'doc' ? <FileText size={10} /> : mat.type === 'video' ? <Video size={10} /> : <ExternalLink size={10} />}
                                                                        {mat.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions & Tracking */}
                                                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                                    {/* Time Tracker */}
                                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${isRunning ? 'bg-btraffic-blue/10 border-btraffic-blue/30 text-btraffic-blue' : 'bg-black/20 border-white/5 text-gray-500'}`}>
                                                        <Clock size={16} className={isRunning ? 'animate-pulse' : ''} />
                                                        <span className="text-xs font-black font-mono w-16 text-center">
                                                            {formatTime(time)}
                                                        </span>
                                                        <button
                                                            disabled={isDone}
                                                            onClick={(e) => { e.stopPropagation(); toggleTimer(task.id); }}
                                                            className={`p-1.5 rounded-lg transition-all ${isRunning ? 'bg-btraffic-blue text-white' : 'hover:bg-white/10 text-gray-400'}`}
                                                        >
                                                            {isRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                                        </button>
                                                    </div>

                                                    {/* Template Link */}
                                                    {task.templateUrl && (
                                                        <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-btraffic-lime hover:bg-white/10 transition-all">
                                                            <Download size={14} /> Plantilla
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Sub-Details (Optional Output/Notes Area) */}
                                            {isRunning && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-6 pt-6 border-t border-white/5"
                                                >
                                                    <div className="bg-black/40 rounded-2xl p-6 space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[9px] font-black text-btraffic-blue uppercase tracking-widest flex items-center gap-2">
                                                                <Binary size={12} /> Procesando Lógica de Ejecución
                                                            </span>
                                                            <button className="text-[9px] font-bold text-gray-600 hover:text-white transition-colors">Guardar Borrador</button>
                                                        </div>
                                                        <textarea
                                                            placeholder="Añade notas de progreso, links a documentos generados o credenciales temporales..."
                                                            className="w-full bg-transparent border-none focus:ring-0 text-gray-300 text-xs font-medium resize-none min-h-[80px]"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Phase Navigation Prompt */}
                            {
                                activePhase.tasks.every(t => t.status === 'completed') && (
                                    <div className="p-8 rounded-[32px] bg-btraffic-lime/10 border border-btraffic-lime/20 text-center space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-btraffic-lime">Fase Completada con Éxito</p>
                                        <button
                                            onClick={() => {
                                                const next = phases.find(p => p.order === activePhase.order + 1);
                                                if (next) setActivePhaseId(next.id);
                                            }}
                                            className="px-8 py-4 bg-btraffic-lime text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                                        >
                                            Saltar a Siguiente Fase
                                        </button>
                                    </div>
                                )
                            }
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Bottom System Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4">
                <div className="bg-btraffic-dark/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-6 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-btraffic-lime rounded-full animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Sistema Activo</span>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Time ROI:</span>
                            <span className="text-xs font-black text-white italic">OPTIMIZADO</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl">
                        <button
                            onClick={() => saveState(phases, elapsedTimes)}
                            className="flex items-center gap-2 px-8 py-3 bg-btraffic-lime text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-btraffic-lime/20"
                        >
                            Sincronizar Progreso <Save size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
