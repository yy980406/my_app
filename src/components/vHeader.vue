<template>
  <!-- 头部信息 -->
  <div class="header">
    <div class="back iconfont " v-if="back" @click="$router.go(-1)">&#xe6bc;</div>
    <h3>{{title}}</h3>
    <div class="register" v-if="register" @click="$router.push('/register')">注册</div>
  </div>
</template>

<script>
export default {
    props: ["back","title","register"]
};
</script>

<style scoped>
.header{
    width: 100vw;
    height: 0.8rem;
    background: #ff6040;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
}
.header .back{
    color: #fff;
    line-height: 0.8rem;
    position: absolute;
    left: 0.2rem;
    top: 0rem;
    z-index: 10;
    font-size: .36rem;
}
.header h3{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 0.8rem;
    color:#fff;
    z-index: 1;
}
.header .register{
    color: #fff;
    line-height: 0.8rem;
    position: absolute;right: 0.2rem;
    top: 0rem;
    z-index: 10;
}
</style>