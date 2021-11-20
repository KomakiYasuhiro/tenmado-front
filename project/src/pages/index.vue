<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="10">
        <v-card class="logo py-4 d-flex justify-center">
          <v-form ref="form" v-model="valid">
          <v-row justify="center" align="center">

            <v-col cols="4">
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
            </v-col>

            <v-col cols="2">
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
            </v-col>

            <v-col cols="4">
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
            </v-col>

            <v-col cols="2">
              <v-btn class="mr-4" @click="submit">submit</v-btn>
            </v-col>
          </v-row>
          </v-form>
        </v-card>      
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="10">
        <v-card class="logo py-4 d-flex justify-center">   
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="10">  
                <v-col sm="12" md="12">
                    <v-subheader>
                      地域：{{weather.inputData.location}}　予報実施日：{{weather.inputData.implementationDate}}
                    </v-subheader>
                </v-col>
              <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        予報対象日
                      </th>
                      <th class="text-left">
                        予報
                      </th>
                      <th class="text-left">
                        降水確率
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in weather.weatherData" :key="item.targetPeriod">
                      <td>{{ item.targetPeriod }}</td>
                      <td>{{ item.weather }}</td>
                      <td>{{ item.rainyPercent }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: null,
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
      weather: {
        inputData: {
          location: 'はこだて',
          implementationDate: '2021/11/05',
        },

        weatherData: [
          {
            targetPeriod: '2021/11/06',
            weather: '晴れ',
            rainyPercent: '0%',
          },
          {
            targetPeriod: '2021/11/07',
            weather: '曇り',
            rainyPercent: '40%',
          },
          {
            targetPeriod: '2021/11/08',
            weather: '晴れ',
            rainyPercent: '20%',
          },
          {
            targetPeriod: '2021/11/09',
            weather: '晴れ',
            rainyPercent: '10%',
          },
        ]
      }
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
