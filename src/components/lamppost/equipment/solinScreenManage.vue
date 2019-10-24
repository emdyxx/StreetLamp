<template>
    <!--广告屏 -->
    <div class="section">
        <div class="section_top">
            <el-dropdown v-if="JurisdictionS.operation" trigger='click' @command="handleCommand">
                <el-button type="primary" size='small' style="width:115px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item v-if="JurisdictionS.issuedProgram" command="0">下发任务</el-dropdown-item> -->
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="1">屏幕开关</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="2">屏幕调光</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="3">屏幕音量</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="4">屏幕重启</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="5">在线更新</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.screenControl" command="6">状态查询</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.synchronousPlayback" command="7">同步播放</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button @click="ScreenManage" type="primary" size="small">节目管理</el-button>
            <div class="search" v-if="JurisdictionS.viewScreenManage">
                <el-dropdown size="small" split-button @command="handleCommand2">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='类型';type='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='3'">
                        <el-select v-model="value" clearable placeholder="请选择" size='small'>
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
        <div class="section_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="moviesTable"
                border
                stripe
                size='small'
                tooltip-effect="dark"
                style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
                @selection-change="tableChange1">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="名称"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="序列号"
                :formatter="formatRole"
                min-width="125">
                </el-table-column>
                <el-table-column
                prop="ipAddress"
                align='center'
                label="IP"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                align='center'
                label="在线状态"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
                </el-table-column>
                <el-table-column
                align='center'
                label="屏幕状态"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status=='0'">关闭</span>
                        <span v-if="scope.row.status=='1'">开启</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="width"
                align='center'
                label="宽:高(像素)"
                min-width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.width}}:{{scope.row.height}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="taskName"
                align='center'
                label="当前播放"
                :formatter="formatRole"
                min-width="110">
                </el-table-column>
                <el-table-column
                prop="brightness"
                align='center'
                label="亮度(%)"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="volume"
                align='center'
                label="音量"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="versionName"
                align='center'
                label="版本"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="timestamp"
                align='center'
                label="采集时间"
                :formatter="formatRole"
                min-width="150">
                </el-table-column>
                <el-table-column
                align='center'
                label="操作"
                :formatter="formatRole"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-dropdown size="small" trigger="click" split-button>
                            更多
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="handleCommand(8,scope.row.id)">屏幕截图</el-dropdown-item>
                                <el-dropdown-item @click.native="handleCommand(9,scope.row.id)">查询定时</el-dropdown-item>
                                <el-dropdown-item @click.native="Speed(scope.row)">查询进度</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
        <!-- 屏幕操作 -->
        <el-dialog
            :title=title
            :visible.sync="dialogVisible"
            width="510px">
            <span>
                <div v-if="operationType=='1'">
                    <el-radio v-model="radio" label="1">手动</el-radio>
                    <div style="margin-top:15px;">
                        <el-switch
                        v-model="switchType"
                        active-text="开"
                        inactive-text="关">
                        </el-switch>
                    </div>
                </div>
                <div v-if="operationType=='2'">
                    <el-radio v-model="radio2" label="1">手动</el-radio>
                    <el-radio v-model="radio2" label="2">定时</el-radio>
                    <div v-if="radio2=='1'">
                        <el-slider v-model="brightnessData.brightness0" :step="10" style="width:350px;"></el-slider>
                    </div>
                    <div v-if="radio2=='2'">
                        <div style="margin-top:20px;">
                            白天:
                            <el-time-picker
                                size="small"
                                is-range
                                v-model="value1"
                                :clearable='false'
                                value-format='HH:mm'
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                @change="pickerChange(0)">
                            </el-time-picker>
                            <el-slider v-model="brightnessData.brightness1" :step="10" style="width:350px;margin-left:35px;"></el-slider>
                        </div>
                        <div style="margin-top:20px;">
                            夜晚:
                            <el-time-picker
                                size="small"
                                is-range
                                disabled
                                v-model="value2"
                                value-format='HH:mm'
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                @change="pickerChange(1)">
                            </el-time-picker>
                            <el-slider v-model="brightnessData.brightness2" :step="10" style="width:350px;margin-left:35px;"></el-slider>
                        </div>
                    </div>
                </div> 
                <div v-if="operationType=='3'">
                    <el-radio v-model="radio3" label="1">手动</el-radio>
                    <el-radio v-model="radio3" label="2">定时</el-radio>
                    <div v-if="radio3=='1'">
                        <el-slider v-model="volumeDatas.volume0" :max="15" style="width:350px;"></el-slider>
                    </div>
                    <div v-if="radio3=='2'">
                        <div style="margin-top:20px;">
                            白天:
                            <el-time-picker
                                size="small"
                                is-range
                                v-model="value1"
                                :clearable='false'
                                value-format='HH:mm'
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                @change="pickerChange(0)">
                            </el-time-picker>
                            <el-slider v-model="volumeDatas.volume1" :max="15" style="width:350px;margin-left:35px;"></el-slider>
                        </div>
                        <div style="margin-top:20px;">
                            夜晚:
                            <el-time-picker
                                size="small"
                                is-range
                                disabled
                                v-model="value2"
                                value-format='HH:mm'
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围"
                                @change="pickerChange(1)">
                            </el-time-picker>
                            <el-slider v-model="volumeDatas.volume2" :max="15" style="width:350px;margin-left:35px;"></el-slider>
                        </div>
                    </div>
                </div>
                <div v-if="operationType=='4'">
                    <el-radio v-model="radio4" label="1">手动</el-radio>
                    <el-radio v-model="radio4" label="2">定时</el-radio>
                    <div v-if="radio4=='1'">
                        <el-radio style="margin:15px 0 0 15px;">重启</el-radio>
                    </div>
                    <div v-if="radio4=='2'">
                        <el-time-picker
                            v-model="rebootTime"
                            :clearable='false'
                            size="small"
                            value-format='HH:mm'
                            placeholder="选择时间"
                            style="margin:15px 0 0 15px;">
                        </el-time-picker>
                        <el-button @click="empty" size="small" type="warning" style="margin-left:10px;">清 空</el-button>
                    </div>
                </div>
                <div v-if="operationType=='5'">
                    <span>请选择升级包:</span>
                    <input style="display: inline-block;" type="file" ref="update" id="update">
                    <div class="el-upload__tip" style="font-size: 14px;">只能上传APK文件</div>
                </div>
                <div v-if="operationType=='8'"
                    v-loading="loading"
                    element-loading-text="正在获取截屏信息"
                    element-loading-spinner="el-icon-loading">
                    <div>
                        <span>屏幕序列号:{{screenSerialNumber}}</span>
                        <span style="margin-left:20px;">时间:{{timestamp}}</span>     
                    </div>
                    <div>
                        <img :src=screenshotMsg class="imgClass" alt="">
                    </div>
                </div>
                <div v-if="operationType=='9'"
                    v-loading="loading"
                    element-loading-text="正在获取定时信息"
                    element-loading-spinner="el-icon-loading">
                    <div>
                        <span>序列号:{{timingData.screenSerialNumber}}</span>
                        <span>采集时间:{{timingData.timestamp}}</span>
                    </div>
                    <div v-if="timingData.brnSchedules!=null" style="margin-top:30px;">
                        <p>调光定时信息:</p>
                        <p>白天:{{timingData.brnSchedules[0].startTime}}-{{timingData.brnSchedules[0].endTime}}  亮度:{{timingData.brnSchedules[0].brightness}}</p>
                        <p>夜晚:{{timingData.brnSchedules[0].endTime}}-{{timingData.brnSchedules[0].startTime}} 亮度:{{timingData.brnSchedules[1].defaultBrightness}}</p>
                    </div>
                    <div v-if='timingData.volumeSchedules!=null' style="margin-top:30px;">
                        <p>音量定时信息:</p>
                        <p>白天:{{timingData.volumeSchedules[0].startTime}}-{{timingData.volumeSchedules[0].endTime}}  音量:{{timingData.volumeSchedules[0].volume}}</p>
                        <p>夜晚:{{timingData.volumeSchedules[0].endTime}}-{{timingData.volumeSchedules[0].startTime}} 音量:{{timingData.volumeSchedules[1].defaultVolume}}</p>
                    </div>
                    <div v-if="timingData.rebootSchedules!=null" style="margin-top:30px;">
                        <p>重启定时信息:</p>
                        <p>重启时间:{{timingData.rebootSchedules[0].timer}}</p>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footer" v-if="operationType!=8&&operationType!=9">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="operationSubmit">下 发</el-button>
            </span>
        </el-dialog>
        <!-- 查询进度 -->
        <el-dialog
            title='进度查询'
            :visible.sync="dialogVisible2"
            width="510px"
            :before-close='handleClose'>
            <span>
                <div>
                    <template v-if="progressType=='1'">
                        任务下发进度: 
                        <span v-if="status=='0'" style="color:red;">无下载任务</span>
                        <span v-if="status=='1'" style="color:#409EFF;">下载中</span>
                        <span v-if="status=='2'" style="color:#67C23A;">下载成功</span>
                        <span v-if="status=='3'" style="color:red;">下发失败</span>
                    </template>
                    <template v-if="progressType=='2'">
                        在线更新进度: 
                        <span v-if="status=='0'" style="color:red;">无下载任务</span>
                        <span v-if="status=='1'" style="color:#409EFF;">下载中</span>
                        <span v-if="status=='2'" style="color:#67C23A;">下载成功</span>
                        <span v-if="status=='3'" style="color:red;">下发失败</span>
                    </template>
                    <el-progress :percentage=progress></el-progress>
                </div>
            </span>
            <span slot="footer" class="dialog-footer" v-if="operationType!=8&&operationType!=9">
                <el-button @click="handleClose">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'solinScreenManage',
    data () {
        return {
            name:'名称',
            type:'1',
            inputColumn:'',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewScreenManage:false,//查看屏幕管理
                screenControl:false,//屏幕控制
                issuedProgram:false,//节目任务下发
                addMedia:false,//添加（上传）媒体
                editMedia:false,//修改媒体名称
                delMedia:false,//删除媒体
                addTask:false,//添加任务
                editTask:false,//修改任务
                delTask:false,//删除任务
                synchronousPlayback:false,//同步播放
                operation:false,//操作
            },
            // 屏幕
            tableData:[],
            tableSite1:[],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            pageSize:10,
            pageIndex:1,
            total:10,
            site:[],
            nickName:'',
            serialNumber:'',
            options:[
                {
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
                }
            ],
            value:'',

            //屏幕操作
            dialogVisible:false,
            title:'屏幕开关',
            operationType:'1',
            value1:['08:00','18:00'],
            value2:['18:00','08:00'],
            
            //屏幕开关
            radio:'1',
            switchType:true,

            //屏幕调光
            radio2:'1',
            brightnessData:{
                brightness0:0,
                brightness1:0,
                brightness2:0,
            },
            //屏幕音量
            radio3:'1',
            volumeDatas:{
                volume0:0,
                volume1:0,
                volume2:0,
            },
            // 定时重启
            radio4:'1',
            rebootTime:'08:00',
            //屏幕截图
            loading:false,
            screenSerialNumber:'',
            screenshotMsg:'',
            timestamp:'',
            //定时信息
            timingData:{},
            //查询进度
            dialogVisible2:false,
            progressType:'1',
            progress:0,
            serialNumbers:'0',
            status:'0',
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand2(){
            this.nickName=''
            this.serialNumber=''
            this.value=''
        },
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue === ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        //列表change事件
        tableChange1(val){this.tableSite1 = val},
        //操作按钮点击事件
        handleCommand(val,id){
            var that = this
            if(val!='8'&&val!='9'){
                if(this.tableSite1.length=='0'){
                    this.$message({
                        message: '请选择广告屏!',
                        type: 'error'
                    });
                    return;
                }
            }
            this.operationType = val;
            //屏幕开关
            if(val=='1'){
                this.dialogVisible = true
                this.title = '屏幕开关'
            }
            //屏幕调光
            if(val=='2'){
                this.brightnessData.brightness0 = 0
                this.dialogVisible = true
                this.title = '屏幕调光'
            }
            //屏幕音量
            if(val=='3'){
                this.volumeDatas.volume0 = 0
                this.dialogVisible = true
                this.title = '屏幕音量'
            }
            //屏幕重启
            if(val=='4'){
                this.dialogVisible = true
                this.title = '屏幕重启'
            }
            //在线更新
            if(val=='5'){
                this.dialogVisible = true
                setTimeout(() => {
                    var file = document.getElementById('update');
                    file.value = '';
                }, 20);
                this.title = '在线更新'
            }
            //状态查询
            if(val=='6'){
                var data = {}
                data.screens = []
                for(var i=0;i<that.tableSite1.length;i++){
                    data.screens.push(that.tableSite1[i].id)
                }
                data.command = '5'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '状态查询中...',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },3000)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            //同步播放
            if(val=='7'){
                var data = {}
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                data.screens = arr
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/playsync',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '请稍后,节目正在同步中...',
                                type: 'success'
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            //屏幕截图
            if(val=='8'){
                this.dialogVisible = true
                this.title = '屏幕截图'
                this.loading = true
                var data = {}
                data.screens = [id]
                data.command = '6'
                var screens = data.screens.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            setTimeout(function(){
                                $.ajax({
                                    type:'get',
                                    async:true,
                                    dataType:'json',
                                    url:that.serverurl+'/v1/solin/screen/device/screenshot/'+screens,
                                    contentType:'application/json;charset=UTF-8',
                                    data:{
                                        screens:screens
                                    },
                                    success:function(res){
                                        if(res.errorCode=='0'){
                                            that.screenSerialNumber = res.result.screenSerialNumber
                                            that.screenshotMsg='data:image/jpeg;base64,'+res.result.screenshotMsg
                                            that.timestamp = res.result.timestamp
                                            that.loading = false
                                        }else{
                                            that.errorCode(res)
                                        }
                                    }
                                })
                            },2500)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            //查询定时信息
            if(val=='9'){
                this.dialogVisible = true
                this.title = '定时信息'
                this.loading = true
                that.timingData = []
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule/information',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        command:0,
                        screens:[id]
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            setTimeout(() => {
                                $.ajax({
                                    type:'post',
                                    async:true,
                                    dataType:'json',
                                    url:that.serverurl+'/v1/solin/screen/device/schedule',
                                    contentType:'application/json;charset=UTF-8',
                                    data:JSON.stringify({
                                        command:0,
                                        screens:[id]
                                    }),
                                    success:function(res){
                                        if(res.errorCode=='0'){
                                            that.loading = false
                                            that.$message({
                                                message: '查询成功',
                                                type: 'success'
                                            });
                                            that.timingData = res.result[0]
                                        }else{
                                            that.errorCode(res)
                                            that.loading = false
                                        }
                                    },
                                })
                            }, 2000);
                        }else{
                            that.errorCode(data)
                            that.loading = false
                        }
                    },
                })
                
            }
        },
        pickerChange(val){
            setTimeout(() => {
                if(val=='0'){
                    this.$set(this.value2, 0, this.value1[1]);
                    this.$set(this.value2, 1, this.value1[0]);
                }
                if(val=='1'){
                    this.$set(this.value1, 0, this.value2[1]);
                    this.$set(this.value1, 1, this.value2[0]);
                }
            }, 200);
        },
        //操作提交
        operationSubmit(){
            var that = this;
            var data = {command:'',screens:[],brightness:'1',volume:'1'}
            var data2 = {}
            for(var i=0;i<this.tableSite1.length;i++){
                data.screens.push(this.tableSite1[i].id)
            }
            if(this.operationType=='1'){
                if(this.switchType==true){data.command='1'}else{data.command='2'}
                this.operationSubmit01(data)
            }
            if(this.operationType=='2'){
                if(this.radio2=='1'){
                    data.command='3'
                    data.brightness=this.brightnessData.brightness0
                    this.operationSubmit01(data)
                }
                if(this.radio2=='2'){
                    data.type='3'
                    data.nickName = ''
                    data.dateType = '0'
                    data.filterType = '0'
                    data.timeType = '1'
                    data.startTime=this.value1[0]
                    data.endTime=this.value1[1]
                    data.projectId = sessionStorage.projectId
                    data.brightness = this.brightnessData.brightness1
                    data.defaultBrightness = this.brightnessData.brightness2
                    
                    data2.command = '9'
                    data2.screens = data.screens
                    this.operationSubmit02(data,data2)
                }
            }
            if(this.operationType=='3'){
                if(this.radio3=='1'){
                    data.command='4'
                    data.volume=this.volumeDatas.volume0
                    this.operationSubmit01(data)
                }
                if(this.radio3=='2'){
                    data.type='4'
                    data.nickName = ''
                    data.dateType = '0'
                    data.filterType = '0'
                    data.timeType = '1'
                    data.startTime=this.value1[0]
                    data.endTime=this.value1[1]
                    data.projectId = sessionStorage.projectId
                    data.volume = this.volumeDatas.volume1
                    data.defaultVolume = this.volumeDatas.volume2

                    data2.command = '10'
                    data2.screens = data.screens
                    this.operationSubmit02(data,data2)
                }
            }
            if(this.operationType=='4'){
                if(this.radio4=='1'){
                    data.command = '7'
                    this.operationSubmit01(data)
                }
                if(this.radio4=='2'){
                    data.nickName = ''
                    data.rebootTime = that.rebootTime
                    data.projectId = sessionStorage.projectId

                    data2.command = '11' 
                    data2.screens = data.screens
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/schedule/reboot',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
                        success:function(data){
                            if(data.errorCode=='0'){
                                data2.schedules = [data.result.id]
                                $.ajax({
                                    type:'post',
                                    async:true,
                                    dataType:'json',
                                    url:that.serverurl+'/v1/solin/screen/control/schedule',
                                    contentType:'application/json;charset=UTF-8',
                                    data:JSON.stringify(data2),
                                    success:function(res){
                                        if(res.errorCode=='0'){
                                            that.$message({
                                                message: '操作成功!',
                                                type: 'success'
                                            });
                                            that.dialogVisible = false
                                        }else{
                                            that.errorCode(res)
                                        }
                                    },
                                })
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
            }
            if(this.operationType=='5'){
                this.updateSubmit(data.screens)
            }
        },
        //操作提交请求1
        operationSubmit01(data){
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '操作成功!',
                            type: 'success'
                        });
                        that.dialogVisible = false
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        operationSubmit02(data,data2){
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    data2.schedules = [data.result.id]
                    if(data.errorCode=='0'){
                        $.ajax({
                            type:'post',
                            async:true,
                            dataType:'json',
                            url:that.serverurl+'/v1/solin/screen/control/schedule',
                            contentType:'application/json;charset=UTF-8',
                            data:JSON.stringify(data2),
                            success:function(res){
                                if(res.errorCode=='0'){
                                    that.$message({
                                        message: '操作成功!',
                                        type: 'success'
                                    });
                                    that.dialogVisible = false
                                }else{
                                    that.errorCode(res)
                                }
                            },
                        })
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //更新下发
        updateSubmit(data){
            var that = this;
            var arr = data
            var formdate = new FormData();
            formdate.append("file", this.$refs.update.files[0]);
            formdate.append("screens", arr.join(','));
            $.ajax({
                url:that.serverurl+'/v1/solin/screen/control/app/upgrade',
                type: 'POST',
                cache: false,
                data: formdate,
                dataType:'json',
                processData: false,
                contentType: false,
            }).done(function(data){
                if(data.errorCode=='0'){
                    that.$message({
                        message: '正在更新中,请稍后...',
                        type:'success',
                        showClose: true,
                    });
                }else{
                    that.errorCode(data)
                }
            }).error(function(data){
                that.errorCode(data)
            })
        },
        //清空屏幕定时信息
        empty(){
            var that = this;
            var data = {screens:[],command:'4'}
            for(var i=0;i<this.tableSite1.length;i++){
                data.screens.push(this.tableSite1[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control/schedule/clear',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '操作成功!',
                            type: 'success'
                        });
                        that.dialogVisible = false
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击查询进度
        Speed(val){
            var that = this;
            this.dialogVisible2 = true
            this.status = '0'
            this.progressType = '1'
            this.progress = 0
            this.serialNumbers = ''
            var url = this.serverurl;
            url = url.split('//')
            var ws = ''
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device',
                data:{
                    page:1,
                    size:10,
                    serialNumber:val.serialNumber,
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        if(data.result.list[0].taskStatus=='1'){
                            that.status  = data.result.list[0].taskStatus
                            that.progressType = '1'
                        }
                        if(data.result.list[0].appStatus=='1'){
                            that.status  = data.result.list[0].appStatus
                            that.progressType = '2'
                        }
                        if(that.status=='1'){
                            ws = new WebSocket('ws://' + url[1]+'/websocketServicer/'+val.id);
                            ws.onopen = () => {
                
                            }
                            ws.onmessage = evt => {
                                var res = JSON.parse(evt.data)
                                if(res.progress==100||res.status=='3'){
                                    that.progress = 0
                                    that.status = res.status
                                    ws.close()
                                    return
                                }
                                that.progressType = res.progressType
                                that.progress = Number(res.progress*100).toFixed(0)
                                that.serialNumbers = res.serialNumber
                            }
                            // 路由跳转时结束websocket链接
                            that.$router.afterEach(function () {
                                ws.close()
                            })
                        }
                        if(that.status=='2'){
                            that.progress = 100
                        }
                        console.log(that.status)
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //关闭查询进度
        handleClose(){
            this.dialogVisible2 = false
        },
        //屏幕管理按钮
        ScreenManage(){
            sessionStorage.removeItem('type');
            this.$router.push({path:'/TheTaskPage'})
        },
        //获取广告屏列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   online:that.value,
                   nickName:that.nickName,
                   serialNumber:that.serialNumber,
                   poleId:'',
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
        search(){
            this.ready()
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
                            if(data.result.operats[i].code=='viewScreenManage'){
                                that.JurisdictionS.viewScreenManage = true
                            }
                            if(data.result.operats[i].code=='screenControl'){
                                that.JurisdictionS.screenControl = true
                                that.JurisdictionS.operation = true
                            }
                            if(data.result.operats[i].code=='issuedProgram'){
                                that.JurisdictionS.issuedProgram = true
                            }
                            if(data.result.operats[i].code=='addMedia'){
                                that.JurisdictionS.addMedia = true
                            }
                            if(data.result.operats[i].code=='editMedia'){
                                that.JurisdictionS.editMedia = true
                            }
                            if(data.result.operats[i].code=='delMedia'){
                                that.JurisdictionS.delMedia = true
                            }
                            if(data.result.operats[i].code=='addTask'){
                                that.JurisdictionS.addTask = true
                            }
                            if(data.result.operats[i].code=='editTask'){
                                that.JurisdictionS.editTask = true
                            }
                            if(data.result.operats[i].code=='delTask'){
                                that.JurisdictionS.delTask = true
                            }
                            if(data.result.operats[i].code=='synchronousPlayback'){
                                that.JurisdictionS.synchronousPlayback = true
                                that.JurisdictionS.operation = true
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
        var that = this 
        that.ready()
        this.Jurisdiction()
    }
}
</script>
<style scoped>
.mediaLibrary_top,{width: 100%;height: 35px;}
.mediaLibrary_top>span,{font-size: 15px;line-height: 35px;}
.mediaLibrary_top>span:nth-of-type(2){margin-left: 30px;}
.mediaLibrary_bottom{width: 100%;height: auto;margin-top:5px;}
</style>
