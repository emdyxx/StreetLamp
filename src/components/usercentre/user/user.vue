<template>
    <div class="user">
        <!-- 用户 -->
        <div class="user-left">
            <div id="jstree"></div>
        </div>
        <div class="user-right">
            <div class="usermanage">
                <!-- 用户详细信息 -->
                <div class="usermanage_top">
                    <el-button @click="adduser(0)" type="primary" icon='el-icon-plus' size='small'>添加用户</el-button>
                    <el-button @click="adduser(1)" type="primary" icon="el-icon-edit" size='small'>编辑用户</el-button>
                    <el-button @click="deleteuser" type="primary" icon='el-icon-delete' size='small'>删除用户</el-button>
                </div>
                <div class="usermanage_bottom">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        @selection-change="userSelectionChange"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="机构"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="用户名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="部门岗位"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="手机号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        align='center'
                        label="邮箱"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="创建时间"
                        align='center'
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        background
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加  修改  用户 -->
        <div class="modal fade" id="addedituser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加用户</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑用户</h4>
                    </div>
                    <div class="modal-body">
                        <el-tabs tab-position="left">
                            <el-tab-pane label="用户">
                                <div class="form-group">
                                    <label for="name">用户名:</label>
                                    <input type="text" class="form-control" id="name" placeholder="请输入名称">
                                </div> 
                                <div class="form-group">
                                    <label for="password">密码:</label>
                                    <input type="password" class="form-control" id="password" placeholder="请输入名称">
                                </div> 
                                <div class="form-group">
                                    <label for="password2">确认密码:</label>
                                    <input type="password" class="form-control" id="password2" placeholder="请输入名称">
                                </div> 
                                <div class="form-group">
                                    <label for="phone">手机号:</label>
                                    <input type="text" class="form-control" id="phone" placeholder="请输入名称">
                                </div> 
                                <div class="form-group">
                                    <label for="email">邮箱:</label>
                                    <input type="text" class="form-control" id="email" placeholder="请输入名称">
                                </div> 
                            </el-tab-pane>
                            <el-tab-pane label="项目">
                                <div class="model_top">
                                    <el-button @click="addproject" size='small' icon='el-icon-plus' type="primary">添加项目</el-button>
                                    <el-button size='small' icon='el-icon-delete' type="primary">删除项目</el-button>
                                </div>
                                <div class="model_bottom" style="padding:5px;">
                                    <el-table
                                        :data="tableDatatwo"
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
                                        prop="name"
                                        align='center'
                                        label="项目名称"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="date"
                                        label="备注"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="权限">
                                <div id="jstreetwo"></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 添加项目模态框 -->
        <div class="modal fade" id="addproject" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加项目</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableDatatwo"
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
                            prop="name"
                            align='center'
                            label="项目名称"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="备注"
                            align='center'
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
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
    name: 'user',
    data () {
        return {
            site:[],
            type:'0',//添加编辑判断
            tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            pageSize:10,
            pageIndex:1,
            total:50,
            ruleForm: {
                username: '',
                userPwd: '',
                userPwd2: '',
                mobile: '',
                email: '',
            },
            tableDatatwo:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted(){
        var that = this
        $(function () {
            $('#jstree').jstree({
                'core' : {
                    'data' : [
                        {
                            "text" : "用户中心",
                            id:'1',
                            "state" : { "opened" : true },
                            "children" : [
                                {
                                    "text" : "快越科技",
                                    "icon" : 'jstree-file',
                                    id:'2',
                                },
                                { 
                                    "text" : "龙泉公安",
                                    "icon" : "jstree-file",
                                    id:'3',
                                }
                            ]
                        }
                    ]
                }
            }); 
        });
        $(function () {
            $('#jstreetwo').jstree({
                'plugins':["wholerow","checkbox"],
                'core' : {
                    'data' : [
                        {
                            "text" : "用户中心",
                            id:'1',
                            "state" : { "opened" : true },
                            "children" : [
                                {
                                    "text" : "快越科技",
                                    "icon" : 'jstree-file',
                                    id:'2',
                                },
                                { 
                                    "text" : "龙泉公安",
                                    "icon" : "jstree-file",
                                    id:'3',
                                }
                            ]
                        }
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            // console.log(data.node.id);
        });
    },
    methods:{
        // 用户选中(进行修改,删除操作)
        userSelectionChange(val){
            this.site = val;
        },
        // 添加修改用户
        adduser(val){
            // val为0是添加  1为修改
            this.type = val
            if(val=='0'){}
            if(val=='1'){}
            $('#addedituser').modal('show')
        },
        // 项目栏目  添加项目按钮
        addproject(){
            $('#addproject').modal('show')
        },
        //删除用户
        deleteuser(){
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个用户进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 这里进行删除请求
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    },
    created(){
        
    },
}
</script>
<style lang='less' scoped>
.user{width:100%;height: 100%;padding: 5px;display: flex;}
.user-left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.user-left>ul{background:#eef1f6;}
.user-right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.usermanage{width:100%;height:100%;}
.usermanage>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.usermanage_top{height: 46px;border-bottom: none !important;display: flex;}
.usermanage_top>button{height:33px;margin:8px 0 0 10px;}
.usermanage_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.block{text-align: center;}


.form-group{display:flex;}
.form-group>label{width: 60px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
</style>
