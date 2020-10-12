<template>
    <div>
        <!-- 作用域插槽 -->
        <h1>我爱赵丽颖哼</h1>

        <ul>
            <li v-for="(todo,index) in todos" :key="todo.id" >
                <slot :todo="todo" >
                    <!--  
                        可以通过作用域插槽,把当前的数据传到父中,和属性传值一样
                        :todo="todo" 是作用域插槽的一部分,会传递给父组件当中某个固定的区域
                        数据在子组件当中,结构由父组件决定
                     -->
                     {{todo.content}}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'Child2',
    props:['todos']
}
</script>

<style scoped>

</style>