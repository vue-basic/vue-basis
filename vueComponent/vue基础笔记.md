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

## 面试要问(*****) 10.v-if和v-show的区别  
```
<body>
    <div id="root">
        <p v-if="isOk">表白成功</p>
        <!-- <p v-else-if ="isPending">表白进行中</p> -->
        <p v-else>表白失败</p>
        
        <p v-show="isOk">求婚成功</p>
        <p v-show="!isOk">求婚失败</p>

        <button @click="update">点击切换</button>
    </div>
    
    <div id="box"></div>
    <script src="../js/vue.js"></script>
    <script>
        const vm = new Vue({
            el:'#root',
            data() {
                return {
                    isOk:false,
                    // isPending:true
                }
            },
            methods: {
                update(){
                    this.isOk = !this.isOk
                    // this.isPending = false
                }
            },
        })

        // let box = document.getElementById('box')

        // let flag = true
        // box.onclick = function(){
        //     if(flag){
        //         box.style.backgroundColor = 'green'
        //     }else{
        //         box.style.backgroundColor = 'red'
        //     }
        //     flag = !flag
        // }
    </script>
</body>
```

![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201004210420434.png)
```
如果用 v-if 条件渲染 
    它会直接把节点删除掉

如果用的是 v-show 进行条件渲染 style="display:none;"
内存里边还存在 只不过他用样式帮我们隐藏掉

什么时候用v-if 什么时候用v-show呢？
看需求  
如果说页面上有一个东西,它切换相当频繁,用v-show
因为v-show 我的内存里本来就有,只需要改变样式就可以了

如果说用v-if  需要创建节点  切换频率不高的情况下可以用
v-if 节省内存

用v-show可以获取到节点 , 而用v-show获取节点有可能会获取不到
因为假设v-if为false,这时这个节点不存在
但是如果用的是v-show 当它为false时,节点存在，节点时可以获取得到的

v-if和v-show都会用
            v-if是删除了这个节点,也就是dom树上是没有这个节点的,内存中没有
            如果我们获取这个节点,获取不到,切换不频繁可以用来节省内存

            v-show不是对节点进行删除操作,而是给节点元素添加样式去操作的  display:none
            但是有可能拿到的东西样式是  display:none  切换很频繁的时候,我们使用v-show

```

## 11.列表渲染
```
<body>
    <div id="root">
        <!-- 根据数据来创建的时候是动态创建 -->
        <ul>
            <li v-for="(person,index) in persons" :key="person.id">
                {{person.id}}---{{person.name}}---{{person.age}}
            </li>
            <!-- 
                如果我们只是为了展示用的,key使用index没问题
                如果我们以后对这个数据还有增删改的操作,那么index效率不高并且更可怕的是会出问题
                key以后我们要使用的几乎都是id值,使用这个唯一标识可以提高列表渲染以及修改的效率
             -->
        </ul>

        <button @click="changeFirstObjName">点击修改第一个人的姓名</button>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        new Vue({
            el:"#root",
            data() {
                return {
                    // persons是对象属性 所有的对象属性包括它自己及它内部的对象 只要是对象属性他就是响应式的,数组不可以
                   persons:[
                       {id:1,name:'zhaoliying',age:33},
                       {id:2,name:'yangmi',age:32},
                       {id:3,name:'liuyifei',age:34},
                       {id:4,name:'qiwei',age:31},
                   ] 
                }

                // {
                //     name:'liuyuan',
                //     girlF:{
                //         name:'zly',
                //         age:33,
                //         movies:[
                //             {id:1,name:'乘风破浪'}
                //         ]
                //     }
                // }

            },
            methods: {
                changeFirstObjName(){
                    // 第一种 
                    // this.persons[0].name = 'yingbao'  //修改的是对象属性

                    // 第二种
                    // this.persons[0] = {id:1,name:'liying',age:33}  //这样改是不行的 修改的是数组,不是对象属性
                    // console.log(this.persons)//其实数据改了,只是没有影响到页面 

                    // 第三种
                    this.persons.splice(0,1,{id:1,name:'yingying',age:33})
                    // data当中的数据,所有的对象属性都是响应式的,修改对象的属性就会影响到页面更改
                    // 修改数组的整体第一个值,页面不会发生改变,因为数组下标不是对象的属性,所以不是响应式数据
                    // 其实我们vm内部这个数组第一个数据已经改了,只是没有影响到页面

                    // 数组的部分原生方法被vue做了改变,名字和原生名字一样,但是已经不是你的原生方法了
                    // vue在给这些方法添加了修改页面的功能,使得页面可以修改

                    // 本质是对象的所有属性都添加了get和set方法(响应式数据)

                }
            },
        })
    </script>
</body>
```

