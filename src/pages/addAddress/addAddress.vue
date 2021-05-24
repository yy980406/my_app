<template>
  <div>
    <v-header
      :back="true"
      :title="$route.query.id ? '新增地址' : '编辑地址'"
    ></v-header>
    <van-address-edit
      ref="edit"
      :area-list="areaList"
      show-set-default
      :address-info="info"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    >
      <template slot="default">
        标签：
        <van-radio-group v-model="radio">
          <van-radio name="家">家</van-radio>
          <van-radio name="公司">公司</van-radio>
          <van-radio name="学校">学校</van-radio>
        </van-radio-group>
      </template>
    </van-address-edit>
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import { reqAddAddress } from "../../request";
export default {
  data() {
    return {
      areaList,
      uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      radio: this.$route.query.id ? this.$route.query.label : "家",
      //表单数据
      info: {
        ...this.$route.query,
        isDefault: this.$route.query.isDefault == "true" ? true : false,
      },
    };
  },
  methods: {
    // 点击保存
    onSave(e) {
      if (this.$route.query.id) {
         reqAdressEdit({
          id: this.$route.query.id,
          username: e.name,
          userphone: e.tel,
          regioncode: e.areaCode,
          location: e.province + e.city + e.county,
          useraddress: e.addressDetail,
          status: e.isDefault ? 1 : 0,
          label: this.radio,
        }).then((res) => {
          if (res.data.code == 200) {
            //弹信息
            alert(res.data.msg);
            //跳转list
            this.$router.push("/address");
          }
        });
        //编辑
      } else {
        //添加
        // {"name":"haotingting","tel":"15800000000","country":"","province":"山西省","city":"太原市","county":"小店区","areaCode":"140105","postalCode":"","addressDetail":"123hao ","isDefault":true}
        reqAddressAdd({
          uid: JSON.parse(localStorage.getItem("userInfo")).uid,
          username: e.name,
          userphone: e.tel,
          regioncode: e.areaCode,
          location: e.province + e.city + e.county,
          useraddress: e.addressDetail,
          status: e.isDefault ? 1 : 0,
          label: this.radio,
        }).then((res) => {
          if (res.data.code == 200) {
            //弹信息
            alertMsg(res.data.msg);
            //跳转list
            this.$router.push("/addressList");
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.van-radio-group{
  display: flex;
  margin-top: 0.1rem;
  margin-left: 0.2rem;
}
.van-radio{
  flex:1;
  text-align: center;
}
</style>