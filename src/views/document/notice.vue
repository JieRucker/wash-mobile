<style lang="scss">
  .notice-document-panel {
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
  <div class="notice-document-panel">
    <x-header
      :left-options="{showBack: false, backText: ''}" :title="'注意事项'">
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
    name: "notice",
    components: {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Panel},
    data() {
      return {
        list: [{
          desc: `
             ■
            本区域为自助洗衣房，请妥善保管个人随身物品，并及时取走洗净衣物，如有丢失，概不负责；</br></br>
             ■
            机器使用完毕请尽快将衣物取出，下一位客人有权将您的衣物取出，放置于临时洗衣篮内；</br></br>
             ■
            机器故障请拨打客服电话，请勿擅自处理，以免发生危险；如处理不当导致物品损坏，本店有权追究法律责任。</br></br>
             ■
            烘干机参考时间用于烘干机提示线下的衣物量并且为标准洗涤脱水后的衣服烘干时间，如衣物量超过提示线请适当增加烘干时长。</br></br>
             ■
            不建议用户手洗绞干后的衣服或者未脱水的衣服使用烘干机，会无法在烘干提示时间内烘干，且对衣物也会造成搭色串色的风险。</br></br>
             ■
            本店内的监控仅为内部使用，为了保障个人隐私，如有需要调用请联系公安部门。`,
        }]
      }
    }
  }
</script>
