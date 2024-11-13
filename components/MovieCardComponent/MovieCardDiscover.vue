<template>
  <div class="max-w-72 relative">
    <p class="bg-black absolute w-fit p-2 right-0 top-0 bg-opacity-50">
      {{ voteAverage }}
    </p>
    <img
      :src="imagePosterPath"
      alt=""
      @click="$emit('movie-card-action', movieDetail.id)"
    >
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