<template>
    <div class="loraQuery">
        <div class="loraQuery_top">
            <el-button type="primary" icon='el-icon-search' size='small'>获取最新数据</el-button>
        </div>
        <div class="loraQuery_bottom">
            <div class="loraQuery_bottom_top">
                <div class="search">
                    <label style="width:100px;">传感器名字:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入传感器名字">
                </div>
                <div class="search">
                    <label style="width:90px;">传感器序列号:</label>
                    <input type="text" v-model="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入传感器序列号">
                </div>
                <div class="search">
                    <label>传感器型号:</label>
                    <input type="text" v-model="modelName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入传感器型号">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="loraQuery_bottom_bottom">
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
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    prop="modelName"
                    label="型号"
                    min-width="100">
                    </el-table-column>
                    <template v-if="menuId3=='65'">
                        <el-table-column
                        prop="temperature"
                        align='center'
                        label="温度值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="humidity"
                        align='center'
                        label="湿度值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="电压状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.voltageStatus=='0'">正常电压</span>
                                <span v-if="scope.row.voltageStatus=='1'">低电压</span>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='66'">
                        <el-table-column
                        prop="batteryLevel"
                        align='center'
                        label="电池容量"
                        min-width="100">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='67'">
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        label="井盖状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.manholeCoverStatus=='0'">正常</span>
                                <span v-if="scope.row.manholeCoverStatus=='1'">告警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="水位状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.waterLevelStatus=='0'">正常</span>
                                <span v-if="scope.row.waterLevelStatus=='1'">告警</span>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='68'">
                        <el-table-column
                        prop="pressure"
                        align='center'
                        label="压力值"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="压力状态"
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.pressureState=='0'">正常</span>
                                <span v-if="scope.row.pressureState=='1'">低压</span>
                                <span v-if="scope.row.pressureState=='2'">高压</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="battery"
                        align='center'
                        label="电池电量"
                        min-width="100">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='69'">
                        <el-table-column
                        label="报警状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.alarmState=='0'">正常</span>
                                <span v-if="scope.row.alarmState=='1'">红外报警</span>
                                <span v-if="scope.row.alarmState=='2'">门磁报警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="传感器状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.sensorState=='0'">正常</span>
                                <span v-if="scope.row.sensorState=='1'">传感器故障</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="电池状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.batteryState=='0'">正常</span>
                                <span v-if="scope.row.batteryState=='1'">低电</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="防拆状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.tamperState=='0'">正常</span>
                                <span v-if="scope.row.tamperState=='1'">被拆</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="按键状态"
                        align='center'
                        min-width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.keyState=='0'">正常</span>
                                <span v-if="scope.row.keyState=='1'">测试</span>
                                <span v-if="scope.row.keyState=='2'">消音</span>
                            </template>
                        </el-table-column>
                    </template>
                    <el-table-column
                    prop="timestamp"
                    label="采集时间"
                    align='center'
                    min-width="120"
                    :formatter="formatRole">
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
    </div>
</template>
<script>
export default {
    name: 'loraQuery',
    data () {
        return {
            serverurl:localStorage.serverurl, 
            nickName:'',
            serialNumber:'',
            options:[],
            modelName:'',
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            menuId3:sessionStorage.menuId3
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
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        ready(){
            var that = this;
            var url = ''
            if(sessionStorage.menuId3=='54'||sessionStorage.menuId3=='64'){url='/v1/solin/lora/sensor/smoke/log';}
            if(sessionStorage.menuId3=='65'){url='/v1/solin/lora/sensor/humiture/log';}
            if(sessionStorage.menuId3=='66'){url='/v1/solin/lora/sensor/geomagnetism/log';}
            if(sessionStorage.menuId3=='67'){url='/v1/solin/lora/sensor/manhole-cover/log';}
            if(sessionStorage.menuId3=='68'){url='/v1/solin/lora/sensor/pressure/log';}
            if(sessionStorage.menuId3=='69'){url='/v1/solin/lora/sensor/magnetic-door/log';}
            if(sessionStorage.menuId3=='70'){url='/v1/solin/lora/sensor/ultrasonic/log';}
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                projectIds:sessionStorage.projectId,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                modelName:that.modelName,
                dataType:'',
                status:'',
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
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
        search(){this.ready();}
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>
.loraQuery{width: 100%;height: 100%;}
.loraQuery>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.loraQuery_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.loraQuery_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.loraQuery_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.loraQuery_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}
.search{display: flex;}
.search>label{width: 90px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>