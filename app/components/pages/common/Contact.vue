<template lang="pug">
.contacts
    .contact(v-for="contact in contacts")
        p(v-html="contact")
    .submit
        .submit-button-area
            a(href="https://forms.gle/qz5mFykke7BLqoDK8")
                input.submit-button.button.button-primary.contact(type="submit" value="連絡する")
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        contacts: { type: Array as PropType<Array<String>>, required: true },
    }
})

</script>

<style lang="scss" scoped>
.contacts {
    // margin-top: auto;
    color: #333333;
    font-size: 12px;
    text-align: center;
    display: flow-root;
    justify-content: center;
}
</style>