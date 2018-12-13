<template>
    <div class="lampslanterns">
        <!-- 灯具 -->
        <div class="lampslanterns_top">
            <!-- <el-button v-if="turnOnLight" @click="switchOff('1')" type="primary" size='small'>开灯</el-button>
            <el-button v-if="turnOffLight" @click="switchOff('2')" type="primary" size='small'>关灯</el-button> -->
            <el-dropdown style="margin-left:10px;" @command='operation'>
                <el-button type="primary" size='small' style="width:85px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item v-if="turnOnLight" command='1'>开灯</el-dropdown-item>
                    <el-dropdown-item v-if="turnOffLight" command='2'>关灯</el-dropdown-item>
                    <el-dropdown-item v-if="refreshStatus" command='3'>刷新状态</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>    
            <el-dropdown v-if="dimming" style="margin-left:10px;" @command='dropdown'>
                <el-button type="primary" size='small' style="width:85px;">
                    调光<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item command='10'>100%</el-dropdown-item>
                    <el-dropdown-item command='9'>90%</el-dropdown-item>
                    <el-dropdown-item command='8'>80%</el-dropdown-item>
                    <el-dropdown-item command='7'>70%</el-dropdown-item>
                    <el-dropdown-item command='6'>60%</el-dropdown-item>
                    <el-dropdown-item command='5'>50%</el-dropdown-item>
                    <el-dropdown-item command='4'>40%</el-dropdown-item>
                    <el-dropdown-item command='3'>30%</el-dropdown-item>
                    <el-dropdown-item command='2'>20%</el-dropdown-item>
                    <el-dropdown-item command='1'>10%</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="strategyManagement" @click='switchOff(6)' type="primary" size='small' style="margin-left:10px;">下发策略</el-button>
            <!-- <el-button v-if="refreshStatus" @click="switchOff('4')" type="primary" size='small' style="margin-left:10px;">刷新状态</el-button> -->
            <el-button v-if="strategyManagement" @click="switchOff('5')" type="primary" size='small' style="margin-left:10px;">策略管理</el-button>
            <el-button @click="switchOff('7')" type="primary" size='small' style="margin-left:10px;">清空策略</el-button>
        </div>
        <div class="lampslanterns_bottom">
            <div class="lampslanterns_bottom_top">
                <div class="search">
                    <label>名称:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入单灯名称">
                </div>
                <div class="search">
                    <label>序列号:</label>
                    <input type="text" v-model="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入序列号">
                </div>
                <div class="search">
                    <label>在线状态:</label>
                    <el-select v-model="value" clearable placeholder="请选择" size='small'>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="lampslanterns_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="名称"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="120">
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
                    label="灯状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.lampStatus=='0'">关闭</span>
                            <span v-if="scope.row.lampStatus=='1'">开启</span>
                            <span v-if="scope.row.lampStatus=='2'">告警</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="lampNumber"
                    align='center'
                    label="灯具编号"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="strategyName"
                    align='center'
                    label="当前策略"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="brightness"
                    align='center'
                    :formatter="formatRole"
                    label="亮度"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="envBrightness"
                    align='center'
                    :formatter="formatRole"
                    label="环境亮度"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    :formatter="formatRole"
                    label="电压(V)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="electricity"
                    align='center'
                    :formatter="formatRole"
                    label="电流(A)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="power"
                    align='center'
                    :formatter="formatRole"
                    label="功率(W)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="location"
                    align='center'
                    label="区域"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="timestamp"
                    :formatter="formatRole"
                    label="采集时间"
                    align='center'
                    min-width="160">
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
        </div>
        <!-- 策略管理 -->
        <div class="modal fade" id="myModal" style="width:550px;border:none;margin: 0 auto;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">策略管理</h4>
                    </div>
                    <div class="modal-body">
                        <div class="strategy">
                            <div class="strategy_top">
                                <el-button v-if="strategyType=='0'" @click='strategy(1)' type="primary" size='small'>添加策略</el-button>
                                <el-button v-if="strategyType=='0'" @click='strategy(2)' type="primary" size='small'>修改策略</el-button>
                                <el-button v-if="strategyType=='0'" @click='strategy(3)' type="primary" size='small'>删除策略</el-button>
                                <el-button v-if="strategyType=='1'" @click='strategy(4)' type="primary" size='small'>下发策略</el-button>
                            </div>
                            <div class="strategy_bottom">
                                <el-table
                                    :data="tableData2"
                                    @row-click="clickRow2" 
                                    ref="moviesTable2"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    @selection-change="SelectionChange2"
                                    style="height:auto;max-height:90%;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="strategyName"
                                    align='center'
                                    label="策略名称"
                                    width="152">
                                    </el-table-column>
                                    <el-table-column
                                    prop="expire"
                                    align='center'
                                    label="策略时效"
                                    width="190">
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="操作"
                                    width="120">
                                        <template slot-scope="scope">
                                            <el-button @click="strategy(5,scope.row)" type='primary' size='mini'>详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    background
                                    @size-change="sizechange2"
                                    @current-change="currentchange2"
                                    :current-page="pageIndex2"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="pageSize2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total2">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 策略管理添加/修改 -->
        <div class="modal fade" id="myModal2" style="width:650px;border:none;margin: 0 auto;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:650px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='0'">添加策略</h4>
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='1'">修改策略</h4>
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='5'">详情</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>策略名称:</label>
                            <input type="text" id="strategyName" v-model="data.strategyName" class="form-control" placeholder="请输入策略名称">
                            <label>有效期:</label>
                            <el-date-picker
                            v-model="data.expire"
                            :disabled=datetimeType
                            size='small'
                            style="width:185px;"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </div> 
                        <div v-if="type3==0||type3=='1'">
                            <label>
                                操作:
                            </label>
                            <el-select v-model="value1" @change="options1Change" size='mini' style="width:108px;" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <label style="margin-left:10px;">亮度:</label>
                            <el-input-number v-model="brightness" size='mini' :step="10" :min=minbrightness :max=maxbrightness></el-input-number>
                            <label style="margin-left:10px;"><span class="Required">*</span>时间:</label>
                            <el-time-picker
                                size='mini'
                                style="width:145px;"
                                value-format='HH:mm:ss'
                                v-model="timer"
                                placeholder="任意时间点">
                            </el-time-picker>
                            <el-button @click="addnode(1)" type="primary" size='mini'>添加节点</el-button>
                        </div>
                        <div style="margin-top:10px;">
                            <el-table
                                :data="tableData3"
                                border
                                stripe
                                size='mini'
                                tooltip-effect="dark"
                                @selection-change="SelectionChange3"
                                style="width: 100%;overflow:auto;height:auto;max-height:90%;">
                                <el-table-column
                                prop="timer"
                                align='center'
                                label="时间节点"
                                width="170">
                                </el-table-column>
                                <el-table-column
                                prop="brightness_type"
                                align='center'
                                label="操作"
                                width="92">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.brightness=='0'">关灯</span>
                                        <span v-else>开灯</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="brightness"
                                label="时间节点亮度"
                                align='center'
                                show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.brightness}}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                align='center'
                                width="130"
                                v-if="type3!=5">
                                    <template slot-scope="scope">
                                        <el-button @click="addnode(2,scope.row)" type="primary" size='mini'>删除节点</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="modal-footer" v-if="type3!=5">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">保存</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'lampslanterns',
    data () {
        return {
            serverurl:localStorage.serverurl,
            turnOnLight:false,
            turnOffLight:false,
            dimming:false,
            refreshStatus:false,
            strategyManagement:false,
            nickName:'',
            serialNumber:'',
            options:[{value: '1',label: '在线'},{value: '0',label: '离线'}],
            value:'',
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:10,
            tableData2:[],
            site2:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
            tableData3:[],
            type3:'',
            site3:[],
            data:{
                strategyName:'',
                expire:'',
            },
            datetimeType:true,
            options1:[
                {
                    value: '0',
                    label: '开灯'
                },
                {
                    value: '1',
                    label: '关灯'
                }
            ],
            value1:'0',
            brightness:100,//节点亮度
            minbrightness:0,
            maxbrightness:100,
            timer:'',//时间节点
            strategyType:'',
        }
    },
    mounted(){
        var that = this
        setTimeout(function(){
            that.ready()
            that.Jurisdiction()
        },900)
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        }, 
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.moviesTable2.toggleRowSelection(row)
        },
        options1Change(){
            if(this.value1=='0'){
                this.minbrightness = 10
                this.maxbrightness = 100
                this.brightness = 100
            }
            if(this.value1=='1'){
                this.minbrightness = 0
                this.maxbrightness = 0
                this.brightness = 0
            }
        },
        // 添加时间节点
        addnode(val,data){
            var that = this;
            if(val=='1'){
                if(this.timer==''){
                    that.$message({
                        message: '必填数据不能为空!',
                        type: 'error'
                    });
                    return;
                }
                if(this.tableData3.length>=10){
                    that.$message({
                        message: '时间节点暂不能超过10个!',
                        type: 'error'
                    });
                    return;
                }
                for(var i=0;i<this.tableData3.length;i++){
                    if(this.timer==this.tableData3[i].timer){
                        this.$message({
                            message: '时间节点不可重复!',
                            type: 'error'
                        });
                        return;
                    }
                }
                var data = {}
                data.timer = this.timer
                data.brightness = this.brightness
                this.tableData3.push(data)
            }
            if(val=='2'){
                for(var i=0;i<this.tableData3.length;i++){
                    if(data.timer==this.tableData3[i].timer){
                        this.tableData3.splice(i,1)
                    }
                }
            }
        },
        SelectionChange3(val){
            this.site3 = val;
        },
        // 调光下拉事件
        dropdown(val){
            var that = this;
            var lampIds = []
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            if(that.site.length==0){
                that.$message({
                    message: '请选择灯具进行操作!',
                    type: 'error'
                });
                return;
            }
            for(var i=0;i<that.site.length;i++){
                lampIds.push(that.site[i].id)
            }
            var data = {
                "brightness": val*10,
                'command':3,
                "lampIds": lampIds.join(','),
                projectId:sessionStorage.projectId
            }
            this.$confirm('确认调节光亮度为'+val*10+'%', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lampControl/controlLamp',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '亮度调节成功!',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },5000)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消调节光亮度'
                });          
            });
        },
        //操作按钮
        operation(val){
            var that = this;
            var lampIds = []
            for(var i=0;i<that.site.length;i++){
                lampIds.push(that.site[i].id)
            }
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            if(val=='1'||val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择灯具进行操作!',
                        type: 'error'
                    });
                    return;
                }
                var data = {
                    "command": val,
                    "lampIds": lampIds.join(','),
                    projectId:sessionStorage.projectId
                }
                this.$confirm('确认进行此操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/lampControl/controlLamp',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
                        success:function(data){
                            if(data.errorCode=='0'){
                                if(val=='1'){
                                    that.$message({
                                        message: '开灯成功',
                                        type: 'success'
                                    });
                                }
                                if(val=='2'){
                                    that.$message({
                                        message: '关灯成功',
                                        type: 'success'
                                    });
                                }
                                setTimeout(function(){
                                    that.ready()
                                },5000)
                            }else{
                                that.errorCode2(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消此操作'
                    });          
                });
            }
            if(val=='3'){
                if(that.site.length==0||that.site.length>=2){
                    that.$message({
                        message: '请选择单个灯具进行状态刷新!',
                        type: 'error'
                    });
                    return;
                }
                var data = {
                    "command": 4,
                    "lampIds": lampIds.join(','),
                    projectId:sessionStorage.projectId
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lampControl/controlLamp',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '请稍后,正在获取最新数据!',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },5000)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        // 策略管理/下发策略/策略清空
        switchOff(val){
            var that = this
            var lampIds = []
            for(var i=0;i<that.site.length;i++){
                lampIds.push(that.site[i].id)
            }
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            if(val=='5'){
                this.strategyType='0'
                $('#myModal').modal('show')
                that.strategyData()
                /* 完成拖拽 */
                $('#myModal').draggable({
                    cursor: "move",
                    handle: '.modal-header'
                });
                $('#myModal').css("overflow", "hidden")
            }
            if(val=='6'){
                if(this.site.length==0){
                    that.$message({
                        message: '请选择灯具进行操作!',
                        type: 'error'
                    });
                    return;
                }
                this.strategyType='1'
                $('#myModal').modal('show')
                that.strategyData()
                /* 完成拖拽 */
                $('#myModal').draggable({
                    cursor: "move",
                    handle: '.modal-header'
                });
                $('#myModal').css("overflow", "hidden")
            }
            if(val=='7'){
                if(this.site.length==0){
                    that.$message({
                        message: '请选择灯具进行操作!',
                        type: 'error'
                    });
                    return;
                }
                var data = {}
                var lampId = []
                for(var i=0;i<that.site.length;i++){
                    lampId.push(that.site[i].id)
                }
                data.lampIds = lampId.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lampStrategy/resetLampStrategy',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '策略清空成功',
                                type: 'success'
                            });
                            that.ready()
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        // 策略保存
        addSubmit(){
            var that = this;
            var url = ''
            var data = {
                strategyName:that.data.strategyName,
                expire:that.data.expire,
                strategyList:[],
            }
            if(that.data.strategyName==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return; 
            }
            if(that.tableData3.length==0){
                this.$message({
                    message: '策略时间节点不能为空!',
                    type: 'error'
                });
                return; 
            }
            if(data.expire==''||data.expire==null||data.expire==undefined){
                data.expire = ''
            }
            data.strategyList = that.tableData3
            data.projectId=sessionStorage.projectId
            if(this.type3 =='0'){url='/lampStrategy/addLampStrategy'}
            if(this.type3 =='1'){url='/lampStrategy/updateLampStrategy';data.id=that.site2[0].id;}
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
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#myModal2').modal('hide')
                        that.strategyData()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        // 获取策略列表
        strategyData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/lampStrategy/getLampStrategyList',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    rows:that.pageSize2,
                    strategyName:'',
                    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        SelectionChange2(val){
            this.site2=val;
        },
        sizechange2(val){
            this.pageSize2 = val;
            this.strategyData()
        },
        currentchange2(val){
            this.pageIndex2 = val;
            this.strategyData()
        },
        // 策略管理列表  增加/删除/修改/下发/查看详情
        strategy(val,datas){
            var that = this
            if(val=='1'){
                $('#myModal2').modal('show')
                this.datetimeType = false
                $('#strategyName').removeAttr("disabled");
                this.options1Change()
                this.type3 ='0'
                this.data.strategyName = ''
                this.data.expire = ''
                this.tableData3 = []
                /* 完成拖拽 */
                $('#myModal').draggable({
                    cursor: "move",
                    handle: '.modal-header'
                });
                $('#myModal').css("overflow", "hidden")
            }
            if(val=='2'){
                if(this.site2.length==0||this.site2.length>=2){
                    this.$message({
                        message:'请选择单条数据进行修改!',
                        type: 'error'
                    })
                    return;
                }
                $('#myModal2').modal('show')
                this.datetimeType = false
                $('#strategyName').removeAttr("disabled");
                this.type3 ='1'
                this.data.strategyName = this.site2[0].strategyName
                this.data.expire = this.site2[0].expire
                this.tableData3 = JSON.parse(this.site2[0].strategy)
                if(this.tableData3[0].brightness=='0'){
                    this.value1 = '1'
                }else{
                    this.value1 = '0'
                }
                this.options1Change()
                /* 完成拖拽 */
                $('#myModal').draggable({
                    cursor: "move",
                    handle: '.modal-header'
                });
                $('#myModal').css("overflow", "hidden")
            }
            //删除
            if(val=='3'){
                var arr = []
                for(var i=0;i<this.site2.length;i++){
                    arr.push(this.site2[i].id)
                }
                var data = {
                    ids:arr.join(','),
                }
                if(this.site2.length==0){
                    that.$message({
                        message: '请选择策略进行删除!',
                        type: 'error'
                    });
                    return;
                }
                that.$confirm('是否删除所选策略？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/lampStrategy/deleteLampStrategy',
                        // contentType:'application/json;charset=UTF-8',
                        data:data,
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.strategyData()
                            }else{
                                that.errorCode2(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            }
            //策略下发
            if(val=='4'){
                var data = {}
                var arr = [];
                if(this.site.length==0){
                    that.$message({
                        message: '请选择灯具!',
                        type: 'error'
                    });
                    return;
                }
                if(this.site2.length==0||this.site2.length>=2){
                    that.$message({
                        message: '请选择单个策略!',
                        type: 'error'
                    });
                    return;
                }
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                data.lampIds = arr.join(',')
                data.lampStrategyId  = that.site2[0].id
                that.$confirm('是否确认下发?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/lampControl/sendLampStrategy',
                        data:data,
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '策略下发成功!',
                                    type: 'success'
                                });
                                $('#myModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode2(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消策略下发'
                    });          
                });
            }
            //详情
            if(val=='5'){
                this.type3 ='5'
                $('#myModal2').modal('show')
                this.datetimeType = true
                $('#strategyName').attr("disabled","disabled");
                this.data.strategyName = datas.strategyName
                this.data.expire = datas.expire
                this.tableData3 = JSON.parse(datas.strategy)
            }
        },
        // 初始化列表
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                rows:that.pageSize,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                poleId:'',
                projectId:sessionStorage.projectId,
                online:that.value
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/lamp/getLampList',
                contentType:'application/json;charset=UTF-8',
                data:data, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        search(){
            this.ready()
        },
        SelectionChange(val){
            this.site = val;
        },
        sizechange(val){
            this.pageSize = val
            this.ready();
        },
        currentchange(val){
            this.pageIndex = val
            this.ready();
        },
        // 权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/privilege/getMyOperatMenu',
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='turnOnLight'){
                                that.turnOnLight = true
                            }
                            if(data.result.operats[i].code=='turnOffLight'){
                                that.turnOffLight = true
                            }
                            if(data.result.operats[i].code=='dimming'){
                                that.dimming = true
                            }
                            if(data.result.operats[i].code=='refreshStatus'){
                                that.refreshStatus = true
                            }
                            if(data.result.operats[i].code=='strategyManagement'){
                                that.strategyManagement = true
                            }
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
    },
    created(){
        
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.lampslanterns{width: 100%;height: 100%;}
.lampslanterns>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.lampslanterns_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.lampslanterns_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.lampslanterns_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.lampslanterns_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}
.strategy{width: 100%;}
.strategy_top{width: 100%;height: 40px;line-height: 40px;}
.strategy_bottom{width: 100%;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>div{height: 34px;line-height: 34px;}
.form-group>input{width: 185px;}

.search{display: flex;}
.search>label{width: 85px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.search>div{width: 106px;}
</style>