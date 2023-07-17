import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header";

// TODO: create action, and redirect user to /${user_input} (for progressive enchancement)
// TODO: make input controlled, and navigate to /${word} onChange (don't forget to debounce)

export default function HomeLayout() {
	return (
		<>
			<Header />
			<main className="mx-auto my-8 flex max-w-3xl flex-col gap-8 px-4">
				<form
					id="search-form"
					className="flex rounded-lg border border-yellow-500 bg-gray-200"
				>
					<input
						type="search"
						name="query"
						id="search-bar"
						defaultValue={""} // TODO: get value from params
						placeholder="Try typing a word"
						className="flex-1 border border-green-300 bg-transparent p-4"
					/>
					{/* TODO: Replace with icon */}
					<button type="submit" className="px-4">
						🔎
					</button>
				</form>

				<output htmlFor="search-bar" form="search-form">
					<Outlet />
				</output>
			</main>
		</>
	);
}
