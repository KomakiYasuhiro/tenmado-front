<template lang="pug">
footer
    .footer
        .footer-message
            p &copy;2022  KG, macas
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
        }
    }
})
</script>

<style lang="scss" scoped>
footer {
    margin-top: auto;
}
.footer {
    display: flex;
    align-items: center;
    background-color: #4e8fd3;
    color: #fff;
    height: 35px;
}

.footer-message {
    padding-left: 20px;
}
</style>