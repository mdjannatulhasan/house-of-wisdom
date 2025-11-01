import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1400px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '4rem',
      },
    },
    colors: {
      blue: {
        50: '#f0f8fe',
        100: '#dceefd',
        200: '#c2e1fb',
        300: '#97d0f9',
        400: '#66b6f4',
        500: '#4397ee',
        600: '#2d7ae3',
        700: '#2565d0',
        800: '#2554ad',
        900: '#234785',
        950: '#1a2c51',
      },
      orange: {
        500: '#F77F00',
      },
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      base: ['"Montserrat"', 'sans-serif'],
      sans: ['"Red Hat Display"', 'sans-serif'],
    },

    extend: {
      colors: {
        primary: {
          ...colors.blue,
          DEFAULT: colors.blue[500],
        },
        default: {
          ...colors.gray,
        },
        secondary: '#747a80',
        success: '#20b799',
        info: '#3cbade',
        warning: '#efb540',
        danger: '#fa5944',
        light: '#e9edf3',
        dark: '#222a3e',
      },
      spacing: {
        '15': '60px',
        '18': '72px',
        'sidenav': '280px',
        'topbar': '80px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      minWidth: (theme: any) => ({
        ...theme('width'),
      }),
      maxWidth: (theme: any) => ({
        ...theme('width'),
      }),
      minHeight: (theme: any) => ({
        ...theme('height'),
      }),
      maxHeight: (theme: any) => ({
        ...theme('height'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }: any) {
      addUtilities({
        '.fill-1': {
          fontVariationSettings: "'FILL' 1",
        },
      });
    }),
  ],
};

export default config;

