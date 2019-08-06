import { mapState } from "vuex"
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";

export default {
  data() { 
    return { 
      status: false
    }
  },
	computed: {
		...mapState('invoice', ['status', 'validation', 'cldetails','cdetails'])
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
      cdetails: [
        {
          cname: "",
          street: "",
          town: "",
          address: "",
          phno: "",
          email: "",
          state_code: "",
          gst_no: ""
        }
      ],
      cldetails: [
        {
          date: new Date(),
          ino: "",
          po: "",
          name: "",
          clname: "",
          state_code: "",
          gst_no: "",
          address: ""
        }
      ],

    }
  },
  methods:
  { 
    addItemToTable() {
      let row = { sn:'-', item: "", qty: 0, up: 0, tot: 0 };
      this.items.push(row);
    },
    removeLastItem() {
      this.items.pop();
    },

    generatePdf() {
      if (this.validatePDF())
      {
        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        let url =`/invoice/invoice.pdf?cdetails=${JSON.stringify(this.cdetails)}&cldetails=${JSON.stringify(this.cldetails)}&items=${JSON.stringify(this.items)}&text1=${JSON.stringify(this.text1)}&text2=${JSON.stringify(this.text2)}&footer=${JSON.stringify(this.footer)}&status=${JSON.stringify(this.status)}`
        if(is_chrome)  
        {
          const link = document.createElement('a');
          link.href = url;
          link.click();
        }
      
        else
        {
            this.validation = false
            window.open(`/invoice/invoice.pdf?cdetails=${JSON.stringify(this.cdetails)}&cldetails=${JSON.stringify(this.cldetails)}&items=${JSON.stringify(this.items)}&text1=${JSON.stringify(this.text1)}&text2=${JSON.stringify(this.text2)}&footer=${JSON.stringify(this.footer)}&status=${JSON.stringify(this.status)}`);
        }
      }
      else
      {
          window.alert("Missing fields");
          this.validation = true
      }
    },
  }
  
}