import MunayPortfolio from '@/components/portfolio/MunayPortfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Munay Ecosystem Case Study | Btraffic Agency',
    description: 'Descubre cómo la infraestructura de Btraffic hizo evolucionar el proyecto Munay mediante automatización y el protocolo de cero datos.',
};

export default function MunayPage() {
    return <MunayPortfolio />;
}
