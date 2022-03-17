<template lang="pug">
.sources
    .source(v-for="source in sources")
        p(v-html="source")
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        sources: { type: Array as PropType<Array<String>>, required: true },
    }
})

</script>

<style lang="scss" scoped>
.sources {
    margin-top: auto;
    margin-right: 16px;
    color: #333333;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
}
</style>