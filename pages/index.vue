<template>
  <div>
    <navbar />
    <div class="blogs-page">
      <div class="main-content">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-8 is-offset-2">
              <div class="section">
                <div class="title ">
                  <h1>Newest Posts</h1>
                  <hr />
                </div>
                <PostItem 
                v-for="item in posts"
                :key="item._id"
                :title="item.title" 
                :subtitle="item.subtitle"
                :createAt="item.createdAt"
                :isRead="item.isRead"
                :id="item._id"/>
                
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

<script>
import Navbar from "~/components/Navbar";
import PostItem from "~/components/PostItem";
import { fetchPostsAPI } from '~/store/posts'
export default {
  // mounted() {
  //   this.$store.dispatch('posts/fetchPosts')
  // },
  components: {
    Navbar,
    PostItem
  },
  
  data() {
    return {
      title: 'Title from Page component',
    }
    
  
  },
  fetch({store}) {
    if (store.getters['post/hasEmptyItems']) {
      console.log('index vue fetch')
        return store.dispatch('posts/fetchPosts')
    }
  },
  mounted () {
    this.$store.dispatch('posts/getArchivedItems')
  },
  computed: {
    archivedPosts() {
      return this.$store.state.post.archivedItems
    }
  },
async asyncData() {
  const posts = await fetchPostsAPI() 
  return {posts}
},

    // methods: {
    //        isFormValid() {
    //     console.log('is isFormValid computed has been called')
    //     if (this.form.title) {
    //       return true
    //     }
    //     return false
    //   }
    // }
}
</script>
<style scoped>

</style>
