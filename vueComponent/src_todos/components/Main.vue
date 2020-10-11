<template>
  <ul class="todo-main">
    <!-- <Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo" :updateOne="updateOne" :index="index" :deleteOne="deleteOne"></Item> -->
      <Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo"  :index="index" :deleteOne="deleteOne"></Item>

  </ul>
</template>

<script>
import Item from "@/components/Item";
export default {
  name: "Main",
  components: {
    Item,
  },
  props:{
    todos:Array,
    // updateOne:Function,
    deleteOne:Function
  }
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style> 