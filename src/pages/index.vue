<style lang="scss" scoped>
	.links-container { padding-top: 3rem; }
	.app-container { padding-top: 0; }
	.section-hero { height: 100vh; }
	.divider {
		border-top: 0.05rem solid #d8d9da;
		margin-bottom: 3rem;
		margin-top: 0rem;

		&.invisible { visibility: hidden; }
	}
	.divider[data-content]::after,
	.divider-vert[data-content]::after {
		background: #f7f8f9;
	}

	.form-switch { text-align: left; }

	.grid-hero .card {
		background: #fff;
		border: 0.05rem solid #dadee4;
		padding: 0;
	}

	div.result {
		padding: 1rem;
		background: #ffe9b3;
		border: .05rem solid #ffd367;
	}

	img.logo { width: 192px; }
	.mt2 { margin-top: 2rem; }
	.pt0 { padding-top: 0px; }
	.pb0 { padding-bottom: 0px; }

	.form-switch.is-right {
		text-align: right;
		padding-right: 2rem;
		padding-left: 0.4rem;

		i.form-icon {
			right: 0 !important;
			left: unset;
		}
	}

	.columns.button-toggles { margin-bottom: 1rem; }
	.relative { position: relative; }
	.characters-left {
		position: absolute;
		right: 130px;
		z-index: 9;
		bottom: -15px;
		font-size: .5rem;
		pointer-events: none;
	}
