# 🧠 Sistema de Inteligencia Groq - Documentación

**Fecha de Integración:** 2026-01-23  
**Modelo:** Llama 3.1 70B Versatile (Groq)  
**Velocidad:** ~10x más rápido que OpenAI GPT-4

---

## 🎯 ¿Qué hace Groq en la Landing?

Groq actúa como el **cerebro inteligente** de BTraffic Agency Web. No es un chatbot visible, sino un **sistema de inteligencia invisible** que:

1. **Cualifica** leads en tiempo real (Score 0-100)
2. **Personaliza** mensajes basados en el perfil del usuario
3. **Genera** argumentos estratégicos a medida
4. **Optimiza** la conversión mejorando la respuesta a cada lead

---

## 🏗️ Arquitectura de Inteligencia

```
USUARIO COMPLETA SHERLOCK
         ↓
┌────────────────────────────┐
│  FASE 1: Sherlock Engine   │  ← Auditoría técnica (Gemini)
│  - Scan de web             │
│  - Detecta tracking        │
│  - Envía reporte email     │
└───────────┬────────────────┘
            ↓
┌────────────────────────────┐
│  FASE 2: Groq Intelligence │  ← Cualificación con IA
│  - Analiza perfil completo │
│  - Score de 0-100          │
│  - Mensaje personalizado   │
└───────────┬────────────────┘
            ↓
┌────────────────────────────┐
│  RESULTADO FINAL           │
│  - Score visible           │
│  - Acción recomendada      │
│  - Mensaje único           │
└────────────────────────────┘
```

---

## 📊 Criterios de Cualificación (Groq)

El modelo analiza 4 dimensiones:

| Dimensión | Peso | Criterio |
|-----------|------|----------|
| **Rol de Decisión** | +40 pts | CEO/Director/Gerente |
| **Revenue** | +30 pts | >$10k USD/mes |
| **Problema Identificado** | +20 pts | Pain point claro (ops, marketing, datos) |
| **Activo Digital** | +10 pts | Web/social activa |

**Clasificación:**
- **70-100 pts:** CANDIDATO POSITIVO → Sesión estratégica
- **50-69 pts:** CANDIDATO POTENCIAL → Argumento a medida
- **0-49 pts:** FASE CIMENTACIÓN → Contenido educativo

---

## 🔧 Endpoints de la API

### **POST /api/intelligence/qualify**

Cualifica un lead basado en sus datos.

**Request:**
```json
{
  "name": "Juan Pérez",
  "role": "CEO/Founder",
  "web": "ejemplo.com",
  "pain": "Operación Dependiente de Mí",
  "revenue": "yes",
  "action": "qualify"
}
```

**Response:**
```json
{
  "success": true,
  "qualification": {
    "isQualified": true,
    "score": 85,
    "recommendedAction": "Agendar sesión estratégica inmediata",
    "personalizedMessage": "Juan, como CEO de ejemplo.com, has identificado el cuello de botella crítico: dependencia operativa. Tu estructura actual está lista para implementar orquestación de agentes. El número de tranquilidad que buscas es alcanzable con automatización quirúrgica."
  },
  "timestamp": "2026-01-23T16:00:00Z"
}
```

---

### **POST /api/intelligence/qualify** (Pitch)

Genera un argumento estratégico personalizado.

**Request:**
```json
{
  "name": "María González",
  "role": "Directora",
  "web": "negocio.es",
  "pain": "Cierre de Ventas Manual",
  "action": "pitch"
}
```

**Response:**
```json
{
  "success": true,
  "pitch": "María, el cierre manual de ventas es el síntoma visible de un problema arquitectónico más profundo...",
  "timestamp": "2026-01-23T16:00:00Z"
}
```

---

## 🚀 Ventajas de Groq vs GPT-4

| Característica | Groq (Llama 3.1 70B) | OpenAI GPT-4 |
|----------------|----------------------|--------------|
| **Velocidad** | ~200 tok/s | ~20 tok/s |
| **Latencia** | <500ms | 2-5s |
| **Costo** | $0.59/$0.79 por 1M tokens | $30/$60 por 1M tokens |
| **Calidad** | ⭐⭐⭐⭐ (excelente) | ⭐⭐⭐⭐⭐ (mejor) |
| **Caso de Uso** | Inferencia ultrarrápida | Razonamiento complejo |

**Conclusión:** Para cualificación en tiempo real, Groq es **ideal** (10x más rápido y 50x más barato).

---

## 🧪 Testing de la Integración

### Test 1: Cualificación Positiva
```bash
curl -X POST http://localhost:3001/api/intelligence/qualify \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test CEO",
    "role": "CEO/Founder",
    "web": "empresa.com",
    "pain": "Operación Dependiente de Mí",
    "revenue": "yes"
  }'
```

**Resultado Esperado:**
- `isQualified: true`
- `score >= 70`
- Mensaje personalizado generado

### Test 2: Fase de Cimentación
```bash
curl -X POST http://localhost:3001/api/intelligence/qualify \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Startup",
    "role": "Estratega",
    "web": "startup.com",
    "pain": "Desconocimiento de Márgenes",
    "revenue": "no"
  }'
```

**Resultado Esperado:**
- `isQualified: false`
- `score < 70`
- Argumento educativo generado

---

## 📈 Métricas de Performance

Una vez en producción, monitorea:

1. **Latencia de Groq:** Target < 1 segundo
2. **% de Análisis Exitosos:** Target > 98%
3. **Tasa de Conversión por Score:**
   - Score 70-100: Target 40% agendan sesión
   - Score 50-69: Target 20% responden
   - Score 0-49: Target 10% engagement

---

## 🔐 Configuración de Variables

Recuerda agregar en Vercel/Netlify:

```bash
GROQ_API_KEY=gsk_...  # Ya configurada en .env.local
```

Para obtener tu API Key: https://console.groq.com/keys

---

## 🎨 UI/UX de la Inteligencia

**Visible al usuario:**
- ✅ Score de 0-100 (badge animado)
- ✅ Acción recomendada (texto dinámico)
- ✅ Mensaje personalizado (generado por IA)

**Invisible (backend):**
- Análisis de rol, revenue, pain
- Generación de pitch a medida
- Almacenamiento de preferencias

---

## 🚨 Manejo de Errores

Si Groq falla (timeout, quota):
- **Fallback:** Usa lógica estática (rol + revenue)
- **No rompe UX:** El usuario siempre ve resultado
- **Log:** Guarda el error para debugging

---

## 📚 Próximos Pasos (Roadmap IA)

1. **Chatbot Visible** (Q1 2026)
   - Widget flotante con Groq
   - Conversación contextual
   - Respuestas en < 500ms

2. **Análisis Predictivo** (Q2 2026)
   - Predicción de LTV del lead
   - Probabilidad de cierre
   - Recomendación de pricing

3. **A/B Testing Automático** (Q3 2026)
   - Groq genera variantes de copy
   - Optimiza headlines en tiempo real

---

**🎉 LA LANDING YA TIENE CEREBRO. AHORA PIENSA POR TI.**
