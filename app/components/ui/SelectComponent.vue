<template lang="pug">
.cp_ipselect.cp_sl01
    select(@change="updateValue" :disabled="disabled")
        option(disabled selected :value="null")  選択してください
        option(v-for="(option, index) in options" :value="index")
            | {{ optionText ? option[optionText] : option }}
    div {{ value }}
</template>

<script>
export default {
    name: "SelectComponent",
    props: {
        value: { type: Object | null, required: true },
        disabled: { type: Boolean, required: false, default: false },
        options: { type: Array, required: true },
        optionText: { type: String, required: false },
        optionValue: { type: String, required: false },
        returnObject: { type: Boolean, required: false, default: false }
    },
    methods: {
        // 選択されたindexの要素を返す
        updateValue: function (event) {
            let valueObject = this.options[event.target.value]
            this.$emit("input", !this.optionText ? valueObject : (this.returnObject ? valueObject : valueObject[this.optionValue]));
            // this.$emit("change")
        }
    },
    watch: {
        value(newValue) {
            console.log(newValue)
        }
    }
};
</script>

<style lang="scss" scoped>
.cp_ipselect {
    overflow: hidden;
    width: 90%;
    margin: 2em auto;
    text-align: center;
}
.cp_ipselect select {
    width: 100%;
    padding-right: 1em;
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
}
.cp_ipselect select::-ms-expand {
    display: none;
}
.cp_ipselect.cp_sl01 {
    position: relative;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    background: #ffffff;
}
.cp_ipselect.cp_sl01::before {
    position: absolute;
    top: 0.8em;
    right: 0.9em;
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #666666;
    pointer-events: none;
}
.cp_ipselect.cp_sl01 select {
    padding: 8px 38px 8px 8px;
    color: #444444;
}
</style>