'use client';

import { motion } from 'framer-motion';
import {
    Activity,
    Plus,
    Search,
    Layout,
    Zap,
    Target,
    TrendingUp,
    ChevronRight,
    History,
    ShieldCheck,
    Cpu,
    BarChart3,
    FileSearch,
    Rocket
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Methodology Types from NotebookLM Knowledge
type Phase = 'Discovery' | 'Blueprint' | 'Production';
type Protocol = 'Protocolo A (Arranque)' | 'Protocolo B (Limpieza)' | 'Protocolo C (Optimización)';

interface Project {
    id: string;
    name: string;
    client: string;
    phase: Phase;
    protocol: Protocol;
    northStar: string;
    progress: number;
    hoursSaved?: number;
    roi?: string;
    updatedAt: string;
}

const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Ecosistema Munay Kids',
        client: 'Munay Kids',
        phase: 'Production',
        protocol: 'Protocolo C (Optimización)',
        northStar: 'Ventas atribuidas IA',
        progress: 100,
        hoursSaved: 42,
        roi: '4.2x',
        updatedAt: 'Hace 2h'
    },
    {
        id: '2',
        name: 'Transformación Digital Logística',
        client: 'GoLogistics',
        phase: 'Blueprint',
        protocol: 'Protocolo B (Limpieza)',
        northStar: 'Tiempos de entrega',
        progress: 65,
        updatedAt: 'Hace 1 día'
    },
    {
        id: '3',
        name: 'Auditoría Forense Real Estate',
        client: 'Premium Living',
        phase: 'Discovery',
        protocol: 'Protocolo A (Arranque)',
        northStar: 'CPL (Coste por Lead)',
        progress: 20,
        updatedAt: 'Hace 3h'
    }
];

export default function MandoCentralPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const phaseStyles = {
        Discovery: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Blueprint: 'bg-btraffic-purple/10 text-btraffic-purple border-btraffic-purple/20',
        Production: 'bg-btraffic-lime/10 text-btraffic-lime border-btraffic-lime/20'
    };

    const phaseIcons = {
        Discovery: <FileSearch size={14} />,
        Blueprint: <Layout size={14} />,
        Production: <Rocket size={14} />
    };

    return (
        <div className="space-y-10 pb-20 font-['Outfit']">
            {/* Header / Command Info */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic premium-gradient-text">
                        Mando Central de <span className="text-btraffic-lime">Orquestación</span>
                    </h1>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
                        Metodología Btraffic OS: Sin dato no hay relato
                    </p>
                </div>

                <button className="flex items-center gap-2 px-6 py-4 bg-btraffic-lime text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-btraffic-lime/20 group">
                    <Plus size={16} /> <span className="group-hover:mr-1">Nuevo Activo</span>
                </button>
            </header>

            {/* Stats / ROI Forense */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Proyectos Activos', value: '12', icon: <Target className="text-primary" />, trend: '+2 este mes' },
                    { label: 'Agentes Online', value: '08', icon: <Cpu className="text-btraffic-purple" />, trend: '100% Eficiencia' },
                    { label: 'ROI Promedio', value: '4.2x', icon: <TrendingUp className="text-btraffic-blue" />, trend: 'Data Focused' },
                    { label: 'Horas Ahorradas', value: '142h', icon: <History className="text-green-400" />, trend: 'Trabajo Invisible' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[32px] bg-white/2 border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all">
                                {stat.icon}
                            </div>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar Ecosistema o Cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-btraffic-lime/30 focus:bg-white/10 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['Todos', 'Discovery', 'Blueprint', 'Production'].map(tab => (
                        <button key={tab} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockProjects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase())).map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative"
                    >
                        <Link href={`/academy/projects/${project.id}`}>
                            <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-btraffic-lime/30 transition-all cursor-pointer h-full flex flex-col shadow-2xl overflow-hidden group">
                                {/* Protocol Badge */}
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110">
                                    <ShieldCheck size={120} />
                                </div>

                                <div className="flex items-start justify-between mb-6">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${phaseStyles[project.phase]}`}>
                                        {phaseIcons[project.phase]}
                                        {project.phase}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{project.updatedAt}</span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <h3 className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-btraffic-lime transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs font-bold text-gray-500 italic">Cliente: {project.client}</p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {/* Methodology Details */}
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                                        <div className="flex justify-between items-center text-[9px]">
                                            <span className="text-gray-500 font-bold uppercase">Protocolo</span>
                                            <span className="text-white font-black uppercase">{project.protocol}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px]">
                                            <span className="text-gray-500 font-bold uppercase">Métrica Norte</span>
                                            <span className="text-btraffic-blue font-black uppercase">{project.northStar}</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                            <span className="text-gray-600">Avance Activo</span>
                                            <span className="text-white">{project.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                className={`h-full rounded-full ${project.progress === 100 ? 'bg-btraffic-lime shadow-[0_0_10px_rgba(162,255,0,0.5)]' : 'bg-btraffic-blue shadow-[0_0_10px_rgba(30,132,255,0.5)]'}`}
                                            />
                                        </div>
                                    </div>

                                    {/* ROI Forense (only if Production) */}
                                    {project.phase === 'Production' && (
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <div className="p-4 rounded-2xl bg-btraffic-lime/5 border border-btraffic-lime/10 text-center">
                                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">ROI Forense</p>
                                                <p className="text-lg font-black text-btraffic-lime">{project.roi}</p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-btraffic-blue/5 border border-btraffic-blue/10 text-center">
                                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Hrs Ahorradas</p>
                                                <p className="text-lg font-black text-btraffic-blue">{project.hoursSaved}h</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex items-center justify-between group-hover:translate-x-2 transition-all">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Orquestar Activo</span>
                                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-btraffic-lime group-hover:text-black transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
