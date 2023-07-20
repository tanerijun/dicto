import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<
	[Theme | null, React.Dispatch<React.SetStateAction<Theme | null>>] | null
>(null);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () =>
	window.matchMedia(prefersDarkMQ).matches ? "dark" : "light";

const clientThemeCode = `
;(() => {
	const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
		? 'dark'
		: 'light';
	const cl = document.documentElement.classList;
	const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
	if (!themeAlreadyApplied) {
		cl.add(theme);
	}
})();
`;

export function NonFlashOfWrongThemeEls() {
	return <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />;
}

export function ThemeProvider({
	children,
	initialTheme,
}: {
	children: React.ReactNode;
	initialTheme?: Theme;
}) {
	const [theme, setTheme] = useState<Theme | null>(() => {
		if (initialTheme) return initialTheme;

		if (typeof window === "undefined") {
			return null;
		}

		return getPreferredTheme();
	});

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
