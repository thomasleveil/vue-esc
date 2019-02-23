import Vue from 'vue'
import App from './App.vue'
import VueEsc from './../src/index.js'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

Vue.use(VueEsc)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
