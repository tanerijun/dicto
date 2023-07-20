import { type ActionArgs, redirect, json } from "@remix-run/cloudflare";
import { isFontStyle } from "~/contexts/fontStyle";
import { getSession } from "~/lib/session.server";

export const action = async ({ request, context }: ActionArgs) => {
	const sessionStorage = context.sessionStorage;
	const session = await getSession(request, sessionStorage);
	const body = await request.formData();
	const fontStyle = body.get("font-style");

	if (!isFontStyle(fontStyle)) {
		return json({
			success: false,
			message: `Theme value ${fontStyle} is not a valid theme`,
		});
	}

	session.setFontStyle(fontStyle);

	return json(
		{ success: true },
		{ headers: { "Set-Cookie": await session.commit() } }
	);
};

export const loader = () => {
	return redirect("/");
};
