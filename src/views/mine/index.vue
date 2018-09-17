<style lang="scss">
  .user-info-panel {
    z-index: 2;
    .u-link-panel {
      .u-icon {
        width: 22px;
        margin-right: 5px;
        display: inline-block;
        font-size: 18px
      }
    }
    .u-member-panel {
      .u-name {
        font-size: 16px;
        text-align: center;
        color: #333;
      }
      .u-desc {
        color: #999999;
        font-size: 12px;
        text-align: center;
        padding: 5px 0;
      }
      .u-price {
        color: #09BB07;
        padding-bottom: 10px;
      }
      .u-button {
        text-align: center;
      }
    }
  }
</style>

<template>
  <div class="user-info-panel">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'我的'">
    </x-header>
    <panel :header="''" :list="userInfoList" :type="type" @on-img-error="onImgError"></panel>
    <group class="u-link-panel">
      <cell :title="'我的会员'" is-link @click.native="linkMember">
        <i slot="icon" class="iconfont u-icon icon-huiyuan"></i>
      </cell>
      <cell :title="'我的优惠券'" is-link @click.native="linkMyCoupon">
        <i slot="icon" class="iconfont u-icon icon-wodeyouhuiquan"></i>
      </cell>
    </group>
    <group title="购买会员" class="u-member-panel">
      <grid>
        <grid-item v-for="(item,index) in memberList" :key="index">
          <div class="u-name">{{item.name}}</div>
          <div class="u-desc">{{item.desc}}</div>
          <div class="u-price">{{item.price}}</div>
          <div class="u-button">
            <x-button type="primary" action-type="button" mini>购买</x-button>
          </div>
        </grid-item>
      </grid>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Panel} from 'vux'

  export default {
    name: "mine",
    components: {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Panel},
    data() {
      return {
        memberList: [
          {
            name: '12月半价洗衣',
            desc: '单次洗衣只需半价',
            price: '￥200.00',
          },
          {
            name: '12月半价洗衣',
            desc: '单次洗衣只需半价',
            price: '￥50.00'
          },
          {
            name: '12月半价洗衣',
            desc: '单次洗衣只需半价',
            price: '￥150.00'
          }
        ],
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',

        type: '1',
        userInfoList: [{
          src: '',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '',
          desc: '',
          url: ''
        }],
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        this.userInfoList = [];
        this.$axios.post(`${this.$api.getUserInfo}`).then((res) => {
          if (res.data.success) {
            let item = res.data.data;

            this.userInfoList.push({
              src: item.headUrl,
              title: item.userName,
              desc: item.phoneNum
            })
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      linkMyCoupon() {
        this.$router.push({
          name: 'my-coupon', params: {}
        });
      },
      linkMember() {
        this.$router.push({
          name: 'member', params: {}
        });
      },
      onImgError(item, $event) {
        console.log(item, $event)
      }
    }
  }
</script>
