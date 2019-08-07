import { mapState, mapMutations} from "vuex";
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";

export default {
  computed: {
    ...mapState("invoice", ["validation", "cldetails", "cdetails"]),
    status: {
      get() {
        return this.$store.state.invoice.status
      },
      set(value) {
        this.setState({ state: 'status', value })
      }
    },
  },
  components: {
    Datepicker,
    VueEditor
  },
  data() {
    return {
      text1: "Thanks for your service",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    };
  },
  methods: {
    ...mapMutations('invoice', ['setState'])
  }
};
