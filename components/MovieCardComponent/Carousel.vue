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
      gap: 20,
    };
  },
  methods: {
    next() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0; // Loop back to the first item
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = this.items.length - 1; // Loop to the last item
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  padding: 0 100px 100px 100px;
}

.carousel-item {
  max-width: 600px; /* Set width of each item */
  width: 100%;
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px; /* Gap between items */
  flex-shrink: 0;
  transition: transform 0.5s, opacity 0.5s;
  opacity: 0.5;
}

.carousel-item.active {
  transform: scale(1.1); /* Scale the active item */
  opacity: 1;
}

.carousel-dots {
  @apply bottom-0;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
}

.carousel-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 100%;
  background-color: gray;
  cursor: pointer;
}

.carousel-dots .active {
  @apply bg-[#E74C3C] w-10 rounded-md;
}
</style>
