import INITIAL_DATA from './initial_data.json'
import Vue from 'vue'

export function fetchPostsAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(INITIAL_DATA.posts)
        }, 0)
    })
}

export const state = () => {
    return {
        items: [],
        archivedItems: [],
        item: []
    }
}

// Getters are like computed properties but for Vuex
export const getters = {
    hasEmptyItems(state) {
        return state.items.length === 0 //gives false/true
    }
}


// Best to send request to for server, Usualy will resolve in some data
export const  actions = {
    getArchivedItems({commit}) {
        const archivedItems = localStorage.getItem('archived_items')
        if (archivedItems) {
            //commit mutation
            commit('setArchivedItems', JSON.parse(archivedItems))
            return archivedItems
        } else {
            localStorage.setItem('archived_items', JSON.stringify([]))
            return []
        }
    },

    toggleRead({state, commit, dispatch}, postId) {
        if (state.archivedItems.includes(postId)) {
            //remove post ID
            const index = state.archivedItems.findIndex(pId => pId === postId)
            commit('removeArchivedItem', index)
            dispatch('persistArchivedPosts')
            return postId
        } else {
            //add post ID
            commit ('addArchivedItem', postId)
            dispatch('persistArchivedPosts')
            return postId
        }
    },

    persistArchivedPosts({state}) {
        localStorage.setItem('archived_items', JSON.stringify(state.archivedItems))
    },

    fetchPosts({commit}) {
        console.log('Calling Fetch posts')
        return this.$axios.$get('api/posts')
        .then((posts) => {
            commit('setPosts', posts)
            return posts
        })

    },
    fetchPostById({commit}, postId) {
        return this.$axios.$get('api/posts')
        .then((posts) => {
            const selectedPost = posts.find((p) => p._id === postId)
            
            commit('setPost', selectedPost)
            
            return selectedPost
        })

    },
    createPost({commit}, formData) {
//create post on server, or persist data in some way
        formData._id = Math.random().toString(36).substr(3,6)
        formData.createdAt = (new Date()).getTime()
        return this.$axios.$post('/api/posts', formData)
        .then ((res) => {
            console.log(res)
            
            commit('addPost', formData)
            return formData
        })
        
    },
    updatePost({commit,state}, postData) {

        const index = state.items.findIndex((post) => {
            return post._id === postData._id
        })

        if (index !== -1) {
            return this.$axios.$patch(`/api/posts/${postData._id}`, postData)
            .then ((res) => {
                console.log(res)
                
        commit('replaceForm', {post: postData, index})
        return postData
            })

    }
    },
    deletePost({commit,state}, postId) {
        const index = state.items.findIndex((post) => {
            return post._id === postId
            
        })
        if (index !== -1) {
            
            return this.$axios.$delete(`/api/posts/${postId}`)
            .then ((res) => {
                
        commit('removePost', index)
        return postId
            })

    }
    }
}

//Mutations are simple functions that have access to state
//Mutations are used to assign values to a state
export const mutations = {
    setArchivedItems(state, archivedPosts) {
        state.archivedItems = archivedPosts
    },
    addArchivedItem(state, postId) {
        state.archivedItems.push(postId)
    },
    removeArchivedItem(state, postId) {
        state.archivedItems.splice(postId, 1)
    },
    setPosts(state, posts) {
        state.items = posts
    },
    setPost(state, post) {
        
        state.item = {...post}
    },
    addPost(state, post) {
        state.items.push(post)
        
    },
    replaceForm(state, {post, index}) {
        Vue.set(state.items, index, post)
    },
    removePost (state, postId) {
        state.items.splice(postId, 1)
    }
}