## 12.vue修改的数组的原生方法---数组的变异方法
* 这些方法会主动触发视图的更新(即前端数据会自动更新)
### 1.push()
* 往数组最后面添加一个元素,成功则返回当前数组的长度

```


```

### 2.pop()
* 删除数组的最后一个元素,成功则返回删除元素的值

```
```

### 3. shift()
* 删除数组的第一个元素,成功则返回删除元素的值

```
```

### 4.unshift()
* 往数组最前面添加一个元素,成功则返回当前数组的长度
* 语法：arrayObject.unshift(newelement1,newelement2,....,newelementX)

```
参数	描述
newelement1	必需。向数组添加的第一个元素。
newelement2	可选。向数组添加的第二个元素。
newelementX	可选。可添加若干个元素

返回值
arrayObject 的新长度

unshift() 方法将把它的参数插入 arrayObject 的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间。该方法的第一个参数将成为数组的新元素 0，如果还有第二个参数，它将成为新的元素 1，以此类推。

请注意，unshift() 方法不创建新的创建，而是直接修改原有的数组。

提示和注释
注释：该方法会改变数组的长度。

提示：要把一个或多个元素添加到数组的尾部，请使用 push() 方法
```

```
methods:{
    addComment(comment){
      this.comments.unshift(comment)
    }
  }
```

### 5.splice()
* 有三个参数,第一个是想要删除的元素的下标(必选),第二个是想要删除的个数(必选),第三个是删除后想要在原位置替换的值(可选)
```
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

注释：该方法会改变原始数组。

语法
arrayObject.splice(index,howmany,item1,.....,itemX)
参数	描述
index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1, ..., itemX	可选。向数组添加的新项目。
返回值
类型	描述
Array	包含被删除项目的新数组，如果有的话。
说明
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
```

```
1.
<body>
    <div id="root">
        <!-- 根据数据来创建的时候是动态创建 -->
        <ul>
            <li v-for="(person,index) in persons" :key="person.id">
                {{person.id}}---{{person.name}}---{{person.age}}
            </li>
            <!-- 
                如果我们只是为了展示用的,key使用index没问题
                如果我们以后对这个数据还有增删改的操作,那么index效率不高并且更可怕的是会出问题
                key以后我们要使用的几乎都是id值,使用这个唯一标识可以提高列表渲染以及修改的效率
             -->
        </ul>

        <button @click="changeFirstObjName">点击修改第一个人的姓名</button>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        new Vue({
            el:"#root",
            data() {
                return {
                    // persons是对象属性 所有的对象属性包括它自己及它内部的对象 只要是对象属性他就是响应式的,数组不可以
                   persons:[
                       {id:1,name:'zhaoliying',age:33},
                       {id:2,name:'yangmi',age:32},
                       {id:3,name:'liuyifei',age:34},
                       {id:4,name:'qiwei',age:31},
                   ] 
                }

                // {
                //     name:'liuyuan',
                //     girlF:{
                //         name:'zly',
                //         age:33,
                //         movies:[
                //             {id:1,name:'乘风破浪'}
                //         ]
                //     }
                // }

            },
            methods: {
                changeFirstObjName(){
                    // 第一种 
                    // this.persons[0].name = 'yingbao'  //修改的是对象属性

                    // 第二种
                    // this.persons[0] = {id:1,name:'liying',age:33}  //这样改是不行的 修改的是数组,不是对象属性
                    // console.log(this.persons)//其实数据改了,只是没有影响到页面 

                    // 第三种
                    this.persons.splice(0,1,{id:1,name:'yingying',age:33})
                    // data当中的数据,所有的对象属性都是响应式的,修改对象的属性就会影响到页面更改
                    // 修改数组的整体第一个值,页面不会发生改变,因为数组下标不是对象的属性,所以不是响应式数据
                    // 其实我们vm内部这个数组第一个数据已经改了,只是没有影响到页面

                    // 数组的部分原生方法被vue做了改变,名字和原生名字一样,但是已经不是你的原生方法了
                    // vue在给这些方法添加了修改页面的功能,使得页面可以修改

                    // 本质是对象的所有属性都添加了get和set方法(响应式数据)

                }
            },
        })
    </script>
</body>
```

