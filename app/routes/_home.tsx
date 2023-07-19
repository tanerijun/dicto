import {
	Form,
	Outlet,
	type V2_MetaFunction,
	useNavigate,
	useParams,
	useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Header } from "~/components/Header";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { SearchIcon } from "~/components/icons/SearchIcon";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Dicto" },
		{
			name: "description",
			content: "Dependable little dictionary",
		},
	];
};

const SearchForm = () => {
	const params = useParams();
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		navigate(`/${e.target.value}`);
	};

	const redirectToInput = (e: KeyboardEvent) => {
		if (!inputRef.current || inputRef.current === document.activeElement) {
			return;
		}
		if (e.code.match(/\w/g)) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", redirectToInput);

		return () => {
			window.removeEventListener("keydown", redirectToInput);
		};
	}, []);

	return (
		<Form
			id="search-form"
			className="relative flex rounded-lg bg-zinc-200 dark:bg-zinc-800"
			method="post"
		>
			<input
				ref={inputRef}
				type="search"
				name="query"
				id="search-bar"
				defaultValue={params.word}
				placeholder="Try typing a word"
				autoComplete="off"
				className="flex-1 rounded-lg border-2 border-transparent bg-transparent py-5 pl-5 pr-14 focus:border-violet-500 focus:outline-none"
				onChange={handleInputChange}
			/>
			<button
				type="submit"
				className="absolute right-0 top-1/2 -translate-y-1/2 p-4"
			>
				<SearchIcon className="h-6 w-6 transition-colors hover:text-violet-500" />
			</button>
		</Form>
	);
};

export default function HomeLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state !== "idle";

	return (
		<>
			<Header />
			<main className="mx-auto my-8 flex w-full max-w-3xl flex-1 flex-col gap-12 px-4">
				<SearchForm />

				{isLoading ? (
					<div className="flex flex-1 items-center justify-center">
						<LoadingIndicator />
					</div>
				) : (
					<output
						htmlFor="search-bar"
						form="search-form"
						className="flex flex-1 flex-col"
					>
						<Outlet />
					</output>
				)}
			</main>
		</>
	);
}
