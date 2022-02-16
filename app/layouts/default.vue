<template lang="pug">
.app
  Header
  main
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
  padding-left: 50px;
  padding-right: 50px;
}
</style>
