
'use client';

import { motion } from 'framer-motion';
import {
    MessageSquare,
    Heart,
    Share2,
    TrendingUp,
    Zap,
    Trophy,
    Plus,
    Filter,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

const feedPosts = [
    {
        id: 1,
        author: { name: 'Brandon Btraffic', role: 'Founder', avatar: 'BB' },
        time: '2h',
        category: 'ESTRATEGIA',
        title: 'El Gancho de Venta Diaria: ¿Por qué funciona?',
        content: 'Acabo de subir el nuevo guion a la sesión 09. La clave no es la persuasión, es la auditoría de fugas. Si hablas de "webs", pierdes. Si hablas de "activos que facturan mientras duermes", ganas.',
        likes: 42,
        comments: 12,
        isPinned: true
    },
    {
        id: 2,
        author: { name: 'Estratega Junior', role: 'Socio', avatar: 'SJ' },
        time: '5h',
        category: 'WINS',
        title: '¡Primer cliente cerrado usando el Auditor Junior!',
        content: 'No me lo creo. Apliqué el framework de la sesión 10 en una llamada de 15 minutos. El cliente vio las fugas de datos y no puso objeción al precio. ¡Btraffic funciona!',
        likes: 128,
        comments: 45,
        isPinned: false
    },
    {
        id: 3,
        author: { name: 'Ingeniero Forense', role: 'Socio Técnico', avatar: 'IF' },
        time: '8h',
        category: 'TÉCNICO',
        title: 'Optimización de n8n para flujos de Real Estate',
        content: 'He encontrado una forma de reducir la carga de la API de Google en un 40% usando lógica de filtrado directo en el webhook. Lo subiré a la zona premium pronto.',
        likes: 34,
        comments: 8,
        isPinned: false
    }
];

const categories = [
    { name: 'Todos los temas', icon: MessageSquare },
    { name: 'Anuncios', icon: Zap },
    { name: 'Estrategia', icon: TrendingUp },
    { name: 'Soporte Técnico', icon: Plus },
    { name: 'Casos de Éxito', icon: Trophy },
];

export default function CommunityPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Left: Categories */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6">
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Categorías</h3>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-btraffic-lime transition-all text-left group"
                            >
                                <cat.icon size={18} className="group-hover:text-btraffic-lime" />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Estratega del Mes</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-btraffic-lime to-btraffic-blue border border-white/20"></div>
                        <div>
                            <p className="text-sm font-black">Alex Rivera</p>
                            <p className="text-[10px] text-btraffic-blue font-bold uppercase tracking-widest">Nivel 4: Arquitecto</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Feed: Posts */}
            <main className="lg:col-span-6 space-y-6">
                {/* Create Post Input */}
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-4 flex gap-4 items-center shadow-xl shadow-black/20">
                    <div className="w-10 h-10 rounded-full bg-btraffic-lime/20 flex items-center justify-center text-xs font-black text-btraffic-lime">ME</div>
                    <input
                        type="text"
                        placeholder="Comparte una estrategia o un win de hoy..."
                        className="flex-1 bg-white/5 border border-white/5 rounded-2xl py-3 px-6 text-sm focus:outline-none focus:border-btraffic-lime/50 transition-all"
                    />
                    <button className="bg-btraffic-lime text-black p-3 rounded-2xl hover:scale-105 transition-transform">
                        <Plus size={20} />
                    </button>
                </div>

                {/* Filter Header */}
                <div className="flex items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span className="flex items-center gap-2"><Filter size={12} /> Posts Recientes</span>
                    <button className="hover:text-white transition-colors">Ver todos</button>
                </div>

                {/* Feed Items */}
                <div className="space-y-4">
                    {feedPosts.map((post) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all relative group"
                        >
                            {post.isPinned && (
                                <div className="absolute top-6 right-6 text-btraffic-lime">
                                    <Zap size={16} fill="currentColor" />
                                </div>
                            )}

                            {/* Author & Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-gray-400">
                                    {post.author.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black">{post.author.name}</h4>
                                        <span className="text-[9px] bg-btraffic-blue/10 text-btraffic-blue px-1.5 py-0.5 rounded font-black uppercase tracking-widest border border-btraffic-blue/20">
                                            {post.author.role}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.time} • {post.category}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-black tracking-tight group-hover:text-btraffic-lime transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    {post.content}
                                </p>
                            </div>

                            {/* Actions & Stats */}
                            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-btraffic-lime transition-colors">
                                    <Heart size={18} /> {post.likes}
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-btraffic-blue transition-colors">
                                    <MessageSquare size={18} /> {post.comments}
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors ml-auto">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            {/* Sidebar Right: Updates & Trends */}
            <aside className="hidden xl:block xl:col-span-3 space-y-6">
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                        <Zap size={14} className="text-btraffic-lime" />
                        Próximas Sesiones
                    </h3>
                    <div className="space-y-4">
                        <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-btraffic-lime before:rounded-full before:shadow-[0_0_8px_rgba(162,255,0,0.5)]">
                            <p className="text-xs font-bold">Lanzamiento del Módulo 5</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Mañana, 18:00h</p>
                        </div>
                        <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-gray-700 before:rounded-full">
                            <p className="text-xs font-bold text-gray-400">Workshop: n8n Forense</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">02 de Febrero</p>
                        </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        Ver Calendario
                    </button>
                </div>

                <div className="bg-btraffic-gray/30 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Trending en la Red</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-gray-400">#GraphRAG</span>
                            <span className="text-btraffic-blue">12 posts</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-gray-400">#ROI_93_PORCIENTO</span>
                            <span className="text-btraffic-lime">45 posts</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-gray-400">#VentaDiaria</span>
                            <span className="text-btraffic-purple">30 posts</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
