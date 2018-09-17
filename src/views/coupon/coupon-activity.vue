<style lang="scss">
  @mixin setCoupon($fontSize:16px,$color:#fff,$disabled:#999) {
    position: absolute;
    font-size: $fontSize;
    color: $color;
    z-index: 10;
    &.disabled {
      color: $disabled;
    }
  }

  .c-coupon-activity {
    z-index: 2;
    .c-main-panel {
      .c-link-coupon {
        .link-coupon {
          color: #52a0f1
        }
      }
      .c-coupon-panel {
        padding: 0 10px;
        .c-coupon-item {
          height: 100%;
          width: 100%;
          position: relative;
          .wash-coupon {
            .background {
              width: 100%;
            }
            .name {
              top: 20px;
              left: 26px;
              @include setCoupon(20px, #fff);
            }
            .date {
              left: 27px;
              bottom: 16px;
              @include setCoupon(14px, #fff);
            }
            .price {
              top: 48px;
              left: 56%;
              @include setCoupon(16px, #b5d555);
            }
            .type {
              top: 49px;
              right: 30px;
              @include setCoupon(18px, #b5d555);
            }
          }
          .dry-coupon {
            .background {
              width: 100%;
            }
            .name {
              top: 20px;
              left: 26px;
              @include setCoupon(20px, #fff);
            }
            .date {
              left: 27px;
              bottom: 16px;
              @include setCoupon(14px, #fff);
            }
            .price {
              top: 48px;
              left: 56%;
              @include setCoupon(16px, #ffbb5b);
            }
            .type {
              top: 49px;
              right: 30px;
              @include setCoupon(18px, #ffbb5b);
            }
          }
        }
      }
      .c-coupon-footer {
        .no-coupon {
          text-align: center;
          line-height: 40px;
          height: 40px;
          margin-top: 10px;
        }
        .use-coupon-button {
          margin-top: 20px;
          padding: 0 15px;
          .use-button {
            background: #52a0f1;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="c-coupon-activity">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'新人礼包'">
    </x-header>

    <div class="c-main-panel">
      <cell :title="'券被人抢光啦'" is-link class="c-link-coupon" @click.native="linkMyCoupon" v-if="!couponList.length">
        <a href="javascript:;" class="link-coupon">
          查看我的优惠券
        </a>
      </cell>
      <cell :title="'您已经领过新人礼包啦'" is-link class="c-link-coupon" @click.native="linkMyCoupon" v-if="couponList.length">
        <a href="javascript:;" class="link-coupon">
          查看我的优惠券
        </a>
      </cell>
      <div class="c-coupon-panel" v-if="couponList.length">
        <div class="c-coupon-item" v-for="(item,index) in couponList" v-cloak>
          <div class="wash-coupon" v-if="item.couponType == 1">
            <img class="background" :src="!item.timeout ? coupon.washCouponImage : coupon.timeoutCouponImage">
            <p :class="!item.timeout ? 'name' : 'name disabled'">{{item.couponName}}</p>
            <p :class="!item.timeout ? 'date' : 'date disabled'">有效期至{{item.endDate}}</p>
            <p :class="!item.timeout ? 'price' : 'price disabled'">洗衣券</p>
            <p :class="!item.timeout ? 'type' : 'type disabled'">{{item.couponValue |
              priceFormat(item.couponValue)}}</p>
          </div>
          <div class="dry-coupon" v-if="item.couponType == 2">
            <img class="background" :src="!item.timeout ? coupon.dryCouponImage : coupon.timeoutCouponImage">
            <p :class="!item.timeout ? 'name' : 'name disabled'">{{item.couponName}}</p>
            <p :class="!item.timeout ? 'date' : 'date disabled'">有效期至{{item.endDate}}</p>
            <p :class="!item.timeout ? 'price' : 'price disabled'">烘干券</p>
            <p :class="!item.timeout ? 'type' : 'type disabled'">{{item.couponValue |
              priceFormat(item.couponValue)}}</p>
          </div>
        </div>
      </div>
      <div class="c-coupon-footer">
        <div class="use-coupon-button" v-if="couponList.length">
          <x-button type="primary" class="use-button" @click.native="linkHome">
            立即使用
          </x-button>
        </div>
        <div class="no-coupon set-1px-t" v-if="!couponList.length">
          <p>无更多优惠券</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, Blur, XButton, CheckIcon} from 'vux'

  export default {
    name: "coupon-activity",
    components: {XHeader, Group, Cell, Blur, XButton, CheckIcon},
    data() {
      return {
        args: {
          start: 0,
          length: 10
        },
        coupon: {
          washCouponImage: require('images/coupon/wash-coupon.png'),
          dryCouponImage: require('images/coupon/dry-coupon.png'),
          timeoutCouponImage: require('images/coupon/timeout-coupon.png'),
        },
        couponList: [
          /*{
            "couponId": "2",
            "couponName": "洗衣机优惠券",
            "couponType": 1,
            "couponTypeName": "洗衣券",
            "couponValue": 2,
            "endDate": "2018-04-16 00:00:00",
            "shopAddress": "杭州滨江区",
            "shopId": "1",
            "shopName": "花儿乒乓球俱乐部",
            "startDate": "2018-03-15 00:00:00",
            "universal": false,
            "timeout": false
          }*/
        ]
      }
    },
    filters: {      //数据过滤器
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
      this.listCoupon();
    },
    methods: {
      listCoupon() {
        this.$axios.post(`${this.$api.listUserCoupon}`, $.param({
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.couponList.forEach((m) => {
              m.timeout = false
            });

            this.couponList = res.data.data.couponList;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      linkMyCoupon() {
        this.$router.push({
          name: 'my-coupon',
          params: {}
        })
      },
      linkHome() {
        this.$router.push({
          name: 'home',
          params: {}
        })
      }
    }
  }
</script>


