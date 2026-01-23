# 🚀 BTraffic Agency Web - Checklist de Lanzamiento

**Fecha de Parches:** 2026-01-23  
**Estado:** ✅ LISTO PARA PRODUCCIÓN (Requiere configuración de API Keys)

---

## ✅ Parches Aplicados

### 1. **Configuración de Entorno** ✅
- Creado `.env.local` con variables de entorno
- Agregado `.gitignore` para proteger las credenciales
- URLs dinámicas configurables sin cambios de código

### 2. **Fixes Críticos** ✅
- ✅ **Navbar "Acceso Clientes"**: Ahora usa `NEXT_PUBLIC_PORTAL_URL` en lugar de localhost
- ✅ **Validación Sherlock**: Regex para validar URLs antes de consumir API de Gemini
- ✅ **User-Agent Stealth**: Cambiado a Chrome real para evitar bloqueos WAF
- ✅ **WhatsApp Dinámico**: Número configurable vía `NEXT_PUBLIC_WHATSAPP_NUMBER`

### 3. **Optimizaciones** ✅
- ✅ **Lazy Loading**: SherlockWidget carga bajo demanda (mejora FCP)
- ✅ **Build Exitoso**: Compilación sin errores (Exit code: 0)

---

## 🔐 Configuración Pre-Despliegue (CRÍTICO)

Antes de lanzar, **DEBES** editar el archivo `.env.local` con tus credenciales reales:

```bash
# 📍 Ubicación: d:/btraffic 2.0/01_Apps/agency-web/.env.local

# 1. Obtén tu API Key de Google Gemini en: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=TU_CLAVE_REAL_AQUI

# 2. Obtén tu API Key de Resend en: https://resend.com/api-keys
RESEND_API_KEY=TU_CLAVE_REAL_AQUI

# 3. URL del Command Center en producción
NEXT_PUBLIC_PORTAL_URL=https://app.btraffic.io

# 4. Número de WhatsApp sin espacios (formato internacional)
NEXT_PUBLIC_WHATSAPP_NUMBER=34661139454
```

**⚠️ IMPORTANTE:** No subas el archivo `.env.local` a Git. Ya está protegido en `.gitignore`.

---

## 🚀 Comandos de Despliegue

### Opción A: Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Desde el directorio del proyecto
cd "d:/btraffic 2.0/01_Apps/agency-web"

# 3. Deploy
vercel --prod
```

**Configurar Variables en Vercel:**
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las 4 variables del `.env.local`

### Opción B: Netlify

```bash
# 1. Build local
npm run build

# 2. Deploy carpeta .next
netlify deploy --prod --dir=.next
```

### Opción C: VPS/Server Propio

```bash
# 1. Build producción
npm run build

# 2. Iniciar servidor
npm start

# O con PM2 para mantenerlo activo 24/7
pm2 start npm --name "btraffic-web" -- start
pm2 save
```

---

## 🧪 Testing Pre-Lanzamiento

### Test 1: Sherlock Widget
1. Abre la web en local: `npm run dev`
2. Scroll hasta "¿Es su negocio un Candidato BTraffic?"
3. Completa el formulario con una URL real (ej: `google.com`)
4. Verifica que:
   - ✅ La validación funciona (URLs inválidas bloquean el botón)
   - ✅ El análisis se ejecuta (animación de carga)
   - ✅ Recibes el email de Resend con el reporte

### Test 2: Botón "Acceso Clientes"
1. Click en "Acceso Clientes" en el navbar
2. Verifica que redirige a tu Command Center (no a localhost)

### Test 3: WhatsApp
1. Completa el flujo de Sherlock
2. Click en el botón de WhatsApp
3. Verifica que el mensaje incluye tu nombre y datos

---

## 📊 Métricas de Éxito Post-Lanzamiento

Una vez en producción, monitorea:

1. **Performance (Google Lighthouse)**
   - Target: Performance Score > 85
   - First Contentful Paint < 1.5s
   - Largest Contentful Paint < 2.5s

2. **Conversión Sherlock**
   - % de usuarios que completan el formulario
   - % de emails enviados vs errores
   - Tasa de clicks en WhatsApp

3. **Errores de Consola**
   - Monitorear en Vercel Analytics o Sentry
   - Alertar si hay picos de errores 500

---

## 🐛 Troubleshooting

### Problema: "Missing API Key" en Sherlock
**Solución:** Verifica que `GEMINI_API_KEY` y `RESEND_API_KEY` están configuradas en Vercel/Netlify.

### Problema: WhatsApp no redirige
**Solución:** Verifica que `NEXT_PUBLIC_WHATSAPP_NUMBER` no tiene espacios ni caracteres especiales.

### Problema: Build falla en producción
**Solución:** Ejecuta `npm run build` localmente. Si pasa, el error es de configuración del servidor.

---

## 📞 Contacto de Emergencia

Si hay problemas críticos post-lanzamiento:
- **Error 500 masivo:** Revisar logs de Vercel/Server
- **Sherlock no funciona:** Verificar créditos de Gemini API
- **Emails no llegan:** Revisar dashboard de Resend

---

**🎯 Próximos Pasos Post-Lanzamiento:**
1. Configurar Google Analytics 4
2. Implementar Pixel de Meta
3. Activar Hotjar para mapas de calor
4. A/B Test del headline principal

**¡LA WEB ESTÁ LISTA PARA FACTURAR! 💰**
