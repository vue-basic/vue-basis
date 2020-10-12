<template>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="searchName"/>
        <button @click="search">Search</button>
      </div>
    </section>
</template>

<script>
export default {
  name:'Header',
  data() {
      return {
          searchName:'',
      }
  },
  methods:{
      search(){
        //   当你一旦点击search，把关键字传给Main，让它在Main中发请求
        // 本来我们可以在这发送请求获取数据,但是在这获取到数据是都要通信操作给Main去存储
        // 因为我们的数据设计在Main当中
        // 所以我们在这可以把输入的关键字搜索名字 传递给Main组件,然后在Main组件党章去发请求
        // 这样的话，Main组件拿到数据后不用通信直接修改存储

        this.$bus.$emit('searchAjax',this.searchName) //触发事件,并把数据传过去
      }
  }
}
</script>

<style scoped>

</style>