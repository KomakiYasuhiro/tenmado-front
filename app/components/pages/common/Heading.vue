<template lang="pug">
h1.heading {{ headingText }}
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
    background-color: #4e8fd3;
    color: #fff;
    width: 300px;
    height: 40px;
    padding-left: 40px;
    display: flex;
    align-items: center;
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-size: 18px;
    font-weight: bold;
}
</style>