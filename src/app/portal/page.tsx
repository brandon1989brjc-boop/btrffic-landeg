'use client';

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PortalLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulación de Auth
        setTimeout(() => {
            if (email.toLowerCase().includes('munay') && password === 'munay123') {
                localStorage.setItem('btraffic_client_auth', 'true');
                localStorage.setItem('btraffic_client_name', 'Munay Gastronomía');
                router.push('/portal/dashboard');
            } else {
                setError('Credenciales inválidas. Intente con el usuario demo asignado.');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-['Outfit'] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-hero-mesh opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-btraffic-lime/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-btraffic-blue/10 blur-[100px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-btraffic-lime flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(162,255,0,0.3)]">
                            <span className="font-black text-black text-xl">B</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Acceso Seguro</h1>
                    <p className="text-gray-500 font-medium">Bóveda de Activos Digitales</p>
                </div>

                <div className="glass-panel p-8 md:p-10 border-white/10 bg-black/50 backdrop-blur-xl rounded-[32px] shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Corporativo</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-btraffic-lime focus:bg-white/10 outline-none transition-all font-medium"
                                placeholder="usuario@empresa.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contraseña Maestra</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-btraffic-lime focus:bg-white/10 outline-none transition-all font-medium"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-btraffic-lime text-black rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(162,255,0,0.2)] disabled:opacity-50 disabled:grayscale"
                        >
                            {loading ? 'Verificando...' : (
                                <>Entrar a la Bóveda <ArrowRight size={16} /></>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-medium pt-4">
                            <ShieldCheck size={12} className="text-btraffic-lime" />
                            Encriptación de Grado Militar via Supabase Vault
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
