<template>
  <div class="organization">
    <!-- 机构 -->
    <div class="organization_left">
      <div id="jstree"></div>
    </div>
    <div class="organization_right">
      <div class="organization_right_top">
        <el-button @click="addorganization(0)" type="primary" icon='el-icon-plus' size='small'>添加机构</el-button>
        <el-button @click="addorganization(1)" type="primary" icon="el-icon-edit" size='small'>编辑机构</el-button>
        <el-button @click="deleteorganization" type="primary" icon='el-icon-delete' size='small'>删除机构</el-button>
      </div>
      <div class="organization_right_bottom">
        <div class="organization_big" v-if="sizeType=='1'">
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
                label="机构名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="联系人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="电话"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="邮箱"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="地址"
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
        <div class="organization_little" v-if="sizeType=='2'">
            <table>
                <tbody>
                    <tr>
                        <td colspan="2" style="text-align:center;font-size:18px;">机构名称:<i>{{tableData[0].name}}</i></td>
                    </tr>
                    <tr>
                        <td>联系人:<i>{{tableData[0].name}}</i></td>
                        <td>电话:<i>{{tableData[0].name}}</i></td>
                    </tr>
                    <tr>
                        <td>邮箱:<i>{{tableData[0].name}}</i></td>
                        <td>创建时间:<i>{{tableData[0].name}}</i></td>
                    </tr>
                    <tr>
                        <td colspan="2">地址:<i>{{tableData[0].name}}</i></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
    <!--添加编辑模态框-->
    <div class="modal fade" id="addorganizations" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加机构</h4>
                    <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑机构</h4>
                </div>
                <div class="modal-body">
                    <el-tabs tab-position="left">
                        <el-tab-pane label="用户">
                            <div class="form-group">
                                <label for="name">机构名称:</label>
                                <input type="text" class="form-control" id="name" placeholder="请输入名称">
                            </div> 
                            <div class="form-group">
                                <label for="username">管理员账号:</label>
                                <input type="text" class="form-control" id="username" placeholder="请输入名称">
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
                                <label for="name2">联系人:</label>
                                <input type="text" class="form-control" id="name2" placeholder="请输入名称">
                            </div> 
                            <div class="form-group">
                                <label for="phone">手机号:</label>
                                <input type="text" class="form-control" id="phone" placeholder="请输入名称">
                            </div> 
                            <div class="form-group">
                                <label for="email">邮箱:</label>
                                <input type="email" class="form-control" id="email" placeholder="请输入名称">
                            </div> 
                            <div class="form-group">
                                <label for="address">地址:</label>
                                <input type="text" class="form-control" id="address" placeholder="请输入名称">
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
        </div><!-- /.modal -->
        
    </div>
    <!-- 添加项目模态框 -->
    <div class="modal fade" id="addproject" tabindex="-1" role="dialog" aria-labelledby="addproject" aria-hidden="true">
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
            sizeType:'1', //数据显示列表还是普通表格类型
            site:[],
            type:'',//添加编辑类型
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
                                  "icon" : "jstree-file",
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
        //   console.log(data.node.id);
        if(data.node.id=='1'){
            that.sizeType = '1'
        }else{
            that.sizeType = '2'
        }
      });
    },
    methods:{
        // 用户选中(进行修改,删除操作)
        userSelectionChange(val){
            this.site = val
        },
        // 添加编辑机构
        addorganization(val){
            // 0位添加 1为删除
            $('#addorganizations').modal('show')
            this.type = val
            if(val=='0'){}
            if(val=='1'){}
        },
        // 项目栏目  添加项目按钮
        addproject(){
            $('#addproject').modal('show')
        },
        //删除项目
        deleteorganization(){
            if(this.site.length=='0'||this.site.length>='2'){
                this.$message({
                    message: '请选择一个机构进行删除!',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('此操作将删除此机构, 是否继续?', '提示', {
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
.organization{width: 100%;height: 100%;padding: 5px;}
.organization_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.organization_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
.organization_right>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.organization_right_top{height: 46px;border-bottom: none !important;display: flex;}
.organization_right_top>button{height:33px;margin:8px 0 0 10px;}
.organization_right_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.organization_little{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;}
.organization_little>table{box-shadow: 0 0 3px gray;border-radius: 8px;}
.organization_little>table tr{width: 500px;}
.organization_little>table tr>td{width: 250px;height:50px;font-size: 18px;padding-left: 5px;font-weight: 600;}
.organization_little>table tr>td>i{font-size: 14px;color: #606266;}
.block{text-align: center;}


.form-group{display:flex;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
</style>