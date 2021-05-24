<template>
  <div>
    <v-header title="小U商城"></v-header>
    <!-- logo部分 -->
    <header>
      <span class="iconfont site">&#xe613;</span>
      <img :src="require('../../assets/img/logo.jpg')" alt="" />

      <input
        type="text"
        v-model.lazy="kValue"
        @keydown.enter="enter()"
        class="iconfont"
        placeholder="   按内容搜索"
      />
      <i class="iconfont icon-fangdajing"></i>
      <span class="iconfont store">&#xe663;</span>
    </header>

    <!-- 导航栏 -->
    <div class="nav_box">
      <div class="left">
        <span
          class="nav"
          v-for="item in navArr"
          :key="item.id"
          :src="$pre + item.img"
          @click="toList(item.id)"
          >{{ item.catename }}</span
        >
      </div>
      <p class="sort"><i class="iconfont icon-caidan"></i><span>分类</span></p>
    </div>

    <!-- 轮播图的渲染 -->
    <div class="bannner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerArr" :key="item.id">
          <img :src="$pre + item.img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 导航栏 -->
    <div class="subNav">
      <p>
        <img :src="require('../../assets/img/icon_1.jpg')" alt="" />
        <span>限时秒杀</span>
      </p>

      <p>
        <img :src="require('../../assets/img/icon_2.jpg')" alt="" />
        <span>畅销商品</span>
      </p>

      <p>
        <img :src="require('../../assets/img/icon_3.jpg')" alt="" />
        <span>品质大牌</span>
      </p>

      <p>
        <img :src="require('../../assets/img/icon_4.jpg')" alt="" />
        <span>小U自营</span>
      </p>

      <p>
        <img :src="require('../../assets/img/icon_5.jpg')" alt="" />
        <span>积分商城</span>
      </p>
    </div>

    <!-- 限时秒杀 -->
    <div class="limit">
      <div
        class="left"
        :style="{
          background: `url(${require('../../assets/img/shop_bg1.png')}) 0 0 no-repeat`,
        }"
      >
        <div class="up">
          <h2>限时秒杀</h2>

          <p>
            <a>查看更多</a>
            <i class="iconfont">&#xe601;</i>
          </p>
        </div>

        <p class="txt">每天0点场，好货秒不停</p>

        <p class="dot">
          <van-count-down :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </p>
      </div>

      <div class="right">
        <div
          class="top1"
          :style="{
            background: `url(${require('../../assets/img/shop_bg2.png')}) 0 0 no-repeat`,
          }"
        >
          <h2>品牌上新</h2>

          <p>9点整，抢大牌</p>
          <img :src="require('../../assets/img/mark_1.jpg')" alt="" />
        </div>

        <div
          class="bottom"
          :style="{
            background: `url(${require('../../assets/img/shop_bg3.png')}) no-repeat`,
          }"
        >
          <h2>日用好物</h2>

          <p>愿君多采撷</p>
          <img :src="require('../../assets/img/mark_2.jpg')" alt="" />
        </div>
      </div>
    </div>

    <!-- 双十一尖货预购 -->
    <div id="shop">
      <div class="title">
        <h2 class="cur">双十一尖货预购</h2>
        <h2>畅销全球</h2>
      </div>

      <ul>
        <li>
          <img :src="require('../../assets/img/shop.jpg')" alt="" />
          <p>爆款新品</p>
        </li>

        <li>
          <img :src="require('../../assets/img/shop.jpg')" alt="" />
          <p>爆款新品</p>
        </li>

        <li>
          <img :src="require('../../assets/img/shop.jpg')" alt="" />
          <p>爆款新品</p>
        </li>

        <li>
          <img :src="require('../../assets/img/shop.jpg')" alt="" />
          <p>爆款新品</p>
        </li>
      </ul>
    </div>

    <!-- 商品信息导航 -->
    <div class="shopNav">
      <p
        @click="changeN(index)"
        v-for="(item, index) in navs"
        :key="item"
        :class="index == n ? 'select' : ''"
      >
        {{ item }}
      </p>
    </div>

    <!-- 商品列表 -->
    <div class="shopList" v-if="shopArr.length > 0">
      <div class="shop" v-for="item in shopArr[n].content" :key="item.id">
        <img :src="$pre + item.img" alt="" />
        <div class="right">
          <h3>{{ item.goodsname }}</h3>
          <p class="price" v-if="item.price">
            现价格：￥{{ item.price | filterPrice }}
          </p>
          <del class="old" v-if="item.market_price"
            >原价格：￥{{ item.market_price | filterPrice }}</del
          >
          <p class="btn" @click="toDetail(item.id)">立即抢购</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqHomeNav, reqSkill } from "../../request/index";
