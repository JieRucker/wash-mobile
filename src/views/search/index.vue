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

  .s-search-page {
    z-index: 2;
    .vux-search-box {
      &.vux-search-fixed {
        position: static !important;
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

          @include set-shop-item();
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
          @include set-shop-item();
        }
      }
    }
  }
</style>
<template>
  <div class="s-search-page">
    <search
      :placeholder="'搜索附近门店'"
      :results="results"
      v-model="searchValue"
      top="0"
      auto-scroll-to-top
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
    </search>

    <div class="shop-list-panel">
      <div class="l-grid-item" v-for="(item,index) in shopList">
        <div class="l-item-left">
          <i class="iconfont icon-dingwei1"></i>
          <p class="l-address">{{item.shopName}}</p>
          <p class="l-desc">{{item.shopAddress}}</p>
          <div class="l-block" @click="selectMode('wash',index)">
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
          <div class="l-block" @click="selectMode('dry',index)">
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

  import axios from 'axios';
  import {Search} from 'vux';

  export default {
    name: 'search-page',
    components: {
      Search
    },
    data() {
      return {
        results: [],
        searchValue: '',
        args: {
          start: 0,
          length: 10
        },
        shopList: []
      }
    },
    mounted() {
      this.$refs.search.touch()
    },
    methods: {
      // 查询用户收藏店铺
      listShop(shopName) {
        this.shopList = [];
        this.$axios.post(`${this.$api.listUserFavoriteShop}`, $.param({
          shopName: shopName,
          start: this.args.start,
          length: this.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.shopList = res.data.data.shopList;
            if (!this.shopList.length) {
              this.$vux.toast.text('暂无数据！', 'top');
            }
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
      onSubmit() {
        this.$refs.search.setBlur();
        this.listShop(this.searchValue);
      },
      onCancel() {
        window.history.go(-1)
      },
    }
  }
</script>
