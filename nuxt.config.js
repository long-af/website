import dotenv from 'dotenv/config';
import autoprefixer from 'autoprefixer';

export default {
	mode: 'spa',
	server: { port: process.env.DEV_PORT },
	env: {
		development: process.env.NODE_ENV !== 'production',
		version: process.env.npm_package_version
	},
	srcDir: 'src/',
	head: {
		title: `long.af | World's fastest URL shortener.`,
		// TODO: Add the directory with pictures for favicon and stuff
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'theme-color', name: 'theme-color', content: `${process.env.META_THEME_COLOR}` },
			{ hid: 'description', name: 'description', content: `${process.env.META_DESCRIPTION}` },
			{ hid: 'keywords', name: 'keywords', content: `${process.env.META_KEYWORDS}` },
			{ hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: `${process.env.SERVICE_NAME}` },
			{ hid: 'application-name', name: 'application-name', content: `${process.env.SERVICE_NAME}` },
			{ hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: `#2b5797` },
			{ hid: 'msapplication-config', name: 'msapplication-config', content: `${process.env.domain}/assets/browserconfig.xml` },
			{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
			{ hid: 'twitter:site', name: 'twitter:site', content: `${process.env.META_TWITTER_HANDLE}` },
			{ hid: 'twitter:creator', name: 'twitter:creator', content: `${process.env.META_TWITTER_HANDLE}` },
			{ hid: 'twitter:title', name: 'twitter:title', content: `${process.env.SERVICE_NAME}` },
			{ hid: 'twitter:description', name: 'twitter:description', content: `${process.env.META_DESCRIPTION}` },
			{ hid: 'twitter:image', name: 'twitter:image', content: `${process.env.domain}/assets/share.jpg` },
			{ hid: 'og:url', property: 'og:url', content: `${process.env.DOMAIN}` },
			{ hid: 'og:type', property: 'og:type', content: 'website' },
			{ hid: 'og:title', property: 'og:title', content: `${process.env.SERVICE_NAME}` },
			{ hid: 'og:description', property: 'og:description', content: `${process.env.META_DESCRIPTION}` },
			{ hid: 'og:image', property: 'og:image', content: `${process.env.domain}/assets/share.jpg` },
			{ hid: 'og:image:secure_url', property: 'og:image:secure_url', content: `${process.env.domain}/assets/share.jpg` },
			{ hid: 'og:site_name', property: 'og:site_name', content: `${process.env.SERVICE_NAME}` }
		],
		link: [
			{ type: 'application/json+oembed', href: `${process.env.domain}/assets/oembed.json` },
			{ type: 'image/x-icon', rel: 'icon', href: `${process.env.domain}/assets/favicon.ico` }
		]
	},
	css: [],
	modules: [
		'@nuxtjs/axios'
	],
	plugins: [
		'~/plugins/v-clipboard'
	],
	axios: {
		baseURL: `https://api.long.af`
	},
	build: {
		extractCSS: true,
		postcss: {
			preset: {
				autoprefixer
			}
		}
	}
};