```
 deleteComment(index){
      this.comments.splice(index,1)
    }
```

### 6.sort()
* 是数组按照字符编码默认从小到大排序,成功则返回排序后的数组

```
```

### 7.reverse()
* 将数组倒序,成功则返回倒序后的数组

```
```

## 13.数组的方法---原生
### 1.split()
* split() 方法用于把一个字符串分割成字符串数组
* 语法: stringObject.split(separator,howmany)

* 参数
```
separator	必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
howmany	可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
```

* 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。

* 返回值:一个字符串数组

```
1.split()

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

### 2.splice() 
* splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

* 注释：该方法会改变原始数组

* 语法:arrayObject.splice(index,howmany,item1,.....,itemX)

* 参数
```
index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1, ..., itemX	可选。向数组添加的新项目。
```

* 返回值  Array	包含被删除项目的新数组，如果有的话。

```
  // 删除单个todo
    deleteOne(index){
      this.todos.splice(index,1)
    }
```

### 3.indexOf()
* indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。

* 语法: stringObject.indexOf(searchvalue,fromindex)
* 参数
```
searchvalue	必需。规定需检索的字符串值。
fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
```

* 注释：indexOf() 方法对大小写敏感！

* 注释：如果要检索的字符串值没有出现，则该方法返回 -1。

### 4.filter()
* filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

* 注意： filter() 不会对空数组进行检测。
* 注意： filter() 不会改变原始数组。

* 参数
```
function(currentValue, index,arr)	必须。函数，数组中的每个元素都会执行这个函数
函数参数:
参数	描述
currentValue	必须。当前元素的值
index	可选。当前元素的索引值
arr	可选。当前元素属于的数组对象
thisValue	可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"
```

* 语法： array.filter(function(currentValue,index,arr), thisValue)

* 返回值：	返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。

* filter()和indexOf()结合
```
 // 根据App.vue传过来的数据todos计算出来overNum
  computed: {
    overNum(){
     return this.todos.filter(item => item.isOver).length

      // return this.todos.filter(function(item){
      //   return item.isOver
      // }).length
    }
  }, 
```

```
<body>
    <div id="root">
        <input type="text" placeholder="请输入查找的关键字" v-model="keyword"/>
        <ul>
            <li v-for="(person,index) in newPersons" :key="person.id">
                {{person.id}}---{{person.name}}---{{person.age}}
            </li>
        </ul>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        /*
            分析：
            根据效果分析,数组用的是原来的数据还是新的数组
            1.假设用的是原来的数据,一上来展示没问题
            2.当keyword变化的时候监视它,我们可以在原数组当中删除不包含keyword的项
            3.当keyword变化的时候又变成空串的时候,我们想回去回不去了
            到此为止,卡死了
            4.既然原数组没法做效果,就必须使用新的数组,而且这个数组一上来和原数组数据一样
            5.既然是新数组,那就一定要用计算属性,根据已有的原数组和keyword 计算
        */
        new Vue({
            el:"#root",
            data() {
                // data 当中吧傲寒初始化的数据和要收集的数据
                return {
                    // 第一步,先拿到输入的关键字 input一般都是v-model去收集数据
                   keyword:'',
                   persons:[
                       {id:1,name:'zhaoliying',age:33},
                       {id:2,name:'yangmi',age:32},
                       {id:3,name:'liuyifei',age:34},
                       {id:4,name:'qiwei',age:31},
                   ] //代表的就是ajax回来的数据
                }
            },
            computed: {
                // 这里面的数据不是初始化数据也不是要收集的数据,而是后面根据已有的数据计算而来的
                newPersons(){
                    // 直接写成方法 里边只有get没有set
                    // let keyword = this.keyword
                    // let persons = this.persons
                    let {keyword,persons} = this  //对象的解构赋值

                    // 原生js一步一步来
                    // let result = []
                    // for(let i = 0; i < persons.length; i++){
                    //     if(persons[i].name.indexOf(keyword) != -1){
                    //         result.push(persons[i])
                    //     }
                    // }

                    // 原始函数
                    // let result = persons.filter(function(item,index){
                    //     // return 后面一定是一个条件表达式 结果一定是true或者false
                    //     return item.name.indexOf(keyword) != -1
                    // })

                    let result = persons.filter(item => item.name.indexOf(keyword) != -1)
                        // filter item,拿到一项如果为真放到一个新数组里边
                        
                        // indexOf  包含  找某一个人的下标
                        // 如果找到 返回的是这个人的下标
                        // 如果没找到 返回-1

                        // return 后面一定是一个条件表达式 --- 结果一定是true/false
                        // 如果为true 放新数组里边   如果不为true 过滤掉 不要

                        // fliter 最后拿到的是过滤后可的新数组
                    
                    return result 
                    // get方法一定要返回一个值的
                }
            },
        })
    </script>
