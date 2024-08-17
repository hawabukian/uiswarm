<template>
  <div class="w-full">
    <NavbarUserCompVue />

    <main>
      <slot />
    </main>
    <FooterUserComp />
  </div>
</template>

<script >
import NavbarUserCompVue from "@/components/NavbarUserComp.vue";
import FooterUserComp from "@/components/FooterUserComp.vue";
// import FooterUser from "@/Components/FooterUser.vue";

export default {
  components: {
    NavbarUserCompVue,
    FooterUserComp,
  },
};
</script>
  
  <style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css);

div {
  font-family: Roboto;
}
</style>
  