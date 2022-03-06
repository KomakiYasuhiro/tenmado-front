<template lang="pug">
h2.headline
    span.headline-text {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        text: {
            type: String,
            required: true,
        },
    },
})
</script>

<style lang="scss" scoped>
.headline {
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .headline-text {
        margin: 30px 0px;
        color: #003972;
        font-weight: bold;
    }
}
</style>