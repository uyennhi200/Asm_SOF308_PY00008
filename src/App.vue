<template>
  <NavBarPage />
  <router-view></router-view>
  <FooterPage />
</template>

<script>
import NavBarPage from './components/NavBar.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  name: 'App',
  components: {
    NavBarPage,
    FooterPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
