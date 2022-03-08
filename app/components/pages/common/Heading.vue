<template lang="pug">
.heading
    h1.heading-text {{ headingText }}
    .heading-breadcrumbs
        nav 
            ol.breadcrumbs(itemscope itemtype="http://schema.org/BreadcrumbList")
                li(itemscope itemprop="itemListElement" itemtype="http://schema.org/ListItem")
                    nuxt-link.item(to="/" itemprop="item")
                        span(itemprop="name") Top 
                    meta(itemprop="position" content="1")
                li.last-breadcrumb(itemscope itemprop="itemListElement" itemtype="http://schema.org/ListItem")
                    span(itemprop="name") {{ layerName }}
                    meta(itemprop="position" content="2")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        headingText: { type: String, required: true },
        layerName: { type: String, required: true },
    }
})

</script>

<style lang="scss" scoped>

.heading {
    display: flex;
    align-items: center;
    .heading-text {
        background-color: #4e8fd3;
        color: #fff;
        width: 300px;
        height: 40px;
        padding-left: 40px;
        display: flex;
        align-items: center;
        margin-block-start: 0em;
        margin-block-end: 0em;
        font-size: 18px;
        font-weight: bold;
    }

    .heading-breadcrumbs {

        margin-left: 30px;
        font-size: 14px;

        .breadcrumbs {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                display: inline;
                list-style: none;
            }
        

            li::after{
                content: '>';
                padding: 0 0.5em;
                color: #333333;
            }

            li:last-child::after{
                content: '';
            }

            .last-breadcrumb {
                color: #333333;
            }
        }

    }
}
</style>