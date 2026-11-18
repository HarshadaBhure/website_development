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
          light:       '#FFFFFF',   // Dominant primary white
          lightBg:     '#F8FAFC',   // Secondary light background for sections
          lightCard:   '#FFFFFF',   // Card background
          borderLight: '#E2E8F0',   // Subtle light border
          darkText:    '#0F172A',   // Main heading / title text (Slate 900)
          slateText:   '#334155',   // Body text (Slate 700)
          mutedText:   '#64748B',   // Muted gray text (Slate 500)
          
          // Page Accent Colors
          pink:        '#DF038B',   // Vibrant Pink (Primary CTA & highlights)
          cyan:        '#07BEDD',   // Bright Cyan (Secondary buttons & accents)
          yellow:      '#DDD226',   // Accent Yellow/Lime (#DDD226)
          
          // Dark accent for high contrast footer/navy elements if needed
          navy:        '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pink': "radial-gradient(circle at 50% 30%, rgba(223, 3, 139, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
        'hero-cyan': "radial-gradient(circle at 50% 30%, rgba(7, 190, 221, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
        'hero-yellow': "radial-gradient(circle at 50% 30%, rgba(205, 210, 38, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
        'grid-pattern-light': "linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)",
      },
      boxShadow: {
        'soft-pink': '0 10px 30px -10px rgba(223, 3, 139, 0.15)',
        'soft-cyan': '0 10px 30px -10px rgba(7, 190, 221, 0.15)',
        'soft-yellow': '0 10px 30px -10px rgba(205, 210, 38, 0.25)',
      },
      animation: {
        'pulse-slow':     'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':          'float 6s ease-in-out infinite',
        'glow':           'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%':   { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
