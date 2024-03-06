/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      fontFamily: {
       mono: "Space Mono",
       sans: "Open Sans",
       poppins : "Poppins"
      },
      backgroundImage : {
        "header" : "url('https://temp-mail.org/js/images/header-bg.jpg')"
      }
    },
  },
  plugins: [require("daisyui")],
}

