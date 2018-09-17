<style lang="scss">
  .o-order-detail-panel {
    z-index: 2;
    .clocker-panel {
      text-align: center;
      height: 45px;
      line-height: 45px;
    }
    .order-content-panel {
      height: 100%;
      background: #fff;
      .cell-value {
        padding-left: 20px
      }
      .vux-cell-primary {
        flex: initial !important;
      }

      .order-desc {
        padding-bottom: 20px;
        padding-top: 20px;
        padding-left: 15px;
        .desc-line {
          margin-bottom: 10px;
          color: #999999;
          .copy-button {
            border-color: #52a0f1;
            color: #52a0f1;
            font-size: 12px;
            height: 27px;
            line-height: 27px;
            margin-left: 2px;
          }
        }
      }
      .order-action {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        .plain-button {
          border-color: #f74c31;
          color: #f74c31;
          border-radius: 30px;
          float: right;
          margin-right: 15px;
          margin-bottom: 15px;
        }
        .success-button {
          background-color: #38c700;
          color: #fff;
          border-radius: 30px;
          border: 0;
        }
        .weui-cell {
          display: block;
        }
      }
    }

  }

</style>


<template>
  <div class="o-order-detail-panel">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'订单详情'">
    </x-header>
    <div class="clocker-panel">
      <p v-if="clocker.isClocker">等待使用，还剩
        <clocker :time="clocker.time" :format="clocker.format" @on-finish="clockerTimerFinish"></clocker>
      </p>
      <p v-else> 您预约时间已到，请前往洗衣</p>
    </div>

    <div class="order-content-panel">
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
      <cell :title="'原价'">
        <p class="cell-value">
          {{orderDetail.amount | priceFormat(orderDetail.amount)}}
        </p>
      </cell>
      <cell :title="'优惠券'">
        <p class="cell-value">
          -{{orderDetail.couponValue | priceFormat(orderDetail.couponValue)}}
        </p>
      </cell>
      <cell :title="'支付金额'">
        <p class="cell-value">
          {{orderDetail.totalAmount | priceFormat(orderDetail.totalAmount)}}
        </p>
      </cell>

      <div class="order-desc">
        <p class="desc-line">订单编号：
          <span>{{orderDetail.orderId}}</span>

          <x-button type="primary"
                    v-clipboard:copy="button.clipboard.message"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onCopyError" mini>复制
          </x-button>
        </p>
        <p class="desc-line">支付方式：
          <span v-if="orderDetail.orderPayType == 1">微信支付</span>
          <span v-if="orderDetail.orderPayType == 2">支付宝</span>
        </p>
        <p class="desc-line">下单时间：
          <span>{{orderDetail.startDate}}</span>
        </p>
        <p class="desc-line">支付时间：
          <span>{{orderDetail.endDate}}</span>
        </p>
      </div>
      <div class="order-action">
        <div class="item-button">
          <x-button slot="right" class="plain-button" plain mini v-if="orderDetail.isPrepareOrder == 0"
                    @click.native="cancelPrepareOrder">取消预约
          </x-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, XHeader, Confirm, Clocker, Divider} from 'vux'

  export default {
    name: "order-detail",
    components: {Group, Cell, Blur, XButton, XHeader, Confirm, Clocker, Divider},
    data() {
      return {
        args: {
          start: 0,
          length: 10
        },
        clocker: {
          isClocker: true,
          time: '',
          format: '%H 小时 %M 分 %S 秒'
        },
        button: {
          clipboard: {
            message: '复制成功',
          }
        },
        orderDetail: {}
      }
    },
    filters: {
      //价格过滤器
      priceFormat: function (value) {
        let result;
        let _val;
        value = Number(value).toFixed(2);
        if (value == 0) {
          value = 0;
          result = "￥<span>0</span>";
          return result;
        } else if (value.split('.')[1].substring(1) == 0) {
          value = Number(value).toFixed(1);
        }
        _val = value.split('.');
        result = `￥${_val[0]}.${_val[1]}`
        return result;
      }
    },
    mounted() {
      this.listOrderDetail();
    },
    methods: {
      clockerTimerFinish() {
        this.clocker.isClocker = false;
      },
      // 查询订单
      listOrderDetail() {
        this.orderDetail = {};
        this.$axios.post(`${this.$api.queryOrderDetails}`, $.param({
          orderId: this.$route.params.orderId,
        })).then((res) => {
          if (res.data.success) {
            this.orderDetail = res.data.data;
            this.clocker.time = this.orderDetail.washDate;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      cancelPrepareOrder() {
        let _this = this;
        _this.$vux.confirm.show({
          title: '提示',
          content: '是否取消预约',
          onConfirm() {
            _this.$axios.post(`${_this.$api.cancelOrder}`, $.param({
              orderId: _this.$route.params.orderId,
            })).then((res) => {
              if (res.data.success) {
                _this.$vux.toast.text('取消成功！', 'top');
                _this.listOrderDetail();
              } else {
                _this.$vux.toast.text(res.data.retMsg, 'top');
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        })
      },
      onCopy() {
        this.$vux.toast.text('复制成功！', 'top');
      },
      onCopyError() {
        this.$vux.toast.text('复制失败！', 'top');
      }
    }
  }
</script>




