<template lang="pug">
.services-area
    Headline(:text="'提供サービス一覧'")
    .services
        li.service
            nuxt-link(to="/weatherforecast/") 過去の天気予報検索サービス
        li.service 
            a(href="https://yomeru.jp/") Yomeru(ヨメル) 
        li.service Comming Soon.
</template>

<script lang="ts">
import Vue from 'vue'
import Headline from '~/components/pages/top/Headline.vue'

export default Vue.extend({

    components: {
        Headline
    },
})
</script>

<style lang="scss" scoped>

.service {
    margin: 20px 0px;
}
</style>