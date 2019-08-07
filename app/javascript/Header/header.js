import { mapState } from "vuex"
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";

export default {
	computed: {
		...mapState('invoice', ['validation', 'cldetails', 'cdetails'])
	},
	components: {
    Datepicker,
    VueEditor
  },
  data()
  { 
    return {
      status: false,
      text1: "Thanks for your service",
       customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
    }
  }
}