<template>
  <div>
    <div
      v-if="movieList.length > 0"
      class="carousel-container"
    >
      <div class="carousel-wrapper">
        <MovieCardCarousel
          v-for="(movie, index) in movieList"
          :key="index"
          :movieData="movie"
          :is-current-index="index === currentIndex"
          :translate-x-value="-currentIndex * (itemWidth + gap)"
        />
      </div>
      <div class="carousel-dots">
        <span
          v-for="(_, index) in movieList"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="goTo(index)"
        ></span>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import MovieCardCarousel from './MovieCardCarousel.vue';

export default {
  components: {
    MovieCardCarousel,
  },
  props: {
    movieList: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      currentIndex: 0,
      itemWidth: 600,
      gap: 0,
    };
  },
  methods: {
    next() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = this.items.length - 1;
      }
    },
    goTo(index) {
      this.currentIndex = index;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.carousel-container {
  @apply relative flex items-center justify-center overflow-hidden w-full;
}

.carousel-wrapper {
  @apply flex w-full;
  transition: transform 0.5s ease-in-out;
  padding: 0 100px 100px 100px;
}

.carousel-item {
  @apply max-w-[600px] w-full opacity-50 text-white text-2xl flex justify-center items-center shrink-0;
  margin: 0 10px;
  transition: transform 0.5s, opacity 0.5s;
}

.carousel-item.active {
  @apply opacity-100;
  transform: scale(1.1);
}

.carousel-dots {
  @apply bottom-0 absolute flex justify-center w-full;
}

.carousel-dots span {
  @apply inline-block w-3 h-3 bg-gray-500 cursor-pointer;
  margin: 0 5px;
  border-radius: 100%;
}

.carousel-dots .active {
  @apply bg-[#E74C3C] w-10 rounded-md;
}
</style>
