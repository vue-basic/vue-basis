const express = require('express')
const app = express()  //创建小的服务器

app.get('/users/info', function (req, res) {//注册路由
    // /users/info 接口
    // 
    let response = {
        status:200,
        data:{
            total:2,
            items:[
                {id:1,username:'zhaoliying'},
                {id:2,username:'yangmi'}
            ]
        }
    }
  res.send(JSON.stringify(response))
//   axios是由ajax和promise封装的库
})

app.listen(4000,()=>{
    console.log('服务器已经开始服务监听http://localhost:4000')
})

// 
/**
 * 什么是路由?
 * 路由最终是key和value的映射关系
 * 是路径和一个东西的映射关系
 * 
 * 后端路由
 * 一个路径对应一个函数
 * 
 * 前端路由
 * 一个路径对应一个组件
 * 
 */

//  启动服务  node 文件名