</body>
```
### 5.unshift()
```
定义和用法
unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

语法
arrayObject.unshift(newelement1,newelement2,....,newelementX)
参数	描述
newelement1	必需。向数组添加的第一个元素。
newelement2	可选。向数组添加的第二个元素。
newelementX	可选。可添加若干个元素。
返回值
arrayObject 的新长度。

说明
unshift() 方法将把它的参数插入 arrayObject 的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间。该方法的第一个参数将成为数组的新元素 0，如果还有第二个参数，它将成为新的元素 1，以此类推。

请注意，unshift() 方法不创建新的创建，而是直接修改原有的数组。

提示和注释
注释：该方法会改变数组的长度。

注释：unshift() 方法无法在 Internet Explorer 中正确地工作！
```

```
 addTodo(todo){
      this.todos.unshift(todo)
    },
```

## 14.阻止事件冒泡
* 1.event.stopPropagation()
* 2.<div style="width: 100px;height: 100px; background-color: green;" @click.stop="inner"></div>

## 15.阻止浏览器默认行为
* 1.event.preventDefault();
* 2.<a href="http://www.atguigu.com" @click.prevent="removeDefault">点我去学习</a>


## 16.事件相关
```
<body>
    <div id="root">
        <!-- 最初始的写法 -->
        <button v-on:click="test1">test1</button>
        <!-- 事件添加的简写 -->
        <button @click="test2">test2</button>
        <!-- 事件回调不带参数默认传递的是事件对象event -->
        <button @click="test3">test3</button>
        <!-- 事件回调带来参数并且还要用到事件对象  如果不传参,默认传过去的是事件对象event;如果传参了,事件对象就被覆盖掉了 -->
        <button @click="test4('zhaoliying')">test4</button></button>
        <!-- 事件回调不但带来自己参数还要用到事件对象的东西 -->
        <button @click="test5('zhaoliying',$event)">test5</button>

        <!-- 阻止事件冒泡 -->
        <div style="width: 300px;height: 300px; background-color: red;" @click='outer'>
            <div style="width: 100px;height: 100px; background-color: green;" @click.stop="inner"></div>
        </div>

        <!-- 取消浏览器的默认行为 -->
        <a href="http://www.atguigu.com" @click.prevent="removeDefault">点我去学习</a>

        <!-- 
            键盘事件 一般在哪里加？？？
            表单类元素或者document身上
        -->
        <input type="text" @keyup.enter="testKey"/>
       
        <!-- 
             button.onclick = function(event){}
            事件对象不是我们自己用的
            当你发生这件事的时候,浏览器会帮你把这件事相关的一切信息包装成一个对象,自动传给你,
            你写了就相当于接收了,就可以用了
            你没写就相当于没接收,那就没法用

            因为这个函数是个回调函数,回调函数不是我们自己调用的,是浏览器/系统调用的
            浏览器调用了这个方法,它就会自动封装成一个东西传给你,你用就接收,不用就算了

            事件对象:当事件触发的时候,浏览器会调用这个回调函数,
            浏览器会帮我们自动的封装一个对象作为实参传给回调函数的第一个形参,
            这个事件对象是和这次触发事件相关的所有信息

         -->
    </div>

    <script src="../js/vue.js"></script>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el:'#root',
            methods: {
                test1(){
                    console.log('test1调用')
                },
                test2(){
                    console.log('test2调用')
                },
                // 事件回调函数如果没有传递其他参数,默认传过来的就是事件对象
                test3(event){
                    // event.target 事件委派/事件委托
                    console.log('test3调用',event.target.innerHTML)
                },
                test4(str){
                    // 如果不传参,默认传过去的是事件对象event;如果传参了,事件对象就被覆盖掉了 str拿的就是传过来的那个字符串
                    console.log('test4调用',str)
                },
                test5(str,event){
                    // 接收参数的顺序要跟传递参数的顺序一致
                    console.log('test5调用',str,event.target.innerHTML)
                },
                // 事件流 冒泡和捕获
                // 事件流/事件机制是客观存在的 也就是事件冒泡是客观存在的
                outer(){
                    console.log('outer')
                },
                inner(event){
                    console.log('inner')
                    // 阻止事件冒泡
                    // event.stopPropagation()
                },
                removeDefault(event){
                    console.log('haha')
                    // event.preventDefault();
                    
                },
                testKey(event){
                    // if(event.keycode === 13){
                    //     console.log('回车触发')
                    // }

                    console.log('回车触发')
                }
            },
        })
    </script>
