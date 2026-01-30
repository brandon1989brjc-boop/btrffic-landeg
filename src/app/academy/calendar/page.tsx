
'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, Users, ExternalLink } from 'lucide-react';

const events = [
    {
        id: 1,
        title: 'Workshop: Estrategia de Auditoría Forense',
        type: 'MASTERCLASS',
        date: '31 Ene',
        time: '18:00h - 19:30h',
        host: 'Brandon Btraffic',
        link: '#',
        active: true
    },
    {
        id: 2,
        title: 'Q&A: Automatizaciones n8n y Agentes',
        type: 'SOPORTE EN VIVO',
        date: '02 Feb',
        time: '17:00h - 18:00h',
        host: 'Equipo Técnico',
        link: '#',
        active: false
    },
    {
        id: 3,
        title: 'Cierre masivo: Revisión de propuestas ROI',
        type: 'VENTAS',
        date: '05 Feb',
        time: '10:00h - 11:30h',
        host: 'Brandon Btraffic',
        link: '#',
        active: false
    }
];

export default function CalendarPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Calendario de <span className="text-btraffic-blue">Operaciones</span></h1>
                    <p className="text-gray-400 text-sm font-medium mt-2">Sincroniza tus ataques. Aquí se coordinan las sesiones en vivo del ecosistema.</p>
                </div>
                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-btraffic-blue transition-all flex items-center gap-2">
                    <CalendarIcon size={14} /> Sincronizar con Google Calendar
                </button>
            </div>

            {/* Event List */}
            <div className="space-y-4">
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`group relative p-8 rounded-[32px] border ${event.active ? 'bg-gradient-to-r from-btraffic-blue/10 to-transparent border-btraffic-blue/30 shadow-2xl shadow-btraffic-blue/10' : 'bg-btraffic-gray/20 border-white/5 opacity-80'} hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center gap-8`}
                    >
                        {/* Date badge */}
                        <div className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center border ${event.active ? 'bg-btraffic-blue text-black border-btraffic-blue shadow-lg shadow-btraffic-blue/40' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                            <span className="text-2xl font-black tracking-tighter">{event.date.split(' ')[0]}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${event.active ? 'border-btraffic-blue text-btraffic-blue' : 'border-gray-700 text-gray-500'}`}>
                                    {event.type}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                                    <Clock size={12} /> {event.time}
                                </div>
                            </div>
                            <h3 className={`text-xl font-black uppercase tracking-tighter ${event.active ? 'text-white' : 'text-gray-400'}`}>
                                {event.title}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <Users size={14} /> {event.host}
                                </div>
                                {event.active && (
                                    <div className="flex items-center gap-2 text-xs font-black text-btraffic-lime animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-btraffic-lime"></div> EN VIVO PRÓXIMAMENTE
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action */}
                        <div>
                            {event.active ? (
                                <button className="w-full md:w-auto px-8 py-4 bg-btraffic-blue text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-btraffic-blue/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                    Unirse al Zoom <ExternalLink size={14} />
                                </button>
                            ) : (
                                <button className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 cursor-not-allowed">
                                    Reservar Sitio
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Note */}
            <div className="p-8 bg-btraffic-gray/10 border border-white/5 rounded-[32px] text-center italic text-gray-500 text-sm">
                "El tiempo es el único dato que no se puede recuperar. Optimización total."
            </div>
        </div>
    );
}
