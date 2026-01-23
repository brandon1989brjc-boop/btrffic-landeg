import { NextRequest, NextResponse } from 'next/server';
import { runSherlockAudit } from '@/lib/sherlock-engine';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { url, email, leadMetadata } = await req.json();

        if (!url || !email) {
            return NextResponse.json({ error: 'URL y Email son requeridos' }, { status: 400 });
        }

        const result = await runSherlockAudit(url, email, leadMetadata);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Error interno en el escaneo forense',
            details: error.message
        }, { status: 500 });
    }
}
