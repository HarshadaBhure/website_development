/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0F1D',       // Premium Deep Dark Navy
          navy: '#0F172A',       // Rich Navy Slate
          blue: '#1E293B',       // Dark Charcoal Blue
          royal: '#2563EB',      // Primary Vibrant Royal Blue
          lightRoyal: '#3B82F6', // Lighter Royal Accent
          cyan: '#06B6D4',       // Tech Glow Cyan Accent
          indigo: '#6366F1',     // Modern Accent Indigo
          cardBg: '#131C31',     // Dark Card Background
          cardBorder: '#1E293B', // Subtle Border
          lightBg: '#F8FAFC',    // Off White Light Section
          grayText: '#94A3B8'    // Soft Text Gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.15) 0%, rgba(10, 15, 29, 0) 70%)",
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)"
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(37, 99, 235, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
