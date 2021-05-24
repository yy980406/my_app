<template>
  <div>
    <v-header title="商品详情" :back="true"></v-header>
    <!--商品  -->
    <div class="shop">
      <div class="imgs">
        <img :src="$pre+detail.img" alt="" class="shop_img" />
      </div>

      <!-- 信息 -->
      <div class="new">
        <!-- 上 -->
        <div class="top1">
          <p>
            <span class="price" v-if="detail.price"> <i>￥</i>{{detail.price|filterPrice}} </span>
            <del v-if="detail.market_price">￥{{detail.market_price|filterPrice}}</del>
          </p>
          <p class="cang">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
          </p>
        </div>

        <!-- 下 -->
        <div class="bottom">
          <p class="name">{{detail.goodsname}}</p>
          <div class="des" v-html="detail.description"></div>
          <div class="text">
            <span>此商品于2020-11-11，00点结束闪购特卖，品牌美妆闪购专场</span>
            <p>
              <a href="#">查看</a>
              <span class="iconfont">&#xe601; </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="discount">
      <div class="up">
        <p class="txt1">领劵</p>
        <div class="pic">
          <img :src="require('../../assets/img/money.jpg')" alt="" />
          <img :src="require('../../assets/img/money.jpg')" alt="" />
          <img :src="require('../../assets/img/money.jpg')" alt="" />
        </div>
      </div>

      <div class="down">
        <p class="txt1">分期</p>
        <p class="txt2">可选3/6/12期</p>
      </div>
    </div>

    <!-- 蒙层 -->
    <div class="mark" v-if="isshow">
      <div class="con">
        <h5>颜色分类</h5>
        <span  v-for="(item,index) in arr" :key="item" :class="index==n?'select':''" @click="n=index">{{item}}</span>
        <h5>购买的数量 <span>库存<i>{{detail.number}}</i></span></h5>
        <p class="num">
          <span class="jian" @click="jian">-</span>
          <span class="number">{{num}}</span>
          <span class="jia"  @click="add">+</span>
        </p>
        <p class="btn">
          <button class="sure" @click="sure">确定</button>
        </p>
      </div>
    </div>

    <!-- 尾部部分 -->
    <footer>
      <div class="left">
        <p>
          <i class="iconfont">&#xe62d;</i>
          <span>客服</span>
        </p>

        <p>
          <i class="iconfont">&#xe663;</i>
          <span>店铺</span>
        </p>

        <p @click="toShop">
          <i class="iconfont">&#xe612; </i>
          <span>购物车</span>
        </p>
      </div>

      <div class="right">
        <button class="car" @click="addShop">加入购物车</button>
        <button class="buy">立即购买</button>
      </div>

      <span class="line"></span>
    </footer>
  </div>
</template>

<script>
import { reqAddShop, reqDetail } from '../../request';
export default {
  data () {
    return {
      // 初始化数据
      detail:{},
      arr:[],
      num:1,
      isshow:false,
      n:0,
      authorization:JSON.parse(localStorage.getItem("userInfo")).token,
      uid:JSON.parse(localStorage.getItem("userInfo")).uid
    }
  },
  mounted () {
    // 发送请求
    reqDetail(this.$route.query.id).then((res)=>{
      this.detail=res.data.list[0]
      this.arr = res.data.list[0].specsattr.split(",")
    })
  },
  methods: {
    add(){
      this.num++
      this.num = Math.min(this.num,100);
    },
    jian(){
      this.num--
      this.num = Math.max(1,this.num);
    },
    sure(){
      reqAddShop(this.uid,this.detail.id,this.num,this.authorization).then((res)=>{

      })
      this.isshow=false
    },
    addShop(){
      this.isshow=true;
    },
    toShop(){
      this.$router.push("/index/shop")
    }
  }
};
</script>

<style scoped>
.mark{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.5);
}

.mark .con{
  width: 100vw;
  padding: 0.4rem 0;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 10;
}

.mark .con h5{
  font-size: 0.3rem;
  margin: .2rem 0;
}

.mark .con>span{
  border: 1px solid #ccc;
  padding: 0.08rem;
  margin-left: .1rem;
}
.mark .con .select{
  background: #ff6040;
  color: #fff;
}


.mark .con .num {
  display: flex;
}

