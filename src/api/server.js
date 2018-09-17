/**
 * Created by Mister_Zhang on 2018/3/23.
 * api 接口
 */

export default {
  sendVerifyCode: `${process.env.api.commonUrl}/open/sendVerifyCode`, // 发送验证码
  bindWxUser: `${process.env.api.commonUrl}/open/bindUser`, //绑定登录
  wxMpPay: `${process.env.api.commonUrl}/wx/wxMpPay`, // 微信公众号支付
  alipayMpPay: `${process.env.api.commonUrl}/alipay/alipayMpPay`, // 支付宝支付

  listCounty: `${process.env.api.commonUrl}/order/info/listCounty`, // 查询区
  listCity: `${process.env.api.commonUrl}/order/info/listCity`, // 查询城市
  listProvince: `${process.env.api.commonUrl}/order/info/listProvince`, // 查询省份
  getUserByUserId: `${process.env.api.commonUrl}/order/info/getUserByUserId`, // 用户查询
  listShop: `${process.env.api.commonUrl}/order/info/listShop`, // 门店查询

  // App版本号信息
  checkAppUpdate: `${process.env.api.commonUrl}/order/info/getUserByUserId`, // 获取最新App版本号信息

  // 订单
  queryOrderList: `${process.env.api.commonUrl}/order/info/queryOrderList`, // 订单查询
  queryOrderDetails: `${process.env.api.commonUrl}/order/info/queryOrderDetails`, // 普通订单查询
  cancelOrder: `${process.env.api.commonUrl}/order/info/cancelOrder`, // 订单取消
  orderRefund: `${process.env.api.commonUrl}/order/info/orderRefund`, // 订单退款
  // listNormalRefundingOrder: `${process.env.api.commonUrl}/order/info/listNormalOrder`, // 普通退款中订单查询
  // listPrepareOrder: `${process.env.api.commonUrl}/order/info/listPrepareOrder`, // 预约订单查询
  // listPrepareRefundingOrder: `${process.env.api.commonUrl}/order/info/listPrepareRefundingOrder`, // 预约退款中订单查询

  // 设备
  listDevice: `${process.env.api.commonUrl}/order/info/listDevice`, // 修改设备
  updateDevice: `${process.env.api.commonUrl}/order/info/updateDevice`, // 修改设备
  deleteDevice: `${process.env.api.commonUrl}/order/info/deleteDevice`, // 删除设备
  addWashDevice: `${process.env.api.commonUrl}/order/info/addWashDevice`, // 添加洗衣机
  addDryDevice: `${process.env.api.commonUrl}/order/info/addDryDevice`, // 添加烘干机

  // 优惠券
  listUserCouponByDeviceId: `${process.env.api.commonUrl}/order/info/listUserCouponByDeviceId`, // 获取用户优惠券-设备
  listUserCoupon: `${process.env.api.commonUrl}/order/info/listUserCoupon`, // 获取用户优惠券
  countUserCouponByDeviceId: `${process.env.api.commonUrl}/order/info/countUserCouponByDeviceId`, // 获取用户优惠券数量

  // 预约
  listUserFavoriteShop: `${process.env.api.commonUrl}/order/info/listUserFavoriteShop`, // 获取用户收藏店铺
  getPrepareAvailableDate: `${process.env.api.commonUrl}/order/info/getPrepareAvailableDate`, // 获取预约可用时间
  getUserInfo: `${process.env.api.commonUrl}/order/info/getUserInfo`, // 获取用户信息
  getPrepareShopServicePrice: `${process.env.api.commonUrl}/order/info/getPrepareShopServicePrice`, // 获取预约服务价格
  getPrepareShopWashMode: `${process.env.api.commonUrl}/order/info/getPrepareShopWashMode`, // 获取预约门店信息和工作模式-洗衣机
  getPrepareShopDryMode: `${process.env.api.commonUrl}/order/info/getPrepareShopDryMode`, // 获取预约门店信息和工作模式-烘干机
  addPrepareOrder: `${process.env.api.commonUrl}/order/info/addPrepareOrder`, // 创建预约订单
  getPrepareOrder: `${process.env.api.commonUrl}/order/info/getPrepareOrder`, // 查询预约订单
}


