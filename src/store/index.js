export const state = () => ({
	alert: null
});

/* eslint-disable no-shadow */
export const mutations = {
	alert(state, payload) {
		state.alert = payload;
	}
};

export const actions = {
	alert({ commit }, payload) {
		if (!payload) return commit('alert', null);
		commit('alert', {
			text: payload.text,
			error: payload.error
		});
	}
};
