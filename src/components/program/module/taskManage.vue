<template>
    <div class="section">
        <div class="section_top">
            <p style="left:20px;">位置: &nbsp;设备操作>LED屏幕>节目制作>任务管理</p>
            <div>
                <span @click="ScreenManage">屏幕操作</span>
                <span style="background: #4382e6;color:white;">节目制作</span>
            </div>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="section_bottom_right" v-if="addTask">
                    <el-button @click="addTasks(0)" size="small" icon='el-icon-plus' type="primary" plain>创建任务</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData" 
                    border
                    size='small'
                    tooltip-effect="dark"
                    style="width: 100%;overflow:auto;max-height:90%;">
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="170">
                    </el-table-column>
                    <el-table-column
                    prop="publish"
                    show-overflow-tooltip
                    label="状态"
                    min-width="140">
                        <template slot-scope="scope">
                            <span v-if="scope.row.publish==0" class="offLine">未发布</span>
                            <span v-if="scope.row.publish==1" class="onLine">已发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    min-width="190">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="180">
                        <template slot-scope="scope">
                            <el-button v-if='editTask' size="mini" @click="editTasks(scope.row)" type="primary">编辑任务</el-button>
                            <el-dropdown size="mini" trigger="click" split-button type="primary">
                                更多
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if='delTask' @click.native="handleCommand(1,scope.row.id)">删除任务</el-dropdown-item>
                                    <el-dropdown-item @click.native="handleCommand(2,scope.row.id)">发布任务</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                @size-change="sizechange"
                @current-change="currentchange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Total">
                </el-pagination>
            </div>
        </div>
        <!-- 创建任务 -->
        <div class="modal fade" id="myModal" style="z-index:2000;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:680px;">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="myModalHeader">
                            <el-input
                                v-if="type==0"
                                size="medium"
                                placeholder='任务名称'
                                suffix-icon="el-icon-edit"
                                oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"
                                v-model="ProgramName">
                            </el-input>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="myModalMain">
                            <el-table
                                :data="ProgramTable" 
                                ref="ProgramTable"
                                border
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;height:100%;overflow:auto;"
                                @selection-change="programTableChange">
                                <el-table-column 
                                type="selection"  
                                width="55"
                                align="center">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                
                                label="节目名称"
                                min-width="100">
                                </el-table-column>
                                <el-table-column
                                
                                label="宽:高"
                                min-width="60">
                                    <template slot-scope="scope">
                                        {{scope.row.width}}:{{scope.row.height}}
                                    </template>   
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                
                                label="创建时间"
                                min-width="100">
                                </el-table-column>
                                <el-table-column
                                label="节目管理"
                                
                                v-if="type=='0'"
                                show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button @click="SetUp(0,scope.row)" type="text" size="small">设置</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="myModalFooter">
                            <div class="block">
                                <el-pagination
                                @size-change="ProgramSizeChange"
                                @current-change="ProgramCurrentChange"
                                :current-page="ProgramIndex"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="ProgramSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="ProgramTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="border:none;">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <el-button @click="TaskSubmit" type="primary" size="small">确定</el-button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目设置 -->
        <div class="modal fade" id="programSetUp" style="z-index:2000;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="myModalHeader">
                            <span>节目设置播放</span>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="myModalMain">
                            <!-- 指定日期 -->
                            <div style="margin-top:20px;">
                                <el-radio-group v-model="taskSchedule.dateType">
                                    <el-radio :label="0">永久</el-radio>
                                    <el-radio :label="1">指定日期</el-radio>
                                </el-radio-group>
                                <div v-if="taskSchedule.dateType=='1'">
                                    <el-date-picker
                                        v-model="taskSchedule.startDate"
                                        type="date"
                                        size='small'
                                        value-format='yyyy-MM-dd'
                                        placeholder="开始日期"
                                        style="width:156px;margin-left:10px;">
                                    </el-date-picker>
                                    <span>至</span>
                                    <el-date-picker
                                        v-model="taskSchedule.endDate"
                                        type="date"
                                        size='small'
                                        value-format='yyyy-MM-dd'
                                        placeholder="结束日期"
                                        style="width:156px;">
                                    </el-date-picker>
                                </div>
                            </div>
                            <!-- 指定时间 -->
                            <div style="margin-top:20px;">
                                <el-radio-group v-model="taskSchedule.timeType">
                                    <el-radio :label="0">全天</el-radio>
                                    <el-radio :label="1">指定时间</el-radio>
                                </el-radio-group>
                                <div v-if="taskSchedule.timeType=='1'">
                                    <el-time-picker
                                        v-model="taskSchedule.startTime"
                                        value-format='HH:mm'
                                        size='small'
                                        placeholder="开始时间"
                                        style="width:156px;margin-left:10px;">
                                    </el-time-picker>
                                    <span>至</span>
                                    <el-time-picker
                                        v-model="taskSchedule.endTime"
                                        value-format='HH:mm'
                                        size='small'
                                        placeholder="结束时间"
                                        style="width:156px">
                                    </el-time-picker>
                                </div>
                            </div>
                            <!-- 指定星期 -->
                            <div style="margin-top:20px;">
                                <el-radio-group v-model="taskSchedule.filterType">
                                    <el-radio :label="0">无指定</el-radio>
                                    <el-radio :label="1">指定星期</el-radio>
                                </el-radio-group>
                                <div v-if="taskSchedule.filterType=='1'" class="myModalright" style="margin-left:10px;">
                                    <el-checkbox-group v-model="taskSchedule.checkList">
                                        <el-checkbox :label="1">周一</el-checkbox>
                                        <el-checkbox :label="2">周二</el-checkbox>
                                        <el-checkbox :label="3">周三</el-checkbox>
                                        <el-checkbox :label="4">周四</el-checkbox>
                                        <el-checkbox :label="5">周五</el-checkbox>
                                        <el-checkbox :label="6">周六</el-checkbox>
                                        <el-checkbox :label="7">周日</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <!-- 指定次数 -->
                            <div style="margin-top:20px;">
                                <span>播放次数:</span>
                                <el-input-number v-model="taskSchedule.repeatTimes" size="small" :min="1" :max="100" label="播放次数"></el-input-number>
                                <el-tooltip class="item" effect="dark" content="任务里同个时间段只有一个节目情况下默认节目循环播放，如果有多个节目情况下，每个节目根据设置的播放次数循环播放" placement="top">
                                    <span class="el-icon-question" style="font-size:18px;color: #606266;"></span>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="border:none;">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <el-button @click="programSure" type="primary" size="small">确定</el-button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 任务下发 -->
        <el-dialog
            title="选择屏幕"
            :visible.sync="dialogVisible2"
            width="600px">
            <span>
                <div class="myModalMain" style="margin-top:0;">
                    <el-table
                        :data="ScreenTable" 
                        ref="ProgramTable"
                        border
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;height:100%;overflow:auto;"
                        @selection-change="ScreenTableChange">
                        <el-table-column 
                        type="selection" 
                        align="center" 
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        show-overflow-tooltip
                        label="名称"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        show-overflow-tooltip
                        label="序列号"
                        :formatter="formatRole"
                        min-width="125">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="在线状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.online=='0'">离线</span>
                                <span v-if="scope.row.online=='1'">在线</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="屏幕状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status=='0'">关闭</span>
                                <span v-if="scope.row.status=='1'">开启</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="taskName"
                        label="当前任务"
                        :formatter="formatRole"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="myModalFooter">
                    <div class="block">
                        <el-pagination
                        @size-change="ScreenSizeChange"
                        @current-change="ScreenCurrentChange"
                        :current-page="ScreenIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="ScreenSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="ScreenTotal">
                        </el-pagination>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button @click="ReleaseTask" type="primary">发 布</el-button>
            </span>
        </el-dialog>
        <!-- 任务下发验证码 -->
        <el-dialog
            title="请输入验证码"
            :visible.sync="dialogVisible"
            width="290px">
            <span>
                <span>验证码:</span>
                <el-input v-model="smsCode " placeholder="请输入验证码" maxlength='6' size="small" style="width:196px;"></el-input>
                <div class="el-upload__tip" style="padding-left:50px;">发送至:{{mobile}},有效期10分钟</div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="ReleaseTaskCode(true)" type="primary">确定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑任务 -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="myModalHeader">
                            <el-input
                                size="medium"
                                placeholder='任务名称'
                                suffix-icon="el-icon-edit"
                                oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"
                                v-model="ProgramName">
                            </el-input>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="myModalMain">
                            <div>
                                <el-button @click="addTasks(1)" type="primary" size="small">添加节目</el-button>
                            </div>
                            <el-table
                                :data="editTaskData" 
                                ref="ProgramTable"
                                border
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;height:100%;margin-top:15px;overflow:auto;">
                                <el-table-column
                                prop="programName"
                                
                                label="节目名称"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="programSize"
                                
                                label="节目大小"
                                min-width="50">
                                </el-table-column>
                                <el-table-column
                                label="顺序调整"
                                
                                min-width="50">
                                    <template slot-scope="scope">
                                        <i @click="move(0,scope.row)" class='el-icon-sort-up' style="font-size:25px;"></i>
                                        <i @click="move(1,scope.row)" class='el-icon-sort-down' style="font-size:25px;"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="节目管理"
                                
                                show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button @click="SetUp(1,scope.row)" type="text" size="small">设置</el-button>
                                        <el-button @click="RemoveTask(scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="modal-footer" style="border:none;">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <el-button @click="editTaskSubmit" type="primary" size="small">确定</el-button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name:'taskManage',
    data () {
        return {
            addTask:false,
            editTask:false,
            delTask:false,
            serverurl:localStorage.serverurl,
            tableData:[],
            pageIndex:1,
            pageSize:10,
            Total:10,
            type:0,// 0添加 1编辑
            ProgramName:'',
            ProgramTable:[],
            ProgramSite:[],
            ProgramIndex:1,
            ProgramSize:10,
            ProgramTotal:10,
            ProgramId:'',
            taskSchedule:{
                dateType:0,
                timeType:0,
                filterType:0,
                startDate:'',
                endDate:'',
                startTime:'',
                endTime:'',
                checkList:[],
                filterValue:'',
                repeatTimes:1,
            },
            dialogVisible2:false,//任务下发
            dialogVisible:false,//是否输入验证码
            smsCode:'',//验证码
            mobile:'',//手机号
            ScreenTable:[],
            ScreenSite:[],
            ScreenIndex:1,
            ScreenSize:10,
            ScreenTotal:10,
            //编辑任务
            editTaskId:'',
            editTaskData:[],
        }
    },
    mounted(){

    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        //创建任务 / 编辑添加节目
        addTasks(type){
            if(type=='0'){
                this.ProgramName = ''
            }
            this.type = type;
            this.ProgramData()
            $('#myModal').modal('show')
        },
        //编辑任务
        editTasks(val){
            var that = this;
            that.editTaskId = val.id
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task/information/'+val.id,
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.editTaskData = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            that.ProgramName = val.nickName
            $('#editModal').modal('show')
        },
        //编辑-删除任务
        RemoveTask(val){
            for(var i=0;i<this.editTaskData.length;i++){
                if(this.editTaskData[i].programId==val.programId){
                    this.editTaskData.splice(i,1)
                }
            }
        },
        //请求所有节目信息
        ProgramData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program',
                data:{
                    page:that.ProgramIndex,
                    size:that.ProgramSize,
                    programType:'',
                    nickName:'',
                    audit:'2',
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.ProgramTable = data.result.list
                        that.ProgramTotal = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        programTableChange(val){this.ProgramSite = val;},
        ProgramSizeChange(val){this.ProgramSize = val;this.ProgramData()},
        ProgramCurrentChange(val){this.ProgramIndex = val;this.ProgramData()},
        //添加,编辑---设置
        SetUp(type,val){
            var that = this;
            that.type = type
            if(val.taskSchedule==null||val.taskSchedule==undefined||val.taskSchedule==''){
                that.taskSchedule.dateType=0
                that.taskSchedule.timeType=0
                that.taskSchedule.filterType=0
                that.taskSchedule.startDate=''
                that.taskSchedule.endDate=''
                that.taskSchedule.startTime=''
                that.taskSchedule.endTime=''
                that.taskSchedule.checkList=[]
                that.taskSchedule.filterValue=''
                that.taskSchedule.repeatTimes=1
                if(type==0){
                    that.ProgramId = val.id;
                }
                if(type==1){
                    that.ProgramId = val.programId;
                }
                
            }else{
                if(type==0){
                    that.ProgramId = val.id;
                    that.taskSchedule = JSON.parse(JSON.stringify(val.taskSchedule))
                }
                if(type==1){
                    that.ProgramId = val.programId; 
                    that.taskSchedule.dateType = val.taskSchedule.dateType
                    that.taskSchedule.timeType = val.taskSchedule.timeType
                    that.taskSchedule.filterType = val.taskSchedule.filterType
                    that.taskSchedule.startDate = val.taskSchedule.startDate
                    that.taskSchedule.endDate = val.taskSchedule.endDate
                    that.taskSchedule.startTime = val.taskSchedule.startTime
                    that.taskSchedule.endTime = val.taskSchedule.endTime
                    that.taskSchedule.checkList = []
                    that.taskSchedule.filterValue = val.taskSchedule.filterValue
                    that.taskSchedule.repeatTimes = val.repeatTimes
                    if(val.taskSchedule.filterValue==''){
                        that.taskSchedule.checkList = []
                    }else{
                        that.taskSchedule.checkList = val.taskSchedule.filterValue.split(',')
                        for(var i=0;i<that.taskSchedule.checkList.length;i++){
                            that.taskSchedule.checkList[i] = Number(that.taskSchedule.checkList[i])
                        }
                    }
                }
            }
            $('#programSetUp').modal('show')
        },
        //设置确定
        programSure(){
            var that = this;
            if(that.taskSchedule.dateType==1){
                if(that.taskSchedule.startDate==''||that.taskSchedule.endDate==''){
                    that.$message({
                        message: '开始结束日期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }
            if(that.taskSchedule.timeType==1){
                if(that.taskSchedule.startTime==''||that.taskSchedule.endTime==''){
                    that.$message({
                        message: '开始结束时间不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }
            if(that.taskSchedule.filterType==1){
                if(that.taskSchedule.checkList.length==0){
                    that.$message({
                        message: '星期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }else{
                    that.taskSchedule.filterValue = that.taskSchedule.checkList.join(',')
                }
            }
            if(that.taskSchedule.repeatTimes==''){
                that.$message({
                    message: '播放次数不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.type==0){
                for(var i = 0;i<that.ProgramTable.length;i++){
                    if(that.ProgramTable[i].id==that.ProgramId){
                        that.ProgramTable[i].repeatTimes = that.taskSchedule.repeatTimes
                        that.ProgramTable[i].taskSchedule = JSON.parse(JSON.stringify(that.taskSchedule))
                    }
                }
            }
            if(that.type==1){
                for(var i = 0;i<that.editTaskData.length;i++){
                    if(that.editTaskData[i].programId==that.ProgramId){
                        that.editTaskData[i].repeatTimes = that.taskSchedule.repeatTimes
                        that.editTaskData[i].taskSchedule = JSON.parse(JSON.stringify(that.taskSchedule))
                    }
                }
            }
            $('#programSetUp').modal('hide')
        },
        //添加任务保存
        TaskSubmit(){
            var that = this;
            that.taskSchedule.dateType=0
            that.taskSchedule.timeType=0
            that.taskSchedule.filterType=0
            that.taskSchedule.startDate=''
            that.taskSchedule.endDate=''
            that.taskSchedule.startTime=''
            that.taskSchedule.endTime=''
            that.taskSchedule.checkList=[]
            that.taskSchedule.filterValue=''
            that.taskSchedule.repeatTimes=1
            if(that.ProgramSite.length==0){
                that.$message({
                    message: '请选择节目!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.type==0){
                if(that.ProgramName==''){
                    that.$message({
                        message: '任务名称不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                for(var i=0;i<that.ProgramSite.length;i++){
                    if(that.ProgramSite[i].taskSchedule==null||that.ProgramSite[i].taskSchedule==undefined||that.ProgramSite[i].taskSchedule==''){
                        that.ProgramSite[i].taskSchedule = JSON.parse(JSON.stringify(that.taskSchedule))
                    }
                    that.ProgramSite[i].programName = that.ProgramSite[i].nickName
                    that.ProgramSite[i].programId = that.ProgramSite[i].id
                    that.ProgramSite[i].priority = i+1
                    that.ProgramSite[i].repeatTimes = that.ProgramSite[i].taskSchedule.repeatTimes
                }
                var data = {}
                data.nickName = that.ProgramName
                data.projectId = sessionStorage.projectId
                data.taskDetails = that.ProgramSite
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/task',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功!',
                                type:'success',
                                showClose: true,
                            });
                            $('#myModal').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(that.type==1){
                for(var i=0;i<that.ProgramSite.length;i++){
                    that.ProgramSite[i].programName = that.ProgramSite[i].nickName
                    that.ProgramSite[i].programId = that.ProgramSite[i].id
                    if(that.ProgramSite[i].taskSchedule==undefined||that.ProgramSite[i].taskSchedule==null){
                        that.ProgramSite[i].taskSchedule = that.taskSchedule
                        that.ProgramSite[i].repeatTimes = that.taskSchedule.repeatTimes
                    }
                    that.editTaskData.push(that.ProgramSite[i])
                }
                $('#myModal').modal('hide')
            }
        },
        //编辑任务上下移动
        move(val,item){
            var length = this.editTaskData.length;
            var index = ''
            for(var i=0;i<this.editTaskData.length;i++){
                if(item.programId==this.editTaskData[i].programId){
                    index = i
                }
            }
            var data = item
            //上移动
            if(val=='0'){
                if(index == 0){
                    return;
                }
                this.editTaskData.splice(index,1)
                this.editTaskData.splice(index-1,0,data)
            }
            //下移动
            if(val=='1'){
                if(index == length){
                    return;
                }
                this.editTaskData.splice(index,1)
                this.editTaskData.splice(index+1,0,data)
            }
        },
        //编辑任务保存
        editTaskSubmit(){
            var that = this;
            if(that.ProgramName==''){
                that.$message({
                    message: '任务名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i=0;i<that.editTaskData.length;i++){
                that.editTaskData[i].priority = i+1
            }
            var data = {}
            data.id = that.editTaskId
            data.nickName = that.ProgramName
            data.projectId = sessionStorage.projectId
            data.taskDetails = that.editTaskData
            $.ajax({
                type:'put',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type:'success',
                            showClose: true,
                        });
                        $('#editModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 点击删除任务/发布任务按钮
        handleCommand(val,id){
            var that = this;
            if(val=='1'){
                var data = {}
                data.taskIds = [id]
                that.$confirm('是否删除所选任务？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/task/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.ready()
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
            if(val=='2'){
                that.editTaskId = id
                that.dialogVisible2 = true
                that.ScreenData()
            }
        },
        //验证是否需要短信
        ReleaseTask(){
            var that = this;
            if(that.ScreenSite.length==0){
                that.$message({
                    message: '请选择屏幕!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            data.taskId = that.editTaskId
            data.screens = []
            for(var i = 0;i<that.ScreenSite.length;i++){
                data.screens.push(that.ScreenSite[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control/task/sms?taskId='+that.editTaskId,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        if(data.result.openSms=='false'){
                            that.ReleaseTaskCode(false)
                        }else{
                            that.mobile = data.result.mobile
                            that.dialogVisible = true
                            that.smsCode = ''
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //任务发布
        ReleaseTaskCode(type){
            var that = this;
            if(type==false){}else{
                if(that.smsCode==''){
                    that.$message({
                        message: '验证码不能为空!',
                        type: 'error'
                    });
                    return;
                }
            }
            var screens = []
            for(var i = 0;i<that.ScreenSite.length;i++){
                screens.push(that.ScreenSite[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control/task',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    screens:screens,
                    smsCode:that.smsCode,
                    taskId:that.editTaskId
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '发布成功!',
                            type: 'success'
                        });
                        that.dialogVisible = false
                        that.dialogVisible2 = false;
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求屏幕列表
        ScreenData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device',
                data:{
                   page:that.ScreenIndex,
                   size:that.ScreenSize,
                   online:'1',
                   nickName:'',
                   serialNumber:'',
                   poleId:'',
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.ScreenTable = data.result.list
                        that.ScreenTotal = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        ScreenTableChange(val){this.ScreenSite = val;},
        ScreenSizeChange(val){this.ScreenSize = val;this.ScreenData()},
        ScreenCurrentChange(val){this.ScreenIndex = val;this.ScreenData()},
        //请求任务列表
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:'',
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.Total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},  
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
                                if(data.result.operats[i].code=='addTask'){
                                    that.addTask = true
                                }
                                if(data.result.operats[i].code=='editTask'){
                                    that.editTask = true
                                }
                                if(data.result.operats[i].code=='delTask'){
                                    that.delTask = true
                                }
                                // if(data.result.operats[i].code=='shortcutTask'){
                                //     that.shortcutTask = true
                                // }
                                // if(data.result.operats[i].code=='submitReview'){
                                //     that.submitReview = true
                                // }
                                // if(data.result.operats[i].code=='review'){
                                //     that.review = true
                                // }
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //屏幕--节目管理按钮
        ScreenManage(){
            this.$router.push({path:'/solinScreenManage'})
        },
    },
    created(){
        this.Jurisdiction()
        this.ready()
    }
}
</script>
<style scoped>
.taskManage{width: 100%;height: 100%;}
.taskManage_top{height: 70px;border-bottom: 1px solid #efefef;padding-left: 20px;display: flex;align-items: center;position: relative;}
.taskManage_top>span{font-size: 18px;line-height: 70px;}
.operation{position: absolute;right: 15px;;height: 100%;line-height: 70px;}
.taskManage_bottom{position: absolute;top: 75px;bottom: 5px;left: 5px;right: 5px;}
.myModalHeader{width: 100%;}
.myModalHeader>div{width: 196px;}
.myModalHeader>button{line-height: 36px;}
.myModalMain{width: 100%;max-height: 300px;margin-top:15px;overflow: auto;}
.myModalFooter{width: 100%;height: 32px;margin-top: 5px;}
</style>
<style lang='less'>
.myModalHeader{
    input{border-top:none !important;border-left:none !important;border-right:none !important;border-radius: 0;}
}
.myModalright{
    .el-checkbox{margin-right: 20px;}
}
</style>