<template>
    <!-- 检查项目 -->
    <div class="InspectionItems">
        <div class="InspectionItems_top">
            <el-button @click="operationInspectionItems(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="operationInspectionItems(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="operationInspectionItems(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
        </div>
        <div class="InspectionItems_bottom">
            <div class="InspectionItems_bottom_top">
                <div class="search">
                    <label>项目名称:</label>
                    <input v-model="patrolProjectName" type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入项目名称">
                </div>
                <!-- <div class="search">
                    <label>姓名:</label>
                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                </div>-->
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="InspectionItems_bottom_bottom">
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
                    prop="patrolProjectName"
                    align='center'
                    label="检查项目名称"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="createUser"
                    align='center'
                    label="创建人员"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="categoryName"
                    align='center'
                    label="所属分类"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="explain"
                    label="备注说明"
                    align='center'
                    min-width="180"
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
        <div class="modal fade" id="addInspectionItems" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:600px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加检查项目</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑检查项目</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:650px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>检查项目名称:</label>
                            <input v-model="data.patrolProjectName" type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入检查项目名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>所属分类目录:</label>
                            <div>
                                <el-cascader
                                    :options="options"
                                    v-model="data.categoryId"
                                    :props='optionspros'
                                    size='small'
                                    change-on-select>
                                </el-cascader>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>关联项目:</label>
                            <el-select size='small' v-model="data.projectId" placeholder="请选择">
                                <el-option
                                    v-for="item in options2"
                                    style="height:30px;"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label>检查项目说明:</label>
                            <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入内容"
                            v-model="data.explain">
                            </el-input>
                        </div>
                        <div style="width:100%;height:250px;border:1px solid #e4e4f1;position:relative;">
                            <div style="height:40px;border-bottom:1px solid #e4e4f1;line-height:40px;    text-align: center;font-size: 16px;">
                                巡检项
                            </div>
                            <div style="position:absolute;top:40px;left:0;right:0;bottom:0;padding:5px;">
                                <el-table
                                    :data="tableData2"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    @selection-change="SelectionChange2"
                                    style="width: 100%;overflow:auto;height:auto;max-height:160px;margin-bottom:5px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="itemName"
                                    align='center'
                                    label="检查项名称"
                                    min-width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="createUser"
                                    align='center'
                                    label="创建人员"
                                    min-width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="categoryName"
                                    align='center'
                                    label="归属类别"
                                    min-width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="createTime"
                                    label="创建时间"
                                    align='center'
                                    min-width="100"
                                    show-overflow-tooltip>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="InspectionItemSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'InspectionItems',
    data () {
        return {
            serverurl:localStorage.serverurl,
            patrolProjectName:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            options:[],//所属分类
            options2:[],//关联项目
            optionspros:{
                value: 'id',
                label:'categoryName',
                children: 'groups'
            },
            data:{
                patrolProjectName:'',
                categoryId:[],
                explain:'',
                projectId:'',
            },
            tableData2:[],
            site2:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
        }
    },
    mounted(){
        
    },
    methods:{
        clickRow(row){this.$refs.moviesTable.toggleRowSelection(row);},   
        //添加,编辑,删除用户
        operationInspectionItems(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0';
                $('#addInspectionItems').modal('show');
                that.classification()
                that.project()
                that.ready2()
                that.data.patrolProjectName = ''
                that.data.categoryId = []
                that.data.explain = ''
                that.data.projectId = ''
            }
            if(val=='1'){
                that.type = '1'
                if(that.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择单个用户进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                $('#addInspectionItems').modal('show')
                that.classification()
                that.project()
                that.ready2()
                that.data.patrolProjectName = that.site[0].patrolProjectName
                // that.data.categoryId = []
                that.data.explain = that.site[0].explain
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择巡检项目进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选选检项目？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/project/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            patrolProjects:arr
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
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        //添加,编辑 提交
        InspectionItemSubmit(){
            var that = this;
            if(that.data.patrolProjectName==''){
                that.$message({
                    message: '检查项目名称不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.data.categoryId.length==0){
                that.$message({
                    message: '检查项目分类不能为空!',
                    type: 'error'
                });
                return;
            }
            var type = ''
            var data = {}
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id = that.site[0].id;}
            length = that.data.categoryId.length - 1
            data.patrolProjectName = that.data.patrolProjectName
            data.categoryId = that.data.categoryId[length]
            data.projectId = that.data.projectId
            data.explain = that.data.explain
            data.itemIds = []
            for(var i = 0;i<that.site2.length;i++){
                data.itemIds.push(that.site2[i].id)
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#addInspectionItems').modal('hide')
                    }else{
                        that.errorCode3(data.errorCode)
                    }
                },
            })
        },
        //获取分类列表
        classification(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/category/tree',
                contentType:'application/json;charset=UTF-8',
                data:{
                    categoryId:'',
                    projectId:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result
                    }else{
                        that.errorCode3(data.errorCode)
                    }
                },
            })
        },
        //请求巡检项列表
        ready2(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/item',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    itemName:'',
                    categoryId:'',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode3(data.errorCode)
                    }
                },
            })
        },
        SelectionChange2(val){this.site2 = val;},
        sizechange2(val){this.pageSize=val;this.ready2();},
        currentchange2(val){this.pageIndex=val;this.ready2();},
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
                        that.options2 = data.result.projects
                        if(that.type=='1'){
                            that.data.projectId = that.site[0].projectId
                        }
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },

        //请求巡检项目列表
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/project',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    patrolProjectName:that.patrolProjectName,
                    categoryId:'',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode3(data.errorCode)
                    }
                },
            })
        },
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.ready();},
        currentchange(val){this.pageIndex=val;this.ready();},
        search(){this.ready()},
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
                            // if(data.result.operats[i].code=='addPatrolInspector'){
                            //     that.addPatrolInspector = true
                            // }
                            // if(data.result.operats[i].code=='editPatrolInspector'){
                            //     that.editPatrolInspector = true
                            // }
                            // if(data.result.operats[i].code=='delPatrolInspector'){
                            //     that.delPatrolInspector = true
                            // }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created(){
        this.Jurisdiction();
        this.ready();
    },
}
</script>
<style scoped>
.block{text-align: center;}
.InspectionItems{width: 100%;height: 100%;}
.InspectionItems>div{width: 100%;position: absolute;}
.InspectionItems_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.InspectionItems_top>button{height:33px;margin:6px 0 0 10px;}
.InspectionItems_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.InspectionItems_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.InspectionItems_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 70px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: right;}
.form-group>input{width: 216px;}
.form-group>div{width: 216px;display: flex;justify-content: center;align-items: center;}
</style>