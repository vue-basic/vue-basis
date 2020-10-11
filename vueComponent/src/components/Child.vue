<template>
    <div>
       <h1>我爱你赵丽颖</h1> 
       <slot>
           <!-- 占位置,这里面的内容以及这里面的结构不确定,得由父组件给我传 -->
       </slot>

       <slot name="btn">

       </slot>
    </div>
</template>

<script>
export default {
    name:'Child',
}
</script>

<style scoped>
    
</style>