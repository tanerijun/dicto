import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				"loading-scale": {
					"0%, 90%, 100%": { transform: "scale(0)" },
					"50%": { transform: "scale(1)" },
				},
			},
			animation: {
				"loading-scale": "loading-scale 1s infinite ease-in-out",
			},
		},
	},
	plugins: [],
} satisfies Config;
