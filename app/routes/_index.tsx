import {
	json,
	type LoaderFunction,
	type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Word Bliss" },
		{
			name: "description",
			content: "Elevate Your Vocabulary, Elevate Your Bliss",
		},
	];
};

export const loader: LoaderFunction = ({ request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");

	return json({
		query,
	});
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

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
				{data.query}
			</output>
		</main>
	);
}
