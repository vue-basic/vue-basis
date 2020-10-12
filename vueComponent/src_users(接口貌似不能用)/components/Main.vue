<template>
  <div>
      <h2 v-if="isFirst">欢迎光临,请输入关键字进行搜索</h2>
      <h2 v-else-if="isLoading">正在搜索,请稍后</h2>
      <h2 v-else-if="errMsg">请求出错:{{errMsg}}</h2>
    <div v-else class="row" >
      <div class="card" v-for="(user,index) in users" :key="user.username">
        <a :href="user.userUrl" target="_blank">
          <img
            src="user.userImg"
            style="width: 100px"
          />
        </a>
        <p class="card-text">{{reactjs}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Main",
  data() {
      return {
          isFirst:true,
          isLoading:false,
          errMsg:'',
          users:[]
      }
  },
  mounted() {
      this.$bus.$on('searchAjax',this.searchAjax)
  },
  methods:{
      searchAjax(q){
        //   在发送ajax请求之前,让页面显示正在请求中
          this.isFirst = false
          this.isLoading = true 
        //   接收的参数是Header传过来的searchName
        // 就可以根据searchName去发送Ajax请求(axios请求)

        // 发送请求
        // axios是第三方的包 需要装 npm install axios -S
        axios({
            url:'https://api.github.com/search/users',
            methods:'get',
            params:{
                q,
        
                // q  : searchName
            }
        }).then(response=>{
            // 返回的变量到时候要存新数组里边的
            let userList = response.data.items.map(item => {
                return {
                    username:item.login,
                    userUrl:item.url,
                    userImg:item.avatar_url
                }
            })
            this.users = userList
            this.isLoading = false //请求成功拿到数据,显示用户信息
        }).catch(error=>{
            this.errMsg = error.message
            this.isLoading = false //请求失败拿到错误信息,显示错误信息
        })
      }
  }
};
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>