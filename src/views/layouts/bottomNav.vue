<template>
  <div class="bottom-tabbar">
    <tabbar>
      <tabbar-item
        :selected="$route.path == item.link"
        :badge="item.badge"
        :link="item.link"
        v-for="(item,index) in bottomBar" :key="index">
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
        args: {
          start: 0,
          length: 10
        },
        bottomBar: [
          {
            name: '洗衣',
            iconClass: 'icon-xiyiji',
            link: '/home',
            badge: '',
            selected: true
          },
          {
            name: '订单',
            iconClass: 'icon-order',
            link: '/order',
            badge: '',
            selected: false
          },
          {
            name: '我的',
            iconClass: 'icon-xiaolian',
            link: '/mine',
            badge: '',
            selected: false
          }
        ]
      }
    },
    mounted() {
      // this.listOrder();
    },
    methods: {
      listOrder() {
        this.orderList = [];
        this.$axios.post(`${this.$api.queryOrderList}`, $.param({
          isCompleteOrder: 0,
          userId: '',
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.bottomBar[1].badge = res.data.data.orderList.length ? res.data.data.orderList.length.toString() : '';
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

