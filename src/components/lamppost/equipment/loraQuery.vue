<template>
    <!-- lora传感器 -->
    <div class="loraQuery">
        <div class="loraQuery_top">
            <el-dropdown v-if="type=='0'" trigger='click'>
                <el-button type="primary" size='small' style="width:115px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="HistoryData">查看历史数据</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button @click="Return()" v-if="type=='1'" type="primary" icon='el-icon-back' size='small'>返回</el-button>
            <div class="search" v-if="type=='0'">
                <el-dropdown size="small" split-button>
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type1='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type1='2';">序列号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type1=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type1=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="loraQuery_bottom" v-if="type=='0'">
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
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    prop="modelName"
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <template v-if="menuId3=='64'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">火灾告警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='voltage'
                        label="电压值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        align='center'
                        label="底座温度值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='65'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">告警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        align='center'
                        label="温度℃/湿度%"
                        min-width="100"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                {{scope.row.temperature}}/{{scope.row.humidity}}
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='66'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">车位空</span>
                                <span v-if="scope.row.businessAlarmType=='2'">车位被占</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='67'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">井盖异常</span>
                                <span v-if="scope.row.businessAlarmType=='2'">水位异常</span>
                                <span v-if="scope.row.businessAlarmType=='3'">井盖，水位异常</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='68'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">压力过高</span>
                                <span v-if="scope.row.businessAlarmType=='2'">压力过低</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="battery"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="pressure"
                        align='center'
                        label="水压mpa"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='69'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">门磁告警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='70'">
                        <el-table-column
                        prop="equipmentAlarmDesc"
                        align='center'
                        label="设备状态"
                        min-width="120"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                                <span v-if="scope.row.businessAlarmType=='1'">障碍物告警</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        align='center'
                        label="电压值V"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="distance"
                        align='center'
                        label="距离m"
                        :formatter="formatRole"
                        min-width="80">
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
        <div class="loraQuery_bottom" v-if="type=='1'">
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
                prop="nickName"
                align='center'
                label="名称"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="序列号"
                :formatter="formatRole"
                min-width="120">
                </el-table-column>
                <el-table-column
                align='center'
                prop="modelName"
                label="型号"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <template v-if="menuId3=='64'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">火灾告警</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='voltage'
                    label="电压值"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="temperature"
                    align='center'
                    label="底座温度值"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='65'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">告警</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="temperature"
                    align='center'
                    label="温度℃/湿度%"
                    min-width="100"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            {{scope.row.temperature}}/{{scope.row.humidity}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='66'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">车位空</span>
                            <span v-if="scope.row.businessAlarmType=='2'">车位被占</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='67'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">井盖异常</span>
                            <span v-if="scope.row.businessAlarmType=='2'">水位异常</span>
                            <span v-if="scope.row.businessAlarmType=='3'">井盖，水位异常</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='68'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">压力过高</span>
                            <span v-if="scope.row.businessAlarmType=='2'">压力过低</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="battery"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="pressure"
                    align='center'
                    label="水压mpa"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='69'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">门磁告警</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                </template>
                <template v-if="menuId3=='70'">
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    align='center'
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="告警状态"
                    min-width="80"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.businessAlarmType=='0'">正常</span>
                            <span v-if="scope.row.businessAlarmType=='1'">障碍物告警</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="voltage"
                    align='center'
                    label="电压值V"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="distance"
                    align='center'
                    label="距离m"
                    :formatter="formatRole"
                    min-width="80">
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
</template>
<script>
export default {
    name: 'loraQuery',
    data () {
        return {
            name:'名称',
            type1:'1',
            serverurl:localStorage.serverurl, 
            type:'0', //0实时数据   1历史数据
            nickName:'',
            serialNumber:'',
            options:[],
            modelName:'',
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            menuId3:sessionStorage.menuId3,
            //历史数据
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:50,
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
        //点击获取历史数据按钮
        HistoryData(){
            if(this.site.length==0||this.site.length>=2){
                this.$message({
                    message: '请选择单个传感器进行操作!',
                    type: 'error'
                });
                return;
            }
            $('#myModal').modal('show')
            this.pageIndex2 = 1
            this.pageSize2 = 10
            this.type = '1'
            this.ready2()
        },
        //返回
        Return(){this.type='0';this.ready();this.site = [];},
        sizechange2(val){this.pageSize2 = val;this.ready2()},
        currentchange2(val){this.pageIndex2 = val;this.ready2();},
        //请求历史数据
        ready2(){
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
                page:that.pageIndex2,
                size:that.pageSize2,
                projectIds:sessionStorage.projectId,
                nickName:'',
                serialNumber:that.site[0].serialNumber,
                modelName:'',
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
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        ready(){
            var that = this;
            var url = ''
            if(sessionStorage.menuId3=='54'||sessionStorage.menuId3=='64'){url='/v1/solin/lora/sensor/smoke';}
            if(sessionStorage.menuId3=='65'){url='/v1/solin/lora/sensor/humiture';}
            if(sessionStorage.menuId3=='66'){url='/v1/solin/lora/sensor/geomagnetism';}
            if(sessionStorage.menuId3=='67'){url='/v1/solin/lora/sensor/manhole-cover';}
            if(sessionStorage.menuId3=='68'){url='/v1/solin/lora/sensor/pressure';}
            if(sessionStorage.menuId3=='69'){url='/v1/solin/lora/sensor/magnetic-door';}
            if(sessionStorage.menuId3=='70'){url='/v1/solin/lora/sensor/ultrasonic';}
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
                        that.errorCode(data)
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
.loraQuery_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}
.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>