</body>
```

## 17.内置指令
* v-text不会解析标签 v-html会解析指令

## 18.vue定时器
```
<body>
   <div id="root">
       <!-- 页面的变化归根到底是数据的变化 -->
        <p v-show="isShow">我爱你赵丽颖</p>
        <button @click="destory">点击销毁</button>
   </div> 

   <script src="../js/vue.js"></script>
   <script>
    /*
        生命周期的回调函数/回调也叫钩子:
            1.mounted 页面刚刚挂载显示完成
    */
       new Vue({
           el:'#root',
           data() {
               return {
                   isShow:true
               }
           },
           mounted() {  
            //    回调代码一般都在这 发ajax请求 定时器
            //    页面刚刚挂载显示完成
            this.timer = setInterval(() => {
                this.isShow = !this.isShow
            }, 1000);
           },
           beforeDestroy() {
            //    一般是在销毁实例之前的一些善后工作  清除定时器/解绑事件相关
            //    清除定时器的代码应该写在这里
            clearInterval(this.timer)
           },
           methods: {
            destory(){
            //    销毁实例 
            // 点击按钮我要销毁vm实例,销毁之前自动会调用beforeDestroy回调
                this.$destroy()//销毁实例的方法 固定的
            }
           },
       })
   </script>
</body>
```

## 19.生命周期钩子
```
         生命周期(8个钩子):
                new Vue() ---- 实例化对象就已经有了,只不过刚开始是个空对象
                    4件事：
                        1.开辟空间 ---- 实例化对象就已经有了,只不过刚开始是个空对象
                        2.修改this指向 ---- 把你栈里边的this指向过来
                        3.执行构造函数 ---- 往对象里边塞东西 this.xxx = xxx
                        4.返回这个实例的地址
                init Events & Lifecycle
    // 初始化系统环境

    beforeCreate ------第一个钩子 生命周期最早的一个钩子  (打印this.msg是打印不到了)  初始化数据时的两个钩子之一 ----看不到数据
                init injections & reactivety  把data代理到对象里边去 这个东西最终会成为vm实例的东西 (初始化数据 data里的数据 最终挂载到vm身上去 把你传进去的配置对象,把配置对象给了Vue的实例)
    created------ 打印this.msg是可以看到的  初始化数据时的两个钩子之一 ----- 可以看到数据
        // 搞数据 解析data
        
                Has 'el' option? ----看看对象里边有没有el  ---- 要挂载了
                如果没有 No
                when vm.$mounted(el) is called? ----看你有没有写mounted
                如果有 Yes
                Has 'template' option? ---- 有没有模板  挂载的页面 root 内部其实就是模板
                    如果有 Yes
                    Compile template into render function? --- 如果有就拿当前找到的东西(root)当成模板去解析
                    如果没有 No
                    Compile el's outerHTML as template? --- 如果没有就拿他外边(body)的作为模板去解析
    // 找挂载点

    beforeMount------ 钩子,挂载之前  挂载点已找到,但是还没挂 页面上找不到,因为还没解析完挂上去,页面上看不见  这时候如果要打印p是大一不到的,因为还没挂载上去  挂载之前是拿不到p标签的
            Create vm.$el and replace 'el' with it  ----虚拟DOM 正儿八经创建元素 挂载到root上边去 挂载上去了   解析创建p标签 然后挂载上去
    mounted ---- 挂载完了  页面就可以看到了,已经解析挂载上去了 这时候就可以拿到p标签了
    // 挂载  实例已经搞定了

    // 修改数据的时候 怎么去让他的数据修改
                    Mounted
                    when data changes ---- 当data中的数据被修改了
    beforeUpdate------data中的数据已经改了,页面的数据还没渲染上去   页面更新前
                    Virtual DOM re-render and patch?----虚拟DOM 重新渲染解析  数据一旦被更新,页面就要重新被渲染
    updated----------页面上的数据已经渲染完成
    // 页面的修改之前和页面修改之后

                 when vm.$destory() is called -----只有vm.$destory() 这个方法被调用时,你的实力才会被销毁 
    beforeDestroy-----做一些善后工作 vm快死了,把善后工作做一做，再不做就没机会了
                Teardown watchers.child components and event listeners
                Destroyed----- vm 死了
    destroyed ---- 可以打印一下vm死没死


