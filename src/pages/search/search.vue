<template>
  <div>
    <v-header title="商品搜索" :back="true"></v-header>
    <!-- 搜素部分 -->
    <div class="search_box">
      <header>
        <i class="iconfont icon-fangdajing"></i>
        <input type="text" class="iconfont" placeholder="   按内容搜索" />
      </header>
    </div>

    <!-- 空列表 -->
    <div class="kong" v-if="arr.length == 0">
      <div class="center">
        <h3>暂无数据去逛逛</h3>
        <p>随便逛逛</p>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="shopList">
      <div class="shop" v-for="item in arr" :key="item.id">
        <img :src="$pre + item.img" alt="" />
        <div class="right">
          <h3>{{ item.goodsname }}</h3>
          <p class="price">
            <span class="new">￥{{ item.price }}</span>
          </p>
          <p class="num">
            <span class="ping">3656<i>评论</i></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqSearch } from "../../request";
export default {
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    reqSearch(this.$route.query.keywords).then((res) => {
      this.arr = res.data.list ? res.data.list : [];
    });
  },
};
</script>

<style scoped>
.search_box {
  background: #ff6040;
  padding-bottom: 0.1rem;
}
header {
  height: 0.64rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.16rem;
  color: #fff;
  margin-left: 0.2rem;

  /*搜索栏*/
}
header i {
  position: absolute;
  top: 0.94rem;
  left: 0.28rem;
  color: #000;
}
header input {
  width: 7.1rem;
  height: 0.64rem;
  border-radius: 0.1rem;
  border: 0.02rem solid #e6e6e6;
  padding-left: 0.22rem;
  box-sizing: border-box;
}
header input::placeholder {
  font-size: 0.26rem;
}
header input .iconfont {
  font-size: 0.32rem;
}

/* 商品列表 */
.shopList {
  padding: 0.1rem;
}
.shopList .shop {
  height: 2.2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
}
.shopList .shop img {
  width: 2.6rem;
  margin-top: 0.2rem;
  height: 1.6rem;
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
  font-size: 0.3rem;
  color: #ff6548;
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