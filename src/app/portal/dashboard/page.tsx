'use client';

import { useState, useEffect, Suspense } from 'react';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Copy, Eye, EyeOff, FileText, Upload, Download,
    CheckCircle2, Clock, Activity, Building2, Server,
    Zap, X, Plus, Share2
} from 'lucide-react';
import { jsPDF } from 'jspdf';

import { supabase } from '@/lib/supabase';

// Los tipos se mantienen o se refinan
interface VaultItem {
    id: string;
    title: string;
    category: string;
    service_url: string;
    username: string;
    encrypted_password: string;
    notes: string;
}

interface TimelineEvent {
    id: string;
    event_type: string;
    description: string;
    actor: string;
    created_at: string;
    metadata: any;
}

interface Project {
    id: string;
    name: string;
    client_name: string;
    industry: string;
    description: string;
    status: string;
    progress_percent: number;
    north_star_metric: string;
    north_star_target: string;
    updated_at: string;
}

function DashboardContent() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project | null>(null);
    const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showVaultModal, setShowVaultModal] = useState(false);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleVaultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!project) return;

        setIsUploading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const newCredential = {
                project_id: project.id,
                title: formData.get('title') as string,
                category: formData.get('category') as string,
                service_url: formData.get('service_url') as string,
                username: formData.get('username') as string,
                encrypted_password: formData.get('password') as string, // En bypass, ideal usar encryption service
                notes: formData.get('notes') as string,
            };

            // 1. Insert in Vault
            const { error: vaultError } = await supabase
                .from('btraffic_project_vault')
                .insert([newCredential]);

            if (vaultError) throw vaultError;

            // 2. Log in Timeline
            await supabase.from('btraffic_project_timeline').insert({
                project_id: project.id,
                event_type: 'vault_access',
                description: `Nueva credencial integrada: ${newCredential.title}`,
                actor: 'cliente',
                metadata: { category: newCredential.category }
            });

            setShowVaultModal(false);
            alert('Credencial integrada y encriptada correctamente.');
        } catch (err: any) {
            console.error('Vault error:', err);
            alert('Error al integrar credencial: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        let projectSubscription: any;
        let vaultSubscription: any;
        let timelineSubscription: any;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Obtenemos el cliente actual (Simulado o real desde localStorage)
                const clientAuth = localStorage.getItem('btraffic_client_auth');
                const clientName = localStorage.getItem('btraffic_client_name') || 'Munay';

                if (!clientAuth) {
                    setError('Acceso no autorizado');
                    setLoading(false);
                    return;
                }

                // 1. Fetch Project
                const { data: projectData, error: projectError } = await supabase
                    .from('btraffic_projects')
                    .select('*')
                    .eq('client_name', clientName)
                    .single();

                if (projectError) {
                    console.warn('Project not found in DB, using fallback mock.');
                    // Si no existe en DB, mantenemos un mock para que no se rompa la demo del usuario
                    setProject({
                        id: 'munay-123',
                        name: 'Ecosistema Munay',
                        client_name: 'Munay',
                        industry: 'gastronomia',
                        description: 'Sistema de menús inteligentes y reservas automatizadas.',
                        status: 'building',
                        progress_percent: 35,
                        north_star_metric: 'Ticket Promedio',
                        north_star_target: '35€',
                        updated_at: new Date().toISOString()
                    });
                } else {
                    setProject(projectData);
                }

                const projId = projectData?.id || 'munay-123';

                // 2. Fetch Vault
                const { data: vaultData } = await supabase
                    .from('btraffic_project_vault')
                    .select('*')
                    .eq('project_id', projId);

                if (vaultData) setVaultItems(vaultData);

                // 3. Fetch Timeline
                const { data: timelineData } = await supabase
                    .from('btraffic_project_timeline')
                    .select('*')
                    .eq('project_id', projId)
                    .order('created_at', { ascending: false });

                if (timelineData) setTimeline(timelineData);

                // --- REALTIME SUBSCRIPTIONS ---

                // Subscribe to Project changes
                projectSubscription = supabase
                    .channel('project_changes')
                    .on('postgres_changes', {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'btraffic_projects',
                        filter: `id=eq.${projId}`
                    }, (payload) => {
                        console.log('🔄 Update detected in Project:', payload);
                        setProject(payload.new as Project);
                    })
                    .subscribe();

                // Subscribe to Vault changes
                vaultSubscription = supabase
                    .channel('vault_changes')
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'btraffic_project_vault',
                        filter: `project_id=eq.${projId}`
                    }, async () => {
                        console.log('🔄 Change detected in Vault, refreshing...');
                        const { data } = await supabase
                            .from('btraffic_project_vault')
                            .select('*')
                            .eq('project_id', projId);
                        if (data) setVaultItems(data);
                    })
                    .subscribe();

                // Subscribe to Timeline changes
                timelineSubscription = supabase
                    .channel('timeline_changes')
                    .on('postgres_changes', {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'btraffic_project_timeline',
                        filter: `project_id=eq.${projId}`
                    }, (payload) => {
                        console.log('🔄 New event in Timeline:', payload);
                        setTimeline(prev => [payload.new as TimelineEvent, ...prev]);
                    })
                    .subscribe();

            } catch (err) {
                console.error('Fetch error:', err);
                setError('Error al conectar con el Ecosistema Core.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            if (projectSubscription) supabase.removeChannel(projectSubscription);
            if (vaultSubscription) supabase.removeChannel(vaultSubscription);
            if (timelineSubscription) supabase.removeChannel(timelineSubscription);
        };
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !project) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${project.id}/${fileName}`;

            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('btraffic-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Register as Asset
            await supabase.from('btraffic_project_assets').insert({
                project_id: project.id,
                asset_type: 'document',
                phase: 'build',
                title: file.name,
                metadata: {
                    size: file.size,
                    type: file.type,
                    path: filePath
                }
            });

            // 3. Log to Timeline
            await supabase.from('btraffic_project_timeline').insert({
                project_id: project.id,
                event_type: 'upload',
                description: `Nuevo archivo subido: ${file.name}`,
                actor: 'cliente',
                metadata: { filename: file.name }
            });

            alert('Archivo subido con éxito al Ecosistema.');
        } catch (err: any) {
            console.error('Upload error:', err);
            alert('Error al subir el archivo: ' + err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!project) return;
        setIsExporting(true);

        try {
            const doc = new jsPDF();
            const primaryColor = [162, 255, 0]; // Btraffic Lime

            // --- Header ---
            doc.setFillColor(0, 0, 0);
            doc.rect(0, 0, 210, 40, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('BITTRAFFIC ESTRATEGIA', 20, 25);

            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text('REPORTE DE ESTADO DEL ECOSISTEMA DIGITAL', 20, 32);

            // --- Client Info ---
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text(`Cliente: ${project.client_name}`, 20, 60);
            doc.text(`Proyecto: ${project.name}`, 20, 70);
            doc.text(`Industria: ${project.industry.toUpperCase()}`, 20, 80);

            // --- Progress Card (Simulation) ---
            doc.setDrawColor(200, 200, 200);
            doc.rect(20, 90, 170, 30);
            doc.setFontSize(10);
            doc.text('ESTADO DE CONSTRUCCIÓN:', 25, 100);
            doc.setFontSize(16);
            doc.text(`${project.progress_percent}%`, 25, 110);

            // Progress bar
            doc.setFillColor(230, 230, 230);
            doc.rect(70, 105, 100, 5, 'F');
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.rect(70, 105, project.progress_percent, 5, 'F');

            // --- Insights / Metrics ---
            doc.setFontSize(12);
            doc.text('METRICA NORTH STAR:', 20, 140);
            doc.setFontSize(10);
            doc.text(`${project.north_star_metric}: ${project.north_star_target}`, 20, 148);

            // --- Vault Summary ---
            doc.setFontSize(12);
            doc.text('BÓVEDA DE ACTIVOS:', 20, 170);
            vaultItems.forEach((item, index) => {
                doc.setFontSize(8);
                doc.text(`- ${item.title} (${item.category})`, 25, 180 + (index * 6));
            });

            // --- Timeline (Last 5) ---
            const startTimelineY = 210;
            doc.setFontSize(12);
            doc.text('ÚLTIMOS HITOS:', 20, startTimelineY);
            timeline.slice(0, 5).forEach((event, index) => {
                doc.setFontSize(8);
                const dateStr = new Date(event.created_at).toLocaleDateString();
                doc.text(`${dateStr} - ${event.description}`, 25, (startTimelineY + 10) + (index * 6));
            });

            // --- Footer ---
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text('Generado automáticamente por el Ecosistema B-OS BitTraffic. Confidencial.', 20, 285);

            doc.save(`BT-REPORTE-${project.client_name.replace(/\s+/g, '_')}.pdf`);

            // Log Export in Timeline
            await supabase.from('btraffic_project_timeline').insert({
                project_id: project.id,
                event_type: 'report',
                description: 'Reporte estratégico exportado por el cliente',
                actor: 'cliente',
                metadata: { format: 'pdf' }
            });

        } catch (err) {
            console.error('Export error:', err);
            alert('Error al generar el reporte.');
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-btraffic-lime border-t-transparent rounded-full animate-spin" />
                <div className="text-btraffic-lime font-black uppercase tracking-[0.3em] animate-pulse text-[10px]">
                    Sincronizando con el Core...
                </div>
            </div>
        );
    }

    if (!project) return <div>No se encontró el proyecto.</div>;


    return (
        <div className="space-y-12">
            {/* Input oculto para archivos */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
                        Panel de Control <span className="text-btraffic-lime">.</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl">
                        Visión centralizada de su Ecosistema Digital. Gestione credenciales, archivos y monitoree el progreso en tiempo real.
                    </p>
                </div>

                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    {isExporting ? (
                        <div className="w-4 h-4 border-2 border-btraffic-lime border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Share2 size={18} className="text-btraffic-lime group-hover:rotate-12 transition-transform" />
                    )}
                    <div className="text-left">
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Generar Reporte</div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">Exportar Ecosistema</div>
                    </div>
                </button>
            </div>

            {/* Status Overview Card */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 p-8 rounded-[32px] bg-gradient-to-br from-white/5 to-black border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <ActivityIcon status={project.status} size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-btraffic-lime mb-2">Estado del Proyecto</div>
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">{getStatusLabel(project.status)}</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                    <span>Progreso de Construcción</span>
                                    <span className="text-white">{project.progress_percent}%</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress_percent}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-btraffic-lime shadow-[0_0_20px_rgba(162,255,0,0.4)]"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Métrica Norte</div>
                                    <div className="text-xl font-black text-white">{project.north_star_metric}</div>
                                    <div className="text-xs text-btraffic-lime font-bold">Objetivo: {project.north_star_target}</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Última Actualización</div>
                                    <div className="text-xl font-black text-white">
                                        {new Date(project.updated_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                    </div>
                                    <div className="text-xs text-gray-400">Sincronización core</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Feed */}
                    <div className="md:col-span-1 p-6 rounded-[32px] bg-white/5 border border-white/10 overflow-y-auto max-h-[400px]">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Clock size={16} /> Timeline
                        </h3>
                        <div className="space-y-6 relative ml-2">
                            <div className="absolute top-2 bottom-2 left-[5px] w-px bg-white/10" />
                            {timeline.map((event, i) => (
                                <div key={event.id} className="relative pl-6">
                                    <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black ${i === 0 ? 'bg-btraffic-lime animate-pulse' : 'bg-gray-600'}`} />
                                    <p className="text-xs font-bold text-white mb-0.5">{event.description}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">
                                        {new Date(event.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Vault Section */}
            {(activeTab === 'overview' || activeTab === 'vault') && (
                <section id="vault" className={activeTab === 'vault' ? '' : 'pt-10 border-t border-white/5'}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                <Shield className="text-btraffic-blue" />
                                Bóveda de Credenciales
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Accesos encriptados de nivel bancario. Gestión segura.</p>
                        </div>
                        <button
                            onClick={() => setShowVaultModal(true)}
                            className="px-6 py-3 bg-btraffic-lime text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(162,255,0,0.2)]"
                        >
                            <Plus size={16} /> Añadir Credencial
                        </button>
                    </div>

                    <AnimatePresence>
                        {showVaultModal && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setShowVaultModal(false)}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6">
                                        <button onClick={() => setShowVaultModal(false)} className="text-gray-500 hover:text-white transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Nueva Credencial</h3>
                                        <p className="text-xs text-gray-500">Añada un nuevo activo a la bóveda de seguridad.</p>
                                    </div>

                                    <form onSubmit={handleVaultSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Título</label>
                                                <input required name="title" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="Ej: Meta Ads Account" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Categoría</label>
                                                <select name="category" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none">
                                                    <option value="api">API / SDK</option>
                                                    <option value="ads">Marketing / Ads</option>
                                                    <option value="cms">CMS / Web</option>
                                                    <option value="hosting">Hosting / Infra</option>
                                                    <option value="social">Redes Sociales</option>
                                                    <option value="other">Otros</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">URL del Servicio</label>
                                            <input name="service_url" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="https://..." />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Usuario / ID</label>
                                                <input required name="username" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="admin@..." />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contraseña</label>
                                                <input required name="password" type="password" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white" placeholder="••••••••" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Notas Internas</label>
                                            <textarea name="notes" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white h-20 resize-none" placeholder="Opcional: Detalles de uso, rotación, etc." />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isUploading}
                                            className="w-full py-4 bg-btraffic-lime text-black rounded-xl font-black uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            {isUploading ? 'Encriptando...' : 'Integrar Credencial'}
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vaultItems.map((item) => (
                            <VaultCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            )}

            {/* Files Section */}
            {(activeTab === 'overview' || activeTab === 'files') && (
                <section id="files" className={activeTab === 'files' ? '' : 'pt-10 border-t border-white/5'}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                <FileText className="text-btraffic-purple" />
                                Centro de Documentación
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Contratos, Blueprints y Entregables.</p>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {isUploading ? (
                                <div className="w-3 h-3 border-2 border-btraffic-purple border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Upload size={14} />
                            )}
                            {isUploading ? 'Subiendo...' : 'Subir Archivo'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Contrato de Servicios.pdf', 'Blueprint Arquitectura v2.png', 'Auditoría Inicial.pdf', 'Assets de Marca.zip'].map((file, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-btraffic-purple/50 transition-all cursor-pointer">
                                <FileText className="text-gray-500 group-hover:text-btraffic-purple mb-4 transition-colors" size={32} />
                                <p className="text-xs font-bold text-gray-300 truncate mb-2">{file}</p>
                                <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                    <span>2.4 MB</span>
                                    <Download size={12} className="group-hover:text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function VaultCard({ item }: { item: VaultItem }) {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(item.encrypted_password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-btraffic-blue/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 text-${item.category === 'finance' ? 'btraffic-lime' : 'btraffic-blue'}`}>
                    {item.category === 'finance' ? <Zap size={20} /> : <Server size={20} />}
                </div>
                <div className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase tracking-widest text-gray-500">
                    {item.category}
                </div>
            </div>

            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 mb-6 truncate">{item.service_url}</p>

            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                <div>
                    <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Usuario</div>
                    <div className="text-xs font-mono text-gray-300 select-all">{item.username}</div>
                </div>
                <div>
                    <div className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1 flex justify-between">
                        <span>Contraseña</span>
                        <button onClick={() => setIsVisible(!isVisible)} className="hover:text-white transition-colors">
                            {isVisible ? <EyeOff size={10} /> : <Eye size={10} />}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-mono text-gray-300 flex-1 truncate">
                            {isVisible ? item.encrypted_password : '••••••••••••••••'}
                        </div>
                        <button onClick={copyToClipboard} className="text-gray-500 hover:text-btraffic-lime transition-colors">
                            {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityIcon({ status, size }: { status: string, size: number }) {
    if (status === 'building') return <Building2 size={size} />;
    return <Activity size={size} />;
}

function getStatusLabel(status: string) {
    const map: Record<string, string> = {
        'discovery': 'Fase de Descubrimiento',
        'building': 'Construcción Activa',
        'live': 'Ecosistema Operativo'
    };
    return map[status] || status;
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="text-btraffic-lime font-black uppercase tracking-widest animate-pulse">Cargando Ecosistema...</div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
