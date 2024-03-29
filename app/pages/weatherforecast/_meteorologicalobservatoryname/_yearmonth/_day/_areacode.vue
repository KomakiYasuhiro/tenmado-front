<template lang="pug">
.page
  Breadcrumbs(:layers="breadcrumbsLayers")
  Heading.heading(:headingText="headingText")
  article
    .content
      .cards
        template(
          v-if="$store.getters['weatherForecastStore/weatherForecast'] != null"
        )
          template(
            v-for="forecast in $store.getters['weatherForecastStore/weatherForecast'].forecasts"
          )
            WeatherForecastCard(:forecast="forecast")
        template(v-else)
          .sorry 取得失敗した可能性が高い日です。詳細につきましてはお問い合わせください。
    WeatherForecastContentFooterVue
</template>

<script lang="ts">
import Vue from "vue";
import { Head } from "~/interfaces/common/Head";
import { BreadcrumbsLayerInterface } from "~/interfaces/common/BreadcrumbsLayerInterface";
import { WeatherForecastConditionInterface } from "~/interfaces/weatherForecast/WeatherForecastConditionInterface";
import WeatherForecastCard from "~/components/pages/weatherForecast/WeatherForecastCard.vue";
import Heading from "~/components/pages/common/Heading.vue";
import Breadcrumbs from "~/components/pages/common/Breadcrumbs.vue";
import WeatherForecastContentFooterVue from "~/components/pages/weatherForecast/WeatherForecastContentFooter.vue";

interface DataType {
  breadcrumbsLayers: Array<BreadcrumbsLayerInterface>;
  headingText: string;
  meteorologicalObservatoryNameLargeAreaName: string;
  yearmonthstr: string;
  daystr: string;
}

export default Vue.extend({
  components: {
    Breadcrumbs,
    Heading,
    WeatherForecastCard,
    WeatherForecastContentFooterVue,
  },

  data(): DataType {
    const meteorologicalObservatoryName: string =
      this.$store.getters["weatherForecastStore/weatherForecast"]
        .meteorologicalObservatoryName;
    const largeAreaName: string =
      this.$store.getters["weatherForecastStore/weatherForecast"].largeAreaName;
    const meteorologicalObservatoryNameLargeAreaName: string =
      meteorologicalObservatoryName + " - " + largeAreaName;
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
          path:
            "/weatherforecast/" +
            meteorologicalObservatoryName +
            "/" +
            this.$route.params.yearmonth +
            "/" +
            this.$route.params.day +
            "/",
          name: daystr,
        },
        {
          path: "",
          name: largeAreaName,
        },
      ],
      headingText:
        meteorologicalObservatoryNameLargeAreaName +
        " " +
        "<br>" +
        yearmonthstr +
        daystr +
        " " +
        "の過去天気予報",
      meteorologicalObservatoryNameLargeAreaName:
        meteorologicalObservatoryNameLargeAreaName,
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
            this.meteorologicalObservatoryNameLargeAreaName +
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
            this.meteorologicalObservatoryNameLargeAreaName +
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
            this.meteorologicalObservatoryNameLargeAreaName +
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
    const weatherForecastCondition: WeatherForecastConditionInterface = {
      meteorologicalObservatoryName: params.meteorologicalobservatoryname,
      largeAreaCode: params.areacode,
      yearMonthStr: params.yearmonth,
      daystr: params.day,
    };
    await store.dispatch(
      "weatherForecastStore/fetchWeatherForecast",
      weatherForecastCondition
    );
  },
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0px;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 400px;
}

.sorry {
  color: #555555;
}

@media screen and (max-width: 500px) {
  .cards {
    width: 88%;
  }
}
</style>