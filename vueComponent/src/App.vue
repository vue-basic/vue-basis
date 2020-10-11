<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header :addTodo="addTodo" ref="header"></Header>  -->
      <!-- <Header  ref="header"></Header>  -->
      <Header @addTodo="addTodo" ref="header"></Header> 
      <!-- <Main :todos="todos" :updateOne="updateOne" :deleteOne="deleteOne"></Main> -->
      <Main :todos="todos"  :deleteOne="deleteOne"></Main>

      <Footer :todos="todos"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Main,
    Footer, 
  },
mounted() {
  // 在A组件内部找到bus,因为bus是一个vm对象,所以它可以找到$on,$on是把事件绑定在谁身上
  // 把事件绑定在bus身上 时间名:updateOne 回调函数updateOne
  // 回调函数留在了A组件中
  this.$bus.$on('updateOne',this.updateOne)
},

  // 1.自定义事件的第一种写法
// mounted() {
//   // 当你的页面一旦挂载ok,那我就获取这个组件对象,怎么获取?ref
//   // this.$refs.header 代表Header组件对象 这个组件对象身上有一个方法,这个方法其实是在Vue的原型身上 $on
//   // $on在谁后边点的就相当于在谁身上加了自定义事件
//   // 自定义事件分为两部分:事件名(事件类型)和回调函数 
//   // 回调在谁里边，谁一定是接收数据的
//   this.$refs.header.$on('addTodo',this.addTodo)
// },
// beforeDestroy(){
//   this.$refs.header.$off('addTodo')//解绑儿子身上自定义事件
// },

  // watch:{
  //   // 现在监视的是todos数组,没有监视数组里的内容
  //   // 一般监视:我们没办法取监视数组内部对象的数据,它是在监视数组本身的数据
  //   todos(newVal,oldVal){ 
  //     // 监视todos,只要todos发生改变就该存储到localStorage里边
  //     localStorage.setItem('TODOS_KEY',JSON.stringify(newVal))
  //     // JSON.stringify(newVal)转换成json字符串串,json字符串在前端对应的格式只有两种:对象的数组|对象
  //   }
  // },

  
  watch:{
    // 深度监视:监视数组内部所有的数据
    todos:{
      deep:true,//代表打开深度监视
      handler(newVal,oldVal){
        localStorage.setItem('TODOS_KEY',JSON.stringify(newVal))
      }
    }
  },
  // data() {
  //   return {
  //     todos:[
  //       {id:1,content:'抽烟',isOver:false},
  //       {id:2,content:'喝酒',isOver:true},
  //       {id:3,content:'烫头',isOver:false}
  //     ]
  //   }
  // },

  data() {
    return {
      // 数据要从localStorage里边拿
      todos:JSON.parse(localStorage.getItem('TODOS_KEY')) || []  //用JSON.parse()转化为数据 如果拿到的是null就把它变成空数据
    }
  },
  methods:{
    addTodo(todo){
      this.todos.unshift(todo)
    },

    // 修改单个todo的完成状态
    updateOne(index){
      this.todos[index].isOver = !this.todos[index].isOver
    },

    // 删除单个todo
    deleteOne(index){
      this.todos.splice(index,1)
    }

  },
};
</script>

<style >
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>