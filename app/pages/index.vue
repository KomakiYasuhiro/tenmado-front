<template lang="pug">
article
    p メンテナンス中
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {}
    },

    head() {
        return {
            titleTemplate: '',
            title: 'テンマド',
            meta: [
                { hid: "robots", name: "robots", content: "noindex" }
            ]
        }
    }
})
</script>