<template>
  <div>
    <h2 v-if="isFirst">欢迎光临，请输入关键字进行搜索</h2>
    <h2 v-else-if="isLoading">正在搜索中，请稍后</h2>
    <h2 v-else-if="errMsg">请求出错:{{errMsg}}</h2>
    <div v-else class="row">
      <div class="card" v-for="(user, index) in users" :key="user.userName">
        <a :href="user.userUrl" target="_blank">
          <img :src="user.userImg" style="width: 100px" />
        </a>
        <p class="card-text">{{user.userName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'babel-polyfill';
export default {
  name: "",
  data() {
    return {
      isFirst: true,
      isLoading: false,
      errMsg: "",
      users: []
    };
  },
  mounted() {
    this.$bus.$on("searchAjax", this.searchAjax);
  },
  methods: {
    async searchAjax(q) {
      try {
        const result = await axios({
          url: "http://localhost:9000/api/users/info",
          method: "get"
        });
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }

      //在发送ajax请求之前，让页面显示正在请求中
      // this.isFirst = false;
      // this.isLoading = true;
      // //就可以根据searchName去发送ajax请求
      // try {
      //   let response = await axios({
      //     // url: "https://api.github.com/search/users",
      //     method: "get",
      //     // params: {
      //     //   q
      //     // }
      //   });
      //   console.log(response.data)
      //   // let userList = response.data.items.map(item => {
      //   //   return {
      //   //     userName: item.login,
      //   //     userUrl: item.url,
      //   //     userImg: item.avatar_url
      //   //   };
      //   // });
      //   // this.users = userList;
      //   // this.isLoading = false; //请求成功拿到数据，显示用户信息
      // } catch (error) {
      //   this.errMsg = error.message;
      //   this.isLoading = false; //请求失败拿到错误信息，显示错误信息
      // }
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
