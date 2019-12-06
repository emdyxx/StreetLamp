<template>
    <div class="section solinPoleDeploys">
        <!-- 灯杆模式 -->
        <div class="section_top">
            <p>位置: &nbsp;设备部署>灯杆管理</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewPoleDeploy">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='序列号';type='2';">序列号</el-dropdown-item>
                            <el-dropdown-item @click.native="name='类别';type='3';">类型</el-dropdown-item>
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
                            <el-select v-model="value_search" size='small' style="width:194px;" clearable placeholder="请选择">
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
                <div class="section_bottom_right">
                    <el-button v-if="JurisdictionS.addPole" @click="addLampPole(0)" type="primary" icon='el-icon-plus' plain size='small'>添加</el-button>
                    <el-button v-if="JurisdictionS.delPole" @click="deleteLampPole" type="primary" icon='el-icon-delete' plain size='small'>删除</el-button>
                    <el-button v-if="JurisdictionS.setPoleProject" @click="poleBindProjects" type="primary" plain size='small'>绑定项目</el-button>
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
                    show-overflow-tooltip=true
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div class="PoleRelation" v-if="props.row.lampCount!=0">
                                    <span>灯具</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(0,props.row.id)">已关联灯具</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.screenCount!=0">
                                    <span>LED屏幕</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(1,props.row.id)">已关联LED屏幕</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.loraCount!=0">
                                    <span>传感器</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(2,props.row.id)">已关联传感器</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.envCount!=0">
                                    <span>气象站</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(3,props.row.id)">已关联气象站</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.lightCount!=0">
                                    <span>光照度</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(4,props.row.id)">已关联光照度</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.cameraCount!=0">
                                    <span>摄像头</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(5,props.row.id)">已关联摄像头</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.windSolarCount!=0">
                                    <span>风光控制</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(6,props.row.id)">已关联风光控制</el-button>
                                    </span>
                                </div>
                                <div class="PoleRelation" v-if="props.row.radarCount!=0">
                                    <span>雷达</span>
                                    <span>
                                        <el-button type="text" @click="SensorDatas2(7,props.row.id)">已关联雷达</el-button>
                                    </span>
                                </div>
                            </template>
                        </el-table-column>    
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="序列号"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="类型"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.poleType=='0'" class="onLineStatus">普通灯杆</span>
                            <span v-if="scope.row.poleType=='1'" class="offLineStatus">智慧灯杆</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    show-overflow-tooltip
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="RelationSensor(scope.row.id)" type="primary" size="mini">关联设备</el-button>
                            <el-button v-if="JurisdictionS.editPole" @click="addLampPole(1,scope.row)" type="primary" size='mini'>编辑</el-button>
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
        <!-- 添加编辑灯杆 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加灯杆</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑灯杆</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>名&emsp;&emsp;称:</label>
                            <input type="text" v-model="LampPoleData.nickName" class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>序&ensp;列&ensp;号:</label>
                            <input type="text" v-model="LampPoleData.serialNumber" id="serialNumber" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </div>
                        <div class="form-group">
                            <label>灯杆类型:</label>
                            <el-select v-model="value" size='small' style="width:195px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label>位&emsp;&emsp;置:</label>
                            <input type="text" v-model="LampPoleData.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>
                        <div class="form-group">
                            <label>备&emsp;&emsp;注:</label>
                            <el-input
                                type="textarea"
                                :rows="1"
                                style="width:195px;"
                                placeholder="请输入内容"
                                v-model="LampPoleData.remark">
                            </el-input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 绑定项目 -->
        <div class="modal fade" id="poleBindProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">绑定项目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <span style="line-height:35px;">项目:</span>
                            <el-select size='small' v-model="value5" style="margin-left:20px;" placeholder="请选择">
                                <el-option
                                    v-for="item in options5"
                                    style="height:30px;"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Submit_poleBindProject" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 地图选点 -->
        <div class="modal fade" id="map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:700px;">
                <div class="modal-content">
                    <div class="modal-body map_Z" style='height:550px'>
                        <div>点击地图选取坐标--坐标:{{referencePosition}}</div>
                        <div>
                            <div style="width:100%;height:100%;" id="allmap">

                            </div>
                        </div>
                        <div>
                            <el-button @click="mapSubmit" type="primary" size='mini'>确定</el-button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 未关联设备列表 -->
        <el-dialog
            title="关联设备"
            :visible.sync="dialogVisible"
            width="800px">
            <span>
                <div style="margin-bottom:10px;">
                    <span>设备类型:</span>
                    <el-select v-model="value4" @change="options4Change" placeholder="请选择" size="small" style="width:145px;">
                        <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-table
                    :data="tableData2"
                    border
                    size='small'
                    tooltip-effect="dark"
                    show-overflow-tooltip=true
                    style="width: 100%"
                    @selection-change="SelectionChange2">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="序列号"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="备注"
                    min-width="120">
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
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="RelationSubmit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 已关联设备列表 -->
        <el-dialog
            :title="dialogVisible2Title"
            :visible.sync="dialogVisible2"
            width="800px">
            <span>
                <el-table
                    :data="tableData3"
                    border
                    size='small'
                    tooltip-effect="dark"
                    show-overflow-tooltip=true
                    style="width: 100%">
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="序列号"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="备注"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="100">
                        <template slot-scope="scope">
                            <el-button @click="RelieveSubmit(scope.row.id)" type="primary" size="mini">解除关联</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'user',
    data () {
        return {
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewPoleDeploy:false,//查看灯杆
                addPole:false,//添加灯杆
                editPole:false,//修改灯杆
                delPole:false,//删除灯杆
                setPoleProject:false,//灯杆绑定项目
                poleAssociateLamp:false,//关联灯具
                poleAssociateScreen:false,//关联屏幕
                poleAssociateEnv:false,//关联气象站
                SetUp:false,//设置按钮
            },
            options5:[],
            value5:'',
            site:[], //灯杆列表选中数据
            addtype:'0', //判断是添加还是编辑的参数
            poleSite:[],
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            options: [{
                value: 0,
                label: '普通灯杆'
                }, {
                value: 1,
                label: '智慧灯杆'
            }],
            value: 0,
            nickName:'',
            value_search:'',
            serialNumber:'',
            radio1: '0', //模态框单选按钮
            options1:[],
            value1:'',
            options2:[],
            value2:'',
            options3:[],
            value3:'',
            
            // 设备关联参数
            dialogVisible:false,
            options4:[{label:'灯具',value:'0'},{label:'LED屏幕',value:'1'},{label:'传感器',value:'2'},{label:'气象站',value:'3'},{label:'光照度',value:'4'},{label:'摄像头',value:'5'},{label:'风光控制',value:'6'},{label:'雷达',value:'7'}],
            value4:'0',
            tableData2:[],
            site2:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
            dialogVisible2:false,
            dialogVisible2Title:'',
            tableData3:[],
            tableData3Type:'',

            referencePosition:'',
            LampPoleData:{
                nickName:'',
                serialNumber:'',
                coord:'',
                remark:'',
            },//添加灯杆的信息
            RelationType:'',
            poleId:'',
        }
    },
    mounted(){
        this.province(3)
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
            this.value_search=''
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

        //点击关联设备
        RelationSensor(id){
            var that = this;
            this.dialogVisible = true
            this.poleId = id
            this.value4 = '0'
            this.SensorDatas()
        },
        options4Change(){this.SensorDatas()},
        //请求未关联设备列表
        SensorDatas(){
            var that = this;
            var url = ''
            if(this.value4=='0'){url='/v1/solin/lighting/lamp/pole'}
            if(this.value4=='1'){url='/v1/solin/screen/pole'}
            if(this.value4=='2'){url='/v1/solin/lora/pole'}
            if(this.value4=='3'){url='/v1/solin/sensor/env/pole'}
            if(this.value4=='4'){url='/v1/solin/sensor/lightness/pole'}
            if(this.value4=='5'){url='/v1/solin/camera/device/pole'}
            if(this.value4=='6'){url='/v1/solin/sensor/wind-solar/pole'}
            if(this.value4=='7'){url='/v1/solin/sensor/radar/pole'}
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    size:that.pageSize2,
                    poleId:that.poleId,
                    projectIds:sessionStorage.projectId,
                    command:'2',
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
        SelectionChange2(val){this.site2 = val},
        sizechange2(val){this.pageSize2 = val;this.SensorDatas();},
        currentchange2(val){this.pageIndex2 = val;this.SensorDatas();},
        //请求已关联设备列表
        SensorDatas2(val,id){
            var that = this;
            var url = ''
            this.poleId = id
            this.tableData3Type = val
            if(this.tableData3Type=='0'){url='/v1/solin/lighting/lamp/pole';this.dialogVisible2Title = '已关联灯具';}
            if(this.tableData3Type=='1'){url='/v1/solin/screen/pole';this.dialogVisible2Title = '已关联LED屏幕';}
            if(this.tableData3Type=='2'){url='/v1/solin/lora/pole';this.dialogVisible2Title = '已关联传感器';}
            if(this.tableData3Type=='3'){url='/v1/solin/sensor/env/pole';this.dialogVisible2Title = '已关联气象站';}
            if(this.tableData3Type=='4'){url='/v1/solin/sensor/lightness/pole';this.dialogVisible2Title = '已关联光照度';}
            if(this.tableData3Type=='5'){url='/v1/solin/camera/device/pole';this.dialogVisible2Title = '已关联摄像头';}
            if(this.tableData3Type=='6'){url='/v1/solin/sensor/wind-solar/pole';this.dialogVisible2Title = '已关联风光控制';}
            if(this.tableData3Type=='7'){url='/v1/solin/sensor/radar/pole';this.dialogVisible2Title = '已关联灯雷达';}
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    poleId:that.poleId,
                    projectIds:sessionStorage.projectId,
                    command:'1',
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3 = data.result.list
                        that.dialogVisible2 = true
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //关联设备确定
        RelationSubmit(){
            var that = this;
            var url = '';
            var data = {command:'1',poleId:that.poleId,}
            var arr = []
            if(this.value4=='0'){
                url='/v1/solin/lighting/lamp/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.lamps = arr
            }
            if(this.value4=='1'){
                url='/v1/solin/screen/device/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.screens = arr
            }
            if(this.value4=='2'){
                url='/v1/solin/lora/device/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.loraSensors = arr
            }
            if(this.value4=='3'){
                url='/v1/solin/sensor/env/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.envs = arr
            }
            if(this.value4=='4'){
                url='/v1/solin/sensor/lightness/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.lights = arr
            }
            if(this.value4=='5'){
                url='/v1/solin/camera/device/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.cameras = arr
            }
            if(this.value4=='6'){
                url='/v1/solin/sensor/wind-solar/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.windSolars = arr
            }
            if(this.value4=='7'){
                url='/v1/solin/sensor/radar/pole';
                for(var i=0;i<that.site2.length;i++){
                    arr.push(that.site2[i].id)
                }
                data.radars = arr
            }
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
                            message: '关联成功!',
                            type: 'success'
                        });
                        that.SensorDatas()
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //解除设备关联
        RelieveSubmit(val){
            var that = this;
            var url = ''
            var data = {command:'2',poleId:this.poleId}
            if(this.tableData3Type=='0'){url = '/v1/solin/lighting/lamp/pole';data.lamps=[val]}
            if(this.tableData3Type=='1'){url = '/v1/solin/screen/device/pole';data.screens=[val]}
            if(this.tableData3Type=='2'){url = '/v1/solin/lora/device/pole';data.loraSensors=[val]}
            if(this.tableData3Type=='3'){url = '/v1/solin/sensor/env/pole';data.envs=[val]}
            if(this.tableData3Type=='4'){url = '/v1/solin/sensor/lightness/pole';data.lights=[val]}
            if(this.tableData3Type=='5'){url = '/v1/solin/camera/device/pole';data.cameras=[val]}
            if(this.tableData3Type=='6'){url = '/v1/solin/sensor/wind-solar/pole';data.windSolars=[val]}
            if(this.tableData3Type=='7'){url = '/v1/solin/sensor/radar/pole';data.radars=[val]}
            that.$confirm('此操作将解除关联灯杆,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
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
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.SensorDatas2(that.tableData3Type,that.poleId)
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        //点击拉取地图
        mapClick(){
            var that = this
            $('#map').modal('show')
            $('#map').on('shown.bs.modal', function (e) {
                var map = new BMap.Map("allmap",{enableMapClick:false});    // 创建Map实例
                var coord = ''
                if(that.LampPoleData.coord!=''){
                    coord = that.LampPoleData.coord
                    coord = coord.split(',')
                    var point = new BMap.Point(coord[0],coord[1]);
                    map.centerAndZoom(point, 12);  // 初始化地图,设置中心点坐标和地图级别
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                }else{
                    map.centerAndZoom(sessionStorage.areaname, 12);  // 初始化地图,设置中心点坐标和地图级别
                }
                map.addEventListener("click", function(e){
                    map.clearOverlays();
                    var point = new BMap.Point(e.point.lng,e.point.lat);
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                    that.referencePosition = e.point.lng+','+e.point.lat   
                });
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var size = new BMap.Size(10, 20);
                map.addControl(new BMap.CityListControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: size,
                }));
            })
        },
        //地图确定
        mapSubmit(){
            $('#map').modal('hide')
            this.LampPoleData.coord = this.referencePosition
        },
        //省请求
        province(val,row){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/0',
                contentType:'application/json;charset=UTF-8',
                data:{
                    id:1
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options1 = data.result.areas
                        if(val=='3'){
                            
                        }else{
                            if(val=='1'){
                                if(row.provinceId==''||row.provinceId==null||row.provinceId==undefined){}else{
                                    that.value1 = Number(row.provinceId)
                                }
                            }else{
                                that.value1 = data.result.areas[0].id
                            }
                            that.city(val,row)
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        provinceChange(){
            this.city()
        },
        //获取市的信息
        city(val,row){
            var that = this;
            var data = {
                id:2
            }
            data.parentId = that.value1
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value1,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.areas
                        if(val=='3'){

                        }else{
                            if(val=='1'){
                                if(row.cityId==''||row.cityId==null||row.cityId==undefined){}else{
                                    that.value2 = Number(row.cityId)
                                }
                            }else{
                                that.value2 = data.result.areas[0].id
                            }  
                            that.area(val,row)
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        cityChange(){
            this.area()
        },
        //获取区的信息
        area(val,row){
            var that = this;
            var data = {id:3}
            data.parentId = that.value2
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value2,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.areas
                        if(val=='3'){
                            
                        }else{
                            if(val=='1'){
                                if(row.areaId==''||row.areaId==null||row.areaId==undefined){}else{
                                    that.value3 = Number(row.areaId)
                                }
                            }else{
                                that.value3 = data.result.areas[0].id 
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 点击添加还是编辑按钮
        addLampPole(val,row){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            // 0位添加 1为编辑
            if(val=='0'){
                $('#addModal').modal('show')
                $('#serialNumber').removeAttr('disabled')
                this.province(0)
                this.addtype = val
                this.LampPoleData.nickName = ''
                this.LampPoleData.remark = ''
                this.LampPoleData.serialNumber = ''
                this.LampPoleData.coord = ''
                this.referencePosition = ''
            }
            if(val=='1'){
                this.addtype = val
                this.province(1,row)
                $('#addModal').modal('show')
                $('#serialNumber').attr('disabled','disabled')
                this.poleSite = row
                this.LampPoleData.nickName = row.nickName
                this.value = row.poleType
                this.LampPoleData.remark = row.remark
                this.LampPoleData.coord = row.coord
                this.referencePosition = row.coord
                this.LampPoleData.serialNumber = row.serialNumber
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //添加编辑灯杆保存
        addSubmit(){
            var that = this;
            if(this.LampPoleData.nickName==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            var data = {};
            var type = ''
            if(this.addtype=='0'){type = 'post';}
            if(this.addtype=='1'){
                type = 'put';
                data.id=that.poleSite.id;
            };
            data.nickName = this.LampPoleData.nickName;
            data.poleType = this.value;
            data.areaId = this.value3;
            data.remark = this.LampPoleData.remark;
            data.serialNumber = this.LampPoleData.serialNumber;
            data.coord = this.LampPoleData.coord
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#addModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //删除按钮
        deleteLampPole(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯杆进行删除!',
                    type: 'warning'
                });
                return;
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选灯杆？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 这里进行删除请求
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/pole/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        poles:arr
                    }),
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
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //绑定项目
        poleBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯杆进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            that.value5 = Number(sessionStorage.projectId)
            $('#poleBindProjectModal').modal('show')
            this.project()
        },
        //请求所有项目接口
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects/type/1',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options5 = data.result.projects
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //绑定项目提交
        Submit_poleBindProject(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    poles:arr,
                    projectId:that.value5
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#poleBindProjectModal').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },

        //获取灯杆列表
        ready(){
            var that = this;
            var areaId='';
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName,
                poleType:that.value_search,
                serialNumber:that.serialNumber,
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole',
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
        search(){this.ready()},
        //灯杆列表选中
        SelectionChange(val){this.site = val},
        sizechange(val){this.pageSize = val;this.ready();},
        currentchange(val){this.pageIndex = val;this.ready();},
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
                            if(data.result.operats[i].code=='viewPoleDeploy'){
                                that.JurisdictionS.viewPoleDeploy = true
                            }
                            if(data.result.operats[i].code=='addPole'){
                                that.JurisdictionS.addPole = true
                            }
                            if(data.result.operats[i].code=='editPole'){
                                that.JurisdictionS.editPole = true
                            }
                            if(data.result.operats[i].code=='delPole'){
                                that.JurisdictionS.delPole = true
                            }
                            if(data.result.operats[i].code=='poleAssociateLamp'){
                                that.JurisdictionS.poleAssociateLamp = true
                            }
                            if(data.result.operats[i].code=='poleAssociateScreen'){
                                that.JurisdictionS.poleAssociateScreen = true
                            }
                            if(data.result.operats[i].code=='poleAssociateEnv'){
                                that.JurisdictionS.poleAssociateEnv = true
                            }
                            if(data.result.operats[i].code=='setPoleProject'){
                                that.JurisdictionS.setPoleProject = true
                                that.JurisdictionS.SetUp = true
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
        that.Jurisdiction()
        that.ready()
    },
}
</script>
<style scoped>
.PoleRelation{height: 40px;display: flex;align-items: center;border-bottom: 1px solid #dddddd;}
.PoleRelation>span{text-align: center;font-size: 14px;}
.PoleRelation>span:nth-of-type(1){margin-left: 90px;width: 100px;display: inline-block;text-align: left;}
.PoleRelation>span:nth-of-type(2){padding-left: 90px;}
</style>
<style lang='less'>
.solinPoleDeploys{
    .el-dialog__header{
        padding: 8px 20px 8px;background:#4382e6;
        color: #ffffff;
        span,i{color: #ffffff;}
        button{top:10px;}
    }
    .el-tabs__header{margin: 0;}
    .el-tabs__content{border: 1px solid #e4e8ee;border-top: none;}
}

</style>
