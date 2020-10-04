# day01
## 1.vue 简介
```
需要记住的点:
    1.渐进式
    2.插件
        1)官方插件
        2)第三方插件
```

## 2.需要装的插件
```
代码格式化
    1.Vetur 
    2.Vue2 Snippets

    之前格式化用的
    Prettier-Code formatter
```

## 3.Vue官网怎么看？
```
1.指南  教你怎么学
2.API   查的
```

## 4.参数类型
```
  www.baidu.com/8?name="zhaoliying"
            1.params 参数：/8  包含在路径中
            2.query参数： key=value name="zhaoliying"  不包含在路径中

            axios({
                url:'',
                method:'GET',
                3.请求体参数,  post 请求
                data:{
                    
                },
                params:{

                }
            })

```

## 5.data的两种写法
```
data有两种写法 ,一种是对象写法,另一种是data函数写法  函数就是方法,方法就是函数
1.
data:{
     msg:'我爱你戚薇',
     url:'https://www.baidu.com',
     persons:[
        {id:1,name:'赵丽颖',age:33},
        {id:2,name:'杨幂',age:34},
        {id:3,name:'戚薇',age:45}
     ]
}

2.函数写法要求必须return一个对象
data:function(){
    return {

    }        
}

 data(){
    return {
                    
    }
 },
```

## 6.箭头函数和普通函数有什么区别
```
箭头函数的this看的是它外部调用的this是谁

箭头函数没有this,它看它外部的函数是谁，它的this就是谁

箭头函数是谁看的是外部执行上下文中的this是谁

执行上下文(执行环境)：
https://blog.csdn.net/dichu2296/article/details/102233671
    1.生成变量形成变量对象
    2.执行上下文中的this指向的是谁
    3.形成自己执行上下文当中的栈列

```

## 7.Object.defineProperty() 和 split()
```
  <script>
        let obj = {
            firstName : 'zhao',
            lastName : 'liying'
        }

        obj.fullName = 'zhaoliying'
        console.log(obj)
        // 第一次打印的都是打印的这个对象的类型名(打的是这个对象的构造函数的名字)Object  
        // 但是一刷新就变了 {firstName: "zhao", lastName: "liying", fullName: "zhaoliying"}
        
        /*
        遇到的问题：Uncaught SyntaxError: Invalid shorthand property initializer
            原因是“=”应该写为“：”这个经常错，还不容易发现，所以记录下来，加强记忆
        */


        obj.firstName = 'liu'
        console.log(obj)//原因是“=”应该写为“：”这个经常错，还不容易发现，所以记录下来，加强记忆

        Object.defineProperty(obj,'fullName',{
            // 对象里边包含两个回调函数  回调函数一般情况下一般都是异步代码 
            get(){
                // getter  当读取这个属性的时候自动的调用get()
                return this.firstName + '-' + this.lastName
            },
            set(data){
                // setter  当写这个属性的时候就会自动调用set()
                // split() 方法用于把一个字符串分割成字符串数组。
                let arr = data.split('-')
                this.firstName = arr[0]
                this.lastName = arr[1]
            }
        })
        console.log(obj.fullName)
        obj.fullName = 'liu-liying'
        console.log(obj)

        // Object.defineProperty()响应式数据 让你添加是属性和之前的属性关联起来
        // 不管之前对象有没有这个属性 都可以使用
        // 让这个属性变为一个响应式的属性(和别的数据有关联的,自己变别的数据也变,别的数据变自己也变)
        // 
    </script>
```

## 8.computed计算属性  当你有一个数据需要 但是不存在 又是根据已有的数据计算而来的  必然用到计算属性
```
 <script>
        new Vue({
            el:'#root',
            data(){
                return{
                    // 写非函数数据
                    firstName:'zhao',
                    lastName:'liying'
                }
            },
            methods:{
                // 写方法和函数
            },
            computed:{
                // 做计算的时候是有缓存的  
                // 用什么存数据是最合适的？？？  用对象存的
                // 数组是存多个相同的有序数据的时候才会用到
                // 当它第一次拿取的时候先看缓存里有没有 , 没有就到下边调get方法做计算 , 计算完了就放缓存
                // 缓存可以提高效率
                fullName1 (){
                    console.log('fullName1调了')
                    // 代表的就是get 只能读不能写
                    return  this.firstName + '-' + this.lastName
                    // this指的是vm
                },

                fullName2:{
                    // 如果你的页面操作数据有读有写,那么get和set都得有
                    get(){
                        //读---显示
                        return this.firstName + '-' + this.lastName
                    },
                    // 如果只有读取,set没必要写 set如果没必要写,那么可以简化写为一个方法
                    set(value){
                        //写---改数据
                        let arr = value.split('-')
                        this.firstName = arr[0]
                        this.lastName = arr[1]
                    }
                },

            //    什么时候用计算属性是我们大家刚开始想不到的
            // 当你有一个数据需要 但是不存在 又是根据已有的数据计算而来的  必然用到计算属性

            }
        })
    </script>
```

## 9.watch监视属性
```
 <script>
        /*
            计算属性和监视属性
        */
        new Vue({
            el:"#root",
            data:{
                firstName:'zhao',
                lastName:'liying',
                fullName:'zhao-liying'
            },
            watch: {
                // 监视谁谁就是一个方法  自动传回来参数
                // 什么时候用监视属性？？
                // 属性值是存在的,才能监视  不存在需要计算
                firstName(newVal,oldVal){
                    console.log(newVal,oldVal)
                    this.fullName = newVal + this.lastName
                },
                fullName(newVal,oldVal){
                    let arr = newVal.split('-')
                    this.firstName = arr[0]
                    this.lastName = arr[1]
                },
            },
        })
    </script>
```