生命周期钩子的执行顺序是固定的
        1. beforeCreate() {
                // 打印数据是看不见的
                console.log(this.isShow)//undefined
            },
        2. created() {
                // 打印数据可以看见
                console.log(this.isShow)//true
            },
        // 初始化数据

        3. beforeMount() {
                // 挂载前 模板挂载前(生成正儿八经的标签)
                console.log(this.$refs.pp)//undefined
            },
        4. mounted() {  
                // 挂载完成 
                console.log(this.$refs.pp)//<p>我爱你赵丽颖</p>
            }
        // 挂载

        5.beforeUpdate() {
                // data中的数据已经改了 但是页面上的数据还没改
                // console.log(this.isShow,this.$refs.pp.innerText)//false "我爱你赵丽颖"  true "我爱你杨幂"

            },
        6. updated() {
                // 
                console.log(this.isShow,this.$refs.pp.innerText)//false "我爱你杨幂" true "我爱你赵丽颖"
            },
        // 数据更改

        7.beforeDestroy() {
            //    必须要去调用实例的$destroy()方法
            //    一般是在销毁实例之前的一些善后工作  清除定时器/解绑事件相关
            //    清除定时器的代码应该写在这里
            clearInterval(this.timer)
           },
        8.destoryed(){
            //    销毁后可以打印提示信息
           },
        //    销毁

```

```
 <div id="root">
        <p v-show="isShow" ref="pp">{{isShow?'我爱你赵丽颖':'我爱你杨幂'}}</p>
        <button @click="destory">点击销毁</button>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        new Vue({
            el:'#root',
            data() {
                return {
                    /*
                     beforeCreate()  数据打印不出来
                     created()  数据打印不出来
                        这两个钩子在搞数据
                     */
                     isShow:true,

                }
            },
            // 生命周期钩子执行的顺序是固定的
            beforeCreate() {
                // 打印数据是看不见的
                console.log(this.isShow)//undefined
            },
            created() {
                // 打印数据是可以看见的
                console.log(this.isShow)//true
            },
            //数据

            beforeMount() {
                // 挂载前 模板挂载前(生成正儿八经的标签)
                console.log(this.$refs.pp)//undefined
            },
            mounted() {  
                console.log(this.$refs.pp)//<p>我爱你赵丽颖</p>
            //    回调代码一般都在这 发ajax请求 定时器
            //    页面刚刚挂载显示完成
            this.timer = setInterval(() => {
                this.isShow = !this.isShow
            }, 1000);
           },
            //    挂载

            // 数据修改
            beforeUpdate() {
                // data中的数据已经改了 但是页面上的数据还没改
                // console.log(this.isShow,this.$refs.pp.innerText)//false "我爱你赵丽颖"  true "我爱你杨幂"

            },
            updated() {
                // 
                console.log(this.isShow,this.$refs.pp.innerText)//false "我爱你杨幂" true "我爱你赵丽颖"
            },
            // 数据更改

           beforeDestroy() {
            //    必须要去调用实例的$destroy()方法
            //    一般是在销毁实例之前的一些善后工作  清除定时器/解绑事件相关
            //    清除定时器的代码应该写在这里
            clearInterval(this.timer)
           },
           destoryed(){
            //    销毁后可以打印提示信息
           },
        //    销毁

           methods: {
            destory(){
            //    销毁实例 
            // 点击按钮我要销毁vm实例,销毁之前自动会调用beforeDestroy回调
                this.$destroy()//销毁实例的方法 固定的
            }
           },
        })
    </script>
