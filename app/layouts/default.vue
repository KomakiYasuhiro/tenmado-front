<template>
  <v-app>
    <Header></Header>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
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
      clipped: true,
      fixed: false,
      title: 'tenmado'
    }
  }
})
</script>
