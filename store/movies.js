const initialState = () => ({
  discoverMovieList: [],
  movieDetail: {},
  movieReviews: {},
  movieGenres: [],
});

export const state = initialState;

export const mutations = {
  SET_DISCOVER_MOVIE_LIST(state, data) {
    state.discoverMovieList = data;
  },
  SET_MOVIE_DETAIL(state, data) {
    state.movieDetail = data;
  },
  SET_MOVIE_REVIEWS(state, data) {
    state.movieReviews = data;
  },
  SET_MOVIE_GENRES(state, data) {
    state.movieGenres = data;
  }
}

export const actions = {
  async getDiscoverMovieList({ commit }) {
    const res = await this.$axios.$get('/3/discover/movie');

    if (res.results.length > 0) {
      const { results: movieList } = res;

      commit('SET_DISCOVER_MOVIE_LIST', movieList);
    }
  },
  async getMovieDetail({ commit }, movieId) {
    const res = await this.$axios.get(`/3/movie/${movieId}`)

    if (res && res.data) {
      commit('SET_MOVIE_DETAIL', res.data);
    }
  },
  async getMovieReviews({ commit }, movieId) {
    const res = await this.$axios.get(`/3/movie/${movieId}/reviews`);

    if (res && res.data) {
      commit('SET_MOVIE_REVIEWS', res.data.results);
    }
  },
  async getMovieGenre({ commit }) {
    const res = await this.$axios.get('/3/genre/movie/list');

    if (res && res.data && res.data.genres) {
      commit('SET_MOVIE_GENRES', res.data.genres);
    }
  }
}