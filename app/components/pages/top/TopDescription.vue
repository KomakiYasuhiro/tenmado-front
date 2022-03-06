<template lang="pug">
.description
    .description-text
        span.description-text-part その瞬間にしか取れないデータを蓄積。
        span.description-text-part 過去の出来事へのアクセスを可能に。
        span.description-text-part そのデータを開放することで、誰もが自由に使用可能。
        span.description-text-part 分析。可視化。AIへの利用。
        span.description-text-part さぁ 新たな発見へ。
        span.description-text-part データの可能性は無限大。
    img.description-image(src="~/assets/image/database.jpg")
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.description {
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #333333;

    .description-text {
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .description-text-part {
            padding: 10px 0px;
        }
    }

    .description-image {
        width: 500px;
        padding: 20px;
    }
}
</style>