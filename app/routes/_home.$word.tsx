import { json, type LoaderArgs } from "@remix-run/cloudflare";
import {
	isRouteErrorResponse,
	useLoaderData,
	useParams,
	useRouteError,
} from "@remix-run/react";
import { ResultView } from "~/components/ResultView";
import { getWordDefinitionsFromAPI } from "~/lib/api";
import { APIWordDefinitionsSchema } from "~/lib/schema";
import { cleanWordDefinitions } from "~/lib/utils";

export const loader = async ({ params }: LoaderArgs) => {
	const word = params.word;
	if (!word) {
		throw new Response("Invalid path", { status: 400 });
	}

	const data = await getWordDefinitionsFromAPI(word);
	if (!data) {
		throw new Response("No definitions found", {
			status: 404,
			headers: {
				"Cache-Control": `max-age=${60 * 60 * 24 * 365}`,
			},
		});
	}

	const apiWordDefinitions = APIWordDefinitionsSchema.safeParse(data);
	if (!apiWordDefinitions.success) {
		throw new Response("Error parsing data", { status: 500 });
	}

	const wordDefinition = cleanWordDefinitions(apiWordDefinitions.data);

	return json(
		{ ...wordDefinition },
		{
			headers: {
				"Cache-Control": `max-age=${60 * 60 * 24 * 365}`,
			},
		}
	);
};

export default function HomeWordPage() {
	const data = useLoaderData<typeof loader>();

	return <ResultView definitions={data} />;
}

export function ErrorBoundary() {
	const params = useParams();
	const error = useRouteError();

	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<div className="text-center">
				No definition found for the word: "
				<span className="text-violet-500">{params.word}</span>".
			</div>
		);
	}

	return (
		<div className="text-center">
			There was an error loading definition for the word: "
			<span className="text-violet-500">{params.word}</span>".
		</div>
	);
}
