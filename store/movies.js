const initialState = () => ({
  discoverMovieList: [],
  movieDetail: {},
  movieReviews: {},
  movieGenres: [],
  movieSearchRes: [],
  movieListFiltered: [],
  moreDataLoading: false,
  isInitial: false,
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
  },
  SET_MOVIE_SEARCH_RES(state, data) {
    const serializedSearchData = data.map((res) => {
      const { title, id } = res;

      return {
        movieId: id,
        movieName: title,
      }
    });

    state.movieSearchRes = serializedSearchData.slice(0, 10);
  },
  SET_MOVIE_LIST_FILTERED(state, newMovies) {
    if (state.isInitial) {
      state.movieListFiltered = newMovies;
    } else {
      state.movieListFiltered = [...state.movieListFiltered, ...newMovies];
    }
  },
  SET_LOADING(state, data) {
    state.moreDataLoading = data;
  },
  SET_IS_INITIAL(state, data) {
    state.isInitial = data;
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
  },
  async getMovieSearch({ commit }, searchQuery) {
    const res = await this.$axios.get('/3/search/movie', { 
      params: {
        query: searchQuery
      },
    });

    if (res && res.data && res.data.results) {
      commit('SET_MOVIE_SEARCH_RES', res.data.results);
    }
  },
  async filteredMovie({ commit }, payload) {
    commit('SET_LOADING', true);

    try {
      const { page } = payload;

      const res = await this.$axios.get('/3/discover/movie', {
        params: payload,
      });
  
      if (res && res.data && res.data.results) {
        if (page === 1) {
          commit('SET_IS_INITIAL', true);
        } else {
          commit('SET_IS_INITIAL', false);
        }

        commit('SET_MOVIE_LIST_FILTERED', res.data.results);
      }
    } catch (err) {
      // Do nothing
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async getMoviesByPopularity({ commit }) {
    const res = await this.$axios.get('/3/movie/popular')

    if (res && res.data && res.data.results) {
      commit('SET_DISCOVER_MOVIE_LIST', res.data.results);
    }
  },
  async getMoviesByReleaseData({ commit }) {
    const res = await this.$axios.get('/3/movie/upcoming')

    if (res && res.data && res.data.results) {
      commit('SET_DISCOVER_MOVIE_LIST', res.data.results);
    }
  },
}