<template>
    <!-- 高级节目 -->
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
                                        <span @dragstart="dragstart" draggable="true" :id='item.id' :title=item.nickName>{{item.nickName}}</span>
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
                                        <span @dragstart="dragstart2" draggable="true" :id='item.id' :title=item.nickName>{{item.nickName}}</span>
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
                    <div class="panel panel-default">
                        <div class="panel-heading" style="background-color: #d9edf7;">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" 
                                    href="#collapseThree" class="a_style">
                                    单行文本
                                </a>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse">
                            <div class="panel-body" style="max-height:650px;overflow:auto;">
                                <ul style="list-style:none;padding: 0;">
                                    <li class="programSimple_li" style="padding-bottom: 20px;">
                                        <span @dragstart="dragstart3" draggable="true">单行文本</span>
                                    </li>
                                </ul>
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
                                <div :key=key2 @mousedown="view_mousedown" v-if="item2.display=='1'" :a=key2 :b=index2
                                 :style="`position:absolute;left:${item2.marginLeft}px;top:${item2.top}px;width:${item2.width}px;height:${item2.height}px;z-index:${item2.zIndex}`"
                                 class="viewDraggable viewResizable" :id="item2.zIndex=='2' ? 'viewborder' : ''" >
                                    <template v-if="item2.mediaType=='0'">
                                        <img :src=serverurl+item2.mediaUrl alt="" style="width:100%;height:100%;">
                                    </template>
                                    <template v-if="item2.mediaType=='1'">
                                        <img :src=serverurl+item2.mediaPicUrl alt="" style="width:100%;height:100%;">
                                    </template>
                                    <template v-if="item2.mediaType=='2'">
                                        <div class="textMsgRoll">
                                            <div class="textMsgRoll_a" :style="`left:${item2.left}px;`" v-html = item2.textMsg></div>
                                        </div>
                                    </template>
                                </div>
                            </template>    
                        </template>
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
                    <el-input v-model="programName" placeholder="节目名" size="small" style="width:126px;" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    <el-input v-model=width placeholder="宽" size="small" :disabled="true" style="width:126px;margin-left:5px;">
                        <template slot="prepend">宽</template>
                    </el-input>
                    <el-input v-model=height placeholder="高" size="small" :disabled="true" style="width:126px;margin-left:5px;">
                        <template slot="prepend">高</template>
                    </el-input>
                    <el-button @click="mediaSave(0)" type="primary" size="small" style="margin:10px 10px 0 0;">保存</el-button>
                    <el-button @click="mediaSave(1)" type="primary" size="small" style="margin:10px 10px 0 0;">保存并退出</el-button>
                    <el-button @click="backtrack" size="small" icon="el-icon-arrow-left" type="warning">返回</el-button>
                </div>
            </div>
            <div class="programSenior_right_bottom">
                <ul id="myTab" class="nav nav-tabs">
                    <li class="active">
                        <a>所选素材信息</a>
                    </li>
                </ul>
                <template v-if="i==''||j==''">
                    <div class="programSenior_right_bottom_div" style="padding: 20px;font-size: 22px;color: #dcdfe6;">
                        暂无数据
                    </div>
                </template>  
                <template v-else>
                    <div class="programSenior_right_bottom_div">
                        <div>
                            名称
                            <el-input v-model="timeData[i].site[j].nickName" placeholder="名称" size="small" style="width:196px;"></el-input>
                        </div>
                        <div>
                            类型
                            <template v-if="timeData[i].site[j].mediaType=='0'">
                                <el-input value="image" :disabled="true" placeholder="类型" size="small" style="width:196px;"></el-input>
                            </template>
                            <template v-if="timeData[i].site[j].mediaType=='1'">
                                <el-input value="video" :disabled="true" placeholder="类型" size="small" style="width:196px;"></el-input>
                            </template>
                            <template v-if="timeData[i].site[j].mediaType=='2'">
                                <el-input value="text" :disabled="true" placeholder="类型" size="small" style="width:196px;"></el-input>
                            </template>
                        </div>
                        <div>
                            距左
                            <el-input v-model="timeData[i].site[j].marginLeft" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" placeholder="距左" size="small" style="width:196px;"></el-input>
                        </div>
                        <div>
                            距顶
                            <el-input v-model="timeData[i].site[j].top" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" placeholder="距顶" size="small" style="width:196px;"></el-input>
                        </div>
                        <div>
                            宽度
                            <el-input v-model="timeData[i].site[j].width" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" placeholder="宽度" size="small" style="width:196px;"></el-input>
                        </div>
                        <div>
                            高度
                            <el-input v-model="timeData[i].site[j].height" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" placeholder="高度" size="small" style="width:196px;"></el-input>
                        </div>
                        <div>
                            开始时间(秒)
                            <el-input v-model="timeData[i].site[j].playTime" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" @change="timeChange" placeholder="开始时间(秒)" size="small" style="width:146px;"></el-input>
                        </div>
                        <div>
                            持续时间(秒)
                            <el-input :disabled="timeData[i].site[j].mediaType=='1'" v-model="timeData[i].site[j].timeSpan" @change="timeChange" placeholder="持续时间(秒)" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" size="small" style="width:146px;"></el-input>
                        </div>
                        <div v-if="timeData[i].site[j].mediaType=='2'">
                            速度(像素)
                            <el-input v-model="timeData[i].site[j].speed" @change="timeChange" placeholder="速度(像素)" size="small" style="width:146px;"></el-input>
                        </div>
                        <div v-if="timeData[i].site[j].mediaType=='2'" style='height:130px;'>
                            <div id="editor_content" ref="editor" style="text-align:left;width:100%;height:200px;margin-left: 0 !important;"></div>
                        </div>
                        <!-- <div>
                            入场特效
                            <el-select v-model="value" size="small" placeholder="入场特效" style="width:170px;">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            入场时间(秒)
                            <el-input  placeholder="入场时间(秒)" size="small" style="width:146px;"></el-input>
                        </div>
                        <div>
                            出场特效
                            <el-select v-model="value" size="small" placeholder="出场特效" style="width:170px;">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            出场时间(秒)
                            <el-input placeholder="出场时间(秒)" size="small" style="width:146px;"></el-input>
                        </div> -->
                        <div>
                            <el-button @click="removeMedia" type="warning" size="small">移除</el-button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import {time} from '../../assets/js/time'
