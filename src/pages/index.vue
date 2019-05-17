<style lang="scss" scoped>
	.section-hero { height: 100vh; }
	p.actionButtons { margin-top: 2rem; }
	.divider {
		border-top: 0.05rem solid #d8d9da;
		margin-bottom: 3rem;
		margin-top: 2rem;

		&.invisible { visibility: hidden; }
	}
	.divider[data-content]::after,
	.divider-vert[data-content]::after {
		background: #f7f8f9;
	}

	.form-switch { text-align: left; }
</style>
<template>
	<div class="section section-hero bg-gray">
		<div id="overview"
			class="grid-hero container grid-lg text-center">
			<h1>Long.<u>af</u></h1>
			<h2>World's <mark>fastest</mark> URL shortener. For real.</h2>

			<div class="divider invisible" />

			<div class="input-group">
				<span class="input-group-addon">URL to shorten</span>
				<input v-model="urlToShorten"
					type="text"
					class="form-input"
					placeholder="Paste it here">
				<button class="btn btn-primary input-group-btn">Get a short URL</button>
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

			<div class="result">
				<a v-for="(url, index) in createdUrls"
					:key="index"
					target="_blank">{{ url }}</a>
			</div>

			<p class="actionButtons">
				<a href="#"
					class="btn btn-primary btn-lg btnModal">Install</a>
				<a href="https://discord.gg/5g6vgwn"
					class="btn btn-primary btn-lg">Support</a>
				<a href="https://github.com/pitu/Magane"
					target="_blank"
					class="btn btn-primary btn-lg">GitHub</a>
			</p>
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
			createdUrls: []
		};
	},
	methods: {
		async shorten() {
			const data = await this.$axios.$post('create', {
				url: this.urlToShorten,
				expires: this.expiresWhen
			});

			this.createdUrls.push(data.url);
		}
	}
};
</script>
