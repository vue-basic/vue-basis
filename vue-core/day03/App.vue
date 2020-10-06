<template>
    <div>
        <MyButton/>
    </div>
</template>

<script>


import MyButton from './components/MyButton.vue'
// 注册全局组件
Vue.component('MyButton',MyButton)

export default {
    name:'App',
    components:{
        // 定义局部组件
        // MyButton:MyButton  //名字:配置对象 两者相同可省略
        MyButton

        //  mybutton:{
        //         // 配置对象 和Vue当中传的配置对象几乎一样 只是不能写el
        //         // 可以理解组件就是一个小的vm
        //         // Vue.extends 返回的是一个构造函数

        //             data() {
        //                 return {
        //                     count:0 , //这个数据是给我一会定义的组件的
        //                 }
        //             },
        //         template:'<button @click="count++">你点击了{{count}}</button>'
        //       }
    }
}
</script>

<style scoped>

</style>