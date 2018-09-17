<style lang="scss">
  .o-order-container {
    z-index: 2;
    .list-item {
      margin-top: -10px;
      &-address {
        padding: 10px 15px;
        background: #fff;
        .icon-dingwei1 {
          color: #e78442;
          font-size: 22px
        }
        .panel {
          margin-left: 6px;
          display: inline-block;
          .shop-name {
            font-size: 14px
          }
          .shop-address {
            color: #999;
            font-size: 12px
          }
        }
      }
      &-nodeName {
        background: #fff;
        .weui-cell_access {
          padding-left: 50px;
        }
      }
    }
    .state-success-button {
      background: #38c700;
      color: #333;
      border-radius: 30px;
      border: 0;
    }
    .state-plain-button {
      border-color: #f74c31;
      color: #f74c31;
      border-radius: 30px
    }

    .state-txt {
      color: #f74c31;
      font-size: 14px;
    }
  }
</style>

<template>
  <div class="o-order-container">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'订单'">
    </x-header>
    <div>
      <tab :line-width=2 active-color='#38c700' v-model="tabItem.selectedIndex">
        <tab-item class="vux-center"
                  :selected="tabItem.selectedIndex == index"
                  v-for="(item, index) in tabItem.list"
                  @click.native="switchTabItem(index)"
                  :key="index">{{item.value}}
        </tab-item>
      </tab>
      <swiper v-model="tabItem.selectedIndex" height="700px" :show-dots="false">
        <swiper-item>
          <div class="list-item" v-for="(item,index) in orderList" @click="switchOrderDetail(index)" v-if="item.normalOrderState != 0 || item.prepareOrderState != 0">
            <group>
              <cell :title="item.createDate">
                <div v-if="item.isPrepareOrder == 0">
                  <span class="state-txt" v-if="item.normalOrderState == 1">已完成支付</span>
                  <span class="state-txt" v-if="item.normalOrderState == 2 || item.normalOrderState == 3">失效</span>
                  <span class="state-txt" v-if="item.normalOrderState == 4">强制停止</span>
                  <span class="state-txt" v-if="item.normalOrderState == 5">结束</span>
                  <span class="state-txt" v-if="item.normalOrderState == 8">正在运行</span>
                  <span class="state-txt" v-if="item.normalOrderState == 10">退款中</span>
                  <span class="state-txt" v-if="item.normalOrderState == 11">已退款</span>
                  <span class="state-txt" v-if="item.normalOrderState == 12">退款失败</span>
                </div>
                <div v-if="item.isPrepareOrder == 1">
                  <span class="state-txt" v-if="item.prepareOrderState == 1">已完成支付</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 2 || item.prepareOrderState == 3">失效</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 4">强制停止</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 5">结束</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 6">已预约</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 7">正在运行</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 8">正在运行</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 10">退款中</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 11">已退款</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 12">退款失败</span>
                </div>
              </cell>
            </group>
            <div class="list-item-address">
              <i class="iconfont icon-dingwei1"></i>
              <div class="panel">
                <p class="shop-name">{{item.shopName}}</p>
                <p class="shop-address">{{item.shopAddress}}</p>
              </div>
            </div>
            <div class="list-item-nodeName">
              <cell :title="item.deviceWorkModeName" is-link></cell>
            </div>
          </div>
        </swiper-item>

        <swiper-item>
          <div class="list-item" v-for="(item,index) in orderList" @click="switchOrderDetail(index)"
               v-if="item.normalOrderState != 0 || item.prepareOrderState != 0">
            <group>
              <cell :title="item.createDate">
                <div v-if="item.isPrepareOrder == 0">
                  <span class="state-txt" v-if="item.normalOrderState == 1">已完成支付</span>
                  <span class="state-txt" v-if="item.normalOrderState == 2 || item.normalOrderState == 3">失效</span>
                  <span class="state-txt" v-if="item.normalOrderState == 3">已取消</span>
                  <span class="state-txt" v-if="item.normalOrderState == 4">强制停止</span>
                  <span class="state-txt" v-if="item.normalOrderState == 5">结束</span>
                  <span class="state-txt" v-if="item.normalOrderState == 8">正在运行</span>
                  <span class="state-txt" v-if="item.normalOrderState == 10">退款中</span>
                  <span class="state-txt" v-if="item.normalOrderState == 11">已退款</span>
                  <span class="state-txt" v-if="item.normalOrderState == 12">退款失败</span>
                </div>
                <div v-if="item.isPrepareOrder == 1">
                  <span class="state-txt" v-if="item.prepareOrderState == 1">已完成支付</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 2 || item.prepareOrderState == 3">失效</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 3">已取消</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 4">强制停止</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 5">结束</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 6">已预约</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 7">正在运行</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 8">正在运行</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 10">退款中</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 11">已退款</span>
                  <span class="state-txt" v-if="item.prepareOrderState == 12">退款失败</span>
                </div>
              </cell>
            </group>
            <div class="list-item-address">
              <i class="iconfont icon-dingwei1"></i>
              <div class="panel">
                <p class="shop-name">{{item.shopName}}</p>
                <p class="shop-address">{{item.shopAddress}}</p>
              </div>
            </div>
            <div class="list-item-nodeName">
              <cell :title="item.deviceWorkModeName" is-link></cell>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, XHeader, TabItem, Tab, Swiper, SwiperItem} from 'vux';

  export default {
    name: "order",
    components: {Group, Cell, Blur, XButton, XHeader, TabItem, Tab, Swiper, SwiperItem},
    data() {
      return {
        args: {
          start: 0,
          length: 10
        },
        tabItem: {
          selectedIndex: 0,
          list: [
            {
              key: 0,
              value: '未完成订单'
            },
            {
              key: 1,
              value: '已完成订单'
            }]
        },
        orderList: [],
      }
    },
    mounted() {
      this.listOrder(0)
    },
    methods: {
      switchTabItem(index) {
        switch (index) {
          case 0:
            this.listOrder(0);
            break;
          case 1:
            this.listOrder(1);
            break;
        }
      },
      // 切换订单详情
      switchOrderDetail(index) {
        switch (this.orderList[index].isPrepareOrder) {
          case 0:
            this.$router.push({
              name: 'order-detail', params: {
                isPrepare: 'false',
                orderId: this.orderList[index].orderId
              }
            });
            break;
          case 1:
            this.$router.push({
              name: 'order-detail', params: {
                isPrepare: 'true',
                orderId: this.orderList[index].orderId
              }
            });
            break;
        }
      },
      // 查询订单
      listOrder(type) {
        this.orderList = [];
        this.$axios.post(`${this.$api.queryOrderList}`, $.param({
          isCompleteOrder: type,
          userId: '',
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.orderList = res.data.data.orderList;


            console.log(this.orderList)
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      orderPay() {
        this.$router.push({name: 'order-pay', params: {}})
      },
      orderDetail() {
        this.$router.push({name: 'order-detail', params: {}})
      },
      orderPrepareDetail() {
        this.$router.push({name: 'order-prepare-detail', params: {}})
      }
    }
  }
</script>
