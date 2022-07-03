<template lang="pug">
header
    .header
        nuxt-link(to="/")
            img.header-logo(src="~/assets/image/tenmado-logo.svg" alt="テンマド")
        button.contact-button.button.button-primary-reverse.button-contact-icon-reverse(:onclick="`location.href='${contactUrl}'`") お問い合わせ
</template>


<script lang="ts">
import Vue from 'vue'
import constants from '~/constants/constants'

interface DataType {
    contactUrl: string
}

export default Vue.extend({
    data(): DataType {
        return {
            contactUrl: constants.contactUrl
        }
    },
})
</script>

<style lang="scss" scoped>
.header {
    height: 80px;
    width: 100%;
    padding-top: 16px;
    border-bottom: 3px solid #4e8fd3;
    margin-block-start: 0em;
    margin-block-end: 0em;
    display: flex;
    justify-content: space-between;
}
.header-logo {
    margin-left: 40px;
    height: 80px;
    width: 242.8px;
}

.contact-button {
    width: 200px;
    margin-top: 16px;
    margin-right: 40px;
}


@media screen and (max-width: 500px) {

    .header {
        height: 60px;
        padding-top: 8px;
    }

    .header-logo {
        margin-left: 12px;
        width: auto;
        height: 100%;
    }

    .contact-button {
        display: none;
    }
}


</style>