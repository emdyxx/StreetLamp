<template>
    <div class="chargingpile">
        <!-- 灯具 -->
        <div class="chargingpile_top">
            <el-button v-if="addLanternsDeployment" @click="addchargingpile(0)" type="primary" icon='el-icon-plus' size='small'>添加灯具</el-button>
            <el-button v-if="editLanternsDeployment" @click="addchargingpile(1)" type="primary" icon="el-icon-edit" size='small'>编辑灯具</el-button>
            <el-button v-if="delLanternsDeployment" @click="deletechargingpile" type="primary" icon='el-icon-delete' size='small'>删除灯具</el-button>
            <el-button v-if="lampBindProject" @click="lampBindProjects" type="primary" icon='el-icon-setting' size='small'>绑定项目</el-button>
            <el-button @click="Powerfailuretime" type="primary" icon='el-icon-time' size='small'>断电时间</el-button>
            <el-button @click="ConcentratorManagement" type="primary" icon='el-icon-time' size='small'>集中器管理</el-button>
        </div>
        <div class="chargingpile_bottom">
            <div class="chargingpile_bottom_top">
                <div class="search">
                    <label>昵称:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入单灯名称">
                </div>
                <div class="search">
                    <label>灯控器标识:</label>
                    <input type="text" v-model="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入序列号">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="chargingpile_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    slot="empty"
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
                    label="昵称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="灯控器标识"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="集中器标识"
                    :formatter="formatRole"
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
                    prop="modelName"
                    align='center'
                    label="型号"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="lampNumber"
                    align='center'
                    label="灯具编号"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    align='center'
                    label="所属灯杆"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="location"
                    label="位置"
                    :formatter="formatRole"
                    align='center'
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    align='center'
                    label="备注"
                    :formatter="formatRole"
                    xshow-overflow-tooltip>
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
        <!-- 添加编辑模态框 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加灯具</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑灯具</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>灯控器标识:</label>
                            <input type="text" v-model="data.serialNumber" class="form-control" id="serialNumber" placeholder="请输入终端ID">
                            <label><span class="Required">*</span>集中器标识:</label>
                            <input type="text" v-model="data.concentratorSn" class="form-control" id="concentratorSN" placeholder="请输入控制器ID">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>昵称:</label>
                            <input type="text" v-model="data.nickName" class="form-control" id="nickName" placeholder="请输入单灯名称">
                            <label>型号:</label>
                            <el-select v-model="data.modelId" size='small' style='width:126px;' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>灯具编号:</label>
                            <input type="text" v-model="data.lampNumber" class="form-control" id="lampNumber" placeholder="请输入灯具编号(自定义)">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                style="width:126px"
                                :rows="1"
                                placeholder="请输入内容"
                                v-model="data.remark">
                            </el-input>
                        </div>
                        <div class="form-group">
                            <el-button v-if="relationPole" @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="addSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div>
        <!-- 关联灯杆 -->
        <div class="modal fade" id="LampPole_data" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择灯杆进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData2"
                            @row-click="clickRow2" 
                            ref="multipleTables"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange2"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="灯杆名称"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="灯杆类型"
                            width="80">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.poleType=='0'">普通灯杆</span>
                                    <span v-if="scope.row.poleType=='1'">智慧灯杆</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="location"
                            align='center'
                            label="位置"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'
                            width="162">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Relation" class="btn btn-primary">确认</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 绑定项目 -->
        <div class="modal fade" id="lampBindProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                        <button type="button" @click="Submit_lampBindProject" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 已关联断电时间灯杆 -->
        <div class="modal fade" id="Powerfailuretime" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:600px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">断电时间配置</h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                        <div>
                            <el-button @click="saveTime(0)" type="primary" size='small'>保存时间</el-button>
                            <el-button @click="saveTime(1)" type="primary" size='small'>清空时间</el-button>
                        </div>
                        <div style="margin-top:10px;display:flex;justify-content: center;">
                            <div class="input-group clockpicker" style="width:126px;">
                                <input type="text" v-model.lazy="startTime" class="form-control startTime">
                                <span class="input-group-addon">
                                    <span class="iconfont icon-shijian"></span>
                                </span>
                            </div>
                            <span style="line-height:34px;padding:0 10px 0 10px;">至</span>
                            <div class="input-group clockpicker" style="width:126px;">
                                <input type="text" v-model.lazy="endTime" class="form-control endTime">
                                <span class="input-group-addon">
                                    <span class="iconfont icon-shijian"></span>
                                </span>
                            </div>
                        </div>
                        <el-button @click="PowerfailuretimeRelation(0)" type="primary" size='small' style="margin:10px 0 10px 0;">关联设备</el-button>
                        <el-button @click="PowerfailuretimeRelation(1)" type="primary" size='small'>解除关联</el-button>
                        <el-table
                            :data="PowerfailuretimeData1"
                            ref="multipleTable"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="PowerfailuretimeChange1"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="灯杆名称"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="location"
                            align='center'
                            label="位置"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'
                            width="182">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="Time_sizechange"
                            @current-change="Time_currentchange"
                            :current-page="Time_pageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="Time_pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="Time_total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 未关联断电时间灯杆 -->
        <div class="modal fade" id="Powerfailuretime2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:600px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">断电时间配置</h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                        <el-table
                            :data="PowerfailuretimeData2"
                            ref="multipleTable"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="PowerfailuretimeChange2"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="灯杆名称"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="location"
                            align='center'
                            label="位置"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'
                            width="182">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="Time_sizechange2"
                            @current-change="Time_currentchange2"
                            :current-page="Time_pageIndex2"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="Time_pageSize2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="Time_total2">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="savelamp" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 集中器管理列表 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">集中器管理</h4>
                    </div>
                    <div class="modal-body">
                        <el-button @click="myModalOperation(0)" type="primary" size="small">添加</el-button>
                        <el-button @click="myModalOperation(1)" type="primary" size="small">修改</el-button>
                        <el-button @click="myModalOperation(2)" type="primary" size="small">删除</el-button>
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
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;margin-top:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="集中器名字"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="concentratorSn"
                            align='center'
                            label="集中器序列号"
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
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 集中器添加修改模态框 -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="myModal=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="myModal=='1'" class="modal-title" id="myModalLabel">修改</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label style="width:105px"><span class="Required">*</span>集中器名字:</label>
                            <input style="width:155px" type="text" v-model="myModaldata.nickName" class="form-control" id="serialNumber" placeholder="请输入集中器名字">
                        </div>
                        <div v-if="myModal=='0'" class="form-group">
                            <label style="width:105px"><span class="Required">*</span>集中器序列号:</label>
                            <input style="width:155px" type="text" v-model="myModaldata.concentratorSn" class="form-control" id="concentratorSN" placeholder="请输入集中器序列号">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="myModalsave" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'user',
    data () {
        return {
            serverurl:localStorage.serverurl,
            addLanternsDeployment:false,
            editLanternsDeployment:false,
            delLanternsDeployment:false,
            relationPole:false,
            lampBindProject:false,
            options5:[],
            value5:'',
            addType:'0', //判断是添加还是编辑的参数
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            nickName:'',
            serialNumber:'',
            options:[],
            data:{
                serialNumber:'',
                concentratorSn:'',
                nickName:'',
                lampNumber:'1',
                modelId:'',
                remark:'',//弹窗文本域
            },
            longitude:'',//经度
            latitude:'',//纬度
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10, 
            startTime:'',//断电时间
            endTime:'',
            PowerfailuretimeDatas:[],
            PowerfailuretimeData1:[],
            PowerfailuretimeDataSite1:[],
            PowerfailuretimeData2:[],
            PowerfailuretimeDataSite2:[],
            Time_pageIndex:1,
            Time_pageSize:10,
            Time_total:30,
            Time_pageIndex2:1,
            Time_pageSize2:10,
            Time_total2:30,
            //集中器参数
            myModaltableData:[],
            myModalSite:[],
            myModalpageIndex:1,
            myModalpageSize:10,
            myModaltotal:10,
            myModal:'0',
            myModaldata:{
                nickName:'',
                concentratorSn:''
            }
        }
    },
    mounted(){
        // 
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
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        clickRow3(row){
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        //点击集中器管理
        ConcentratorManagement(){
            var that = this;
            $('#myModal').modal('show')
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    nickName:'',
                    concentratorSn:'',
                    page:that.myModalpageIndex,
                    size:that.myModalpageSize,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                       that.myModaltableData = data.result.list
                       that.myModaltotal = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        myModalChange(val){this.myModalSite = val},
        myModalsizechange(val){this.myModalpageSize = val;},
        myModalcurrentchange(val){this.myModalpageIndex = val;},
        //集中器管理添加,修改,删除
        myModalOperation(val){
            var that = this;
            if(val=='0'){
                that.myModal = '0'
                $('#myModal2').modal('show')
                that.myModaldata.nickName = ''
                that.myModaldata.concentratorSn = ''
            }
            if(val=='1'){
                if(that.myModalSite.length==0||that.myModalSite.length>1){
                    that.$message({
                        message: '请选择单条数据修改!',
                        type: 'error'
                    });
                    return;
                }
                that.myModal = '1'
                $('#myModal2').modal('show')
                that.myModaldata.nickName = that.myModalSite[0].nickName
                that.myModaldata.concentratorSn = that.myModalSite[0].concentratorSn
            }
            if(val=='2'){
                if(that.myModalSite.length==0){
                    that.$message({
                        message: '请选择数据进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i = 0;i<that.myModalSite.length;i++){
                    arr.push(that.myModalSite[i].id)
                }
                this.$confirm('是否删除所选灯具？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/lighting/concentrator/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            concentrators:arr
                        }),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.ConcentratorManagement()
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
        },
        //集中器管理添加,修改保存
        myModalsave(){
            var that = this
            var type = ''
            var url = ''
            var data = {}
            if(that.myModal == '0'){
                if(that.myModaldata.nickName==''||that.myModaldata.concentratorSn==''){
                    that.$message({
                        message: '必填数据不能为空!',
                        type: 'error'
                    });
                    return;
                }
                url = '/v1/solin/lighting/concentrator';
                type = 'post'
                data.concentratorSn = that.myModaldata.concentratorSn
            }
            if(that.myModal == '1'){
                if(that.myModaldata.nickName==''){
                    that.$message({
                        message: '必填数据不能为空!',
                        type: 'error'
                    });
                    return;
                }
                url = '/v1/solin/lighting/concentrator';
                type = 'put'
                data.id = that.myModalSite[0].id
            }
            data.nickName = that.myModaldata.nickName
            data.projectId = sessionStorage.projectId
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
                        that.ConcentratorManagement()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //请求断电时间信息
        dataTime(){
            var that = this;
            that.startTime = ''
            that.endTime = ''
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/outage',
                contentType:'application/json;charset=UTF-8',
                data:{
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.PowerfailuretimeDatas = data.result.lampOutageVo
                        setTimeout(function(){
                            that.startTime=data.result.lampOutageVo.startTime
                            that.endTime=data.result.lampOutageVo.endTime
                        },200)
                        if(data.result.lampOutageVo==undefined||data.result.lampOutageVo==null||data.result.lampOutageVo==''){   
                        }else{
                            that.PowerfailureDa1()
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        Time_currentchange2(val){this.Time_pageIndex2 = val;this.PowerfailureDa2();},
        Time_sizechange2(val){this.Time_pageSize2=val;this.PowerfailureDa2();},
        //请求未关联断电时间设备
        PowerfailureDa2(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp/outage',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.Time_pageIndex2,
                    size:that.Time_pageSize2,
                    outageId:'0',
                    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.Time_total2 = data.result.total
                        that.PowerfailuretimeData2 = data.result.list
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        Time_currentchange(val){this.Time_pageIndex = val;this.PowerfailureDa1();},
        Time_sizechange(val){this.Time_pageSize=val;this.PowerfailureDa1();},
        //请求已关联断电时间设备
        PowerfailureDa1(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp/outage',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.Time_pageIndex2,
                    size:that.Time_pageSize2,
                    outageId:that.PowerfailuretimeDatas.id,
                    projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.Time_total = data.result.total
                        that.PowerfailuretimeData1 = data.result.list
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //点击断电时间按钮
        Powerfailuretime(){
            var that = this
            $('#Powerfailuretime').modal('show')
            $('.clockpicker').clockpicker();
            this.dataTime()
        },
        //点击保存断电时间和清除时间按钮
        saveTime(val){
            var that = this;
            if(val=='0'){
                var url = ''
                if($('.startTime').val()==''||$('.endTime').val()==''){
                    that.$message({
                        message: '请选择断电时间!',
                        type: 'error'
                    });
                    return;
                }
                var data = {
                    startTime:$('.startTime').val(),
                    endTime:$('.endTime').val(),
                    projectId:sessionStorage.projectId
                }
                var type = ''
                if(that.PowerfailuretimeDatas==''||that.PowerfailuretimeDatas==null||that.PowerfailuretimeDatas==undefined){
                    url = that.serverurl+'/v1/solin/lighting/outage'
                    type = 'post'
                }else{
                    url = that.serverurl+'/v1/solin/lighting/outage'
                    type = 'put'
                    data.id = that.PowerfailuretimeDatas.id
                }
                $.ajax({
                    type:type,
                    async:true,
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '断电时间保存成功!',
                                type: 'success'
                            });
                            that.dataTime()
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
            if(val=='1'){
                $.ajax({
                    type:'delete',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/outage/'+that.PowerfailuretimeDatas.id,
                    contentType:'application/json;charset=UTF-8',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '断电时间清除成功!',
                                type: 'success'
                            });
                            that.dataTime()
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        //点击关联灯杆,解除关联按钮
        PowerfailuretimeRelation(val){
            var that = this
            if(val=='0'){
                $('#Powerfailuretime2').modal('show')
                this.PowerfailureDa2()
            }
            if(val=='1'){
                var array = []
                if(that.PowerfailuretimeDataSite1.length==0){
                    that.$message({
                        message: '请选择灯杆!',
                        type: 'error'
                    });
                    return;
                }
                for(var i =0;i<that.PowerfailuretimeDataSite1.length;i++){
                    array.push(that.PowerfailuretimeDataSite1[i].id)
                }
                var data = {
                    command:'2',
                    lamps:array,
                    outageId:that.PowerfailuretimeDatas.id
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/lamp/outage',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '关联断电时间解除成功!',
                                type: 'success'
                            });
                            $('#Powerfailuretime2').modal('hide')
                            that.PowerfailureDa1()
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        //灯具关联断电时间
        savelamp(){
            var that = this
            var array = []
            if(that.PowerfailuretimeDataSite2.length==0){
                that.$message({
                    message: '请选择灯杆!',
                    type: 'error'
                });
                return;
            }
            for(var i =0;i<that.PowerfailuretimeDataSite2.length;i++){
                array.push(that.PowerfailuretimeDataSite2[i].id)
            }
            var data = {
                command:'1',
                lamps:array,
                outageId:that.PowerfailuretimeDatas.id
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp/outage',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联断电时间成功!',
                            type: 'success'
                        });
                        $('#Powerfailuretime2').modal('hide')
                        that.PowerfailureDa1()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        PowerfailuretimeChange1(val){
            this.PowerfailuretimeDataSite1 = val
        },
        PowerfailuretimeChange2(val){
            this.PowerfailuretimeDataSite2 = val
        },
        // 表格数据change时间进行编辑删除
        userSelectionChange(val){
            this.site = val
        },
        //获取型号列表
        ModelData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/model/1',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.mapList
                        if(that.addType=='0'){
                            that.data.modelId = data.result.mapList[0].id
                        }
                        if(that.addType=='1'){
                            that.data.modelId = that.site[0].modelId
                        }
                        
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //点击添加或者编辑按钮
        addchargingpile(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            var that = this;
            // 0为添加 1为编辑
            if(val=='0'){
                $('#addModal').modal('show')
                // $('#lampNumber').removeAttr('disabled')
                $('#lampNumber').attr('disabled','disabled')
                this.addType = val
                this.ModelData()
                that.data.serialNumber = ''
                that.data.concentratorSN = ''
                that.data.nickName = ''
                that.data.mark = ''
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                   this.$message({
                        message: '请选择单个灯具进行编辑!',
                        type: 'error'
                    });
                    return; 
                }
                this.addType = val
                this.ModelData()
                $('#addModal').modal('show')
                $('#lampNumber').attr('disabled','disabled')
                that.data.serialNumber = that.site[0].serialNumber
                that.data.concentratorSn = that.site[0].concentratorSn
                that.data.nickName = that.site[0].nickName
                that.data.lampNumber = that.site[0].lampNumber
                that.data.remark = that.site[0].remark
            }
        },
        //点击关联灯杆
        LampPole_data(){
            var that= this;
            $('#LampPole_data').modal('show')
            this.site2 = []
            this.LampPoleData();
        },
        //查询所有灯杆数据
        LampPoleData(){
            var that = this;
            var data = {
                page:that.pageIndex2,
                size:that.pageSize2,
                nickName:'',
                serialNumber:'',
                poleType:'',
                areaId:'',
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
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                        if(that.addType=='1'){
                            var arr = []
                            console.log(that.site[0])
                            for(let i = 0;i<that.site.length;i++){
                                for(let j = 0;j<data.result.list.length;j++){
                                    if(that.site[i].poleId==data.result.list[j].id){
                                        arr.push(data.result.list[j])
                                    }
                                }
                            }
                            setTimeout(function(){
                                arr.forEach(row => {
                                    that.$refs.multipleTables.toggleRowSelection(row);
                                });
                            },200)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        SelectionChange2(val){this.site2 = val;},
        sizechange2(val){this.pageSize2 = val;this.LampPoleData();},
        currentchange2(val){this.pageIndex2 = val;this.LampPoleData();},
        //关联确认
        Relation(){
            if(this.site2.length>=2||this.site2.length==0){
                this.$message({
                    message: '只能关联一个灯杆!',
                    type: 'warning'
                });
                return;
            }
            $('#LampPole_data').modal('hide')
        },
        //添加编辑保存
        addSubmit(){
            var that = this;
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            var url = ''
            if(this.data.serialNumber==''||this.data.concentratorSn==''||this.data.nickName==''||this.data.lampNumber==''){
                that.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(result.test(this.data.serialNumber)){
                that.$message({
                    message: '终端ID不能有中文',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            if(result.test(this.data.concentratorSN)){
                that.$message({
                    message: '控制器ID不能有中文',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            var datas = that.data
            var type = ''
            if(this.addType=='0'){
                url='/v1/solin/lighting/lamp'
                type = 'post'
            }
            if(this.addType=='1'){
                url='/v1/solin/lighting/lamp';
                datas.id=this.site[0].id
                type = 'put'
            }
            datas.projectId=sessionStorage.projectId
            if(this.site2.length==''){
                if(this.addType=='0'){
                    datas.poleId='0'
                }else{
                    datas.poleId=that.site[0].poleId
                }
            }else{
                datas.poleId = this.site2[0].id
            }
            if(this.addType=='1'){datas.id=that.site[0].id}
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(datas),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        $('#addModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //删除灯具
        deletechargingpile(){
            var that = this
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择一个灯具进行删除!',
                    type: 'warning'
                });
                return;
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选灯具？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/lamp/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({lamps:arr}),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            that.ready()
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
        },
        //绑定项目
        lampBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯具进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            $('#lampBindProjectModal').modal('show')
            this.project()
        },
        //绑定项目提交
        Submit_lampBindProject(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/lamp/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    lamps:arr,
                    projectId:that.value5
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#lampBindProjectModal').modal('hide')
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                },
            })
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
                        that.value5 = ''
                    }else{
                        that.errorCode(data.errorCode)
                    }
                },
            })
        },
        //初始化列表
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                poleId:'',
                projectIds:sessionStorage.projectId,
                online:''
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
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        search(){this.ready()},
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
                            if(data.result.operats[i].code=='addLamp'){
                                that.addLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='editLamp'){
                                that.editLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='delLamp'){
                                that.delLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='lampAssociatePole'){
                                that.relationPole = true
                            }
                            if(data.result.operats[i].code=='setLampProject'){
                                that.lampBindProject = true
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
        this.ready()
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.chargingpile{width: 100%;height: 100%;}
.chargingpile>div{width: 100%;position: absolute;}
.chargingpile_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.chargingpile_top>button{height:33px;margin:8px 0 0 10px;}
.chargingpile_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow: auto;}
.chargingpile_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.chargingpile_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}

.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 125px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}

.search{display: flex;}
.search>label{width: 85px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>