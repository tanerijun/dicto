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
		<div>
			<h1 className=" bg-red-400">Hello world</h1>
		</div>
	);
}
