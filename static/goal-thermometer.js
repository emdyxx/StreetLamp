var canvasPanel = function(){
    this.splitNum = 4;
    this.lineMaxlength = 8;
    this.lineMinLength = 3;
    this.danwei = "℃";
    this.MaxNum = 100;
    this.MinNum = 0;
    this.bgColor = 'rgb(3,3,195)';
    this.fontColor = 'rgb(3,3,195)';
    this.SplitfontSize =  '16';
    this.fontSize = '30';
    this.fontWeight = 'bold';
    this.SplitfontWeight = 'bold';
    this.fontFamily = 'Arial';
    this.SplitfontFamily = 'Arial';
    this.SplitfontColor = '#666';
    this.background = 'transparent';
    this.img1 = new Image();
    this.img1.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAMAAACo9wirAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAHRUExURQAAAN7e3t/f3+Hh4QAAANXV1fr6+gAAAAAAAAAAAOTk5OTk5Orq6vDw8O/v7+zs7Pn5+dzc3Nra2srKyvDw8Ovr6+Xl5eXl5e7u7pubm5KSkpSUlOfn56SkpODg4NfX1+Li4uzs7O3t7czMzLa2tuTk5ODg4OPj47q6uqamprS0tJWVlZCQkOnp6dbW1vLy8tfX19/f35GRkdPT09TU1PHx8d7e3ra2ttTU1NjY2NnZ2dbW1rm5uc/Pz6GhoZeXl5eXl9DQ0O/v756enpmZmd3d3aGhoZubm9LS0ri4uM7Ozqmpqbi4uJmZmZWVlaWlpZiYmODg4KOjo5aWlpWVlZaWlp2dnaCgoJiYmObm5pqamvPz8/v7+7W1tbe3t9jY2Obm5qenp+rq6u3t7bOzs5aWlu7u7peXl5GRkZKSkpiYmNLS0uPj4+Hh4eXl5dXV1dXV1bu7u+zs7Le3t83NzaSkpMvLy5SUlLW1tZqamqKiopeXl+3t7ZmZmeLi4tHR0ZSUlKKioqOjo+jo6N3d3dHR0bm5ueHh4dbW1unp6ePj48nJyd7e3rKyspOTk+vr65WVlePj45ycnKioqJycnJOTk5ycnJ+fn9fX1+bm5rS0tK7eUdYAAACbdFJOUwaVrIQBfbIOGgCBsp2UlZ2ylZR+lYylsox8foClh6yUhIyVfnqlgbKMenp+fp16lIGEgHp6lKyMgZSUgXp+eoCEepSHhJWHhIGMfnp6fHx6fIR6foCEh4eEpYSUsoyMgbJ6jIx6fJV8foCAeoGBgXqBjJV6fnp+fHp8en6dgIF6hIeHpayBjKyUjIR+hHp+nYSlhHp8gIeHeoGMqJEVNgAAAU1JREFUOMudyuc7AgEcAOCrQ4lImYWsohQqI4VCtsxIyMresnf23ttfy9313FPdr656P79IBMJiR47xR9euzg4SU2+rq9re9w9fM75/hoYZbBYSjVBDGhaKluGQRYQmKGSmx7tD7zwUCgKGFH4JGd6IwCmOAkNr+3gQwUATCg2D9GEFDo7/IMPCKRziHOjGumw36JDgEXT6S6aNDBbTSSmnDArZaG6ezBxOiNHpW5i2J3d4tJgawwrJsXjoNAtFgUOXUDRACZWrPkGzyA01jHgFq5+QhG7tbMJBi4VpPMwIRUar5iiIwABCt0DeAwaxtsIrfC0scXnUkIOHqdkPYz0UJGSYA0O5R+jzDfniZiKoBPI9PBxLgaAkQoeCNqihYMfChEowWYOF/lppHa/Bf3gOPVxf2M8lSicethVqFxhelM6b+7sHf+HXK3yS4Q92WsxaqQ/LugAAAABJRU5ErkJggg==";
    //绘制球部
   	this.img=new Image();
    this.img.src="data:image/png;base64,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";
    this.current = '';
    this.timer = null;
}
canvasPanel.prototype.init =function(canvasId){
    var $this = this;
    //放大缩小的比例
    $this.nowWidth = $('#'+canvasId).width();
    $this.nowHeight = $('#'+canvasId).height();
    if($('#'+canvasId).find('canvas').length>0){
    	$('#'+canvasId).empty();
    }
    $('#'+canvasId).append('<canvas width='+$this.nowWidth+'px height='+$this.nowHeight+'px style="background:'+$this.background+';margin-left: 20px;"></canvas>');
    $this.myCanvas = $('#'+canvasId).find('canvas')[0];
    $this.context = $this.myCanvas.getContext('2d');
    //放大缩小的倍数
   	$this.times = Math.min((this.nowWidth/100),(this.nowHeight/220)).toFixed(2);
   	$this.splitHeight = (128/$this.splitNum).toFixed(2);

   	$this.SplitFontSize =  Math.round(12*$this.times);
    $this.ValueFontSize = Math.round(16*$this.times);
    //清空画布
    $this.context.clearRect(0,0,$this.myCanvas.offsetWidth,$this.myCanvas.offsetHeight);
    
    //绘制圆顶
    var img2 = new Image();
    img2.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAMAAAD/lpwuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAAAAAAOfn55mZmQAAAAAAAODg4AAAAAAAAAAAAJqamu/v79ra2tTU1AAAAAAAAAAAAAAAAN3d3QAAAJycnObm5u7u7vr6+vb29v39/ebm5v////Hx8fDw8OLi4t7e3ujo6NPT093d3czMzLi4uMbGxtra2snJydra2rq6uqmpqdXV1ebm5qSkpJ2dne3t7bOzs+fn58vLy+Pj46ampu3t7bm5uc7OzuHh4efn59zc3Jubm93d3e3t7fDw8N7e3tDQ0L6+vq2trZeXl+/v7+fn5+Li4uzs7LCwsO/v78PDw+7u7paWlqKiotXV1cfHx83NzfDw8NnZ2ZWVlaioqNLS0vX19ba2tvT09Orq6ufn55aWlp6enujo6EBAQJ2dneHh4fz8/LCwsPb29uvr67y8vOfn5/b29qGhoaysrJOTk/z8/P39/aenp/39/erq6vT09Nzc3NDQ0Ozs7Pb29rS0tMbGxp+fn/f39/v7+93d3e7u7r6+vufn597e3vT09Ozs7N/f38XFxenp6ff399/f3+jo6NXV1evr6+Li4uXl5dHR0QAAAOrq6unp6fb29t/f3+3t7b6+vuLi4vPz8/Hx8ebm5vn5+d/f3+zs7MLCwvX19eHh4fHx8fz8/N7e3vf398HBwcrKylNTU/j4+Orq6t/f3+fn5+Xl5efn5+rq6vLy8tzc3PPz8/Hx8eLi4vPz81FRUaSkpPT09P7+/q+vr+/v7/Dw8MTExPb29ry8vPf39/v7+9PT0/Hx8dHR0fn5+dbW1v///+vr6/r6+vn5+b6+vvv7+/n5+fn5+e7u7tTU1Nvb2+bm5szMzP7+/tra2sfHx/Ly8uXl5fHx8fn5+fz8/Pr6+s3Nzfj4+P39/fX19f39/f///9jY2P39/f7+/vv7+9/f3/39/f////z8/P39/f7+/vLy8szMzN/f39LS0tXV1fPz88fHx/z8/OHh4dnZ2e7u7qOjo+Li4svLy/n5+dzc3Pb29ufn59HR0fPz8+vr66enp+3t7dfX15XLNo4AAAEAdFJOUwAFfoIECYABAgOEvIS3BxMGD6sMirG3xpvIkMrLyZqFu5N8fX+Afn+ifX6Ap4F/rYF+nX9/tpimgruzgIK/tLyuoJSDxMHDx5zCqcaFkIOyh8q+h5mEwaXJvZGJho0DiGG0oZeEK4GWEYgTsriKv4PNejWFx4SHkp7Le8ithXvFtoiJj7KWSB2xjp5HCLJkrYWOj3WluZexeYiLxJe8zH61jYkSpaRnpYC+tM2DpIuFkwKFssyZnJd9uaS3yHw4eb2CyJyjzHnPjdMtq4u3gp1QfLKbxbbJoJOwuxm1j6Ko05gPe56Lk6uSiaCSjc1Fz7KQqhyrktqo2KqY1romyp6WFuYtAAABaElEQVQY02NggAP224/vvP/2Q+aP/F92BkzA/ujpA+lbNz/9FLX891vuM7oSdvZT1ySfP3n4Quqj4q//X2TfvtuIooSdY9/xq9ef3b1/oOSKwveviq/ETl6IY0eWbxffLHHi/CFp8TDusx+EXr65fOloEQc7Qp6xf+q2dUe2VEa4uwXxnr73+tyZwzt3Z8BVcLC01S9t3jCvQMbb1Z7Xv2bXjYsHpdbu6WPhgBrA2TOlY1rtgtWBLraWVg5e4Ulbj+1dv316SxYnxAgOgcWzl3eukK325DYVFTJ39Agp37SfbeKSa6kCYCPYWVi753Y18qyMFLPT19EwMnPyjRbZMX9mRV4CKwvICA5G4WUNchMWzQrgsWDTVjXQZfYJFimtK5bISRNmBBnBwSc4edUc+YVNoTaGxmrqKibWzlzxmVUpyYmxgnwgBZys/DN6W9dMKvNjMzRUUtbU0mPmisktzE/PjuJn5WQAAIgGg9K7lH0mAAAAAElFTkSuQmCC";
    img2.onload=function(){
        $this.context.drawImage(img2,52*$this.times,0,34*$this.times,12*$this.times);
    }
    
    if($this.img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
	  	$this.paintBottom();//绘制柱体,水银球和底座，刻度
        $this.paintFont();
        $this.paintNowValue($this.current);
        $this.paintSplit();
	   	return false; // 直接返回，不用再处理onload事件
    }
    $this.img.onload = function(){
        $this.paintBottom();
        $this.paintFont();
        $this.paintNowValue($this.current);
        $this.paintSplit();
    }
}
//绘制刻度值
canvasPanel.prototype.paintFont = function (){
        var $this = this;
        $this.value = (($this.MaxNum-$this.MinNum)/$this.splitNum).toFixed(2);
        var fontStyle = $this.SplitfontWeight+' '+Math.round($this.SplitfontSize*$this.times)+'px '+$this.SplitfontFamily;
        //设置字体样式
        $this.context.font = fontStyle;
        //设置字体填充颜色
        $this.context.fillStyle = $this.SplitfontColor;
        //从坐标点(50,50)开始绘制文字
        for(var i=0;i<=$this.splitNum;i++){ 
        	var zhi = ($this.MaxNum-$this.value*i).toFixed(1);
            $this.context.fillText(zhi+$this.danwei, 0*$this.times, (18+$this.splitHeight*i)*$this.times);
        }  
}
//绘制刻度
canvasPanel.prototype.paintSplit = function(){
    var $this = this;
    var smallSplit = ($this.splitHeight/5).toFixed(2);
    for(var i=0;i<$this.splitNum;i++){
        $this.context.strokeStyle='#000';
        $this.context.lineWidth=1;
        $this.context.lineCap='square';
        $this.context.beginPath();
        $this.context.moveTo(60*$this.times,(13+$this.splitHeight*i)*$this.times);
        $this.context.lineTo((60+$this.lineMaxlength)*$this.times,(13+$this.splitHeight*i)*$this.times);
        $this.context.stroke();
        $this.context.closePath();
        for(var j=1;j<5;j++){
            $this.context.beginPath();
            $this.context.moveTo(60*$this.times,(13+$this.splitHeight*i+smallSplit*j)*$this.times);
            $this.context.lineTo((60+$this.lineMinLength)*$this.times,(13+$this.splitHeight*i+smallSplit*j)*$this.times);
            $this.context.stroke();
            $this.context.closePath();
        }
    }
}
//绘制柱体和球部
canvasPanel.prototype.paintBottom = function(){
	var $this=this;
	$this.context.clearRect(45*$this.times,12*$this.times,48*$this.times,183*$this.times);
	if(!$this.img1.complete){
    	$this.img1.onload=function(){
	        $this.context.drawImage($this.img1,52*$this.times,13*$this.times,34*$this.times,130*$this.times);
	    }
    }else{
    	$this.context.drawImage($this.img1,52*$this.times,13*$this.times,34*$this.times,130*$this.times);//水银柱背景部分
    }
	$this.context.drawImage($this.img,45*$this.times,143*$this.times,48*$this.times,52*$this.times);//绘制水银球体部分
        
    $this.context.beginPath(); 
    $this.context.fillStyle=$this.bgColor;/*设置水银柱填充颜色*/ 
    $this.context.fillRect(60*$this.times,142*$this.times,19*$this.times,12*$this.times);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/
    $this.context.closePath(); 

    var g1 = $this.context.createRadialGradient(65*$this.times,160*$this.times,0,65*$this.times,164*$this.times,12*$this.times);  
    g1.addColorStop(0.1, 'rgb(220,220,220)');    
    g1.addColorStop(1, $this.bgColor);  //球体背景色
    $this.context.fillStyle = g1;  
    $this.context.beginPath();  
    $this.context.arc(69*$this.times,167*$this.times,17*$this.times,0, Math.PI * 2, true);  
    $this.context.closePath();  
    $this.context.fill();  
}
//绘制当前值及条形柱值
canvasPanel.prototype.paintNowValue = function (num){
    var $this=this;
    if(num>$this.MaxNum){
        num = $this.MaxNum;
    }else if(num<$this.MinNum){
        num = $this.MinNum;
    }
    //当前值所在位置百分比
    var percentage = (num-$this.MinNum)/($this.MaxNum-$this.MinNum);
   
    var mHeight = Math.round((141-13)*$this.times * percentage); 
    $this.context.clearRect(45*$this.times,12*$this.times,48*$this.times,131*$this.times);
    $this.context.clearRect(0,195*$this.times,$this.nowWidth,40*$this.times);
        
    $this.context.drawImage($this.img1,52*$this.times,12*$this.times,34*$this.times,131*$this.times);
    
    $this.context.beginPath(); 
	$this.context.fillStyle=$this.bgColor;/*设置填充颜色*/ 
    $this.context.fillRect(59*$this.times,(141*$this.times-mHeight),20*$this.times,10*$this.times+mHeight);//绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高
    $this.context.closePath();
    $this.paintSplit();

    //设置字体样式
    var fontStyle = $this.fontWeight+' '+'16px '+$this.fontFamily;
    $this.context.font = fontStyle;
    //设置字体填充颜色
    $this.fontColor = 'white';
    $this.context.fillStyle = $this.fontColor;
    //从坐标点(50,50)开始绘制文字
    $this.context.fillText(num,50*$this.times,215*$this.times);
}