function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    let n=0
    let id= setInterval(()=>{
        n +=1
        domCode.innerHTML = Prism.highlight(prefix+code.slice(0,n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.slice(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n>=code.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },0)
}
function writeMarkdown(md,fn){
    let domContent = document.querySelector('#paper > .content')
    let n=0
    let id= setInterval(()=>{
        n +=1
        domContent.innerHTML = md.slice(0,n)
        domContent.scrollTop = domContent.scrollHeight
        if(n>=md.length){
            window.clearInterval(id)
            fn.call()
        }
    },0)
}
var md=`
# 你好

我叫xxx
1992年生
天津大学仁爱学院毕业
自学前端半年，希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
var result=`
/*面试官你好，我是xxx
*我将以动画的形式来介绍我自己

*文字太单调了，
*用代码吧

首先准备一些样式：*/
*{
  transition:all 0.5s;
}
body{
  background:rgb(222,222,222);
  font-size:16px;
}
#code{
  border:2px black solid;
  padding:16px;
}
/*加一下代码高亮*/
.token.selector{
    color:#690;
}
.token.property{
    color:#905;  
}
.token.function{
    color:#DD4A68;  
}
.token.comment{
    color:slategray;  
}
/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/*加点3D效果*/
#code{
    transform:rotate(360deg);
}
/*
*接下来介绍一下自己
*需要一张白纸
*/
#code-wrapper{ 
    position:fixed; left:0;
    width:50%; height:100%
}
#paper> .content{ 
    display:block;
}
`
var result2 =`
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
writeCode('',result,()=>{
    createPaper( ()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                convertMarkdownToHtml()
            })
        })
    })
})

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}
function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }


/*
function fn3(preResult){
var result =`
#paper{
    width:200px;
    height:200px;
    background:green;
}
`
    var n=0
    var id= setInterval(()=>{
    n +=1
    code.innerHTML =preResult + result.slice(0,n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    styleTag.innerHTML =preResult + result.slice(0,n)
        if(n>result.length){
            window.clearInterval(id)
            console.log('完成')
        }
    },0)
}
*/