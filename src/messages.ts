import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
	switch (locale) {
		case "en":
			return { messages: (await import("@/i18n/messages/en.json")).default };
		case "tr":
		default:
			return { messages: (await import("@/i18n/messages/tr.json")).default };
	}
});
