<style lang="scss">
  .m-member {
    z-index: 2;
    .m-shape-panel {
      img {
        width: 100%;
      }
    }
    .m-more-panel {
      position: relative;
      padding: 10px 20px;
      img {
        width: 100%;
      }
      .m-name {
        font-size: 20px;
        color: #fff;
        position: absolute;
        z-index: 10;
        left: 129px;
        top: 28px;
      }
      .m-desc {
        color: #ddd;
        position: absolute;
        z-index: 10;
        top: 65px;
        left: 148px;
      }
      .m-button {
        color: #fff;
        position: absolute;
        z-index: 10;
        top: 115px;
        left: 162px;
      }
    }
  }
</style>

<template>
  <div class="m-member">
    <div class="m-shape-panel">
      <img style="width: 100%;" :src="shapeUrl">
    </div>
    <div class="m-more-panel">
      <img style="width: 100%;" :src="moreUrl">
      <p class="m-name">12月半价洗衣</p>
      <p class="m-desc">洗衣只需半价</p>
      <p class="m-button">更多优惠</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "member",
    data() {
      return {
        shapeUrl: require('images/member/shape.png'),
        moreUrl: require('images/member/more.png'),
      }
    }
  }
</script>

