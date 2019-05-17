<template>
	<nuxt />
</template>
<script>
export default {
	computed: {
		config() {
			return this.$store.state.config;
		},
		alert() {
			return this.$store.state.alert;
		}
	},
	watch: {
		alert() {
			if (!this.alert) return;

			this.$toast.open({
				duration: 3500,
				message: this.alert.text,
				position: 'is-bottom',
				type: this.alert.error ? 'is-danger' : 'is-success'
			});

			setTimeout(() => {
				this.$store.dispatch('alert', null);
			}, 3500);
		}
	},
	mounted() {
		console.log(`%c long.af %c v${process.env.version} %c`, 'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background: #df7599; padding: 1px; border-radius: 0 3px 3px 0; color: #fff', 'background: transparent;');
	}
};
</script>
<style lang="scss">
	$primary-color: #df7599;
	// $dark-color: #3e396b;
	@import "node_modules/spectre.css/src/spectre";
	@import "~/assets/style.css";
</style>
