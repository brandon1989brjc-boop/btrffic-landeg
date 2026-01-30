
'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Settings,
    CreditCard,
    Bell,
    Shield,
    LogOut,
    ExternalLink,
    Terminal,
    Key,
    Plus,
    Users
} from 'lucide-react';

const connections = [
    { name: 'Notion Workspace', status: 'Sincronizado', lastSync: 'Hace 2 min', icon: 'N' },
    { name: 'n8n Webhook', status: 'Activo', lastSync: 'En tiempo real', icon: <Terminal size={14} className="text-btraffic-lime" /> },
    { name: 'Google Drive', status: 'Autorizado', lastSync: 'Hace 1h', icon: <ExternalLink size={14} /> },
];

export default function AccountPanel() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase">Configuración de <span className="text-btraffic-lime">Estratega</span></h1>
                <p className="text-gray-400 text-sm font-medium mt-2">Gestiona tu identidad, conexiones y privilegios dentro del ecosistema.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Menu */}
                <aside className="lg:col-span-3 space-y-2">
                    {[
                        { name: 'Perfil Público', icon: Users },
                        { name: 'Dashboard Académico', icon: LayoutDashboard },
                        { name: 'Facturación & Premium', icon: CreditCard },
                        { name: 'Notificaciones', icon: Bell },
                        { name: 'Conexiones API', icon: Key },
                        { name: 'Seguridad', icon: Shield },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${i === 4 ? 'bg-btraffic-lime text-black shadow-xl shadow-btraffic-lime/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </button>
                    ))}
                    <div className="pt-8">
                        <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
                            <LogOut size={18} /> Cerrar Sesión
                        </button>
                    </div>
                </aside>

                {/* Right: Content (Active: Conexiones API) */}
                <main className="lg:col-span-9 space-y-10">
                    {/* API Connections Section */}
                    <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8 shadow-2xl">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Conexiones de Infraestructura</h2>
                            <p className="text-sm text-gray-400">Vincula tus herramientas profesionales para habilitar la automatización de auditorías y la recepción de leads.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {connections.map((conn, i) => (
                                <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center gap-4 hover:border-white/10 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-gray-400 group-hover:text-btraffic-lime transition-colors">
                                        {conn.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{conn.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{conn.status} • {conn.lastSync}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-btraffic-lime shadow-[0_0_8px_rgba(162,255,0,0.5)]"></div>
                                </div>
                            ))}
                            <button className="p-6 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:border-btraffic-lime/30 hover:text-btraffic-lime transition-all">
                                <Plus size={16} /> Añadir Nueva Integración
                            </button>
                        </div>
                    </section>

                    {/* API Key Management */}
                    <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8 shadow-2xl">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-btraffic-blue">Credenciales de Acceso</h2>
                            <p className="text-sm text-gray-400">Estas claves permiten que tu Agente Btraffic se comunique con tu CRM personal.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Master Academy Key</span>
                                    <span className="text-[10px] font-bold text-red-500 uppercase">Privada</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value="bt_live_a1b2c3d4e5f6g7h8i9j0"
                                        readOnly
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-gray-400 focus:outline-none"
                                    />
                                    <button className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Copiar</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
