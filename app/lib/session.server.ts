import { type SessionStorage } from "@remix-run/cloudflare";
import { type Theme, isTheme } from "~/contexts/theme";

export async function getSession(
	request: Request,
	sessionStorage: SessionStorage
) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);

	return {
		getTheme: () => {
			const themeValue = session.get("theme");
			return isTheme(themeValue) ? themeValue : null;
		},
		setTheme: (theme: Theme) => session.set("theme", theme),
		commit: () => sessionStorage.commitSession(session),
	};
}
