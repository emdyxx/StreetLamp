<template>
    <div class="Programming">
        <div class="preview">
            <div class="preview_top">
                节目预览
                <el-button @click="preview" size="mini" type="primary" plain style="background:#4CD3C5;color:white;border:none;">预览</el-button>
            </div>
            <div class="preview_bottom">
                <div class="MediaPreview">
                    <div v-if="active2=='1'||active2=='2'" class="MediaPreview_div">
                        <img :src=serverurl+mediaUrl01 alt="">
                    </div>
                    <template v-if="active2=='3'||active2=='4'">
                        <div class="MediaPreview_div" style="border-bottom:1px solid #4d4d4d;">
                            <img :src=serverurl+mediaUrl01 alt="">
                        </div>
                        <div class="MediaPreview_div">
                            <img :src=serverurl+mediaUrl02 alt="">
                        </div>
                    </template>
                    <div v-if="active2==2||active2=='4'" class="textarea">
                        {{textarea}}
                    </div>
                </div>
                <!-- <div class="MediaPreviewZoom">
                    <el-button @click="Zoom(0)" title="放大" size="mini" type="primary" plain>放大</el-button>
                    <el-button @click="Zoom(1)" title="缩小" size="mini" type="primary" plain>缩小</el-button>
                </div> -->
            </div>
        </div>
        <div class="content">
            <div class="content_top box_shadow">
                <el-input
                    size="medium"
                    placeholder='节目名称'
                    suffix-icon="el-icon-edit"
                    oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"
                    v-model="ProgramName">
                </el-input>
                <el-button @click="backtrack" size="small" icon='el-icon-back' type="primary" plain>退出</el-button>
                <el-button @click="ProgramSubmit" size="small" type="primary" plain>保存</el-button>
            </div>
            <div class="content_bottom box_shadow">
                <div class="content_bottom_01">
                    <div @click="activeType='0'" :class="activeType=='0'?'content_bgcolor':''">
                        <p>第一层</p>
                        <div @drop.prevent="drop(1)" @dragover.prevent class="setion_main">
                            <draggable v-model="myArray01" group="people" @start="drag=true" @end="end=false">
                                <div v-for="( item,index) in myArray01" @click="mediaClick(1,item,index)" @mouseenter="item.check=true" @mouseleave="item.check=false" :key="item.id" class="img__div">
                                    <template v-if="item.mediaType=='0'">
                                        <img :src=serverurl+item.mediaUrl alt="">
                                    </template>
                                    <template v-if="item.mediaType=='1'">
                                        <img :src=serverurl+item.mediaPicUrl alt="">
                                    </template>
                                    <div v-if="item.check">
                                        {{item.timeSpan}}秒
                                        <i class="el-icon-error" @click.stop="removeMedia(1,item)"></i>
                                    </div>
                                </div>
                            </draggable>
                            <div slot="footer"></div>
                        </div>
                    </div>
                </div>
                <div class="content_bottom_02" v-if="active2=='3'||active2=='4'">
                    <div @click="activeType='1'" :class="activeType=='1'?'content_bgcolor':''">
                        <p>第二层</p>
                        <div @drop.prevent="drop(2)" @dragover.prevent class="setion_main">
                            <draggable v-model="myArray02" group="people" @start="drag=true" @end="end=false">
                                <div v-for="(item,index) in myArray02"  @click="mediaClick(2,item,index)" @mouseenter="item.check=true" @mouseleave="item.check=false" :key="item.id" class="img__div">
                                    <template v-if="item.mediaType=='0'">
                                        <img :src=serverurl+item.mediaUrl alt="">
                                    </template>
                                    <template v-if="item.mediaType=='1'">
                                        <img :src=serverurl+item.mediaPicUrl alt="">
                                    </template>
                                    <div v-if="item.check">
                                        {{item.timeSpan}}秒
                                        <i class="el-icon-error" @click.stop="removeMedia(2,item)"></i>
                                    </div>
                                </div>
                            </draggable>
                            <div slot="footer"></div>
                        </div>
                    </div>
                </div>
                <div class="content_bottom_03" v-if="active2=='2'||active2=='4'">
                    <div @click="activeType='2'" :class="activeType=='2'?'content_bgcolor':''">
                        <p>文本层</p>
                        <div style="padding:15px;overflow:hidden;">
                            <el-input
                                type="textarea"
                                :rows="6"
                                placeholder="请输入内容"
                                v-model="textarea"
                                style="width:35%;">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="medias">
            <div class="medias_left">
                <div class="media_top">
                    <span v-if="mediaType=='0'">我的图片</span>
                    <span v-if="mediaType=='1'">我的视频</span>
                    <el-button v-if="dirId!='0'" @click="ReturnDir" size="mini" type="primary" plain style="background:#4CD3C5;color:white;border:none;">返回</el-button>
                </div>
                <div class="media_bottom">
                    <template v-for="item in tableData">
                        <template v-if="item.mediaType==0||item.mediaType==1">
                            <div @dragstart="dragstart" draggable="true" :id='item.id' :key="item.id">
                                <div class="section_img" >
                                    <template v-if="item.mediaType=='0'">
                                        <img :src=serverurl+item.mediaUrl alt="" :id='item.id'>
                                    </template>
                                    <template v-if="item.mediaType=='1'">
                                        <img :src=serverurl+item.mediaPicUrl alt="" :id='item.id'>
                                    </template>
                                </div>
                                <div class="section_text">
                                    <p>{{item.nickName}}</p>
                                    <p>{{item.createTime}}</p>
                                </div>
                            </div>
                        </template>
                        <template v-if="item.dirType==0">
                            <div :key="item.id" @dragstart="dragstart" draggable="true" :id='item.id'>
                                <div class="section_img">
                                    <template>
                                        <img @dblclick="FolderDoubleClick(item)" :id='item.id' src='../../../assets/img/Folder.png' style="width: 90px;" alt="">
                                    </template>
                                </div>
                                <div class="section_text">
                                    <p>{{item.dirName}}</p>
                                    <p>{{item.createTime}}</p>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div class="medias_right">
                <div @click="mediasType(0)" :class="mediaType=='0' ? 'medias_right_style' : ''">
                    <p class="iconfont icon-tupian" style="font-size:26px;"></p>
                    <p>图片</p>
                </div>
                <div @click="mediasType(1)" :class="mediaType=='1' ? 'medias_right_style' : ''">
                    <p class="iconfont icon-shipin" style="font-size:29px;"></p>
                    <p>视频</p>
                </div>
            </div>
        </div>
        <div class="Programming_modal">
            <div class="Programming_modal_top">
                <template v-if="mediaModalData.mediaType=='0'">
                    <img :src=serverurl+mediaModalData.mediaUrl alt="">  
                </template>
                <template v-if="mediaModalData.mediaType=='1'">
                    <video :src=serverurl+mediaModalData.mediaUrl controls autoplay loop></video>
                </template>
            </div>
            <div class="Programming_modal_bottom">
                <div v-show="mediaModalData.mediaType=='0'">
                    播放时长:
                    <el-input-number v-model="mediaModalData.timeSpan" controls-position="right" size="mini" :step="1" :min="5" style="margin:0 5px 0 5px;width:85px;"></el-input-number>
                    (秒)
                </div>
                <div>
                    <el-button @click="mediamove(1)" type="text" round icon="el-icon-arrow-left" size="mini" style="margin-left:10px;"></el-button>
                    <el-button @click="mediamove(2)" type="text" round icon="el-icon-arrow-right" size="mini"></el-button>
                    <p>
                        <span style="color:#4fd2c3;">{{mediaIndex+1}}</span>/{{mediaTotal}}
                    </p>
                </div>
            </div>
            <div class="Programming_modal_close el-icon-close" @click="modalClose"></div>
        </div>
        <MyPreview v-show="show" v-on:close='close' v-bind:sendData=sendData ref="Intive"></MyPreview>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import MyPreview from '../../assembly/ProgramPreview/Mypreview'
