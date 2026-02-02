
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { CentinelaGuardián } from '../sections/CentinelaGuardian';

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Ocultamos el Navbar principal en el Aula y el Portal de Clientes
    const isAcademy = pathname?.startsWith('/academy');
    const isPortal = pathname?.startsWith('/portal');

    if (isAcademy || isPortal) return null;

    return (
        <>
            <Navbar />
            <CentinelaGuardián />
        </>
    );
}
