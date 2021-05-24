<template>
  <div>
    <v-header title="购物车"></v-header>
    <!-- 导航栏 -->
    <nav>
      <a href="#" class="cur"
        >全部(20)
        <i class="line"></i>
      </a>
      <a href="#">购物车(4)</a>
      <a href="#">常卖(2)</a>
      <a href="#"
        >分类
        <i class="iconfont icon-shangxiajiantou"></i>
      </a>
    </nav>
    <!-- 主体部分 -->
    <div id="main">
      <!-- 品牌 -->
      <div class="top1">
        <p>
          <img :src="require('../../assets/img/shopping01.jpg')" alt="" />
          <em>小U自营</em>
        </p>

        <p>
          <span>已免运费</span>
          <i>|</i>
          <b>领劵</b>
        </p>
      </div>

      <!-- 空列表 -->
      <div class="kong" v-if="goods.length == 0">
        <div class="center">
          <h3>暂无数据去逛逛</h3>
          <p>随便逛逛</p>
        </div>
      </div>

      <ul class="shop1">
        <li v-for="(item, index) in goods" :key="item.id">
          <div class="left">
            <img
              :src="require('../../assets/' + item.checked)"
              alt=""
              class="img1"
              @click="changeOne(index)"
            />
            <img :src="$pre + item.img" alt="" class="img2" />
          </div>

          <div class="infor">
            <p class="name">{{ item.goodsname }}</p>
            <div class="price">
              <p>
                <span> <em>￥</em>{{ item.price | filterPrice }} </span>
              </p>

              <p>
                <b class="jian" @click="sub(index)">-</b>
                <span>{{ item.num }}</span>
                <b class="jia" @click="add(index)">+</b>
              </p>

              <button class="del" @click="del(index)">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--结算部分 -->
    <div id="money">
      <div class="left">
        <p>
          <img
            :src="require('../../assets/' + allChecked)"
            alt=""
            @click="changeAll"
          />
          <span>全选</span>
        </p>

        <p>
          <span>合计</span>
          <span>已免运费</span>
        </p>

        <p>
          <span>{{ allPrice | filterPrice }}</span>
          <span>已优惠0元</span>
        </p>
      </div>
      <div class="right">
        <button @click="sum">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqDelShop, reqShopList, reqUpdateShop } from "../../request";
