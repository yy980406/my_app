<template>
  <div>
    <v-header title="商品列表" :back="true"></v-header>
    <!-- 头部信息 -->
    <div id="header_box">
      <!-- 搜素部分 -->
      <header>
        <i class="iconfont icon-fangdajing"></i>
        <input type="text" class="iconfont" placeholder="   按内容搜索" />
      </header>
      <!-- 导航栏 -->
      <div class="nav_box">
        <nav
          :style="{
            background: `url(${require('../../assets/img/line.jpg')}) no-repeat right top;`,
          }"
        >
          <a href="#" class="cur">综合推荐</a>
          <a href="#">销量</a>
          <a href="#">价格<i class="iconfont icon-shangxiajiantou"></i></a>
          <a href="#">好评度</a>
          <a href="#">店铺</a>
        </nav>
        <p>
          <span class="iconfont icon-shaixuan1"></span>
          筛选
        </p>
      </div>
    </div>

    <!-- 空列表 -->
    <div class="kong" v-if="arr.length==0">
      <div class="center">
        <h3>暂无数据去逛逛</h3>
        <p>随便逛逛</p>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="shopList">
      <div class="shop" v-for="item in arr" :key="item.id" @click="toDetail(item.id)">
        <img :src="$pre + item.img" alt="" />
        <div class="right">
          <h3>{{ item.goodsname }}</h3>
          <p class="price">
            <span class="new">现价格：{{ item.price }}</span>
            <del class="old">原价格：{{ item.market_price }}</del>
          </p>
          <p class="title">双十一限制</p>
          <p class="num">
            <span class="ping">3656<i>评论</i></span>
            <em class="good">3656<b>好评</b></em>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqList } from "../../request";
export default {
  data() {
    return {
      // 初始化数据
      arr: [],
    };
  },
  mounted() {
    // 发送请求
    reqList(this.$route.query.id).then((res) => {
      this.arr = res.data.list.goodData ? res.data.list.goodData : [];
    });
  },
  methods: {
    toDetail(id){
      this.$router.push("/detail?id="+id);
    }
  }
};
</script>

<style scoped>
/*头部信息*/
#header_box {
  height: 1.4rem;
  padding: 0 0.2rem;
  background: linear-gradient(#ff6548, #ff8476);
  /*搜索部分*/
  /*导航栏*/
}
#header_box header {
  height: 0.64rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.16rem;
  color: #fff;
  /*搜索栏*/
}
#header_box header i {
  position: absolute;
  top: 0.94rem;
  left: 0.28rem;
  color: #000;
}
#header_box header input {
  width: 7.1rem;
  height: 0.64rem;
  border-radius: 0.1rem;
  border: 0.02rem solid #e6e6e6;
  padding-left: 0.22rem;
  box-sizing: border-box;
}
#header_box header input::placeholder {
  font-size: 0.26rem;
}
#header_box header input .iconfont {
  font-size: 0.32rem;
}
#header_box .nav_box {
  height: 0.6rem;
  display: flex;
  color: #fff3f2;
  font-size: 0.26rem;
}
#header_box .nav_box nav {
  display: flex;
  width: 6.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  justify-content: space-between;
  padding-right: 0.4rem;
  box-sizing: border-box;
}
#header_box .nav_box nav a {
  color: #fff3f2;
}
#header_box .nav_box nav a.cur {
  font-size: 0.3rem;
  font-weight: bold;
}
#header_box .nav_box nav a .iconfont {
  font-size: 0.16rem;
  display: inline-block;
  vertical-align: middle;
}
#header_box p {
  width: 1.3rem;
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
}
#header_box p span {
  font-size: 0.26rem;
}

/* 商品列表 */
.shopList {
  padding: 0.1rem;
}
.shopList .shop {
  height: 3rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
}
.shopList .shop img {
  width: 2.6rem;
  margin-top: 0.2rem;
  height: 2.6rem;
}

.shopList .shop .right {
  width: 3.6rem;
}

.shopList .shop .right h3 {
  font-size: 0.32rem;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
}

.shopList .shop .right .price {
  margin-bottom: 0.3rem;
  font-size: 0.24rem;
  color: #ff6548;
}

.shopList .shop .right .old {
  color: #999;
  margin-left: 0.3rem;
}

.shopList .shop .right .title {
  width: 1.8rem;
  height: 0.4rem;
  background: #ff6548;
  color: #fff;
  font-size: 0.2rem;
  line-height: 0.4rem;
  text-align: center;
  margin-bottom: 0.4rem;
}

.shopList .shop .right .num {
  color: #999;
}

.shopList .shop .right .ping {
  margin-right: 0.2rem;
}

.kong .center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.kong .center h3{
   color: orange;
   font-size: .3rem;
   text-align: center;
}

.kong .center p{
  width: 3rem;
  height: 0.8rem;
  background: #ff6548;
  border-radius: 25px;
  line-height: 0.8rem;
  text-align: center;
  font-size: .3rem;
  color: #fff;
  margin-top: .4rem;
}
</style>