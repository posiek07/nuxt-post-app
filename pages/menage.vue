<template>
  <div>
    <navbar />
    <div class="manage-page">
      <div class="columns mail-app">
        <aside class="column is-2 aside hero">
          <create-post />
          <div class="main"></div>
        </aside>
        <div class="column is-4 messages hero" id="message-feed">
          
          <div v-if="posts && posts.length > 0" class="inbox-messages" id="inbox-messages">
            <!-- card starts -->
            <transition-group name = "list" tag="div">
            <div class="card"
            v-for="item in posts" 
            v-bind:key="item._id"
            @click="activatePost(item)"
            :class="{'is-active': activePost && item._id === activePost._id}">
              <div class="card-content">
                <div class="msg-header">
                  <span class="msg-from"><small>From Daniel Smolinski</small></span>
                  <span class="msg-timestamp"></span>
                  <span class="msg-attachment"
                    ><i class="fa fa-paperclip"></i
                  ></span>
                </div> 
                <div class="msg-subject">
                  <transition name="slide-fade" mode="out-in">
                  <span :key="item.title" class="msg-subject"
                    ><strong id="fake-subject-1">{{ item.title }}</strong></span
                  ></transition>
                </div>
                <div class="msg-snippet"><transition name="slide-fade" mode="out-in">
                  <p :key="item.subtitle" id="fake-snippet-1">{{ item.subtitle }}</p></transition>
                </div>
              </div>
            </div>
            </transition-group>
            <!-- card end -->
          </div>
          <div v-else class="no-posts">
            There are no post here!
          </div>
        </div>
        <div class="column is-6 message hero is-fullheight" id="message-pane">
          <div class="box message-preview" v-if="activePost">
            <button @click.prevent="deletePost" class="button is-danger delete-button">Delete</button>
            <post-menage :postData="activePost"/>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Bulma Templates</strong> by
              <a href="https://github.com/dansup">Daniel Supernault</a>. The
              source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <p>
              <a class="icon" href="https://github.com/dansup/bulma-templates">
                <i class="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import CreatePost from "~/components/CreatePost";
import PostMenage from "~/components/PostMenage"
import { mapState } from "vuex";
export default {
  components: {
    Navbar,
    CreatePost,
    PostMenage
  },
  data() {
    return {
      activePost: {}
    }
  },
    computed: {
    ...mapState({
      posts: state => state.posts.items
    })
  },
  //     mounted() {
  //     this.$store.dispatch('posts/fetchPosts')
  //   }, for Client side rendering
  fetch({ store }) {
    if (store.getters["post/hasEmptyItems"]) {
      console.log("fetch data menage");
    }
    return store.dispatch("posts/fetchPosts"); //for server side rendering
  },
  created() {
    if(this.posts && this.posts.length > 0) {
    this.activePost = this.posts[0]
    } else {
      this.activePost= null
    }
  },

  methods: {
    activatePost(item) {
      
      this.activePost = item
    },
    setInitialPost() {
      if(this.posts && this.posts.length > 0) {
        this.activePost = this.posts[0]
      } else {
        this.activePost = null
      }
    },
    deletePost () {
          
          this.$store.dispatch('posts/deletePost', this.activePost._id)
          .then (() => {
            
            this.setInitialPost()
            })
    } 
  }
};

</script>

<style lang="scss">
.manage-page {
  padding: 30px;
}

.card {
  margin-bottom: 10px;
  
  &.is-active {
    background-color: rgb(236, 236, 236);
  }

  &:hover {
  cursor: pointer;
  background-color: #eeeeee;
}
}

.post-form {
  text-align: left;
}

.delete-button {
    display: block;
    width: 100px;
    margin-left: auto;
    margin-right: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity .5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