```

## 20.过渡和动画

```
  Vue里边页面在变其实是数据在变 
            Vue把过渡和动画拆成两个过程:
                1.从无到有 enter
                    v-enter Opacity:0
                    v-enter-active 中间的过程
                    v-enter-to  Opacity:1 一般不用,因为默认为1
                2.从有到无 leave
                    v-leave Opacity:1
                    v-leave-active  中间过程
                    v-leave-to Opacity:0
```
```
<body>
    <div id="demo">
        <button @click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        new Vue({
            el: '#demo',
            data: {
                show: true
            }
        })
    </script>
</body>
```

## 21.自定义指令
```
定义全局指令 所有的Vue实例都可以用
指令名字不包含v-,而且不能是大写

局部指令 只有当前的实例可以使用
局部指令是在配置Vue的配置对象中去配置
```

```
<body>
    <div id="root">
        <p v-text="msg"></p>
        <p v-upper="msg"></p>
    </div>

    <div id="root1">
        <p v-text="msg"></p>
        <p v-upper="msg"></p>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        // 定义全局指令 所有的Vue实例都可以用
        // 指令名字不包含v-,而且不能是大写
        Vue.directive('upper',function(element,bindings){
            // console.log(bindings)//bindings---Object
            element.textContent = bindings.value.toUpperCase()
            // textContent只有高级浏览器可以用
        })//Vue的对象用法

        // 局部指令 只有当前的实例可以使用
        new Vue({//Vue的函数用法
            el:'#root',
            data() {
                return {
                    msg:'i love you'
                }
            },
            // 局部指令是在配置Vue的配置对象中去配置
            directives:{
                upper(element,bindings){
                    element.textContent = bindings.value.toUpperCase()
                },
                
            }
        })

        new Vue({
            el:'#root1',
            data() {
                return {
                    msg:'happay day'
                }
            },
        })
    </script>
</body>
```

## 22.自定义过滤器
```
1.全局过滤器
2.局部过滤器

<body>
    <div id="root">
        <p>{{timeNow | timeFormat}}</p>
        <p>{{timeNow | timeFormat('hh:mm:ss')}}</p>
    </div>

    <script src="../js/vue.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/moment.js"></script>

    <script>

        // 自定义过滤器 是用来对渲染的数据进行进一步的计算之后,返回新数据再去渲染

        // 全局过滤器
        // Vue.filter('timeFormat',function(value,format='YYYY-MM-DD hh:mm:ss'){
        //     return moment(value).format(format)
        // })


        new Vue({
            el:'#root',
            data() {
                return {
                    timeNow:Date.now() 
                }
            },
            // 局部过滤器
            filters:{
                timeFormat(value,format='YYYY-MM-DD hh:mm:ss'){
                    return moment(value).format(format)
                }
            }
            
        })
    </script>
</body>
```

## 23.IIFE 立即调用函数表达式
* 是一个在定义时就会立即执行的JavaScript函数
```
(function(){
    statements
})();

