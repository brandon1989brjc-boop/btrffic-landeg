import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, ShieldCheck, Zap, Lock, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface PremiumUpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PremiumUpgradeModal({ isOpen, onClose }: PremiumUpgradeModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Placeholder for Stripe logic
    const handlePurchase = () => {
        setIsLoading(true);
        // Simulate API call / Stripe redirect
        setTimeout(() => {
            // In a real app, this would be a redirect to Stripe Checkout URL
            // For now, we simulate a successful unlock for demonstration
            localStorage.setItem('btraffic_academy_unlocked', 'true'); // Keeping the global unlock for simplicity or adding a new one
            localStorage.setItem('btraffic_premium_unlocked', 'true');
            window.dispatchEvent(new Event('storage_update'));
            setIsLoading(false);
            onClose();
            // Force reload to reflect changes
            window.location.reload();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-btraffic-purple/30 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Premium Visual Side */}
                        <div className="w-full md:w-2/5 bg-gradient-to-br from-btraffic-purple/20 to-black p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                            <div className="w-20 h-20 rounded-full bg-btraffic-purple/20 border border-btraffic-purple/40 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <Star size={40} className="text-btraffic-purple fill-btraffic-purple" />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white relative z-10 mb-2">
                                Acceso VIP <br /><span className="text-btraffic-purple">Total</span>
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 relative z-10">
                                Desbloquea el Potencial Máximo
                            </p>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-3/5 p-8 md:p-10 bg-btraffic-dark relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-xl font-black uppercase tracking-tight">Plan Arquitecto Senior</h4>
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                        Accede a los modelos de automatización avanzada, ventas forenses y el stack tecnológico completo de Btraffic.
                                    </p>
                                </div>

                                <ul className="space-y-3">
                                    {[
                                        'Orquestación masiva en n8n',
                                        'Scripts de Ventas Forenses',
                                        'Plantillas de Contratos High-Ticket',
                                        'Soporte Prioritario en Comunidad'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs font-bold text-gray-300">
                                            <Check size={14} className="text-btraffic-lime mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-white/5 space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Inversión Única</div>
                                        <div className="text-3xl font-black text-white">100€</div>
                                    </div>

                                    <button
                                        onClick={handlePurchase}
                                        disabled={isLoading}
                                        className="w-full py-4 bg-btraffic-purple hover:bg-btraffic-purple/90 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-lg shadow-btraffic-purple/20 flex items-center justify-center gap-3"
                                    >
                                        {isLoading ? (
                                            <span className="animate-pulse">Procesando...</span>
                                        ) : (
                                            <>
                                                <CreditCard size={16} /> Desbloquear Ahora
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[9px] text-center text-gray-600 font-medium">
                                        Pago seguro vía Stripe. Acceso inmediato.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
