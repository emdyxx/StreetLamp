<template>
    <div class="Record">
        <div class="Record_top">
            <el-button @click="Record(0)" type="primary" icon='el-icon-plus' size='small'>查看明细</el-button>
            <el-button @click="Record(1)" type="primary" icon="el-icon-edit" size='small'>删除记录</el-button>
        </div>
        <div class="Record_bottom">
            <div class="Record_bottom_top">
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
            <div class="Record_bottom_bottom">
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
                    label="点名称"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="fullName"
                    align='center'
                    label="点编号"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userType"
                    align='center'
                    label="巡检人员"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.userType=='0'">男</span>
                            <span v-if="scope.row.userType=='1'">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    align='center'
                    label="巡检时间"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="上报时间"
                    min-width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.org.orgName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="执行情况"
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
        <!-- 查看明细 模态框 -->
        <div class="modal fade" id="Record" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">查看明细</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <table class="table table-bordered Record_table" style='text-align:center;'>
                            <tbody>
                                <tr>
                                    <td>巡检人员</td>
                                    <td></td>
                                    <td>所属部门</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>巡检时间</td>
                                    <td></td>
                                    <td>巡检路线</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>点编号</td>
                                    <td></td>
                                    <td>点名称</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>点类型</td>
                                    <td></td>
                                    <td>巡检模式</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>分类目录</td>
                                    <td></td>
                                    <td>完成状态</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>计划名称</td>
                                    <td></td>
                                    <td>任务编号</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>是否合格</td>
                                    <td></td>
                                    <td>检查评分</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>检查项目</td>
                                    <td colspan='3'>
                                        <table class="table table-bordered" style='text-align:center;'>
                                             <thead>
                                                <tr>
                                                    <th style='text-align:center;'>项目名称</th>
                                                    <th style='text-align:center;'>检查结果</th>
                                                    <th style='text-align:center;'>是否合格</th>
                                                    <th style='text-align:center;'>评分</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>3</td>
                                                    <td>4</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>现场照片</td>
                                    <td colspan='3'></td>
                                </tr>
                            </tbody>
                        </table>
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
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
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
        Record(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                // if(that.site.length==0||that.site.length>1){
                //     that.$message({
                //         message: '请选择单个用户进行查看!',
                //         type: 'error'
                //     });
                //     return;
                // }
                $('#Record').modal('show')
            }
            if(val=='1'){
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
.Record{width: 100%;height: 100%;}
.Record>div{width: 100%;position: absolute;}
.Record_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.Record_top>button{height:33px;margin:6px 0 0 10px;}
.Record_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
.Record_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.Record_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Record_table tr>td:nth-of-type(1),.Record_table tr>td:nth-of-type(3){width:80px;}

</style>
