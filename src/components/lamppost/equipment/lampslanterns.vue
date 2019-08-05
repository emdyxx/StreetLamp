<template>
    <div class="lampslanterns">
        <!-- 灯具 -->
        <div class="lampslanterns_top">
            <el-dropdown v-if="JurisdictionS.lampControl" style="margin-left:10px;" @command='operation'>
                <el-button type="primary" size='small' style="width:85px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item v-if="JurisdictionS.lampControl" command='1'>开灯</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.lampControl" command='2'>关灯</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.lampControl" command='3'>调光</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.lampControl" command='4'>刷新状态</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>    
            <el-dropdown v-if="JurisdictionS.viewLampStrategy" style="margin-left:10px;" @command='switchOff'>
                <el-button type="primary" size='small' style="width:85px;">
                    策略<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item v-if="JurisdictionS.viewLampStrategy" command='5'>策略管理</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.viewLampStrategy" command='6'>单灯策略</el-dropdown-item>
                    <el-dropdown-item v-if="JurisdictionS.viewLampStrategy" command='7'>群组策略</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="search" v-if="JurisdictionS.viewLampManage">
                <el-dropdown size="small" split-button @command="handleCommand">
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
        <div class="lampslanterns_bottom">
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
                    <!-- <el-table-column
                    align='center'
                    label="灯状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.lampStatus=='0'">关闭</span>
                            <span v-if="scope.row.lampStatus=='1'">开启</span>
                            <span v-if="scope.row.lampStatus=='2'">告警</span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                    prop="lampNumber"
                    align='center'
                    label="灯具编号"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column> -->
                    <el-table-column
                    prop="strategyName"
                    align='center'
                    label="当前策略"
                    :formatter="formatRole"
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
                    prop="brightness"
                    align='center'
                    :formatter="formatRole"
                    label="灯亮度"
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
                    <!-- <el-table-column
                    prop="location"
                    align='center'
                    label="区域"
                    min-width="120">
                    </el-table-column> -->
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
                                <el-button v-if="strategyType=='0'&&JurisdictionS.addLampStrategy==true" @click='strategy(1)' type="primary" size='small'>添加策略</el-button>
                                <el-button v-if="strategyType=='0'&&JurisdictionS.editLampStrategy==true" @click='strategy(2)' type="primary" size='small'>修改策略</el-button>
                                <el-button v-if="strategyType=='0'&&JurisdictionS.delLampStrategy==true" @click='strategy(3)' type="primary" size='small'>删除策略</el-button>
                                <el-button v-if="strategyType=='1'" @click='strategy(4)' type="primary" size='small'>下发策略</el-button>
                                <el-button v-if="strategyType=='1'" @click='strategy(6)' type="primary" size='small'>清空策略</el-button>
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
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='0'&&JurisdictionS.addLampStrategy==true">添加策略</h4>
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='1'&&JurisdictionS.editLampStrategy==true">修改策略</h4>
                        <h4 class="modal-title" id="myModalLabel" v-if="type3=='5'">详情</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>策略名称:</label>
                            <input type="text" id="strategyName" v-model="data.strategyName" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入策略名称">
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
        <!-- 群组策略 -->
        <div class="modal fade" id="GroupStrategy" style="width:650px;border:none;margin: 0 auto;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">群组策略</h4>
                    </div>
                    <div class="modal-body" style="height: 600px;">
                        <el-tabs v-model="GroupStrategyType" type="card" @tab-click="GroupStrategyClick">
                            <el-tab-pane label="集中器" name="0" style='padding:25px 10px 0 10px;'>
                                <p>请选中集中器:</p>
                                <div style="width:100%;height:200px;">
                                    <el-table
                                        :data="myModaltableData"
                                        @row-click="clickRow3" 
                                        ref="myModalmoviesTable"
                                        border
                                        stripe
                                        size='small'
                                        slot="empty"
                                        tooltip-effect="dark"
                                        @selection-change="myModalChange"
                                        style="width: 100%;overflow:auto;max-height:158px;margin-bottom:10px;margin-top:10px;">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="concentratorName"
                                        align='center'
                                        label="集中器名字"
                                        min-width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="concentratorSn"
                                        align='center'
                                        label="集中器序列号"
                                        min-width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="strategyName"
                                        align='center'
                                        label="当前策略"
                                        :formatter="formatRole"
                                        xshow-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block">
                                        <el-pagination
                                        background
                                        @size-change="myModalsizechange"
                                        @current-change="myModalcurrentchange"
                                        :current-page="myModalpageIndex"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="myModalpageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="myModaltotal">
                                        </el-pagination>
                                    </div>
                                </div>
                                <p>请选择策略:</p>
                                <div style="width:100%;max-height:200px;">
                                    <el-table
                                        :data="tableData2"
                                        @row-click="clickRow4" 
                                        ref="moviesTable4"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        @selection-change="SelectionChange2"
                                        style="max-height:158px;overflow:auto;margin-bottom:10px;">
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
                                        xshow-overflow-tooltip>
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
                                <div style="width:100%;height:auto;text-align:center;margin-top:10px;">
                                    <el-button @click="GroupStrategySubmit(0)" type="primary" size="small">下发</el-button>
                                    <el-button @click="GroupStrategySubmit(1)" type="primary" size="small">清空策略</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="分组" name="1" style='padding:25px 10px 0 10px;'>配置管理</el-tab-pane>
                        </el-tabs>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 调光 -->
        <el-dialog
        title="调光"
        :visible.sync="dialogVisible0"
        width="30%"
        style="border: none;">
        <span>
            <el-select v-model="value2" placeholder="请选择">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible0 = false">取 消</el-button>
            <el-button @click="dropdown" type="primary">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 单灯策略 清空策略 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        style="border: none;">
        <span>
            <el-checkbox v-model="dialogVisibleChecked">是否恢复感光模式</el-checkbox>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="ClearanceStrategy" type="primary">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 群组策略 清空策略 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        style="border: none;">
        <span>
            <el-checkbox v-model="dialogVisibleChecked2">是否恢复感光模式</el-checkbox>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button @click="ClearanceStrategy2" type="primary">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'lampslanterns',
    data () {
        return{
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewLampManage:false,//查看灯具管理
                lampControl:false,//灯具控制
                issuedLampStrategy:false,//灯具策略设置
                viewLampStrategy:false,//策略管理(查看)
                addLampStrategy:false,//添加策略
                editLampStrategy:false,//修改策略
                delLampStrategy:false,//删除策略
            },
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
            dialogVisible0:false,
            options2:[{value: '1',label: '10%'},{value: '2',label: '20%'},{value: '3',label: '30%'},{value: '4',label: '40%'},
            {value: '5',label: '50%'},{value: '6',label: '60%'},{value: '7',label: '70%'},{value: '8',label: '80%'},{value: '9',label: '90%'},
            {value: '10',label: '100%'}],
            value2:'7',
            dialogVisible:false,
            dialogVisibleChecked:false,
            dialogVisible2:false,
            dialogVisibleChecked2:false,
            // 群组策略参数
            GroupStrategyType:"0",
            myModaltableData:[],
            myModalSite:[],
            myModalpageIndex:1,
            myModalpageSize:10,
            myModaltotal:10,
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
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
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
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.moviesTable2.toggleRowSelection(row)
        },
        clickRow3(row){
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        clickRow4(row){
            this.$refs.moviesTable4.toggleRowSelection(row)
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
            for(var i=0;i<that.site.length;i++){
                lampIds.push(that.site[i].id)
            }
            var data = {
                "brightness": this.value2*10,
                'command':3,
                "lamps": lampIds,
                projectId:sessionStorage.projectId
            }
            this.$confirm('确认调节光亮度为'+this.value2*10+'%', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/control',
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
                            that.errorCode(data)
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
                    "lamps": lampIds,
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
                        url:that.serverurl+'/v1/solin/lighting/control',
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
                                that.errorCode(data)
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
                this.dialogVisible0 = true;
            }
            if(val=='4'){
                if(that.site.length==0||that.site.length>=2){
                    that.$message({
                        message: '请选择单个灯具进行状态刷新!',
                        type: 'error'
                    });
                    return;
                }
                var data = {
                    "command": 4,
                    "lamps": lampIds,
                    projectId:sessionStorage.projectId
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/control',
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
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //点击 策略管理/单灯策略/群组策略
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
                $('#GroupStrategy').modal('show')
                this.GroupStrategyClick()
            }
        },
        // 群组策略标签页切换
        GroupStrategyClick(){
            var that = this;
            if(that.GroupStrategyType=='0'){
                //请求集中器列表信息
                that.ConcentratorManagement()
                //请求策略列表信息
                that.strategyData()
            }
        },
        //群组策略-集中器
        myModalChange(val){this.myModalSite = val},
        myModalsizechange(val){this.myModalpageSize = val;},
        myModalcurrentchange(val){this.myModalpageIndex = val;},
        //请求集中器列表
        ConcentratorManagement(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.myModalpageIndex,
                    size:that.myModalpageSize,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                       that.myModaltableData = data.result.list
                       that.myModaltotal = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //群组策略下发/清空策略
        GroupStrategySubmit(val){
            var that = this;
            if(val=='0'){
                if(that.myModalSite.length==0||that.myModalSite.length>1){
                    this.$message({
                        message:'请选中单个集中器进行下发!',
                        type: 'error'
                    })
                    return;
                }
                if(that.site2.length==0||that.site2.length>1){
                    this.$message({
                        message:'请选中单个策略进行下发!',
                        type: 'error'
                    })
                    return;
                }
                var data = {}
                data.command = '1'
                data.concentratorId = that.myModalSite[0].id
                data.lampStrategyId = that.site2[0].id
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/concentrator/strategy',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '下发成功!',
                                type: 'success'
                            });
                            that.ConcentratorManagement()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='1'){
                if(that.myModalSite.length==0||that.myModalSite.length>1){
                    this.$message({
                        message:'请选中单个集中器进行清空!',
                        type: 'error'
                    })
                    return;
                }
                this.dialogVisible2 = true
                this.dialogVisibleChecked2 = false
            }
        },
        //群组策略--清空策略确定按钮
        ClearanceStrategy2(){
            var that = this
            var data = {}
            data.command = '2'
            data.concentratorId = that.myModalSite[0].id
            if(that.dialogVisibleChecked2==true){
                data.lightSense = '1'
            }
            if(that.dialogVisibleChecked2==false){
                data.lightSense = '0'
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/concentrator/strategy',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '策略清空成功',
                            type: 'success'
                        });
                        that.dialogVisible2 = false
                        that.ConcentratorManagement()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 策略管理列表  增加/删除/修改/查看详情/清空策略
        strategy(val,datas){
            var that = this
            //增加
            if(val=='1'){
                $('#myModal2').modal('show')
                this.datetimeType = false
                $('#strategyName').removeAttr("disabled");
                this.options1Change()
                this.type3 ='0'
                this.data.strategyName = ''
                this.data.expire = ''
                this.timer = ''
                this.tableData3 = []
                /* 完成拖拽 */
                $('#myModal').draggable({
                    cursor: "move",
                    handle: '.modal-header'
                });
                $('#myModal').css("overflow", "hidden")
            }
            //修改
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
                    strategys:arr,
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
                        url:that.serverurl+'/v1/solin/lighting/strategy/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.strategyData()
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
                data.command = '1'
                data.lamps = arr
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
                        url:that.serverurl+'/v1/solin/lighting/control/strategy',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(data),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '策略下发成功!',
                                    type: 'success'
                                });
                                $('#myModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data)
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
            //清空策略
            if(val=='6'){
                if(this.site.length==0){
                    that.$message({
                        message: '请选择灯具进行操作!',
                        type: 'error'
                    });
                    return;
                }
                this.dialogVisible = true
                this.dialogVisibleChecked = false
            }
        },
        //单灯策略--清空策略确定按钮
        ClearanceStrategy(){
            var that = this
            var data = {}
            var lampId = []
            for(var i=0;i<that.site.length;i++){
                lampId.push(that.site[i].id)
            }
            data.command = '2'
            data.lamps = lampId
            if(that.dialogVisibleChecked==true){
                data.lightSense = '1'
            }
            if(that.dialogVisibleChecked==false){
                data.lightSense = '0'
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/control/strategy',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '策略清空成功',
                            type: 'success'
                        });
                        that.dialogVisible = false
                        $('#myModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 策略保存
        addSubmit(){
            var that = this;
            var url = ''
            var type = ''
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
            if(this.type3 =='0'){url='/v1/solin/lighting/strategy';type = 'post';}
            if(this.type3 =='1'){url='/v1/solin/lighting/strategy';type = 'put';data.id=that.site2[0].id;}
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
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#myModal2').modal('hide')
                        that.strategyData()
                    }else{
                        that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/lighting/strategy',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    size:that.pageSize2,
                    strategyName:'',
                    projectIds:sessionStorage.projectId
                },
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
        // 初始化列表
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                poleId:'',
                projectIds:sessionStorage.projectId,
                online:that.value,
                dataType:'1'
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp',
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
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewLampManage'){
                                that.JurisdictionS.viewLampManage = true
                            }
                            if(data.result.operats[i].code=='lampControl'){
                                that.JurisdictionS.lampControl = true
                            }
                            if(data.result.operats[i].code=='issuedLampStrategy'){
                                that.JurisdictionS.issuedLampStrategy = true
                            }
                            if(data.result.operats[i].code=='viewLampStrategy'){
                                that.JurisdictionS.viewLampStrategy = true
                            }
                            if(data.result.operats[i].code=='addLampStrategy'){
                                that.JurisdictionS.addLampStrategy = true
                            }
                            if(data.result.operats[i].code=='editLampStrategy'){
                                that.JurisdictionS.editLampStrategy = true
                            }
                            if(data.result.operats[i].code=='delLampStrategy'){
                                that.JurisdictionS.delLampStrategy = true
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
        
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.lampslanterns{width: 100%;height: 100%;}
.lampslanterns>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.lampslanterns_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.lampslanterns_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.lampslanterns_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}
.strategy{width: 100%;}
.strategy_top{width: 100%;height: 40px;line-height: 40px;}
.strategy_bottom{width: 100%;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>div{height: 34px;line-height: 34px;}
.form-group>input{width: 185px;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>
<style>
/* .el-tabs__content{position: relative;top:0;height: 505px;} */
</style>
