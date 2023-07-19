import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<{
	theme: Theme;
	toggleTheme: () => void;
} | null>(null);

// TODO: persist theme
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	function toggleTheme() {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error(
			"Could not find ThemeContext, please ensure the component is wrapped in a <ThemeProvider>"
		);
	}

	return context;
}
