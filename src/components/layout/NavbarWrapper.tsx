
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { CentinelaGuardián } from '../sections/CentinelaGuardian';

export default function NavbarWrapper() {
    const pathname = usePathname();

    // Deberíamos ocultar el Navbar principal en el Academy ya que tiene su propio layout/sidebar
    const isAcademy = pathname?.startsWith('/academy');

    if (isAcademy) return null;

    return (
        <>
            <Navbar />
            <CentinelaGuardián />
        </>
    );
}
