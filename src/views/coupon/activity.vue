<style lang="scss">
  .g-coupon-activity {
    z-index: 2;
    .g-bg-panel {
      .button {
        position: absolute;
        width: 245px;
        border-radius: 50px;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        margin-top: 35px;
        height: 100px;
      }
    }
    .g-desc-panel {
      position: absolute;
      bottom: 5px;
      text-align: center;
      color: #999;
      padding: 10px 10px;
      font-size: 12px;
      .name {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .desc {
        padding: 0 20px;
      }
    }
  }
</style>

<template>
  <div class="g-coupon-activity">
    <div class="g-bg-panel">
      <img style="width: 100%;" :src="activityUrl">
      <p class="button" @click="linkCoupon"></p>
    </div>
    <div class="g-desc-panel">
      <p class="name">美亚乐洗</p>
      <p class="desc">美亚乐洗专注于便捷服务，为您带来快件方便的服务体验。美亚乐洗专注于便捷服务，为您带来快件方便的服务体验</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity",
    data() {
      return {
        activityUrl: require('images/coupon/activity.png')
      }
    },
    methods: {
      linkCoupon() {
        this.$router.push({
          name: 'coupon-activity', params: {}
        });
      }
    }
  }
</script>

<style scoped>

</style>
