import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                btraffic: {
                    lime: "#A2FF00",
                    blue: "#00E4FF",
                    purple: "#8E2DE2",
                    dark: "#050505",
                    gray: "#1A1A1A",
                }
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(to right, #A2FF00, #00E4FF, #8E2DE2)',
                'hero-mesh': 'radial-gradient(at 0% 0%, rgba(162, 255, 0, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(142, 45, 226, 0.15) 0, transparent 50%)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        },
    },
    plugins: [],
};
export default config;
