<template>
	<div>
      <b-input-group size="sm" class="mt-2">
        <b-form-input
          id="id1 "
          :class="validation? 'border-red': ''"
          size="sm"
          placeholder="Your company name"
          v-model="cdetails[0].cname"
        ></b-form-input>
      </b-input-group>
      <b-input-group size="sm" class="mt-2">
        <b-form-input id="id4" size="sm" placeholder="Address" v-model="cdetails[0].address"></b-form-input>
      </b-input-group>
      <b-input-group size="sm" class="mt-2">
        <b-form-input id="id5" size="sm" placeholder="Phone Number" v-model="cdetails[0].phno"></b-form-input>
      </b-input-group>
      <b-input-group size="sm" class="mt-2">
        <b-form-input id="id6" size="sm" placeholder="Your Email id" v-model="cdetails[0].email"></b-form-input>
      </b-input-group>
      <template v-if="status==true">
        <b-input-group size="sm" class="mt-2">
          <b-form-input
            id="id8"
            :class="validation? 'border-red': ''"
            size="sm"
            placeholder="GST Number"
            v-model="cdetails[0].gst_no"
          ></b-form-input>
        </b-input-group>
        <b-input-group size="sm" class="mt-2">
          <b-form-input
            id="id7"
            :class="validation? 'border-red': ''"
            size="sm"
            placeholder="State Code"
            v-model="cdetails[0].state_code"
          ></b-form-input>
        </b-input-group>
      </template>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	computed: {
		...mapState('invoice', ['validation', 'status', 'cdetails'])
	}
}
</script>