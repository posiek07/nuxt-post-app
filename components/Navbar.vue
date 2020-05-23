<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="./" class="navbar-item" >
          <img
            src="http://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
          />
        </nuxt-link>
        <div
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          @click="toggleIsActive"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        id="navMenu"
        class="navbar-menu"
        @click="toggleIsActive"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-end">
          <div
            class="navbar-item has-dropdown"
            :class="{ 'is-active': isActive }"
          >
            <a class="navbar-link">
              Menu
            </a>
            <transition name="fade">
              <div class="navbar-dropdown" v-if="isActive">
                <!-- nuxt link -->
                <nuxt-link to="/" class="navbar-item">
                  Home
                </nuxt-link>
                <!-- link thru Click event -->
                <!-- <div @click="navigateTo('/menage')" class="navbar-item"> -->
                <nuxt-link to="/menage" class="navbar-item">
                  Menage
                </nuxt-link>
              </div></transition
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    toggleIsActive() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
