import {
	type SessionStorage,
	logDevReady,
	createCookieSessionStorage,
} from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

interface Env {
	// Environment variables (Cloudflare globals)
	SESSION_SECRET: string;

	// Utilities
	sessionStorage: SessionStorage;
}

type Context = EventContext<Env, string, unknown>;

if (process.env.NODE_ENV === "development") {
	logDevReady(build);
}

declare module "@remix-run/server-runtime" {
	interface AppLoadContext extends Env {}
}

export const onRequest = createPagesFunctionHandler({
	build,
	getLoadContext: (context: Context) => {
		const sessionSecret = context.env.SESSION_SECRET;
		if (!sessionSecret) {
			throw new Error("SESSION_SECRET must be set");
		}

		// Need to setup sessionStorage through request context because
		// env variables (in this case: SESSION_SECRET) are only accessible through context.env
		// when using Cloudflare pages.
		const sessionStorage = createCookieSessionStorage({
			cookie: {
				name: "dicto_session",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				path: "/",
				sameSite: "lax",
				secrets: [sessionSecret],
			},
		});

		return {
			env: context.env, // bindings passed by Cloudflare, type unknown
			...context.env, // destructured bindings with type safety
			sessionStorage,
		};
	},
	mode: process.env.NODE_ENV,
});
