<template>
  <div>
    <!-- 3.使用 -->
    <MyButton></MyButton>
    <MyButton></MyButton>
    <MyButton></MyButton>
  </div>
</template>

<script>
// 1.引入
// import MyButton from "./components/MyButton"
import MyButton from '@/components/MyButton'
// 一定要加 .vue 不然会报错
export default {
  name: "App",
  //2. 注册
  components: {
    MyButton,
  },
};
</script>

<style lang="less" scoped>
</style>


