import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", ...defaultTheme.fontFamily.sans],
				serif: ["Roboto Serif", ...defaultTheme.fontFamily.serif],
				mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
			},
			keyframes: {
				"loading-scale": {
					"0%, 90%, 100%": { transform: "scale(0)" },
					"50%": { transform: "scale(1)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				"icon-rotate": {
					"0%, 100%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(40deg)" },
				},
			},
			animation: {
				"loading-scale": "loading-scale 1s infinite ease-in-out",
				wiggle: "wiggle 1s ease-in-out infinite",
				"icon-rotate": "icon-rotate 1s ease-in-out",
			},
		},
	},
	plugins: [],
} satisfies Config;
