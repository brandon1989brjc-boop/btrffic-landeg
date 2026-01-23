import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Índice de Ecosistemas | BTraffic Agency',
    description: 'Explora los proyectos activos y la evolución de los ecosistemas digitales integrados por BTraffic.',
};

export default function PortfolioPage() {
    return <PortfolioGrid />;
}
