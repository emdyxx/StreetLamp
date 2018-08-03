<template>
    <div class="chargingpile">
        <!-- 灯具 -->
        <div class="chargingpile_top">
            <el-button v-if="addLanternsDeployment" @click="addchargingpile(0)" type="primary" icon='el-icon-plus' size='small'>添加灯具</el-button>
            <el-button v-if="editLanternsDeployment" @click="addchargingpile(1)" type="primary" icon="el-icon-edit" size='small'>编辑灯具</el-button>
            <el-button v-if="delLanternsDeployment" @click="deletechargingpile" type="primary" icon='el-icon-delete' size='small'>删除灯具</el-button>
        </div>
        <div class="chargingpile_bottom">
            <div class="chargingpile_bottom_top">
                <div class="search">
                    <label>单灯名称:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入单灯名称">
                </div>
                <div class="search">
                    <label>单灯序列号:</label>
                    <input type="text" v-model="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入序列号">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="chargingpile_bottom_bottom">
                <el-table
                    :data="tableData"
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
                    label="名称"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="终端ID"
                    :formatter="formatRole"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSN"
                    align='center'
                    label="控制器ID"
                    :formatter="formatRole"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="在线状态"
                    width="80">
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
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="lampNumber"
                    align='center'
                    label="编号"
                    :formatter="formatRole"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="poleName"
                    align='center'
                    label="所属灯杆"
                    :formatter="formatRole"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="location"
                    label="位置"
                    :formatter="formatRole"
                    align='center'
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="mark"
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
                            <label><span class="Required">*</span>终端ID:</label>
                            <input type="text" v-model="data.serialNumber" class="form-control" id="serialNumber" placeholder="请输入终端ID">
                            <label><span class="Required">*</span>控制器ID:</label>
                            <input type="text" v-model="data.concentratorSN" class="form-control" id="concentratorSN" placeholder="请输入控制器ID">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>名称:</label>
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
                                v-model="data.mark">
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
            addType:'0', //判断是添加还是编辑的参数
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50, 
            nickName:'',
            serialNumber:'',
            options:[],
            data:{
                serialNumber:'',
                concentratorSN:'',
                nickName:'',
                lampNumber:'',
                modelId:'',
                mark:'',//弹窗文本域
            },
            longitude:'',//经度
            latitude:'',//纬度
            tableData2:[],
            site2:[],
            pageSize2:10,
            pageIndex2:1,
            total2:10, 
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
                url:that.serverurl+'/model/getModel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    modelType:'1'
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
                this.addType = val
                this.ModelData()
                that.data.serialNumber = ''
                that.data.concentratorSN = ''
                that.data.nickName = ''
                that.data.mark = ''
                that.data.lampNumber = ''
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
                that.data.serialNumber = that.site[0].serialNumber
                that.data.concentratorSN = that.site[0].concentratorSN
                that.data.nickName = that.site[0].nickName
                that.data.lampNumber = that.site[0].lampNumber
                that.data.mark = that.site[0].mark
            }
        },
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
        //添加编辑保存
        addSubmit(){
            var that = this;
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            var url = ''
            if(this.data.serialNumber==''||this.data.concentratorSN==''||this.data.nickName==''||this.data.lampNumber==''){
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
            if(this.addType=='0'){url='/lamp/addLamp'}
            if(this.addType=='1'){url='/lamp/updateLamp';datas.id=this.site[0].id}
            datas.projectId=sessionStorage.projectId
            if(this.site2.length==''){
                datas.poleId=that.site[0].poleId
            }else{
                datas.poleId = this.site2[0].id
            }
            if(this.addType=='1'){datas.id=that.site[0].id}
            $.ajax({
                type:'post',
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
            this.$confirm('此操作将删除此灯具, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lamp/deleteLamp',
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
        //初始化列表
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                rows:that.pageSize,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                poleId:'',
                projectId:sessionStorage.projectId
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
                url:that.serverurl+'/privilege/getMyOperatMenu',
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addLanternsDeployment'){
                                that.addLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='editLanternsDeployment'){
                                that.editLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='delLanternsDeployment'){
                                that.delLanternsDeployment = true
                            }
                            if(data.result.operats[i].code=='relationPole'){
                                that.relationPole = true
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
<style lang='less' scoped>
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