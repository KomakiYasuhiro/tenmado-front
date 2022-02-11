<template>
    <v-app-bar :clipped-left="clipped" fixed app>
        <v-toolbar-title v-text="title" />
        <v-spacer />
    </v-app-bar>
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

<style scoped>
</style>