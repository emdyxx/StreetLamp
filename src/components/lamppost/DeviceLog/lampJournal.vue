<template>
    <!-- 灯具日志 -->
    <div class="lampJournal">
        <el-tabs v-model="activeName" style="height:100%;" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="操作日志" v-if="viewLampOperatLog" name='0' style="height: 100%;position:relative;">
                <div class="lampJournal_top">
                    <div class="search">
                        <span>单灯序列号:</span>
                        <input type="text" v-model="serialNumber" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯序列号">
                    </div>
                    <div class="search">
                        <span>日志模块:</span>
                        <el-select v-model="value2" clearable size='small' placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="lampJournal_bottom">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="操作用户"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        align='center'
                        label="单灯序列号"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作模块"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='0'">单灯</span>
                                <span v-if="scope.row.operatModule=='1'">单灯策略</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                                <span v-if="scope.row.operatType=='3'">启用/禁用</span>
                                <span v-if="scope.row.operatType=='4'">审核</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="操作明细"
                        align='center'
                        show-overflow-tooltip>
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
            </el-tab-pane>
            <el-tab-pane label="控制日志" v-if="viewLampControlLog" name='1' style="height: 100%;position:relative;">
                <div class="lampJournal_top">
                    <div class="search">
                        <span>单灯序列号:</span>
                        <input type="text" v-model="serialNumber" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯序列号">
                    </div>
                    <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="lampJournal_bottom">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="操作用户"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        align='center'
                        label="单灯序列号"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操控类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='1'">开启</span>
                                <span v-if="scope.row.controlType=='2'">关闭</span>
                                <span v-if="scope.row.controlType=='3'">调光</span>
                                <span v-if="scope.row.controlType=='4'">刷新状态</span>
                                <span v-if="scope.row.controlType=='5'">下发策略</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操控状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlStatus=='0'">成功</span>
                                <span v-if="scope.row.controlStatus=='1'">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="控制明细"
                        align='center'
                        show-overflow-tooltip>
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
            </el-tab-pane>
            <el-tab-pane label="告警日志" v-if="viewLampAlarmLog" name='2' style="height: 100%;position:relative;">
                <div class="lampJournal_top">
                    <div class="search">
                        <span>单灯序列号:</span>
                        <input type="text" v-model="serialNumber" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯序列号">
                    </div>
                    <div class="search">
                        <span>告警类别:</span>
                        <el-select v-model="value3" clearable size='small' placeholder="请选择">
                            <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search">
                        <span>告警级别:</span>
                        <el-select v-model="value4" clearable size='small' placeholder="请选择">
                            <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="lampJournal_bottom">
                    <el-table
                        :data="tableData2"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        align='center'
                        label="单灯序列号"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.alarmType=='1'">故障</span>
                                <span v-if="scope.row.alarmType=='2'">待定</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警级别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.alarmLevel=='1'">紧急</span>
                                <span v-if="scope.row.alarmLevel=='2'">严重</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="告警明细"
                        align='center'
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <template v-if="scope.row.jsonContent.closeLanmpAlarm!=undefined||scope.row.jsonContent.closeLanmpAlarm!=''">
                                    <span v-if="scope.row.jsonContent.closeLanmpAlarm=='breakdown'">关灯故障</span>
                                </template>
                                <template v-if="scope.row.jsonContent.IAMAlarm!=undefined||scope.row.jsonContent.IAMAlarm!=''">
                                    <span v-if="scope.row.jsonContent.IAMAlarm=='overload'">电流过载</span>
                                </template>
                                <template v-if="scope.row.jsonContent.electricRelayAlarm!=undefined||scope.row.jsonContent.electricRelayAlarm!=''">
                                    <span v-if="scope.row.jsonContent.electricRelayAlarm=='breakdown'">继电器故障</span>
                                </template>
                                <template v-if="scope.row.jsonContent.lampAlarm!=undefined||scope.row.jsonContent.lampAlarm!=''">
                                    <span v-if="scope.row.jsonContent.lampAlarm=='breakdown'">光源故障</span>
                                </template>
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            serverurl:localStorage.serverurl,
            viewLampOperatLog:false,
            viewLampControlLog:false,
            viewLampAlarmLog:false,
            tableData:[],
            tableData2:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            serialNumber:'',
            valueType:'0',
            activeName:'0',
            options2:[{
                value: '0',
                label: '单灯'
                },{
                value: '1',
                label: '单灯策略'
            }],
            value2:'0',
            options3:[{
                value: '1',
                label: '故障'
                }
            ],
            value3:'',
            options4:[{
                value: '1',
                label: '紧急'
                }
            ],
            value4:'',
        }
    },
    mounted(){
        
    },
    methods:{
        handleClick(){
            this.pageIndex = 1
            this.pageSize = 10
            this.serialNumber = ''
            this.ready()
        },
        search(){
            this.ready()
        },
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                rows:that.pageSize
            };
            var url = '';
            data.projectId = sessionStorage.projectId
            data.serialNumber = this.serialNumber
            if(this.activeName=='0'){
                url='/lampOperatLogControl/getLampOperatLogList'
                data.operatModule = this.value2
            }
            if(this.activeName=='1'){
                url='/lampControlLogControl/getLampControlLogList'
            }
            if(this.activeName=='2'){
                url='/lampAlarmLogControl/getLampAlarmLogList'
                data.alarmType = this.value3
                data.alarmLevel = this.value4
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        if(that.activeName=='0'||that.activeName=='1'){
                            that.tableData = data.result.list;
                        }
                        if(that.activeName=='2'){
                            that.tableData2 = data.result.list;
                        }
                        that.total = Number(data.result.total)
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                },
            })
        },
        currentchange(val){
            this.pageIndex = val;
            this.ready()
        },
        sizechange(val){
            this.pageSize = val;
            this.ready()
        },
        //权限请求
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
                            if(data.result.operats[i].code=='viewLampOperatLog'){
                                that.viewLampOperatLog = true
                            }
                            if(data.result.operats[i].code=='viewLampControlLog'){
                                that.viewLampControlLog = true
                            }
                            if(data.result.operats[i].code=='viewLampAlarmLog'){
                                that.viewLampAlarmLog = true
                            }
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
    },
    created() {
        var that = this
        this.Jurisdiction()
        this.ready()
    },
}
</script>
<style scoped>
.lampJournal{position: absolute;top:10px;left: 10px;right: 10px;bottom: 10px;width:auto;height: auto;border-radius: 4px;}
.lampJournal>div{width: 100%;height: 100%;}
.lampJournal>div>div:nth-of-type(2){height: 100%;}
.lampJournal_top{width: 100%;height: 46px;display: flex;justify-content: center;line-height: 45px;}
.lampJournal_bottom{width: 100%;height:auto;position: absolute;top:46px;bottom:10px;}

.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 110px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 110px;}
.block{text-align: center;}
</style>