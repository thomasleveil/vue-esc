import Vue from 'vue'
import App from './App.vue'
import VueEsc from './../dist/vue-esc.js'

Vue.use(VueEsc)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
