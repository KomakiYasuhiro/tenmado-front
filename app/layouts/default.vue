<template lang="pug">
.app
  Header
  main.content
    Nuxt
  Footer

</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/layouts/Header.vue'
import Footer from '~/components/layouts/Footer.vue'

export default Vue.extend({

  components: {
    Header,
    Footer
  },

  data() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 calc(50% - 50vw);
}

</style>
