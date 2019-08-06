<template>
     <div>
        <b-row class="mt-2">
            <table class="table table-striped table-hover">
               <table-header></table-header>
                <table-body></table-body>
                <table-footer></table-footer>
              </table>
            </b-row>

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

