<template>
  <CHeader />
  <main>
    <router-view />
  </main>
  <CFooter />
</template>
<script>
import CFooter from './components/Footer/index.vue';
import CHeader from './components/Header/index.vue';
// import rest from './rest/index.js';
export default {
  components: {
    CHeader,
    CFooter,
  },
};
</script>
<style lang="scss">
main {
  margin-top: 50px;
}
</style>
