export const theme = {
  colors: {
    background: {
      base: "#dedcd8",      // App ka overall background
      light: "#FFFFFF",     // White
      dark: "#0F172A",      // Dark Navy
      lightAlt: "#F7F7F7",  // Light Gray for sections
      darkAlt: "#1A202C",   // Darker Navy for sections
    },

    // 🖋️ Text Colors
    text: {
      light: "#1E293B",     // Dark Gray
      dark: "#F8FAFC",      // Light Gray
      card: "#1f2937",      // Card text
      label: "#4b5563",     // Secondary text/labels
    },

    // 🎨 Primary UI Colors
    primary: "#2563eb",        // Buttons, Links, Headings
    primaryHover: "#1d4ed8",   // Button hover state
    accent: "#149a65",         // Accent Color (optional use)

    // ✅ Semantic Status Colors
    success: "#10b981",        // Green for income/success
    error: "#ef4444",          // Red for expense/error
    warning: "#FF9900",        // Orange-Yellow (for warning)

    // 💳 Income/Expense Backgrounds
    incomeBg: "#ecfdf5",       // Light green background
    expenseBg: "#fef2f2",      // Light red background

    // 🔳 Card/Containers
    card: "#ffffff",           // Card background

    // 📈 Charts
    chart1: "#6ee7b7",
    chart2: "#fde68a",
    chart3: "#fca5a5",
    chart4: "#93c5fd",

    // 🧾 Forms & Inputs
    inputBorder: "#d1d5db",
    inputBg: "#ffffff",
    inputText: "#1f2937",
  },

  // 🎨 Other Design Tokens (if needed)
  borderRadius: {
    card: "0.75rem", // Rounded corners for cards
  },

  boxShadow: {
    card: "0 2px 8px rgba(0, 0, 0, 0.08)", // Subtle card shadow
  },
};
