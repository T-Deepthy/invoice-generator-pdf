<template>
    <div>

        <b-col sm="6">
              <h3 class="mt-2" v-html="status? 'TAX INVOICE' : 'INVOICE' ">TAX INVOICE</h3>
              <b-input-group size="sm" class="mt-2">
                <datepicker placeholder="Select Date" format="dd MMM yyyy" v-model="cldetails[0].date"></datepicker>
              </b-input-group>          
               <b-input-group size="sm" class="mt-2">
                <b-form-input id="id2" size="sm" placeholder="Invoice Number" v-model="cldetails[0].ino"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">              
                <b-form-input id="id4" :class="validation? 'border-red': ''" size="sm" placeholder="Name" v-model="cldetails[0].name"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id5" size="sm" placeholder="Client Company Name" v-model="cldetails[0].clname"></b-form-input>
              </b-input-group>
               <b-input-group size="sm" class="mt-2">
                <b-form-input id="id3" size="sm" placeholder="Address" v-model="cldetails[0].address"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id3" size="sm" placeholder="Pin Code" v-model="cldetails[0].po"></b-form-input>
              </b-input-group>
                 <template v-if="status==true">
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id7" size="sm" placeholder="GST Number" v-model="cldetails[0].gst_no"></b-form-input>
              </b-input-group>
              <b-input-group size="sm" class="mt-2">
                <b-form-input id="id6" :class="validation? 'border-red': ''" size="sm" placeholder="State Code" v-model="cldetails[0].state_code"></b-form-input>
              </b-input-group>
                 </template>
            </b-col>
    </div>
</template>
