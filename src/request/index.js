import Vue from "vue"
import axios from "axios"
import qs from "qs"
import router from "../router/index"

// 开发环境 8080
if (process.env.NODE_ENV == "development") {
    Vue.prototype.$pre = "http://localhost:3000"
}

//生产环境：打包后的代码 3000
if (process.env.NODE_ENV === "production") {
    Vue.prototype.$pre = ""
}

//请求拦截
//请求拦截:每一次发请求给后端，需要统一加的参数在请求拦截中做，比如加token
//请求拦截return的内容就是后端收到的真正的请求信息（如果没有return，后端就得到了undefined）
// config:配置信息（包括headers，url等）
axios.interceptors.request.use(config => {
    // 如果用户登录了，才可以传递token
    localStorage.getItem("userInfo") && (config.headers.authorization = JSON.parse(localStorage.getItem("userInfo")).token)
    return config
})
//响应拦截
//响应拦截:每一次，后端返回的数据，统一操作在响应拦截中处理
//响应拦截:return的内容就是组件收到的数据（如果没有return，后端就得到了undefined）
axios.interceptors.response.use(res => {
    // 统一处理失败
    if (res.data.code !== 200) {
        alert(res.data.msg)
    }

    // 掉线处理
    if (res.data.msg == "登录已过期或访问权限受限") {
        router.push("/login")
    }

    console.log("本次请求是:" + res.config.url);
    console.log(res);
    return res;
})

// 注册接口
export let reqRegister = (user) => {
    return axios({
        url: "/api/register",
        method: "post",
        data: qs.stringify(user)
    })
}

// 登录接口
export let reqLogin = (user) => {
    return axios({
        url: "/api/login",
        method: "post",
        data: qs.stringify(user)
    })
}

// 快速导航接口
export let reqHomeNav = () => {
    return axios({
        url: "/api/getcate",
        method: "GET"
    })
}

// 获取轮播图接口
export let reqBanner = () => {
    return axios({
        url: "/api/getbanner",
        method: "GET"
    })
}

// 秒杀
export let reqSkill = () => {
    return axios({
        url: "/api/getseckill",
        method: "get"
    })
}

// 获取商品信息
export let reqShopInfo = () => {
    return axios({
        url: "/api/gethortgoods",
        method: "GET"
    })
}

// 获取商品列表
export let reqList = (id) => {
    return axios({
        url: "/api/getgoodlist",
        method: "GET",
        params: {
            cateid: id,
            type: 1
        }
    })
}

// 获取搜索的内容
export let reqSearch = (words) => {
    return axios({
        url: "/api/search",
        method: "GET",
        params: {
            keywords: words
        }
    })
}

// 获取详情信息
export let reqDetail = (id) => {
    return axios({
        url: "/api/getgoodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 获取分类信息
export let reqSortInfo = () => {
    return axios({
        url: "/api/getcates",
        method: "GET"
    })
}

// 添加购物车的接口
export let reqAddShop = (uid, goodsid, num, authorization) => {
    return axios({
        url: "/api/cartadd",
        method: "POST",
        // 传递多个参数要用对象
        data: qs.stringify({
            "uid": uid,
            "goodsid": goodsid,
            "num": num,
            "authorization": authorization
        })
    })
}

// 购物车列表
export let reqShopList = (uid, authorization,id) => {
    return axios({
        url: "/api/cartlist",
        method: "get",
        params: {
            uid: uid,
            authorization: authorization,
            id:id
        }
    })
}

// 购物车修改
export let reqUpdateShop = (id, type, authorization) => {
    return axios({
        url: "/api/cartedit",
        method: "POST",
        data: qs.stringify({
            id: id,
            type: type,
            authorization: authorization
        })
    })
}

// 购物车删除
export let reqDelShop = (id, authorization) => {
    return axios({
        url: "/api/cartdelete",
        method: "post",
        data: qs.stringify({
            id: id,
            authorization: authorization
        })
    })
}


// 地址的添加
export let reqAddAddress = (uid, username, userphone, regioncode, location, useraddress, status, label) => {
    return axios({
        url: "/api/addressadd",
        method: "POST",
        data: {
            uid: uid,
            username: username,
            userphone: userphone,
            regioncode, regioncode,
            location: location,
            useraddress: useraddress,
            status: status,
            label: label
        },
        headers: {
            "content-Type": 'application/json'
        }
    })
}

// 地址查询
export let reqSelectAddress = (uid, id, status) => {
    return axios({
        url: "/api/addresslist",
        method: "get",
        params: {
            uid: uid,
            id: id,
            status: status
        },
        headers: {
            "content-Type": 'application/json'
        }
    })
}

// 地址编辑
export let reqEditAddress =(id,username,userphone,regioncode,location,status)=>{
    return axios({
        url:" http://localhost:3000/api/addressedit",
        method:"post",
        data:{
            id:id,
            username:username,
            userphone:userphone,
            regioncode:regioncode,
            location:location,
            status:status
        },
        headers:{
            "content-Type":"application/json"
        }
    })
}

// 地址删除
export let reqDelAddress = (id)=>{
    return axios({
        url:"http://localhost:3000/api/addressremove",
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        data:{
            id:id
        }
    })
}

// 订单查询
export let reqSelectOrder = (uid, authorization, status) => {
    return axios({
        url: "/api/orderlist",
        method: "GET",
        params: {
            uid: JSON.parse(localStorage.getItem("userInfo")).uid,
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
            status: status
        }
    })
}

// 生成订单
export let reqOrder = (uid, countmoney, countnumber, addressid, idstr) => {
    return axios({
        url: "/api/orderadd",
        method: "POST",
        data: qs.stringify({
            uid: uid,
            countmoney: countmoney,
            countnumber: countnumber,
            addressid: addressid,
            idstr: idstr
        }),
        
    })
}