export default {
    name:'Programming',
    components: {
        //调用组件
        draggable,
        MyPreview,
    },
    data () {
        return {
            show:false,
            serverurl:localStorage.serverurl,
            tableData:[],//媒体数据
            ProgramName:'',
            width:'',
            height:'',
            mediaType:'0',//媒体类型
            parentId:'0', //当前所处层级
            dirId:'0',//点击文件夹ID
            mediaClickData:{},//拖动媒体Data
            activeType:'0',//媒体层级
            active2:sessionStorage.active2,//分屏模式
            myArray01:[],
            myArray02:[],
            mediaModalData:{},
            mediaLayer:'',
            mediaIndex:'',
            mediaTotal:'',
            ZoomLevel:1,// 缩放级别
            textarea:'我是默认数据',//文本层数据
            mediaUrl01:'', //第一层图片url
            mediaUrl02:'',//第二层图片url
            sendData:{}
        }
    },
    mounted(){ 
        
    },
    methods:{
        PreviewActive(){ 
            setTimeout(() => {
                if(this.active2=='1'){
                    $('.MediaPreview_div').css({
                        "width":'100%',
                        "height":'100%'
                    })
                }
                if(this.active2=='2'){
                    $('.MediaPreview_div').css({
                        "width":'100%',
                        "height":340+'px'
                    })
                }
                if(this.active2=='3'){
                    var height = sessionStorage.height/2
                    $('.MediaPreview_div').css('height',180+'px')
                }
                if(this.active2=='4'){
                    $('.MediaPreview_div').css('height',170+'px')
                }
            }, 50);
        },
        //左侧预览
        preview(){
            this.sendData={
                active2:this.active2,
                myArray01:this.myArray01,
                myArray02:this.myArray02,
                myArray03:{
                    text:this.textarea
                }
            }
            this.show = true
            setTimeout(() => {
                this.$refs.Intive.readyIntive();
            }, 200);
        },
        close(){
            this.show = false
        },
        //左侧放大,缩小
        Zoom(val){
            if(val=='0'){
                if(this.ZoomLevel>=1.2){return;}
                this.ZoomLevel+=0.2
            }
            if(val=='1'){
                if(this.ZoomLevel<=0.4){return;}
                this.ZoomLevel-=0.2
            }
            $('.MediaPreview').css({
                "transform":'scale('+this.ZoomLevel.toFixed(1)+')',
            })
        },
        //图片视频切换
        mediasType(val){
            this.mediaType = val;
            this.parentId = '0'
            this.dirId = '0'
            this.mediaData()
        },
        //点击媒体>>修改媒体基本信息
        mediaClick(type,val,index){
            this.mediaLayer = type
            this.mediaIndex = index;
            if(type=='1'){
                this.mediaModalData = this.myArray01[index]
                this.mediaTotal = this.myArray01.length
                if(val.mediaType=='0'){
                    this.mediaUrl01 = val.mediaUrl
                }
                if(val.mediaType=='1'){
                    this.mediaUrl01 = val.mediaPicUrl
                }
            }
            if(type=='2'){
                this.mediaModalData = this.myArray02[index]
                this.mediaTotal = this.myArray02.length
                if(val.mediaType=='0'){
                    this.mediaUrl02 = val.mediaUrl
                }
                if(val.mediaType=='1'){
                    this.mediaUrl02 = val.mediaPicUrl
                }
            }
            $('.Programming_modal').css('display','block')
        },
        //修改媒体基本信息>>左移/右移
        mediamove(val){
            // 左移
            if(val=='1'){
                if(this.mediaIndex=='0'){return;}
                this.mediaIndex--
                if(this.mediaLayer=='1'){
                    this.mediaModalData = this.myArray01[this.mediaIndex]
                    if(this.mediaModalData.mediaType=='0'){
                        this.mediaUrl01 = this.mediaModalData.mediaUrl
                    }
                    if(this.mediaModalData.mediaType=='1'){
                        this.mediaUrl01 = this.mediaModalData.mediaPicUrl
                    }
                }
                if(this.mediaLayer=='2'){
                    this.mediaModalData = this.myArray02[this.mediaIndex]
                    if(this.mediaModalData.mediaType=='0'){
                        this.mediaUrl02 = this.mediaModalData.mediaUrl
                    }
                    if(this.mediaModalData.mediaType=='1'){
                        this.mediaUrl02 = this.mediaModalData.mediaPicUrl
                    }
                }
            }
            // 右移
            if(val=='2'){
                if(this.mediaLayer=='1'){
                    if(this.mediaIndex==this.myArray01.length-1){return;}
                    this.mediaIndex++
                    this.mediaModalData = this.myArray01[this.mediaIndex]
                    if(this.mediaModalData.mediaType=='0'){
                        this.mediaUrl01 = this.mediaModalData.mediaUrl
                    }
                    if(this.mediaModalData.mediaType=='1'){
                        this.mediaUrl01 = this.mediaModalData.mediaPicUrl
                    }
                }
                if(this.mediaLayer=='2'){
                    if(this.mediaIndex==this.myArray02.length-1){return;}
                    this.mediaIndex++
                    this.mediaModalData = this.myArray02[this.mediaIndex]
                    if(this.mediaModalData.mediaType=='0'){
                        this.mediaUrl02 = this.mediaModalData.mediaUrl
                    }
                    if(this.mediaModalData.mediaType=='1'){
                        this.mediaUrl02 = this.mediaModalData.mediaPicUrl
                    }
                }
            }
        },
        //关闭弹框
        modalClose(){
            $('.Programming_modal').css('display','none')
        },
        //删除媒体
        removeMedia(key,val){
            if(key=='1'){
                for(var i=0;i<this.myArray01.length;i++){
                    if(val.mediaId==this.myArray01[i].mediaId){
                        this.myArray01.splice(i,1)
                    }
                }
            }
            if(key=='2'){
                for(var j=0;j<this.myArray02.length;j++){
                    if(val.mediaId==this.myArray02[j].mediaId){
                        this.myArray02.splice(j,1)
                    }
                }
            }
        },
        //拖动放下层级 判断拖动文件并添加相应参数
        drop(val){
            if(Object.keys(this.mediaClickData).length==0){
                return;
            }
            if(this.mediaClickData.dirType=='0'){
                return;
            }
            var data = {
                entryEffect:'None',
                entryEffectTimeSpan:'0',
                exitEffect:'None',
                exitEffectTimeSpan:'0',
                width:'0',
                height:'0',
                layer:'0',
                lineHeight:'20',
                marginLeft:'0',
                mediaId:this.mediaClickData.id,
                playTime:'0',
                rollDirection:'0',
                sort:'',
                speed:'2',
                textMsg:'',
                timeSpan:this.mediaClickData.timeSpan,
                top:'0',
                type:'1',
                mediaUrl:this.mediaClickData.mediaUrl,
                mediaPicUrl:this.mediaClickData.mediaPicUrl,
                nickName:this.mediaClickData.nickName,
                mediaType:this.mediaClickData.mediaType,
                check:false,
            }
            //第一层
            if(val=='1'){
                for(var i=0;i<this.myArray01.length;i++){
                    if(this.mediaClickData.id==this.myArray01[i].mediaId){
                        return;
                    }
                }
                data.layer = '1'
                this.myArray01.push(data)
                if(this.mediaUrl01==''){
                    if(this.myArray01[0].mediaType=='0'){
                        this.mediaUrl01 = this.myArray01[0].mediaUrl
                    }
                    if(this.myArray01[0].mediaType=='1'){
                        this.mediaUrl01 = this.myArray01[0].mediaPicUrl
                    }
                }
            }
            //第二层
            if(val=='2'){
                for(var j=0;j<this.myArray02.length;j++){
                    if(this.mediaClickData.id==this.myArray02[j].mediaId){
                        return;
                    }
                }
                data.layer = '2'
                this.myArray02.push(data)
                if(this.mediaUrl02==''){
                    if(this.myArray02[0].mediaType=='0'){
                        this.mediaUrl02 = this.myArray02[0].mediaUrl
                    }
                    if(this.myArray02[0].mediaType=='1'){
                        this.mediaUrl02 = this.myArray02[0].mediaPicUrl
                    }
                }
            }
            this.mediaClickData = {}
        },
        //右侧媒体拖动记录拖动数据
        dragstart(val){
            for(var i=0;i<this.tableData.length;i++){
                if(this.tableData[i].id==val.target.id){
                    this.mediaClickData = this.tableData[i]
                }
            }
        },
        //文件夹双击事件
        FolderDoubleClick(val,key){
            this.dirId = val.id
            this.mediaData()
        },
        //返回上层文件夹
        ReturnDir(){
            this.dirId = this.parentId
            this.mediaData()
        },
        //请求媒体信息
        mediaData(){
            var that = this;
            var data = {
                page:1,
                size:500,
                mediaType:that.mediaType,
                nickName:'',
                dirId:that.dirId,
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/media',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.mediaDirList.length;i++){
                            data.result.mediaDirList[i].dirType = '0'
                        }
                        that.parentId = data.result.parentId
                        that.tableData = data.result.mediaDirList.concat(data.result.mediaList)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 修改节目请求详细信息
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
                        that.ProgramName = data.result.programName
                        var active01 = ''
                        var active02 = ''
                        var active03 = ''
                        for(var i=0;i<data.result.list.length;i++){
                            data.result.list[i].check = false
                            data.result.list[i].mediaId = data.result.list[i].id
                            if(data.result.list[i].layer=='1'){
                                that.myArray01.push(data.result.list[i])
                                active01='1'
                            }
                            if(data.result.list[i].layer=='2'){
                                that.myArray02.push(data.result.list[i])
                                active02='1'
                            }
                            if(data.result.list[i].layer=='3'){
                                that.textarea = data.result.list[i].textMsg
                                active03='1'
                            }
                        }
                        if(active01=='1'&&active02==''&&active03==''){
                            that.active2 = '1'
                        }
                        if(active01=='1'&&active02==''&&active03=='1'){
                            that.active2 = '2'
                        }
                        if(active01=='1'&&active02=='1'&&active03==''){
                            that.active2 = '3'
                        }
                        if(active01=='1'&&active02=='1'&&active03=='1'){
                            that.active2 = '4'
                        }
                        that.PreviewActive();
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //节目保存
        ProgramSubmit(){
            var that = this;
            var type = ''
            if(that.ProgramName==''){
                that.$message({
                    message: '节目名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return 
            }
            var mediaHeight = ''
            if(this.active2=='1'){
                if(that.myArray01.length==0){
                    that.$message({
                        message: '请选择媒体进行保存!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                mediaHeight = sessionStorage.height
            }
            if(this.active2=='2'){
                if(that.myArray01.length==0){
                    that.$message({
                        message: '请选择媒体进行保存!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                if(that.textarea==''){
                    that.$message({
                        message: '文本层不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                mediaHeight = sessionStorage.height-20
            }
            if(this.active2=='3'){
                if(that.myArray01.length==0||that.myArray02.length==0){
                    that.$message({
                        message: '请选择媒体进行保存!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                mediaHeight = sessionStorage.height/2
            }
            if(this.active2=='4'){
                if(that.myArray01.length==0||that.myArray02.length==0){
                    that.$message({
                        message: '请选择媒体进行保存!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                if(that.textarea==''){
                    that.$message({
                        message: '文本层不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return 
                }
                mediaHeight = (sessionStorage.height-20)/2
            }
            if(that.myArray01.length!=0){
                for(let i=0;i<that.myArray01.length;i++){
                    that.myArray01[i].sort = i+1
                    that.myArray01[i].width = sessionStorage.width;
                    that.myArray01[i].height = mediaHeight
                    that.myArray01[i].type = 1
                    if(i==0){
                        that.myArray01[i].playTime = 0
                    }else{
                        that.myArray01[i].playTime = that.myArray01[i-1].playTime + that.myArray01[i-1].timeSpan
                    }
                }
            }
            if(that.myArray02.length!=0){
                for(let i=0;i<that.myArray02.length;i++){
                    that.myArray02[i].sort = i+1
                    that.myArray02[i].width = sessionStorage.width;
                    that.myArray02[i].height = mediaHeight
                    that.myArray02[i].top = that.myArray02[i].height
                    that.myArray02[i].type = 1
                    if(i==0){
                        that.myArray02[i].playTime = 0
                    }else{
                        that.myArray02[i].playTime = that.myArray02[i-1].playTime + that.myArray02[i-1].timeSpan
                    }
                }
            }
            var data = {
                nickName:that.ProgramName,
                width:sessionStorage.width,
                height:sessionStorage.height,
                programType:'1',
                projectId:sessionStorage.projectId,
                programDetailsDtos:[]
            }
            data.programDetailsDtos = that.myArray01.concat(that.myArray02)
            if(that.active2=='2'||that.active2=='4'){
                data.programDetailsDtos.push({
                    entryEffect:'None',
                    entryEffectTimeSpan:'0',
                    exitEffect:'None',
                    exitEffectTimeSpan:'0',
                    width:sessionStorage.width,
                    height:'20',
                    layer:'3',
                    lineHeight:'20',
                    marginLeft:'0',
                    mediaId:'',
                    playTime:'0',
                    rollDirection:'1',
                    sort:'1',
                    speed:'2',
                    textMsg:that.textarea,
                    timeSpan:'5',
                    top:sessionStorage.height-20,
                    type:'2',
                    mediaUrl:'',
                    mediaPicUrl:'',
                    nickName:'',
                    mediaType:'',
                    check:false,
                })
            }
            if(sessionStorage.programType=='1'){
                type = 'put'
                data.id = sessionStorage.programId
            }else{
                type = 'post'
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '节目保存成功;',
                            type:'success',
                            showClose: true,
                        });
                        sessionStorage.type='2'
                        that.$router.push({path:'ProgramList'})
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //退出
        backtrack(){
            sessionStorage.type='2'
            this.$router.go(-1)
        },
    },
    created(){
        if(sessionStorage.programType=='1'){
            this.ready()
        }else{
            this.PreviewActive();
        }
        this.width = sessionStorage.width
        this.height = sessionStorage.height
        this.mediaData()
    }
}
</script>
<style scoped>
.Programming{width: 100%;height: 100%;position: relative;display: flex;justify-content: center;align-items: center;}
/* .box_shadow{box-shadow: -0.5px 1px 5px gray;} */
.preview{position: absolute;top: 0;bottom: 0;left: 5px;width: 250px;}
.preview_top{height: 50px;line-height: 50px;padding-left: 20px;border-bottom: 1px solid #efefef;font-size: 14px;}
.preview_top>button{position: absolute;right: 10px;top: 13px;}
.preview_bottom{position: absolute;top: 50px;bottom: 0;width: 100%;display: flex;justify-content: center;padding-top: 80px;overflow: hidden;}
.MediaPreview{width: 200px;height: 360px;border: 8px solid;border-image:url("../../../assets/img/border.png") 9 repeat;box-sizing: content-box;overflow: hidden;position: relative;}
.MediaPreview img{width: 100%;height: 100%;}
.MediaPreviewZoom{width: 100%;height: 30px;position: absolute;top: 10px;display: flex;justify-content: center;}
.textarea{position: absolute;bottom: 0;width:100%;height: 20px;border-top:1px solid #4d4d4d;text-align: center;background: #000;color: white;}
.MediaPreview_div{overflow: hidden;background: #000;}

.content{position: absolute;top: 0;bottom: 0;left: 265px;right: 370px;border-left:5px solid #efefef;border-right: 5px solid #efefef;}
.content_top{height: 50px;display: flex;align-items: center;padding-left: 15px;border-bottom: 1px solid #efefef;}
.content_top>div{width: 196px;}
.content_top>button:nth-of-type(1){position: absolute;right: 15px;}
.content_top>button:nth-of-type(2){position: absolute;right: 100px;}
.content_bottom{position: absolute;top: 60px;bottom: 0;width: 100%;overflow: auto;}
.content_bottom>div{width: 100%;height: 220px;padding: 10px;margin-top:15px;}
.content_bottom>div>div{width: 100%;height: 100%;padding: 10px;position: relative;}
.content_bottom>div p{font-size: 14px;}
.content_bottom>div>div>div{position: absolute;top: 32px;bottom: 0;left: 0;right: 0;}
.content_bgcolor{background: #ecf6ff;}
.setion_main{display: flex;overflow: auto;}
.setion_main>div:nth-of-type(1){width: auto;height: 100%;display: flex;}
.setion_main>div:nth-of-type(2){width: 120px;height: 135px;margin: 15px;border:1px dashed #a5a5a5;}
.img__div{width: 120px;height: 135px;margin: 15px;position: relative;overflow: hidden;}
.img__div>img{width: 100%;position: absolute;bottom: 0;}
.img__div>div{position: absolute;width: 100%;height: 100%;background: #454545;color:white;opacity: .75;display: flex;justify-content: center;align-items: center;}
.img__div>div>i{position: absolute;top: 5px;right: 5px;font-size: 25px;}
.medias{position: absolute;top: 0;bottom: 0;right: 0;width: 360px;}
.medias_left{position: absolute;left: 0;right: 70px;height: 100%;}
.media_top{width: 100%;height: 50px;line-height: 50px;padding-left: 15px;border-bottom: 1px solid #efefef;font-size: 16px;}
.media_top>button{position: absolute;right: 10px;top: 9px;}
.medias_right{width: 70px;height:100%;background: #efefef;position: absolute;right: 0;box-shadow: -1.5px 5px 4px grey;}
.medias_right>div{padding: 10px 0 10px 0;cursor: pointer;}
.medias_right>div>P{margin: 0;font-size: 16px;text-align: center;}
.medias_right_style{color: #4dd3c5;background: #e7e7e7;}
.media_bottom{position: absolute;top: 52px;bottom: 0;width: 100%;overflow: auto;display: flex;flex-wrap: wrap;align-content: flex-start;}
.media_bottom>div{width: 42%;height: 178px;margin: 10px 10px 0 10px;position: relative;}
.section_img{height: 130px;overflow: hidden;display: flex;justify-content: center;position: relative;}
.section_img>img{position: absolute;bottom: 0;max-width: 100%;max-height: 130px;padding:5px;}
.section_text{position: absolute;width: 100%;height: 48px;bottom: 0;text-align: center;}
.section_text>p{margin: 0;font-size: 12px;padding-left: 5px;user-select: none;
overflow: hidden;white-space : nowrap;text-overflow: ellipsis;}
.section_text>p:nth-of-type(1){padding:5px;}
.section_text>p:nth-of-type(2){color: #999;}
.FolderEvent{background: rgb(240, 240, 240);}

/* 弹框 */
.Programming_modal{width: 240px;height: 480px;box-shadow: -0.5px 2px 20px 5px #d9dbdd;z-index: 99;position: relative;background: white;display: none;}
.Programming_modal_top{width:100%;height:380px;border-bottom: 1px solid #efefef;overflow: hidden;display: flex;justify-content: center;align-items: center;}
.Programming_modal_top>img,.Programming_modal_top>video{width: 310px;}
.Programming_modal_bottom{position: absolute;top: 381px;bottom: 0;width: 100%;}
.Programming_modal_bottom>div{width: 100%;height: 30px;display: flex;align-items: center;margin-top: 15px;}
.Programming_modal_bottom>div:nth-of-type(1){justify-content: center;margin-top: 20px;}
.Programming_modal_bottom div>p{margin:0;position: absolute;right: 10px;}
.Programming_modal_bottom>div>button{padding: 7px 2px;font-weight: 600;font-size: 14px;}
.Programming_modal_bottom>div>button:hover{color: #4fd2c3;}
.Programming_modal_close{position: absolute;right: -7px;top: -7px;width: 24px;height: 24px;border-radius: 50%;color:#4fd2c3;font-size: 18px;text-align:center;line-height:24px;background: white;}
</style>
<style lang='less'>
.content_top{
    input{border-top:none !important;border-left:none !important;border-right:none !important;border-radius: 0;}
}
</style>

