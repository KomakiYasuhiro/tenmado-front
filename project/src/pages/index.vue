<template>
  <v-form ref="form" v-model="valid">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="10">
        <v-card class="logo py-4 d-flex justify-center">
          <div sm="3" md="6">
            <v-select
              v-model="location"
              :items="locationItem"
              :rules="[v => !!v || '必須項目です']"
              label="対象地域"
              item-text="label"
              item-value="value"
              prepend-icon="mdi-map-marker-radius"
              required
            ></v-select>
          </div>
          <div>
            <v-menu ref="implementationMenu" v-model="implementationMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="implementationDate" label="予報実施日" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker
            v-model="implementationDate"
            :show-current="false"
            :active-picker.sync="activePicker"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="2021-11-05"
            @change="implementationSave"
            ></v-date-picker>
            </v-menu>
          </div>
          <div>
            <v-menu ref="targetMenu" v-model="targetMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="targetPeriod" label="予報対象期間" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker
              v-model="targetPeriod"
              range
              :show-current="false"
              :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              min="2021-11-05"
              @change="targetPeriodSave"
              ></v-date-picker>
            </v-menu>
          </div>
          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </v-card>      
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      activePicker: null,
      implementationDate: null,
      targetPeriod: null,
      implementationMenu: false,
      targetMenu: false,
      location: null,
      locationItem: [
        { label: 'はこだて'   , value: 'hakodate'  },
        { label: 'かいじのいえ' , value: 'kaiji'    },
        { label: 'こまきのいえ' , value: 'komaki'   },
      ],
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      submit () {
        alert('地域：'+this.location+' \n実施日：'+this.implementationDate+' \n対象期間：'+this.targetPeriod)
      },
      implementationSave (implementationDate) {
        this.$refs.implementationMenu.save(implementationDate)
      },
      targetPeriodSave (targetPeriod) {
        this.$refs.targetMenu.save(targetPeriod)
      },
    },
  }
</script>
