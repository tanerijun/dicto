import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
	return typeof value === "string" && (value === "light" || value === "dark");
}

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

export function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
	// Only run on first visit by user
	// On subsequent visits, theme value will come from cookie
	return (
		<>
			{ssrTheme ? null : (
				<script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
			)}
		</>
	);
}

export function ThemeProvider({
	children,
	initialTheme = null,
}: {
	children: React.ReactNode;
	initialTheme: Theme | null;
}) {
	const [theme, setTheme] = useState<Theme | null>(() => {
		if (initialTheme) return initialTheme;

		if (typeof window === "undefined") {
			return null;
		}

		return getPreferredTheme();
	});

	const persistTheme = useFetcher();
	// Fetcher state will change on submit, from "idle" to "submitting". In this case though, we only want to run it when theme is changing
	const persistThemeRef = useRef(persistTheme);
	useEffect(() => {
		persistThemeRef.current = persistTheme;
	}, [persistTheme]);

	// Prevent effect from running on initial render
	const mountRun = useRef(false);

	useEffect(() => {
		if (!mountRun.current) {
			mountRun.current = true;
			return;
		}

		if (!theme) {
			return;
		}

		persistThemeRef.current.submit(
			{ theme },
			{ action: "/action/set-theme", method: "post" }
		);
	}, [theme]);

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
