<template>
    <div>
        <button @click="count++">你点击了{{count}}</button>
        <h2>我爱你</h2>
    </div>
</template>

<script>
export default {
    name:'MyButton',
    data() {
        return {
            count:0
        }
    },
}
</script>

<style lang="less" scoped>
    h2{
        color: hotpink;
    }
</style>