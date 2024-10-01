import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primaryColor: '#FFF500',
                secondaryColor: '#10B1E0',
            },
            keyframes: {
                'scroll-left-right': {
                    '0%, 100%': { transform: 'translateX(100%)' },
                    '50%': { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                'scroll-left-right': 'scroll-left-right 3s linear infinite',
            },
            boxShadow: {
                custom: '6px 7px 4px 0 rgba(0, 0, 0, 1)',
            },
        },
    },
    plugins: [],
}
export default config
