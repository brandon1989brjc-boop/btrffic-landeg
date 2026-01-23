@echo off
echo ========================================
echo   BTRAFFIC WEB - DEPLOY A VERCEL
echo ========================================
echo.

REM Verificar si Vercel CLI está instalado
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [PASO 1/3] Instalando Vercel CLI...
    npm install -g vercel
) else (
    echo [OK] Vercel CLI ya instalado
)

echo.
echo [PASO 2/3] Verificando Build...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] El build falló. Revisa los errores arriba.
    pause
    exit /b 1
)

echo.
echo [PASO 3/3] Desplegando a producción...
echo.
echo IMPORTANTE: Cuando Vercel pregunte, responde:
echo   - Set up and deploy? Y
echo   - Which scope? (tu cuenta)
echo   - Link to existing project? N (si es primera vez)
echo   - What's your project's name? btraffic-web
echo   - In which directory is your code located? ./
echo.
pause
vercel --prod

echo.
echo ========================================
echo   DEPLOY COMPLETADO
echo ========================================
echo.
echo Ahora ve a Vercel Dashboard y configura las variables de entorno:
echo   - GEMINI_API_KEY
echo   - RESEND_API_KEY
echo   - NEXT_PUBLIC_PORTAL_URL
echo   - NEXT_PUBLIC_SITE_URL
echo   - NEXT_PUBLIC_WHATSAPP_NUMBER
echo.
pause
