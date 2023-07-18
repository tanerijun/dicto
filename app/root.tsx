import {
	redirect,
	type ActionArgs,
	type LinksFunction,
} from "@remix-run/cloudflare";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";
import styles from "~/globals.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const action = async ({ request }: ActionArgs) => {
	console.log("ACTIONONOONONON");
	const body = await request.formData();
	const word = body.get("query");

	return redirect(`/${word}`);
};

const Document = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

// TODO: Make this theme aware
export function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	return (
		<Document>
			<main className="flex h-screen flex-col items-center justify-center">
				<h1 className="text-4xl font-bold">Application Error</h1>
				<p>This is most likely our issue</p>
				<p className="my-10 select-none text-9xl">😞</p>
				<a
					href="https://github.com/tanerijun/word-bliss/issues/new"
					target="_blank"
					rel="noreferrer"
					className="text-red-400 underline"
				>
					Report the issue
				</a>
				<details className="mt-8">
					<summary className="mb-4 cursor-pointer text-sm">
						View error message
					</summary>
					{isRouteErrorResponse(error) ? (
						<div className="flex flex-col bg-red-50 p-8 text-red-400">
							<h2>
								{error.status} {error.statusText}
							</h2>
							<p>{error.data}</p>
						</div>
					) : error instanceof Error ? (
						<div className="flex flex-col bg-red-50 p-8 text-red-400">
							<h2>Error</h2>
							<p>{error.message}</p>
						</div>
					) : (
						<div className="flex flex-col bg-red-50 p-8 text-red-400">
							<h2>"Unknown error"</h2>
						</div>
					)}
				</details>
			</main>
		</Document>
	);
}
