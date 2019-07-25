<template>
  <div>
    <template v-if="learnmore">
      <div>
        <b-navbar type="dark" variant="info">
          <b-navbar-brand href="#">Invoice Generator</b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>HI, THIS IS FREE INVOICE GENERATOR</b-nav-item>
            <b-button variant="light">Learn More</b-button>
            <b-button variant="success" disabled>Sign Up</b-button>
          </b-navbar-nav>
        </b-navbar>
        <p style="font-size: 24px">
          <em>
            Your Business. Your Clients.
            One Free, Powerful Invoicing Platform.
          </em>
        </p>
        <h1>How to use this invoice generator</h1>
        <ul>
          <li>Add the details of invoice generating company and client company details</li>
          <li>Edit all the fileds in the page according to your need, if need to be blank make it blank</li>
          <li>Write the letter to client company in the text area provided</li>
          <li>Fill your table with the values</li>
          <li>Write thanking note in the text area provided at end</li>
        </ul>
        <b-button variant="info" @click="learnmore=false">Back to Home</b-button>
      </div>
    </template>
    <template v-else>
      <b-navbar type="dark" variant="info">
        <b-navbar-brand href="#">Invoice Generator</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>HI, THIS IS FREE INVOICE GENERATOR</b-nav-item>
          <b-button variant="light" @click="learnmore=true">Learn More</b-button>
          <b-button variant="success" disabled>Sign Up</b-button>
        </b-navbar-nav>
      </b-navbar>
      <b-container fluid class="background-color">
        <b-row class="ml-auto">
          <b-col align-self="center" cols="2">
            <b-row class="my-4">
              <b-col>
                <b-button @click="generatePdf()">pdf</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col>
                <b-button @click="addItemToTable()">Add row</b-button>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col>
                <b-button @click="removeLastItem()">Delete row</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col align-self="end" cols="10">
            <b-container ref="content">
              <b-row>
                <b-col sm="6">
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id1 " size="sm" v-model="cdetails[0].cname"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id2" size="sm" v-model="cdetails[0].street"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id3" size="sm" v-model="cdetails[0].town"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id4" size="sm" v-model="cdetails[0].address"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id5" size="sm" v-model="cdetails[0].phno"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id6" size="sm" v-model="cdetails[0].email"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id7" size="sm" v-model="cdetails[0].state_code"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id8" size="sm" v-model="cdetails[0].gst_no"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col sm="6">
                  <h3 class="mt-2">INVOICE</h3>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id1" size="sm" v-model="cldetails[0].date"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id2" size="sm" v-model="cldetails[0].ino"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id3" size="sm" v-model="cldetails[0].po"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id4" size="sm" v-model="cldetails[0].name"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id5" size="sm" v-model="cldetails[0].clname"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id6" size="sm" v-model="cldetails[0].state_code"></b-form-input>
                  </b-input-group>
                  <b-input-group size="sm" class="mt-2">
                    <b-form-input id="id7" size="sm" v-model="cldetails[0].gst_no"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <vue-editor id="editor" v-model="text1" :editor-toolbar="customToolbar"></vue-editor>
                </b-col>
              </b-row>
              <div>
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
                          <b-form-input v-model="footer[0].subTotalText"></b-form-input>
                        </td>
                        <td>
                          <b-form-input v-model="footer[0].subTotal" disabled></b-form-input>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4">
                          <b-form-input v-model="footer[0].discountText"></b-form-input>
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
                            <b-form-input v-model="footer[0].sgstText"></b-form-input>
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
                            <b-form-input v-model="footer[0].cgstText"></b-form-input>
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
                            <b-form-input v-model="footer[0].igstText"></b-form-input>
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
                        v-else-if="cldetails[0].state_code==32"
                        &#x26;&#x26;
                        !cldetails[0].gst_no
                      >
                        <tr>
                          <td colspan="4">
                            <b-form-input v-model="footer[0].kfcText"></b-form-input>
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
                            <b-form-input v-model="footer[0].sgstText"></b-form-input>
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
                            <b-form-input v-model="footer[0].cgstText"></b-form-input>
                          </td>
                          <td>
                            <b-form-input v-model="footer[0].cgstPercentage"></b-form-input>
                          </td>
                          <td>
                            <b-form-input v-model="footer[0].cgst" disabled></b-form-input>
                          </td>
                        </tr>
                      </template>

                      <tr>
                        <td colspan="5">
                          <b-form-input v-model="footer[0].grandTotalText"></b-form-input>
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
                  <vue-editor id="editor" v-model="text2" :editor-toolbar="customToolbar"></vue-editor>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </template>
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
      learnmore: false,
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
          cname: "Your company name",
          street: "Your street",
          town: "Your town",
          address: "Address line 3",
          phno: 9037511924,
          email: "email@gmail.com",
          state_code: "State Code",
          gst_no: "GST Number"
        }
      ],
      cldetails: [
        {
          date: "04-06-2019",
          ino: "invoice1223",
          po: "682026",
          name: "Deepthy",
          clname: "Client company name",
          state_code: "State Code",
          gst_no: "GST Number"
        }
      ],
      text1: "enter your message",
      text2: "enter your message",
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
          discountPercentage: 15,
          cgstText: "CGST",
          cgstPercentage: 9,
          cgst: 0,
          sgstText: "SGST",
          sgstPercentage: 9,
          sgst: 0,
          igstText: "IGST",
          igstPercentage: 9,
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
        this.items[index].tot = this.items[index].qty * this.items[index].up;
      }
      let subTotal = 0;
      this.items.map(item => {
        subTotal += item.tot;
      });
      this.footer[0].subTotal = subTotal;
    },
    findDiscount() {
      if (
        this.footer[0].discountPercentage > 100 ||
        this.footer[0].discountPercentage < 0
      ) {
        console.log(this.footer[0].discountPercentage);
        this.footer[0].discountPercentage = 0;
      } else {
        let discount =
          (this.footer[0].discountPercentage / 100) * this.footer[0].subTotal;
        this.footer[0].discount = discount.toFixed(2);
      }
    },
    findcgst() {
      let cgst =
        (this.footer[0].cgstPercentage / 100) * this.footer[0].subTotal;
      this.footer[0].cgst = cgst.toFixed(2);
    },
    findsgst() {
      let sgst =
        (this.footer[0].sgstPercentage / 100) * this.footer[0].subTotal;
      this.footer[0].sgst = sgst.toFixed(2);
    },
    findigst() {
      let igst =
        (this.footer[0].igstPercentage / 100) * this.footer[0].subTotal;
      this.footer[0].igst = igst.toFixed(2);
    },
    findkfc() {
      let kfc = (this.footer[0].kfcPercentage / 100) * this.footer[0].subTotal;
      this.footer[0].kfc = kfc.toFixed(2);
    },
    findGrandTotal() {
      let grandTotal =
        parseFloat(this.footer[0].subTotal) +
        parseFloat(this.footer[0].igst) +
        parseFloat(this.footer[0].sgst) +
        parseFloat(this.footer[0].cgst) +
        parseFloat(this.footer[0].kfc) -
        parseFloat(this.footer[0].discount);
      this.footer[0].grandTotal = grandTotal.toFixed(2);
    },
    addItemToTable() {
      let row = { item: "", qty: 0, up: 0, tot: 0 };
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
