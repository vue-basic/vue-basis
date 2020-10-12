<template>
  <div>
    <Child>
      <template>
        <button>点我</button>
      </template>
    </Child>

    <Child>
      <template slot="btn">
        <h2>我爱你</h2>
      </template>
      <template slot="aa">
        <a>我爱你</a>
      </template>
    </Child>

    <Child2 :todos="todos">
        <!-- 
          决定子组件内部的结构,比如假设isOver为true,那么内容需要包含在span当中并且内容前面带 √
          结构是父组件决定的 数据是子组件中的 但是展示的结构是由外部的父组件决定的
         
         -->

        <!-- 
          什么时候用作用域插槽
          当碰到数据是在子组件当中展示的,而结构是由父组件决定的,此时必然使用作用域插槽
         -->
         <template slot-scope="scopePerps">
           <!-- slot-scoped会把子组件传递过来的数据,放在一个对象当中作为属性 -->
           <!-- 父组件当中拿从子传过来的todo ,决定结构 -->
           <span v-if="scopePerps.todo.isOver">
             √
           </span>
           {{scopePerps.todo.content}}
         </template>
    </Child2>
  </div>
</template>

<script>
import Child from '@/components/Child'
import Child2 from '@/components/Child2'
export default {
  name:'App',
  components:{
    Child,
    Child2
  },
  data() {
    return {
      todos:[
        {id:1,content:'抽烟',isOver:false},
        {id:2,content:'喝酒',isOver:true},
        {id:3,content:'烫头',isOver:false}
      ]
    }
  },
}
</script>

<style scoped>
  
</style>