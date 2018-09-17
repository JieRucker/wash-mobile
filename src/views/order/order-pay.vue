<style lang="scss">
  .o-order-pay {
    z-index: 2;
    .order-pay-info {
      background: #fff;
      .cell-value {
        margin-left: 20px
      }
      .vux-cell-primary {
        flex: initial !important;
      }
    }
    .order-pay-price {
      background: #fff;
    }
    .order-pay-footer {
      text-align: center;
      margin-top: 20px;
      padding: 0 10px;
      .order-pay-button {
        background: #52a0f1;
      }
    }
  }
</style>

<template>
  <div class="o-order-pay">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'订单支付'">
    </x-header>
    <cell :title="'确认订单'">
    </cell>

    <div class="order-pay-info">
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
          {{payDetail.startDate}}
        </p>
      </cell>
    </div>

    <cell :title="'支付金额'">
      <a href="javascript:;" style="color:#52a0f1">
        成为会员 优惠洗衣
      </a>
    </cell>
    <div class="order-pay-price">
      <cell :title="'价格'">
        <p>
          {{payDetail.amount | priceFormat(payDetail.amount)}}
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
        {{payDetail.totalAmount | priceFormat(payDetail.totalAmount)}}
      </p>
    </cell>

    <div class="order-pay-footer">
      <x-button type="primary" class="order-pay-button" action-type="button" @click.native="paySubmit">
        确认支付
      </x-button>
    </div>

    <iframe id="targetFrame" name="targetFrame" style="display: none"></iframe>
  </div>
</template>

<script>
  import {Group, Cell, Blur, XButton, XHeader} from 'vux'

  export default {
    name: "order-pay",
    components: {Group, Cell, Blur, XButton, XHeader},
    data() {
      return {
        coupon: {
          couponValue: '选择优惠券'
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
    computed: {
      payDetail() {
        if (typeof(result) != 'undefined') {
          if (result == '') {
            return {};
          } else {
            return JSON.parse(result).data;
          }
        } else {
          return {};
        }
      }
    },
    methods: {
      paySubmit() {
        let _this = this;

        if (payWay && payWay == 'WEIXIN') {
          let jsApiCall = function () {

            _this.$axios.post(`${_this.$api.wxMpPay}`, $.param({
              orderId: JSON.parse(result).data.orderId,
              couponId: _this.$store.state.coupon.couponId && !_this.$Global.isBlank(_this.$store.state.coupon.couponId) ? _this.$store.state.coupon.couponId : '',
            })).then((res) => {
              if (res.data.success) {
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
                        orderId: JSON.parse(result).data.orderId
                      }
                    });
                  } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    _this.$vux.toast.text('取消支付', 'top');
                  }
                });
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
        } else if (payWay && payWay == 'ALIPAY') {

          //兼容IE注册事件
          /*function addEvent(node, type, handler){
            if (node.addEventListener){
              node.addEventListener(type, handler, false);
            }else if(node.attachEvent){
              node.attachEvent('on' + type, handler);
            }else{
              node['on' + type] = handler;
            }
          }*/


          let turnForm = document.createElement("form");
          document.body.appendChild(turnForm);
          turnForm.method = 'get';
          // turnForm.target = 'targetFrame';
          turnForm.action = _this.$api.alipayMpPay;
          //创建隐藏表单
          let orderId = document.createElement("input");
          orderId.setAttribute("name", "orderId");
          orderId.setAttribute("type", "hidden");
          orderId.setAttribute("value", JSON.parse(result).data.orderId);
          turnForm.appendChild(orderId);

          let couponId = document.createElement("input");
          couponId.setAttribute("name", "couponId");
          couponId.setAttribute("type", "hidden");
          couponId.setAttribute("value", _this.$store.state.coupon.couponId && !_this.$Global.isBlank(_this.$store.state.coupon.couponId) ? _this.$store.state.coupon.couponId : '');
          turnForm.appendChild(couponId);

          turnForm.submit();

          /*let targetFrame = document.getElementById('targetFrame');
          //注册onload事件
          addEvent(targetFrame, 'load', function(event){
            try{
              let result = JSON.parse(targetFrame.contentWindow.document.body.textContent);
              if(result.code === 200){
                //正确返回提交的结果
                document.body.removeChild(turnForm);
              }
            }catch(e){
              //捕获错误
            }
          });*/

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


