'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ROICalculator from './ROICalculator';

interface CalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9998]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[9999] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="relative w-full max-w-5xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute -top-4 -right-4 z-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all group"
                                >
                                    <X size={24} className="text-white group-hover:text-btraffic-lime transition-colors" />
                                </button>

                                {/* Calculator Content */}
                                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="mb-8 text-center">
                                        <h1 className="text-4xl md:text-5xl font-black mb-2">
                                            Calculadora ROI
                                        </h1>
                                        <p className="text-gray-400 text-sm uppercase tracking-wider">
                                            Descubre cuánto puedes ahorrar con B-OS Ecosystem
                                        </p>
                                    </div>

                                    <ROICalculator onClose={onClose} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
