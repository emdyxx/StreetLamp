<template>
    <!-- 巡检类别 -->
    <div class="category">
        <div class="category_top">
            <el-button v-if="addPatrolCategory" @click="operationCategory(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editPatrolCategory" @click="operationCategory(1)" type="primary" icon='el-icon-edit' size='small'>编辑</el-button>
            <el-button v-if="delPatrolCategory" @click="operationCategory(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
        </div>
        <div class="category_bottom">
            <div class="category_bottom_bottom">
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
                    prop="categoryName"
                    align='center'
                    label="分类名称"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createUser"
                    align='center'
                    label="创建人员"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="level"
                    align='center'
                    label="等级"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    prop="createUser"
                    align='center'
                    label="归属类别"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
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
        <!-- 添加  编辑  模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>分类名称:</label>
                            <input v-model="data.categoryName" type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入分类名称">
                        </div>
                        <div class="form-group">
                            <label>归属分类:</label>
                            <el-cascader
                                :options="options"
                                size='small'
                                v-model="data.parentId"
                                change-on-select
                                :props="props"
                                style='width:156px;'>
                            </el-cascader>
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="categorySubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'UserSettings',
    data () {
        return {
            serverurl:localStorage.serverurl,
            addPatrolCategory:false,
            editPatrolCategory:false,
            delPatrolCategory:false,
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            data:{
                categoryName:'',
                parentId:[],
                projectId:'',
            },
            options:[],
            props:{
                value: 'id',
                label:'categoryName',
                children: 'groups'
            },
            options2:[],
        }
    },
    mounted(){
        
    },
    methods:{
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        //点击添加,编辑,删除
        operationCategory(val){
            var that = this
            if(val=='0'){
                that.type = '0'
                that.classification()
                that.project()
                $('#myModal').modal('show')
                that.data.categoryName = ''
                that.data.parentId = []
                that.data.projectId = ''
            }
            if(val=='1'){
                if(that.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择单个类别进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.type = '1'
                that.classification()
                that.project()
                $('#myModal').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择类别进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选类别？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/category/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            categorys:arr
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
        //添加编辑保存
        categorySubmit(){
            var that = this;
            if(that.data.categoryName==''){
                that.$message({
                    message: '分类名称不能为空!',
                    type: 'error'
                });
                return;
            }
            var type = '';
            var data = {}
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id = that.site[0].id;}
            length = that.data.parentId.length - 1
            data.categoryName = that.data.categoryName
            data.parentId = that.data.parentId[length]
            data.projectId = that.data.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/category',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#myModal').modal('hide')
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
        //请求类别列表
        ready(){
            
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
                            if(data.result.operats[i].code=='addPatrolCategory'){
                                that.addPatrolCategory = true
                            }
                            if(data.result.operats[i].code=='editPatrolCategory'){
                                that.editPatrolCategory = true
                            }
                            if(data.result.operats[i].code=='delPatrolCategory'){
                                that.delPatrolCategory = true
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
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.category{width: 100%;height: 100%;}
.category>div{width: 100%;position: absolute;}
.category_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.category_top>button{height:33px;margin:6px 0 0 10px;}
.category_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
/* .category_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;} */
.category_bottom_bottom{position: absolute;top:5px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.block{text-align: center;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
</style>
