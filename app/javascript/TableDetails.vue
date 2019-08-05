<template>
<div>
     <div>
            <b-row class="ml-auto">
              <b-col class="p-4">
                <b-button class="float-right ml-4" variant="danger" @click="removeLastItem()">- Delete row</b-button>
                <b-button class="float-right" variant="success" @click="addItemToTable()">+ Add row</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <table class="table table-striped table-hover">
                <table-header></table-header>
                <table-body></table-body>
               <table-footer></table-footer>
              </table>
            </b-row>
      </div>
</div>
</template>
<script>
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
export default {
    components: { 
        TableHeader,
        TableBody,
        TableFooter
    }
}
</script>

