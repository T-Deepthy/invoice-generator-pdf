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
          <b-container>
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
                <b-table small striped hover :fields="fields" :items="items">
                  <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
                  <template slot="item" slot-scope="data">
                    <b-form-input v-model="data.item.item"></b-form-input>
                  </template>
                  <template slot="qty" slot-scope="data">
                    <b-form-input v-model="data.item.qty" @input="changeData(data.index)"></b-form-input>
                  </template>
                  <template slot="up" slot-scope="data">
                    <b-form-input v-model="data.item.up" @input="changeData(data.index)"></b-form-input>
                  </template>
                  <template slot="tot" slot-scope="data">
                    <b-form-input v-model="data.item.tot" disabled></b-form-input>
                  </template>
                  <template slot="FOOT_name" slot-scope="data">
                    <strong>{{ data.label }}</strong>
                  </template>
                </b-table>
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
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      fields: [
        "index",
        { key: "item", label: "Item Description" },
        { key: "qty", label: "Quantity" },
        { key: "up", label: "Unit Price" },
        { key: "tot", label: "Total" }
      ],
      items: [
        { item: "item1", qty: 1, up: 30009, tot: 0 },
        { item: "", qty: 0, up: 0, tot: 0 }
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
      ]
    };
  },
  methods: {
    generatePdf() {
      window.open(
        `/invoice/invoice.pdf?cdetails=${JSON.stringify(this.cdetails
        )}&cldetails=${JSON.stringify(this.cldetails)}&items=${JSON.stringify(
          this.items
        )}&text1=${JSON.stringify(this.text1)}&text2=${JSON.stringify(
          this.text2
        )}`
      );
    },
    changeData(index) {
      console.log(this.items[index]);
      if (this.items[index].qty && this.items[index].up) {
        this.items[index].tot = this.items[index].qty * this.items[index].up;
      }
    },
    addItemToTable() {
      let row = { item: "", qty: 0, up: 0, tot: 0 };
      this.items.push(row);
    },
    removeLastItem() {
      this.items.pop();
    }
  }
};
</script>

<style scoped>
.background-color {
  background-color: #ffffff;
  height: 100vh;
}
</style>