
export const MOCK_PROJECT = {
    id: 'munay-123',
    name: 'Ecosistema Munay',
    client_name: 'Munay',
    industry: 'gastronomia',
    description: 'Sistema de menús inteligentes y reservas automatizadas.',
    status: 'building',
    progress_percent: 35,
    north_star_metric: 'Ticket Promedio',
    north_star_target: '35€',
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-02-01T14:30:00Z'
};

export const MOCK_VAULT = [
    {
        id: 'v1',
        title: 'Acceso Panel WordPress',
        category: 'cms',
        service_url: 'https://munay.com/wp-admin',
        username: 'admin_munay',
        encrypted_password: 'munay_secure_pass', // In real app, this is encrypted
        notes: 'Credenciales de superadmin. No compartir.'
    },
    {
        id: 'v2',
        title: 'Stripe Dashboard',
        category: 'finance',
        service_url: 'https://dashboard.stripe.com',
        username: 'finanzas@munay.com',
        encrypted_password: 'stripe_live_key_...',
        notes: 'Para verificar pagos y disputas.'
    },
    {
        id: 'v3',
        title: 'OpenAI API Key',
        category: 'api',
        service_url: 'https://platform.openai.com',
        username: 'N/A',
        encrypted_password: 'sk-proj-munay...',
        notes: 'Llave rotativa para agentes de ventas.'
    }
];

export const MOCK_TIMELINE = [
    {
        id: 't1',
        event_type: 'milestone',
        description: 'Inicio del Proyecto: Fase Discovery',
        actor: 'system',
        created_at: '2026-01-20T10:00:00Z',
        metadata: { badge: 'Start' }
    },
    {
        id: 't2',
        event_type: 'approval',
        description: 'Blueprint de Arquitectura Aprobado',
        actor: 'consultor',
        created_at: '2026-01-25T16:20:00Z',
        metadata: { document: 'blueprint_v1.pdf' }
    },
    {
        id: 't3',
        event_type: 'dev',
        description: 'Despliegue de Agentes de Voz (Vapi)',
        actor: 'architect',
        created_at: '2026-02-01T09:15:00Z',
        metadata: { status: 'success' }
    }
];
