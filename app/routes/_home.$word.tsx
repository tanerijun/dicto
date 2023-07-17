import { type LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = ({ params }: LoaderArgs) => {
	return params.word;
};

export default function HomeWordPage() {
	const data = useLoaderData<typeof loader>();

	return <div>{data}</div>;
}
