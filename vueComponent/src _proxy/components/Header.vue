<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName" />
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "",
  data(){
    return {
      searchName:''
    }
  },
  methods:{
    search(){
      //本来我们可以在这发请求获取数据，但是在这获取到数据是都要通信操作给Main去存储
      //因为我们的数据设计在Main当中
      //所以我们在这可以把输入的关键字搜索名字  传递给Main组件，然后再Main组件当中去发请求
      //这样的话，Main组件拿到数据后不用通信，直接修改存储
      this.$bus.$emit('searchAjax',this.searchName)
    }
  }
};
</script>

<style scoped>
</style>