.mark .con .num span{
  padding: .16rem;
  display: block;
  border: 1px solid #ccc;
}

.mark .con .sure{
  width: 50%;
  height: 0.5rem;
  background:#ccc;
  border: none;
}
.shop .shop_img {
  height: 7.5rem;
}
.shop .new {
  background: #fff;
  padding: 0 0.2rem 0.15rem;
}
.shop .new .top1 {
  display: flex;
  justify-content: space-between;
  height: 0.46rem;
  align-items: center;
  margin-bottom: 0.16rem;
  padding-top: 0.2rem;
}
.shop .new .top1 .price {
  font-size: 0.46rem;
  color: #ff6040;
  font-weight: bold;
}
.shop .new .top1 .price i {
  font-size: 0.2rem;
}
.shop .new .top1 del {
  align-self: flex-end;
  color: #999;
  font-size: 0.2rem;
}
.shop .new .top1 .cang {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ff6040;
  font-size: 0.18rem;
}
.shop .new .top1 .cang .iconfont {
  font-size: 0.2rem;
  color: #ff6040;
}
.shop .new .bottom {
  margin-bottom: 0.16rem;
}

.shop .new .bottom .name{
  font-size: .3rem;
  font-weight: bold;
}

.shop .new .bottom .text {
  display: flex;
  justify-content: space-between;
  padding-left: 0.12rem;
  margin-top: 0.2rem;
  font-size: 0.12rem;
  color: #999;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #f2f2f2;
}
.shop .new .bottom .text > span {
  width: 6rem;
}
.shop .new .bottom .text p {
  font-size: 0.18rem;
  font-weight: bold;
}
.shop .new .bottom .text p a {
  color: #ff6040;
}
.shop .new .bottom .text p .iconfont {
  font-size: 0.14rem;
  color: #ff6040;
}
.discount {
  padding-left: 0.2rem;
  margin-top: 0.2rem;
  background: #fff;
  margin-bottom: .5rem;
}
.discount .up {
  display: flex;
  height: 0.85rem;
  justify-content: space-between;
  line-height: 0.85rem;
}
.discount .up .txt1 {
  color: #3e3e3e;
  font-size: 0.22rem;
  font-weight: bold;
}
.discount .up .pic {
  display: flex;
  margin-top: 0.3rem;
  width: 6.42rem;
  border-bottom: 0.02rem solid #e6e6e6;
}
.discount .up .pic img {
  height: 0.32rem;
  margin: 0 0.2rem 0.16rem 0;
}
.discount .down {
  display: flex;
  height: 0.85rem;
  justify-content: space-between;
  line-height: 0.85rem;
}
.discount .down .txt1 {
  color: #3e3e3e;
  font-size: 0.22rem;
  font-weight: bold;
}
.discount .down .txt2 {
  width: 6.42rem;
  color: #6d6d6d;
  font-size: 0.22rem;
  border-bottom: 0.02rem solid #e6e6e6;
}
@media screen and (max-width: 375px) {
  .shop .new .bottom p:nth-of-type(3) {
    width: 2.5rem;
  }
}
@media screen and (max-width: 414px) {
  .shop .new .bottom .text > span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
@media screen and (max-width: 280px) {
  .shop .new .bottom .text > span {
    width: 5.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
/*尾部部分*/
footer {
  position: fixed;
  width: 7.5rem;
  bottom: 0;
  height: 1.66rem;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
}
footer .left {
  display: flex;
  justify-content: space-between;
  padding: 0 0.42rem;
  width: 3.1rem;
}
footer .left p {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.12rem;
}
footer .left p span {
  color: #747474;
  font-size: 0.18rem;
}
footer .left p i {
  font-size: 0.42rem;
}
footer .right {
  width: 4.4rem;
  display: flex;
  height: 0.98rem;
}
footer .right button {
  width: 50%;
  line-height: 0.98rem;
  height: 0.98rem;
  border: none;
  font-size: 0.3rem;
}
footer .right .car {
  background: #ffcc66;
  color: #663014;
}
footer .right .buy {
  background: #ff6040;
  color: #fff;
}
footer .line {
  position: absolute;
  bottom: 0.16rem;
  width: 2.68rem;
  height: 0.1rem;
  background: #000;
  border-radius: 0.3rem;
}
</style>