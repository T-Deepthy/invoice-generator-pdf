<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">HI, THIS IS FREE INVOICE GENERATOR</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button variant="light" @click="generatePdf()">Generate PDF</b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid class="background-color">
      <b-col>
        <b-container ref="content">
          <b-row>
            <b-col sm="6">
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id1 " size="sm" placeholder="Your company name" v-model="cdetails[0].cname"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id2" size="sm" placeholder="Your street" v-model="cdetails[0].street"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id3" size="sm" placeholder="Your town" v-model="cdetails[0].town"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id4" size="sm" placeholder="Address line 3" v-model="cdetails[0].address"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id5" size="sm" placeholder="Phone Number" v-model="cdetails[0].phno"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id6" size="sm" placeholder="Your Email id" v-model="cdetails[0].email"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id7" size="sm" placeholder="State Code" v-model="cdetails[0].state_code"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id8" size="sm" placeholder="GST Number" v-model="cdetails[0].gst_no"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col sm="6">
              <h3 class="mt-2">INVOICE</h3>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id1" size="sm" placeholder="Date" v-model="cldetails[0].date"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id2" size="sm" placeholder="Invoice Number" v-model="cldetails[0].ino"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id3" size="sm" placeholder="Pin Code" v-model="cldetails[0].po"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id4" size="sm" placeholder="Name" v-model="cldetails[0].name"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id5" size="sm" placeholder="Client Company Name" v-model="cldetails[0].clname"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id6" size="sm" placeholder="State Code" v-model="cldetails[0].state_code"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id7" size="sm" placeholder="GST Number" v-model="cldetails[0].gst_no"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <vue-editor id="editor" placeholder="Enter your message" v-model="text1" :editor-toolbar="customToolbar"></vue-editor>
            </b-col>
          </b-row>
          <div>
            <b-row class="ml-auto">
              <b-col class="p-4">
                <b-button class="float-right ml-4" variant="danger" @click="removeLastItem()">Delete row</b-button>
                <b-button class="float-right" variant="success" @click="addItemToTable()">Add row</b-button>
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
                    <td colspan="5">
                      <b-form-input v-model="footer[0].subTotalText" disabled></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="footer[0].subTotal" disabled></b-form-input>
                    </td>
                  </tr>
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
                    v-else-if="(cdetails[0].state_code!=cldetails[0].state_code) && cdetails[0].gst_no && cldetails[0].gst_no"
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
                    v-else-if="cldetails[0].state_code==32 && !cldetails[0].gst_no"
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
        </b-container>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      fields: [
        "index",
        { key: "sn", label: "HSN/SSN" },
        { key: "item", label: "Item Description" },
        { key: "qty", label: "Quantity" },
        { key: "up", label: "Unit Price" },
        { key: "tot", label: "Total" }
      ],
      items: [
        { sn: "-", item: "item1", qty: 0, up: 200, tot: 0 },
        { sn: "-", item: "", qty: 0, up: 0, tot: 0 }
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
          date: "",
          ino: "",
          po: "",
          name: "",
          clname: "",
          state_code: "",
          gst_no: ""
        }
      ],
      text1: "",
      text2: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      footer: [
        {
          subTotalText: "Sub Total",
          subTotal: "",
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
        this.findDiscount();
        this.findcgst();
        this.findsgst();
        this.findigst();
        this.findkfc();
        this.findGrandTotal();
      }
    }
  },
  methods: {
    generatePdf() {
      window.open(
        `/invoice/invoice.pdf?cdetails=${JSON.stringify(
          this.cdetails
        )}&cldetails=${JSON.stringify(this.cldetails)}&items=${JSON.stringify(
          this.items
        )}&text1=${JSON.stringify(this.text1)}&text2=${JSON.stringify(
          this.text2
        )}&footer=${JSON.stringify(this.footer)}`
      );
    },
    createPDF() {
      const doc = new jsPDF();
      const contentHtml = this.$refs.content.innerHTML;
      doc.fromHTML(contentHtml, 15, 15, {
        width: 170
      });
      doc.save("sample.pdf");
    },
    changeData(index) {
      if (this.items[index].qty && this.items[index].up) {
        this.items[index].tot = (this.items[index].qty * this.items[index].up).toFixed(2);
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
    validateDiscount() {}
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
</style>
