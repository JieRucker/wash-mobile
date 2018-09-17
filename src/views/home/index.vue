<style lang="scss">
  @mixin set-shop-item() {
    .l-address {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    .l-desc {
      color: #999;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
    }
    .l-block {
      color: #999;
      border-radius: 5px;
      height: 70px;
      line-height: 62px;
      text-align: center;
      margin-top: 10px;
      &.wash-mode {
        background-color: #52a0f1;
      }
      &.dry-mode {
        background-color: #f4b264;
      }
      .icon-mode {
        color: #fff;
        font-size: 40px
      }
      .l-name {
        color: #fff;
        font-size: 22px;
        padding-bottom: 22px;
        vertical-align: middle;
        display: inline-block;
      }
    }
    .l-tip {
      padding-top: 5px;
      text-align: right;
      .current-state {
        font-size: 14px;
        &.success {
          color: #38c700;
        }
        &.warn {
          color: #f74c31;
        }
      }
    }
  }

  .home-box-panel {
    .search-panel {
      .vux-search-box {
        .weui-search-bar {
          position: relative;
          padding: 8px 10px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          background-color: #EFEFF4;
        }
        .weui-search-bar__form {
          position: relative;
          -webkit-box-flex: 1;
          -ms-flex: auto;
          flex: auto;
          background-color: #EFEFF4;
          height: 30px;
          padding: 4px 0;
          .weui-search-bar__label {
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            z-index: 1;
            border-radius: 3px;
            text-align: center;
            color: #9B9B9B;
            background: #FFFFFF;
            .weui-icon-search {
              margin-right: 5px;
              color: #B2B2B2;
              font-size: 14px;
            }
            span {
              display: inline-block;
              font-size: 14px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .shop-header-panel {
      background-color: #fff;
      padding: 10px 10px;
      .l-rest {
        font-weight: 400;
        margin: 0;
        font-size: 14px;
      }
    }
    .shop-list-panel {
      .l-grid-item {
        background: #fff;
        border-bottom: 1px dotted #ddd;
        padding: 10px 40px;
        display: flex;
        .l-item-left {
          width: 50%;
          padding-right: 15px;
          position: relative;
          .icon-dingwei1 {
            position: absolute;
            left: -26px;
            top: -2px;
            color: #e78442;
            font-size: 22px
          }

          @include set-shop-item()
        }

        .l-item-right {
          width: 50%;
          padding-left: 15px;
          position: relative;
          .state {
            float: right;
            font-size: 14px;
            position: absolute;
            right: -20px;
            &.online {
              color: #38c700;
            }
            &.offline {
              color: #f74c31;
            }
          }
          @include set-shop-item()
        }
      }
    }
  }
</style>

<template>
  <div class="home-box-panel">
    <swiper loop auto :list="bannerList" :index="loopIndex" @on-index-change="onLoopIndexChange"></swiper>
    <div class="search-panel">
      <div class="vux-search-box">
        <div class="weui-search-bar">
          <div class="weui-search-bar__form">
            <label class="weui-search-bar__label" @click="onSearchFocus">
              <i class="weui-icon-search"></i>
              <span>搜索附近门店</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-header-panel set-1px-b">
      <h3 class="l-rest">我收藏的门店</h3>
    </div>

    <div class="shop-list-panel">
      <div class="l-grid-item" v-for="(item,index) in shopList">
        <div class="l-item-left">
          <i class="iconfont icon-dingwei1"></i>
          <p class="l-address">{{item.shopName}}</p>
          <p class="l-desc">{{item.shopAddress}}</p>
          <div class="l-block wash-mode" @click="selectMode('wash',index)">
            <i class="iconfont icon-xiyiji icon-mode"></i>
            <span class="l-name">洗衣</span>
          </div>
          <div class="l-tip">
            <span class="current-state success" v-if="item.washState == 0">空闲</span>
            <span class="current-state warn" v-if="item.washState == 1">正在运行</span>
          </div>
        </div>
        <div class="l-item-right">
          <p class="state online" v-if="item.online">在线</p>
          <p class="state offline" v-if="!item.online">离线</p>
          <p class="l-address"></p>
          <p class="l-desc"></p>
          <div class="l-block dry-mode" @click="selectMode('dry',index)">
            <i class="iconfont icon-icondry icon-mode"></i>
            <span class="l-name">烘干</span>
          </div>
          <div class="l-tip">
            <span class="current-state success" v-if="item.dryState == 0">空闲</span>
            <span class="current-state warn" v-if="item.dryState == 1">正在运行</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem, Grid, GridItem, GroupTitle} from 'vux';

  export default {
    components: {
      Swiper,
      SwiperItem,
      Grid,
      GridItem,
      GroupTitle,
    },
    data() {
      return {
        bannerList: [{
          url: 'javascript:',
          img: require('assets/images/imgs/kenan2.jpg'),
          title: ''
        }],
        loopIndex: 0,
        swiperItemIndex: 1,
        args: {
          start: 0,
          length: 10
        },
        shopList: [],
        /*shopList: [{
          "cityId": 1,
          "companyId": "1",
          "countyId": 1,
          "dryState": 0,
          "online": true,
          "provinceId": 1,
          "shopAddress": "杭州滨江区",
          "shopCloseTime": "23:59:59",
          "shopId": "1",
          "shopName": "花儿乒乓球俱乐部",
          "shopOpenTime": "0:00:00",
          "washState": 0
        }, {
          "cityId": 1,
          "companyId": "1",
          "countyId": 1,
          "dryState": 1,
          "online": true,
          "provinceId": 1,
          "shopAddress": "杭州滨江区",
          "shopCloseTime": "23:59:59",
          "shopId": "2",
          "shopName": "洗衣机",
          "shopOpenTime": "0:00:00",
          "washState": 1
        }]*/
      }
    },
    mounted() {
      console.log(this)

      window.aa = this
      this.listShop()
    },
    methods: {
      // 查询用户收藏店铺
      listShop() {
        this.shopList = [];
        this.$axios.post(`${this.$api.listUserFavoriteShop}`, $.param({
          shopName: '',
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.shopList = res.data.data.shopList;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      selectMode(type, index) {
        switch (type) {
          case 'wash':
            this.$router.push({
              name: 'prepare', params: {
                mode: 'wash',
                shopId: this.shopList[index].shopId
              }
            });
            break;
          case 'dry':
            this.$router.push({
              name: 'prepare', params: {
                mode: 'dry',
                shopId: this.shopList[index].shopId
              }
            });
            break;
        }
      },
      onSearchFocus() {
        this.$router.push({
          name: 'search-page', params: {}
        });
      },
      onLoopIndexChange(index) {
        this.loopIndex = index
      },
    }
  }
</script>
