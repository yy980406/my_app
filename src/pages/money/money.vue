<template>
  <div>
    <v-header :back="true" title="支付页面"></v-header>
    <div>
      <p class="order">订单号:{{$route.query.outTradeNo}}</p>
      <p class="price">￥<span>{{$route.query.countmoney}}</span></p>
      <div class="way">
        <h3 class="title">请选择支付方式</h3>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="支付宝支付" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="微信支付" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <van-button type="primary" block>确定支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       radio: '1',
    }
  }
};
</script>

<style scoped>
.order{
  text-align: center;
  margin-top: 0.5rem;
  color: #999;
}

.price{
  margin-top: 30px;
  text-align: center;
  font-size: 0.4rem;
}
.way{
 margin-top: 3rem;
 font-size: 0.3rem;
} 
.van-button{
  position: absolute;
  bottom: 0.5rem;
}
</style>