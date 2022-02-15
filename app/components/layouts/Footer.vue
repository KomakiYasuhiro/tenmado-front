<template lang="pug">
footer
    .footer
        .footer-message
            p &copy; {{ new Date().getFullYear() }} sugimoto kaiji,komaki yasuhiro
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