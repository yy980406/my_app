module.exports={
    //打包后的基础路径
    publicPath:"",
    //打包后的文件夹
    outputDir:"dist",
    // 打包后的静态资源目录
    assetsDir:"static",
    // 入口文件
    indexPath:"index.html",
    //服务
    devServer:{
        //代理
        proxy:{
            "/api":{
                //target写后端的ip
                target:"http://localhost:3000",
                // 下面两个是解决的是跨域问题的语句
                changeOrigin:true,
                ws:true
            }
        }
    }
}