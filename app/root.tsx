import {
	redirect,
	type ActionArgs,
	type LoaderArgs,
	type LinksFunction,
	json,
} from "@remix-run/cloudflare";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import {
	NonFlashOfWrongThemeEls,
	ThemeProvider,
	useTheme,
} from "./contexts/theme";
import { FontStyleProvider, useFontStyle } from "~/contexts/fontStyle";
import { getSession } from "~/lib/session.server";
import clsx from "clsx";
import styles from "~/globals.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto+Serif:wght@400;700&family=Roboto:wght@400;700&display=swap",
	},
	{
		rel: "apple-touch-icon",
		sizes: "180x180",
		href: "/apple-touch-icon.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "/favicon-32x32.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "/favicon-16x16.png",
	},
	{
		rel: "manifest",
		href: "/site.webmanifest",
	},
];

export const loader = async ({ request, context }: LoaderArgs) => {
	const sessionStorage = context.sessionStorage;
	const session = await getSession(request, sessionStorage);

	const theme = session.getTheme();
	const fontStyle = session.getFontStyle();

	return json({
		theme,
		fontStyle,
	});
};

export const action = async ({ request }: ActionArgs) => {
	const body = await request.formData();
	const word = body.get("query");

	return redirect(`/${word}`);
};

const Document = ({ children }: { children: React.ReactNode }) => {
	const [theme] = useTheme();
	const [fontStyle] = useFontStyle();

	return (
		<html lang="en" className={clsx(`font-${fontStyle}`, theme)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
				<NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
			</head>
			<body className="flex min-h-screen flex-col bg-white dark:bg-zinc-900 dark:text-zinc-200">
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default function App() {
	const { theme, fontStyle } = useLoaderData<typeof loader>();

	return (
		<ThemeProvider initialTheme={theme}>
			<FontStyleProvider initialFontStyle={fontStyle}>
				<Document>
					<Outlet />
				</Document>
			</FontStyleProvider>
		</ThemeProvider>
	);
}

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
