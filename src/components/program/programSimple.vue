<template>
    <!-- 简易节目 -->
    <div class="programSimple">
        <div class="programSimple_left">
            <div class="top_style">
                媒体分组
            </div>
            <div class="programSimple_left_media">
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
                            <div class="panel-body" style="max-height:750px;overflow:auto;">
                                <ul style="list-style:none;padding: 0;">
                                    <li v-for="item in mediatableData" :key=item.id :id=item.id class="programSimple_li">
                                        <p style="line-height: 150px;">
                                            <el-button @click="addmedia(item)" type="primary" icon="el-icon-plus" size='small'></el-button>
                                        </p>
                                        <p>
                                            <img :src=serverurl+item.mediaUrl alt="">
                                        </p>    
                                        <p>
                                            <span :title=item.nickName>{{item.nickName}}</span>
                                            <span>{{item.mediaSizeKb}}</span>
                                        </p>
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
                                <ul style="list-style:none;padding-left: 0;">
                                    <li v-for="item in mediatableData2" :key=item.id :id=item.id class="programSimple_li">
                                        <p style="line-height: 150px;">
                                            <el-button @click="addmedia(item)" type="primary" icon="el-icon-plus" size='small'></el-button>
                                        </p>
                                        <p>
                                            <img :src=serverurl+item.mediaPicUrl alt="">
                                        </p>
                                        <p>
                                            <span :title=item.nickName>{{item.nickName}}</span>
                                            <span>{{item.mediaSizeKb}}</span>
                                        </p>
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
        <div class="programSimple_center">
            <div class="top_style" style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;">
                <span>节目</span>
                <span style="padding-left:15px;">宽:{{width}}</span>
                <span style="padding-left:15px;">高:{{height}}</span>
            </div>
            <div>
                <div style="display:flex;">
                    <el-input v-model="programName" placeholder="节目名称" size='small' oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    <el-button @click="mediaSave" type="success" icon="el-icon-plus" size='small' style="margin-left: 5px;">保存</el-button>
                </div>
                <div style="display:flex;margin-top:10px;">
                    <el-input v-model="mediaVlaue" placeholder="节目位置" size='small' style="width:106px;"></el-input>
                    <el-button type="primary" @click="mediaMove(0)" icon="el-icon-sort" size='small' style="margin-left: 5px;"></el-button>
                    <el-button type="success" @click="mediaMove(1)" icon="el-icon-arrow-up" size='small' style="margin-left: 35px;"></el-button>
                    <el-button type="primary" @click="mediaMove(2)" icon="el-icon-arrow-down" size='small' style="margin-left: 5px;"></el-button>
                    <el-button type="warning" @click="mediaMove(3)" icon="el-icon-delete" size='small' style="margin-left: 5px;"></el-button>
                </div>
            </div>
            <div>
                <ul style="list-style:none;padding: 5px 10px;">
                    <li v-for="(item,key) in mediadata" :key=item.id :id=item.id class="programSimple_li">
                        <p style="line-height: 150px;padding: 0;">
                           <el-checkbox @change="checkId" :key="item.id" :label="key" :id="'a'+key">{{key}}</el-checkbox> 
                        </p>
                        <p>
                            <template v-if="item.mediaType=='0'">
                                <img @click="preview(item)" :src=serverurl+item.mediaUrl alt="">
                            </template>
                            <template v-if="item.mediaType=='1'">
                                <img @click="preview(item)" :src=serverurl+item.mediaPicUrl alt="">
                            </template>
                        </p>
                        <p>
                            <span :title=item.nickName>{{item.nickName}}</span>
                            <span style="margin-top:20px;">
                                <template v-if="item.mediaType=='0'">
                                    <el-input v-model="item.timeSpan" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w]/g,'')" placeholder="播放时长" size='small' style='width:126px;'></el-input>
                                </template>
                                <template v-if="item.mediaType=='1'">
                                    <el-input v-model="item.timeSpan" placeholder="播放时长" :disabled="true" size='small' style='width:126px;'></el-input>
                                </template>
                            </span>
                            <span style="margin-top:20px;">
                                <el-button @click="Download(item.mediaUrl)" type="primary" size='small' icon='el-icon-download'>下载</el-button>
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="programSimple_right">
            <div class="top_style top_style2">
                视图
                <el-button @click="backtrack" style="position: absolute;right: 5px;top: 7px;" size="mini" icon="el-icon-arrow-left" type="warning">返回</el-button>
            </div>
            <div>
                <template v-if="previewData.mediaType=='0'">
                    <img :src=serverurl+previewData.mediaUrl alt="">
                </template>
                <template v-if="previewData.mediaType=='1'">
                    <video :src=serverurl+previewData.mediaUrl controls autoplay loop></video>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'programSimple',
    data () {
        return {
            serverurl:localStorage.serverurl,
            programName:'',
            width:sessionStorage.width,
            height:sessionStorage.height,
            mediatableData:[],
            mediaIndex:1,
            mediaSize:5,
            mediaTotal:5,
            mediatableData2:[],
            mediaIndex2:1,
            mediaSize2:5,
            mediaTotal2:5,
            mediaVlaue:'1',
            mediadata:[],
            checkKey:[],
            previewData:'',
        }
    },
    mounted(){},
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
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        currentchange(val){
            this.mediaIndex = val
            this.mediaready()
        },
        currentchange2(val){
            this.mediaIndex2 = val
            this.mediaready()
        },
        //点击添加媒体文件
        addmedia(val){
            var type= true
            for(var i=0;i<this.mediadata.length;i++){
                if(this.mediadata[i].id==val.id){
                    type = false
                }
            }
            if(type==false){return}
            this.mediadata.unshift(val)
        },
        //媒体check选择
        checkId(value,e){
            console.log(value,e.target.defaultValue)
            if(value==true){
                this.checkKey.push(e.target.defaultValue)
            }
            if(value==false){
                for(let i=0;i<this.checkKey.length;i++){
                    if(e.target.defaultValue==this.checkKey[i]){
                        this.checkKey.splice(i,1)
                    }
                }
            }
            this.checkKey = this.checkKey.sort()
        },
        //媒体位置移动及删除
        mediaMove(val){
            if(this.checkKey.length==0||this.checkKey.length>1){
                this.$message({
                    message: '请选择单个媒体进行操作!',
                    type: 'error'
                });
                return
            }
            var data = this.mediadata[this.checkKey[0]]
            //指定移动到某个位置
            if(val=='0'){
                var s = ''
                if(this.mediaVlaue<=0){
                    s = 0
                }else{
                    s=this.mediaVlaue-1
                }
                if(this.mediaVlaue>this.mediadata.length){
                    s=this.mediadata.length-1
                }
                this.mediadata.splice(this.checkKey[0],1)
                this.mediadata.splice(s,0,data)
                this.checkKey[0] = s
            }
            //上移一级
            if(val=='1'){
                if(this.checkKey[0]==0){return}
                this.mediadata.splice(this.checkKey[0],1)
                this.mediadata.splice(this.checkKey[0]-1,0,data)
                this.checkKey[0] = this.checkKey[0]-1
            }
            //下移一级
            if(val=='2'){
                if(this.checkKey[0]==this.mediadata.length-1){return}
                this.mediadata.splice(this.checkKey[0],1)
                this.mediadata.splice(this.checkKey[0]+1,0,data)
                this.checkKey[0] = Number(this.checkKey[0])+1
            }
            //删除媒体
            if(val=='3'){
                this.mediadata.splice(this.checkKey[0],1)
                this.checkKey = []
            }
        },
        //点击图片 视图开始预览
        preview(val){
            this.previewData = val
        },
        //点击下载媒体
        Download(val){
            var that = this
            window.open(that.serverurl+"/v1/solin/file/download?fileUrl="+val)
        },
        //点击保存简易节目
        mediaSave(){
            var that = this;
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
            for(let i=0;i<that.mediadata.length;i++){
                that.mediadata[i].entryEffect = 'None'
                that.mediadata[i].entryEffectTimeSpan =  0
                that.mediadata[i].exitEffect = 'None'
                that.mediadata[i].exitEffectTimeSpan =  0
                that.mediadata[i].width = sessionStorage.width
                that.mediadata[i].height = sessionStorage.height
                that.mediadata[i].layer = 1
                that.mediadata[i].marginLeft = 0
                that.mediadata[i].programId = 0
                that.mediadata[i].repeatPlay = true
                that.mediadata[i].rollDirection = 0
                that.mediadata[i].speed = 0
                that.mediadata[i].textMsg = ''
                that.mediadata[i].top = 0
                that.mediadata[i].type = 1
                that.mediadata[i].sort = i
                // if(sessionStorage.programtype=='0'){
                    that.mediadata[i].mediaId = that.mediadata[i].id
                // }
                if(i==0){
                    that.mediadata[i].playTime = 0
                }else{
                    that.mediadata[i].playTime = Number(that.mediadata[i-1].playTime)+Number(that.mediadata[i-1].timeSpan)
                }
            }
            if(sessionStorage.programtype=='0'){
                url = '/v1/solin/screen/program'; 
                type = 'post'
            }else{
                url = '/v1/solin/screen/program'
                type = 'put'
                data.id = sessionStorage.programId
            }
            data.width = sessionStorage.width;
            data.height = sessionStorage.height;
            data.nickName = that.programName;
            data.projectId = sessionStorage.projectId
            data.programType = '0';
            data.programDetailsDtos = that.mediadata
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
                        that.programName = data.result.programName
                        that.mediadata = data.result.list
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
            this.ready();
        }
    },
}
</script>
<style scoped>
.programSimple{width: 100%;height: 100%;padding: 15px;display: flex;}
.programSimple>div{width: 30%;margin-left:1.5%;margin-right: 1.5%;position: relative;}
.programSimple>div:nth-of-type(2){width: 31%;}
.top_style{width: 100%;height: 43px;line-height: 43px;border-radius: 5px;background: #337ab7;border:1px solid #337ab7;color: white;padding-left: 20px;font-size: 16px;}
.top_style2{background: #dff0d8;border-color: #dff0d8;color: #3c763d;}
.programSimple_left_media{width: 100%;position: absolute;top: 55px;bottom: 0;}
.a_style{text-decoration: none;display: inline-block;width:100%;}
.programSimple_li{display: flex;border-top: 1px solid #cccccc;}
.programSimple_li>p:nth-of-type(2){width:100px;height: 150px;margin-left: 20px;}
.programSimple_li>p:nth-of-type(2)>img{width: 100%;height: 100%;}
.programSimple_li>p:nth-of-type(3){margin-left: 20px;width: 120px;overflow: hidden;}
.programSimple_li>p:nth-of-type(3)>span{display: block;height: 25px;line-height: 25px;font-size: 16px;padding-top: 15px;}
.programSimple_center>div:nth-of-type(2){border: 1px solid #337ab7;height: 108px;border-bottom: none;padding: 15px 30px;}
.programSimple_center>div:nth-of-type(3){width:100%;border: 1px solid #337ab7;position: absolute;top:151px;bottom: 0;border-top:2px solid #ddd;overflow: auto;}
.programSimple_right{border: 1px solid #d6e9c6;box-sizing: border-box;border-radius: 5px;}
.programSimple_right>div:nth-of-type(2){width:100%;position: absolute;top:43px;bottom: 0;padding: 15px;}
.programSimple_right img,.programSimple_right video{width: 100%;height: 100%;}
</style>