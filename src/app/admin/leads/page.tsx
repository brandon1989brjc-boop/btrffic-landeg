'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Zap,
    Search,
    Filter,
    ExternalLink,
    MessageCircle,
    Mail,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    LayoutDashboard,
    Database,
    ShieldCheck
} from 'lucide-react';

// Tipado de Lead basado en nuestra orquestación
interface LeadAsset {
    id: string;
    created_at: string;
    name: string;
    email: string;
    web: string;
    role: string;
    pain: string;
    revenue: string;
    score: number;
    is_qualified: boolean;
    analysis: string;
    status: 'new' | 'contacted' | 'negotiating' | 'closed' | 'rejected';
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<LeadAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<LeadAsset | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Simulación de datos si no hay Supabase configurado aún
    useEffect(() => {
        const fetchLeads = async () => {
            // Aquí iría la llamada real a Supabase
            // const { data } = await supabase.from('leads_btraffic').select('*').order('created_at', { ascending: false });

            // DEMO DATA para visualización inmediata
            const demoLeads: LeadAsset[] = [
                {
                    id: '1',
                    created_at: new Date().toISOString(),
                    name: 'Carlos Méndez',
                    email: 'carlos@techcorp.com',
                    web: 'techcorp.com',
                    role: 'CEO/Founder',
                    pain: 'Operación dependiente de mí',
                    revenue: '+$10k USD/mes',
                    score: 85,
                    is_qualified: true,
                    status: 'new',
                    analysis: '## DIAGNÓSTICO TÉCNICO\nLa web presenta fugas críticas en el tracking de eventos.\n\n## FUGAS DETECTADAS\n- No se detectó Píxel de Meta.\n- Tiempo de carga superior a 3s.\n\n## ESTRATEGIA\nImplementar B-OS para automatizar el cierre de ventas.'
                },
                {
                    id: '2',
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    name: 'Laura Sanz',
                    email: 'laura@ecommerce.es',
                    web: 'laurasanz.es',
                    role: 'Director',
                    pain: 'Cierre de ventas manual',
                    revenue: 'Menos de $10k',
                    score: 45,
                    is_qualified: false,
                    status: 'contacted',
                    analysis: 'El activo actual es un GASTO. Requiere fase de cimentación urgente.'
                }
            ];

            setLeads(demoLeads);
            setLoading(false);
        };

        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.web.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            {/* Header Estratégico */}
            <header className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-btraffic-lime text-[10px] font-black uppercase tracking-[0.4em]">
                        <ShieldCheck size={14} />
                        Centro de Mando de Activos
                    </div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                        Pipeline de <span className="text-secondary-lime">Leads</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Leads</div>
                        <div className="text-2xl font-black">{leads.length}</div>
                    </div>
                    <div className="bg-btraffic-lime/10 border border-btraffic-lime/20 rounded-2xl px-6 py-3 text-center">
                        <div className="text-[10px] text-btraffic-lime font-bold uppercase tracking-widest mb-1">Cualificados</div>
                        <div className="text-2xl font-black text-btraffic-lime">{leads.filter(l => l.is_qualified).length}</div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Listado de Leads */}
                <div className={`${selectedLead ? 'hidden lg:block' : 'block'} lg:col-span-8 space-y-4`}>
                    {/* Barra de Búsqueda */}
                    <div className="relative group mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-btraffic-lime transition-all" size={20} />
                        <input
                            placeholder="Buscar por nombre, email o web..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-btraffic-lime outline-none transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        {filteredLeads.map((lead) => (
                            <motion.div
                                key={lead.id}
                                layoutId={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`group relative p-6 rounded-3xl border transition-all cursor-pointer overflow-hidden ${selectedLead?.id === lead.id
                                    ? 'bg-btraffic-lime/5 border-btraffic-lime/40'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${lead.is_qualified ? 'bg-btraffic-lime text-black' : 'bg-gray-800 text-gray-400'
                                            }`}>
                                            {lead.score}
                                        </div>
                                        <div>
                                            <h3 className="font-black uppercase tracking-tight text-lg leading-tight group-hover:text-btraffic-lime transition-colors">
                                                {lead.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <span className="font-bold text-gray-400">{lead.role}</span>
                                                <span>•</span>
                                                <span className="italic">{lead.web}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Cualificación</div>
                                            <div className={`text-xs font-black uppercase ${lead.is_qualified ? 'text-btraffic-lime' : 'text-btraffic-blue'}`}>
                                                {lead.is_qualified ? 'Candidato Positivo' : 'Cimentación'}
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-700 group-hover:text-btraffic-lime transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detalle del Lead (Sherlock Deep Dive) */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-8"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-btraffic-lime/10 rounded-2xl">
                                        <Users className="text-btraffic-lime" size={24} />
                                    </div>
                                    <div className="px-3 py-1 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-500">
                                        ID: {selectedLead.id.slice(0, 8)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedLead.name}</h2>
                                        <p className="text-btraffic-lime font-bold text-sm tracking-widest">{selectedLead.role} en {selectedLead.web}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <a href={`mailto:${selectedLead.email}`} className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 flex items-center justify-center gap-2 transition-all group">
                                            <Mail size={16} className="text-gray-500 group-hover:text-white" />
                                        </a>
                                        <a href={`https://wa.me/34661139454?text=Hola%20${selectedLead.name}`} target="_blank" className="flex-1 bg-btraffic-lime/10 hover:bg-btraffic-lime/20 p-3 rounded-xl border border-btraffic-lime/10 flex items-center justify-center gap-2 transition-all group">
                                            <MessageCircle size={16} className="text-btraffic-lime group-hover:scale-110" />
                                        </a>
                                        <a href={`https://${selectedLead.web}`} target="_blank" className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 flex items-center justify-center gap-2 transition-all group">
                                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-white/5">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            <Zap size={12} className="text-btraffic-lime" />
                                            Análisis Forense Sherlock
                                        </div>
                                        <div className="bg-black/40 rounded-3xl p-6 border border-white/5 text-sm prose prose-invert max-h-96 overflow-y-auto font-medium text-gray-400 leading-relaxed">
                                            {selectedLead.analysis}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">KPI Revenue</div>
                                            <div className="text-xs font-bold text-white">{selectedLead.revenue}</div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Dolor Principal</div>
                                            <div className="text-xs font-bold text-white">{selectedLead.pain}</div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-2xl border border-btraffic-lime text-btraffic-lime font-black uppercase tracking-widest text-xs hover:bg-btraffic-lime hover:text-black transition-all">
                                    Mover a "Cierre en Proceso"
                                </button>
                            </motion.div>
                        ) : (
                            <div className="h-[600px] border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-30">
                                <Users size={48} />
                                <div className="space-y-1">
                                    <p className="font-black uppercase tracking-widest text-xs">Sin selección</p>
                                    <p className="text-xs">Selecciona un lead para ver el análisis profundo</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
