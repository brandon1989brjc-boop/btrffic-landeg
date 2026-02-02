
export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: string;
}

export interface Module {
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | 'FREE';
    tag: string;
    color: string;
    lessonCount: number;
    modules: Module[];
    isPremium: boolean;
}

export const COURSES: Course[] = [
    {
        id: 'estrategas-btraffic',
        title: 'Formación de Estrategas Btraffic',
        description: 'Domina el ADN de Btraffic y conviértete en un arquitecto de sistemas operativos para captar clientes de alto valor.',
        image: '/academy/covers/estrategas.jpg',
        price: 'FREE',
        tag: '¡EMPIEZA AQUÍ!',
        color: 'btraffic-lime',
        lessonCount: 20,
        isPremium: false,
        modules: [
            {
                title: 'Módulo 1: ADN y Mentalidad del Estratega',
                lessons: [
                    { id: '1', title: 'De la Web Pasiva al Activo de Datos', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '2', title: 'La Identidad del Estratega Pragmático', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '3', title: 'El Manifiesto Btraffic', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '4', title: 'Softuarización y Regla 80/20', duration: '1.5h', type: 'VÍDEO + PDF' },
                ]
            },
            {
                title: 'Módulo 2: Infraestructura y Stack Tecnológico',
                lessons: [
                    { id: '5', title: 'Orquestación con n8n', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '6', title: 'Inteligencia con GraphRAG', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '7', title: 'Suite de IA de Google', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '8', title: 'Lógica vs. Agentes', duration: '1.5h', type: 'VÍDEO + PDF' },
                ]
            },
            {
                title: 'Módulo 3: Estrategia de Ventas Forense',
                lessons: [
                    { id: '9', title: 'El Auditor Junior: El Gancho Maestro', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '10', title: 'Protocolos de Arranque y Auditoría en Vivo', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '11', title: 'La Propuesta Irrechazable: ROI Forense', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '12', title: 'El Cierre de Autoridad: Número de Tranquilidad', duration: '1.5h', type: 'VÍDEO + PDF' },
                ]
            },
            {
                title: 'Módulo 4: Operaciones y Modelos de Negocio',
                lessons: [
                    { id: '13', title: 'El Modelo de Alianzas', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '14', title: 'Suscripción y Mantenimiento de Inteligencia', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '15', title: 'Incorporación y la Primera Victoria', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '16', title: 'Reporte de Transparencia: Sin Relato, Solo Dato', duration: '1.5h', type: 'VÍDEO + PDF' },
                ]
            },
            {
                title: 'Módulo 5: Inteligencia Total y Escalado',
                lessons: [
                    { id: '17', title: 'Eficiencia Operativa: Btraffic OS', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '18', title: 'Inteligencia Total: Las 4 Capas del Éxito', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '19', title: 'Diversificación de Portfolio y Sectores', duration: '1.5h', type: 'VÍDEO + PDF' },
                    { id: '20', title: 'El Futuro del Trabajo: Horizonte 2026', duration: '1.5h', type: 'VÍDEO + PDF' },
                ]
            }
        ]
    },
    {
        id: 'automatizacion-avanzada',
        title: 'Arquitectura y Automatización Senior',
        description: 'Flujos complejos en n8n, entrenamiento de LLMs forenses y orquestación masiva de agentes.',
        image: '/academy/covers/advanced.jpg',
        price: 100,
        tag: 'Desbloquear con Premium',
        color: 'btraffic-purple',
        lessonCount: 15,
        isPremium: true,
        modules: [
            {
                title: 'Módulo 1: Fundamentos de Arquitectura Líquida',
                lessons: [
                    { id: 'adv-1', title: 'Pensamiento Modular en n8n', duration: '1h', type: 'WORKSHOP' },
                    { id: 'adv-2', title: 'Webhooks y Gestión de Payloads Masivos', duration: '1.5h', type: 'TALLER' },
                    { id: 'adv-3', title: 'Manejo de Errores y Auto-Healing', duration: '1h', type: 'CLASE' }
                ]
            },
            {
                title: 'Módulo 2: Agentes Autónomos',
                lessons: [
                    { id: 'adv-4', title: 'LangChain y Memoria Vectorial', duration: '2h', type: 'PROYECTO' },
                    { id: 'adv-5', title: 'Creación de Tools Personalizadas', duration: '1.5h', type: 'CÓDIGO' },
                    { id: 'adv-6', title: 'Orquestación Multi-Agente', duration: '2h', type: 'SISTEMA' }
                ]
            },
            {
                title: 'Módulo 3: Infraestructura de Producción',
                lessons: [
                    { id: 'adv-7', title: 'Despliegue en VPS (Docker)', duration: '1h', type: 'TUTORIAL' },
                    { id: 'adv-8', title: 'Seguridad y Gestión de Secretos', duration: '1h', type: 'SEGURIDAD' },
                    { id: 'adv-9', title: 'Escalado Horizontal de Workers', duration: '1.5h', type: 'DEV OPS' }
                ]
            }
        ]
    },
    {
        id: 'ventas-forenses',
        title: 'Psicología y Ventas Basadas en Datos',
        description: 'Cierre de contratos 5-figuras utilizando auditorías en vivo y ganchos de autoridad forense.',
        image: '/academy/covers/sales.jpg',
        price: 100,
        tag: 'Desbloquear con Premium',
        color: 'btraffic-blue',
        lessonCount: 10,
        isPremium: true,
        modules: [
            {
                title: 'Módulo 1: Psicología del Comprador B2B',
                lessons: [
                    { id: 'sales-1', title: 'Decodificando la Intención de Compra', duration: '1h', type: 'VÍDEO' },
                    { id: 'sales-2', title: 'Sospechosos vs Prospectos: El Filtro', duration: '1h', type: 'MATRIZ' },
                    { id: 'sales-3', title: 'Autoridad Instantánea: El Efecto Bata Blanca', duration: '1h', type: 'PSICOLOGÍA' }
                ]
            },
            {
                title: 'Módulo 2: La Auditoría Forense',
                lessons: [
                    { id: 'sales-4', title: 'Anatomía de una Auditoría Irrefutable', duration: '1.5h', type: 'CASO REAL' },
                    { id: 'sales-5', title: 'Herramientas de Espionaje Competitivo', duration: '1h', type: 'TOOLKIT' },
                    { id: 'sales-6', title: 'Presentación de Hallazgos: "El Dolor"', duration: '1.5h', type: 'ROLEPLAY' }
                ]
            },
            {
                title: 'Módulo 3: Cierre y Negociación High-Ticket',
                lessons: [
                    { id: 'sales-7', title: 'Objecciones Técnicas vs Financieras', duration: '1h', type: 'SCRIPTS' },
                    { id: 'sales-8', title: 'El Contrato de Valor (No Precio)', duration: '1h', type: 'LEGAL' },
                    { id: 'sales-9', title: 'Onboarding como Primera Venta', duration: '1h', type: 'SISTEMA' }
                ]
            }
        ]
    }
];
