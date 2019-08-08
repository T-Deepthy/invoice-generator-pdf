import { mapState, mapActions, mapMutations } from "vuex"
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    Datepicker,
    VueEditor,
  },
  computed: {
		...mapState('invoice', ['status', 'validation', 'footer','cldetails', 'cdetails','items'])
	},
  watch: {
    footer: {
            deep: true,
            handler() {
              this.findAllTax()
            }
          },
          cldetails: {
            deep: true,
            handler() {
              this.findAllTax()
            }
          },
          cdetails: {
            deep: true,
            handler() {
              this.findAllTax()
            }
          },
    items: {
      deep: true,
      handler() {
        this.findAllTax()
      }
    }
  },
  methods: {
    ...mapActions('invoice', ['findAllTax', 'changeData']),
    ...mapMutations('invoice', ['addItemToTable','removeLastItem']),
  }
};