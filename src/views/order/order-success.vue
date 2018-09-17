<style lang="scss">
  .o-order-success {
    z-index: 2;
    .order-success-icon {
      text-align: center;
      padding-top: 10px;
      .order-success-text {
        font-size: 22px;
        color: #333;
      }
    }
    .order-success-date {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      padding: 0 20px;
    }
    .order-success-footer {
      text-align: center;
      margin-top: 20px;
      padding: 0 10px;
      .order-list-button {
        background: #52a0f1;
      }
    }
  }
</style>

<template>
  <div class="o-order-success">
    <div class="order-success-icon">
      <icon type="success" is-msg></icon>
      <p class="order-success-text">支付成功</p>
    </div>
    <div class="order-success-date">
      <p>该订单截止至<span style="color:#f74c31">{{orderDetail.endDate}}</span>有效，可在机器屏幕上扫码验证身份并启动</p>
    </div>
    <div class="order-success-content">
      <cell :title="'门店名称'">
        <p class="cell-value">
          {{orderDetail.shopName}}
        </p>
      </cell>
      <cell :title="'门店地址'">
        <p class="cell-value">
          {{orderDetail.shopAddress}}
        </p>
      </cell>
      <cell :title="'设备编号'">
        <p class="cell-value">
          {{orderDetail.deviceId}}
        </p>
      </cell>
      <cell :title="'洗涤模式'">
        <p class="cell-value">
          {{orderDetail.deviceWorkModeName}}
        </p>
      </cell>
      <cell :title="'开机口令'">
        <p class="cell-value">
          {{orderDetail.password}}
        </p>
      </cell>
      <cell :title="'预约洗涤时间'">
        <p class="cell-value">
          {{orderDetail.startDate}}
        </p>
      </cell>
    </div>
    <div class="order-success-footer">
      <x-button type="primary" class="order-list-button" action-type="button" @click.native="returnOrderList">
        返回订单列表
      </x-button>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, Icon} from 'vux'

  export default {
    name: "order-success",
    components: {Group, Cell, Blur, XButton, Icon},
    data() {
      return {
        orderDetail: {}
      }
    },
    mounted() {
      this.listOrderDetail();
    },
    methods: {
      // 查询订单
      listOrderDetail() {
        this.orderDetail = {};
        this.$axios.post(`${this.$api.queryOrderDetails}`, $.param({
          orderId: (() => {
            if (this.$route.params.orderId) {
              return this.$route.params.orderId;
            } else {
              return typeof(orderId) != 'undefined' ? orderId : ''
            }
          })()
        })).then((res) => {
          if (res.data.success) {
            this.orderDetail = res.data.data;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      returnOrderList() {
        this.$router.push({
          name: 'order', params: {}
        });
      }
    }
  }
</script>
