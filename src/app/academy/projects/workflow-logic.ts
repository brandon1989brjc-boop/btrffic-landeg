export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface BtrafficTask {
    id: string;
    label: string;
    description: string;
    status: TaskStatus;
    estimatedTime: string; // in minutes/hours
    actualTime?: number; // in seconds
    templateUrl?: string;
    outputUrl?: string;
    category: 'strategy' | 'technical' | 'data' | 'launch';
    materials?: { label: string; url: string; type: 'doc' | 'video' | 'link' }[];
}

export interface BtrafficPhase {
    id: string;
    name: string;
    order: number;
    tasks: BtrafficTask[];
}

export const BTRAFFIC_WORKFLOW_TEMPLATE: BtrafficPhase[] = [
    {
        id: 'diagnosis',
        name: 'Fase 1: Diagnosis (Discovery)',
        order: 1,
        tasks: [
            {
                id: 'd1',
                label: 'Auditoría Forense de Tráfico',
                description: 'Identificar fugas de conversión y calidad del tráfico actual.',
                status: 'pending',
                estimatedTime: '2h',
                category: 'strategy',
                templateUrl: '/templates/audit-forense'
            },
            {
                id: 'd2',
                label: 'Protocolo de Madurez (A/B/C)',
                description: 'Clasificar al cliente y definir el roadmap tecnológico.',
                status: 'pending',
                estimatedTime: '2h',
                category: 'strategy',
                materials: [
                    { label: 'SOP Auditoría', url: '#', type: 'doc' },
                    { label: 'Video Demo Sherlock', url: '#', type: 'video' }
                ]
            },
            {
                id: 'd3',
                label: 'Definición Métrica Norte',
                description: 'Acordar el KPI único que validará el éxito del ecosistema.',
                status: 'pending',
                estimatedTime: '30m',
                category: 'data'
            }
        ]
    },
    {
        id: 'blueprint',
        name: 'Fase 2: Blueprint (Ingeniería)',
        order: 2,
        tasks: [
            {
                id: 'b1',
                label: 'Redacción Manual de Ingeniería',
                description: 'Documento técnico Maestro (ADNB).',
                status: 'pending',
                estimatedTime: '4h',
                category: 'technical',
                templateUrl: '/templates/manual-ingenieria'
            },
            {
                id: 'b2',
                label: 'Arquitectura de Datos & Vector Store',
                description: 'Mapa de conocimiento para la IA.',
                status: 'pending',
                estimatedTime: '3h',
                category: 'data'
            },
            {
                id: 'b3',
                label: 'PRD: Protocolo de Automatización',
                description: 'Definición de flujos n8n y disparadores.',
                status: 'pending',
                estimatedTime: '2h',
                category: 'technical'
            }
        ]
    },
    {
        id: 'infra',
        name: 'Fase 3: Infraestructura & Herramientas',
        order: 3,
        tasks: [
            {
                id: 'i1',
                label: 'Setup VPS Hostinger (KVM2)',
                description: 'Provisionamiento de Ubuntu + Easy Panel. Configuración de IP y acceso root.',
                status: 'pending',
                estimatedTime: '45m',
                category: 'technical'
            },
            {
                id: 'i2',
                label: 'Despliegue de n8n (Versión Estable)',
                description: 'Instalación vía Plantilla Easy Panel. Cambiar tag latest por versión específica.',
                status: 'pending',
                estimatedTime: '30m',
                category: 'technical'
            },
            {
                id: 'i3',
                label: 'Configuración de Dominio & SSL',
                description: 'Apuntar registros A/CNAME y activar HTTPS.',
                status: 'pending',
                estimatedTime: '30m',
                category: 'technical'
            }
        ]
    },
    {
        id: 'database',
        name: 'Fase 4: Bases de Datos & Persistencia',
        order: 4,
        tasks: [
            {
                id: 'db1',
                label: 'Instalación PostgreSQL (Local)',
                description: 'Creación de base de datos en Easy Panel para persistencia de workflows.',
                status: 'pending',
                estimatedTime: '1h',
                category: 'data'
            },
            {
                id: 'db2',
                label: 'Configuración Variables n8n DB',
                description: 'Vincular DB_TYPE, DB_POSTGRESDB y credenciales en Variables de Entorno.',
                status: 'pending',
                estimatedTime: '30m',
                category: 'data'
            },
            {
                id: 'db3',
                label: 'Vector Store (Gemini File Search)',
                description: 'Setup de almacenamiento vectorial vía API de Google para RAG avanzado.',
                status: 'pending',
                estimatedTime: '1h',
                category: 'data'
            }
        ]
    },
    {
        id: 'logic',
        name: 'Fase 5: Lógica & Programación',
        order: 5,
        tasks: [
            {
                id: 'l1',
                label: 'Construcción Swarm de Agentes',
                description: 'Despliegue de bots de atención y prospección en n8n.',
                status: 'pending',
                estimatedTime: '8h',
                category: 'technical',
                materials: [
                    { label: 'Video Setup n8n', url: '#', type: 'video' }
                ]
            },
            {
                id: 'l2',
                label: 'Integración Chatwoot / CRM',
                description: 'Conexión de canales (WhatsApp/IG) y flujo de supervisor humano.',
                status: 'pending',
                estimatedTime: '3h',
                category: 'technical'
            }
        ]
    },
    {
        id: 'launch',
        name: 'Fase 6: Lanzamiento & ROI Forense',
        order: 6,
        tasks: [
            {
                id: 'z1',
                label: 'Activación Monitor de ROI',
                description: 'Reporting automático n8n. Sin dato no hay relato.',
                status: 'pending',
                estimatedTime: '2h',
                category: 'launch'
            },
            {
                id: 'z2',
                label: 'Entrega de Videoteca (Autonomía)',
                description: 'Carga de manuales de uso personalizados para el cliente.',
                status: 'pending',
                estimatedTime: '3h',
                category: 'launch'
            }
        ]
    }
];
