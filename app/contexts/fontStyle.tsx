import { createContext, useContext, useState } from "react";

type FontStyle = "sans" | "serif" | "mono";

const FontStyleContext = createContext<
	[FontStyle, React.Dispatch<React.SetStateAction<FontStyle>>] | null
>(null);

// TODO: persist this
export const FontStyleProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [fontStyle, setFontStyle] = useState<FontStyle>("sans");

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
