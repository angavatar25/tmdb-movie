const initialState = () => ({
  discoverMovieList: [],
});

export const state = initialState;

export const mutations = {
  SET_DISCOVER_MOVIE_LIST(state, data) {
    state.discoverMovieList = data;
  },
}

export const actions = {
  async getDiscoverMovieList({ commit }) {
    const res = await this.$axios.$get('/3/discover/movie');

    if (res.results.length > 0) {
      const { results: movieList } = res;

      commit('SET_DISCOVER_MOVIE_LIST', movieList);
    }
  }
}