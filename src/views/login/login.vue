<template>
  <div style="z-index: 2">
    <div>
      <x-header class="headfix"
                :left-options="{showBack: false, backText: ''}" :title="'绑定账号'">
      </x-header>
    </div>

    <group class="weui-cells_form">
      <x-input title="手机号码" name="mobile" v-model="params.phoneNum" ref="inputPhone" placeholder="请输入手机号码"
               keyboard="number"
               is-type="china-mobile" :max="11">
        <x-button slot="right" type="primary" mini :disabled="vaildcode" @click.native="getCode($event)">发送验证码
        </x-button>
      </x-input>
      <x-input title="验证码" v-model="params.phoneCode" placeholder="请输入验证码" keyboard="number"></x-input>
    </group>
    <div style="padding:10px 10px;">
      <x-button type="primary" action-type="button" @click.native="bindSubmit">立即绑定</x-button>
    </div>

  </div>
</template>

<script>
  import {Cell, Group, Divider, Alert, XSwitch, XHeader, XInput, XButton} from 'vux';

  export default {
    components: {
      Cell,
      Group,
      Divider,
      Alert,
      XInput,
      XHeader,
      XButton,
      XSwitch,
    },
    data() {
      return {
        params: {
          phoneNum: '',
          phoneCode: '',
        },
        time: 60, //验证码倒计时时间
        vaildcode: false,
      }
    },
    methods: {
      getPhoneValid() {
        return this.$refs.inputPhone.valid;
      },
      // 获取验证码
      getCode(e) {
        if (this.$Global.isBlank(this.params.phoneNum)) {
          this.$vux.toast.text('请输入手机号', 'top');
          return;
        } else {
          if (!this.getPhoneValid()) {
            this.$vux.toast.text('请输入正确的手机号', 'top');
            return;
          }
        }

        if (!this.vaildcode) {
          this.$axios.post(`${this.$api.sendVerifyCode}`, $.param({
            phoneNum: this.params.phoneNum,
          })).then((res) => {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }).catch((err) => {
            console.log(err)
          });

          this.vaildcode = true;

          let timer = setInterval(() => {
            this.time--;
            e.target.innerText = this.time + 's重新获取';

            if (this.time == 0) {
              e.target.innerText = '重新获取';
              clearInterval(timer);
              this.time = 60;
              this.vaildcode = false;
            }
          }, 1000)
        }
      },
      bindSubmit() {
        if (this.$Global.isBlank(this.params.phoneNum)) {
          this.$vux.toast.text('请输入手机号', 'top');
          return;
        } else {
          if (!this.getPhoneValid()) {
            this.$vux.toast.text('请输入正确的手机号', 'top');
            return;
          }
        }

        if (this.$Global.isBlank(this.params.phoneCode)) {
          this.$vux.toast.text('请输入验证码', 'top');
          return;
        }

        this.$axios.post(`${this.$api.bindWxUser}`, $.param({
          openId: typeof(openId) !== 'undefined' && !this.$Global.isBlank(openId) ? openId : '',
          phoneNum: this.params.phoneNum,
          verifyCode: this.params.phoneCode
        })).then((res) => {
          if (res.data.success) {
            this.$vux.toast.text(res.data.retMsg, 'top');
            this.$router.push({name: 'home', params: {}})
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>


