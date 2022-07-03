<template lang="pug">
article.content
    Catchcopy
    .description.bg-gray
        TopDescription
    .services
        TopServices
    .contact.bg-gray
        TopContact(:contactText="contactText")
</template>

<script lang="ts">
import Vue from 'vue'
import Catchcopy from '~/components/pages/top/Catchcopy.vue'
import TopDescription from '~/components/pages/top/TopDescription.vue'
import TopServices from '~/components/pages/top/TopServices.vue'
import TopContact from '~/components/pages/top/TopContact.vue'

export default Vue.extend({

    components: {
        Catchcopy,
        TopDescription,
        TopServices,
        TopContact,
    },


    data() {
        return {
            contactText: "本サービスについてのお問い合わせや<br>各種データ提供について等<br>お気軽にご連絡ください。<br>"
        }
    },

    head() {
        return {
            titleTemplate: '',
            title: 'テンマド',
            meta: [
                { hid: 'description', name: 'description', content: 'テンマドは集約されたあらゆるデータについて検索できるお手軽便利サービスです。' },
                { hid: 'keywords', name: 'keywords', content: 'データ基盤,過去データ,ビッグデータ,データ分析,データサイエンス,統計,機械学習' },

                { hid: 'og:site_name', property: 'og:site_name', content: 'テンマド' },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:url', property: 'og:url', content: 'https:/tenmado.app/' },
                { hid: 'og:title', property: 'og:title', content: 'テンマド' },
                { hid: 'og:description', property: 'og:description', content: 'テンマドは集約されたあらゆるデータについて検索できるお手軽便利サービスです。' },
            ],
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'https:/tenmado.app/' }
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.content {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 50px;
}
.bg-gray {
    background-color: #eeeeee;
}

.description {
    width: 100%;
}

.services {
    margin: 30px 0px 50px 0px;
}

.contact {
    width: 100%;
}

@media screen and (max-width: 500px) {
    .content {
        width: 100%;
    }
}


</style>