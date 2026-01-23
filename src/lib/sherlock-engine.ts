import { orchestrateLead } from './lead-orchestrator';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from 'resend';
import { htmlToText } from 'html-to-text';
import { marked } from 'marked';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY);

export async function runSherlockAudit(url: string, email: string, leadMetadata?: any) {
  try {
    // Audit technical data
    const auditData = await performTechnicalAudit(url);

    // Analyze with Gemini
    const analysis = await analyzeWithGemini(auditData, url);

    // ORQUESTACIÓN: Guardar lead en Asset Database y Automatizar
    if (leadMetadata) {
      await orchestrateLead({
        name: leadMetadata.name || 'Anónimo',
        email,
        web: url,
        role: leadMetadata.role || 'No especificado',
        pain: leadMetadata.pain || 'No especificado',
        revenue: leadMetadata.revenue || 'Unknown',
        score: leadMetadata.score || 0,
        isQualified: leadMetadata.isQualified || false,
        analysis: analysis,
        status: 'new'
      });
    }

    // Save lead logic (Disabled per user request)
    /*
    const { data: lead, error: dbError } = await supabase.from('sherlock_leads').insert({
        url,
        email,
        audit_data: auditData,
        analysis: analysis,
        created_at: new Date().toISOString()
    }).select().single();

    if (dbError) console.error('Supabase Error:', dbError);
    */

    try {
      await sendReportEmail(email, url, analysis, auditData);
    } catch (e) {
      console.error('Email error suppressed:', e);
    }

    return { success: true, leadId: 'temp_id_no_db' };
  } catch (error) {
    console.error('Sherlock Engine Error:', error);
    throw error;
  }
}

