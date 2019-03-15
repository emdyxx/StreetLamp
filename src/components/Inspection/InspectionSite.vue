<template>
    <!-- 巡检地点 -->
    <div class="InspectionSite">
        <div class="InspectionSite_top">
            <el-button @click="addInspectionSite(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="addInspectionSite(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="addInspectionSite(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <el-button type="primary" icon='el-icon-tickets' size='small'>巡检记录</el-button>
        </div>
        <div class="InspectionSite_bottom">
            <div class="InspectionSite_bottom_top">
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
            <div class="InspectionSite_bottom_bottom">
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
                    label="点编号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="fullName"
                    align='center'
                    label="点名称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userType"
                    align='center'
                    label="点状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.userType=='0'">男</span>
                            <span v-if="scope.row.userType=='1'">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    align='center'
                    label="固定地点"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    prop="userType"
                    align='center'
                    label="拍照数量"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="userType"
                    align='center'
                    label="巡检路线"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="检查项目"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="分类目录"
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
        <div class="modal fade" id="addInspectionSite" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加巡检地点</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑巡检地点</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <ul id="myTab" class="nav nav-tabs">
                            <li class="active">
                                <a href="#a" data-toggle="tab">基本信息</a>
                            </li>
                            <li>
                                <a href="#b" data-toggle="tab">检查项目</a>
                            </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade in active" id="a" style='margin-top:10px;'>
                                <div class="form-group">
                                    <label><span class="Required">*</span>点编号:</label>
                                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入点编号">
                                </div>
                                <div class="form-group">
                                    <label><span class="Required">*</span>点名称:</label>
                                    <input type="password" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入点名称">
                                </div>
                                <div class="form-group">
                                    <label for="phone">点状态:</label>
                                    <el-radio-group v-model="radio">
                                        <el-radio :label="0">正常</el-radio>
                                        <el-radio :label="1">处理中</el-radio>
                                        <el-radio :label="2">异常</el-radio>
                                    </el-radio-group>
                                </div> 
                                <div class="form-group">
                                    <label for="phone">点类型:</label>
                                    <el-radio-group v-model="radio">
                                        <el-radio :label="0">固定点</el-radio>
                                        <el-radio :label="1">移动点</el-radio>
                                    </el-radio-group>
                                </div> 
                                <div class="form-group">
                                    <label>参考位置:</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label><span class="Required">*</span>最少拍照数量:</label>
                                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label><span class="Required">*</span>最多拍照数量:</label>
                                    <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label><span class="Required">*</span>巡检路线:</label>
                                    <el-cascader
                                        :options="options1"
                                        v-model="options1Value"
                                        :props='optionspros'
                                        size='small'
                                        change-on-select>
                                    </el-cascader>
                                </div> 
                                <div class="form-group">
                                    <label><span class="Required">*</span>所属分类目录:</label>
                                    <el-cascader
                                        :options="options1"
                                        v-model="options1Value"
                                        :props='optionspros'
                                        size='small'
                                        change-on-select>
                                    </el-cascader>
                                </div> 
                            </div>
                            <div class="tab-pane fade" id="b">
                                <div class="model_bottom" style="padding:5px;">
                                    <el-select v-model="value4" size='small' clearable placeholder="请选择检查项目">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" size='small' icon="el-icon-plus" style="margin-bottom:5px;">添加</el-button>
                                    <el-table
                                        :data="tableData"
                                        ref='multipleTable' 
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
                                        prop="projectName"
                                        align='center'
                                        label="名称"
                                        min-width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="principal"
                                        align='center'
                                        label="类型"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="principal"
                                        align='center'
                                        label="必填"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="principal"
                                        label="评分"
                                        min-width="80"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
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
    name: 'InspectionSite',
    data () {
        return {
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            options1:[],//所属机构
            options1Value:[],
            radio:0,
            optionspros:{
                value: 'id',
                label:'text',
                children: 'children'
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value4: ''
        }
    },
    mounted(){
        
    },
    methods:{
        clickRow(row){this.$refs.moviesTable.toggleRowSelection(row)},   
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        // 添加  编辑  删除巡检地点
        addInspectionSite(val){
            var that = this;
            if(val=='0'){
                that.type = '0'
                $('#addInspectionSite').modal('show')
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
                $('#addInspectionSite').modal('show')
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
.InspectionSite{width: 100%;height: 100%;}
.InspectionSite>div{width: 100%;position: absolute;}
.InspectionSite_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.InspectionSite_top>button{height:33px;margin:6px 0 0 10px;}
.InspectionSite_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.InspectionSite_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.InspectionSite_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 105px;line-height: 34px;text-align: center;}
.form-group>input{width: 216px;}
.form-group>div{width: 216px;display: flex;justify-content: center;align-items: center;}
</style>
