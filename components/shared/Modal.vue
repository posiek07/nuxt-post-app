<template>
  <div>
      <div @click="isOpen = !isOpen">
          <slot name="someButton">
              </slot>
      </div>
 <transition name = "fade">     
    <div class="modal" v-if="isOpen" :class="{ 'is-active': isOpen }">
      <div @click="isOpen = !isOpen" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button
            @click="isOpen = !isOpen"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
            <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button @click="emitChanges" class="button is-success">Save changes</button>
          <button class="button" @click="isOpen = !isOpen">Cancel</button>
        </footer>
      </div>
    </div></transition>
  </div>
</template>
<style lang="scss">
.modal.is-active {
  display: flex;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
      emitChanges() {
    this.$emit('modalSubmit', this.shutModal)
      },
      shutModal() {
          
          this.isOpen = false
      },
  }
};
</script>
