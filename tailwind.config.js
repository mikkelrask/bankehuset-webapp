module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
        width: {
          '1/2-4': 'calc(50% - 8px)',
          '1/3-4': 'calc(33% - 8px)',
          '2/3-4': 'calc(66% - 8px)',
          '1/4-4': 'calc(25% - 8px)',
        },
        margin: {
          '4px': '-4px',
        },  
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
