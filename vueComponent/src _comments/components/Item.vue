<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;"  @click="deleteC">删除</a>
    </div>
    <p class="user">
        <span>{{comment.username}}</span>
        <span>说:</span>
    </p>
    <p class="centence">{{comment.content}}!</p>
  </li>
</template>

<script>
export default {
  name: "Item",
  props:['comment','index','deleteComment'],
  methods:{
      deleteC(){
        //  点哪个删哪个 在数组中删拿的是下标 index 

        // 删的时候 动数据 必须调用数据所在地方的删除方法
        this.deleteComment(this.index)
      }
  }
};
</script>

<style>
li {
  transition: .5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>