import React from 'react';

interface AppLogoProps {
    size?: number;
}

/**
 * Logotipo do "Sem Deus, Sem Café"
 * Paleta: marrom café + caramelo dourado + fundo creme
 */
const AppLogo: React.FC<AppLogoProps> = ({ size = 80 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sem Deus, Sem Café"
    >
        {/* Fundo creme */}
        <rect width="100" height="100" rx="22" fill="#7B4A1E" />

        {/* ── VAPOR em forma de CRUZ ── */}
        {/* Haste vertical */}
        <line x1="50" y1="8" x2="50" y2="40" stroke="#F0E3CC" strokeWidth="4.5" strokeLinecap="round" />
        {/* Travessa horizontal */}
        <line x1="36" y1="20" x2="64" y2="20" stroke="#F0E3CC" strokeWidth="4.5" strokeLinecap="round" />
        {/* Vaporzinhos laterais sutis */}
        <path d="M36 40 Q33 34 36 28" stroke="#C49A5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M64 40 Q67 34 64 28" stroke="#C49A5A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* ── XÍCARA ── */}
        {/* Corpo da xícara */}
        <path
            d="M20 44 L23 80 Q23 84 27 84 L68 84 Q72 84 72 80 L75 44 Z"
            fill="#F0E3CC"
        />
        {/* Alça da xícara */}
        <path
            d="M72 54 Q86 54 86 65 Q86 76 72 76"
            stroke="#F0E3CC"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
        />
        {/* Linha do café dentro da xícara */}
        <path
            d="M25 57 L70 57"
            stroke="#C49A5A"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
        />
        {/* Pequena cruz dentro da xícara */}
        <line x1="47" y1="64" x2="47" y2="78" stroke="#7B4A1E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="71" x2="54" y2="71" stroke="#7B4A1E" strokeWidth="2.5" strokeLinecap="round" />

        {/* Detalhe dourado na borda */}
        <rect width="100" height="100" rx="22" fill="none" stroke="#C49A5A" strokeWidth="2" opacity="0.4" />
    </svg>
);

export default AppLogo;
