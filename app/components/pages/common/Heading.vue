<template lang="pug">
h2.heading
    .heading-value {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        value: { type: String, required: true },
    }
})

</script>

<style lang="scss" scoped>
.heading {
    background-color: #4e8fd3;
    color: #fff;
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin-block-start: 0em;
    margin-block-end: 0em;
}

.heading-value {
    font-size: 18px;
}
</style>