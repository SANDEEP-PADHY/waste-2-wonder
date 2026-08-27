/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0f9fa',
          100: '#d7f0f3',
          200: '#b2e2e7',
          300: '#7eccd6',
          400: '#43b0c0',
          500: '#15616D', // Brand Stormy Teal
          600: '#11525d',
          700: '#0e434b',
          800: '#0b353b',
          900: '#072428',
        },
        stormy: {
          teal: '#15616D',
          light: '#1B7B8A',
          dark: '#0E434B',
          soft: '#E8F4F6',
        },
        gunmetal: {
          light: '#5C5C5C',
          DEFAULT: '#3D3D3D',
          dark: '#242424',
        },
        papaya: {
          DEFAULT: '#FFECD1',
          dark: '#FCD8A6',
          light: '#FFF6E9',
        },
        ink: {
          pure: '#000000',
          near: '#080808',
          subtle: '#1C1C1C',
        },
        surface: {
          canvas: '#F8F9FA',
          pure: '#FFFFFF',
          muted: '#F1F3F5',
          subtle: '#E9ECEF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-xs': '1.5px 1.5px 0px #080808',
        'brutal-sm': '2px 2px 0px #080808',
        'brutal': '3px 3px 0px #080808',
        'brutal-md': '4px 4px 0px #080808',
        'brutal-lg': '6px 6px 0px #080808',
        'brutal-xl': '8px 8px 0px #080808',
        'brutal-teal': '4px 4px 0px #15616D',
        'brutal-papaya': '4px 4px 0px #FFECD1',
        'neu-flat': '5px 5px 12px #e5e7eb, -5px -5px 12px #ffffff',
        'neu-inset': 'inset 2px 2px 5px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.8)',
      },
      borderRadius: {
        'brutal': '6px',
        'brutal-lg': '12px',
        'brutal-xl': '18px',
        'brutal-2xl': '24px',
      }
    },
  },
  plugins: [],
}