jQuery的最外层用到了它 相当于自动的往外暴露一个东西
```
## 24.自定义插件
```
(function(w){
    // 一个Vue的插件本质上是一个对象

    // 1.首先要先定义一个对象
    let MyPlugin = {}

    // let vm = new Vue

    // 对象里边要有install方法
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或属性  myGlobalMethod这个方法是给Vue添加的方法 vm不能用
        Vue.myGlobalMethod = function () {
          console.log('myGlobalMethod全局方法调用了，切记实例不能直接使用，是Vue的方法')
        }
      
        // 2. 添加一个全局资源(asset)  定义全局指令
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // 一些逻辑……
            el.innerText = binding.value.toUpperCase()
          }
        })
      
        // 4. 添加一个实例方法  给Vue的原型添加的,原型上的方法是给实例化对象用的,是给vm实例用的 Vue不能用  
        Vue.prototype.$myMethod = function (methodOptions) {
          console.log('$myMethod实例方法调用了，切记Vue不能直接使用，是V实例化对象的方法')
        }
      }

    //   把这个对象给暴露出去
    w.MyPlugin = MyPlugin 
})(window);//IIFE
```

* 不管是自定义插件 第三方插件还是官方插件都要写的话
* Vue.use(MyPlugin) //声明使用插件,本质就是自动调用插件对象的install方法

```
<body>
    <div id="app">
        <p v-my-directive="msg"></p>
    </div>

    <script src="../js/vue.js"></script>
    <script src="../js/myPlugin.js"></script>
    <!-- 一旦引入window上就有了MyPlugin -->

    <script>
        console.log(MyPlugin)

        // 不管是自定义插件 第三方插件还是官方插件都要写的话
        Vue.use(MyPlugin) //声明使用插件,本质就是自动调用插件对象的install方法
        Vue.myGlobalMethod()

        console.dir(Vue)
        
        let vm = new Vue({
            el:'#app',
            data() {
                return {
                    msg:'liuyuan'
                }
            },
        })

        vm.$myMethod()
    </script>
</body>
```

## 25.自定义组件 (非单文件)
* 1.没有联想,写起来比较复杂
* 2.不能写css
* 3.不能模块化开发

```
<body>
    <div id="root">
        <!-- 本质上是实例化了一个组件对象 -->
        <mybutton></mybutton>
    </div>

    <script src="../js/vue.js"></script>

    <script>
        // 1.麻烦的写法
            // 如果你想要定义一个组件 那么你必须调用Vue里边的一个方法(extend)

            // 1.定义组件 本质上是定义了一个实例化组件对象的构造函数
            const VueComponent = Vue.extend({
                // 配置对象 和Vue当中传的配置对象几乎一样 只是不能写el
                // 可以理解组件就是一个小的vm
                // Vue.extends 返回的是一个构造函数

                data() {
                    return {
                        count:0 , //这个数据是给我一会定义的组件的
                    }
                },
                template:'<button @click="count++">你点击了{{count}}</button>'
            })

            // 2.注册组件 本质是给组件对象起名字,名字一定要小写  让mybutton和构造函数绑定到一起 但此时没有实例化这个组件对象
            Vue.component('mybutton',VueComponent)

            // 3.使用组件 本质是实例化了一个组件对象


        new Vue({
            el:'#root'
        })    
    </script>
</body>
```

```
 // 2.简单写法 
            // 第二个参数传入的是配置对象
            // 1.定义组件 本质上是定义了一个实例化组件对象的构造函数
            Vue.component('mybutton',{
                // 配置对象 和Vue当中传的配置对象几乎一样 只是不能写el
                // 可以理解组件就是一个小的vm
                // Vue.extends 返回的是一个构造函数

                data() {
                    return {
                        count:0 , //这个数据是给我一会定义的组件的
                    }
                },
                template:'<button @click="count++">你点击了{{count}}</button>'
            })
```

```
//3.
 new Vue({
            el:'#root',
            components:{
                mybutton:{
                // 配置对象 和Vue当中传的配置对象几乎一样 只是不能写el
                // 可以理解组件就是一个小的vm
                // Vue.extends 返回的是一个构造函数

                data() {
                    return {
                        count:0 , //这个数据是给我一会定义的组件的
                    }
                },
                template:'<button @click="count++">你点击了{{count}}</button>'
            }
            }
            
        })    
```

## 26.组件注册
* 1.全局注册

```
import MyButton from './components/MyButton.vue'
// 注册全局组件
Vue.component('MyButton',MyButton)
```

* 2.局部注册

```
export default {
    name:'App',
    components:{
        // 定义局部组件
        // MyButton:MyButton  //名字:配置对象 两者相同可省略
        MyButton
    }
}
```

## withRoute

墨刀

