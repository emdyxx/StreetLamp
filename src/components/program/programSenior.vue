<template>
    <div class="programSenior">
        <div class="programSenior_left">
            <div class="programSenior_left_top">
                媒体分组
            </div>
            <div class="programSenior_left_bottom">
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="background-color: #d9edf7;">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" 
                                    href="#collapseOne" class="a_style">
                                    图片
                                </a>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body" style="max-height:650px;overflow:auto;">
                                <ul style="list-style:none;padding: 0;">
                                    <li v-for="item in mediatableData" :key=item.id :id=item.id class="programSimple_li">
                                        <el-button type="danger" icon="el-icon-delete" size='small' style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></el-button>
                                        <span @dragstart="dragstart" draggable="true" :id='item.id'>{{item.nickName}}</span>
                                    </li>
                                </ul>
                                <el-pagination
                                    background
                                    @current-change="currentchange"
                                    :current-page="mediaIndex"
                                    :pager-count="5"
                                    :page-size='mediaSize'
                                    layout="prev, pager, next"
                                    :total='mediaTotal'>
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" style="background-color: #d9edf7;">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" 
                                    href="#collapseTwo" class="a_style">
                                    视频
                                </a>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse">
                            <div class="panel-body" style="max-height:750px;overflow:auto;">
                                <ul style="list-style:none;">
                                    <li v-for="item in mediatableData2" :key=item.id :id=item.id class="programSimple_li">
                                        <el-button type="danger" icon="el-icon-delete" size='small' style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></el-button>
                                        <span @dragstart="dragstart2" draggable="true" :id='item.id'>{{item.nickName}}</span>
                                    </li>
                                </ul>
                                <el-pagination
                                    background
                                    @current-change="currentchange2"
                                    :current-page="mediaIndex2"
                                    :pager-count="5"
                                    :page-size='mediaSize2'
                                    layout="prev, pager, next"
                                    :total='mediaTotal2'>
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="programSenior_center">
            <div class="programSenior_center_top">
                <div class="heading_top">
                    <span>时间轴</span>
                </div>
                <div class="heading_bottom">
                    <div class="heading_bottom_01">
                        <div class="heading_bottom_01_left">
                            <el-button @click="operation(0)" type="primary" icon="el-icon-plus" size="small">1层</el-button>
                            <div>
                                <div class="left_margin_top">
                                    <div v-for="(item,index) in timeData" :key=item.id>
                                        <span style="padding-right:15px;">{{index+1}}</span>
                                        <el-button @click="operation(1,index)" type="warning" size='mini' icon="el-icon-close" style="padding: 5px;"></el-button>
                                        <el-button @click="operation(2,index)" size='mini' icon="el-icon-refresh" style="padding: 5px;"></el-button>
                                        <el-button @click="operation(3,index)" type="success" size='mini' icon="el-icon-arrow-up" style="padding: 5px;"></el-button>
                                        <el-button @click="operation(4,index)" type="primary" size='mini' icon="el-icon-arrow-down" style="padding: 5px;"></el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div @click="right_click" class="heading_bottom_01_right" id="container"> 
                            <p class="axis"></p>
                            <div class="time"></div>
                            <div class="time2"></div>
                            <div id="container2">
                                <div v-for="(item,index) in timeData" :key=item.id class="time3">
                                    <div @drop.prevent="drop" @dragover.prevent class="time3_div sortable" :id=index>
                                        <div v-for="(item2,index2) in item.site" :key=item2.id :id=index2
                                        :style="`width:${item2.timeSpan*10}px;left:${item2.playTime*10}px;opacity:${item2.opacity};z-index:${item2.zIndex}`" 
                                        @mousedown="AboutSlide1"
                                        :class="item2.mediaType=='1' ? 'draggable' : 'resizable draggable'"> 
                                            {{item2.nickName}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="programSenior_center_bottom">
                <div class="view_top">
                    视图
                    <el-button @click="scale(0)" type="primary" size="mini" icon="el-icon-plus" style="padding: 5px;margin-left:20px;"></el-button>
                    <el-button @click="scale(1)" type="primary" size="mini" icon="el-icon-minus" style="padding: 5px;"></el-button>
                    ({{scaleLevel*100}}%)
                </div>
                <div class="view_bottom">
                    <div class="view_bottom_div">
                        <template v-for="(item,key2) in timeData">
                            <template v-for="(item2,index2) in item.site">
                                <div :key=key2 v-if="item2.display=='1'" :i=key2 :j=index2
                                 :style="`position:absolute;left:${item2.marginLeft}px;top:${item2.top}px;width:${item2.width}px;height:${item2.height}px;z-index:${item2.zIndex}`"
                                 class="viewDraggable viewResizable" :id="item2.zIndex=='2' ? 'viewborder' : ''" >
                                    <img :src=serverurl+item2.mediaUrl alt="" style="width:100%;height:100%;">
                                </div>
                            </template>    
                        </template>
                        <!-- <template v-for="(item,index) in timeData" style="height:100%;">
                            <div v-for="(item2,index2) in item.site" :key='index' v-if="item2.display=='1'"
                             :style="`position:absolute;width:${item2.width}px;height:${item2.height}px;z-index:${item2.zIndex}`" 
                             class="viewDraggable viewResizable" :id="item2.zIndex=='2' ? 'viewborder' : ''" :key=index2>
                                    <img :src=serverurl+item2.mediaUrl alt="" style="width:100%;height:100%;">
                            </div>
                        </template> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="programSenior_right">
            <div class="programSenior_right_top">
                <ul id="myTab" class="nav nav-tabs">
                    <li class="active">
                        <a>节目属性</a>
                    </li>
                </ul>
                <div style="padding-top:10px;">
                    <el-input placeholder="节目名" size="small" style="width:126px;"></el-input>
                    <el-input v-model=width placeholder="宽" size="small" :disabled="true" style="width:126px;margin-left:5px;">
                        <template slot="prepend">宽</template>
                    </el-input>
                    <el-input v-model=height placeholder="高" size="small" :disabled="true" style="width:126px;margin-left:5px;">
                        <template slot="prepend">高</template>
                    </el-input>
                    <el-button type="primary" size="small" style="margin:10px 10px 0 0;">保存</el-button>
                    <el-button type="primary" size="small" style="margin:10px 10px 0 0;">保存并退出</el-button>
                </div>
            </div>
            <div class="programSenior_right_bottom">
                <ul id="myTab" class="nav nav-tabs">
                    <li class="active">
                        <a>所选素材信息</a>
                    </li>
                </ul>
                <div class="programSenior_right_bottom_div">
                    <div>
                        名称
                        <el-input placeholder="名称" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        类型
                        <el-input placeholder="类型" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        距左
                        <el-input placeholder="距左" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        距右
                        <el-input placeholder="距右" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        距顶
                        <el-input placeholder="距顶" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        宽度
                        <el-input placeholder="宽度" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        高度
                        <el-input placeholder="高度" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        开始
                        <el-input placeholder="开始" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        持续
                        <el-input placeholder="持续" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        入场特效
                        <el-select v-model="value" size="small" placeholder="请选择" style="width:196px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        入场时间
                        <el-input placeholder="持续" size="small" style="width:196px;"></el-input>
                    </div>
                    <div>
                        出场特效
                        <el-select v-model="value" size="small" placeholder="请选择" style="width:196px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        出场时间
                        <el-input placeholder="持续" size="small" style="width:196px;"></el-input>
                        <el-button type="warning" size="small">移除</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {time} from '../../assets/js/time'
import {myScript} from '../../assets/js/time'
export default {
    name: 'programSenior',
    data () {
        return {
            serverurl:localStorage.serverurl,
            width:sessionStorage.width,
            height:sessionStorage.height,
            mediatableData:[],
            mediaIndex:1,
            mediaSize:10,
            mediaTotal:10,
            mediatableData2:[],
            mediaIndex2:1,
            mediaSize2:10,
            mediaTotal2:10,
            timeData:[{site:[]}],
            moveData:{},
            scrollLeft:'',//滚轮滑动距离
            options:[
                {
                value: '0',
                label: '黄金糕'
                }, {
                value: '1',
                label: '双皮奶'
                }, {
                value: '2',
                label: '蚵仔煎'
                }, {
                value: '3',
                label: '龙须面'
                }, {
                value: '4',
                label: '北京烤鸭'
                }
            ],//特效
            value:'',
            scaleLevel:1,//视图缩放级别
        }
    },
    mounted(){
        var that = this
        time($('.time2'),20)
        document.getElementById('container').onscroll = function(e) {
            myScript(e.target.scrollLeft,$('.time'),$('.time2'),$('.time3'));
            that.scrollLeft = e.target.scrollLeft
            if(e.target.scrollLeft>1500){
                time($('.time2'),e.target.scrollLeft/45)
            }else if(e.target.scrollLeft<100){
                time($('.time2'),20)
            }
        };
        document.getElementById('container2').onscroll = function(e){
            $('.left_margin_top').css('margin-top','-'+e.target.scrollTop+'px')
        };
        //设置下侧视图的宽高
        $('.view_bottom_div').css({
            "transform":'scale('+that.scaleLevel+')',
            'width':that.width*that.scaleLevel+'px',
            'height':that.height*that.scaleLevel+'px'
        })
    },
    methods:{
        //获取左侧媒体文件
        mediaready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/media/getMediaList/'+that.mediaIndex+'/'+that.mediaSize,
                data:{
                //    page:that.mediaIndex,
                //    rows:that.mediaSize,
                   audit:'1',
                   mediaType:'0',
                   nickName:'',
                   projectId:'1'
                //    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediatableData = data.result.list
                        that.mediaTotal = data.result.total
                        for(let i=0;i<that.mediatableData.length;i++){
                            that.mediatableData[i].entryEffect = 'None'
                            that.mediatableData[i].entryEffectTimeSpan =  0
                            that.mediatableData[i].exitEffect = 'None'
                            that.mediatableData[i].exitEffectTimeSpan =  0
                            that.mediatableData[i].width = sessionStorage.width/2
                            that.mediatableData[i].height = sessionStorage.height/2
                            that.mediatableData[i].layer = 0
                            that.mediatableData[i].marginLeft = 0
                            that.mediatableData[i].mediaId = 0
                            that.mediatableData[i].programId = 0
                            that.mediatableData[i].repeatPlay = true
                            that.mediatableData[i].rollDirection = 0
                            that.mediatableData[i].sort = 0
                            that.mediatableData[i].speed = 0
                            that.mediatableData[i].textMsg = ''
                            that.mediatableData[i].top = 0
                            that.mediatableData[i].type = 0
                            that.mediatableData[i].timeLeft = 0
                            that.mediatableData[i].playTime = 0
                            that.mediatableData[i].zIndex = 1
                            that.mediatableData[i].opacity = 0.5
                            that.mediatableData[i].display = '0'
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/media/getMediaList/'+that.mediaIndex2+'/'+that.mediaSize2,
                data:{
                //    page:that.mediaIndex2,
                //    rows:that.mediaSize2,
                   audit:'1',
                   mediaType:'1',
                   nickName:'',
                   projectId:'1'
                //    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediatableData2 = data.result.list
                        that.mediaTotal2 = data.result.total
                        for(let i=0;i<that.mediatableData2.length;i++){
                            that.mediatableData2[i].entryEffect = 'None'
                            that.mediatableData2[i].entryEffectTimeSpan =  0
                            that.mediatableData2[i].exitEffect = 'None'
                            that.mediatableData2[i].exitEffectTimeSpan =  0
                            that.mediatableData2[i].width = sessionStorage.width/2
                            that.mediatableData2[i].height = sessionStorage.height/2
                            that.mediatableData2[i].layer = 0
                            that.mediatableData2[i].marginLeft = 0
                            that.mediatableData2[i].mediaId = 0
                            that.mediatableData2[i].programId = 0
                            that.mediatableData2[i].repeatPlay = true
                            that.mediatableData2[i].rollDirection = 0
                            that.mediatableData2[i].sort = 0
                            that.mediatableData2[i].speed = 0
                            that.mediatableData2[i].textMsg = ''
                            that.mediatableData2[i].top = 0
                            that.mediatableData2[i].type = 0
                            that.mediatableData2[i].timeLeft = 0
                            that.mediatableData2[i].playTime = 0
                            that.mediatableData2[i].zIndex = 1
                            that.mediatableData2[i].opacity = 0.5
                            that.mediatableData2[i].display = '0'
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        currentchange(val){this.mediaIndex = val;this.mediaready()},
        currentchange2(val){this.mediaIndex2 = val;this.mediaready()}, 
        //添加,删除,刷新,上移,下移, 层级操作
        operation(val,index){
            if(val=='0'){
                this.timeData.push({site:[]})
            }
            if(val=='1'){
                this.timeData.splice(index,1)
            }
            if(val=='2'){}
            if(val=='3'){
                let data = this.timeData[index]
                if(index=='0'){
                    return;
                }
                this.timeData.splice(index,1)
                this.timeData.splice(index-1,0,data)
            }
            if(val=='4'){
                let data = this.timeData[index]
                if(index==this.timeData.length-1){
                    return;
                }
                this.timeData.splice(index,1)
                this.timeData.splice(index+1,0,data)
            }
        },
        //左侧媒体拖拽事件(图片)
        dragstart (e) {
            for(var i=0;i<this.mediatableData.length;i++){
                if(e.target.id==this.mediatableData[i].id){
                    this.moveData = this.mediatableData[i]
                }
            }
        },
        //左侧媒体拖拽事件(视频)
        dragstart2(e){
            for(var i=0;i<this.mediatableData2.length;i++){
                if(e.target.id==this.mediatableData2[i].id){
                    this.moveData = this.mediatableData2[i]
                }
            }
        },
        //拖拽到右侧放下事件
        drop (e) {
            var that = this
            e.stopPropagation(); 
            console.log('鼠标抬起')
            for(let i = 0;i<this.timeData[Number(e.target.id)].site.length;i++){
                if(this.timeData[Number(e.target.id)].site[i].id == this.moveData.id){
                    return
                }
            }
            if(this.timeData[Number(e.target.id)].site.length>=1){
                var S = this.timeData[Number(e.target.id)].site.length-1
                this.moveData.playTime = Number(this.timeData[Number(e.target.id)].site[S].timeSpan)+Number(this.timeData[Number(e.target.id)].site[S].playTime)
            }
            this.timeData[Number(e.target.id)].site.push(JSON.parse(JSON.stringify(this.moveData)))
            setTimeout(() => {
                $('.resizable').resizable({ 
                    handles: 'e',
                    autoHide:true,//类型BOOLEAN，是否隐藏右下角的缩放块，true则隐藏，在缩放的时候显示
                    ghost:false,//类型BOOLEAN， 阴影缩放，待手标松开时，才缩放到和阴影大小的位置
                    minHeight:31,
                    maxHeight:31,
                    zIndex:31,
                    grid:[ 10, 0 ],
                    stop:function( e, ui ) {
                        that.timeData[e.target.offsetParent.id].site[e.target.id].timeSpan = (ui.size.width+2)/10
                        var t = Number(e.target.id)
                        var t2 = e.target.offsetParent.id
                        if(t == that.timeData[t2].site.length-1){return;}
                        if(that.timeData[t2].site[t+1].mediaType=='1'){
                            if(that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan>that.timeData[t2].site[t+1].playTime){
                                for(var i = t+1;i<that.timeData[t2].site.length;i++){
                                    that.timeData[t2].site[i].playTime = that.timeData[t2].site[i-1].playTime+that.timeData[t2].site[i-1].timeSpan
                                }
                            }
                        }
                        if(that.timeData[t2].site[t+1].mediaType=='0'){
                            if(that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan>that.timeData[t2].site[t+1].playTime){
                                for(var i = t+1;i<that.timeData[t2].site.length;i++){
                                    var w = that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan - that.timeData[t2].site[i].playTime
                                    if(that.timeData[t2].site[i].mediaType=='0'){
                                        that.timeData[t2].site[i].playTime = that.timeData[t2].site[i-1].playTime+that.timeData[t2].site[i-1].timeSpan
                                        that.timeData[t2].site[i].timeSpan = that.timeData[t2].site[i].timeSpan - w
                                    }
                                    if(that.timeData[t2].site[i].mediaType=='1'){
                                        that.timeData[t2].site[i].playTime = that.timeData[t2].site[i-1].playTime+that.timeData[t2].site[i-1].timeSpan
                                    }
                                    if(that.timeData[t2].site[i].timeSpan<=0){
                                        that.timeData[t2].site.splice(i,1)
                                        i--
                                    }
                                }
                            }
                        }
                    },//拖拽结束后触发
                    resize: function( e, ui ) {
                        //监测像右拖拽

                    }//拖拽过程中触发
                });
                $( ".draggable" ).draggable({
                    axis:'x',
                    containment:'parent',
                    grid:[10,0],
                    drag:function( e, ui ){
                        var t = Number(e.target.id)
                        var t2 = e.target.offsetParent.id
                        // 向右拖拽
                        if(ui.originalPosition.left<ui.position.left){
                            that.timeData[t2].site[t].playTime = ui.position.left/10
                            if(t==that.timeData[t2].site.length-1){
                                return
                            }
                            if(that.timeData[t2].site[t+1].mediaType=='1'){
                                if(that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan>that.timeData[t2].site[t+1].playTime){
                                    var w = that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan - that.timeData[t2].site[t+1].playTime
                                    that.timeData[t2].site[t].timeSpan =  that.timeData[t2].site[t].timeSpan - w
                                    if(that.timeData[t2].site[t].timeSpan<=0){
                                        that.timeData[t2].site.splice(t,1)
                                    }
                                }
                            }
                            if(that.timeData[t2].site[t+1].mediaType=='0'){
                                if(that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan>that.timeData[t2].site[t+1].playTime){
                                    var w = that.timeData[t2].site[t].playTime+that.timeData[t2].site[t].timeSpan - that.timeData[t2].site[t+1].playTime
                                    that.timeData[t2].site[t+1].playTime =  that.timeData[t2].site[t+1].playTime + w
                                    that.timeData[t2].site[t+1].timeSpan =  that.timeData[t2].site[t+1].timeSpan - w
                                    console.log(that.timeData[t2].site[t+1].playTime,that.timeData[t2].site[t+1].timeSpan)
                                    if(that.timeData[t2].site[t+1].timeSpan<=0){
                                        that.timeData[t2].site.splice(t+1,1)
                                    }
                                }
                            }
                        }
                        //像左拖拽
                        if(ui.originalPosition.left>ui.position.left){
                            that.timeData[t2].site[t].playTime = ui.position.left/10
                            if(t==0){return;}
                            if(that.timeData[t2].site[t-1].mediaType=='1'){
                                if(that.timeData[t2].site[t].mediaType=='1'){
                                    return;
                                }
                                if(that.timeData[t2].site[t].playTime<that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan){
                                    var w = that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan - that.timeData[t2].site[t].playTime
                                    that.timeData[t2].site[t].playTime = that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan
                                    that.timeData[t2].site[t].timeSpan = that.timeData[t2].site[t].timeSpan - w
                                    if(that.timeData[t2].site[t].timeSpan<=0){
                                        that.timeData[t2].site.splice(t,1)
                                    }
                                }
                            }
                            if(that.timeData[t2].site[t-1].mediaType=='0'){
                                if(that.timeData[t2].site[t].playTime<that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan){
                                    var w = that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan - that.timeData[t2].site[t].playTime
                                    that.timeData[t2].site[t-1].timeSpan = that.timeData[t2].site[t-1].timeSpan-w
                                    if(that.timeData[t2].site[t-1].timeSpan<=0){
                                        that.timeData[t2].site.splice(t-1,1)
                                    }
                                }
                            }
                        }
                    },//拖拽过程中触发
                    stop: function( e, ui ) {
                        var t = Number(e.target.id)
                        var t2 = e.target.offsetParent.id
                        if(ui.originalPosition.left>ui.position.left){
                            that.timeData[t2].site[t].playTime = ui.position.left/10
                            if(t==0){return;}
                            if(that.timeData[t2].site[t-1].mediaType=='1'){
                                if(that.timeData[t2].site[t].mediaType=='1'&&that.timeData[t2].site[t].playTime<that.timeData[t2].site[t-1].playTime+that.timeData[t2].site[t-1].timeSpan){
                                    that.timeData[t2].site[t].playTime = ui.originalPosition.left/10
                                }
                            }
                        }
                    }//拖拽结束时触发
                });
            }, 20); 
        },
        //时间轴媒体鼠标按下事件
        AboutSlide1(e){
            e.stopPropagation(); 
            // 改变点击媒体的背景颜色以及z-index等级
            for(var i=0;i<this.timeData.length;i++){
                for(var j = 0;j<this.timeData[i].site.length;j++){
                    if(i==e.target.offsetParent.id&&j==e.target.id){
                        this.timeData[i].site[j].zIndex = '2'
                        this.timeData[i].site[j].opacity = '1'
                    }else{
                        this.timeData[i].site[j].zIndex = '1'
                        this.timeData[i].site[j].opacity = '0.5'
                    }
                }
            }
        },
        //右侧点击时间轴红线移动
        right_click(e){
            var left = String(e.clientX-450+this.scrollLeft)
            var array = left.split('')
            if(array[array.length-1]<5){
                array[array.length-1] = 0
                left = array.join('')
            }
            if(array[array.length-1]>=5){
                array[array.length-1] = 0
                left = Number(array.join(''))+10
            }
            $('.axis').css('left',left+'px')
            this.time()
        },

        //视图放大缩小
        scale(val){
            var that = this
            if(val=='0'){
                this.scaleLevel = this.scaleLevel+0.5
            }
            if(val=='1'){
                if(this.scaleLevel==0.25){return;}
                if(this.scaleLevel==0.5){
                    this.scaleLevel = this.scaleLevel-0.25
                }else{
                    this.scaleLevel = this.scaleLevel-0.5
                }
                
            }
            $('.view_bottom_div').css({
                "transform":'scale('+that.scaleLevel+')',
                // 'width':that.width*that.scaleLevel+'px',
                // 'height':that.height*that.scaleLevel+'px'
            })
        },
        //判断指针所在的的时间,显示对应时间段的媒体
        time(){
            var that = this;
            var left = $('.axis').css('left').split('px')
            left = Number(left[0])/10
            for(var i = 0;i<that.timeData.length;i++){
                for(var j = 0;j<that.timeData[i].site.length;j++){
                    var playTime = that.timeData[i].site[j].playTime
                    var timeSpan = that.timeData[i].site[j].timeSpan
                    if(left>=playTime&&playTime+timeSpan>=left){
                        that.timeData[i].site[j].display = '1'
                    }else{
                        that.timeData[i].site[j].display = '0'
                    }
                }
            }
            setTimeout(() => {
                // 视图图片拖拽改变位置
                $('.viewDraggable').draggable({
                    containment:'parent',
                    stop:function( e, ui ){
                        that.timeData[e.target.attributes.i.value].site[e.target.attributes.j.value].marginLeft = ui.position.left
                        that.timeData[e.target.attributes.i.value].site[e.target.attributes.j.value].top = ui.position.top
                    },
                })
            }, 20);
        },
    },
    created(){
        this.mediaready()
    },
}
</script>
<style scoped>
.programSenior{width: 100%;height:100%;padding: 10px;display: flex;position: relative;}
.programSenior_left{width: 220px;position: relative;}
.programSenior_left_top{width: 100%;height: 43px;border-radius: 5px;background: #428bca;color: white;line-height: 43px;padding-left: 10px;font-size: 14px;}
.programSenior_left_bottom{position: absolute;top: 53px;width:100%;}
.a_style{text-decoration: none;display: inline-block;width:100%;}
.programSimple_li{padding-bottom: 10px;position: relative;}
.programSimple_li>span{position: absolute;width:100px;background:#5bc0de;height:32px;color: white;line-height: 32px;text-align: center;border-top-right-radius:4px;border-bottom-right-radius:4px;cursor: pointer;}
.programSenior_center_top{position: absolute;top: 10px;left: 250px;right:440px;height: 250px;}
.heading_top{width: 100%;height: 50px;background: #d9edf7;border: 1px solid #bce8f1;border-top-left-radius: 4px;border-top-right-radius: 4px;color: #31708f;font-size: 14px;font-weight: 600;line-height: 45px;padding-left: 15px;}
.heading_bottom{position: absolute;top: 50px;bottom:0;width:100%;border: 1px solid #bce8f1;border-top: none;}
.heading_bottom_01{display: flex;position: relative;height: 100%;}
.heading_bottom_01_left{width: 200px;height: 100%;padding: 10px;overflow: hidden;position: relative;}
.heading_bottom_01_left>div{position: absolute;top: 42px;bottom: 0;overflow: hidden;}
.heading_bottom_01_left>div>div{width: 100%;height: 100%;}
.heading_bottom_01_left>div>div>div{width: 185px;height: 34px;padding-left: 15px;margin-top: 4px;line-height: 35px;}
.heading_bottom_01_right{position: absolute;left: 200px;top:10px;right:10px;bottom:0;overflow-x: auto;overflow-y: hidden;}
.heading_bottom_01_right>div:nth-of-type(3){position: absolute;top: 34px;left: 0;bottom: 0;overflow: auto;}
.axis{position: absolute;width: 2px;height: 100%;background: red;z-index: 9999;}
.time{width: 2000px;height: 15px;background:url('../../assets/time.png') repeat-x;}
.time2{width: 2000px;height: 17px;}
.time3{width:2000px;position: relative;}
.time3_div{width:100%;height:35px;border:1px solid black;background: #ddd;margin-top:3px;position: relative;}
.time3_div>div{position: absolute;background: #127592;height:31px;margin-top:1px;cursor: pointer;color: white;text-align: center;line-height: 31px;margin-left:1px;overflow: hidden;
-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border: 1px solid white;box-sizing: border-box;z-index: 1;}
.rightdrag{position: absolute;right: 0;top:0;width: 3px;height: 100%;cursor: e-resize;}
.programSenior_center_bottom{position: absolute;top: 280px;left: 250px;right: 440px;height: 400px;}
.view_top{width: 100%;height: 40px;background: #d9edf7;border: 1px solid #bce8f1;border-top-left-radius: 4px;border-top-right-radius: 4px;color: #31708f;font-size: 14px;font-weight: 600;line-height: 40px;padding-left: 15px;}
.view_bottom{position: absolute;top: 40px;bottom: 0;width: 100%;border: 1px solid #bce8f1;border-top: none;overflow: auto;display: flex;justify-content: center;align-items: center;}
.view_bottom_div{position: absolute;border: 1px solid #5bc0de;margin: 0 5px 5px 0;}
#viewborder{border: 1px dashed red;box-sizing: border-box;}

.programSenior_right{position: absolute;top:10px;right: 10px;bottom:10px;width:400px;}
.programSenior_right_top{width: 100%;height:140px;}
.programSenior_right_bottom_div>div{margin:8px 0 0 0;}


/* 滚动条样式 */
.heading_bottom_01_right::-webkit-scrollbar,
.view_bottom::-webkit-scrollbar{
    width: 5px;
    height: 10px;
}
.heading_bottom_01_right::-webkit-scrollbar-thumb,
.view_bottom::-webkit-scrollbar-thumb{
    border-radius: 5px;
    -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.heading_bottom_01_right::-webkit-scrollbar-track,
.view_bottom::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.1);
    border-radius: 0;
}
</style>

