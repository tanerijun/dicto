import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { useTheme } from "~/contexts/theme";
import { memo } from "react";

const Logo = () => {
	return <div className="bold text-3xl">Dicto</div>;
};

const FontStyleSelector = () => {
	// TODO: make button show a dropdown menu with font styles
	// should probably contain a <select>
	// and mutate a context on selection

	return <button>Sans</button>;
};

const ThemeToggler = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme}>
			{theme === "light" ? (
				<SunIcon className="h-6 w-6 animate-icon-rotate hover:animate-wiggle" />
			) : (
				<MoonIcon className="h-6 w-6 animate-icon-rotate hover:animate-wiggle" />
			)}
		</button>
	);
};

export const Header = memo(() => {
	return (
		<header className="mx-auto flex h-20 w-full max-w-3xl items-center justify-between px-4">
			<Logo />
			<div className="flex gap-4">
				<FontStyleSelector />
				<ThemeToggler />
			</div>
		</header>
	);
});
Header.displayName = "Header";
