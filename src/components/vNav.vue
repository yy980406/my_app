<template>
  <div class="footer">
      <!-- 遍历index.vue（父组件）中传过来数据 -->
      <router-link v-for="item in arr" :key="item.path" :to="item.path">
         <!-- 判断是否是激活的状态，如果当前遍历的这个路径等于你要搜索的路径的话，就图片显示激活样式，否则是不激活样式 -->
          <img :src="item.path==$route.path?item.select_img:item.no_img" alt="">
          <div>{{item.text}}</div>
      </router-link>
  </div>
</template>

<script>
export default {
    props: ["arr"]
}
</script>

<style scoped>
.footer{
  padding-top: 0.1rem;
  box-sizing: border-box;
  width: 100vw;
  height: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 0.01rem solid #ccc;
  display: flex;
  background: #fff;
}
.footer a{
  flex: 1;
  text-align: center;
  line-height: 0.4rem;
}
.footer img{
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
}
</style>