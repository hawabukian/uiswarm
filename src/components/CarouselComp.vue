<template>
  <!-- slider container -->
  <div class="w-full overflow-hidden">
    <!-- the slide items will collapse horizontally -->
    <div class="flex items-center">
      <!-- img container -->
      <div
        v-for="img in images"
        :key="'pic-' + img"
        class="w-full min-w-full max-w-full relative"
        :style="{ transform: `translateX(${-100 * (currentSlide - 1)}%)` }"
      >
        <div class="absolute bg-slate-900 bg-opacity-50 w-full h-full">
          <div class="container mx-auto px-4 py-6 md:py-48 md:px-40">
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <h1 class="text-white text-xl md:text-7xl font-black">
                  Media ENT
                </h1>
                <p
                  class="text-white text-xs md:text-3xl my-4 md:my-24 font-medium"
                >
                  Platfom media
                  <span class="text-emerald-400"> Jurnalistik </span>yang
                  memberi informasi seputar kampus, teknologi, dan berita
                  terkini.
                </p>
                <a href="about">
                  <span
                    class="rounded-lg p-1 md:p-3 px-3 md:px-8 bg-white text-sky-900 text-xs md:text-lg font-bold"
                    >About ENT
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <img :src="img" class="w-full" />
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      images: [
        "../../lifestyle.png",
        "../../illustrasi.png",
        "../../hiburan.png",
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
      if (this.currentSlide === 3) {
        this.currentSlide = 1;
      } else {
        this.currentSlide++;
      }
    },
  },
};
</script>
  