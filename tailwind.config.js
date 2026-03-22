/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Dark surface palette
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          700: '#1e293b',
          800: '#0f172a',
          900: '#0a0f1e',
          950: '#06070f',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
        mono:    ['Fira Code', 'ui-monospace', 'monospace'],
        display: ['Inter', 'ui-sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(at 40% 20%, hsla(228,96%,59%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270,76%,65%,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(191,96%,47%,0.08) 0px, transparent 50%)',
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out both',
        'fade-up':       'fadeUp 0.7s ease-out both',
        'fade-left':     'fadeLeft 0.7s ease-out both',
        'fade-right':    'fadeRight 0.7s ease-out both',
        'scale-in':      'scaleIn 0.5s ease-out both',
        'slide-down':    'slideDown 0.35s ease-out both',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out infinite',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'gradient':      'gradientShift 8s ease infinite',
        'blob':          'blob 9s infinite',
        'typing-cursor': 'blink 1s step-end infinite',
        'draw-line':     'drawLine 1.2s ease-out forwards',
        'twinkle':       'twinkle 4s ease-in-out infinite',
        'bounce-slow':   'bounceSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(40px, -60px) scale(1.15)' },
          '66%':  { transform: 'translate(-25px, 25px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        drawLine: {
          from: { transform: 'scaleY(0)', transformOrigin: 'top' },
          to:   { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' },
          '50%':      { opacity: '0.7',  transform: 'scale(1.2)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow-sm':     '0 0 15px rgba(99,102,241,0.25)',
        'glow-md':     '0 0 30px rgba(99,102,241,0.30)',
        'glow-lg':     '0 0 60px rgba(99,102,241,0.35)',
        'glow-cyan':   '0 0 30px rgba(6,182,212,0.30)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.35)',
        'card-dark':   '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.3)',
        'glass':       '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}