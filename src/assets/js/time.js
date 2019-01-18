/*
    高级节目部分操作方法封装
*/

// 背景图片滚动条
function time(div,length){
    div.html('')
    for(let i = 0;i<length;i++){
        div.append("<div style='width:100px;height:100%;display:inline-block;'>"+i*10+"</div>")
    }
}

// 滚轮滑动添加单位长度
function myScript(Left,a,b,c){
    if(Left>500){
        a.css('width',2000+Left+'px')
        b.css('width',2000+Left+'px')
        c.css('width',2000+Left+'px')
    }else{
        a.css('width','2000px')
        b.css('width','2000px')
        c.css('width','2000px')
    }
}










export {
    time,
    myScript
}