async function performTechnicalAudit(url: string) {
  const startTime = Date.now();
  let status = 'error';
  let html = '';

  const isSocial = url.includes('instagram.com') || url.includes('linkedin.com') || url.includes('twitter.com') || url.includes('x.com') || url.includes('facebook.com');

  try {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    // Para redes sociales, el fetch suele ser bloqueado o redireccionado, por lo que marcamos como "Red Social Detectada"
    if (!isSocial) {
      const response = await fetch(formattedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      status = response.ok ? 'ok' : 'error';
      html = await response.text();
    } else {
      status = 'social_detected';
    }
  } catch (e) {
    console.error('Fetch Error:', e);
  }

  const loadTime = Date.now() - startTime;

  // Basic Regex for tracking (Only for websites)
  const hasGTM = html.includes('googletagmanager.com/gtm.js');
  const hasFB = html.includes('connect.facebook.net/en_US/fbevents.js');
  const hasGA = html.includes('googletagmanager.com/gtag/js');
  const hasSSL = url.startsWith('https');

  const textContent = isSocial
    ? `Se trata de un perfil de Red Social (${url}). El análisis se centrará en la arquitectura de conversión en redes sociales y la fuga de leads por falta de automatización en DM.`
    : htmlToText(html, {
      wordwrap: 130,
      selectors: [
        { selector: 'a', options: { ignoreHref: true } },
        { selector: 'img', format: 'skip' }
      ]
    }).slice(0, 5000);

  return {
    url,
    status,
    loadTime,
    hasGTM,
    hasFB,
    hasGA,
    hasSSL,
    textContent,
    isSocial
  };
}

async function analyzeWithGemini(data: any, url: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = data.isSocial
    ? `
    Eres el "Analizador Sherlock de Leads" de BTraffic. 
    Has detectado que el cliente NO tiene web o prefiere usar su Red Social: ${url}.

    DATOS TÉCNICOS:
    - Plataforma Detectada: Redes Sociales
    - Fuga Crítica: Falta de control de datos (el algoritmo es dueño de su audiencia).

    INSTRUCCIONES PARA EL REPORTE:
    1. Enfócate en la "Dependencia del Algoritmo" como la mayor fuga de dinero.
    2. Explica cómo la falta de una web/funtel propia hace que cada lead sea más caro.
    3. Propón la creación de un "Ecosistema de Captura" (Landing + Automatización DM).
    4. Usa títulos: "DIAGNÓSTICO SOCIAL", "FUGAS DE DINERO (AUDIENCIA LENTADA)", "ESTRATEGIA DE PROPIEDAD DIGITAL".
    5. Formato: Markdown limpio.
    Escribe en Castellano.
    `
    : `
    Eres el "Analizador Sherlock de Leads" de BTraffic, un consultor forense de negocios digital de élite.
    Tu objetivo es encontrar "Fugas de Dinero" en el activo digital de un cliente potencial.

    DATOS TÉCNICOS DE LA WEB:
    - URL: ${url}
    - SSL Activo: ${data.hasSSL ? 'SÍ' : 'NO'}
    - Tiempo de carga detectado: ${data.loadTime}ms
    - Google Tag Manager: ${data.hasGTM ? 'SÍ' : 'NO'}
    - Facebook Pixel: ${data.hasFB ? 'SÍ' : 'NO'}
    - Google Analytics: ${data.hasGA ? 'SÍ' : 'NO'}

    INSTRUCCIONES PARA EL REPORTE:
    1. Sé directo y pragmático.
    2. Usa títulos claros: "DIAGNÓSTICO TÉCNICO", "FUGAS DE DINERO DETECTADAS", "ARQUITECTURA DE REPARACIÓN".
    3. Cuantifica el daño (ej: "Estás perdiendo un ~15% de conversión por falta de píxel").
    4. Usa un tono de autoridad técnica de BTraffic.
    5. Formato: Markdown limpio.

    Escribe el reporte en Castellano.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function sendReportEmail(email: string, url: string, analysis: string, auditData: any) {
  const htmlAnalysis = marked.parse(analysis);

  const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 40px; }
            .badge { background: rgba(162, 255, 0, 0.1); border: 1px solid #A2FF00; color: #A2FF00; padding: 5px 15px; border-radius: 50px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: inline-block; }
            .title { font-size: 32px; font-weight: 900; color: #ffffff; text-transform: uppercase; margin: 20px 0; letter-spacing: -1px; }
            .card { background: #111111; border: 1px solid #222222; border-radius: 24px; padding: 30px; margin-bottom: 30px; }
            .tech-item { background: #1a1a1a; padding: 15px; border-radius: 12px; border: 1px solid #333333; }
            .tech-label { font-size: 10px; color: #666; font-weight: bold; text-transform: uppercase; }
            .tech-value { font-size: 14px; font-weight: bold; color: #A2FF00; }
            .analysis-content { color: #cccccc; line-height: 1.6; font-size: 15px; }
            .analysis-content h1, .analysis-content h2, .analysis-content h3 { color: #ffffff; text-transform: uppercase; font-size: 18px; margin-top: 30px; border-left: 3px solid #A2FF00; padding-left: 15px; }
            .analysis-content p { margin: 15px 0; }
            .analysis-content strong { color: #A2FF00; }
            .btn { display: block; background: #A2FF00; color: #000000 !important; text-align: center; padding: 20px; border-radius: 16px; font-weight: 900; text-decoration: none; text-transform: uppercase; font-size: 14px; margin-top: 40px; }
            .footer { text-align: center; margin-top: 60px; border-top: 1px solid #222; padding-top: 30px; }
            .footer-text { font-size: 10px; color: #444; font-weight: bold; letter-spacing: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="badge">Sherlock v2.0 • Forense Digital</div>
              <h1 class="title">REPORTE DE <span style="color: #A2FF00;">FUGAS DE CAPITAL</span></h1>
              <p style="color: #666; font-size: 14px;">Análisis confidencial realizado para: <strong>${url}</strong></p>
            </div>

            <div class="card">
              <div style="margin-bottom: 25px; border-bottom: 1px solid #222; padding-bottom: 15px;">
                <span class="tech-label">Estado del Activo Detectado</span>
              </div>
              
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="50%" style="padding-bottom: 10px;">
                    <div class="tech-item">
                      <div class="tech-label">Tipo de Activo</div>
                      <div class="tech-value">${auditData.isSocial ? 'RED SOCIAL' : 'SITIO WEB'}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-bottom: 10px; padding-left: 10px;">
                    <div class="tech-item">
                      <div class="tech-label">${auditData.isSocial ? 'Plataforma' : 'Seguridad SSL'}</div>
                      <div class="tech-value">${auditData.isSocial ? 'DETECTADA' : (auditData.hasSSL ? 'PROTEGIDO' : 'VULNERABLE')}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <div class="tech-item">
                      <div class="tech-label">Propiedad del Dato</div>
                      <div class="tech-value">${auditData.isSocial ? 'BAJA (ALGORITMO)' : 'ALTA (PROPIEDAD)'}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px;">
                    <div class="tech-item">
                      <div class="tech-label">Fugas de Capital</div>
                      <div class="tech-value">${auditData.isSocial ? 'ALTA PROBABILIDAD' : 'DETECTABLES'}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <div class="analysis-content">
              ${htmlAnalysis}
            </div>

            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34661139454'}?text=Hola%20BTraffic,%20he%20recibido%20mi%20reporte%20Sherlock%20de%20${url}.%20Quiero%20reparar%20mis%20fugas%20de%20capital." class="btn">INICIAR REPARACIÓN ESTRATÉGICA</a>

            <div class="footer">
              <p class="footer-text">© 2026 BTRAFFIC DIGITAL ASSET FACTORY</p>
              <p style="color: #444; font-size: 12px; font-weight: bold;">SIN DATO NO HAY RELATO.</p>
            </div>
          </div>
        </body>
      </html>
    `

  await resend.emails.send({
    from: 'Sherlock <sherlock@btraffic.com>',
    to: email,
    subject: `[CONFIDENCIAL] Reporte Forense: ${url}`,
    html: emailHtml
  });
}
