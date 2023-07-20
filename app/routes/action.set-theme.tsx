import { type ActionArgs, redirect, json } from "@remix-run/cloudflare";
import { isTheme } from "~/contexts/theme";
import { getSession } from "~/lib/session.server";

export const action = async ({ request, context }: ActionArgs) => {
	const sessionStorage = context.sessionStorage;
	const session = await getSession(request, sessionStorage);
	const body = await request.formData();
	const theme = body.get("theme");

	if (!isTheme(theme)) {
		return json({
			success: false,
			message: `Theme value ${theme} is not a valid theme`,
		});
	}

	session.setTheme(theme);

	return json(
		{ success: true },
		{ headers: { "Set-Cookie": await session.commit() } }
	);
};

export const loader = () => {
	return redirect("/");
};
