'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * BtrafficTracker: El "Ojo de Agamotto" del ecosistema.
 * Escucha pasivamente todas las interacciones marcadas con 'data-track'
 * y las reporta al Command Center para su procesamiento forense.
 */
export function BtrafficTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Generar o recuperar session_id
        let sessionId = '';
        if (typeof window !== 'undefined') {
            sessionId = localStorage.getItem('btraffic_session_id') || '';
            if (!sessionId) {
                sessionId = `sess_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
                localStorage.setItem('btraffic_session_id', sessionId);
            }
        }

        const handleInteraction = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackElement = target.closest('[data-track]');

            if (trackElement) {
                const htmlElement = trackElement as HTMLElement;
                const eventName = trackElement.getAttribute('data-track');

                const meta = {
                    text: htmlElement.innerText?.substring(0, 50),
                    id: htmlElement.id,
                    className: htmlElement.className,
                    tagName: htmlElement.tagName,
                    href: (htmlElement as any).href
                };

                try {
                    // Enviar al Command Center
                    await fetch('http://localhost:3000/api/web-events', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            event: eventName,
                            path: pathname,
                            sessionId,
                            metadata: meta,
                            userEmail: localStorage.getItem('btraffic_user_email') || null
                        }),
                        mode: 'no-cors'
                    });

                    console.log(`📊 TRACKED: ${eventName}`, meta);
                } catch (err) {
                    console.warn('📊 Tracker failed:', err);
                }
            }
        };

        window.addEventListener('click', handleInteraction);

        // Track page view
        const trackPageView = async () => {
            try {
                await fetch('http://localhost:3000/api/web-events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'page_view',
                        path: pathname,
                        sessionId,
                        metadata: { referrer: document.referrer }
                    }),
                    mode: 'no-cors'
                });
            } catch (e) { }
        };

        trackPageView();

        return () => window.removeEventListener('click', handleInteraction);
    }, [pathname]);

    return null;
}
