<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 style="display: none">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
        <Item v-for="(comment,index) in comments" :key="comment.id" :comment="comment"></Item>
        <!-- Item有几项是由数据决定的 用v-for遍历 再一次传递数据给Item  把 当前遍历的item给Item传过去-->
    </ul>
  </div>
</template>

<script>
import Item from '@/components/Item'
export default {
  name: "List",
  components:{
      Item
  },
  props:['comments'] //声明接收父组件传递过来的属性
//   一旦声明接收了,这个comments就相当于在List的data中的数据,也就是说comments是List的数据了
};
</script>

<style>
.reply {
  margin-top: 0px;
}
</style>