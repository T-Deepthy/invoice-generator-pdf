import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions('invoice', ['generatePdf']),
  }
};