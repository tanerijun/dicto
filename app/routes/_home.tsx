import { Form, Outlet, useNavigate, useParams } from "@remix-run/react";
import { Header } from "~/components/Header";

// TODO: create action, and redirect user to /${user_input} (for progressive enchancement)
// TODO: make input controlled, and navigate to /${word} onChange (don't forget to debounce)

export default function HomeLayout() {
	const params = useParams();
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// TODO: Debounce
		navigate(`/${e.target.value}`);
	};

	return (
		<>
			<Header />
			<main className="mx-auto my-8 flex max-w-3xl flex-col gap-8 px-4">
				<Form
					id="search-form"
					className="flex rounded-lg border border-yellow-500 bg-gray-200"
					method="post"
				>
					<input
						type="search"
						name="query"
						id="search-bar"
						defaultValue={params.word}
						placeholder="Try typing a word"
						className="flex-1 border border-green-300 bg-transparent p-4"
						onChange={handleInputChange}
					/>
					{/* TODO: Replace with icon */}
					<button type="submit" className="px-4">
						🔎
					</button>
				</Form>

				<output htmlFor="search-bar" form="search-form">
					<Outlet />
				</output>
			</main>
		</>
	);
}
