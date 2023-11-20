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
        'login': '-5px 5px 13px 1px rgba(0,0,0,0.49)',
        'signup': '5px 5px 13px 1px rgba(0,0,0,0.49)'
      },
      colors: {
        'red-cus': '#f7434c',
        'category': '#f7464c',
        'btn': '#f84c4c',
        'phone': '#ff6600',
        'orange-cus': '#ff8949',
        'login-left': '#EDF1F4',
        'login-right': '#C3CBDC',
        'signup-left': '#FF5F6D',
        'signup-right': '#FFC371',

      },
      spacing: {
        '100': '16.875rem',
      },
      height: {
        '63': '15.625rem',
        '100': '22.5rem',
        '983': '61.4375rem',
      },
    },
  },
  plugins: [],
}
