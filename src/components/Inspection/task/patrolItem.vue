<template>
    <!-- 巡检项 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;巡检管理>巡检项</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewPatrolItem">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';types='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='分类';types='2';">分类</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <el-input v-model="itemName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="types=='2'">
                            <el-select v-model='categoryId' clearable size='small' style="width:176px;" placeholder="请选择分类">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.categoryName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div>
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="section_bottom_right">
                    <el-button v-if="JurisdictionS.addPatrolItem" @click="operationPatrolItem(0)" type="primary" plain icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button v-if="JurisdictionS.editPatrolItem" @click="operationPatrolItem(1)" type="primary" plain icon='el-icon-edit' size='small'>编辑</el-button>
                    <el-button v-if="JurisdictionS.delPatrolItem" @click="operationPatrolItem(2)" type="primary" plain icon='el-icon-delete' size='small'>删除</el-button>
                    <el-button v-if="JurisdictionS.patrolCategoryManagement" @click="operationPatrolItem(3)" type="primary" plain icon='el-icon-setting' size='small'>分类管理</el-button>
                </div>
            </div>
            <div class="patrolItem_bottom_bottom">
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
                        prop="itemName"
                        show-overflow-tooltip
                        label="检查项名称"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="createUser"
                        show-overflow-tooltip
                        label="创建人员"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="categoryName"
                        show-overflow-tooltip
                        label="归属类别"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="创建时间"
                        min-width="180"
                        show-overflow-tooltip>
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
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>检查项名称:</label>
                            <input v-model="data.itemName" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入检查项名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>归属分类:</label>
                            <el-select v-model='data.categoryId' clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.categoryName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="patrolItemSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 分类管理模态框 -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">分类管理</h4>
                    <div class="modal-body">
                    </div>
                        <el-button @click="Classification(0)" type="primary" icon='el-icon-plus' size='small'>添加分类</el-button>
                        <el-button @click="Classification(1)" type="primary" icon='el-icon-delete' size='small'>删除分类</el-button>
                        <div v-if="type2=='1'" style="margin-top:10px;">
                            <span>分类名称:</span>
                            <el-input v-model="categoryName" size="small" style="width:156px;" placeholder="请输入分类名称"></el-input>
                            <el-button @click="ClassificationSubmit" type="primary" size='small'>保存</el-button>
                            <el-button @click="Classification(2)" type="primary" size='small'>关闭</el-button>
                        </div>
                        <el-table
                            :data="tableData2"
                            @row-click="clickRow2" 
                            ref="moviesTable2"
                            border
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange2"
                            style="width: 100%;margin-top:10px;">
                            <el-table-column
                            align="center"
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="categoryName"
                            show-overflow-tooltip
                            label="分类名称"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            label="创建时间"
                            min-width="180"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
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
            name:'名称',
            types:'1',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewPatrolItem:false,//查看巡检项信息
                addPatrolItem:false,//添加巡检项
                editPatrolItem:false,//编辑巡检项
                delPatrolItem:false,//删除巡检项
                patrolCategoryManagement:false,//分类管理
            },
            itemName:'',
            options:[],
            categoryId:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            data:{
                itemName:'',
                categoryId:'',
            },
            //分类管理
            categoryName:'',
            tableData2:[],
            site2:[],
            type2:'0',
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.itemName=''
            this.categoryId=''
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.moviesTable2.toggleRowSelection(row)
        },
        //点击添加,编辑,删除,分类管理
        operationPatrolItem(val){
            var that = this
            if(val=='0'){
                that.type = '0'
                $('#myModal').modal('show')
                that.data.itemName = ''
                that.data.categoryId = ''
            }
            if(val=='1'){
                if(that.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择单个巡检项进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.type = '1'
                $('#myModal').modal('show')
                that.data.itemName = that.site[0].itemName
                that.data.categoryId = that.site[0].categoryId
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
                        url:that.serverurl+'/v1/solin/patrol/item/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            items:arr
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
            if(val=='3'){
                that.type2 = '0'
                that.classification()
                $('#myModal2').modal('show')
            }
        },
        //添加  编辑 保存
        patrolItemSubmit(){
            var that = this;
            if(that.data.itemName==''){
                that.$message({
                    message: '检查项名称不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.data.categoryId==''){
                that.$message({
                    message: '归属分类不能为空!',
                    type: 'error'
                });
                return;
            }
            var type = '';
            var data = {}
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id = that.site[0].id;}
            data.itemName = that.data.itemName
            data.categoryId = that.data.categoryId
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/item',
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
                        that.errorCode(data)
                    }
                },
            })
        },
        //添加,删除,分类
        Classification(val){
            var that = this
            if(val=='0'){
                this.type2='1'
            }
            if(val=='1'){
                if(that.site2.length==0){
                    that.$message({
                        message: '请选择要删除的分类!',
                        type: 'error'
                    });
                    return;
                }
                that.$confirm('是否删除所选分类？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = []
                    for(var i = 0;i<that.site2.length;i++){
                        arr.push(that.site2[i].id)
                    }
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
                                that.classification()
                            }else{
                                that.errorCode(data)
                            }
                        },
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
            if(val=='2'){
                this.type2='0'
            }
        },
        //添加分类保存
        ClassificationSubmit(){
            var that = this;
            if(that.categoryName==''){
                that.$message({
                    message: '分类名称不能为空!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            data.categoryName = that.categoryName
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:'post',
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
                        that.classification()
                    }else{
                        that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/patrol/category',
                contentType:'application/json;charset=UTF-8',
                data:{
                    categoryName:'',
                    projectIds:sessionStorage.projectId,
                    page:1,
                    size:100,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.list
                        that.tableData2 = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        SelectionChange2(val){this.site2 = val;},
        //请求巡检项列表
        ready(){
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
                    itemName:that.itemName,
                    categoryId:that.categoryId,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
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
                url:that.serverurl+'/v1/manage/operat/'+39,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewPatrolItem'){
                                that.JurisdictionS.viewPatrolItem = true
                            }
                            if(data.result.operats[i].code=='addPatrolItem'){
                                that.JurisdictionS.addPatrolItem = true
                            }
                            if(data.result.operats[i].code=='editPatrolItem'){
                                that.JurisdictionS.editPatrolItem = true
                            }
                            if(data.result.operats[i].code=='delPatrolItem'){
                                that.JurisdictionS.delPatrolItem = true
                            }
                            if(data.result.operats[i].code=='patrolCategoryManagement'){
                                that.JurisdictionS.patrolCategoryManagement = true
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
        this.classification()
        this.ready()
    }
}
</script>
<style scoped>
.form-group>label{width: 95px;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
</style>