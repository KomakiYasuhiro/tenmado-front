<template lang="pug">
.contact
    .contact-text(v-html="contactText")
    p {{ contactUrl }}
    .contact-button-area
        button.contact-button.button.button-primary.button-contact-icon(:onclick="`location.href='${contactUrl}'`") 連絡する
</template>

<script lang="ts">
import Vue from 'vue'
import constants from '~/constants/constants'

export default Vue.extend({

    data() {
        return {
            contactUrl: constants.contactUrl
        }
    },

    props: {
        contactText: { type: String, required: true },
    }
})

</script>

<style lang="scss" scoped>
.contact {
    color: #333333;
    font-size: 12px;
    text-align: center;
    display: flow-root;
    justify-content: center;
}

.contact-text {
    margin: 10px 0px;
}

.contact-button-area {
    margin: 20px;

    .contact-button {
        width: 200px;
        color: #ffffff;
    }
}
</style>