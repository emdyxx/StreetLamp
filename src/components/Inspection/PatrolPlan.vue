<template>
    <!-- 巡检计划 -->
    <div class="PatrolPlan">
        <div class="PatrolPlan_top">
            <el-button @click="PatrolPlan(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="PatrolPlan(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="PatrolPlan(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
        </div>
        <div class="PatrolPlan_bottom">
            <div class="PatrolPlan_bottom_top">
                <div class="search">
                    <label>用户名:</label>
                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                </div>
                <div class="search">
                    <label>姓名:</label>
                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                </div>
                <div class="search">
                    <label>电话:</label>
                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                </div>
                <div style="margin-left:15px;">
                    <el-button type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="PatrolPlan_bottom_bottom">
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
                    prop="username"
                    align='center'
                    label="计划编号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="fullName"
                    align='center'
                    label="计划名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userType"
                    align='center'
                    label="计划类型"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.userType=='0'">男</span>
                            <span v-if="scope.row.userType=='1'">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    align='center'
                    label="巡检路线"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
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
        <!-- 添加  编辑  模态框 -->
        <div class="modal fade" id="addPatrolPlan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>计划名称:</label>
                            <input type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入手机号码">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>巡检路线:</label>
                            <div>
                                <el-cascader
                                    :options="options"
                                    v-model="optionsValue"
                                    :props='optionspros'
                                    size='small'
                                    change-on-select>
                                </el-cascader>
                            </div>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>按顺序巡检:</label>
                            <el-radio-group v-model="radio">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="1">否</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>开始日期:</label>
                            <el-date-picker
                            size="small"
                            align="right"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>结束日期:</label>
                            <el-date-picker
                            size="small"
                            align="right"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>计划类型:</label>
                            <el-radio-group v-model="radio">
                                <el-radio :label="0">天</el-radio>
                                <el-radio :label="1">周</el-radio>
                                <el-radio :label="2">月</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>执行间隔(天):</label>
                            <input type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户序号">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>:</label>
                            <input type="password" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户序号">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>用户姓名:</label>
                            <input type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户姓名">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>性别:</label>
                            <el-radio-group v-model="radio">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                            </el-radio-group>
                        </div>
                        <!-- <div class="form-group">
                            <label><span class="Required">*</span>所属部门:</label>
                            <div>
                                <el-cascader
                                    :options="options"
                                    v-model="optionsValue"
                                    :props='optionspros'
                                    size='small'
                                    change-on-select>
                                </el-cascader>
                            </div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'PatrolPlan',
    data () {
        return {
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            radio:0,
            options:[],//所属机构
            optionsValue:[],
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
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
        //添加,编辑,删除用户
        PatrolPlan(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0'
                $('#addPatrolPlan').modal('show')
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
                $('#addPatrolPlan').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择用户进行删除!',
                        type: 'error'
                    });
                    return;
                }
            }
        },
    },
    created(){
        
    },
}
</script>
<style scoped> 
.block{text-align: center;}
.PatrolPlan{width: 100%;height: 100%;}
.PatrolPlan>div{width: 100%;position: absolute;}
.PatrolPlan_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.PatrolPlan_top>button{height:33px;margin:6px 0 0 10px;}
.PatrolPlan_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.PatrolPlan_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.PatrolPlan_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
</style>
