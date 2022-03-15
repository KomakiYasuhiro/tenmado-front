<template lang="pug">
.heading
    h1.heading-text {{ headingText }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        headingText: { type: String, required: true },
    }
})

</script>

<style lang="scss" scoped>

.heading {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    .heading-text {
        color: #555555;
        margin-block-start: 0em;
        margin-block-end: 0em;
        font-size: 24px;
        font-weight: normal;
    }

}
</style>