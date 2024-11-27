/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kiwi: ["Kiwi Maru", "sans-serif"],
      },
      backgroundImage: {
        "custom-image": "url('/background/beach_station.jpg')",
      },
      keyframes: {
        "niconico-scroll": {
          "0%": { transform: "translateX(400%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "rotate-135": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(135deg)" },
        },
        "rotate-90": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        "scale-1": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "opacity-1": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "niconico-scroll": "niconico-scroll 5s linear forwards",
        "rotate-135": "rotate-135 0.4s ease forwards",
        "rotate-90": "rotate-90 0.4s ease forwards",
        "scale-1": "scale-1 0.75s ease forwards",
        "opacity-1": "opacity-1 0.4s ease 0.4s forwards",
        spin: "spin 1s linear infinite",
        fade: "fade 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
