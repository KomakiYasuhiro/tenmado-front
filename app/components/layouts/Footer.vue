<template>
    <v-footer :absolute="fixed" app>
        <span>&copy; {{ new Date().getFullYear() }} sugimoto kaiji,komaki yasuhiro</span>
    </v-footer>
</template>


<script lang="ts">
import Vue from 'vue'
interface DataType {
    fixed: boolean,
}
export default Vue.extend({
    data(): DataType {
        return {
            fixed: false,
        }
    }
})
</script>

<style scoped>
</style>