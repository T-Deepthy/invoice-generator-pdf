<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Invoice Generator</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>HI, THIS IS FREE INVOICE GENERATOR</b-nav-item>
        <b-button variant="light" href="https://invoicely.com/">Learn More</b-button>
        <b-button variant="success" href="https://invoicely.com/signup">Sign Up</b-button>
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
                  <b-form-input id="input-small" size="sm" v-model="cdetails[0].street"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="input-small" size="sm" v-model="cdetails[0].town"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="input-large" size="sm" v-model="cdetails[0].address"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="imput-small" size="sm" v-model="cdetails[0].phno"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="imput-small" size="sm" v-model="cdetails[0].email"></b-form-input>
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
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <vue-editor id="editor" v-model="text1" :editor-toolbar="customToolbar"></vue-editor>
              </b-col>
            </b-row>
            <div>
              <b-row class="mt-2">
                <table class=" table table-striped table-hover">
                  <thead>
                    <tr>
                      <th> Index </th>
                      <th> HSN/SSN </th>
                      <th> Item Description </th>
                      <th> Quantity   </th>
                      <th> Unit Price </th>
                      <th> Total </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{index+1}}</td>
                      <td>
                        <b-form-input v-model="item.sn"></b-form-input>
                      </td>
                      <td class="item-table__item"><b-form-input v-model="item.item"></b-form-input></td>
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
                        <b-form-input v-model="footer.subTotalText"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.subTotal" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer.discountText"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.discountPercentage"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.discount" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <b-form-input v-model="footer.taxText"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.taxPercentage" ></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.tax" disabled></b-form-input>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5">
                        <b-form-input v-model="footer.grandTotalText"></b-form-input>
                      </td>
                      <td>
                        <b-form-input v-model="footer.grandTotal" disabled></b-form-input>
                      </td>
                    </tr>
                  </tfoot>
                  <!-- <template slot="index" slot-scope=">{{ data.index + 1 }}</template>
                  <template slot="item" slot-scope="data">
                    <b-form-input v-model="data.item.item" class="item-table__item"></b-form-input>
                  </template>
                  <template slot="qty" slot-scope="data">
                    <b-form-input v-model="data.item.qty" @input="changeData(data.index)"></b-form-input>
                  </template>
                  <template slot="up" slot-scope="data">
                    <b-form-input v-model="data.item.up" @input="changeData(data.index)"></b-form-input>
                  </template>
                  <template slot="sn" slot-scope="data">
                    <b-form-input v-model="data.item.sn"></b-form-input>
                  </template>
                  <template slot="tot" slot-scope="data">
                    <b-form-input v-model="data.item.tot" disabled></b-form-input>
                  </template> -->
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
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      fields: [
        "index",
        { key: "sn", label: "HSN/SSN" },
        { key: "item", label: "Item Description"},
        { key: "qty", label: "Quantity" },
        { key: "up", label: "Unit Price" },
        { key: "tot", label: "Total" }
      ],
      items: [
        { item: "item1", qty: 0, up: 200, sn: 0, tot: 0 },
        { item: "", qty: 0, up: 0, sn: 0, tot: 0 }
      ],
      cdetails: [
        {
          cname: "Your company name",
          street: "Your street",
          town: "Your town",
          address: "Address line 3",
          phno: 9037511924,
          email: "email@gmail.com"
        }
      ],
      cldetails: [
        {
          date: "04-06-2019",
          ino: "invoice1223",
          po: "682026",
          name: "Deepthy",
          clname: "Client company name"
        }
      ],
      text1: "enter your message",
      text2: "enter your message",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      footer: {
        subTotalText: 'Sub Total',
        subTotal: '',
        discountText: 'Discount%',
        discount: 0,
        discountPercentage: 15,
        taxText: 'Sales Tax(GST, CGST, SGST, IGST)%',
        taxPercentage: 10,
        tax: 0,
        grandTotalText: 'Grand Total',
        grandTotal: 0,
      }
      
    };
  },
  watch: {
    footer: {
      deep: true,
      handler() {
        this.findDiscount();
        this.findTax();
        this.findGrandTotal();
      }
    }
    // subTotal() {
    //   this.findDiscount();
    //   this.findTax();
    //   this.findGrandTotal();
    // },
    // taxPercentage() {
    //   this.findTax();
    //   this.findGrandTotal();
    // },
    // discountPercentage() {
    //   this.findDiscount();
    //   this.findGrandTotal();
    // }
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
      /** WITHOUT CSS */
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
      this.items.map((item) => {
        subTotal += item.tot
      })
      this.footer.subTotal = subTotal;
      // let discount = (this.discountPercentage/100)* this.subTotal;
    },
    findDiscount() {
      if(this.footer.discountPercentage > 100 || this.footer.discountPercentage < 0){
        console.log(this.footer.discountPercentage)
        this.footer.discountPercentage=0;
      } 
      else {
        let discount = ((this.footer.discountPercentage/100)* this.footer.subTotal);
        this.footer.discount = discount.toFixed(2)
      }
    },
    findTax() {
      let tax = (this.footer.taxPercentage/100)* this.footer.subTotal;
      this.footer.tax = tax.toFixed(2)
    },
    findGrandTotal() {
      let grandTotal = parseFloat(this.footer.subTotal) + parseFloat(this.footer.tax) - parseFloat(this.footer.discount)
      this.footer.grandTotal = grandTotal.toFixed(2);
    },
    addItemToTable() {
      let row = { item: "", qty: 0, up: 0, tot: 0 };
      this.items.push(row);
    },
    removeLastItem() {
      this.items.pop();
    },
    validateDiscount() {
      
    },
  }
};
</script>
<style scoped>
.background-color {
  background-color: #ffffff;
  height: 100vh;
}
.item-table__item{
  width:400px !important;
}
</style>
