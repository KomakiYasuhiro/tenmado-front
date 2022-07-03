<template lang="pug">
.heading-breadcrumbs
    nav 
        ul.breadcrumbs(itemscope itemtype="http://schema.org/BreadcrumbList")
            li(itemscope itemprop="itemListElement" itemtype="http://schema.org/ListItem")
                nuxt-link.item.link-item(to="/" itemprop="item")
                    span(itemprop="name") Top 
                meta(itemprop="position" content="1")
            li(v-for="(layer, index) in layers" itemscope itemprop="itemListElement" itemtype="http://schema.org/ListItem")
                nuxt-link.item.link-item(v-if="index != layers.length-1" :to="layer.path" itemprop="item")
                    span(itemprop="name") {{ layer.name }}
                span(v-else itemprop="name") {{ layer.name }}
                meta(itemprop="position" :content="index + 2")

</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BreadcrumbsLayerInterface } from '~/interfaces/common/BreadcrumbsLayerInterface'

export default Vue.extend({
    props: {
        layers: { type: Array as PropType<Array<BreadcrumbsLayerInterface>>, required: true },
    }
})

</script>

<style lang="scss" scoped>
.heading-breadcrumbs {
    margin: 15px 30px;
    font-size: 14px;
    color: #333333;

    .breadcrumbs {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            display: inline;
            list-style: none;
        }

        li::after {
            content: ">";
            padding: 0 0.5em;
        }

        li:last-child::after {
            content: "";
        }
    }

    .link-item {
        color: #4e8fd3
    }
}

@media screen and (max-width: 500px) {
    .heading-breadcrumbs {
        margin: 15px 15px;
        font-size: 10px;
    }
}
</style>