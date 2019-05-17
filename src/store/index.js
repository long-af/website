export const state = () => ({
	error: null
});

/* eslint-disable no-shadow */
export const mutations = {
	error(state, payload) {
		state.error = payload;
	}
};

export const actions = {
	error({ commit }, payload) {
		return commit('error', payload);
	}
};