import {myScript} from '../../assets/js/time'
import E from 'wangeditor'
export default {
    name: 'programSenior',
    data () {
        return {
            serverurl:localStorage.serverurl,
            programName:'',//节目名称
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
            timeData:[
                {
                    site:[
                        
                    ]
                }
            ],
            moveData:{},
            scrollLeft:'',//滚轮滑动距离
            options:[],//特效
            value:'',
            scaleLevel:1,//视图缩放级别
            i:'',
            j:'',
            timer:null,//单行文本循环
            editorContent: '',
            clientX:'',
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
                url:that.serverurl+'/v1/solin/screen/media',
                data:{
                   page:that.mediaIndex,
                   size:that.mediaSize,
                   audit:'1',
                   mediaType:'0',
                   nickName:'',
                   projectIds:sessionStorage.projectId
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
                            that.mediatableData[i].programId = 0
                            that.mediatableData[i].repeatPlay = true
                            that.mediatableData[i].rollDirection = 0
                            that.mediatableData[i].sort = 0
                            that.mediatableData[i].speed = 0
                            that.mediatableData[i].textMsg = ''
                            that.mediatableData[i].top = 0
                            that.mediatableData[i].type = 1
                            that.mediatableData[i].timeLeft = 0
                            that.mediatableData[i].playTime = 0
                            that.mediatableData[i].zIndex = 1
                            that.mediatableData[i].opacity = 0.5
                            that.mediatableData[i].display = '0'
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/media',
                data:{
                   page:that.mediaIndex2,
                   size:that.mediaSize2,
                   audit:'1',
                   mediaType:'1',
                   nickName:'',
                   projectIds:sessionStorage.projectId
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
                            that.mediatableData2[i].programId = 0
                            that.mediatableData2[i].repeatPlay = true
                            that.mediatableData2[i].rollDirection = 0
                            that.mediatableData2[i].sort = 0
                            that.mediatableData2[i].speed = 0
                            that.mediatableData2[i].textMsg = ''
                            that.mediatableData2[i].top = 0
                            that.mediatableData2[i].type = 1
                            that.mediatableData2[i].timeLeft = 0
                            that.mediatableData2[i].playTime = 0
                            that.mediatableData2[i].zIndex = 1
                            that.mediatableData2[i].opacity = 0.5
                            that.mediatableData2[i].display = '0'
                        }
                    }else{
                        that.errorCode(data)
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
                console.log(index,this.timeData)
                if(this.timeData[index].site.length>0){
                    this.$message({
                        message: '请先移除时间轴所有媒体',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
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
        //左侧媒体拖拽事件(单行文本)
        dragstart3(e){
            this.moveData = {
                id:'0',
                mediaType:'2',
                entryEffect:'None',
                entryEffectTimeSpan:0,
                exitEffect:'None',
                exitEffectTimeSpan:0,
                width:sessionStorage.width,
                height:40,
                layer:0,
                marginLeft: 0,
                programId:0,
                repeatPlay:true,
                rollDirection:1,
                sort:0,
                speed:3,
                nickName:'单行文本',
                textMsg:'单行文本单行文本单行文本单行文本',
                top:0,
                type:2,
                timeLeft:0,
                playTime:0,
                timeSpan:10,
                zIndex:1,
                opacity:0.5,
                display:'0',
                mediaWidth:'',
                left:1,
            }
        },
        //拖拽到右侧放下事件
        drop (e) {
            var that = this
            e.stopPropagation(); 
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
                        that.i = Number(e.target.offsetParent.id)
                        that.j = Number(e.target.id)
                        that.timeData[that.i].site[that.j].timeSpan = Math.round((ui.size.width+2)/10)
                        setTimeout(() => {
                            that.timeChange()
                            that.time()
                        }, 20);
                    },//缩放结束后触发
                    start( e, ui ){
                        that.i = Number(e.target.offsetParent.id)
                        that.j = Number(e.target.id)
                    }
                });
                $( ".draggable" ).draggable({
                    axis:'x',
                    containment:'parent',
                    grid:[10,0],
                    // start: function( e, ui ) {
                    //     that.clientX = e.clientX
                    // }, 　　
                    stop: function( e, ui ) {
                        e.target.style.top = 0
                        that.i = Number(e.target.offsetParent.id)
                        that.j = Number(e.target.id)
                        that.timeData[that.i].site[that.j].playTime = Math.round(ui.position.left/10)
                        setTimeout(() => {
                            that.timeChange()
                            that.time()
                        }, 20);
                    }//拖拽结束时触发
                });
            }, 20); 
        },
        //时间轴媒体鼠标按下事件
        AboutSlide1(e){
            e.stopPropagation(); 
            this.i = e.target.offsetParent.id
            this.j = e.target.id
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
            var left = String(e.clientX-450-210+this.scrollLeft)
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
            console.log(123)
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
            console.log(456)
            var that = this;
            var left = $('.axis').css('left').split('px')
            left = Number(left[0])/10
            var s = 0;
            for(let a = 0;a<that.timeData.length;a++){
                for(let b = 0;b<that.timeData[a].site.length;b++){
                    var playTime = that.timeData[a].site[b].playTime
                    var timeSpan = that.timeData[a].site[b].timeSpan
                    if(left>=playTime&&playTime+timeSpan>=left){
                        that.timeData[a].site[b].display = '1'
                        s++
                    }else{
                        that.timeData[a].site[b].display = '0'
                    }
                }
            }
            if(s==0){
                that.i=''
                that.j=''
            }
            setTimeout(() => {
                // 视图图片拖拽改变位置
                $('.viewDraggable').draggable({
                    containment:'parent',
                    stop:function( e, ui ){
                        that.timeData[e.target.attributes.a.value].site[e.target.attributes.b.value].marginLeft = Math.round(ui.position.left)
                        that.timeData[e.target.attributes.a.value].site[e.target.attributes.b.value].top = Math.round(ui.position.top)
                    },
                })
                //缩放
                $('.viewResizable').resizable({
                    containment:'parent',
                    handles: " n, e, s, w, ne, se, sw, nw ",
                    stop:function( e,ui ){
                        that.timeData[e.target.attributes.a.value].site[e.target.attributes.b.value].width = Math.round(ui.size.width)
                        that.timeData[e.target.attributes.a.value].site[e.target.attributes.b.value].height = Math.round(ui.size.height)
                    },
                })
                //文本动画
                var arrar = [];
                for(let i=0;i<that.timeData.length;i++){
                    for(let j=0;j<that.timeData[i].site.length;j++){
                        if(that.timeData[i].site[j].display=='1'&&that.timeData[i].site[j].mediaType=='2'){
                            var data = {
                                a:i,
                                b:j,
                            }
                            arrar.push(data)
                        }
                    }
                }
                for(let i = 0;i<arrar.length;i++){
                    that.timeData[arrar[i].a].site[arrar[i].b].mediaWidth = $('.textMsgRoll_a')[i].offsetWidth
                }
                clearInterval(that.timer)
                that.timer = null
                that.timer = setInterval(function(){
                    for(let i = 0;i<arrar.length;i++){
                        if(that.timeData[arrar[i].a].site[arrar[i].b].left<='-'+that.timeData[arrar[i].a].site[arrar[i].b].mediaWidth){
                            that.timeData[arrar[i].a].site[arrar[i].b].left = 1
                        }
                        that.timeData[arrar[i].a].site[arrar[i].b].left = that.timeData[arrar[i].a].site[arrar[i].b].left - that.timeData[arrar[i].a].site[arrar[i].b].speed
                    }
                },50)
            }, 20);
            if(that.i==''||that.j==''){return}
            console.log(that.timeData[that.i])
            if(that.timeData[that.i].site[that.j].mediaType=='2'){
                $('#editor_content').html('')
                setTimeout(function(){
                    var editor = new E(that.$refs.editor)
                    editor.customConfig.onchange = (html) => {
                        that.timeData[that.i].site[that.j].textMsg = html
                    }
                    // 自定义菜单配置
                    editor.customConfig.menus = [
                        'head', // 标题
                        'bold',// 粗体
                        'fontSize',  // 字号
                        'fontName',  // 字体
                        'italic',// 斜体
                        'underline',// 下划线
                        'strikeThrough',  // 删除线
                        'foreColor',  // 文字颜色
                        'backColor',  // 背景颜色
                        'justify',  // 对齐方式
                        'undo',  // 撤销
                    ]
                    editor.create()
                    editor.txt.html(that.timeData[that.i].site[that.j].textMsg);
                },0)
            }
        },
        //下侧视图中的媒体  鼠标按下事件
        view_mousedown(e){
            if(e.target.className=='textMsgRoll_a'){
                var i1 = e.target.offsetParent.offsetParent.attributes.a.value
                var j1 = e.target.offsetParent.offsetParent.attributes.b.value
            }else{
                var i1 = e.target.offsetParent.attributes.a.value
                var j1 = e.target.offsetParent.attributes.b.value
            }
            this.i = i1
            this.j = j1
            for(var a=0;a<this.timeData.length;a++){
                for(var b = 0;b<this.timeData[a].site.length;b++){
                    if(a==i1&&b==j1){
                        this.timeData[a].site[b].zIndex = '2'
                        this.timeData[a].site[b].opacity = '1'
                    }else{
                        this.timeData[a].site[b].zIndex = '1'
                        this.timeData[a].site[b].opacity = '0.5'
                    }
                }
            }
        },
        //开始时间以及持续时间  发生变化触发此时间
        timeChange(){
            //0为开始时间,1为持续时间
            var time = Number(this.timeData[this.i].site[this.j].playTime) + Number(this.timeData[this.i].site[this.j].timeSpan)
            for(let s = Number(this.j)-1;s>=0;s--){
                var w = Number(this.timeData[this.i].site[s].playTime) + Number(this.timeData[this.i].site[s].timeSpan)
                if(w>this.timeData[this.i].site[this.j].playTime){
                    if(this.timeData[this.i].site[Number(this.j)-1].mediaType=='1'){
                        this.timeData[this.i].site[this.j].playTime = Number(this.timeData[this.i].site[Number(this.j)-1].playTime)+Number(this.timeData[this.i].site[Number(this.j)-1].timeSpan)
                    }else{
                        this.timeData[this.i].site[s].timeSpan = Number(this.timeData[this.i].site[s].timeSpan)-(w - Number(this.timeData[this.i].site[this.j].playTime))
                    }
                }
            }
            for(let a=Number(this.j)+1;a<this.timeData[this.i].site.length;a++){
                if(time>=this.timeData[this.i].site[Number(this.j)+1].playTime){
                    this.timeData[this.i].site[a].playTime = Number(this.timeData[this.i].site[a-1].playTime)+Number(this.timeData[this.i].site[a-1].timeSpan)
                }
            }
            this.removeTime()
        },
        //每次变化循环数组清空播放时长为0的媒体
        removeTime(){
            for(var a = 0;a<this.timeData[this.i].site.length;a++){
                if(this.timeData[this.i].site[a].timeSpan<=0){
                    this.timeData[this.i].site.splice(a,1)
                }
            }
        },
        //点击移除按钮   移除媒体
        removeMedia(){
            if(this.i==''||this.j==''){
                this.$message({
                    message: '请选择媒体进行移除;',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            this.timeData[this.i].site[this.j].playTime=''
            this.timeData[this.i].site.splice(Number(this.j),1)
            this.i=''
            this.j=''
            this.$message({
                message: '媒体移除成功',
                type:'success',
                showClose: true,
            });
            this.time()
        },
        //保存高级节目
        mediaSave(val){
            var that = this;
            console.log(that.programName)
            if(that.programName==''){
                that.$message({
                    message: '节目名称不能为空',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            var data = {};
            var url = '';
            var type = ''
            var array = []
            for(var i=0;i<that.timeData.length;i++){
                for(var j=0;j<that.timeData[i].site.length;j++){
                    that.timeData[i].site[j].layer = i+1
                    that.timeData[i].site[j].sort = j
                    // if(sessionStorage.programtype=='0'){
                        that.timeData[i].site[j].mediaId = that.timeData[i].site[j].id
                    // }
                }
            }
            for(var i=0;i<that.timeData.length;i++){
                for(var j=0;j<that.timeData[i].site.length;j++){
                    array.push(that.timeData[i].site[j])
                }
            }
            if(sessionStorage.programtype=='0'){
                url = '/v1/solin/screen/program';
                type = 'post'
            }else{
                url = '/v1/solin/screen/program';
                type = 'put'
                data.id = sessionStorage.programId 
            }
            data.width = sessionStorage.width;
            data.height = sessionStorage.height;
            data.nickName = that.programName;
            data.projectId = sessionStorage.projectId;
            data.programType = '1';
            data.programDetailsDtos = array
            // return
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '节目保存成功;',
                            type:'success',
                            showClose: true,
                        });
                        if(val=='1'){
                            that.$router.push({'path':'/program'})
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取节目详细信息
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program/information/'+sessionStorage.programId,
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        var length = '';
                        that.programName = data.result.programName
                        if(data.result.list.length>1){
                            for(let i = 0;i<data.result.list.length-1;i++){
                                if(data.result.list[i].layer>data.result.list[i+1].layer){
                                    length =  data.result.list[i].layer
                                }else{
                                    length =  data.result.list[i+1].layer
                                }
                            }
                        }else{
                           length =  data.result.list[0].layer
                        }
                        that.timeData=[]
                        for(let i=0;i<length;i++){
                            that.timeData.push({site:[]})
                        }
                        for(let i = 0;i<length;i++){
                            for(let j = 0;j<data.result.list.length;j++){
                                if(data.result.list[j].layer==i+1){
                                    if(data.result.list[j].type=='2'){
                                        data.result.list[j].mediaType = '2'
                                        data.result.list[j].nickName = '单行文本'
                                        data.result.list[j].mediaWidth = ''
                                        data.result.list[j].left=1
                                    }
                                    data.result.list[j].zIndex = 1
                                    data.result.list[j].opacity = 0.5
                                    data.result.list[j].display = '0'
                                    that.timeData[i].site.push(data.result.list[j])
                                }
                            }
                        }
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
                                    that.i = Number(e.target.offsetParent.id)
                                    that.j = Number(e.target.id)
                                    that.timeData[that.i].site[that.j].timeSpan = (ui.size.width+2)/10
                                    setTimeout(() => {
                                        that.timeChange()
                                        that.time()
                                    }, 20);
                                },//缩放结束后触发
                                start( e, ui ){
                                    that.i = Number(e.target.offsetParent.id)
                                    that.j = Number(e.target.id)
                                }
                            });
                            $( ".draggable" ).draggable({
                                axis:'x',
                                containment:'parent',
                                grid:[10,0],
                                stop: function( e, ui ) {
                                    that.i = Number(e.target.offsetParent.id)
                                    that.j = Number(e.target.id)
                                    that.timeData[that.i].site[that.j].playTime = ui.position.left/10
                                    setTimeout(() => {
                                        that.timeChange()
                                        that.time()
                                    }, 20);
                                }//拖拽结束时触发
                            });
                        }, 20); 
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //返回上一级
        backtrack(){this.$router.go(-1);},
    },
    created(){
        this.mediaready()
        //programtype 0为创建节目 1为修改节目
        if(sessionStorage.programtype=='0'){
            
        }else{
            this.ready()
        }
    },
    beforeDestroy(){
        clearInterval(this.timer)
        this.timer = null
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
.programSimple_li>span{position: absolute;width:100px;background:#5bc0de;height:32px;color: white;line-height: 32px;text-align: center;border-top-right-radius:4px;border-bottom-right-radius:4px;cursor: pointer;overflow: hidden;}
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
.time3_div>div{position: absolute;background: #127592;height:31px;margin-top:1px;cursor: pointer;color: white;text-align: center;line-height: 31px;overflow: hidden;
-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border: 1px solid white;box-sizing: border-box;z-index: 1;}
.rightdrag{position: absolute;right: 0;top:0;width: 3px;height: 100%;cursor: e-resize;}
.programSenior_center_bottom{position: absolute;top: 280px;left: 250px;right: 440px;height: 400px;}
.view_top{width: 100%;height: 40px;background: #d9edf7;border: 1px solid #bce8f1;border-top-left-radius: 4px;border-top-right-radius: 4px;color: #31708f;font-size: 14px;font-weight: 600;line-height: 40px;padding-left: 15px;}
.view_bottom{position: absolute;top: 40px;bottom: 0;width: 100%;border: 1px solid #bce8f1;border-top: none;overflow: auto;display: flex;justify-content: center;align-items: center;}
.view_bottom_div{position: absolute;margin: 0 5px 5px 0;background: black;}
#viewborder{border: 1px dashed red;box-sizing: border-box;}
.textMsgRoll{width:100%;height:100%;display:flex;align-items:center;color: white;overflow:hidden;white-space:nowrap;position: relative;}
.textMsgRoll_a{position:absolute;height:100%;display:flex;align-items:center;}
.textMsgRoll_a>h1{margin:0;padding:0;}

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

