// tailwind.config.js
module.exports = {
  // ... other configurations
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: "blob 7s infinite ease-in-out",
        "blob-2s": "blob 7s infinite ease-in-out 2s", // for staggered animation
        "blob-4s": "blob 7s infinite ease-in-out 4s", // for staggered animation
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        'fadeInUp-delay-200': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fadeInUp-delay-400': 'fadeInUp 0.6s ease-out 0.4s forwards',
      },
    },
  },
  plugins: [],
};