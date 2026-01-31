'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    CreditCard,
    Bell,
    Shield,
    LogOut,
    ExternalLink,
    Terminal as N8nIcon,
    Key,
    Plus,
    Users,
    Smartphone,
    Globe,
    Mail,
    Lock,
    Eye,
    Activity,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Perfil Público');
    const [saveStatus, setSaveStatus] = useState<string | null>(null);
    const [academicStats, setAcademicStats] = useState({ progress: 0, completed: 0 });

    // Load real stats
    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('btraffic_completed_lessons') || '[]');
        setAcademicStats({
            progress: Math.round((completed.length / 20) * 100),
            completed: completed.length
        });
    }, [activeTab]);

    const handleAction = (label: string) => {
        setSaveStatus(label);
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const tabs = [
        { name: 'Perfil Público', icon: Users },
        { name: 'Dashboard Académico', icon: LayoutDashboard },
        { name: 'Facturación & Premium', icon: CreditCard },
        { name: 'Notificaciones', icon: Bell },
        { name: 'Conexiones API', icon: Key },
        { name: 'Seguridad', icon: Shield },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Perfil Público':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-btraffic-lime to-btraffic-blue p-1 transition-transform group-hover:scale-105">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-4xl overflow-hidden">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Btraffic" alt="Avatar" className="w-full h-full" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="text-white" />
                                    </div>
                                </div>
                                <div className="space-y-4 text-center md:text-left">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter">Estratega Junior</h2>
                                    <p className="text-btraffic-lime text-[10px] font-black uppercase tracking-[0.2em]">Nivel {Math.floor(academicStats.completed / 5) + 1}: Arquitecto en Formación</p>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <button onClick={() => handleAction('Avatar actualizado')} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all">Cambiar Avatar</button>
                                        <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all italic">Ver Perfil Público</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nombre de Usuario</label>
                                    <input type="text" defaultValue="estratega_junior" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-btraffic-lime/50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email de Operaciones</label>
                                    <input type="email" defaultValue="junior@btraffic.io" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-btraffic-lime/50 transition-all" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Biografía Táctica</label>
                                    <textarea rows={3} defaultValue="Especialista en flujos de datos y optimización forense. Miembro VIP del Ecosistema Btraffic." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-btraffic-lime/50 transition-all" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button onClick={() => handleAction('Perfil guardado')} className="px-10 py-4 bg-btraffic-lime text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-btraffic-lime/20 hover:scale-105 active:scale-95 transition-all">Guardar Cambios</button>
                            </div>
                        </section>
                    </motion.div>
                );
            case 'Conexiones API':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8 shadow-2xl">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Conexiones de Infraestructura</h2>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">Vincula tus herramientas profesionales para habilitar la automatización de auditorías y la recepción de leads directamente en tu cerebro digital.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Notion Workspace', status: 'Sincronizado', lastSync: 'Hace 2 min', icon: 'N', active: true },
                                    { name: 'n8n Webhook', status: 'Activo', lastSync: 'En tiempo real', icon: <N8nIcon size={14} className="text-btraffic-lime" />, active: true },
                                    { name: 'Google Drive', status: 'Autorizado', lastSync: 'Hace 1h', icon: <ExternalLink size={14} />, active: true },
                                ].map((conn, i) => (
                                    <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center gap-4 hover:border-white/10 transition-all group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-lg text-gray-400 group-hover:text-btraffic-lime transition-colors">
                                            {conn.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold uppercase tracking-tight">{conn.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{conn.status} <span className="text-gray-700">•</span> {conn.lastSync}</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-btraffic-lime shadow-[0_0_12px_rgba(162,255,0,0.6)] animate-pulse"></div>
                                    </div>
                                ))}
                                <button onClick={() => handleAction('Iniciando flujo OAuth...')} className="p-6 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-btraffic-lime/30 hover:text-btraffic-lime active:bg-btraffic-lime/5 transition-all">
                                    <Plus size={18} strokeWidth={3} /> Añadir Nueva Integración
                                </button>
                            </div>
                        </section>

                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8 shadow-2xl">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-btraffic-blue">Credenciales de Acceso</h2>
                                <p className="text-sm text-gray-400">Estas claves permiten que tu Agente Btraffic se comunique con tu CRM personal sin fricción.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Master Academy Key</span>
                                        <span className="text-[10px] font-black text-red-500 uppercase flex items-center gap-2 bg-red-500/10 px-2 py-1 rounded">
                                            <Shield size={10} /> Privada
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="password"
                                            value="bt_live_a1b2c3d4e5f6g7h8i9j0"
                                            readOnly
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-gray-400 focus:outline-none"
                                        />
                                        <button onClick={() => handleAction('API Key copiada')} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">Copiar</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                );
            case 'Facturación & Premium':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <section className="bg-btraffic-blue/5 border border-btraffic-blue/20 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-btraffic-blue/10 blur-[100px] pointer-events-none"></div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <span className="text-[10px] font-black bg-btraffic-blue text-white px-3 py-1 rounded-full uppercase tracking-widest">Plan Actual</span>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mt-4 italic">Btraffic <span className="text-btraffic-blue">Premium</span></h2>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-3xl font-black">97€<span className="text-sm text-gray-500 font-bold font-['Inter']">/mes</span></p>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Renueva el 15 Feb, 2026</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
                                    <Shield className="text-btraffic-lime" size={24} />
                                    <p className="text-xs font-black uppercase tracking-widest">Soporte VIP</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Acceso directo 24/7</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
                                    <Activity className="text-btraffic-blue" size={24} />
                                    <p className="text-xs font-black uppercase tracking-widest">I.A. Forense</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Análisis sin límites</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
                                    <Users className="text-btraffic-purple" size={24} />
                                    <p className="text-xs font-black uppercase tracking-widest">Red Élite</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Eventos trimestrales</p>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                <button onClick={() => handleAction('Redirecting to Stripe...')} className="px-8 py-3.5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Gestionar Suscripción</button>
                                <button className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Relación de Facturas</button>
                            </div>
                        </section>
                    </motion.div>
                );
            case 'Seguridad':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-10 shadow-2xl">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Protocolos de Seguridad</h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-3xl group hover:border-btraffic-lime/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-btraffic-lime/10 rounded-2xl">
                                            <Lock size={24} className="text-btraffic-lime" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight">Autenticación en Dos Pasos (2FA)</p>
                                            <p className="text-[10px] text-gray-500 font-bold leading-tight">Asegura tu cuenta de estratega con una capa táctica adicional.</p>
                                        </div>
                                    </div>
                                    <div className="w-14 h-7 bg-white/5 rounded-full relative p-1 cursor-pointer border border-white/10" onClick={() => handleAction('2FA habilitado')}>
                                        <div className="w-5 h-5 bg-btraffic-lime rounded-full absolute right-1"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-3xl group hover:border-btraffic-blue/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-btraffic-blue/10 rounded-2xl">
                                            <Smartphone size={24} className="text-btraffic-blue" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight">Sesiones Activas</p>
                                            <p className="text-[10px] text-gray-500 font-bold leading-tight">Operando actualmente en este dispositivo (Windows 11 / Chrome).</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleAction('Otras sesiones finalizadas')} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors active:scale-95">Cerrar Otros</button>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                );
            case 'Notificaciones':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-10 shadow-2xl">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Preferencias de Alertas</h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Nuevas Sesiones Academy', desc: 'Recibe un aviso cuando Brandon suba material táctico.' },
                                    { label: 'Mentions en Comunidad', desc: 'Alertas cuando alguien responda a tus estrategias.' },
                                    { label: 'Wins del Día', desc: 'Inspiración diaria de la red de socios.' },
                                    { label: 'Seguridad de Infraestructura', desc: 'Alertas críticas sobre tus webhooks de n8n.' }
                                ].map((noti, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-3xl group hover:border-white/10 transition-all">
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight group-hover:text-white transition-colors">{noti.label}</p>
                                            <p className="text-[10px] text-gray-500 font-bold tracking-tight">{noti.desc}</p>
                                        </div>
                                        <div className="w-12 h-6 bg-btraffic-lime/10 rounded-full relative p-1 cursor-pointer" onClick={() => handleAction('Preferencia guardada')}>
                                            <div className="w-4 h-4 bg-btraffic-lime rounded-full absolute right-1"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                );
            case 'Dashboard Académico':
                return (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <section className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] p-8 md:p-12 space-y-10 shadow-2xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                                <div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Tu <span className="text-btraffic-lime">Rendimiento</span></h2>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-3">Sincronizado con tus activos educativos</p>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-btraffic-blue bg-btraffic-blue/10 px-4 py-2 rounded-full border border-btraffic-blue/20">
                                    Nivel Actual: Arquitecto
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-8 bg-black/40 border border-white/5 rounded-[30px] text-center space-y-3 group hover:border-btraffic-lime/30 transition-all">
                                    <p className="text-4xl font-black text-btraffic-lime">{academicStats.progress}%</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Progreso Total</p>
                                </div>
                                <div className="p-8 bg-black/40 border border-white/5 rounded-[30px] text-center space-y-3 group hover:border-btraffic-blue/30 transition-all">
                                    <p className="text-4xl font-black text-white">{academicStats.completed}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Sesiones Dominadas</p>
                                </div>
                                <div className="p-8 bg-black/40 border border-white/5 rounded-[30px] text-center space-y-3 group hover:border-btraffic-purple/30 transition-all">
                                    <p className="text-4xl font-black text-btraffic-purple">{Math.floor(academicStats.completed / 5)}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Certificaciones</p>
                                </div>
                            </div>

                            <div className="p-8 bg-white/5 border border-white/10 rounded-[30px] flex items-center justify-between group hover:bg-white/10 transition-all">
                                <div className="space-y-2">
                                    <p className="text-base font-black uppercase tracking-tight">Clasificación Global</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Estás en el top 10% de los nuevos estrategas de esta semana.</p>
                                </div>
                                <TrendingUp className="text-btraffic-lime group-hover:scale-125 transition-transform" size={42} strokeWidth={3} />
                            </div>
                        </section>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 font-['Outfit']">
            {/* Save Status Notification */}
            <AnimatePresence>
                {saveStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-24 left-1/2 z-[200] px-8 py-4 bg-btraffic-lime text-black rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
                    >
                        <CheckCircle2 size={16} /> {saveStatus}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">Configuración de <span className="text-btraffic-lime italic">Estratega</span></h1>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Gestiona tus privilegios en el ecosistema <span className="text-white">B-OS active</span>.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Menu */}
                <aside className="lg:col-span-4 xl:col-span-3 space-y-2">
                    {tabs.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === item.name ? 'bg-btraffic-lime text-black shadow-2xl shadow-btraffic-lime/20 scale-[1.02]' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={18} strokeWidth={activeTab === item.name ? 3 : 2} />
                            {item.name}
                        </button>
                    ))}
                    <div className="pt-8">
                        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                            <LogOut size={18} /> Cerrar Sesión
                        </button>
                    </div>
                </aside>

                {/* Right: Content */}
                <main className="lg:col-span-8 xl:col-span-9">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
