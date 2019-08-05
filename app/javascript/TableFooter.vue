<template>
    <div>
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
    </div>
</template>
