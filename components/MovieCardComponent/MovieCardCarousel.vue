<template>
  <div
    :class="{
      'carousel-item flex max-h-[360px]': true,
      'active': isCurrentIndex,
    }"
    :style="{ transform: `translateX(${translateXValue}px)` }"
  >
    <div class="w-60">
      <img
        :src="imagePosterPath"
        alt=""
      >
    </div>
    <div class="bg-black text-white p-6 max-w-80 h-72 max-h-80 my-auto">
      <div class="my-auto">
        <div class="flex">
          <img src="../../src/assets/icons/star.svg" alt="">
          <p class="font-bold">
            {{ voteAverage }}
          </p>
        </div>
        <p class="text-[28px]">
          {{ movieData.title }}
        </p>
        <div class="flex gap-3 my-2">
          <p>{{ getYear }}</p>
        </div>
        <p class="text-xs line-clamp-4 text-ellipsis overflow-hidden">
          {{ movieData.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    translateXValue: {
      type: Number,
      required: true,
    },
    isCurrentIndex: {
      type: Boolean,
      required: true,
    },
    movieData: {
      type: Object,
      required: true,
      default: () => {},
    }
  },
  computed: {
    imagePosterPath() {
      const posterPath = "https://image.tmdb.org/t/p/original";

      return `${posterPath}/${this.movieData.poster_path}`
    },
    voteAverage() {
      return parseFloat(this.movieData.vote_average.toFixed(1));
    },
    getYear() {
      const movieDate = this.movieData.release_date;
      const splitted = movieDate.split('-');

      const yearOfMovie = splitted[0];

      return yearOfMovie;
    },
  }
}
</script>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 4; /* Limits to 4 lines */
}
</style>