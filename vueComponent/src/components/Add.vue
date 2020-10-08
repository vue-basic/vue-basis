<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="username" />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="content"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default pull-right" @click="addC">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Add",
  props:['addComment'],
  data() {//data当中放的是初始化数据和要收集的数据 
      return {//对象书无序的
          username:'',
          content:'',
      }
  },
  methods:{
      addC(){
        // 点击提交,要执行的回调函数

        // 收集数据形成新的comment对象 v-model
        let {username,content} = this //解构赋值
        // 验证数据的可靠性
        if(username.trim()&&content.trim()){
            let id = Date.now()
            let comment = {
                username,
                content,
                id
            }
        // 把新的comment对象添加到我们的comments数组当中
        // 数据在哪定义,更新数据的方法就应该在哪定义,而其他组件想要去修改数据,必须调用更新数据的方法去做
        // 在Add里边想要去修改App里边的数据 ,数据是定义在App里边的,那么真正修改App数据的方法就应该定义在App里边
        this.addComment(comment)
        }

        
      }
  }
};
</script>

<style>
</style>