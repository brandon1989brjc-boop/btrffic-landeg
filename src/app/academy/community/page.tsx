
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Heart,
    Share2,
    TrendingUp,
    Zap,
    Trophy,
    Plus,
    Filter,
    Calendar,
    Target
} from 'lucide-react';

const feedPosts = [
    {
        id: 1,
        author: { name: 'Brandon Btraffic', role: 'FOUNDER', avatar: 'BB', color: 'bg-btraffic-dark' },
        time: '2H',
        category: 'ESTRATEGIA',
        title: 'El Gancho de Venta Diaria: ¿Por qué funciona?',
        content: 'Acabo de subir el nuevo guion a la sesión 09. La clave no es la persuasión, es la auditoría de fugas. Si hablas de "webs", pierdes. Si hablas de "activos que facturan mientras duermes", ganas.',
        likes: 42,
        comments: 12,
        isPinned: true
    },
    {
        id: 2,
        author: { name: 'Estratega Junior', role: 'SOCIO', avatar: 'SJ', color: 'bg-btraffic-lime/20' },
        time: '5H',
        category: 'WINS',
        title: '¡Primer cliente cerrado usando el Auditor Junior!',
        content: 'No me lo creo. Apliqué el framework de la sesión 10 en una llamada de 15 minutos. El cliente vio las fugas de datos y no puso objeción al precio. ¡Btraffic funciona!',
        likes: 128,
        comments: 45,
        isPinned: false
    },
    {
        id: 3,
        author: { name: 'Ingeniero Forense', role: 'SOCIO TÉCNICO', avatar: 'IF', color: 'bg-btraffic-blue/10' },
        time: '8H',
        category: 'SOPORTE TÉCNICO',
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
    const [activeCategory, setActiveCategory] = useState('Todos los temas');

    const filteredPosts = activeCategory === 'Todos los temas'
        ? feedPosts
        : feedPosts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase() || (activeCategory === 'Soporte Técnico' && p.category === 'SOPORTE TÉCNICO'));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Left: Categories */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6">
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 px-4">Categorías</h3>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-left group ${activeCategory === cat.name ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                            >
                                <cat.icon size={18} className={activeCategory === cat.name ? 'text-btraffic-lime' : 'group-hover:text-btraffic-lime'} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-8 text-center space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Estratega del Mes</h3>
                    <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-btraffic-lime to-btraffic-blue p-1">
                        <div className="w-full h-full rounded-full bg-btraffic-dark flex items-center justify-center font-black text-xl">AR</div>
                    </div>
                    <div>
                        <p className="text-sm font-black text-white">Alex Rivera</p>
                        <p className="text-[8px] text-btraffic-blue font-black uppercase tracking-widest mt-1">Nivel 4: Arquitecto</p>
                    </div>
                </div>
            </aside>

            {/* Main Feed: Posts */}
            <main className="lg:col-span-6 space-y-6">
                {/* Create Post Input */}
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-4 flex gap-4 items-center shadow-2xl">
                    <div className="w-12 h-12 rounded-full bg-btraffic-lime/10 flex items-center justify-center text-[10px] font-black text-btraffic-lime border border-btraffic-lime/20">ME</div>
                    <input
                        type="text"
                        placeholder="Comparte una estrategia o un win de hoy..."
                        className="flex-1 bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs font-bold focus:outline-none focus:border-btraffic-lime/30 transition-all placeholder:text-gray-600"
                    />
                    <button className="bg-btraffic-lime text-black p-3.5 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-btraffic-lime/20">
                        <Plus size={22} strokeWidth={3} />
                    </button>
                </div>

                {/* Filter Header */}
                <div className="flex items-center justify-between px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <span className="flex items-center gap-2 italic opacity-60"><Filter size={12} /> Posts Recientes</span>
                    <button className="hover:text-white transition-colors">Ver todos</button>
                </div>

                {/* Feed Items */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <motion.article
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-8 hover:border-white/10 transition-all relative group shadow-xl"
                            >
                                {post.isPinned && (
                                    <div className="absolute top-8 right-8 text-btraffic-lime">
                                        <Zap size={18} fill="currentColor" strokeWidth={1} className="animate-pulse" />
                                    </div>
                                )}

                                {/* Author & Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-full ${post.author.color} border border-white/5 flex items-center justify-center font-black text-xs text-gray-300 shadow-inner`}>
                                        {post.author.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-black whitespace-nowrap">{post.author.name}</h4>
                                            <span className="text-[7px] bg-btraffic-blue/10 text-btraffic-blue px-2 py-0.5 rounded font-black uppercase tracking-widest border border-btraffic-blue/20">
                                                {post.author.role}
                                            </span>
                                        </div>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-0.5">{post.time} • {post.category}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black tracking-tighter uppercase group-hover:text-btraffic-lime transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                        {post.content}
                                    </p>
                                </div>

                                {/* Actions & Stats */}
                                <div className="flex items-center gap-8 mt-8 pt-6 border-t border-white/5">
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-btraffic-lime transition-all">
                                        <Heart size={18} className="group-hover:scale-110 transition-transform" /> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-btraffic-blue transition-all">
                                        <MessageSquare size={18} /> {post.comments}
                                    </button>
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all ml-auto">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Sidebar Right: Updates & Trends */}
            <aside className="hidden xl:block xl:col-span-3 space-y-6">
                <div className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-8 space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                        <Calendar size={14} className="text-btraffic-lime" />
                        Próximas Sesiones
                    </h3>
                    <div className="space-y-6">
                        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:bg-btraffic-lime before:rounded-full before:shadow-[0_0_10px_rgba(162,255,0,0.6)]">
                            <p className="text-xs font-black uppercase tracking-tight">Lanzamiento Módulo 5</p>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Mañana, 18:00h</p>
                        </div>
                        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:bg-white/10 before:rounded-full">
                            <p className="text-xs font-black uppercase tracking-tight text-gray-500">Workshop: n8n Forense</p>
                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">02 de Febrero</p>
                        </div>
                    </div>
                    <button className="w-full py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                        Ver Calendario
                    </button>
                </div>

                <div className="bg-btraffic-gray/30 border border-white/5 rounded-[32px] p-8 space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                        <Target size={14} className="text-btraffic-blue" />
                        Trending en la Red
                    </h3>
                    <div className="space-y-4">
                        {[
                            { tag: '#GraphRAG', count: '12 posts', color: 'text-btraffic-blue' },
                            { tag: '#ROI_93_PORCIENTO', count: '45 posts', color: 'text-btraffic-lime' },
                            { tag: '#VentaDiaria', count: '30 posts', color: 'text-btraffic-purple' },
                        ].map((trend) => (
                            <div key={trend.tag} className="flex justify-between items-center group cursor-pointer">
                                <span className="text-[11px] font-black text-gray-500 group-hover:text-white transition-colors">{trend.tag}</span>
                                <span className={`text-[9px] font-black uppercase tracking-tighter ${trend.color}`}>{trend.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}
