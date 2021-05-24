<template>
  <div>
    <v-header  title="注册"></v-header>
    <!-- 注册部分 -->
    <div class="login">
      <img :src="require('../../assets/img/login1.jpg')" alt="" />
      <p>
        <label for="iphone">手机号:</label>
        <input
          type="text"
          placeholder="请输入手机号"
          id="iphone"
          v-model="user.phone"
        />
      </p>
      <p>
        <label for="name">昵称:</label>
        <input
          type="text"
          placeholder="请输入昵称"
          id="name"
          v-model="user.nickname"
        />
      </p>
      <p>
        <label for="pass">密码:</label>
        <input
          type="password"
          placeholder="请输入密码"
          id="pass"
          v-model="user.password"
        />
      </p>
      <p class="btns">
        <button class="btn" @click="register">注册</button>
      </p>
    </div>
  </div>
</template>

<script>
import { reqRegister } from "../../request/index";
export default {
  data() {
    return {
      // 1.初始化数据
      user: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    // 点击注册
    register() {
      // 判断输入框是否为空，为空提示用户输入
      if (
        this.user.phone == "" ||
        this.user.nickname == "" ||
        this.user.password == ""
      ) {
        alert("请填写全输入框！");
        return;
      }

      // 正则判断手机号是否是正确的，如果正确发送请求，如果错误，提示用户错误的信息
      if (!(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/).test(this.user.phone)) {
        alert("手机号码有误，请重填");
        return;
      }
      // 发送请求
      reqRegister(this.user).then((res) => {
        // 注册成功
        if (res.data.code == 200) {
          this.$router.replace("/login");
        }
      });
    },
  },
};
</script>

<style scoped>
.login img {
  text-align: center;
  margin: 4.2rem auto 0;
  width: 60%;
  height: 1rem;
  margin-bottom: 1rem;
}

.login p {
  margin: 0.2rem;
  text-align: center;
}

.login p input {
  width: 50%;
  height: 0.5rem;
  border: 1px solid #ccc;
  padding-left: 0.2rem;
}

.login p label {
  font-size: 0.3rem;
  width: 30%;
  margin-right: 0.3rem;
}

.login p #iphone {
  margin-right: 0.16rem;
}

.login .btn {
  width: 2rem;
  height: 0.8rem;
  background: #ccc;
  border: none;
}

.login .btns {
  margin-top: 0.5rem;
}
</style>