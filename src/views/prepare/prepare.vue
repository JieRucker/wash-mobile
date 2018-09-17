<style lang="scss">
  .p-prepare-panel {
    z-index: 2;
    .u-mode-panel {
      margin-top: 1px;
      .grid-item {
        background-color: #fff;
        cursor: pointer;
        &.selected {
          background-color: #629fe0;
          .u-name {
            color: #fff;
          }
          .u-desc {
            color: #fff;
          }
          .u-time {
            color: #fff;
          }
        }

        .weui-grid {
          &:last-child {
            padding: 20px 0;
          }
        }

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
        .u-time {
          text-align: center;
          color: #333;
        }
      }
      .inline-number {
        .vux-number-input {
          font-size: 16px;
        }
        .vux-number-selector {
          height: 20px;
          line-height: 14px;
        }
        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
    .u-desc-panel {
      color: #999;
      background-color: #fff;
    }
    .u-datetime-panel {
      .vux-datetime {
        padding: 0;
      }
    }
    .u-button-panel {
      padding: 40px 10px 0 10px;
      .prepare-button {
        background: #52a0f1;
        font-size: 16px;
      }
    }
  }
</style>

<template>
  <div class="p-prepare-panel">
    <x-header
      :left-options="{showBack: true, backText: ''}" :title="'预约'">
    </x-header>
    <group :title="shopInfo.shopName">
      <div class="shop-address" style="background-color:#fff">
        <cell :title="shopInfo.shopAddress">
          <i slot="icon" style="color: #e78442;font-size: 22px;margin-right: 5px;" class="iconfont icon-dingwei1"></i>
        </cell>
      </div>
    </group>
    <cell :title="'请选择洗衣模式'">
      <a href="javascript:;" style="color:#52a0f1">
        成为会员 优惠洗衣
      </a>
    </cell>
    <div style="text-align:center;padding: 10px 15px;background-color:#fff">
      <p style="font-size:18px;color:#333">{{shopInfo.price}}</p>
    </div>


    <div class="u-mode-panel">
      <div v-if="$route.params.mode == 'wash'">
        <grid>
          <grid-item v-for="(item,index) in modeList" :key="index"
                     :class="item.selected ? 'grid-item selected' : 'grid-item'" @click.native="selectMode(index)">
            <div class="u-name">{{item.deviceWorkModeName}}</div>
            <div class="u-desc">{{item.tipEn}}</div>
            <div class="u-time">{{item.runtime}}分钟</div>
          </grid-item>
        </grid>
      </div>
      <div v-if="$route.params.mode == 'dry'">
        <grid>
          <grid-item v-for="(item,index) in modeList" :key="index"
                     :class="item.selected ? 'grid-item selected' : 'grid-item'" @click.native="selectMode(index)">
            <div class="u-name">{{item.deviceWorkModeName}}</div>
            <div class="u-desc">{{item.tipEn}}</div>
            <div class="u-time">{{item.tip}}</div>
          </grid-item>
        </grid>
        <group class="inline-number">
          <cell title="请选择烘干时间">
            <inline-x-number style="display:block;" v-model="shopInfo.inlineNumber" :min="10" :max="90" :step="10"
                             width="50px" button-style="round"></inline-x-number>
          </cell>
        </group>
      </div>
    </div>
    <p class="u-desc-panel" v-if="$route.params.mode == 'wash'">
      <cell :title="'标准的洗涤程序。平衡洗涤时间和洗净度，适用于大部分衣物'">
      </cell>
    </p>
    <p class="u-desc-panel" v-if="$route.params.mode == 'dry'">
      <cell :title="'标准的烘干程序。平衡烘干时间和烘干度，适用于大部分衣物'">
      </cell>
    </p>
    <group title="选择开始时间" class="u-datetime-panel">
      <cell :title="datetime.title" is-link @click.native="getPrepareDate">
        <p class="cell-value">
          {{datetime.value}}
        </p>
      </cell>
    </group>
    <div class="u-button-panel">
      <x-button type="primary" class="prepare-button" @click.native="prepareSubmit">
        确认预约
      </x-button>
    </div>


  </div>
</template>

<script>
  import {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Datetime, InlineXNumber} from 'vux';

  export default {
    name: "prepare",
    components: {Group, Cell, Blur, Grid, GridItem, XButton, XHeader, Datetime, InlineXNumber},
    data() {
      return {
        shopInfo: {
          shopName: '',
          shopAddress: '',
          price: '请选择时间',
          startDate: '',
          inlineNumber: 10,
        },
        datetime: {
          value: '',
          placeholder: '请选择时间',
          title: '立即使用',
          startDate: '',
          endDate: '',
          defaultSelectedValue: '',
          hourList: [],
          minuteList: [],
          totalDateList: [],
          year: [],
          month: [],
          day: []
        },
        modeList: [],
      }
    },
    mounted() {
      switch (this.$route.params.mode) {
        case 'wash':
          this.washModeList();
          break;
        case 'dry':
          this.dryModeList();
          break;
      }
    },
    methods: {
      getPrepareDate() {
        this.datetime.hourList = [];
        this.datetime.minuteList = [];

        this.$axios.post(`${this.$api.getPrepareAvailableDate}`, $.param({
          deviceWorkModeId: this.selectCurrentModel().deviceWorkModeId,
          runtime: this.$route.params.mode == 'wash' ? '' : this.shopInfo.inlineNumber,
          shopId: this.$route.params.shopId
        })).then((res) => {
          if (res.data.success) {
            this.datetime.totalDateObject = res.data.data;
            this.datetime.startDate = res.data.data.startDate;
            this.datetime.endDate = res.data.data.endDate;

            // 初始化日期选择数据
            this.initPickerTimeData(this.datetime.totalDateObject, this.datetime.startDate, this.datetime.endDate);
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      initPickerTimeData(totalDateObject, startDate, endDate) {
        let year = startDate.substr(0, 4);
        let month = startDate.substr(5, 2);
        let day = startDate.substr(8, 2);

        let currentHour = totalDateObject.year[`${year}`][`${month}`][`${day}`];
        for (let [key, value] of Object.entries(currentHour)) {
          this.datetime.hourList.push(key);
        }

        this.datetime.minuteList = (() => {
          let minutes = totalDateObject.year[`${year}`][`${month}`][`${day}`][`${this.datetime.hourList[0]}`]['minutes'];
          return minutes.length ? minutes : ['00'];
        })();

        this.datetime.defaultSelectedValue = `${startDate} ${this.datetime.hourList[0]}:${this.datetime.minuteList[0]}`;

        // 唤起日期选择plugin
        this.renderPickerTimePlugin(this.datetime.defaultSelectedValue, this.datetime.hourList, this.datetime.minuteList, this.datetime.startDate, this.datetime.endDate);
      },
      renderPickerTimePlugin(defaultSelectedValue, hourList, minuteList, startDate, endDate) {
        let _this = this;

        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          hourList: hourList,
          minuteList: minuteList,
          yearRow: `{value}年`,
          monthRow: `{value}月`,
          dayRow: `{value}日`,
          hourRow: `{value}时`,
          minuteRow: `{value}分`,
          format: 'YYYY-MM-DD HH:mm',
          startDate: startDate,
          endDate: endDate,
          defaultSelectedValue: defaultSelectedValue,
          value: '',
          onConfirm(val) {
            _this.datetime.value = val;
            _this.$vux.datetime.hide();
            _this.getPriceHttp(_this.selectCurrentModel().deviceWorkModeId, _this.$route.params.shopId, `${_this.datetime.value}:00`)
          },
          onSelect(type, currentVal, wholeValue) {
            currentVal = (currentVal < 10) ? `0${currentVal}` : currentVal;
            let year = wholeValue.substr(0, 4);
            let month = wholeValue.substr(5, 2);
            let day = wholeValue.substr(8, 2);

            console.log(`${type} ${currentVal} ${wholeValue}`);

            const toggleDate = ((year, month, day) => {
              let currentHour = _this.datetime.totalDateObject.year[`${year}`][`${month}`][`${day}`];
              let currentHourArray = [];
              for (let [key, value] of Object.entries(currentHour)) {
                currentHourArray.push(key)
              }

              _this.$vux.datetime.datetime.config.hourList = currentHourArray.sort((a, b) => {
                return a - b;
              });

              _this.$vux.datetime.datetime._setHourScroller();

              _this.$vux.datetime.datetime.config.minuteList = (() => {
                let minutes = _this.datetime.totalDateObject.year[`${year}`][`${month}`][`${day}`][`${_this.$vux.datetime.datetime.config.hourList[0]}`]['minutes'];
                return minutes.length ? minutes : ['00'];
              })();

              _this.$vux.datetime.datetime._setMinuteScroller();
            });

            switch (type) {
              case 'year':
                toggleDate(currentVal, month, day);
                break;
              case 'month':
                toggleDate(year, currentVal, day);
                break;
              case 'day':
                toggleDate(year, month, currentVal);
                break;
              case 'hour':
                _this.$vux.datetime.datetime.config.minuteList = (() => {
                  let minutes = _this.datetime.totalDateObject.year[`${year}`][`${month}`][`${day}`][`${currentVal}`]['minutes'];
                  return minutes.length ? minutes : ['00'];
                })();

                _this.$vux.datetime.datetime._setMinuteScroller();
                break;
              case 'minute':
                break;
            }
          }
        });
      },
      // 获取预约门店信息和工作模式-洗衣机
      washModeList() {
        this.modeList = [];
        this.$axios.post(`${this.$api.getPrepareShopWashMode}`, $.param({
          shopId: this.$route.params.shopId,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.deviceWorkModeList.forEach((m, key) => {
              this.modeList.push({
                deviceWorkModeId: m.deviceWorkModeId,
                deviceWorkModeName: m.deviceWorkModeName,
                deviceWorkModeType: m.deviceWorkModeType,
                temperature: m.temperature,
                tipEn: m.tipEn,
                runtime: m.runtime,
                selected: key == 0 ? true : false
              })
            });

            this.shopInfo.shopName = res.data.data.shopName;
            this.shopInfo.shopAddress = res.data.data.shopAddress;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取预约门店信息和工作模式-烘干机
      dryModeList() {
        this.modeList = [];
        this.$axios.post(`${this.$api.getPrepareShopDryMode}`, $.param({
          shopId: this.$route.params.shopId,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.deviceWorkModeList.forEach((m, key) => {
              this.modeList.push({
                deviceWorkModeId: m.deviceWorkModeId,
                deviceWorkModeName: m.deviceWorkModeName,
                deviceWorkModeType: m.deviceWorkModeType,
                temperature: m.temperature,
                tipEn: m.tipEn,
                runtime: m.runtime,
                selected: key == 0 ? true : false
              })
            });

            this.shopInfo.shopName = res.data.data.shopName;
            this.shopInfo.shopAddress = res.data.data.shopAddress;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      selectMode(index) {
        this.modeList.forEach((m) => {
          m.selected = false
        });
        this.modeList[index].selected = true;

        if (!this.$Global.isBlank(this.datetime.value)) {
          this.getPriceHttp(this.selectCurrentModel().deviceWorkModeId, this.$route.params.shopId, `${this.datetime.value}:00`)
        } else {
          this.$vux.toast.text('请先选择时间！', 'top');
        }
      },
      selectCurrentModel() {
        let result = null;
        this.modeList.forEach((m) => {
          if (m.selected) {
            result = m;
          }
        });

        return result;
      },
      getPriceHttp(deviceWorkModeId, shopId, startDate) {
        this.$axios.post(`${this.$api.getPrepareShopServicePrice}`, $.param({
          deviceWorkModeId: deviceWorkModeId,
          shopId: shopId,
          startDate: startDate
        })).then((res) => {
          if (res.data.success) {
            this.shopInfo.price = `￥${res.data.data.price}`;
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      prepareSubmit() {

        if (!this.$Global.isBlank(this.datetime.value)) {
          this.$axios.post(`${this.$api.addPrepareOrder}`, $.param({
            deviceWorkModeType: this.selectCurrentModel().deviceWorkModeId,
            runtime: this.$route.params.mode == 'wash' ? '' : this.shopInfo.inlineNumber,
            shopId: this.$route.params.shopId,
            startDate: `${this.datetime.value}:00`
          })).then((res) => {
            if (res.data.success) {
              this.$router.push({
                name: 'order-prepare-pay', params: {
                  orderId: res.data.data.orderId
                }
              });
            } else {
              this.$vux.toast.text(res.data.retMsg, 'top');
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$vux.toast.text('请选择时间！', 'top');
        }
      }
    }
  }
</script>

