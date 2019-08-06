import Vue from "vue"
import Vuex from "vuex"
import invoice from "./modules/invoice/index"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		invoice
	},
});