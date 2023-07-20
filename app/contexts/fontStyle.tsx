import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type FontStyle = "sans" | "serif" | "mono";

export function isFontStyle(value: unknown): value is FontStyle {
	return (
		typeof value === "string" &&
		(value === "sans" || value === "serif" || value === "mono")
	);
}

const FontStyleContext = createContext<
	[FontStyle, React.Dispatch<React.SetStateAction<FontStyle>>] | null
>(null);

export const FontStyleProvider = ({
	children,
	initialFontStyle = null,
}: {
	children: React.ReactNode;
	initialFontStyle: FontStyle | null;
}) => {
	const [fontStyle, setFontStyle] = useState<FontStyle>(() => {
		if (initialFontStyle) {
			return initialFontStyle;
		}

		return "sans";
	});

	const persistFontStyle = useFetcher();
	// Fetcher state will change on submit, from "idle" to "submitting". In this case though, we only want to run it when fontStyle is changing
	const persistFontStyleRef = useRef(persistFontStyle);
	useEffect(() => {
		persistFontStyleRef.current = persistFontStyle;
	}, [persistFontStyle]);

	// Prevent effect from running on initial render
	const mountRun = useRef(false);

	useEffect(() => {
		if (!mountRun.current) {
			mountRun.current = true;
			return;
		}

		if (!fontStyle) {
			return;
		}

		persistFontStyleRef.current.submit(
			{ "font-style": fontStyle },
			{ action: "/action/set-fontstyle", method: "post" }
		);
	}, [fontStyle]);

	return (
		<FontStyleContext.Provider value={[fontStyle, setFontStyle]}>
			{children}
		</FontStyleContext.Provider>
	);
};

export const useFontStyle = () => {
	const context = useContext(FontStyleContext);

	if (!context) {
		throw new Error(
			"Could not find FontStyleContext, please ensure the component is wrapped in a <FontStyleProvider>"
		);
	}

	return context;
};
