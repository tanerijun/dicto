import { json, type LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getWordDefinitionsFromAPI } from "~/lib/api";
import { APIWordDefinitionsSchema } from "~/lib/schema";
import { cleanWordDefinitions } from "~/lib/utils";

export const loader = async ({ params }: LoaderArgs) => {
	const word = params.word;
	if (!word) {
		throw new Response("Invalid path", { status: 400 });
	}

	const data = await getWordDefinitionsFromAPI(word);
	const apiWordDefinitions = APIWordDefinitionsSchema.safeParse(data);
	if (!apiWordDefinitions.success) {
		throw new Response("Error parsing data", { status: 500 });
	}

	const wordDefinition = cleanWordDefinitions(apiWordDefinitions.data);

	// TODO: Caching
	return json({ ...wordDefinition });
};

export default function HomeWordPage() {
	const data = useLoaderData<typeof loader>();

	console.log(data);

	return <div>{data.word}</div>;
}
