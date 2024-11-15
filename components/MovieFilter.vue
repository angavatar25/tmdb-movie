<template>
  <div class="bg-[#101925] py-3 rounded-md">
    <p class="px-4 pb-4 text-[16px] font-semibold">Sort Result By</p>
    <div class="w-full h-[1px] bg-gray-500"/>
    <div class="p-4">
      <div class="relative">
        <div
          @click="handleSortByDropdown"
          class="w-full cursor-pointer bg-[#2F363F] p-3 rounded-md flex justify-between"
        >
          <p class="cursor-pointer">{{ currentSort ? currentSort : 'Popularity' }}</p>
          <img
            :class="{
              'rotate-180': showSortByDropdown,
            }"
            src="../src/assets/icons/polygon-1.svg"
            alt=""
          >
        </div>
        <div
          v-if="showSortByDropdown"
          class="bg-[#111419] absolute w-full p-3 rounded-md flex flex-col gap-4"
        >
          <p
            v-for="sort in sortOptions"
            class="cursor-pointer"
            :key="`sort-${sort.id}`"
            @click="handleCurrentSortOption(sort)"
          >
            {{ sort.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-[1px] bg-gray-500"/>
    <p class="p-4 text-[16px] font-semibold">Genres</p>
    <div class="w-full h-[1px] bg-gray-500"/>
    <div class="p-4">
      <div class="">
        <div
          v-for="genre in genreList"
          :key="genre.id"
          class="flex justify-between mb-3"
        >
          <label :for="genre.name">{{ genre.name }}</label>
          <input
            v-model="computedValue"
            type="checkbox"
            :name="genre.name"
            :value="genre.id"
            @click="$emit('handleChangeGenre', genre)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genreList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    currentSort: {
      type: String,
      default: '',
    },
    currentSortId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSortByDropdown: false,
      sortOptions: [
        {
          id: 1,
          key: 'popularity.asc',
          name: 'Popularity Ascending'
        },
        {
          id: 2,
          key: 'popularity.desc',
          name: 'Popularity Descending'
        },
        {
          id: 3,
          key: 'primary_release_date.asc',
          name: 'Release Date Ascending'
        },
        {
          id: 4,
          key: 'primary_release_date.desc',
          name: 'Release Date Descending'
        },
        {
          id: 5,
          key: 'vote_average.asc',
          name: 'Rating Ascending'
        },
        {
          id: 6,
          key: 'vote_average.desc',
          name: 'Rating Descending'
        },
      ]
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  },
  methods: {
    handleSortByDropdown() {
      this.showSortByDropdown = !this.showSortByDropdown;
    },
    handleCurrentSortOption(curr) {
      this.$emit('handleCurrentSortOption', curr);

      this.showSortByDropdown = false;
    }
  }
}
</script>