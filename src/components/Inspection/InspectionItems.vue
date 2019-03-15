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
            <div class="InspectionItems_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    align='center'
                    label=" 编号"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="orgName"
                    align='center'
                    label="检查项目名称"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="检查项目类型"
                    min-width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatModule=='0'">用户</span>
                            <span v-if="scope.row.operatModule=='1'">机构</span>
                            <span v-if="scope.row.operatModule=='2'">项目</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="是否必填"
                    min-width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatType=='0'">添加</span>
                            <span v-if="scope.row.operatType=='1'">编辑</span>
                            <span v-if="scope.row.operatType=='2'">删除</span>
                            <span v-if="scope.row.operatType=='3'">启用/禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="默认值"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="是否评分"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="分类目录"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="content"
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
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加用户</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑用户</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>检查项目名称:</label>
                            <input type="text" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入检查项目名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>所属分类目录:</label>
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
                            <label><span class="Required">*</span>检查项目说明:</label>
                            <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                        </div>
                        <div style="width:100%;height:200px;border:1px solid #e4e4f1;position:relative;">
                            <div style="height:40px;border-bottom:1px solid #e4e4f1;line-height:40px;">
                                <el-button type="primary" icon='el-icon-plus' size='mini'>添加</el-button>
                                <el-button type="primary" icon='el-icon-delete' size='mini'>删除</el-button>
                                <el-button type="primary" icon='el-icon-sort-up' size='mini'>上移</el-button>
                                <el-button type="primary" icon='el-icon-sort-down' size='mini'>下移</el-button>
                            </div>
                            <div style="position:absolute;top:40px;left:0;right:0;bottom:0;">
                                <el-table
                                    :data="tableData"
                                    ref="moviesTable"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="username"
                                    align='center'
                                    label="选项名称"
                                    min-width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="orgName"
                                    align='center'
                                    label="选中评分"
                                    min-width="80">
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="选中是否合格"
                                    min-width="100">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.operatModule=='0'">用户</span>
                                            <span v-if="scope.row.operatModule=='1'">机构</span>
                                            <span v-if="scope.row.operatModule=='2'">项目</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="是否默认选中"
                                    min-width="100"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.operatType=='0'">添加</span>
                                            <span v-if="scope.row.operatType=='1'">编辑</span>
                                            <span v-if="scope.row.operatType=='2'">删除</span>
                                            <span v-if="scope.row.operatType=='3'">启用/禁用</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
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
    name: 'InspectionItems',
    data () {
        return {
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            options:[],//所属机构
            optionsValue:[],
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
            textarea:'',
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
        operationInspectionItems(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0'
                $('#addInspectionItems').modal('show')
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
.InspectionItems{width: 100%;height: 100%;}
.InspectionItems>div{width: 100%;position: absolute;}
.InspectionItems_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.InspectionItems_top>button{height:33px;margin:6px 0 0 10px;}
.InspectionItems_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.InspectionItems_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.InspectionItems_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: right;}
.form-group>input{width: 216px;}
.form-group>div{width: 216px;display: flex;justify-content: center;align-items: center;}
</style>