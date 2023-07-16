import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = () => {
	return json({
		message: "HAHA",
	});
};

export default function Test() {
	const data = useLoaderData<typeof loader>();

	return <div>{data.message}</div>;
}
