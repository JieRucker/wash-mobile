<style lang="scss">
  .o-order-refund-panel {
    z-index: 2;
    .order-content-panel {
      height: 100%;
      background: #fff;
      .weui-cells__title {
        margin-top: 0;
        padding-top: 0.77em;
      }
      .order-action {
        margin: 10px 10px 0 10px;
      }
    }
  }
</style>

<template>
  <div class="o-order-refund-panel">
    <x-header
      :left-options="{showBack: false, backText: ''}" :title="'订单退款'">
    </x-header>

    <div class="order-content-panel">
      <div class="set-1px-b">
        <x-input title="订单编号" name="orderId" placeholder="请输入订单编号" keyboard="number"
                 v-model="order.orderId"></x-input>
      </div>

      <div class="order-action">
        <x-button type="primary" @click.native="orderRefund">退款
        </x-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, XHeader, Confirm, Divider, XInput} from 'vux'

  export default {
    name: "order-refund",
    components: {Group, Cell, Blur, XButton, XHeader, Confirm, Divider, XInput},
    data() {
      return {
        order: {
          orderId: ''
        }
      }
    },
    methods: {
      // 订单退款
      orderRefund() {
        let _this = this;

        if (!this.$Global.isBlank(this.order.orderId)) {
          this.$vux.confirm.show({
            title: '提示',
            content: '是否退款',
            onConfirm() {
              _this.$axios.post(`${_this.$api.orderRefund}`, $.param({
                orderId: _this.order.orderId,
              })).then((res) => {
                if (res.data.success) {
                  _this.$vux.toast.text('订单记录已生成，请等待管理员审核！', 'top');
                } else {
                  _this.$vux.toast.text(res.data.retMsg, 'top');
                }
              }).catch((err) => {
                console.log(err)
              });
            }
          })
        } else {
          this.$vux.toast.text('请输入订单编号！', 'top');
        }
      }
    }
  }
</script>




