<template>
  <!-- Slider container -->
  <div class="w-full overflow-hidden relative">
    <!-- The slide items will collapse horizontally -->
    <div class="flex items-center transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }">
      <!-- Img container -->
      <div
        v-for="(img, index) in images"
        :key="'pic-' + index"
        class="w-full min-w-full max-w-full"
      >
        <img :src="img" class="w-full" />
      </div>
    </div>
    <!-- Navigation Buttons -->
    <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2"> &lt; </button>
    <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2"> &gt; </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/Photos/Photo1.png'),
        require('@/assets/Photos/Photo2.png'),
        require('@/assets/Photos/Photo3.png'),
      ],
      theInterval: null,
      currentSlide: 1,
    };
  },
  mounted() {
    this.theInterval = setInterval(this.nextSlide, 3000);
  },
  beforeUnmount() {
    clearInterval(this.theInterval);
  },
  methods: {
    nextSlide() {
      if (this.currentSlide === this.images.length) {
        this.currentSlide = 1;
      } else {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide === 1) {
        this.currentSlide = this.images.length;
      } else {
        this.currentSlide--;
      }
    },
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.transition-transform {
  transition: transform 0.5s ease-in-out;
}

.bg-white {
  background-color: white;
}

.p-2 {
  padding: 0.5rem;
}

.transform {
  transform: translateY(-50%);
}
</style>
