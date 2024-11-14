<template>
  <div class="max-w-72">
    <p class="bg-black absolute w-fit p-2 right-0 top-0 bg-opacity-50">
      {{ voteAverage }}
    </p>
    <div class="relative group">
      <img
        class="group"
        :src="imagePosterPath"
        alt=""
      >
      <div class="bg-black bg-opacity-70 z-10 w-full h-full absolute top-0 left-0 hidden group-hover:flex flex-col justify-between items-center py-40">
        <div class="flex gap-3">
          <img src="../../src/assets/icons/star2.svg" alt="">
          <p class="text-2xl font-medium">{{ voteAverage }}</p>
        </div>
        <button
          class="bg-red-600 rounded-full px-10 py-1 uppercase"
          @click="$emit('movie-card-action', { movieId: movieDetail.id, movieName: movieDetail.original_title })"
        >
          View
        </button>
      </div>
    </div>
    <div class="mt-2">
      <p class="font-semibold">{{ movieDetail.original_title }}</p>
      <p class="text-sm text-[#929292]">
        {{ getYear }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieDetail: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    getYear() {
      const movieDate = this.movieDetail.release_date;
      const splitted = movieDate.split('-');

      const yearOfMovie = splitted[0];

      return yearOfMovie;
    },
    imagePosterPath() {
      const posterPath = "https://image.tmdb.org/t/p/original";

      return `${posterPath}/${this.movieDetail.poster_path}`
    },
    voteAverage() {
      return parseFloat(this.movieDetail.vote_average.toFixed(1));
    }
  }
}
</script>