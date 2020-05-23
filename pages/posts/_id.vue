<template>
  <div>
    <div class="blogs-page">
      <nuxt-link to="/"><button class="button is-rounded">Back</button></nuxt-link>
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-1">
              <div class="section">
                <div class="title">
                  <h1>Detail View</h1>
                  <hr>
                </div>
                <div class="post-content">
                  
                  <h1 :key="post.title" class="title">{{ post.title }}</h1>
                  <h2 :key="post.title" class="subtitle">{{ post.subtitle }}</h2>
                  <div class="markdown">
                    <div v-html="compiledMarkdown">Content  Preview</div>
                  </div>
                </div>
              </div>
              <!-- end of post -->
            </div>
            <!-- end of side bar -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.button.is-rounded {
  font-weight: bold;
  margin: 50 50 0 0;
  display: block;
}
.columns.is-mobile {
  margin: 0;
}
.section {
    padding: 3rem 0.5rem;
}



</style>

<script>
export default {
    async fetch({params, store}) {
        await store.dispatch('posts/fetchPostById', params.id)
    },

    computed: {
        post() {
            
            return this.$store.state.posts.item
        },
     compiledMarkdown() {
      if (process.client){
      return marked(this.post.description,{sanitize: true})
    }
    return ''
    }
    }
}
</script>