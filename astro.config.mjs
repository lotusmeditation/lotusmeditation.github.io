// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://lotusmeditation.org",
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: "en",
		locales: ["en", "fr", "vi"],
		fallback: { fr: "en", vi: "en" },
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
			fallbackType: "rewrite",
		},
	},
});
