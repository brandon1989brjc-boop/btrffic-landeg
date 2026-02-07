'use client';

import { motion } from 'framer-motion';
import { ArrowRight, X as CloseIcon, Activity } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    onClick: () => void;
}

export function FeatureCard({ icon, title, desc, onClick }: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group p-10 rounded-[40px] glass-panel border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer relative overflow-hidden"
            onClick={onClick}
            data-track={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-btraffic-lime/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-btraffic-lime/10 transition-all" />

            <div className="mb-8 p-6 rounded-3xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>

            <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">{title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg mb-4">{desc}</p>
            <div className="flex items-center gap-2 text-btraffic-lime text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Ver Argumento de Valor <ArrowRight size={14} />
            </div>
        </motion.div>
    );
}

interface FeatureModalProps {
    data: {
        title: string;
        argument: string;
        icon: React.ReactNode;
        color: string;
        stats: { label: string; value: string }[];
        steps: string[];
    };
    onClose: () => void;
}

export function FeatureModal({ data, onClose }: FeatureModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                    data-track="close-feature-modal"
                >
                    <CloseIcon size={20} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left side: Argument and Stats */}
                    <div className="p-12 md:p-16 space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-white/5">
                                {data.icon}
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter">{data.title}</h2>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic">
                            "{data.argument}"
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            {data.stats.map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className={`text-lg font-black ${data.color === 'btraffic-lime' ? 'text-btraffic-lime' : data.color === 'btraffic-blue' ? 'text-btraffic-blue' : 'text-btraffic-purple'}`}>
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <button className="btn-premium w-full md:w-auto" data-track={`deploy-feature-${data.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                Desplegar en mi Negocio
                            </button>
                        </div>
                    </div>

                    {/* Right side: Visualization / Steps */}
                    <div className="bg-white/[0.02] p-12 md:p-16 border-l border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-10">Flujo de Orquestación</h4>

                        <div className="space-y-6 relative">
                            {/* Vertical line */}
                            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-btraffic-lime via-btraffic-blue to-btraffic-purple opacity-20" />

                            {data.steps.map((step, i) => (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-btraffic-dark border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:border-btraffic-lime group-hover:text-btraffic-lime transition-all z-10">
                                        {i + 1}
                                    </div>
                                    <div className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">{step}</div>
                                </motion.div>
                            ))}

                            <div className="mt-12 p-8 rounded-3xl bg-btraffic-lime/5 border border-btraffic-lime/20 flex flex-col items-center text-center gap-4">
                                <Activity className="text-btraffic-lime animate-pulse" size={32} />
                                <div className="text-xs font-bold uppercase tracking-widest italic text-gray-400">
                                    Monitoreo en Tiempo Real Activado
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
