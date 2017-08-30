//箭头点击切换功能

window.onload = function () {
    var windowWidth = 1000;//设置图窗口大小,更好的复用这个轮播，不过每次还要对应的修改css文件，如果用sass写，引入窗口大小的变量会更好
    var list=document.getElementById('list');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    
    function animate(offest) {
        //获取的是style.left，是相对左边距获取距离，所以第一张图片后style.left都为负值，
             //且style.left获取的是字符串，需要用parseInt()取整转化为数字。

        var newLeft = parseInt(list.style.left)+offest;
        list.style.left = newLeft +'px';

        if(newLeft<-5*windowWidth){
            list.style.left=-windowWidth+'px'//超过最后一张之后，自动回到第一张；
        }

        if(newLeft>-windowWidth){
            list.style.left=-5*windowWidth+'px'//超出第一张前，自动回到最后一张；
        }
    }
//偏移的是整个框
    prev.onclick = function () {
        
        animate(windowWidth);//加windowWidthpx的偏移量，图片list群向前偏移，因为本来的left是-windowWidthpx；
    };

    next.onclick = function () {
        animate(-windowWidth);//向后偏移windowWidth；
    }

  




//加上自动播放，setInterval（）实现循环滚动，
var timer;
function play() {
    timer = setInterval(function () {
        next.onclick();
    },3000)
}


play();


//如果鼠标放到某一张图上方，应该停住，就用clearInterval（）消除定时器
var container = document.getElementById('container');

function stop() {
    clearInterval(timer);
}

container.onmouseover = stop;//鼠标放上去就停止计时
container.onmouseout = play;//鼠标离开继续

//加上一排圆点的功能
var buttons = document.getElementById('buttons').getElementsByTagName('span');
var index = 1;

function buttonsShow() {

    //清理之前的样式
    for(var i=0; i<buttons.length;i++){
        if(buttons[i].className == 'on'){
            buttons[i].className=''
        }
    }

    //数组从0开始，故index需要-1
    buttons[index-1].className='on';//on的按钮上面写了橙色的样式
}

prev.onclick=function () {
    
    index=index-1;
    if(index<1){
        index = 5;
    }

    //这里把点的轮播和图的轮播对应起来
    buttonsShow();
    animate(windowWidth);
}

next.onclick = function () {
  
    index=index+1;
    if(index>5){
        index = 1;
    }

    buttonsShow();
    animate(-windowWidth);
}


//点击圆点切换
for(var i = 0;i<buttons.length;i++){
    (function (i) {
        
  
    buttons[i].onclick = function () {
        console.log(i);

        //偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上
        var clickIndex = parseInt(this.getAttribute('index'));
        var offset =windowWidth*(index - clickIndex);//把当前点和点击的点的差值算出来乘以windowWidth，算出偏移量
        animate(offset);
        index = clickIndex;
        buttonsShow();//点会对应变色
    }
})(i)
}
}