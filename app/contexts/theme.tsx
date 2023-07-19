import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<
	[Theme, React.Dispatch<React.SetStateAction<Theme>>] | null
>(null);

// TODO: persist theme
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
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
