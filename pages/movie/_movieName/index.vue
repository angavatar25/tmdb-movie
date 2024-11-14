<template>
  <div v-if="movieDetail">
    <section class="max-h-[450px] bg-opacity-45 bg-black relative overflow-hidden text-white">
      <div class="absolute bottom-0 w-full z-10">
        <div class="w-full grid grid-cols-5 px-10">
          <div class="col-span-1"/>
          <div class="col-span-4 mb-6">
            <p class="text-lg">{{ movieYear }}</p>
            <p class="text-4xl">{{ movieDetail.title }}</p>
            <p class="text-sm">
              {{ movieGenre }}
            </p>
          </div>
        </div>
        <div class="bg-black bg-opacity-40 h-20 w-full grid grid-cols-5 px-10">
          <div class="col-span-1"/>
          <div class="flex col-span-4 py-5">
            <div class="flex gap-5 border-r-[1px] border-gray-300 pr-10">
              <div class="h-fit flex gap-3 my-auto">
                <img class="w-5" src="../../../src/assets/icons/star2.svg" alt="">
                <p class="text-4xl font-bold">{{ voteAverage }}</p>
              </div>
              <div class="text-xs my-auto">
                <p class="uppercase">User Score</p>
                <p class="uppercase">{{ `${movieDetail.vote_count} votes` }}</p>
              </div>
            </div>
            <div class="text-xs flex flex-col justify-center border-r-[1px] border-gray-300 px-10">
              <p class="uppercase">Status</p>
              <p class="uppercase">{{ movieDetail.status }}</p>
            </div>
            <div class="text-xs flex flex-col justify-center border-r-[1px] border-gray-300 px-10">
              <p class="uppercase">Language</p>
              <p class="uppercase">{{ movieLang }}</p>
            </div>
            <div class="text-xs flex flex-col justify-center border-r-[1px] border-gray-300 px-10">
              <p class="uppercase">Budget</p>
              <p class="uppercase">{{ movieDetail.budget }}</p>
            </div>
            <div class="text-xs flex flex-col justify-center border-r-[1px] border-gray-300 px-10">
              <p class="uppercase">Production</p>
              <p class="uppercase">{{ movieProductionCompany }}</p>
            </div>
          </div>
        </div>
      </div>
      <img
        class="opacity-50"
        :src="backdropPath"
        alt=""
      >
    </section>
    <div class="bg-white">
      <div>
        <div class="grid grid-cols-5 px-10 relative">
          <div class="col-span-1 z-20">
            <img
              :src="imagePosterPath"
              alt=""
              class="max-w-56 shadow-md absolute bottom-0"
            >
          </div>
          <div class="col-span-4 mt-5 leading-[10]">
            <div>
              <p class=" text-red-600 uppercase text-sm font-semibold">Overview</p>
              <p class="text-black leading-6 mt-2 max-w-[526px] text-sm">
                {{ movieDetail.overview }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 px-10">
        <p class="text-red-600 text-sm font-medium uppercase">Reviews</p>
        <div
          v-if="movieReviews.length > 0"
          class="grid grid-cols-2 gap-5 mt-5"
        >
          <CardReview
            v-for="review in movieReviews"
            :key="review.id"
            :movie-review="review"
          />
        </div>
        <div
          v-else
          class="mt-5"
        >
          <p class="text-2xl font-bold text-black">No reviews available</p>
        </div>
      </div>
      <div class="bg-[#1E232B] py-10 px-16 mt-20">
        <p class="text-[14px] uppercase font-semibold mb-10">Recommendation Movies</p>
        <div class="grid grid-cols-5 gap-3">
          <MovieCardDiscover
            v-for="movie in movieList"
            :key="movie.id"
            :movie-detail="movie"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardReview from '../../../components/CardReview.vue';
import MovieCardDiscover from '../../../components/MovieCardComponent/MovieCardDiscover.vue';

export default {
  components: {
    CardReview,
    MovieCardDiscover,
  },
  mounted() {
    this.$store.dispatch('movies/getMovieDetail', this.movieId);
    this.$store.dispatch('movies/getMovieReviews', this.movieId);

    if (this.movieList && this.movieList.length === 0) {
      this.$store.dispatch('movies/getDiscoverMovieList');
    }
  },
  computed: {
    movieId() {
      return this.$route.query.movieId;
    },
    movieDetail() {
      return this.$store.state.movies.movieDetail;
    },
    movieReviews() {
      return this.$store.state.movies.movieReviews;
    },
    movieList() {
      return this.$store.state.movies.discoverMovieList.slice(0, 5);
    },
    movieYear() {
      if (this.movieDetail && this.movieDetail.release_date) {
        const movieDate = this.movieDetail.release_date;
        const splitted = movieDate.split('-');
  
        const yearOfMovie = splitted[0];
  
        return yearOfMovie;
      }

      return 0;
    },
    voteAverage() {
      if (this.movieDetail && this.movieDetail.vote_average) {
        return parseFloat(this.movieDetail.vote_average.toFixed(1));
      }
    },
    movieGenre() {
      if (this.movieDetail && this.movieDetail.genres) {
        const genre = this.movieDetail.genres.map((genre) => genre.name);
        const genreJoined = genre.join(',');
  
        return genreJoined;
      }

      return null;
    },
    movieLang() {
      if (this.movieDetail && this.movieDetail.spoken_languages) {
        const [first] = this.$store.state.movies.movieDetail.spoken_languages;

        return first.name;
      }
    },
    movieProductionCompany() {
      if (this.movieDetail && this.movieDetail.production_companies) {
        const [first] = this.$store.state.movies.movieDetail.production_companies;

        return first.name;
      }
    },
    imagePosterPath() {
      const posterPath = "https://image.tmdb.org/t/p/original";

      return `${posterPath}/${this.movieDetail.poster_path}`
    },
    backdropPath() {
      const posterPath = "https://image.tmdb.org/t/p/original";

      return `${posterPath}/${this.movieDetail.backdrop_path}`
    },
  }
}
</script>