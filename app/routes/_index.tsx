import {
	json,
	type LoaderArgs,
	type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ResultView } from "~/components/ResultView";
import { getWordDefinitions } from "~/lib/api";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Word Bliss" },
		{
			name: "description",
			content: "Elevate Your Vocabulary, Elevate Your Bliss",
		},
	];
};

// TODO: consider not using query but use nested route
// Potential for route like this: https://domain.com/hello
export const loader = async ({ request }: LoaderArgs) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");

	if (!query) {
		return json({
			query,
			definitions: null,
		});
	}

	const definitions = await getWordDefinitions(query);

	return json({
		query,
		definitions,
	});
};

export default function Index() {
	const { query, definitions } = useLoaderData<typeof loader>();

	// TODO: debug: delete line
	console.log(definitions);

	return (
		<main className="mx-auto my-8 flex max-w-3xl flex-col gap-8 px-4">
			<form
				id="search-form"
				className="flex rounded-lg border border-yellow-500 bg-gray-200"
			>
				<input
					type="search"
					name="query"
					id="search-bar"
					defaultValue={query || ""}
					placeholder="Try typing a word"
					className="flex-1 border border-green-300 bg-transparent p-4"
				/>
				{/* TODO: Replace with icon */}
				<button type="submit" className="px-4">
					🔎
				</button>
			</form>

			<output htmlFor="search-bar" form="search-form">
				{!query ? (
					"Search for a word!"
				) : definitions ? (
					<ResultView definitions={definitions} />
				) : (
					"No definitions found"
				)}
			</output>
		</main>
	);
}
