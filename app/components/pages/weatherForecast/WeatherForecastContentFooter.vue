<template lang="pug">
.content-footer
    hr.line
    Contact(:contactText="contactText")
    Source(:sources="sources")
</template>

<script lang="ts">
import Vue from 'vue'
import Contact from '~/components/pages/common/Contact.vue'
import Source from '~/components/pages/common/Source.vue'

interface DataType {
    contactText: string
    sources: Array<string>
}

export default Vue.extend({

    components: {
        Source,
        Contact,
    },

    data(): DataType {
        return {
            sources: [
                "出典: <a href='https://www.jma.go.jp/bosai/forecast/'>気象庁ホームページ</a>の過去ページを集計&加工して表示"
            ],
            contactText: "本サービスについてのお問い合わせや<br>過去の天気予報のデータ提供について等<br>お気軽にご連絡ください。<br>"
        }
    },
    
})
</script>