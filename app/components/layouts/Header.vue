<template lang="pug">
header
    .header
        nuxt-link(to="/")
            img.header-logo(src="~/assets/image/tenmado-logo.svg" alt="テンマド")
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {}
    }
})
</script>

<style lang="scss" scoped>
.header {
    height: 80px;
    width: 100%;
    padding-top: 16px;
    border-bottom: 3px solid #4e8fd3;
    margin-block-start: 0em;
    margin-block-end: 0em;
}
.header-logo {
    margin-left: 40px;
    height: 80px;
    width: 242.8px;
}
</style>