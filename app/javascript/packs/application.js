import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from '../app.vue'
import BootstrapVue from 'bootstrap-vue'
import Vue2Editor from "vue2-editor"
import Vuex from 'vuex'
Vue.use(BootstrapVue)
Vue.use(Vue2Editor);
Vue.use(Vuex)
document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App),
    el: '#app'
  })
})