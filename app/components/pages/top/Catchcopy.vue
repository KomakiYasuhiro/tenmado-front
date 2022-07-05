<template lang="pug">
h1.catchcopy
    span.title テンマド
    span.subtitle 瞬間を捉え、開放せよ
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
.catchcopy {
    width: 100%;
    height: 400px;
    margin-top: 5px;
    margin-bottom: 0px;

    background: linear-gradient(
            rgba($color: #333333, $alpha: 0.6),
            rgba($color: #333333, $alpha: 0.6)
        ),
        url("~/assets/image/top-catchcopy-bg.jpeg");
    background-size: cover;
    background-position: 0% 25%;
    background-repeat: no-repeat;

    color: #fcffff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.title {
    margin: 15px 0px;
    font-size: 45px;
}

.subtitle {
    font-size: 30px;
}

@media screen and (max-width: 500px) {
    .catchcopy {
        height: 360px;
    }

    .title {
        font-size: 28px;
    }

    .subtitle {
        font-size: 20px;
    }
}
</style>