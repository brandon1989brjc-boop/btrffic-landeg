import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Lead {
    name: string;
    email: string;
    web: string;
    role: string;
    pain: string;
    revenue: string;
    score: number;
    isQualified: boolean;
    analysis?: string;
    status?: 'new' | 'contacted' | 'negotiating' | 'closed' | 'rejected';
}

/**
 * Lead Orchestrator
 * Se encarga de guardar el lead en DB y disparar automatizaciones externas
 */
export async function orchestrateLead(leadData: Lead) {
    console.log('🚀 Orquestando nuevo lead:', leadData.email);

    try {
        // 1. Guardar en Supabase (Si las claves existen)
        if (supabaseUrl && supabaseKey) {
            const { data, error } = await supabase
                .from('leads_btraffic')
                .upsert([
                    {
                        ...leadData,
                        created_at: new Date().toISOString(),
                        status: leadData.status || 'new'
                    }
                ], { onConflict: 'email' });

            if (error) console.error('❌ Error Supabase:', error.message);
            else console.log('✅ Lead guardado en Database Asset');
        }

        // 2. Notificar a n8n (Orquestador de automatización)
        if (n8nWebhookUrl) {
            fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'new_lead_diagnostic',
                    timestamp: new Date().toISOString(),
                    data: leadData
                })
            }).catch(err => console.error('⚠️ n8n Webhook failed:', err));
        }

        return { success: true };
    } catch (error) {
        console.error('❌ Orchestration error:', error);
        return { success: false, error };
    }
}
