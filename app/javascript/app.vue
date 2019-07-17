<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Invoice Generator</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>HI, THIS IS FREE INVOICE GENERATOR</b-nav-item>
        <b-button variant="light" href="https://invoicely.com/">Learn More</b-button>
        <b-button variant="info" href="https://invoicely.com/signup">Sign Up</b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid class="background-color">
      <b-row class="ml-auto">
        <b-col align-self="center" cols="1">
            <b-button @click="generatePdf()">
              pdf
            </b-button>
        </b-col>
        <b-col align-self="end" cols="11">
          <b-container>
            <b-row>
              <b-col sm="6">
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="id1 " size="sm" placeholder="Your company name"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="input-small" size="sm" placeholder="Your street"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="input-small" size="sm" placeholder="Your town"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="input-large" size="sm" placeholder="Address line 3"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="imput-small" size="sm" placeholder="Phone number"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                  <b-form-input id="imput-small" size="sm" placeholder="Email id"></b-form-input>
                </b-input-group>
              </b-col>
              <b-col sm="6">
                <b-input-group size="sm" class="mt-2">
                <b-item>INVOICE</b-item>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                <b-form-input id="input-small" size="sm" placeholder="Date"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                <b-form-input id="input-small" size="sm" placeholder="Invoice number"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                <b-form-input id="input-large" size="sm" placeholder="PO 682026"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                <b-form-input id="imput-small" size="sm" placeholder="Name"></b-form-input>
                </b-input-group>
                <b-input-group size="sm" class="mt-2">
                <b-form-input id="imput-small" size="sm" placeholder="Client Company Name"></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <div>
              <b-row class="mt-2">
              <b-table small :fields="fields" :items="items">
                <template slot="index" slot-scope="data"> {{ data.index + 1 }}</template>
                <template slot="item"><b-form-input placeholder="item descp"></b-form-input></template>
                <template slot="qty"><b-form-input placeholder="0"></b-form-input></template>
                <template slot="up"><b-form-input placeholder="0"></b-form-input></template>
                <template slot="tot"><b-form-input placeholder="0"></b-form-input></template>
              </b-table>
              </b-row>
            </div>
            <b-row>
              <b-col>
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "index",
        { key: "item", label: "Item Description" },
        { key: "qty", label: "Quantity" },
        { key: "up", label: "Unit Price" },
        { key: "tot", label: "Total" },
      ],
      items: [
        { name: { first: "John", last: "Doe" }, sex: "Male", age: 42 },
        { name: { first: "Jane", last: "Doe" }, sex: "Female", age: 36 },
        { name: { first: "Rubin", last: "Kincade" }, sex: "Male", age: 73 },
        {
          name: { first: "Shirley", last: "Partridge" },
          sex: "Female",
          age: 62
        }
      ],
      text: ""
    };
  },
  methods: {
    generatePdf() {
      window.open("/invoice/invoice.pdf")
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