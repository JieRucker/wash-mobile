<style lang="scss">
  @import 'assets/css/common.scss';
</style>

<template>
  <div class="app-container">
    <loading v-model="loading" :text="'加载中...'"></loading>
    <div class="main-init">
      <router-view name="default"></router-view>
      <div class="bottom-footer">
        <buttom-nav></buttom-nav>
      </div>
    </div>

    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import ButtomNav from './views/layouts/BottomNav.vue';
  import {Tabbar, TabbarItem, ViewBox, XHeader, Loading} from 'vux';
  // import Rem from '@/assets/js/rem'
  // import {mapGetters} from 'vuex'
  // new Rem();

  export default {
    name: 'app',
    components: {
      Tabbar, TabbarItem, ViewBox, XHeader, Loading, ButtomNav
    },
    data() {
      return {
        "enterAnimate": "", //页面进入动效
        "leaveAnimate": "" //页面离开动效
      }
    },
    created() {
      if (typeof router !== 'undefined' && !this.$Global.isBlank(router)) {
        this.$router.openPage(router)
      }
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if (toDepth === 2) {
          // this.$store.commit('setPageName', to.name)
        }
        if (toDepth === fromDepth) {
          return
        }
        this.enterAnimate = toDepth > fromDepth
          ? 'animated fadeInRight'
          : 'animated fadeInLeft';

        this.leaveAnimate = toDepth > fromDepth
          ? 'animated fadeOutRight'
          : 'animated fadeOutLeft';

        // if(toDepth === 3) {
        // 	this.leaveAnimate = 'animated fadeOutRight'
        // }
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }
  }
</script>


