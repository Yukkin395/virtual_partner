/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kiwi: ['Kiwi Maru', 'sans-serif'],
      },
      backgroundImage: {
        'custom-image': "url('/background/beach_station.jpg')",
      },
      keyframes: {
        'niconico-scroll': {
          '0%': { transform: 'translateX(400%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'niconico-scroll': 'niconico-scroll 5s linear forwards',
      },
    },
  },
  plugins: [],
}