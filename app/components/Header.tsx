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

	return <button>Sun</button>;
};

export const Header = () => {
	return (
		<header className="mx-auto flex h-20 max-w-3xl items-center justify-between px-4">
			<Logo />
			<div className="flex gap-4">
				<FontStyleSelector />
				<ThemeToggler />
			</div>
		</header>
	);
};
