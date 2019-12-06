<template>
    <!-- lora传感器 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备操作>Lora传感器操作</p>
        </div>
        <div class="section_bottom" v-if="type=='0'">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
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
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="序列号"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="modelName"
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    show-overflow-tooltip
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.equipmentAlarmDesc=='正常'" class="onLine">{{scope.row.equipmentAlarmDesc}}</span>
                            <span v-else class="Warning">{{scope.row.equipmentAlarmDesc}}</span>
                        </template>
                    </el-table-column>
                    <template v-if="menuId3=='64'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">火灾告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        show-overflow-tooltip
                        label="底座温度值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='65'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        show-overflow-tooltip
                        label="温度℃/湿度%"
                        min-width="100"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <template v-if="scope.row.temperature==null">
                                    --
                                </template>
                                <template v-if="scope.row.temperature!=null">
                                    {{scope.row.temperature}}
                                </template>/
                                <template v-if="scope.row.humidity==null">
                                    --
                                </template>
                                <template v-if="scope.row.humidity!=null">
                                    {{scope.row.humidity}}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='66'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="onLine">车位空</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">车位被占</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="batteryLevel"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='67'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">井盖异常</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">水位异常</span>
                                <span v-else-if="scope.row.businessAlarmType=='3'" class="Warning">井盖，水位异常</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='68'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">压力过低</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">压力过高</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="battery"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="pressure"
                        show-overflow-tooltip
                        label="水压mpa"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='69'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='1'" class="onLine">关闭</span>
                                <span v-else-if="scope.row.businessAlarmType=='0'" class="Warning">打开</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='70'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">障碍物告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="distance"
                        show-overflow-tooltip
                        label="距离(m)"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='117'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">水位告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="waterLevel"
                        show-overflow-tooltip
                        label="水深(m)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <el-table-column
                    show-overflow-tooltip
                    prop="heartData"
                    label="心跳包"
                    :formatter="formatRole"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.heartData=='0'">否</span>
                            <span v-else-if="scope.row.heartData=='1'">是</span>
                            <span v-else>----</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="frameNumber"
                    label="帧数"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="gatewayId"
                    label="网关ID"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="snr"
                    label="信噪比"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="rssi"
                    label="信号强度"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="collectTime"
                    label="采集时间"
                    show-overflow-tooltip
                    min-width="150"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="HistoryData(scope.row)" type="primary" size="mini">查看历史数据</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
        <div class="section_bottom" v-if="type=='1'">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-button @click="Return()" type="primary" plain icon='el-icon-back' size='small'>返回</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData2"
                    border
                    size='small'
                    tooltip-effect="dark"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="序列号"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="modelName"
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="equipmentAlarmDesc"
                    show-overflow-tooltip
                    label="设备状态"
                    min-width="120"
                    :formatter="formatRole">
                        <template slot-scope="scope">
                            <span v-if="scope.row.equipmentAlarmDesc=='正常'" class="onLine">{{scope.row.equipmentAlarmDesc}}</span>
                            <span v-else class="Warning">{{scope.row.equipmentAlarmDesc}}</span>
                        </template>
                    </el-table-column>
                    <template v-if="menuId3=='64'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">火灾告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        show-overflow-tooltip
                        label="底座温度值"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='65'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="temperature"
                        show-overflow-tooltip
                        label="温度℃/湿度%"
                        min-width="100"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <template v-if="scope.row.temperature==null">
                                    --
                                </template>
                                <template v-if="scope.row.temperature!=null">
                                    {{scope.row.temperature}}
                                </template>/
                                <template v-if="scope.row.humidity==null">
                                    --
                                </template>
                                <template v-if="scope.row.humidity!=null">
                                    {{scope.row.humidity}}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='66'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="onLine">车位空</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">车位被占</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="batteryLevel"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='67'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">井盖异常</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">水位异常</span>
                                <span v-else-if="scope.row.businessAlarmType=='3'" class="Warning">井盖，水位异常</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='68'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">压力过低</span>
                                <span v-else-if="scope.row.businessAlarmType=='2'" class="Warning">压力过高</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="battery"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="pressure"
                        show-overflow-tooltip
                        label="水压mpa"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='69'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='1'" class="onLine">关闭</span>
                                <span v-else-if="scope.row.businessAlarmType=='0'" class="Warning">打开</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='70'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">障碍物告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="distance"
                        show-overflow-tooltip
                        label="距离(m)"
                        :formatter="formatRole"
                        min-width="80">
                        </el-table-column>
                    </template>
                    <template v-if="menuId3=='117'">
                        <el-table-column
                        show-overflow-tooltip
                        label="告警状态"
                        min-width="80"
                        :formatter="formatRole">
                            <template slot-scope="scope">
                                <span v-if="scope.row.businessAlarmType=='0'" class="onLine">正常</span>
                                <span v-else-if="scope.row.businessAlarmType=='1'" class="Warning">水位告警</span>
                                <span v-else>----</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="voltage"
                        show-overflow-tooltip
                        label="电压值(V)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="waterLevel"
                        show-overflow-tooltip
                        label="水深(m)"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                    </template>
                    <el-table-column
                    show-overflow-tooltip
                    prop="heartData"
                    label="心跳包"
                    :formatter="formatRole"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.heartData=='0'">否</span>
                            <span v-else-if="scope.row.heartData=='1'">是</span>
                            <span v-else>----</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="frameNumber"
                    label="帧数"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="gatewayId"
                    label="网关ID"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="snr"
                    label="信噪比"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    prop="rssi"
                    label="信号强度"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="collectTime"
                    label="采集时间"
                    show-overflow-tooltip
                    min-width="150"
                    :formatter="formatRole">
                    </el-table-column>
                </el-table>
            </div>
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
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
        },
        //点击获取历史数据按钮
        HistoryData(val){
            this.site[0] = val
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
            if(sessionStorage.menuId3=='117'){url='/v1/solin/lora/sensor/waterLevel/log';}
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
            if(sessionStorage.menuId3=='117'){url='/v1/solin/lora/sensor/waterLevel';}
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
        search(){this.ready();},
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>

</style>