<template>
  <div>
    <v-header title="商品分类"></v-header>
    <!-- 搜素部分 -->
    <div id="header_box">
      <header>
        <i class="iconfont icon-fangdajing"></i>
        <input type="text" class="iconfont" placeholder="   按内容搜索" />
      </header>
    </div>

     <!-- 主体部分 -->
        <div id="main">
          <!-- 一级分类 -->
            <ul class="left">
               <li v-for="item in oneArr" :key="item.id">
                 {{item.catename}}
               </li>
            </ul>

            <!-- 二级分类 -->
            <div class="right">
                <div class="shop1" v-for="item in oneArr" :key="item.id">
                    <h2>{{item.catename}}</h2>
                    <ul>
                        <li v-for="item1 in item.children" :key="item1.id" @click="toList(item1.id)"> 
                            <img :src="$pre+item1.img" alt=""> 
                            <p>{{item1.catename}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { reqSortInfo } from '../../request';

export default {
  data () {
    return {
      oneArr:[],// 一级分类
    }
  },
  mounted () {
    reqSortInfo().then((res)=>{
      this.oneArr=res.data.list;
    })
  },
  methods: {
    toList(id){
      this.$router.push("/list?id="+id)
    }
  }
};
</script>

<style scoped>
/*头部信息*/
#header_box {
  height:.8rem;
  padding: 0 0.2rem;
  background: linear-gradient(#ff6548, #ff8476);
}
header {
  height: 0.64rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.16rem;
  color: #fff;
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
#header_box header input .iconfont {
  font-size: 0.32rem;
}

/*主体部分*/
#main {
  padding-right: 0.2rem;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
}
#main .left {
  width: 2.36rem;
  padding: 0.6rem 0 0 0;
  background: #fff;
}
#main .left li {
  text-align: center;
  margin-bottom: 0.6rem;
  font-size: 0.26rem;
  color: #999;
}
#main .left li.cur {
  color: #ff6040;
  font-size: 0.3rem;
  font-weight: bold;
}
#main .left li:last-child {
  margin-bottom: 0;
}
#main .right {
  width: 4.64rem;
  margin-bottom: 1.65rem;
}
#main .right .shop1{
  background: #fff;
  margin-top: 0.3rem;
  padding: 0.2rem 0 0 0.2rem;
  box-sizing: border-box;
}
#main .right .shop1 h2 {
  font-size: 0.3rem;
  color: #373737;
  margin-bottom: 0.2rem;
}
#main .right .shop1 ul {
  display: flex;
  flex-wrap: wrap;
}
#main .right .shop1 ul li{
  text-align: center;
  margin: 0 0.2rem 0.2rem 0;
  color: #9b9b9b;
  font-size: 0.22rem;
}
#main .right .shop1 ul li img{
  height: 1.26rem;
  margin-bottom: 0.1rem;
}
</style>