<style lang="scss">
  .refund-document-panel {
    z-index: 2;
    .weui-panel {
      background-color: #ffffff;
      margin-top: 10px;
      position: relative;
      overflow: hidden;
      .weui-media-box {
        padding: 15px;
        .weui-text {
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }
</style>

<template>
  <div class="refund-document-panel">
    <x-header
      :left-options="{showBack: false, backText: ''}" :title="'退款须知'">
    </x-header>
    <div class="weui-panel">
      <div class="weui-media-box" v-for="(item,index) in list">
        <p class="weui-text" v-html="item.desc"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Panel} from 'vux'

  export default {
    name: "refund",
    components: {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Panel},
    data() {
      return {
        list: [{
          desc: `
          1、由于机器故障问题，造成订单不能使用的，可申请退款；</br></br>
          2、由个人原因造成的，如预约过期未使用，忘记放入衣物，预约到其他宿舍楼等问题，不予退款。</br></br>
          3、如何退款：进入公众号-预约洗衣-订单-已完成订单；找到需退款的订单，点击该订单，点击“申请退款”（该操作仅限24小时内操作，如过期，请联系公众号客服或客服群！客服1-2个工作日内会审核处理！）`,
        }]
      }
    }
  }
</script>
