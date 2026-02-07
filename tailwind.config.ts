module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Make sure this covers your file structure!
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        orbitron: ['var(--font-orbitron)'],
        jersey: ["var(--font-jersey)"],
      },
    },
  },
}