export default {
  data() {
    return {
      goods: [], //商品列表
      allChecked: "images/shopping01.jpg",
      authorization: JSON.parse(localStorage.getItem("userInfo")).token,
      uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      allChecked: "img/shopping01.jpg",
    };
  },
  mounted() {
    reqShopList(this.uid, this.authorization).then((res) => {
      let goods = res.data.list ? res.data.list : [];
      goods.forEach((item) => {
        item.checked = "img/shopping01.jpg";
      });
      this.goods = goods;
    });
    console.log(this.goods);
  },
  methods: {
    // 数量增加
    add(index) {
      this.goods[index].num++;
      reqUpdateShop(
        this.goods[index].id,
        2,
        this.authorization
      ).then((res) => {});
    },

    //数量减少
    sub(index) {
      this.goods[index].num--;
      if (this.goods[index].num < 1) {
        this.goods[index].num = 1;
        return;
      }
      reqUpdateShop(
        this.goods[index].id,
        1,
        this.authorization
      ).then((res) => {});
    },

    // 全选
    changeAll() {
      this.allChecked == "img/shopping01.jpg"
        ? (this.allChecked = "img/shopping02.jpg")
        : (this.allChecked = "img/shopping01.jpg");
      this.goods.forEach((item) => {
        item.checked = this.allChecked;
      });
    },

    // 点击其中一个
    changeOne(index) {
      this.goods[index].checked == "img/shopping01.jpg"
        ? (this.goods[index].checked = "img/shopping02.jpg")
        : (this.goods[index].checked = "img/shopping01.jpg");
      let a = this.goods.filter((item) => {
        // console.log(item.img3);
        return item.checked == "img/shopping02.jpg";
      }).length;

      if (this.goods.length == a) {
        this.allChecked = "img/shopping02.jpg";
      } else {
        this.allChecked = "img/shopping01.jpg";
      }
    },
    // 删除
    del(index) {
      reqDelShop(this.goods[index].id, this.authorization).then((res) => {});
      this.goods.splice(index, 1);
    },
    // 结算
    sum() {
      // 本地存储
      if(!this.goods.some(item=>item.checked=="img/shopping02.jpg")){
        alert("请选择购物车")
        return;
      }
      let a = this.goods.filter((item) => {
        return item.checked == "img/shopping02.jpg";
      });
      console.log(a);
      let orderInfo = {
        countmoney: this.allPrice,
        countnumber: a.reduce((val, item) => (val += item.num), 0),
        idstr: a.reduce((val, item) => (val += "," + item.id), "").slice(1),
      };
      console.log(orderInfo);
      localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      this.$router.push("/order");
    },
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.goods.forEach((item) => {
        if (item.checked == "img/shopping02.jpg") {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
};
</script>

<style scoped>
/*导航栏*/
nav {
  height: 0.6rem;
  background: linear-gradient(#ff6243, #ff8070);
  display: flex;
  justify-content: space-around;
  line-height: 0.6rem;
  font-size: 0.26rem;
}
nav a {
  color: #fff2f1;
  position: relative;
}
nav a.cur {
  font-size: 0.3rem;
}
nav a.cur i {
  width: 0.4rem;
  height: 0.04rem;
  background-color: #fff;
  position: absolute;
  left: 0.38rem;
  bottom: 0;
}
nav a.cur .iconfont {
  font-size: 0.16rem;
}

/*主体部分*/
#main .top1 {
  padding: 0 0.2rem 0 0.2rem;
  height: 0.74rem;
  line-height: 0.74rem;
  margin-bottom: 0.2rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
#main .top1 p:nth-child(1) {
  display: flex;
}
#main .top1 p:nth-child(1) img {
  height: 0.3rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
}
#main .top1 p:nth-child(1) em {
  font-weight: bold;
  font-size: 0.3rem;
  color: #333;
}
#main .top1 p:nth-child(2) span {
  font-size: 0.22rem;
  color: #353535;
}
#main .top1 p:nth-child(2) i {
  margin: 0 0.15rem;
  color: #979797;
  font-size: 0.2rem;
}
#main .top1 p:nth-child(2) b {
  font-size: 0.2rem;
  color: #ff6040;
}
#main .shop1 {
  background: #fff;
  padding: 0.2rem 0.2rem 0 0;
}
#main .shop1 li {
  display: flex;
  justify-content: space-between;
  padding-left: 0.2rem;
  position: relative;
}
#main .shop1 li .left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 42%;
}
#main .shop1 li .left .img1 {
  height: 0.3rem;
}
#main .shop1 li .left .img2 {
  height: 2.16rem;
  margin-left: 0.2rem;
  width: 2rem;
}
#main .shop1 li .infor {
  width: 56%;
}
#main .shop1 li .infor .name {
  font-size: 0.28rem;
  color: #333;
  margin: 0.5rem 0 0.1rem;
}
#main .shop1 li .infor .price {
  display: flex;
  justify-content: space-between;
}
#main .shop1 li .infor .price p:nth-child(1) {
  margin-bottom: 0.14rem;
}
#main .shop1 li .infor .price p:nth-child(1) span {
  font-size: 0.3rem;
  color: #ff6040;
}
#main .shop1 li .infor .price p:nth-child(1) span em {
  font-size: 0.16rem;
}

#main .shop1 li .infor .price p:nth-child(2) {
  display: flex;
  color: #333;
  align-items: center;
}
#main .shop1 li .infor .price p:nth-child(2) span {
  line-height: 0.38rem;
  text-align: center;
  width: 0.78rem;
  height: 0.38rem;
  background: #f2f2f2;
  font-size: 0.18rem;
  color: #333;
}

#main .infor .jian {
  font-size: 0.35rem;
  display: block;
  width: 0.4rem;
}

#main .infor .jia {
  font-size: 0.35rem;
  display: block;
  width: 0.4rem;
}
#main .infor .del {
  position: absolute;
  left: 3.4rem;
  top: 1.6rem;
}

/*结算部分*/
#money {
  height: 0.96rem;
  position: fixed;
  bottom: 1rem;
  width: 7.5rem;
  background-color: #fff;
  padding-left: 0.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#money .left {
  display: flex;
  width: 5.32rem;
  align-items: center;
  justify-content: space-between;
}
#money .left p:nth-child(1) {
  display: flex;
  align-items: center;
}
#money .left p:nth-child(1) img {
  margin-left: 0.1rem;
  height: 0.3rem;
}
#money .left p:nth-child(1) span {
  margin-left: 0.1rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: #333;
}
#money .left p:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#money .left p:nth-child(2) span:nth-child(1) {
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
}
#money .left p:nth-child(2) span:nth-child(2) {
  font-size: 0.16rem;
  color: #999;
}
#money .left p:nth-child(3) {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 0.3rem;
}
#money .left p:nth-child(3) span:nth-child(1) {
  font-size: 0.3rem;
  color: #ff6040;
  font-weight: bold;
}
#money .left p:nth-child(3) span:nth-child(2) {
  font-size: 0.16rem;
  color: #999;
}
#money .right button {
  margin-left: 0.35rem;
  width: 2.16rem;
  height: 0.96rem;
  border: none;
  background: #ff6040;
  color: #fff;
  font-size: 0.3rem;
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