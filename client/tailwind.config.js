/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        488: '50rem',
      },
      borderRadius: {
        'large': '12px',
        'pd': '20px',
      },
      boxShadow: {
        'sm': '-5px 0px 2px 0 rgb(0 0 0 / 0.08)',
        'header': '-1px 7px 0px 0px rgba(0,0,0,0.12)',
      },
      colors: {
        'red-cus': '#f7434c',
        'orange-cus': '#ff8949',
      },
      spacing: {
        '100': '16.875rem',
      },
      height: {
        '100': '22.5rem',
      },
    },
  },
  plugins: [],
}
