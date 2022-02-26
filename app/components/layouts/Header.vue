<template lang="pug">
header
    h1.header
        img.header-logo(src="~/assets/image/tenmado-logo.svg" alt="テンマド - 過去の天気予報検索サービス")
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
    padding-top: 16px;
    border-bottom: 3px solid #4e8fd3;
    margin-block-start: 0em;
    margin-block-end: 0em;
}
.header-logo {
    margin-left: 20px;
    height: 80px;
}
</style>