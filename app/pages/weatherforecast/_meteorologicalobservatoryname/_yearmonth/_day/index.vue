<template lang="pug">
.page
  Breadcrumbs(:layers="breadcrumbsLayers")
  Heading.heading(:headingText="headingText")
  article
    .content
      h2.content-title 地域を選択
      .area-list
        nuxt-link.link(
          v-for="(largeArea, index) in $store.getters['weatherForecastStore/largeAreas']",
          :key="index",
          :to="$route.path + largeArea.largeAreaCode + '/'"
        )
          | {{ largeArea.largeAreaName }}
    WeatherForecastContentFooterVue
</template>

<script lang="ts">
import Vue from "vue";
import Breadcrumbs from "~/components/pages/common/Breadcrumbs.vue";
import Heading from "~/components/pages/common/Heading.vue";
import WeatherForecastContentFooterVue from "~/components/pages/weatherForecast/WeatherForecastContentFooter.vue";
import { BreadcrumbsLayerInterface } from "~/interfaces/common/BreadcrumbsLayerInterface";
import { LargeAreaConditionInterface } from "~/interfaces/weatherForecast/LargeAreaConditionInterface";
import { Head } from "~/interfaces/common/Head";

interface DataType {
  breadcrumbsLayers: Array<BreadcrumbsLayerInterface>;
  meteorologicalObservatoryName: string;
  headingText: string;
  yearmonthstr: string;
  daystr;
}

export default Vue.extend({
  components: {
    Breadcrumbs,
    Heading,
    WeatherForecastContentFooterVue,
  },

  data(): DataType {
    const meteorologicalObservatoryName: string =
      this.$route.params.meteorologicalobservatoryname;
    const yearmonthstr: string =
      this.$route.params.yearmonth.substring(0, 4) +
      "年" +
      this.$route.params.yearmonth.substring(4, 6) +
      "月";
    const daystr: string = this.$route.params.day + "日";
    return {
      breadcrumbsLayers: [
        {
          path: "/weatherforecast/",
          name: "過去天気予報データベース",
        },
        {
          path: "/weatherforecast/" + meteorologicalObservatoryName + "/",
          name: meteorologicalObservatoryName,
        },
        {
          path:
            "/weatherforecast/" +
            meteorologicalObservatoryName +
            "/" +
            this.$route.params.yearmonth +
            "/",
          name: yearmonthstr,
        },
        {
          path: "",
          name: daystr,
        },
      ],
      headingText:
        meteorologicalObservatoryName +
        " " +
        "<br>" +
        yearmonthstr +
        daystr +
        " " +
        "の過去天気予報",
      meteorologicalObservatoryName: meteorologicalObservatoryName,
      yearmonthstr: yearmonthstr,
      daystr: daystr,
    };
  },

  head(): Head {
    return {
      title: this.headingText,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            this.yearmonthstr +
            this.daystr +
            "に行われた" +
            this.meteorologicalObservatoryName +
            "の天気予報です。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "過去天気予報,天気予報,過去データ,ビッグデータ,データ分析,データサイエンス,統計,機械学習",
        },

        { hid: "og:site_name", property: "og:site_name", content: "テンマド" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content:
            "https:/tenmado.app" +
            (this.$route.path.substr(-1) == "/"
              ? this.$route.path
              : this.$route.path + "/"),
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            this.meteorologicalObservatoryName +
            " - " +
            this.yearmonthstr +
            this.daystr +
            "の過去天気予報データベース - テンマド",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "過去に行われた" +
            this.meteorologicalObservatoryName +
            "の天気予報です。過去のデータ分析やAI・機械学習のモデリングなどにもお使いいただけます。",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href:
            "https:/tenmado.app" +
            (this.$route.path.substr(-1) == "/"
              ? this.$route.path
              : this.$route.path + "/"),
        },
      ],
    };
  },
  async fetch({ store, params }) {
    const reportDate: string =
      params.yearmonth.substring(0, 4) +
      "-" +
      params.yearmonth.substring(4, 6) +
      "-" +
      params.day;
    const largeAreaCondition: LargeAreaConditionInterface = {
      meteorologicalObservatoryName: params.meteorologicalobservatoryname,
      yearMonthStr: params.yearmonth,
      daystr: params.day,
    };
    await store.dispatch(
      "weatherForecastStore/fetchLargeArea",
      largeAreaCondition
    );
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 85vh;
}

.heading {
  margin-bottom: 50px;
}

article {
  display: flex;
  flex-direction: column;
}

.content {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.content-title {
  color: #555;
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 5px;
}

.area-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  padding: 30px;
}

.link {
  color: #4e8fd3;
  margin: 4px;
}

@media screen and (max-width: 500px) {
  .heading {
    margin-bottom: 50px;
    padding: 0 30px;
  }

  .content {
    width: 88%;
  }

  .area-list {
    border: 0px solid #eee;
  }
}
</style>