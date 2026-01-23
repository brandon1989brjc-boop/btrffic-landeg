import Groq from "groq-sdk";

// Cliente Groq para toda la aplicación
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || ''
});

/**
 * Arquitectura de Inteligencia BTraffic
 * Groq actúa como el cerebro principal para:
 * - Análisis contextual de leads
 * - Generación de respuestas personalizadas
 * - Cualificación inteligente en tiempo real
 */

export interface IntelligenceRequest {
    context: string;
    userInput: string;
    systemRole: string;
    temperature?: number;
}

export interface IntelligenceResponse {
    response: string;
    confidence: number;
    reasoning?: string;
}

/**
 * Motor de Inteligencia Principal
 * Usa Llama 3.3 70B (el modelo más estable y potente en Groq)
 */
export async function runIntelligence(request: IntelligenceRequest): Promise<IntelligenceResponse> {
    try {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY no configurada en el servidor");
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: request.systemRole
                },
                {
                    role: "user",
                    content: `CONTEXTO:\n${request.context}\n\nPETICIÓN:\n${request.userInput}`
                }
            ],
            temperature: request.temperature || 0.5,
            max_tokens: 1024,
            stream: false,
            response_format: { type: "text" } // Forzamos texto para parsear manualmente por seguridad
        });

        let response = completion.choices[0]?.message?.content || '';

        // LIMPIEZA ROBUSTA: Eliminar bloques de markdown si existen
        response = response.replace(/```json\n?|```/g, '').trim();

        // Intentar encontrar el primer '{' y el último '}' por seguridad
        const firstBrace = response.indexOf('{');
        const lastBrace = response.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            response = response.substring(firstBrace, lastBrace + 1);
        }

        return {
            response,
            confidence: 0.98,
            reasoning: `Inferencia Groq: ${completion.model} | Latencia mínima`
        };
    } catch (error: any) {
        console.error('❌ Groq Engine Error:', error.message);
        throw error;
    }
}

/**
 * Analizador de Leads Inteligente
 * Cualifica un lead basándose en datos forenses
 */
export async function qualifyLead(leadData: {
    name: string;
    role: string;
    web: string;
    pain: string;
    revenue: string;
}): Promise<{
    isQualified: boolean;
    score: number;
    recommendedAction: string;
    personalizedMessage: string;
}> {
    const systemRole = `Eres el "Stratega de Cualificación" de BTraffic.
Tu labor es analizar leads potenciales y determinar si son candidatos para nuestros servicios de automatización empresarial premium.

CRITERIOS DE CUALIFICACIÓN:
- Rol de decisión (CEO/Director/Gerente): +40 puntos
- Revenue >$10k/mes: +30 puntos
- Problema operativo claro: +20 puntos
- Presencia digital activa: +10 puntos

Score 70+: CANDIDATO POSITIVO (Sesión estratégica)
Score 50-69: CANDIDATO POTENCIAL (Argumento a medida)
Score <50: FASE DE CIMENTACIÓN (Contenido educativo)

RESPONDE EN JSON ESTRICTO:
{
  "score": number,
  "isQualified": boolean,
  "recommendedAction": string,
  "personalizedMessage": string
}`;

    // Normalización de Revenue para la IA
    const isHighRevenue = leadData.revenue.includes('+10k') || leadData.revenue === 'yes';

    const context = `
Lead Data:
- Nombre: ${leadData.name}
- Rol: ${leadData.role}
- Web/Social: ${leadData.web}
- Problema Principal: ${leadData.pain}
- Facturación Mensual: ${isHighRevenue ? 'Más de $10,000 USD/mes (Cualificado prioritario)' : 'Menos de $10,000 USD/mes'}
`;

    const userInput = "Analiza este lead y genera una cualificación completa con mensaje personalizado en castellano. Responde ÚNICAMENTE en JSON.";

    const intelligence = await runIntelligence({
        context,
        userInput,
        systemRole,
        temperature: 0.1 // Máxima precisión técnica
    });

    // Parse de la respuesta JSON con limpieza extrema
    try {
        const cleanResponse = intelligence.response;
        const parsed = JSON.parse(cleanResponse);

        return {
            isQualified: parsed.isQualified ?? (parsed.score >= 70),
            score: parsed.score || 50,
            recommendedAction: parsed.recommendedAction || (isHighRevenue ? "SESIÓN ESTRATÉGICA" : "CONTENIDO EDUCATIVO"),
            personalizedMessage: parsed.personalizedMessage || `Gracias ${leadData.name}, analizaremos tu caso.`
        };
    } catch (e) {
        console.error('⚠️ Fallo en parsing IA, usando respuesta plana:', e);
        // Si no es JSON, devolvemos la respuesta como mensaje pero con score calculado manualmente
        const manualScore = (leadData.role.toLowerCase().includes('ceo') || leadData.role.toLowerCase().includes('founder') ? 40 : 10) + (isHighRevenue ? 30 : 0);

        return {
            isQualified: manualScore >= 70,
            score: manualScore,
            recommendedAction: manualScore >= 70 ? "SESIÓN ESTRATÉGICA ELITE" : "CONTACTO SEMI-AUTOMATIZADO",
            personalizedMessage: intelligence.response // El contenido de la IA aunque sea texto plano
        };
    }
}

/**
 * Generador de Argumentos Personalizados
 * Crea un pitch a medida basado en el perfil del lead
 */
export async function generateCustomPitch(leadProfile: {
    name: string;
    role: string;
    web: string;
    industry?: string;
    pain: string;
}): Promise<string> {
    const systemRole = `Eres Brandon de BTraffic, el estratega de "Ecosistemas Digitales como Activos Financieros".

Tu filosofía: "Sin dato no hay relato. Activo vs Gasto."

Genera un argumento estratégico PERSONALIZADO de máximo 3 párrafos que:
1. Mencione el dolor específico del lead
2. Conecte con su rol (ejemplo: si es CEO, habla de libertad operativa)
3. Proponga una arquitectura de solución (no vendas, diagnostica)

Tono: Directo, pragmático, técnico pero accesible.
Castellano neutro.`;

    const context = `Lead: ${leadProfile.name} (${leadProfile.role})
Web/Negocio: ${leadProfile.web}
Dolor detectado: ${leadProfile.pain}`;

    const userInput = `Genera el argumento estratégico personalizado para ${leadProfile.name}.`;

    const intelligence = await runIntelligence({
        context,
        userInput,
        systemRole,
        temperature: 0.8 // Más creativo
    });

    return intelligence.response;
}

export { groq };
