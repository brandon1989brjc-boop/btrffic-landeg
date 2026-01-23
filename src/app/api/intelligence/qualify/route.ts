import { NextRequest, NextResponse } from 'next/server';
import { qualifyLead, generateCustomPitch } from '@/lib/groq-intelligence';

/**
 * API de Inteligencia BTraffic - Powered by Groq
 * Endpoint: /api/intelligence/qualify
 * 
 * Cualifica leads en tiempo real usando IA
 */
export async function POST(req: NextRequest) {
    try {
        const { name, role, web, pain, revenue, action } = await req.json();

        // Validación básica
        if (!name || !role || !web) {
            return NextResponse.json(
                { error: 'Datos incompletos: name, role y web son requeridos' },
                { status: 400 }
            );
        }

        // Cualificación inteligente
        if (action === 'qualify' || !action) {
            const qualification = await qualifyLead({
                name,
                role,
                web,
                pain: pain || 'No especificado',
                revenue: revenue || 'unknown'
            });

            return NextResponse.json({
                success: true,
                qualification,
                timestamp: new Date().toISOString()
            });
        }

        // Generación de argumento personalizado
        if (action === 'pitch') {
            const pitch = await generateCustomPitch({
                name,
                role,
                web,
                pain: pain || 'Falta de automatización'
            });

            return NextResponse.json({
                success: true,
                pitch,
                timestamp: new Date().toISOString()
            });
        }

        return NextResponse.json(
            { error: 'Acción no válida. Usa "qualify" o "pitch"' },
            { status: 400 }
        );

    } catch (error: any) {
        console.error('Intelligence API Error:', error);
        return NextResponse.json({
            error: 'Error en el motor de inteligencia',
            details: error.message,
            fallback: true
        }, { status: 500 });
    }
}
