<template>
  <div class="box">
    <v-header :back="true" title="确认订单"></v-header>
    <!-- 头部 -->
    <div id="header_box">
      <div class="infor" v-if="$route.query.addressid">
        <p>
          <span class="name">{{ address.username }}</span>
          <span class="phone">{{ address.userphone }}</span>
        </p>
        <p>
          <span class="label">{{ address.label }}</span>
          <span class="location">{{ address.location }}</span>
        </p>
      </div>
      <div class="infor" v-else>
        <p class="wu" @click="add">+请添加完善的地址</p>
      </div>
    </div>

    <!-- 品牌精选 -->
    <div id="select">
      <div class="top1">
        <img :src="require('../../assets/img/confirm.jpg')" alt="" />
        <span>品牌精选</span>
        <div>
          <b>已免运费</b>
          <em>|</em>
          <i>领券</i>
        </div>
      </div>

      <div v-for="item in shopList" :key="item.id">
        <ul>
          <li>
            <img :src="$pre + item.img" alt="" />

            <div class="right">
              <p>溪牧原山茶花洁面泡沫 氨基酸洗面奶150ML 浸透舒缓</p>

              <p>
                <span> <i>￥</i>{{ item.price }} </span>

                <span> <b>X</b>{{ item.num }} </span>
              </p>

              <p>
                <span>7天无理由退货</span>

                <span>特价</span>
              </p>
            </div>
          </li>
        </ul>

        <div class="up">
          <p>
            <span>发票类型</span>
            <span>
              不开发票
              <i
                class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"
              ></i>
            </span>
          </p>

          <p>
            <span>售后免邮</span>
            <span>部分商家赠送</span>
          </p>

          <p>
            <span>买家留言</span>
            <span>填写内容需要与商家协商并确定，45字以内</span>
          </p>
        </div>

        <div class="color"></div>

        <div class="bottom">
          <p>
            <span>商品金额</span>
            <span>￥{{item.price*item.num}}</span>
          </p>

          <p>
            <span>优惠活动</span>
            <span>-￥200</span>
          </p>

          <p>
            <span>优惠劵</span>
            <span>暂不可用</span>
          </p>

        </div>
        <div class="color"></div>
      </div>
    </div>

    
    <!-- 底部 -->
    <footer>
      <div class="left">
        <p>
          <span>合计</span>
          <span>已免运费</span>
        </p>

        <p>
          <span>￥{{sum}}</span>
          <span>已优惠￥200元</span>
        </p>
      </div>

      <div class="right">
        <button @click="confirm">确认订单</button>
      </div>

      <span class="line"></span>
    </footer>
  </div>
</template>

<script>
import { reqOrder, reqSelectAddress, reqShopList } from "../../request";
export default {
  data() {
    return {
      authorization: JSON.parse(localStorage.getItem("userInfo")).token,
      uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      // 地址
      address: {},
      // 购物车
      shopList: [],
      // 订单编号
      order: {},
      sum:JSON.parse(localStorage.getItem("orderInfo")).countmoney
    };
  },
  methods: {
    add() {
      this.$router.push("/address");
    },
    confirm() {
      if (!this.address.id) {
        alert("请选择地址");
        return;
      }

      let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
      console.log(JSON.stringify(orderInfo)); //{countmoney: 16296, countnumber: 4, idstr: "7,8"}
      let countmoney = orderInfo.countmoney;
      let countnumber = orderInfo.countnumber;
      let idstr = orderInfo.idstr;
      reqOrder(this.uid, countmoney, countnumber, this.address.id, idstr).then(
        (res) => {
          this.order = res.data.list;
          this.$router.push(
            "/money?outTradeNo=" +
              this.order.outTradeNo +
              "&countmoney=" +
              countmoney
          );
        }
      );
    },
  },
  mounted() {
    // 查询地址
    if (this.$route.query.addressid) {
      reqSelectAddress(this.uid, this.$route.query.addressid).then((res) => {
        this.address = res.data.list[0];
      });
    }

    // 查看购物车
    let idstr = JSON.parse(localStorage.getItem("orderInfo")).idstr;
    let idArr = idstr.split(",");
    idArr.forEach((id) => {
      reqShopList(this.uid, this.authorization, id).then((res) => {
        this.shopList.push(res.data.list[0]);
        console.log(JSON.stringify(this.shopList));
      });
    });
  },
};
</script>

<style scoped>
.box {
  background: #f2f2f2;
}
/*顶部信息*/
#header_box {
  position: relative;
  height: 1.9rem;
  background: linear-gradient(#ff6141, #ff8679);
}
#header_box .infor {
  position: absolute;
  width: 7.1rem;
  height: 2.08rem;
  background: #fff;
  border-radius: 0.1rem;
  left: 0.18rem;
  top: 0.2rem;
  padding: 0.35rem 0.6rem 0 0.4rem;
  box-sizing: border-box;
}

#header_box .infor p {
  margin-bottom: 0.2rem;
}

#header_box .infor .name,
#header_box .infor .phone {
  font-size: 0.32rem;
}

#header_box .infor .label {
  padding: 0.05rem 0.1rem;
  background: #ff6141;
  color: #fff;
  border-radius: 0.1rem;
  margin-right: 0.3rem;
}

#header_box .infor .label,
#header_box .infor .location {
  font-size: 0.28rem;
}

#header_box .infor .name {
  margin-right: 0.3rem;
}

