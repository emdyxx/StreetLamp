<template>
    <!-- 媒体库 -->
    <div class="mediaLibrary">
        <div class="mediaLibrary_top">
            <span>媒体库</span>
            <p @click="mediaType(0)" :class="active=='0' ? 'mediaStyle' : ''">图片</p>
            <p @click="mediaType(1)" :class="active=='1' ? 'mediaStyle' : ''">视频</p>
            <div class="operation">
                <el-button v-if="addMedia" @click="ADDdialogVisible" size="small" icon="el-icon-upload2">上传</el-button>
                <el-button v-if="addMedia" @click="addFolder" size="small">新建文件夹</el-button>
            </div>
        </div>
        <div class="mediaLibrary_bottom">
            <div class="main_top">
                <div class="main_top_top">
                    <span v-if="active=='0'">全部图片</span>
                    <span v-if="active=='1'">全部视频</span>
                    <el-button v-if="dirId!='0'" @click="ReturnDir" icon='el-icon-back' size="mini">返回</el-button>
                </div>
                <div class="main_top_bottom">
                    <el-checkbox @change="AllElection" v-model="checked">全选</el-checkbox>
                    <div>
                        <el-button v-if="delMedia" type="text" @click="removeMedia">删除</el-button>
                        <span v-if="delMedia">|</span>
                        <el-button type="text" @click="previewMedia">预览</el-button>
                        <span>|</span>
                        <el-button v-if="editMedia" type="text" @click="rename">重命名</el-button>
                        <span v-if="editMedia">|</span>
                        <el-button type="text" @click="download">下载</el-button>
                    </div>
                </div>
            </div>
            <div class="main_bottom">
                <template v-for="(item,key) in tableData">
                    <template v-if="item.mediaType==0||item.mediaType==1">
                        <div @click="checkedClick(item,key)" @dragstart="dragstart" draggable="true" :id='item.id' :key="key" class="section" :class="item.checked==true ? 'checkbdColor' : ''">
                            <span :class="item.checked==true ? 'checkBgColor' : ''"></span>
                            <i class="iconfont icon-duihao" :class="item.checked==true ? 'checkColor' : ''"></i>
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
                        <div @click="checkedClick(item,key)" @drop.prevent="drop" @dragover.prevent :id='item.id' :key="key" class="section" :class="item.checked==true ? 'checkbdColor' : ''">
                            <span :class="item.checked==true ? 'checkBgColor' : ''" :id='item.id'></span>
                            <i class="iconfont icon-duihao" :class="item.checked==true ? 'checkColor' : ''" :id='item.id'></i>
                            <div class="section_img">
                                <template>
                                    <img @dblclick="FolderDoubleClick(item,key)" @click.stop="checkedClick(item,key)" :id='item.id' src='../../../assets/img/Folder.png' style="width: 100px;" alt="">
                                </template>
                            </div>
                            <div class="section_text">
                                <p :id='item.id'>{{item.dirName}}</p>
                                <p :id='item.id'>{{item.createTime}}</p>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <el-dialog
            title="媒体上传"
            :visible.sync="dialogVisible"
            width="30%">
            <span>
                <el-upload
                    class="upload-demo"
                    action='customize'
                    ref="upload"
                    accept='.png,.jpg,.gif,.mp4,.3gp' 
                    :http-request="uploadSectionFile"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif图片，MP4/3GP视频,且不超过50M</div>
                </el-upload>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="媒体预览"
            :visible.sync="dialogVisible2"
            width="25%"
            >
            <span>
                <template v-if="mediaTypes=='0'">
                    <img :src=url alt="" style='width:100%;'>
                </template>
                <template v-if="mediaTypes=='1'">
                    <video :src=url controls="controls" autoplay loop style="width: 100%;">
                        您的浏览器不支持 video 标签。
                    </video>
                </template>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="重命名"
            :visible.sync="dialogVisible3"
            width="30%">
            <span>
                <el-input v-model='inputColumn' size="small" placeholder="请输入新名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button @click="RenameSubmit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="新建文件夹"
            :visible.sync="dialogVisible4"
            width="30%">
            <span>
                <el-input v-model='dirName' size="small" placeholder="请输入文件夹名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button @click="FolderSubmit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'mediaLibrary',
    data () {
        return {
            addMedia:'',
            editMedia:'',
            delMedia:'',
            serverurl:localStorage.serverurl,
            active:'0',
            checked:false,
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            dialogVisible: false,
            fileList: [],
            parentId:'0',  //当前所处层级
            dirId:'0', //点击文件夹ID
            mediaID:'',//拖动媒体ID
            //预览
            dialogVisible2:false,
            mediaTypes:'',
            url:'',
            //重命名
            dialogVisible3:false,
            inputColumn:'',
            //新建文件夹
            dialogVisible4:false,
            dirName:'',
        }
    },
    mounted(){

    },
    methods:{
        mediaType(val){
            this.active = val;
            this.site = []
            this.parentId = '0'
            this.dirId = '0'
            this.checked = false
            this.ready()
        },
        //媒体列表点击事件
        checkedClick(val,key){
            this.tableData[key].checked = !this.tableData[key].checked
            for(var i=0;i<this.site.length;i++){
                if(this.site[i].id==val.id){
                    this.site.splice(i,1)
                    return;
                }
            }
            this.site.push(val)
        },
        //全选事件
        AllElection(){
            if(this.checked==true){
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].checked = true
                }
                this.site = JSON.parse(JSON.stringify(this.tableData))
            }
            if(this.checked==false){
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].checked = false
                }
                this.site = []
            }
        },
        //文件夹双击事件
        FolderDoubleClick(val,key){
            this.dirId = val.id
            this.site = []
            this.checked = false
            this.ready()
        },
        //返回上层文件夹
        ReturnDir(){
            this.dirId = this.parentId
            this.site = []
            this.checked = false
            this.ready()
        },
        //点击上传按钮
        ADDdialogVisible(){
            this.fileList = []
            this.dialogVisible = true
        },
        //上传
        uploadSectionFile(params){
            var that= this;
            var formdate = new FormData();
            var type = params.file.type.split('/')
            if(type[0]=='image'){
                formdate.append('mediaType','0') 
            }
            if(type[0]=='video'){
                formdate.append('mediaType','1') 
            }
            formdate.append("file", params.file);
            formdate.append('nickName',params.file.name)
            formdate.append('projectId',sessionStorage.projectId)
            formdate.append('dirId',that.dirId)
            $.ajax({
                url:that.serverurl+'/v1/solin/screen/media',
                type: 'POST',
                cache: false,
                data: formdate,
                dataType:'json',
                processData: false,
                contentType: false,
            }).done(function(res){
                if(res.errorCode=='0'){
                    that.$message({
                        message: '上传成功',
                        type:'success',
                        showClose: true,
                    });
                    that.dialogVisible = false
                    that.fileList = []
                    that.site = []
                    that.ready()
                }else{
                    that.errorCode(res)
                    that.fileList = []
                }
            }).error(function(res){
                that.fileList = []
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 点击新建文件夹
        addFolder(){
            this.dialogVisible4 = true;
            this.dirName = ''
        },
        //新建文件夹
        FolderSubmit(){
            var that = this;
            if(that.dirName==''){
                that.$message({
                    type:'error',
                    message:'名称不能为空!',
                    showClose: true,
                })
                return;
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/media/dir',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    dirName:that.dirName,
                    dirType:that.active,
                    parentId:that.dirId,
                    projectId:sessionStorage.projectId
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type:'success',
                            showClose: true,
                        });
                        that.dialogVisible4 = false;
                        that.site = []
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //删除媒体
        removeMedia(){
            var that = this
            var data= {}
            if(that.site.length==0){
                that.$message({
                    type:'error',
                    message:'请选择媒体进行删除',
                    showClose: true,
                })
                return;
            }
            data.medias = []
            data.mediaDirs = []
            var url = ''
            for(var i=0;i<that.site.length;i++){
                if(that.site[i].mediaType=='0'||that.site[i].mediaType=='1'){
                    data.medias.push(that.site[i].id)
                    url = '/v1/solin/screen/media/deletes'
                }
                if(that.site[i].dirType=='0'){
                    data.mediaDirs.push(that.site[i].id)
                    url = '/v1/solin/screen/media/dir/deletes'
                }
            }
            if(data.medias.length != 0&&data.mediaDirs.length != 0){
                that.$message({
                    type:'error',
                    message:'请选择相同媒体类型',
                    showClose: true,
                })
                return;
            }
            that.$confirm('是否删除所选文件？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+url,
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.site = []
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //预览
        previewMedia(){
            var that = this;
            console.log(this.site)
            if(that.site.length==0||that.site.length>=2){
                that.$message({
                    type:'error',
                    message:'请选择单个媒体进行预览',
                    showClose: true,
                })
                return;
            }
            if(that.site[0].dirType!=undefined){
                that.$message({
                    type:'error',
                    message:'文件夹不能预览!',
                    showClose: true,
                })
                return;
            }
            var url = ''
            for(var i=0;i<that.tableData.length;i++){
                if(that.site[0].id==that.tableData[i].id){
                    url = that.serverurl+that.tableData[i].mediaUrl
                    that.mediaTypes = that.tableData[i].mediaType
                }
            }
            that.url = url
            that.dialogVisible2 = true
        },
        //重命名
        rename(){
            var that = this;
            if(that.site.length==0||that.site.length>=2){
                that.$message({
                    type:'error',
                    message:'请选择单个文件进行重命名',
                    showClose: true,
                })
                return;
            }
            that.inputColumn = ''
            that.dialogVisible3 = true
        },
        //重命名保存
        RenameSubmit(){
            var that = this;
            if(that.inputColumn==''){
                that.$message({
                    type:'error',
                    message:'名称不能为空!',
                    showClose: true,
                })
                return;
            }
            var data = {}
            var url = ''
            if(that.site[0].dirType!=undefined){
                data.dirName = that.inputColumn
                data.parentId = that.dirId
                data.id = that.site[0].id
                url = '/v1/solin/screen/media/dir'
            }
            if(that.site[0].mediaType!=undefined){
                data.nickName = that.inputColumn
                data.id = that.site[0].id
                url = '/v1/solin/screen/media'
            }
            $.ajax({
                type:'put',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '修改成功',
                            type:'success',
                            showClose: true,
                        });
                        that.dialogVisible3 = false
                        that.site = []
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //下载媒体
        download(){
            var that = this
            if(that.site.length==0||that.site.length>=2){
                that.$message({
                    type:'error',
                    message:'请选择单个媒体进行下载',
                    showClose: true,
                })
                return;
            }
            var url = ''
            for(var i=0;i<that.tableData.length;i++){
                if(that.site[0].id==that.tableData[i].id){
                    url = that.tableData[i].mediaUrl
                }
            }
            window.open(that.serverurl+"/v1/solin/file/download?fileUrl="+url)
        },
        //媒体拖拽事件(图片,视频)
        dragstart(e){
            // this.mediaID = e.target.id
        },
        //拖拽到文件夹放下事件
        drop (e) {
            // console.log(e)
            // var that = this;
            // that.$confirm('确定移动至此文件夹?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     $.ajax({
            //         type:'post',
            //         async:true,
            //         dataType:'json',
            //         url:that.serverurl+'/v1/solin/screen/media/deletes',
            //         contentType:'application/json;charset=UTF-8',
            //         data:JSON.stringify({
            //             medias:that.site[0].id
            //         }),
            //         success:function(data){
            //             if(data.errorCode=='0'){
            //                 that.$message({
            //                     message: '删除成功',
            //                     type:'success',
            //                     showClose: true,
            //                 });
            //                 that.ready()
            //             }else{
            //                 that.errorCode(data)
            //             }
            //         }
            //     })
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });          
            // });
        },
        //请求媒体列表
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                mediaType:that.active,
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
                        that.parentId = data.result.parentId
                        for(var i=0;i<data.result.mediaDirList.length;i++){
                            data.result.mediaDirList[i].checked = false
                            data.result.mediaDirList[i].dirType = '0'
                        }
                        for(var i=0;i<data.result.mediaList.length;i++){
                            data.result.mediaList[i].checked = false
                        }
                        that.tableData = data.result.mediaDirList.concat(data.result.mediaList)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            for(var i=0;i<data.result.operats.length;i++){
                                if(data.result.operats[i].code=='addMedia'){
                                    that.addMedia = true
                                }
                                if(data.result.operats[i].code=='editMedia'){
                                    that.editMedia = true
                                }
                                if(data.result.operats[i].code=='delMedia'){
                                    that.delMedia = true
                                }
                                // if(data.result.operats[i].code=='addFolder'){
                                //     that.addFolder = true
                                // }
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },  
    created(){
        this.Jurisdiction()
        this.ready()
    }
}
</script>
<style scoped> 
.mediaLibrary{width: 100%;height: 100%;}
.mediaLibrary_top{height: 70px;border-bottom: 1px solid #efefef;padding-left: 20px;display: flex;align-items: center;position: relative;}
.mediaLibrary_top>span{font-size: 18px;line-height: 70px;}
.mediaLibrary_top>p:nth-of-type(1){margin-left: 20px;}
.mediaLibrary_top>p{display: inline-block;margin: 0;font-size: 17px;width: 60px;height: 35px;line-height: 35px;text-align: center;border-radius: 3px;color: #2c3e50;cursor: pointer;}
.mediaStyle{background: #4dd3c5;color: white !important;}
.operation{position: absolute;right: 15px;;height: 100%;line-height: 70px;}
.mediaLibrary_bottom{position: absolute;top: 70px;bottom: 0;left: 0;right: 0;}

.main_top_top{font-size: 16px;padding:15px 0 10px 20px;}
.main_top_top>button{position: absolute;right: 20px;top: 12px;}
.main_top_bottom{padding: 0 0 5px 25px;}
.main_top_bottom>div{display: inline-block;padding: 2px 4px 2px 4px;border: 1px solid #606266;}
.main_top_bottom button{color:#606266;padding:0;}
.main_top_bottom button:active{color: #4dd3c5;}

.main_bottom{position: absolute;top: 80px;bottom: 0;left: 0;right: 0;padding: 0 15px 0 15px;display: flex;flex-wrap: wrap;overflow: auto;}
.section{width: 150px;height: 178px;margin: 5px 20px 5px 20px;position: relative; }
.section_img{height: 130px;overflow: hidden;display: flex;justify-content: center;}
.section_img>img{position: absolute;bottom: 0;max-width: 100%;max-height: 130px;padding:5px;}

.section>span{position: absolute;left: 0;top: 0;border-top: 30px solid white;border-right: 30px solid transparent;}
.section>i{position: absolute;left: 0;top: 0;font-size: 18px;color:white;line-height: initial;}
.checkbdColor{border: 1px solid #4dd3c5 !important;}
.checkBgColor{border-top: 30px solid #4dd3c5 !important;}
.checkColor{color: white !important;}
.section_text{position: absolute;width: 100%;height: 48px;bottom: 0;text-align: center;}
.section_text>p{margin: 0;font-size: 12px;padding-left: 5px;user-select: none;
overflow: hidden;white-space : nowrap;text-overflow: ellipsis;}
.section_text>p:nth-of-type(1){padding:5px;}
.section_text>p:nth-of-type(2){color: #999;}
.FolderEvent{background: rgb(240, 240, 240);}
</style>
