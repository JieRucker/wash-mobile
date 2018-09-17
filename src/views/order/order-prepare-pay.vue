<style lang="scss">
  .order-prepare-pay {
    z-index: 2;
    .order-content {
      background: #fff;
      .cell-value {
        margin-left: 20px
      }
      .vux-cell-primary {
        flex: initial !important;
      }
    }
  }
</style>

<template>
  <div class="order-prepare-pay">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'订单支付'">
    </x-header>
    <cell :title="'确认订单'">
    </cell>

    <div class="order-content">
      <cell :title="'门店名称'">
        <p class="cell-value">
          {{payDetail.shopName}}
        </p>
      </cell>
      <cell :title="'门店地址'">
        <p class="cell-value">
          {{payDetail.shopAddress}}
        </p>
      </cell>
      <cell :title="'设备编号'">
        <p class="cell-value">
          {{payDetail.deviceId}}
        </p>
      </cell>
      <cell :title="'洗涤模式'">
        <p class="cell-value">
          {{payDetail.deviceWorkModeName}}
        </p>
      </cell>
      <cell :title="'预约洗涤时间'">
        <p class="cell-value">
          {{payDetail.runtime}}
        </p>
      </cell>
    </div>

    <cell :title="'支付金额'">
      <a href="javascript:;" style="color:#52a0f1">
        成为会员 优惠洗衣
      </a>
    </cell>
    <div style="background:#fff">
      <cell :title="'价格'">
        <p>
          {{payDetail.amount}}
        </p>
      </cell>
      <cell :title="'优惠券'" is-link @click.native="linkCoupon">
        <p class="cell-value">
          {{coupon.couponValue}}
        </p>
      </cell>
    </div>
    <cell :title="'合计'">
      <p class="cell-value">
        {{payDetail.totalAmount}}
      </p>
    </cell>

    <div class="order-footer" style="text-align:center;margin-top:20px;padding:0 10px">
      <x-button type="primary" style="background:#52a0f1;" action-type="button" @click.native="paySubmit">
        确认支付
      </x-button>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, XHeader} from 'vux'

  export default {
    name: "order-prepare-pay",
    components: {Group, Cell, Blur, XButton, XHeader},
    data() {
      return {
        payDetail: {},
        coupon: {
          couponValue: '选择优惠券'
        }
      }
    },
    mounted() {
      this.prepareList();

      if (this.$store.state.coupon.couponValue && !this.$Global.isBlank(this.$store.state.coupon.couponValue)) {
        this.coupon.couponValue = `-${this.$store.state.coupon.couponValue}`
      }
    },
    methods: {
      prepareList() {
        this.$axios.post(`${this.$api.getPrepareOrder}`, $.param({
          orderId: this.$route.params.orderId,
        })).then((res) => {
          if (res.data.success) {
            this.payDetail = res.data.data;
            if (this.$store.state.coupon.couponValue && !this.$Global.isBlank(this.$store.state.coupon.couponValue)) {
              this.payDetail.totalAmount = `${Number(this.payDetail.totalAmount) - Number(this.$store.state.coupon.couponValue)}`;
            }

          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /*countCoupon() {
        this.$axios.post(`${this.$api.listUserCouponByDeviceId}`, $.param({
          deviceId: this.$route.params.deviceId,
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.couponList = res.data.data.couponList;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },*/
      paySubmit() {
        let _this = this;
        let jsApiCall = function () {

          _this.$axios.post(`${_this.$api.wxMpPay}`, $.param({
            orderId: _this.$route.params.orderId,
            couponId: _this.$store.state.coupon.couponId && !_this.$Global.isBlank(_this.$store.state.coupon.couponId) ? _this.$store.state.coupon.couponId : '',
          })).then((res) => {
            if (res.data.success) {

              switch (payWay) {
                case 'WEIXIN':
                  WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    'appId': res.data.data.appid,
                    'timeStamp': res.data.data.timeStamp,
                    'nonceStr': res.data.data.nonceStr,
                    'package': `prepay_id=${res.data.data.packageValue}`,
                    'signType': 'MD5',
                    'paySign': res.data.data.paySign
                  }, function (res) {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                      _this.$vux.toast.text('支付成功', 'top');
                      _this.$router.push({
                        name: 'order-success', params: {
                          orderId: _this.$route.params.orderId
                        }
                      });
                    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                      _this.$vux.toast.text('取消支付', 'top');
                    }
                  });
                  break;
                case 'ALIPAY':
                  let turnForm = document.createElement("form");
                  document.body.appendChild(turnForm);
                  turnForm.method = 'get';
                  // turnForm.target = 'targetFrame';
                  turnForm.action = _this.$api.alipayMpPay;
                  //创建隐藏表单
                  let orderId = document.createElement("input");
                  orderId.setAttribute("name", "orderId");
                  orderId.setAttribute("type", "hidden");
                  orderId.setAttribute("value", _this.$route.params.orderId);
                  turnForm.appendChild(orderId);

                  let couponId = document.createElement("input");
                  couponId.setAttribute("name", "couponId");
                  couponId.setAttribute("type", "hidden");
                  couponId.setAttribute("value", _this.$store.state.coupon.couponId && !_this.$Global.isBlank(_this.$store.state.coupon.couponId) ? _this.$store.state.coupon.couponId : '');
                  turnForm.appendChild(couponId);

                  turnForm.submit();
                  break;
              }

            } else {
              this.$vux.toast.text(res.data.retMsg, 'top');
            }
          }).catch((err) => {
            console.log(err)
          })
        };
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          jsApiCall();
        }
      },
      linkCoupon() {
        this.$router.push({
          name: 'select-coupon', params: {
            deviceId: this.payDetail.deviceId
          }
        });
      }
    }
  }
</script>




