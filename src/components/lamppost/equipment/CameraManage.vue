<template>
    <!-- 摄像头操作 -->
    <div class="CameraManage">
        <div class="CameraManage_top">
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{names}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="names='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="names='IP';type='2';">IP</el-dropdown-item>
                        <el-dropdown-item @click.native="names='状态';type='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="ipAddress" size="small" placeholder="请输入IP" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='3'">
                        <el-select v-model="value" size='small' style="width:194px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="CameraManage_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="myModalmoviesTable"
                border
                stripe
                size='small'
                slot="empty"
                tooltip-effect="dark"
                @selection-change="myModalChange"
                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;margin-top:10px;">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="名称"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="ipAddress"
                align='center'
                label="IP"
                min-width="100">
                </el-table-column>
                <el-table-column
                align='center'
                label="状态"
                min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="producerName"
                align='center'
                label="厂商"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="cameraNumber"
                align='center'
                label="编号"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="poleName"
                align='center'
                label="归属灯杆"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="remark"
                align='center'
                label="备注"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="创建时间"
                :formatter="formatRole"
                xshow-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="创建时间"
                :formatter="formatRole"
                min-width="100">
                    <template slot-scope="scope">
                        <el-button @click="preview(scope.row)" type="primary" size='small'>预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                background
                @size-change="sizechange"
                @current-change="currentchange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 摄像头模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:670px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">{{name}}</h4>
                    </div>
                    <div class="modal-body Modal">
                        <div class="Modal_left">
                            <a href="https://get.adobe.com/cn/flashplayer/" class="flashLoadMsg" target="_blank">请点击安装或者启用FLASH播放器</a>
                            <div id="engage_view" style="display: block;">
                                <div id="engage_content">
                                    <div id="engage_resize_container">
                                        <div id="engage_video" style="width: 472px;height: 370px;">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="Modal_right">
                            <span class="el-upload__tip" style="font-size:18px;">控制台</span>
                            <div>
                                <p>
                                    <el-button @click="operation(25)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(-45deg);">
                                    </el-button>
                                    <el-button @click="operation(21)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="">
                                    </el-button>
                                    <el-button @click="operation(26)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(45deg);">
                                    </el-button>
                                </p>
                                <p>
                                    <el-button @click="operation(23)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(-90deg);">
                                    </el-button>
                                    <el-button @click="operation(29)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/load.png" alt="">
                                    </el-button>
                                    <el-button @click="operation(24)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(90deg);">
                                    </el-button>
                                </p>
                                <p>
                                    <el-button @click="operation(27)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(-135deg);">
                                    </el-button>
                                    <el-button @click="operation(22)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(180deg);">
                                    </el-button>
                                    <el-button @click="operation(28)" type="primary" style="padding:5px;">
                                        <img src="../../../assets/img/top.png" alt="" style="transform:rotate(135deg);">
                                    </el-button>
                                </p>
                            </div>
                            <div style="margin-left:20px;">
                                <p>
                                    <el-button @click="operation(11)" type="primary" title="焦距变大" style="padding:5px;">
                                        <img src="../../../assets/img/enlarge.png" alt="">
                                    </el-button>
                                    <el-button @click="operation(12)" type="primary" title="焦距变小" style="padding:5px;">
                                        <img src="../../../assets/img/narrow.png" alt="">
                                    </el-button>
                                </p>
                                <p>
                                    <el-button @click="operation(13)" type="primary" title="焦点前调" style="padding:5px;">
                                        <img src="../../../assets/img/distance1.png" alt="">
                                    </el-button>
                                    <el-button @click="operation(14)" type="primary" title="焦点后调" style="padding:5px;">
                                        <img src="../../../assets/img/distance2.png" alt="">
                                    </el-button>
                                </p>
                                <p>
                                    <el-button @click="operation(15)" type="primary" title="光圈扩大" style="padding:5px;width: 30px;">
                                        <img src="../../../assets/img/spot1.png" alt="">
                                    </el-button>
                                    <el-button @click="operation(16)" type="primary" title="光圈缩小" style="padding:5px;width: 30px;">
                                        <img src="../../../assets/img/spot2.png" alt="">
                                    </el-button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
import VideoJs from 'video.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'

export default {
    name: 'solinCameraDeploy',
    data () {
        return {
            serverurl:localStorage.serverurl,
            names:'名称',
            type:'1',
            nickName:'',
            ipAddress:'',
            options:[{
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
            }],
            value:'',

            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,

            player:'',
            name:'',
            id:'',
            url:'',
        }
    },
    mounted(){
         
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.ipAddress=''
            this.value=''
        },
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        //预览
        preview(val){
            var that = this;
            $('#myModal').modal('show')
            var flag = false;
            if(window.ActiveXObject){
                try{
                    var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if(swf){
                        flag = true;
                    }
                }catch(e){
                }
            }else{
                try{
                    var swf = navigator.plugins['Shockwave Flash'];
                    if(swf){
                        flag = true;
                    }
                }catch(e){
                }
            }
            if(flag){
                $('.flashLoadMsg').css('display','none')
            }else{
                $('.flashLoadMsg').css('display','flex')
            }
            this.name = val.nickName;
            this.id = val.id
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/preview',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(
                    {
                        command:'1',
                        id:val.id,
                    }
                ),
                success:function(data){
                    if(data.errorCode=='0'){
                        var url = localStorage.serverurl.split('/')
                        url = url[2].split(':')
                        that.url ='rtmp://' + url[0]+':8072'+ data.result.camera.rtmpStream
                        // that.url='rtmp://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1'
                        var id = 'my-video'
                        $('#engage_video').append(
                            '<video id="'+id+'" class="video-js vjs-default-skin vjs-big-play-centered flex-grid" poster="" width="472" height="370">'+
                                '<source src="'+that.url+'" type="rtmp/flv"/>'+
                            '</video>'
                        )
                        that.player = VideoJs('my-video');
                        that.player.play();
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            $('#myModal').on('hide.bs.modal', function () {
                that.player.dispose()
            })
        },
        //操作
        operation(val){
            console.log(val)
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    action:'0',
                    command:val,
                    id:that.id
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        $.ajax({
                            type:'post',
                            async:true,
                            dataType:'json',
                            url:that.serverurl+'/v1/solin/camera/device/control',
                            contentType:'application/json;charset=UTF-8',
                            data:JSON.stringify(
                                {
                                    action:'1',
                                    command:val,
                                    id:that.id
                                }
                            ),
                            success:function(data){
                                if(data.errorCode=='0'){
                                    
                                }else{
                                    that.errorCode(data)
                                }
                            }
                        })
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    ipAddress:that.ipAddress,
                    online:that.value,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        console.log(data.result.list)
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        myModalChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready();},
        currentchange(val){this.pageIndex = val;this.ready();},
        search(){this.ready();}
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>
.CameraManage{width: 100%;height: 100%;}
.CameraManage>div{width: 100%;position: absolute;}
.CameraManage_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.CameraManage_top>button,.CameraManage_top>div{height:33px;margin:8px 0 0 10px;}
.CameraManage_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}
.search{display: flex;align-items: center;margin-left: 20px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}

.Modal{width: 100%;height: 400px;display: flex;}
.Modal_left{width: 480px;position: relative;}
.flashLoadMsg{width: 100%;height: 100%;background: black;display: flex;justify-content: center;align-items: center;font-size: 16px;display: none;position: absolute;z-index: 9;}
.video-js{width: 472px !important;height: 370px !important;}
.Modal_right{width: 180px;margin-left: 20px;}
.Modal_right>div{margin-top: 30px;}
.Modal_right button{padding:5px;}
</style>
