<template>
<form class="post-form">
  
  <div class="field">
    <label class="label">Title</label>
    <div class="control">
      <input
      v-model="post.title"
        class="input"
        type="text"
        placeholder="Awesome Title">
    </div>
  </div>
  <div class="field">
    <label class="label">Subtitle</label>
    <div class="control">
      <input
      v-model="post.subtitle"
        class="input"
        type="text"
        placeholder="Awesome subtitle">
    </div>
  </div>
  <div class="field">
    <label class="label">Content</label>
    <div class="control">
      <textarea
      v-model="post.description"
        class="textarea"
         placeholder="Awesome Content"></textarea>
    </div>
  </div>
        <div class="markdown">
        <label class="label">Content Preview</label>
        <div v-html="compiledMarkdown"></div>
      </div>
  <button class="button is-primary" @click.prevent = "updatePost" >Update</button>
</form>
</template>

<script>
export default {
    props: ['postData'],
    data() {
        return {
            post: {...this.postData}
        }
    },
    
    watch: {
         postData(newValue, oldValue) {
             this.post = {...newValue}
         }
    },
    methods: {
        updatePost () {
            this.$store.dispatch('posts/updatePost', {...this.post})

        },
        

    },
    computed: {
        compiledMarkdown() {
      if (process.client){
      return marked(this.post.description,{sanitize: true})
    }
    return ''
    }}
}
</script>