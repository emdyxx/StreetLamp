<template>
    <div class="Mypreview">
        <div class="ElasticFrame">
            <div class="MyModal">
                <div v-if="active=='1'||active=='2'" class="MediaPreview_div_modal">
                    <template v-if="array01[index].mediaType=='0'">
                        <img :src=serverurl+array01[index].mediaUrl alt="">
                    </template>
                    <template v-if="array01[index].mediaType=='1'">
                        <video :src=serverurl+array01[index].mediaUrl controls autoplay loop></video>
                    </template>
                </div>
                <template v-if="active=='3'||active=='4'">
                    <div class="MediaPreview_div_modal" style="border-bottom:1px solid #4d4d4d;">
                        <template v-if="array01[index].mediaType=='0'">
                            <img :src=serverurl+array01[index].mediaUrl alt="">
                        </template>
                        <template v-if="array01[index].mediaType=='1'">
                            <video :src=serverurl+array01[index].mediaUrl controls autoplay loop></video>
                        </template>
                    </div>
                    <div class="MediaPreview_div_modal">
                        <template v-if="array02[index2].mediaType=='0'">
                            <img :src=serverurl+array02[index2].mediaUrl alt="">
                        </template>
                        <template v-if="array02[index2].mediaType=='1'">
                            <video :src=serverurl+array02[index2].mediaUrl controls autoplay loop></video>
                        </template>
                    </div>
                </template>
                <div v-if="active=='2'||active=='4'" class="textarea_modal">

                </div>
                <div class="top_close el-icon-close" @click="close"></div>
            </div>
        </div>
        <div class="Mask"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name:'Mypreview',
    props:{
        sendData:''
    },
    data () {
        return {
            serverurl:localStorage.serverurl,
            active:'',
            array01:[],
            array02:[],
            text:'',
            timeout:null, //第一层
            timeout2:null, //第二层
            timeout3:null, //文本层
            time:0,
            time2:0,
            index:0,
            index2:0,
        }
    },
    mounted(){
        
    },
    methods:{
        readyIntive(){
            var that = this
            this.active = this.sendData.active2
            this.array01 = this.sendData.myArray01
            this.array02 = this.sendData.myArray02
            this.text = this.sendData.myArray03.text
            console.log(this.sendData)
            if(that.array01.length!=0){
                for(let i=0;i<that.array01.length;i++){
                    if(i==0){
                        that.array01[i].playTime = 0
                    }else{
                        that.array01[i].playTime = that.array01[i-1].playTime + that.array01[i-1].timeSpan
                    }
                }
            }
            if(that.array02.length!=0){
                for(let i=0;i<that.array02.length;i++){
                    if(i==0){
                        that.array02[i].playTime = 0
                    }else{
                        that.array02[i].playTime = that.array02[i-1].playTime + that.array02[i-1].timeSpan
                    }
                }
            }
            setTimeout(() => {
                this.PreviewActive()
                this.animation()
            }, 20);
        },
        PreviewActive(){ 
            if(this.active=='1'){
                $('.MediaPreview_div_modal').css({
                    "width":'100%',
                    "height":'100%'
                })
            }
            if(this.active=='2'){
                $('.MediaPreview_div_modal').css({
                    "width":'100%',
                    "height":340+'px'
                })
            }
            if(this.active=='3'){
                $('.MediaPreview_div_modal').css('height',180+'px')
            }
            if(this.active=='4'){
                var height = (sessionStorage.height-20)/2
                $('.MediaPreview_div_modal').css('height',170+'px')
            }
        },
        animation(){
            var that = this
            this.timeout = setInterval(() =>{
                let playTime = Number(this.array01[this.index].playTime)
                let timeSpan = Number(this.array01[this.index].timeSpan)
                if(this.time>(playTime+timeSpan)){
                    if(this.index==this.array01.length-1){
                        this.index=0
                        this.time=0
                    }else{
                        this.index++
                    }
                }
                this.time++
            },1000)
            if(this.active=='3'||this.active=='4'){
                this.timeout2 = setInterval(() =>{
                    let playTime = Number(this.array02[this.index2].playTime)
                    let timeSpan = Number(this.array02[this.index2].timeSpan)
                    if(this.time2>(playTime+timeSpan)){
                        if(this.index2==this.array02.length-1){
                            this.index2=0
                            this.time2=0
                        }else{
                            this.index2++
                        }
                    }
                    this.time2++
                },1000)
            }
            if(this.active=='2'||this.active=='4'){
                $('.textarea_modal').html("<div id='RollTexts' style='position:absolute;left:0;'>"+this.text+"</div>")
                var rollWord = {
                    container:document.getElementById("RollTexts"),
                    content:document.getElementById("RollTexts"),
                    _containerWidth:1,
                    _contentWidth:1,
                    _speed:1,
                    setSpeed:function(opt){
                        var that = this;
                        that._speed = opt;
                    },
                    setContainerWidth:function(){
                        var that = this;
                        that._containerWidth = that.container.offsetWidth;
                    },
                    setContentWidth:function(){
                        var that = this;
                        that._contentWidth = that.content.offsetWidth;
                        console.log(that.content.offsetWidth)
                    },
                    roll:function(){
                        var that = this;
                        that.content.style.left = 95 + "px";
                        that.timeout3 = setInterval(function(){that.move()},20);
                        that.container.onmouseover = function(){
                            clearInterval(that.timeout3);
                        };
                        that.container.onmouseout = function(){
                            that.timeout3 = setInterval(function(){that.move()},20);
                        };
                    },
                    move:function(){
                        var that = this;
                        if(parseInt(that.content.style.left)+that._contentWidth > 0)
                        {
                            that.content.style.left = parseInt(that.content.style.left)-that._speed + "px";
                        }
                        else
                        {
                            that.content.style.left = 95 + "px";
                        }                 
                    },
                    init:function(opt){
                        var that = this;
                        var speed = opt.speed || 1;
                        that.setSpeed(speed);
                        that.setContainerWidth();
                        that.setContentWidth();
                        that.roll();
                    }
                }
                rollWord.init({speed:1});  //数值越小，滚动速度越慢。
            }
        },
        close(val){
            clearInterval(this.timeout)
            clearInterval(this.timeout2)
            clearInterval(this.timeout3)
            this.timeout = null
            this.timeout2 = null
            this.timeout3 = null
            this.time = 0;
            this.time2 = 0;
            this.index = 0
            this.index2 = 0
            this.$emit('close')
        },
    },
    created(){
        
    }
}
</script>
<style scoped>
.Mypreview{width: 100%;height: 100%;}
.ElasticFrame{position: fixed;top: 0;right: 0;bottom: 0;left: 0;display: flex;justify-content: center;z-index: 2080;}
.MyModal{
    margin-top: 20vh;width: 240px;height: 480px;background: #000;box-shadow: -0.5px 2px 20px 5px #d9dbdd;border-radius: 10px;
    border: 8px solid;border-image:url("../../../assets/img/border.png") 9 repeat;box-sizing: content-box;position: relative;
}
.top_close{position: absolute;top: -15px;right: -15px;width: 22px;height: 22px;background: white;border-radius: 50%;text-align: center;line-height: 22px;font-size: 16px;color:#4dd3c5;cursor: pointer;}

.MyModal img,.MyModal video{width: 100%;height: 100%;}
.MediaPreview_div_modal{overflow: hidden;}
.textarea_modal{position: absolute;bottom: 0;width:100%;height: 20px;line-height:20px;border-top:1px solid #4d4d4d;text-align: center;
background:black;color:white;font-size:12px;overflow:hidden;white-space:nowrap;}






.Mask{background: #000;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;opacity: .2;}
</style>