import { reqBanner } from "../../request/index";
import { reqShopInfo } from "../../request/index";
export default {
  data() {
    return {
      // 初始化数据
      navArr: [], //快速导航
      bannerArr: [], // banner数组
      shopArr: [],
      kValue: "",
      navs: ["热门推荐", "上新推荐", "所有商品"],
      n: 0,
      time: 0,
    };
  },
  mounted() {
    // 获取快速导航
    reqHomeNav().then((res) => {
      this.navArr = res.data.list;
    });
    // 获取轮播图
    reqBanner().then((res) => {
      this.bannerArr = res.data.list;
    });
    // 获取商品详情
    reqShopInfo().then((res) => {
      this.shopArr = res.data.list;
    });
    // 获取秒杀
    reqSkill().then((res) => {
      this.time = res.data.list[0].endtime;
      console.log(this.time);
    });
  },
  methods: {
    // 导航栏跳转
    toList(id) {
      this.$router.push("/list?id=" + id);
    },
    // 搜索框跳转
    enter() {
      if (this.kValue == "") {
        return;
      }
      this.$router.push("/search?keywords=" + this.kValue);
      this.empty();
    },
    // 清空
    empty() {
      // 清空输入框的值
      this.kValue = "";
    },
    // 跳转详情
    toDetail(id) {
      this.$router.push("/detail?id=" + id);
    },
    changeN(index) {
      this.n = index;
    },
  },
};
</script>

<style scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #85a642;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  color: #85a642;
  background: #fff;
}

header {
  height: 0.8rem;
  display: flex;
  align-items: center;
  color: #fff;
  background: #ff6040;
  position: fixed;
  top: 0.8rem;
  width: 100%;
  z-index: 2;
}
header .site {
  margin-left: 0.26rem;
  font-size: 0.44rem;
}
header .store {
  font-size: 0.4rem;
}
header .icon-fangdajing {
  color: #888;
  position: absolute;
  left: 3.1rem;
  top: 0.24rem;
}

header img {
  height: 0.5rem;
  margin: 0 0.38rem 0 0.25rem;
}
header input {
  width: 3.4rem;
  height: 0.64rem;
  border: 0.02rem solid #e6e6e6;
  border-radius: 0.1rem;
  padding-left: 0.42rem;
  box-sizing: border-box;
  margin-right: 0.36rem;
  color: #333;
}
header input::placeholder {
  color: #999;
  font-size: 0.26rem;
}

.nav_box {
  height: 0.8rem;
  background: #ff6040;
  line-height: 0.8rem;
  color: #fff;
  position: fixed;
  top: 1.58rem;
  width: 100%;
  z-index: 2;
}

.nav_box .left {
  width: 6.4rem;
  overflow: hidden;
  height: 0.8rem;
}

.nav {
  margin: 0px 0.2rem;
}

.nav_box .sort {
  position: absolute;
  right: 0;
  top: 0;
  width: 1rem;
  height: 0.8rem;
}
.nav_box i {
  display: inline-block;
  vertical-align: middle;
}
.nav_box .sort span {
  margin: 0.03rem;
}

.bannner {
  margin-top: 1.8rem;
}

.bannner img {
  width: 90%;
  display: block;
  margin: 0.1rem auto;
  height: 4rem;
}

