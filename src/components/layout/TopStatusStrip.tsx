
'use client';

import { motion } from 'framer-motion';
import { Activity, Globe, Shield, Zap } from 'lucide-react';

const TopStatusStrip = () => {
    return (
        <div className="bg-black border-b border-white/5 py-1.5 px-6 md:px-12 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap">
            <div className="flex gap-6 items-center">
                <div className="flex items-center gap-1.5 text-btraffic-lime">
                    <Activity size={10} className="animate-pulse" />
                    <span>B-OS v2.0 ACTIVE</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
                    <Globe size={10} />
                    <span>NODE: MADRID_SPAIN</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-gray-500">
                    <Shield size={10} />
                    <span>ENCRYPTION: AES-256-RAG</span>
                </div>
            </div>

            <div className="flex gap-6 items-center">
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 text-btraffic-blue"
                >
                    <Zap size={10} />
                    <span>DATALINK SYNCHRONIZED</span>
                </motion.div>
                <div className="text-gray-600">
                    {new Date().toISOString().split('T')[0]}
                </div>
            </div>
        </div>
    );
};

export default TopStatusStrip;
