<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="mt-5" sm="6">
          <HostCompany />
        </b-col>
        <b-col sm="6">
          <ClientCompany />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox v-model="status" name="checkbox-1" class="mb-2 mt-3">Tax Invoice</b-form-checkbox>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HostCompany from "../components/HostCompany";
import ClientCompany from "../components/ClientCompany";

export default {
  components: {
    HostCompany,
    ClientCompany
  },
  computed: {
    status: {
      get() {
        return this.$store.state.invoice.status;
      },
      set(value) {
        this.$store.commit("invoice/setState", { state: "status", value });
      }
    }
  }
};
</script>