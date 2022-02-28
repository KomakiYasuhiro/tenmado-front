<template lang="pug">
.description
    p.description-text(v-html="descriptionText")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        descriptionText: { type: String, required: true },
    }
})
</script>

<style lang="scss" scoped>
.description {
    display: flex;
    justify-content: center;
}
.description-text {
    text-align: center;
    background-color: #c8f3ff;
    color: #003972;
    margin: 30px 50px 20px 50px;
    padding: 25px 35px;
}
</style>