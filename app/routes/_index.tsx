import {
	json,
	type LoaderArgs,
	type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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
				{!query
					? "Search for a word!"
					: definitions
					? definitions.word
					: "No definitions found"}
			</output>
		</main>
	);
}
