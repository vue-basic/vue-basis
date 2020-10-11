<template>
  <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="addT" v-model="content"/>
      </div>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {
      content:''
    }
  },
  props:{
    // addTodo:Function
  },
  methods:{
    addT(){
      let {content} = this
      if(content.trim()){
        let id = Date.now()
        let isOver = false
        let todo = {
          id,
          isOver,
          content
        }

        // 去调用App组件内部的增加数据的方法去添加,不能再这直接去操作别人的数据

        // this.addTodo(todo)//props通信使用的

        // this代表当前组件,在组件当中的this代表当前组件,在vue中的this代表vm
        // 组件对象其实就是小的vm,不能配el
        // 触发事件其实就是调用父中的函数
        this.$emit('addTodo',todo)//触发/调用事件

      }else{
        alert('请输入合法内容')
      }
      this.content = ''
    }
  }
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>