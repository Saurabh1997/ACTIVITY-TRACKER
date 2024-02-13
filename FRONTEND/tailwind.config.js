/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "body-default":
          "url('https://i.pinimg.com/originals/3d/1e/d4/3d1ed43517f666087f197418c60d9059.jpg')",
      },
      height: ["450px"],
    },
  },
  plugins: [],
};
