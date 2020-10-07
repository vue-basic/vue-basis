import indexCss from './public/css/index.css'
import imgSrc from './public/images/timg.jpg'

let pp = document.createElement('p')
pp.innerHTML = '我爱你赵丽颖'
document.body.appendChild(pp)

const myFunc = () => {
    console.log('haha')
}

// 创建一个img的标签
let imgNode = new Image()
imgNode.src = imgSrc

// 把imgNode添加到body后面去
document.body.appendChild(imgNode)