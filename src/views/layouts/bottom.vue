<!--<style lang="less">
  .bottom-tabbar {
    .weui-tabbar__icon {
      i {
        font-size: 27px;
      }
      sup {
        top: 2px;
      }
    }
  }
</style>-->

<template>
  <div class="bottom-tabbar">
    <tabbar>
      <tabbar-item :selected="item.selected" :badge="item.showBadge ? item.badge : ''" :link="item.link"
                   v-for="item in bottomBar">
        <i slot="icon" :class="'iconfont '+ item.iconClass"></i>
        <span slot="label">{{item.name}}</span>
      </tabbar-item>
    </tabbar>
  </div>

</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        bottomBar: [
          {
            name: '洗衣',
            iconClass: 'icon-xiyiji',
            link: '/home',
            showBadge: false,
            badge: 0,
            selected: true
          },
          {
            name: '订单',
            iconCls: 'icon-order',
            link: '/order',
            showBadge: true,
            badge: 2,
            selected: true
          },
          {
            name: '我的',
            iconCls: 'icon-xiaolian',
            link: '/mine',
            showBadge: false
            badge: 0
          }
        ]
      }
    }
  }
</script>

