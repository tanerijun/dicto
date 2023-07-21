import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { DownArrowIcon } from "./icons/DownArrowIcon";
import { useTheme } from "~/contexts/theme";
import { memo } from "react";
import { useFontStyle } from "~/contexts/fontStyle";
import { capitalize } from "~/lib/utils";
import { Link } from "@remix-run/react";

const Logo = () => {
	return (
		<Link
			to="/"
			className="select-none text-3xl font-bold transition-colors hover:text-violet-500"
		>
			Dicto
		</Link>
	);
};

const FontStyleSelector = () => {
	const [fontStyle, setFontStyle] = useFontStyle();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="group py-2 pl-4 pr-2">
					<div className="flex items-center justify-center gap-1">
						<span>{capitalize(fontStyle)}</span>
						<DownArrowIcon className="h-6 w-6 group-hover:text-violet-500 group-focus:text-violet-500" />
					</div>
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="flex w-36 flex-col gap-2 rounded-lg border bg-white p-2 drop-shadow-md dark:bg-zinc-800"
					sideOffset={5}
				>
					<DropdownMenu.Label className="select-none px-4 py-2 text-sm text-zinc-400 dark:text-zinc-600">
						Font Style
					</DropdownMenu.Label>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg px-4 py-2 font-sans hover:bg-zinc-200 dark:hover:bg-zinc-900"
						onClick={() => setFontStyle("sans")}
					>
						Sans
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg px-4 py-2 font-serif hover:bg-zinc-200 dark:hover:bg-zinc-900"
						onClick={() => setFontStyle("serif")}
					>
						Sans Serif
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg px-4 py-2 font-mono hover:bg-zinc-200 dark:hover:bg-zinc-900"
						onClick={() => setFontStyle("mono")}
					>
						Mono
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

const ThemeToggler = () => {
	const [theme, setTheme] = useTheme();

	function toggleTheme() {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	}

	return (
		<button onClick={toggleTheme} aria-label="toggle-theme">
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
			<div className="flex gap-6">
				<FontStyleSelector />
				<ThemeToggler />
			</div>
		</header>
	);
});
Header.displayName = "Header";
