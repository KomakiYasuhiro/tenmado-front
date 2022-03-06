<template lang="pug">
.contact
    Headline(:text="'お問い合わせ'")
    Contact(:contactText="contactText")
</template>

<script lang="ts">
import Vue from 'vue'
import Headline from '~/components/pages/top/Headline.vue'
import Contact from '~/components/pages/common/Contact.vue'

export default Vue.extend({

    components: {
        Contact,
        Headline
    },

    props: {
        contactText: {
            type: String,
            required: true,
        },
    },
})
</script>

<style lang="scss" scoped>
.contact {
    margin-bottom: 20px;
}
</style>