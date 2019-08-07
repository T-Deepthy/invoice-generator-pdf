import { mapState } from "vuex"
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
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
    findAllTax() {
        this.findDiscount();
        this.findcgst();
        this.findsgst();
        this.findigst();
        this.findkfc();
        this.findGrandTotal();  
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
          byebug
      }
    },
    changeData(index) {
      if (this.items[index].qty && this.items[index].up) {
        this.items[index].tot = this.items[index].qty * this.items[index].up;
      }
      let subTotal = 0;
      this.items.map(item => {
        subTotal += item.tot;
      });
      this.footer[0].subTotal = subTotal.toFixed(2);
    },
    findDiscount() {
      if (
        this.footer[0].discountPercentage > 100 ||
        this.footer[0].discountPercentage < 0
      ) {
        this.footer[0].discountPercentage = 0;
      } else {
        let discount =
          (this.footer[0].discountPercentage / 100) * this.footer[0].subTotal;
        this.footer[0].discount = discount.toFixed(2);
        this.footer[0].newsubTotal = this.footer[0].subTotal-this.footer[0].discount;
      }
    },
    findcgst() {
      if(((this.cdetails[0].state_code==this.cldetails[0].state_code) && this.cdetails[0].gst_no && this.cldetails[0].gst_no)|| (this.cldetails[0].state_code==32 && !this.cldetails[0].gst_no))
      {
      let cgst =
        (this.footer[0].cgstPercentage / 100) * this.footer[0].newsubTotal;
      this.footer[0].cgst = cgst.toFixed(2);
      }
    },
    findsgst() {
      if(((this.cdetails[0].state_code==this.cldetails[0].state_code) && this.cdetails[0].gst_no && this.cldetails[0].gst_no)|| (this.cldetails[0].state_code==32 && !this.cldetails[0].gst_no))      
      {
      let sgst =
        (this.footer[0].sgstPercentage / 100) * this.footer[0].newsubTotal;
      this.footer[0].sgst = sgst.toFixed(2);
      }
    },
    findigst() {
      if((this.cdetails[0].state_code!=this.cldetails[0].state_code) && this.cdetails[0].gst_no && this.cldetails[0].gst_no)
      {let igst =
        (this.footer[0].igstPercentage / 100) * this.footer[0].newsubTotal;
      this.footer[0].igst = igst.toFixed(2);
      }
    },
    findkfc() {
      if(this.cldetails[0].state_code==32 && !this.cldetails[0].gst_no)
      {
      let kfc = (this.footer[0].kfcPercentage / 100) * this.footer[0].newsubTotal;
      this.footer[0].kfc = kfc.toFixed(2);
      }
    },
    findGrandTotal() {
      let grandTotal =
        parseFloat(this.footer[0].newsubTotal) +
        parseFloat(this.footer[0].igst) +
        parseFloat(this.footer[0].sgst) +
        parseFloat(this.footer[0].cgst) +
        parseFloat(this.footer[0].kfc) 
      this.footer[0].grandTotal = grandTotal.toFixed(2);
    },
    addItemToTable() {
      let row = { sn:'-', item: "", qty: 0, up: 0, tot: 0 };
      this.items.push(row);
    },
    removeLastItem() {
      this.items.pop();
    },
    validatePDF() {
      if (status==true)
        return ((this.items.length!=0) && 
              (this.footer[0].subTotal!=0)&&
              this.cdetails[0].state_code && 
              this.cldetails[0].state_code &&
              this.cdetails[0].gst_no&& 
              this.cdetails[0].cname && 
              this.cldetails[0].name);
      else
      return ((this.items.length!=0) && 
              (this.footer[0].subTotal!=0)&&
              this.cdetails[0].cname && 
              this.cldetails[0].name);
    }
  }
};