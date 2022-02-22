<template lang="pug">
.contacts
    .contact(v-for="contact in contacts")
        p(v-html="contact")
    a.btn.btn-flat(href="https://forms.gle/qz5mFykke7BLqoDK8")
        span 連絡する
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

.btn,
a.btn,
button.btn {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    padding: 0.5rem 3rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    letter-spacing: 0.1em;
    color: #212529;
    border-radius: 0.5rem;
    margin-top: 10px;
}
a.btn-flat {
    overflow: hidden;
    color: #fff;
    border-radius: 0;
    background: #a1a1a1;
}

a.btn-flat span {
    position: relative;
}

a.btn-flat:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 90px;
    content: "";
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-80%) translateY(-25px);
    transform: translateX(-80%) translateY(-59px);
    border-radius: 50%;
    background: #4e8fd3;
}

a.btn-flat:hover:before {
    width: 400px;
    height: 400px;
    -webkit-transform: translateX(-1%) translateY(-175px);
    transform: translateX(-1%) translateY(-175px);
}
</style>