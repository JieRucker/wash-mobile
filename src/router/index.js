import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Router.prototype.openPage = function (link, query) {
  this.push({
    path: link,
    query: _.assignIn({
      time: new Date().getTime()
    }, query || {})
  })
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/home/index.vue'], resolve),
      meta: {
        title: '主页',
        mainPage: true
      },
    },
    {
      path: '/order',
      name: 'order',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/index.vue'], resolve)
      },
      meta: {title: '订单'}
    },
    {
      path: '/order/order-pay',
      name: 'order-pay',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/order-pay.vue'], resolve)
      },
      meta: {title: '订单支付'}
    },
    {
      path: '/order/order-prepare-pay/:orderId',
      name: 'order-prepare-pay',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/order-prepare-pay.vue'], resolve)
      },
      meta: {title: '订单支付'}
    },
    {
      path: '/order/order-detail/:isPrepare/:orderId',
      name: 'order-detail',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/order-detail.vue'], resolve)
      },
      meta: {title: '订单详情'}
    },
    {
      path: '/order/order-success',
      name: 'order-success',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/order-success.vue'], resolve)
      },
      meta: {title: '支付成功'}
    },
    {
      path: '/order/order-refund',
      name: 'order-refund',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/order/order-refund.vue'], resolve)
      },
      meta: {title: '订单退款'}
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/mine/index.vue'], resolve)
      },
      meta: {title: '我的'}
    },
    {
      path: '/coupon/select-coupon/:deviceId',
      name: 'select-coupon',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/coupon/select-coupon.vue'], resolve)
      },
      meta: {title: '选择优惠券'}
    },
    {
      path: '/coupon/coupon-activity',
      name: 'coupon-activity',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/coupon/coupon-activity.vue'], resolve)
      },
      meta: {title: '新人优惠券'}
    },
    {
      path: '/coupon/my-coupon',
      name: 'my-coupon',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/coupon/my-coupon.vue'], resolve)
      },
      meta: {title: '我的优惠券'}
    },
    {
      path: '/coupon/activity',
      name: 'activity',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/coupon/activity.vue'], resolve)
      },
      meta: {title: '优惠券礼包'}
    },
    {
      path: '/machine/shut-down',
      name: 'shut-down',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/machine/shut-down.vue'], resolve)
      },
      meta: {title: '停机'}
    },
    {
      path: '/prepare/prepare/:mode/:shopId',
      name: 'prepare',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/prepare/prepare.vue'], resolve)
      },
      meta: {title: '预约'}
    },
    {
      path: '/member/member',
      name: 'member',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/member/member.vue'], resolve)
      },
      meta: {title: '会员'}
    },
    {
      path: '/login',
      name: 'login',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/login/login.vue'], resolve)
      },
      meta: {title: '登录'}
    },
    {
      path: '/search',
      name: 'search-page',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/search/index.vue'], resolve)
      },
      meta: {title: '搜索'}
    },
    {
      path: '/notice',
      name: 'notice',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/document/notice.vue'], resolve)
      },
      meta: {title: '注意事项'}
    },
    {
      path: '/refund',
      name: 'refund',
      components: {
        'default': resolve => require(['@/views/home/index.vue'], resolve),
        'subPage': resolve => require(['@/views/document/refund.vue'], resolve)
      },
      meta: {title: '退款须知'}
    }
  ]
})
