<style lang="scss">
  .s-shut-down {
    z-index: 2;
    .shut-down-footer {
      margin-top: 40px;
      padding: 0 10px;
      .shut-down-button {
        border-color: #f74c31;
        color: #f74c31;
        font-size: 16px
      }
    }
  }
</style>

<template>
  <div class="s-shut-down">
    <div class="shut-down-info">
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
        <p class="cell-value" style="color:#f74c31">
          {{orderDetail.totalAmount | priceFormat(orderDetail.totalAmount)}}
        </p>
      </cell>
    </div>

    <div class="shut-down-footer">
      <x-button type="primary" class="shut-down-button" action-type="button" @click.native="shutDown" plain>紧急停机
      </x-button>
    </div>

  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton} from 'vux'

  export default {
    name: "shut-down",
    components: {Group, Cell, Blur, XButton},
    data() {
      return {
        orderDetail: {
          'shopName': '门店名称',
          'shopAddress': '门店地址',
          'deviceId': '12121',
          'startDate': '2018-4-18',
          'amount': 5,
          'couponValue': 3,
          'totalAmount': 2
        }
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
      // 查询订单
      listOrderDetail() {
        this.orderDetail = {};
        this.$axios.post(`${this.$api.queryOrderDetails}`, $.param({
          orderId: (() => {
            return typeof(orderId) != 'undefined' ? orderId : ''
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
      shutDown() {
        this.$vux.confirm.show({
          title: '提示',
          content: '是否停机',
          onConfirm() {
            console.log('23423')
          }
        })
      }
    }
  }
</script>

