import type { V2_MetaFunction } from "@remix-run/cloudflare";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Word Bliss" },
		{
			name: "description",
			content: "Elevate Your Vocabulary, Elevate Your Bliss",
		},
	];
};

export default function Index() {
	return (
		<main className="mx-auto max-w-3xl px-4">
			<form id="search-form">
				<input
					type="search"
					name="query"
					id="search-bar"
					defaultValue={"QUERY PARAM"}
				/>
				<button type="submit">Search</button>
			</form>

			<output htmlFor="search-bar" form="search-form">
				TODO
			</output>
		</main>
	);
}
