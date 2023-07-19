import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { useTheme } from "~/contexts/theme";
import { memo } from "react";
import { useFontStyle } from "~/contexts/fontStyle";
import { capitalize } from "~/lib/utils";

const Logo = () => {
	return <div className="bold text-3xl">Dicto</div>;
};

const FontStyleSelector = () => {
	// TODO: make button show a dropdown menu with font styles
	// should probably contain a <select>
	// and mutate a context on selection
	const [fontStyle, setFontStyle] = useFontStyle();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="padding focus:outline-violet-500">
					{capitalize(fontStyle)}
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="flex w-36 flex-col gap-2 rounded-lg border bg-white p-2 drop-shadow-md"
					sideOffset={10}
				>
					<DropdownMenu.Label className="select-none p-2 text-sm text-zinc-400">
						Font Style
					</DropdownMenu.Label>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg p-2 hover:bg-zinc-200"
						onClick={() => setFontStyle("sans")}
					>
						Sans
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg p-2 hover:bg-zinc-200"
						onClick={() => setFontStyle("serif")}
					>
						Sans Serif
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className="cursor-pointer rounded-lg p-2 hover:bg-zinc-200"
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
