/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("nativewind/preset")],
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Neon Biological Core - "Emerald & Onyx"
                background: "#050505",
                "background-muted": "#08090a",
                foreground: "#f2f4f7",
                "foreground-muted": "#717d8a",

                primary: "#10b981",
                "primary-soft": "rgba(16, 185, 129, 0.1)",
                "primary-foreground": "#ffffff",

                secondary: "#0f1115",
                "secondary-foreground": "#f2f4f7",

                // Accent palette (Neon)
                sage: "#34d399",
                lavender: "#a78bfa",
                coral: "#f43f5e",
                sand: "#fde68a",

                muted: "#0f1115",
                "muted-foreground": "#6b7280",

                accent: "#0f1115",
                "accent-foreground": "#10b981",

                card: "#08090a",
                "card-foreground": "#f2f4f7",

                border: "rgba(255, 255, 255, 0.08)",
                input: "rgba(255, 255, 255, 0.04)",

                // Glow Core Colors
                "ring-glow": "#10b981",
                "ring-move": "#34d399",
                "ring-mind": "#a78bfa",

                // Glass effects
                glass: "rgba(15, 17, 21, 0.7)",
                "glass-border": "rgba(16, 185, 129, 0.1)",
            },
        },
    },
    plugins: [],
}
