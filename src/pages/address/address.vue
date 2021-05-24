<template>
  <div>
    <v-header title="地址管理" :back="true"></v-header>
    <div v-if="list.length==0">暂无数据</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    />
  </div>
</template>

<script>
import { reqSelectAddress } from "../../request";
export default {
  methods: {
    onAdd() {
      this.$router.push("/addAddress");
    },
    onEdit(e) {
      let str = "";
      for (let key in e) {
        str += key + "=" + e[key] + "&";
      }
      //str="id=1&username=123&userphone=23&"
      str = str.slice(0, str.length - 1);
      this.$router.push("/addAddress?" + str);
    },
    //切换
    select(e){
      this.$router.push("/order?addressid="+e.id)
     
    }
  },
  data() {
    return {
      list: [],
      uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      chosenAddressId: "2"
    };
  },
  mounted() {
    reqSelectAddress(this.uid).then((res) => {
      //如果前后端不一样，用map返回一个对象就ok
      let list = res.data.list ? res.data.list : [];
      this.list = list.map((item) => {
        return {
          id: item.id,
          name: item.username,
          tel: item.userphone,
          address: item.useraddress,
          isDefault: item.status == 1 ? true : false,
          areaCode: item.regioncode,
          label: item.label,
          addressDetail: item.useraddress,
        };
      });
    });
  },
};
</script>

<style scoped>
</style>