/*导航部分*/
.subNav {
  height: 1.6rem;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.2rem 0;
}
.subNav p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.subNav p img {
  height: 0.6rem;
  margin-bottom: 0.1rem;
}
.subNav p span {
  font-size: 0.16rem;
  color: #707070;
}
/*限时秒杀*/
.limit {
  height: 3.5rem;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
}
.limit .left {
  width: 3.5rem;
  height: 3.5rem;
  background-size: contain;
  padding: 0.22rem 0.29rem 0 0.2rem;
  box-sizing: border-box;
}
.limit .left .up {
  display: flex;
  justify-content: space-between;
  height: 0.3rem;
  line-height: 0.3rem;
  margin-bottom: 0.14rem;
}
.limit .left .up h2 {
  font-size: 0.3rem;
  color: #85a642;
}
.limit .left .up p {
  height: 0.3rem;
  line-height: 0.3rem;
}
.limit .left .up p a {
  font-size: 0.18rem;
  color: #444443;
}
.limit .left .up p i {
  font-size: 0.18rem;
  color: #444443;
}
.limit .left .txt {
  font-size: 0.16rem;
  color: #85a642;
}
.limit .left .dot {
  display: flex;
  margin-top: 0.08rem;
}
.limit .left .dot .num {
  text-align: center;
  color: #fff;
  width: 0.32rem;
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.12rem;
  background: linear-gradient(#89aa47, #aeca77);
}
.limit .left .dot .one {
  width: 0.1rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #85a642;
  font-size: 0.12rem;
}
.limit .right {
  width: 3.5rem;
}
.limit .right .top1 {
  height: 1.7rem;
  background-size: contain;
  padding: 0.16rem 0 0 0.2rem;
}
.limit .right .top1 h2 {
  font-size: 0.3rem;
  color: #ff6040;
  margin-bottom: 0.14rem;
}
.limit .right .top1 p {
  font-size: 0.16rem;
  color: #ff9984;
}
.limit .right .top1 img {
  height: 0.4rem;
  margin-top: 0.06rem;
}
.limit .right .bottom {
  margin-top: 0.1rem;
  height: 1.7rem;
  background-size: contain;
  padding: 0.16rem 0 0 0.2rem;
}
.limit .right .bottom h2 {
  font-size: 0.3rem;
  color: #af40ff;
  margin-bottom: 0.14rem;
}
.limit .right .bottom p {
  font-size: 0.16rem;
  color: #cb82ff;
}
.limit .right .bottom img {
  height: 0.4rem;
  margin-top: 0.06rem;
}
/*双十一尖货预购*/
#shop {
  background: #fff;
  padding: 0.22rem 0.2rem 0.1rem;
}
#shop .title {
  display: flex;
  height: 0.84rem;
  line-height: 0.84rem;
  align-items: center;
}
#shop .title h2 {
  font-size: 0.3rem;
  flex: 1;
  color: #a9a9a9;
  text-align: center;
}
#shop .title h2.cur {
  color: #ff6444;
}
#shop ul {
  display: flex;
  justify-content: space-around;
  text-align: center;
  color: #999;
}
#shop ul img {
  margin-bottom: 0.1rem;
  height: 1.6rem;
}
.shopNav {
  display: flex;
  align-items: center;
  height: 1rem;
  margin-top: 0.3rem;
}

.shopNav p {
  flex: 1;
  text-align: center;
  color: #ff6040;
  font-size: 0.2rem;
}

.shopNav p.select {
  background: #ff6444;
  color: #fff;
  padding: 0.3rem 0;
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
  border: 2px solid #ccc;
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
  font-size: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
}

.shopList .shop .right .price {
  margin-bottom: 0.16rem;
  font-size: 0.2rem;
  color: red;
}

.shopList .shop .right .old {
  color: #ccc;
}

.shopList .shop .right .btn {
  margin-top: 0.3rem;
  width: 3rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.26rem;
  background: orange;
  border-radius: 0.1rem;
  color: #fff;
}
</style>