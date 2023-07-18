import { useState } from "react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

const Logo = () => {
	return <div className="bold text-3xl">Word Bliss</div>;
};

const FontStyleSelector = () => {
	// TODO: make button show a dropdown menu with font styles
	// should probably contain a <select>
	// and mutate a context on selection

	return <button>Sans</button>;
};

const ThemeToggler = () => {
	// TODO: read and mutate theme context
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const handleClick = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<button onClick={handleClick}>
			{theme === "light" ? <SunIcon /> : <MoonIcon />}
		</button>
	);
};

export const Header = () => {
	return (
		<header className="mx-auto flex h-20 w-full max-w-3xl items-center justify-between px-4">
			<Logo />
			<div className="flex gap-4">
				<FontStyleSelector />
				<ThemeToggler />
			</div>
		</header>
	);
};
