<template>
  <div>
    <v-header title="个人中心"></v-header>
    <!-- 个人信息 -->
    <div id="infor" class="clearfix">
      <img :src="require('../../assets/img/my01.jpg')" alt="" />
      <div class="left">
        <p>代用名</p>
        <span>完善资料让小U更懂您</span>
      </div>
      <div class="right">
        <img :src="require('../../assets/img/my02.jpg')" alt="" />
      </div>
    </div>
    <!-- 导航栏 -->
    <nav>
      <p>
        <span>12</span>
        <span>我的收藏</span>
      </p>

      <p>
        <span>12</span>
        <span>浏览记录</span>
      </p>

      <p>
        <span><i>￥</i>0</span>
        <span>我的红包</span>
      </p>

      <p>
        <span>12</span>
        <span>优惠劵</span>
      </p>
    </nav>
    <!-- 订单 -->
    <div id="bottom">
      <div class="order">
        <div class="top1 clearfix">
          <h2>我的订单</h2>
          <span>
            全部订单<i
              class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"
            ></i>
          </span>
        </div>

        <div class="up">
          <p>
            <img :src="require('../../assets/img/my_01.jpg')" alt="" />
            <span>待付款</span>
          </p>

          <p>
            <img :src="require('../../assets/img/my_02.jpg')" alt="" />
            <span>待收货</span>
          </p>

          <p>
            <img :src="require('../../assets/img/my_03.jpg')" alt="" />
            <span>评价</span>
          </p>

          <p>
            <img :src="require('../../assets/img/my_04.jpg')" alt="" />
            <span>售后/退款</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <ul id="main">
      <li>
        <i class="iconfont">&#xe613;</i>
        <span>地址管理</span>
        <em class="iconfont">&#xe601;</em>
      </li>
      <li>
        <i class="iconfont">&#xe606;</i>
        <span>我的钱包</span>
        <em class="iconfont">&#xe601;</em>
        <b>剩余200U币</b>
      </li>
      <li>
        <i class="iconfont">&#xe646;</i>
        <span>我的二维码</span>
        <em class="iconfont">&#xe601;</em>
      </li>
      <li>
        <i class="iconfont">&#xe61d; </i>
        <span>我的伙伴</span>
        <em class="iconfont">&#xe601;</em>
      </li>
      <li>
        <i class="iconfont">&#xe653; </i>
        <span>0元适用</span>
        <em class="iconfont">&#xe601;</em>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/*个人信息*/
#infor {
  background: linear-gradient(#ff6243, #ff6e56);
}
#infor > img {
  float: left;
  height: 1.3rem;
  margin-left: 0.18rem;
}
#infor .left {
  float: left;
  margin-left: 0.1rem;
}
#infor .left p {
  font-size: 0.32rem;
  color: #fff;
  margin-top: 0.16rem;
  margin-bottom: 0.18rem;
}
#infor .left span {
  font-size: 0.16rem;
  color: #fff;
  padding: 0.03rem 0.06rem;
  border-radius: 0.05rem;
  border: 0.02rem solid #ffb4a7;
}
#infor .right {
  float: right;
}
#infor .right img {
  height: 0.4rem;
  margin-top: 0.5rem;
}
/*导航栏*/
nav {
  display: flex;
  height: 1.16rem;
  justify-content: space-around;
  background: linear-gradient(#ff6f57, #ff8171);
}
nav p {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
nav p span:nth-child(1) {
  font-size: 0.32rem;
  color: #fff;
}
nav p span:nth-child(2) {
  font-size: 0.16rem;
  color: #fff;
}
nav p i {
  font-size: 0.14rem;
}
/*订单*/
#bottom {
  height: 1.55rem;
  background: #ff8172;
  position: relative;
}
#bottom .order {
  height: 2.05rem;
  background: #fff;
  position: absolute;
  width: 7.1rem;
  left: 0.2rem;
  top: 0.2rem;
  padding: 0.2rem 0.2rem 0 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
}
#bottom .order .top1 h2 {
  float: left;
  font-size: 0.3rem;
  font-weight: bold;
  color: #333;
}
#bottom .order .top1 span {
  float: right;
  font-size: 0.2rem;
  color: #ff6040;
}
#bottom .order .top1 span i {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.24rem;
  font-weight: bold;
}
#bottom .order .up {
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
#bottom .order .up p {
  text-align: center;
  color: #636363;
  font-size: 0.2rem;
}
#bottom .order .up p img {
  height: 0.48rem;
  margin: 0 auto 0.1rem;
}
/*主体*/
#main {
  height: 4rem;
  background-color: #fff;
  margin-top: 0.9rem;
  padding: 0.35rem 0.2rem 0 0.2rem;
  margin-bottom: 1.65rem;
}
#main li {
  margin-bottom: 0.4rem;
}
#main li i {
  color: #ff6040;
  font-size: 0.3rem;
  font-weight: bold;
  margin-right: 0.05rem;
}
#main li span {
  font-size: 0.22rem;
  font-weight: bold;
}
#main li em,
#main li b {
  float: right;
  color: #666666;
}
#main li b {
  font-size: 0.2rem;
  display: inline-block;
  margin-top: -0.05rem;
}
#main li em {
  font-size: 0.18rem;
}
</style>