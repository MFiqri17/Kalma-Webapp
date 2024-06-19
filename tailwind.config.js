import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        "kalma-blue": {
          "50": '#eaf4f5',
          "100": '#bfddde',
          "200": '#9fcdcf',
          "300": '#74b6b9',
          "400": '#59a8ab',
          "500": '#2f9296',
          "600": '#2b8589',
          "700": '#21686b',
          "800": '#1a5053',
          "900": '#143d3f'
        }, 
        "kalma-grey": {
          "50": '#fefefe',
          "100": '#fcfbfb',
          "200": '#fbf9f9',
          "300": '#f9f6f6',
          "400": '#f8f4f4',
          "500": '#f6f1f1',
          "600": '#e0dbdb',
          "700": '#afabab',
          "800": '#878585',
          "900": '#676565'
        },
        "kalma-black": {
          "50": '#ececec',
          "100": '#c3c3c3',
          "200": '#a6a6a6',
          "300": '#7d7d7d',
          "400": '#646464',
          "500": '#3d3d3d',
          "600": '#383838',
          "700": '#2b2b2b',
          "800": '#222222',
          "900": '#1a1a1a'
        },
        "kalma-cream": {
          "50": '#fefdfd',
          "100": '#faf8f8',
          "200": '#f8f4f4',
          "300": '#f5efef',
          "400": '#f3ecec',
          "500": '#f0e7e7',
          "600": '#dad2d2',
          "700": '#aaa4a4',
          "800": '#847f7f',
          "900": '#656161'
        }
      },
      maxHeight: {
        '500': '500px',
        '700': '700px',
      },
      width: {
        '500': '500px'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