#header_box .infor .wu {
  font-size: 0.34rem;
  padding: 0.1rem;
  border: 1px solid #ff6040;
  margin-bottom: 0.18rem;
  text-align: center;
  color: #ff8066;
}

/*品牌精选*/
#select {
  margin-top: 0.7rem;
  background-color: #fff;
  /*结算*/
}
#select .top1 {
  padding: 0 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0.4rem 0 0.15rem 0;
}
#select .top1 img {
  float: left;
  margin: 0.05rem 0.2rem 0 0;
  height: 0.32rem;
}
#select .top1 span {
  font-size: 0.3rem;
  font-weight: bold;
}
#select .top1 div {
  float: right;
}
#select .top1 div b {
  font-size: 0.22rem;
  color: #333;
}
#select .top1 div em {
  margin: 0 0.16rem;
  font-size: 0.2rem;
  color: #979797;
}
#select .top1 div i {
  font-size: 0.2rem;
  color: #ff6040;
}
#select ul {
  padding: 0 0.2rem;
}
#select ul li {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}
#select ul li img {
  height: 2.18rem;
}
#select ul li div {
  width: 4.6rem;
}
#select ul li div p:nth-child(1) {
  margin-bottom: 0.4rem;
  font-size: 0.3rem;
  line-height: 0.42rem;
}
#select ul li div p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}
#select ul li div p:nth-child(2) span:nth-child(1) {
  color: #ff6040;
  font-size: 0.3rem;
}
#select ul li div p:nth-child(2) span:nth-child(1) i {
  font-size: 0.16rem;
}
#select ul li div p:nth-child(2) span:nth-child(2) {
  color: #333;
  font-size: 0.24rem;
  font-weight: bold;
}
#select ul li div p:nth-child(2) span:nth-child(2) b {
  font-weight: bold;
  font-size: 0.16rem;
  display: inline-block;
}
#select ul li div p:nth-child(3) {
  margin-top: 0.22rem;
  display: flex;
  font-size: 0.18rem;
  color: #ffedea;
}
#select ul li div p:nth-child(3) span:nth-child(1) {
  margin-right: 0.1rem;
  width: 1.44rem;
  height: 0.32rem;
  line-height: 0.32rem;
  background-color: #ff8066;
  text-align: center;
}
#select ul li div p:nth-child(3) span:nth-child(2) {
  width: 0.52rem;
  height: 0.32rem;
  line-height: 0.32rem;
  background-color: #ff8066;
  text-align: center;
}
#select .up {
  margin-top: 0.6rem;
  padding: 0 0.2rem;
}
#select .up p {
  margin-bottom: 0.35rem;
  display: flex;
  justify-content: space-between;
}
#select .up p span:nth-child(1) {
  font-size: 0.24rem;
  font-weight: bold;
}
#select .up p:nth-child(1) span:nth-child(2) {
  font-size: 0.24rem;
}
#select .up p:nth-child(1) span:nth-child(2) i {
  font-size: 0.24rem;
  color: #666666;
}
#select .up p:nth-child(2) span:nth-child(2) {
  font-size: 0.24rem;
  color: #737373;
}
#select .up p:nth-child(3) span:nth-child(2) {
  font-size: 0.24rem;
  color: #737373;
}
#select .color {
  height: 0.2rem;
  background: #f2f2f2;
}
#select .bottom {
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.6rem;
}
#select .bottom p {
  margin-bottom: 0.35rem;
  display: flex;
  justify-content: space-between;
}
#select .bottom p span:nth-child(1) {
  font-size: 0.24rem;
  font-weight: bold;
}
#select .bottom p:nth-child(1) span:nth-child(2) {
  font-size: 0.18rem;
  color: #666;
}
#select .bottom p:nth-child(2) span:nth-child(2) {
  font-size: 0.18rem;
  color: #ff6040;
}
#select .bottom p:nth-child(3) span:nth-child(2) {
  font-size: 0.22rem;
  color: #686868;
}
@media screen and (min-width: 375px) and (max-width: 414px) {
  #select ul li .right p:nth-child(3) span:nth-child(1) {
    width: 1.8rem;
  }
}
@media screen and (max-width: 320px) {
  #select ul li .right p:nth-child(3) span:nth-child(1) {
    width: 2rem;
  }
  #select ul li .right p:nth-child(3) span:nth-child(2) {
    width: 0.8rem;
  }
}

/*底部*/
footer {
  position: fixed;
  width: 7.5rem;
  bottom: 0;
  background: #fff;
  height: 1.65rem;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
}
footer .left {
  display: flex;
  width: 5.4rem;
  height: 1rem;
  align-items: center;
  margin-left: 0.2rem;
}
footer .left p:nth-child(1) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
footer .left p:nth-child(1) span:nth-child(1) {
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
}
footer .left p:nth-child(1) span:nth-child(2) {
  font-size: 0.18rem;
  color: #999;
}
footer .left p:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 0.36rem;
}
footer .left p:nth-child(2) span:nth-child(1) {
  font-size: 0.3rem;
  color: #ff6040;
  font-weight: bold;
}
footer .left p:nth-child(2) span:nth-child(2) {
  font-size: 0.18rem;
  color: #999;
}
footer .right button {
  margin-left: 0.35rem;
  width: 2.16rem;
  height: 1rem;
  border: none;
  background: #ff6040;
  color: #fff;
  font-size: 0.3rem;
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