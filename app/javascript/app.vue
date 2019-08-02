<template>
  <div>
   <app-navigation></app-navigation>
    <b-container fluid class="background-color">
      <b-col>
        <b-container ref="content">
          <b-row>
            <companydetails></companydetails>
            <clientdetails></clientdetails>
          </b-row>
         <invoicecheckbox></invoicecheckbox>
          <b-row class="mt-2">
            <b-col>
              <vue-editor id="editor" placeholder="Enter your message" v-model="text1" :editor-toolbar="customToolbar"></vue-editor>
            </b-col>
          </b-row>
          <div>
            <b-row class="ml-auto">
              <b-col class="p-4">
                <b-button class="float-right ml-4" variant="danger" @click="removeLastItem()">- Delete row</b-button>
                <b-button class="float-right" variant="success" @click="addItemToTable()">+ Add row</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>HSN/SSN</th>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                      <b-form-input v-model="item.sn"></b-form-input>
                    </td>
                    <td class="item-table__item">
                      <b-form-input v-model="item.item"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.qty" @input="changeData(index)"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.up" @input="changeData(index)"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.tot" disabled></b-form-input>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4">
                      <b-form-input v-model="footer[0].discountText" disabled></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="footer[0].discountPercentage"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="footer[0].discount" disabled></b-form-input>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <b-form-input v-model="footer[0].subTotalText" disabled></b-form-input>
                    </td>
                    <td>
                      <b-form-input :class="validation? 'border-red': ''" v-model="footer[0].newsubTotal" disabled></b-form-input>
                    </td>
                  </tr>
                  
                  <template
                    v-if="(cdetails[0].state_code==cldetails[0].state_code) && cdetails[0].gst_no && cldetails[0].gst_no"
                  >
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].sgstText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].sgstPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].sgst" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].cgstText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].cgstPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].cgst" disabled></b-form-input>
                      </td>
                    </tr>
                  </template>
                  <template
                    v-else-if="(cdetails[0].state_code!=cldetails[0].state_code) && cdetails[0].gst_no"
                  >
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].igstText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].igstPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].igst" disabled></b-form-input>
                      </td>
                    </tr>
                  </template>

                  <template
                    v-else-if="cldetails[0].state_code==32 && cdetails[0].state_code==32 && !cldetails[0].gst_no && cdetails[0].gst_no"
                  >
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].kfcText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].kfcPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].kfc" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].sgstText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].sgstPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].sgst" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer[0].cgstText" disabled></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].cgstPercentage" @input="findcgst"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer[0].cgst" disabled></b-form-input>
                      </td>
                    </tr>
                  </template>

                  <tr>
                    <td colspan="5">
                      <b-form-input v-model="footer[0].grandTotalText" disabled></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="footer[0].grandTotal" disabled></b-form-input>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </b-row>
          </div>
          <b-row class="mt-2">
            <b-col>
              <vue-editor id="editor" placeholder="Enter your message" v-model="text2" :editor-toolbar="customToolbar"></vue-editor>
            </b-col>
          </b-row>
          <p class="mt-2" align="center">© Copyright 2019 <a href="https://redpanthers.co">Red Panthers Software Solutions</a> Pvt Ltd.</p>
        </b-container>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import AppNavigation from "./AppNavigation";
import CompanyDetails from "./CompanyDetails";
import ClientDetails from "./ClientDetails";
import InvoiceCheckbox from "./InvoiceCheckbox"
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
export default {
  components: {
    Datepicker,
    VueEditor,
    AppNavigation,
    CompanyDetails,
    ClientDetails,
    InvoiceCheckbox
  },
  data() {
    return {
      status: false,
      validation: false,
      fields: [
        "index",
        { key: "sn", label: "HSN/SAC" },
        { key: "item", label: "Item Description" },
        { key: "qty", label: "Quantity" },
        { key: "up", label: "Unit Price" },
        { key: "tot", label: "Total" }
      ],
      items: [
        { sn: "998434", item: "Software Product", qty: 0, up: 200, tot: 0 }
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
      text1: "Thanks for your service",
      text2: "Payment terms: to be received in 5 days",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      footer: [
        {
          subTotalText: "Sub Total",
          subTotal: 0,
          newsubTotal: 0,
          discountText: "Discount",
          discount: 0,
          discountPercentage: 0,
          cgstText: "CGST",
          cgstPercentage: 9,
          cgst: 0,
          sgstText: "SGST",
          sgstPercentage: 9,
          sgst: 0,
          igstText: "IGST",
          igstPercentage: 18,
          igst: 0,
          kfcText: "KFC",
          kfcPercentage: 1,
          kfc: 0,
          grandTotalText: "Grand Total",
          grandTotal: 0
        }
      ]
    };
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
      }
    },
      
      //   this.validation = false
      //   axios.post(
      //   `/invoice/invoice.pdf?cdetails=${JSON.stringify(
      //     this.cdetails
      //   )}&cldetails=${JSON.stringify(this.cldetails)}&items=${JSON.stringify(
      //     this.items
      //   )}&text1=${JSON.stringify(this.text1)}&text2=${JSON.stringify(
      //     this.text2
      //   )}&footer=${JSON.stringify(this.footer)}
      //   &status=${JSON.stringify(this.status)}`, {
      //     responseType: 'arraybuffer'
      //   }
      //   ).then(response => {
      //     console.log('test')
      //     console.log(response);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'asda.pdf');
      // document.body.appendChild(link);
      // link.click();
      // console.log('test')
    // });
     
    // createPDF() {
    //   const doc = new jsPDF();
    //   const contentHtml = this.$refs.content.innerHTML;
    //   doc.fromHTML(contentHtml, 15, 15, {
    //     width: 170
    //   });
    //   doc.save("sample.pdf");
    // },
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
</script>
<style scoped>
.background-color {
  background-color: #ffffff;
  height: 100vh;
}
.item-table__item {
  width: 400px !important;
}
.border-red { 
  border: #f00 1px solid;
}
.vdp-datepicker {
    box-sizing: border-box;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: none !important
}
</style>
