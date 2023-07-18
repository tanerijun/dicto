import {
	Form,
	Outlet,
	type V2_MetaFunction,
	useNavigate,
	useParams,
} from "@remix-run/react";
import { Header } from "~/components/Header";
import { SearchIcon } from "~/components/icons/SearchIcon";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Word Bliss" },
		{
			name: "description",
			content: "Elevate Your Vocabulary, Elevate Your Bliss",
		},
	];
};

export default function HomeLayout() {
	const params = useParams();
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		navigate(`/${e.target.value}`);
	};

	return (
		<>
			<Header />
			<main className="mx-auto my-8 flex max-w-3xl flex-col gap-12 px-4">
				<Form
					id="search-form"
					className="flex rounded-lg bg-gray-200"
					method="post"
				>
					<input
						type="search"
						name="query"
						id="search-bar"
						defaultValue={params.word}
						placeholder="Try typing a word"
						className="flex-1 bg-transparent p-4 focus:outline-none"
						onChange={handleInputChange}
					/>
					{/* TODO: Replace with icon */}
					<button type="submit" className="px-4">
						<SearchIcon />
					</button>
				</Form>

				<output htmlFor="search-bar" form="search-form">
					<Outlet />
				</output>
			</main>
		</>
	);
}
