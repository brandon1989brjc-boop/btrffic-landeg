
'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Target, Crown, ArrowUp, Zap } from 'lucide-react';

const leaderData = [
    { id: 1, name: 'Alex Rivera', points: 4520, level: 'Arquitecto Master', avatar: 'AR', trend: 'up' },
    { id: 2, name: 'Maria Santos', points: 3845, level: 'Estratega Senior', avatar: 'MS', trend: 'up' },
    { id: 3, name: 'David Chen', points: 3610, level: 'Ingeniero de Datos', avatar: 'DC', trend: 'down' },
    { id: 4, name: 'Lucía Lopez', points: 3200, level: 'Estratega Junior', avatar: 'LL', trend: '-' },
    { id: 5, name: 'Juan Perez', points: 2950, level: 'Estratega Junior', avatar: 'JP', trend: 'up' },
];

export default function LeaderboardPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Header / Intro */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-btraffic-lime/10 border border-btraffic-lime/20 rounded-full text-btraffic-lime text-[10px] font-black uppercase tracking-widest">
                    <Trophy size={14} /> Ranking de Élite
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Líderes de <span className="text-btraffic-lime">Inteligencia</span></h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium">
                    En Btraffic el estatus se gana mediante la aportación de valor y el dominio del dato. Solo los mejores llegan al Consejo de Arquitectos.
                </p>
            </div>

            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                {leaderData.slice(0, 3).map((leader, index) => (
                    <motion.div
                        key={leader.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative rounded-[40px] p-8 border ${index === 0 ? 'bg-gradient-to-br from-btraffic-lime/20 to-btraffic-gray border-btraffic-lime/40' : 'bg-btraffic-gray/30 border-white/5'} flex flex-col items-center gap-4 shadow-2xl overflow-hidden`}
                    >
                        {index === 0 && <Crown className="absolute top-6 right-6 text-btraffic-lime animate-bounce" size={24} />}

                        <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl border-4 ${index === 0 ? 'border-btraffic-lime' : 'border-white/10'} bg-black/40`}>
                            {leader.avatar}
                        </div>
                        <div className="text-center">
                            <h3 className="font-black text-xl uppercase tracking-tighter">{leader.name}</h3>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${index === 0 ? 'text-btraffic-lime' : 'text-btraffic-blue'}`}>{leader.level}</p>
                        </div>

                        <div className="w-full h-px bg-white/5 my-2"></div>

                        <div className="flex justify-between w-full items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Karma Total</p>
                                <p className="text-2xl font-black">{leader.points}</p>
                            </div>
                            <div className={`p-2 rounded-xl bg-white/5 ${leader.trend === 'up' ? 'text-btraffic-lime' : 'text-red-500'}`}>
                                <ArrowUp size={20} className={leader.trend === 'down' ? 'rotate-180' : ''} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* List Table */}
            <div className="bg-btraffic-gray/30 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                        <Zap size={16} className="text-btraffic-blue" />
                        Histórico de Aportación
                    </h3>
                </div>
                <div className="divide-y divide-white/5">
                    {leaderData.map((leader, index) => (
                        <div key={leader.id} className="p-6 flex items-center gap-6 hover:bg-white/5 transition-colors group">
                            <span className="w-8 text-sm font-black text-gray-500 group-hover:text-btraffic-lime">#{index + 1}</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                                {leader.avatar}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black">{leader.name}</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{leader.level}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black">{leader.points}</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Ptos Valor</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-btraffic-lime/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-btraffic-lime">Gana puntos publicando WINS y resolviendo dudas técnicas en Comunidad.</p>
                </div>
            </div>
        </div>
    );
}
