<template>
    <div>
     <b-row class="mt-2">
            <b-col>
              <vue-editor id="editor" placeholder="Enter your message" v-model="text1" :editor-toolbar="customToolbar"></vue-editor>
            </b-col>
          </b-row>
    </div>
</template>
<script>
export default {
    data() { 
        return { 
             customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }]
            ] 
       }
    }
}
</script>

