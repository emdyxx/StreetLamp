<template>
    <div class="sensor">
        <!-- 气象站部署 -->
        <div class="sensor_top">
            <el-button v-if="addSensor" @click="addsensor(0)" type="primary" icon='el-icon-plus' size='small'>添加气象站</el-button>
            <el-button v-if="editSensor" @click="addsensor(1)" type="primary" icon="el-icon-edit" size='small'>编辑气象站</el-button>
            <el-button v-if="delSensor" @click="deletesensor" type="primary" icon='el-icon-delete' size='small'>删除气象站</el-button>
            <el-button v-if="sensorBindProject" @click="sensorBindProjects" type="primary" icon='el-icon-setting' size='small'>绑定项目</el-button>
        </div>
        <div class="sensor_bottom">
            <div class="sensor_bottom_top">
                <div class="search">
                    <label style="width:100px;">集中器标识:</label>
                    <input type="text" v-model="concentratorSN" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入集中器标识">
                </div>
                <div class="search">
                    <label style="width:90px;">名称:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入气象站名称">
                </div>
                <div class="search">
                    <label>型号:</label>
                    <el-select v-model="modelId" size='small' clearable style='width:146px;' placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.modelName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="sensor_bottom_bottom">
                <el-table
                    :data="tableData"
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
                    label="昵称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="气象站编号"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSN"
                    align='center'
                    label="集中器标识"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    align='center'
                    label="型号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    align='center'
                    label="所属灯杆"
                    min-width="110"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="location"
                    label="位置"
                    align='center'
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="mark"
                    align='center'
                    label="备注"
                    :formatter="formatRole"
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
        </div>
        <!-- 添加编辑气象站模态框 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加气象站</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑气象站</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>昵称:</label>
                            <input type="text" v-model="data.nickName" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>集中器标识:</label>
                            <input type="text" v-model="data.concentratorSN" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入集中器标识">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>型号:</label>
                            <el-select v-model="data.modelId" size='small' style='width:196px;' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>气象站编号:</label>
                            <input type="text" v-model="data.serialNumber" id="serialNumber" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入气象站编号">
                        </div>
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="1"
                                style="width:196px;"
                                placeholder="请输入内容"
                                v-model="data.mark">
                            </el-input>
                        </div> 
                        <div class="form-group">
                            <el-button v-if='relationPole' @click="LampPole_data" type="primary" size='small'>关联灯杆</el-button>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
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
                            border
                            stripe
                            size='small'
                            ref="multipleTable"
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
        <div class="modal fade" id="sensorBindProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                        <button type="button" @click="Submit_sensorBindProject" class="btn btn-primary">确定</button>
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
            addSensor:false,
            editSensor:false,
            delSensor:false,
            relationPole:false,
            sensorBindProject:false,
            site:[], //列表选中数据列表
            addtype:'0', //判断是添加还是编辑类型的参数
            options5:[],
            value5:'',
            concentratorSN:'',
            nickName:'',
            modelId:'',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            options:[],
            value:'1',
            data:{
                nickName:'',
                concentratorSN:'',
                modelId:'',
                online:'0',
                mark:'',
                serialNumber:''
            },//添加气象站数据
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10,
        }
    },
    mounted(){
        this.ModelData()
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        //获取型号列表
        ModelData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/model/getModel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    modelType:'3'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.models
                        if(that.addType=='0'){
                            that.data.modelId = data.result.models[0].id
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
        // 添加,编辑气象站
        addsensor(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            
            // 0为添加,1为删除
            if(val=='0'){
                this.addtype = val;
                this.ModelData()
                this.data.nickName = ''
                this.data.concentratorSN = ''
                this.data.modelId = ''
                this.data.location = ''
                this.data.mark = ''
                this.value = ''
                $('#addModal').modal('show')
                $('#serialNumber').removeAttr('disabled')
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择一个气象站进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                this.addtype = val;
                this.ModelData()
                this.data.nickName = this.site[0].nickName
                this.data.concentratorSN = this.site[0].concentratorSN
                this.data.modelId = this.site[0].modelId
                this.data.location = this.site[0].location
                this.data.mark = this.site[0].mark
                this.data.serialNumber = this.site[0].serialNumber
                // this.value = ''
                $('#addModal').modal('show')
                $('#serialNumber').attr('disabled','disabled')
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //添加编辑保存
        addSubmit(){
            var that = this;
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            var url = '';
            var data = {};
            if(this.data.nickName==''||this.data.concentratorSN==''||this.data.modelId==''||this.data.serialNumber==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(result.test(this.data.concentratorSN)){
                that.$message({
                    message: '集中器标识不能有中文',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            data = this.data
            data.concentratorSN = data.concentratorSN.toUpperCase()
            if(this.addtype=='0'){url='/envSensors/addEnvSensors';}
            if(this.addtype=='1'){url='/envSensors/updateEnvSensors';data.id=this.site[0].id}
            data.projectId = sessionStorage.projectId
            if(this.site2.length==0){
                if(this.addtype=='0'){
                    data.poleId='0'
                }else{
                    data.poleId=that.site[0].poleId
                }
            }else{
                data.poleId = this.site2[0].id
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
                            message: '保存成功!',
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
        //删除气象站
        deletesensor(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择气象站进行删除!',
                    type: 'warning'
                });
                return;
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选气象站？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/envSensors/deleteEnvSensors',
                    data:{
                        ids:arr.join(',')
                    },
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
        sensorBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯杆进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            $('#sensorBindProjectModal').modal('show')
            this.project()
        },
        //请求所有项目接口
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getMyAllProject',
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
        //绑定项目提交
        Submit_sensorBindProject(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/envSensors/updateProjectBelong',
                data:{
                    ids:arr.join(','),
                    projectId:that.value5
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#sensorBindProjectModal').modal('hide')
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                },
            })
        },
        //关联灯杆
        //点击关联灯杆
        LampPole_data(){
            var that= this;
            $('#LampPole_data').modal('show')
            this.LampPoleData();
        },
        //查询所有灯杆数据
        LampPoleData(){
            var that = this;
            var data = {
                page:that.pageIndex,
                rows:that.pageSize,
                nickName:'',
                poleType:'',
                serialNumber:'',
                areaId:'',
                projectId:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/getPoleList',
                contentType:'application/json;charset=UTF-8',
                data:data, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                        if(that.addType=='0'){
                            var arr = []
                            for(let i = 0;i<that.site2.length;i++){
                                for(let j = 0;j<data.result.list.length;j++){
                                    if(that.site2[i].id==data.result.list[j].id){
                                        arr.push(data.result.list[j])
                                    }
                                }
                            }
                            setTimeout(function(){
                                arr.forEach(row => {
                                    that.$refs.multipleTable.toggleRowSelection(row);
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
            if(this.site2.length>=2){
                this.$message({
                    message: '只能关联一个灯杆!',
                    type: 'warning'
                });
                return;
            }
            $('#LampPole_data').modal('hide')
        },
        //获取气象站列表数据
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                poleId:'',
                projectId:sessionStorage.projectId,
                concentratorSN:that.concentratorSN,
                nickName:that.nickName,
                modelId:that.modelId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/envSensors/getAssociated',
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
        // 列表数据选中事件  进行编辑,删除操作
        SelectionChange(val){
            this.site = val;
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
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
                            if(data.result.operats[i].code=='addSensor'){
                                that.addSensor = true
                            }
                            if(data.result.operats[i].code=='editSensor'){
                                that.editSensor = true
                            }
                            if(data.result.operats[i].code=='delSensor'){
                                that.delSensor = true
                            }
                            if(data.result.operats[i].code=='relationPole'){
                                that.relationPole = true
                            }
                            if(data.result.operats[i].code=='sensorBindProject'){
                                that.sensorBindProject = true
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
        this.ready();   
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.sensor{width: 100%;height: 100%;}
.sensor>div{width: 100%;position: absolute;}
.sensor_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.sensor_top>button{height:33px;margin:8px 0 0 10px;}
.sensor_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.sensor_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.sensor_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}


.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}
.table_data{width: 100%;padding: 10px;}
.table_data>table{width:100%;}
.table_data>table tr{display: flex;}
.table_data>table tr>td{width: 25%;text-align: center;line-height: 25px !important;}

.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>