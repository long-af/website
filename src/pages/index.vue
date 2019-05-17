<style lang="scss" scoped>
	#overview { padding-top: 0; }
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
	div.result { display: grid; }
	img.logo { width: 192px; }
	.mt2 { margin-top: 2rem; }
</style>
<template>
	<div class="section section-hero bg-gray">
		<div id="overview"
			class="grid-hero container grid-lg text-center">
			<img src="~/assets/logo.png"
				class="logo"
				alt="long.af logo">
			<h2>World's <mark>fastest</mark> URL shortener resolver. <br> No ads. No tracking. No bullshit.</h2>

			<div class="divider invisible" />

			<div class="input-group">
				<span class="input-group-addon">URL to shorten</span>
				<input v-model="urlToShorten"
					type="text"
					class="form-input"
					placeholder="Paste it here"
					:disabled="loading"
					@keyup.enter="shorten">
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
				<div v-if="expires"
					class="column col-6">
					<div class="columns">
						<div class="column">
							<div class="btn-group btn-group-block">
								<button class="btn btn-sm"
									:class="{ active: expiresWhen === 'never' }"
									@click="expiresWhen = 'never'">Never</button>
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

			<div v-if="createdUrls.length"
				class="divider text-center mt2"
				data-content="Shortened URLs" />

			<div class="result">
				<a v-for="(url, index) in createdUrls"
					:key="index"
					:href="url"
					target="_blank">{{ url }}</a>
			</div>
		</div>
		<div class="grid-hero container grid-lg text-center">
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
								href="#cards">Chrome</a>
							<a class="btn btn-primary"
								href="#cards">Firefox</a>
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
			createdUrls: [],
			loading: false
		};
	},
	methods: {
		async shorten() {
			try {
				this.loading = true;
				const data = await this.$axios.$post('create', {
					url: this.urlToShorten,
					expires: this.expiresWhen
				});

				this.createdUrls.push(data.url);
			} catch (error) {
				this.$store.dispatch('error', error.response ? error.response.data.message : 'Network error');
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
