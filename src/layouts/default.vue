<template>
	<div>
		<nuxt-child />
		<div class="notification-container">
			<div v-if="error"
				class="toast toast-error">
				<button class="btn btn-clear float-right"
					@click="close" />
				{{ error }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	computed: {
		config() {
			return this.$store.state.config;
		},
		error() {
			return this.$store.state.error;
		}
	},
	watch: {
		error() {
			if (!this.error) return;
			setTimeout(() => {
				this.$store.dispatch('error', null);
			}, 3500);
		}
	},
	mounted() {
		console.log(`%c long.af %c v${process.env.version} %c`, 'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background: #df7599; padding: 1px; border-radius: 0 3px 3px 0; color: #fff', 'background: transparent;');
	},
	methods: {
		close() {
			this.$store.dispatch('error', null);
		}
	}
};
</script>
<style lang="scss">
	$primary-color: #df7599;
	$error-color: #e24a4a;

	@import "node_modules/spectre.css/src/spectre";
	@import "node_modules/spectre.css/dist/spectre-icons.css";
	@import "~/assets/style.css";

	div.notification-container {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		min-width: 200px;
	}
</style>
