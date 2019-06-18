<template>
    <!-- APP升级页面 -->
    <div class="AppUpgrade">
        <div class="AppUpgrade_top">
            <el-button @click="operation(0)" v-if="addPatrolApp" type="primary" icon='el-icon-plus' size='small'>添加升级包</el-button>
            <el-button @click="operation(1)" v-if="delPatrolApp" type="primary" icon='el-icon-delete' size='small'>删除升级包</el-button>
        </div>
        <div class="AppUpgrade_bottom">
            <div class="AppUpgrade_bottom_bottom">
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
                    prop="fileName"
                    align='center'
                    label="升级包名称"
                    min-width="200">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    align='center'
                    label="是否强制升级"
                    min-width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.mandatory=='0'">否</span>
                            <span v-if="scope.row.mandatory=='1'">是</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                    prop="createUser"
                    align='center'
                    label="上传人员"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="updateDesc"
                    align='center'
                    label="升级描述"
                    min-width="220">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    align='center'
                    label="备注信息"
                    :formatter="formatRole"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="上传时间"
                    :formatter="formatRole"
                    align='center'
                    min-width="160"
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
        <!-- 添加  编辑用户  模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加升级包</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>升级包:</label>
                            <input type="file" ref="upgradeFile" id="upgradeFile">
                        </div>
                        <div class="form-group">
                            <label>强制升级:</label>
                            <el-radio-group v-model="mandatory">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="form-group">
                            <label>升级描述:</label>
                            <input v-model="updateDesc" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入升级描述">
                        </div>
                        <div class="form-group">
                            <label>备注信息:</label>
                            <input v-model="remark" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入备注信息">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="Submit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'AppUpgrade',
    data () {
        return {
            addPatrolApp:false,
            delPatrolApp:false,
            serverurl:localStorage.serverurl,
            tableData:[],
            pageIndex:1,
            site:[],
            total:10,
            pageSize:10,
            mandatory:1,
            updateDesc:'',
            remark:'',
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
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                projectIds:sessionStorage.projectId,
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/upgrade',
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
        sizechange(val){this.pageSize=val;this.ready();},
        currentchange(val){this.pageIndex=val;this.ready();},
        search(){this.ready()}, 
        //添加,删除
        operation(val){
            var that = this;
            if(val=='0'){
                var file = document.getElementById('upgradeFile');
                file.value = '';
                this.mandatory = 1
                this.updateDesc = ''
                this.remark = ''
                $('#myModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length=='0'||this.site.length>='2'){
                    this.$message({
                        message: '请选择单个升级包进行删除!',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('是否删除所选升级包?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 这里进行删除请求
                    $.ajax({
                        type:'delete',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/upgrade/'+that.site[0].id,
                        data:{},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
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
            }
        },
        //上传升级包
        Submit(){
            var that = this;
            var formdate = new FormData();
            formdate.append("upgradeFile ", this.$refs.upgradeFile.files[0])
            formdate.append("mandatory", this.mandatory)
            formdate.append("updateDesc", this.updateDesc)
            formdate.append("remark", this.remark)
            formdate.append("projectId", sessionStorage.projectId)
            $.ajax({
                url:that.serverurl+'/v1/solin/patrol/upgrade',
                type:'post',
                cache:false,
                data:formdate,
                dataType:'json',
                processData: false,
                contentType: false
            }).done(function(data){
                if(data.errorCode=='0'){
                    that.$message({
                        message: '上传成功',
                        type:'success',
                        showClose: true,
                    });
                    that.ready()
                    $('#myModal').modal('hide')
                }else{
                    that.errorCode(data)
                }
            })
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
                            if(data.result.operats[i].code=='addPatrolApp'){
                                that.addPatrolApp = true
                            }
                            if(data.result.operats[i].code=='delPatrolApp'){
                                that.delPatrolApp = true
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
        this.Jurisdiction(0)
        this.ready()
    },
}
</script>
<style scoped>
.block{text-align: center;}
.AppUpgrade{width: 100%;height: 100%;}
.AppUpgrade>div{width: 100%;position: absolute;}
.AppUpgrade_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.AppUpgrade_top>button{height:33px;margin:6px 0 0 10px;}
.AppUpgrade_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.AppUpgrade_bottom_bottom{position: absolute;top:3px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 80px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
</style>