</style>
<template>
	<div class="section section-hero bg-gray">
		<div class="grid-hero container grid-lg text-center app-container">
			<img src="~/assets/logo.png"
				class="logo"
				alt="long.af logo">
			<h2>World's <mark>fastest</mark> URL shortener resolver. <br> No ads. No tracking. No bullshit.</h2>

			<div v-if="createdUrl"
				class="result">
				<div>
					<button class="btn btn-link tooltip"
						data-tooltip="Regenerate the url!"
						:class="{ loading: regenerating }"
						:disabled="regenerating"
						@click="regenerate(createdUrl)">
						<i class="icon icon-refresh" />
					</button>
					<a :href="createdUrl.url"
						target="_blank">{{ createdUrl.url }}</a>
					<button class="btn btn-link tooltip"
						data-tooltip="Copy link"
						@click="copy(createdUrl.url)">
						<i class="icon icon-copy" />
					</button>
				</div>
			</div>
			<div class="divider invisible" />

			<div class="input-group relative">
				<span class="input-group-addon hide-xs">URL to shorten</span>
				<input v-model="urlToShorten"
					type="text"
					class="form-input"
					placeholder="Paste it here"
					:disabled="loading"
					@keyup.enter="shorten">
				<span class="characters-left">
					<template v-if="urlToShorten && urlToShorten.length > 1000">
						<mark>{{ urlToShorten ? urlToShorten.length : 0 }}</mark>
					</template>
					<template v-else>
						{{ urlToShorten ? urlToShorten.length : 0 }}
					</template>
					/ 1000
				</span>
				<button class="btn btn-primary input-group-btn"
					:class="{ loading }"
					:disabled="loading"
					@click="shorten">Get a short URL</button>
			</div>

			<div class="columns">
				<div class="column col-6">
					<div class="form-group">
						<label class="form-switch">
							<input v-model="expires"
								type="checkbox">
							<i class="form-icon" /> Expires
						</label>
					</div>
				</div>
				<div class="column col-6">
					<div class="form-group">
						<label class="form-switch is-right">
							<input v-model="type"
								type="checkbox">
							<i class="form-icon" /> URL Theme
						</label>
					</div>
				</div>
			</div>

			<div class="columns button-toggles">
				<div v-if="expires"
					class="column col-6">
					<div class="columns">
						<div class="column">
							<div class="btn-group btn-group-block">
								<button class="btn btn-sm"
									:class="{ active: !expiresWhen }"
									@click="expiresWhen = null">Never</button>
								<button class="btn btn-sm"
									:class="{ active: expiresWhen === 'day' }"
									@click="expiresWhen = 'day'">1 day</button>
								<button class="btn btn-sm"
									:class="{ active: expiresWhen === 'week' }"
									@click="expiresWhen = 'week'">1 week</button>
								<button class="btn btn-sm"
									:class="{ active: expiresWhen === 'month' }"
									@click="expiresWhen = 'month'">1 month</button>
								<button class="btn btn-sm"
									:class="{ active: expiresWhen === 'year' }"
									@click="expiresWhen = 'year'">1 year</button>
							</div>
						</div>
					</div>
				</div>

				<div v-if="type"
					class="column col-6"
					:class="{ 'col-ml-auto': !expires }">
					<div class="columns">
						<div class="column">
							<div class="btn-group btn-group-block">
								<button class="btn btn-sm"
									:class="{ active: !whichType }"
									@click="whichType = null">Short</button>
								<button class="btn btn-sm"
									:class="{ active: whichType === 'words' }"
									@click="whichType = 'words'">Words</button>
								<button class="btn btn-sm"
									:class="{ active: whichType === 'pokemon' }"
									@click="whichType = 'pokemon'">Pokémon</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="divider text-center"
				data-content="Or choose a vanity URL" />

			<div class="input-group">
				<span class="input-group-addon">long.af/</span>
				<input type="text"
					class="form-input"
					placeholder="Vanity url">
				<button class="btn btn-primary input-group-btn disabled">Coming soon!</button>
			</div>
		</div>
		<div class="grid-hero container grid-lg text-center links-container">
			<div class="columns">
				<div class="column col-4 col-xs-12">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive"
								src="~/assets/discord.jpg"
								alt="Discord">
						</div>
						<div class="card-footer">
							<a class="btn btn-primary"
								href="https://discord.gg/5g6vgwn"
								target="_blank">Support</a>
						</div>
						<div class="card-body">
							<strong>Join Discord!</strong>
							Questions? Suggestions? Come hang out on Discord and tell us all about it.
						</div>
					</div>
				</div>

				<div class="column col-4 col-xs-12">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive"
								src="~/assets/browsers.jpg"
								alt="Browser extensions">
						</div>
						<div class="card-footer">
							<a class="btn btn-primary"
								href="https://chrome.google.com/webstore/detail/longaf-url-shortener/alkflcbgblocpmpcdbjmgakpjimaalcj"
								target="_blank">Chrome</a>
							<a class="btn btn-primary"
								href="https://addons.mozilla.org/en-US/firefox/addon/long-af-url-shortener/"
								target="_blank">Firefox</a>
							<a class="btn btn-link"
								href="https://github.com/long-af/browser-extension"
								target="_blank">Source</a>
						</div>
						<div class="card-body">
							<strong>Chrome extension</strong>.
							Shorten the url of the active tab by clicking on the extension icon.
						</div>
					</div>
				</div>

				<div class="column col-4 col-xs-12">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive"
								src="~/assets/github.jpg"
								alt="GitHub">
						</div>
						<div class="card-footer">
							<a class="btn btn-primary"
								href="https://github.com/long-af"
								target="_blank">GitHub</a>
						</div>
						<div class="card-body">
							<strong>Source code</strong>.
							Browse the source code for both the website and browser extensions on GitHub.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			urlToShorten: null,
			expires: false,
			expiresWhen: 'never',
			createdUrl: null,
			loading: false,
			type: false,
			whichType: null,
			regenerating: false
		};
	},
	methods: {
		async shorten() {
			if (!this.urlToShorten) return this.$store.dispatch('error', 'Can\'t shorten what doesn\'t exist.');
			if (this.urlToShorten.length < 4) return this.$store.dispatch('error', 'Come on bruh, at least 4 characters.');
			if (this.urlToShorten.length > 1000) return this.$store.dispatch('error', 'Sorry, that URL is too long. Even for us.');
			try {
				this.loading = true;
				const data = await this.$axios.$post('create', {
					url: this.urlToShorten,
					expires: this.expiresWhen,
					type: this.whichType
				});

				this.createdUrl = {
					url: data.url,
					token: data.token,
					originalUrl: this.urlToShorten,
					expires: this.expiresWhen,
					type: this.whichType
				};

				/*
				this.createdUrls.push({
					url: data.url,
					token: data.token,
					meta: {
						url: this.urlToShorten,
						expires: this.expiresWhen,
						type: this.whichType
					}
				});
				*/
			} catch (error) {
				this.$store.dispatch('error', error.response ? error.response.data.message : 'Network error');
			} finally {
				this.loading = false;
			}
		},
		async regenerate(url) {
			try {
				this.regenerating = true;
				const data = await this.$axios.$post('create', {
					url: url.originalUrl,
					expires: url.expires,
					type: url.type,
					token: url.token
				});

				this.createdUrl = {
					url: data.url,
					token: data.token,
					originalUrl: url.originalUrl,
					expires: url.expires,
					type: url.type
				};
			} catch (error) {
				this.$store.dispatch('error', error.response ? error.response.data.message : 'Network error');
			} finally {
				this.regenerating = false;
			}
		},
		copy(url) {
			this.$clipboard(url);
		}
	}
};
</script>
