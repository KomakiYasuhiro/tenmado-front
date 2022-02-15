<template lang="pug">
header
    .header
        h1
            img.header-logo(src="~/assets/image/tenmado_logo1_2.svg" alt="テンマド")
</template>


<script lang="ts">
import Vue from 'vue'
interface DataType {
    clipped: boolean,
    title: string
}
export default Vue.extend({
    data(): DataType {
        return {
            clipped: true,
            title: 'tenmado'
        }
    }
})
</script>

<style lang="scss" scoped>
.header {
    height: 100px;
    padding-top: 17px;
    border-bottom: 3px solid #4e8fd3;
}
.header-logo {
    margin-left: 20px;
    height: 80px;
}
</style>