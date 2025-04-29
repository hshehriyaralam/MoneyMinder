// tailwind.config.js

export const content = [
    "./src/**/*.{js,ts,jsx,tsx}", // apne project path ke mutabiq adjust karein
];
export const theme = {
    extend: {
        colors: {
            // 🧱 Base Colors
            background: "#dedcd8", // App ka overall background


            // 🎨 Primary UI Colors
            primary: "#2563eb", // Buttons, Links, Headings
            primaryHover: "#1d4ed8", // Button hover state


            // 📊 Income/Expense Indicators
            income: "#10b981", // Green for income
            incomeBg: "#ecfdf5", // Light green background
            expense: "#ef4444", // Red for expense
            expenseBg: "#fef2f2", // Light red background


            // 🔳 Cards & Containers
            card: "#ffffff", // Card background
            cardText: "#1f2937", // Primary text inside cards
            cardLabel: "#4b5563", // Secondary text / labels


            // 📈 Chart Colors
            chart1: "#6ee7b7", // Pie/Bar chart segment 1
            chart2: "#fde68a", // Chart segment 2
            chart3: "#fca5a5", // Chart segment 3
            chart4: "#93c5fd", // Chart segment 4


            // 🖋️ Input / Form Fields
            inputBorder: "#d1d5db", // Border for input fields
            inputBg: "#ffffff", // Background of inputs
            inputText: "#1f2937", // Input text color
        },
        borderRadius: {
            card: "0.75rem", // Rounded corners for cards
        },
        boxShadow: {
            card: "0 2px 8px rgba(0, 0, 0, 0.08)", // Subtle card shadow
        },
    },
};
export const plugins = [];
  