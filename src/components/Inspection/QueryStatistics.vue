<template>
    <!-- 查询统计 -->
    <div class="QueryStatistics">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="巡检情况统计分析" name='0'>
                <div class="QueryStatistics_top">
                    <div>
                        <span>用户名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                    </div>
                    <div>
                        <span>姓名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                    </div>
                    <div>
                        <span>电话:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                    </div>
                    <div style="margin-left:15px;">
                        <el-button type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="QueryStatistics_bottom">
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
                        label="项目名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="实际巡检次数"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="计划巡检次数"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="计划完成次数"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="漏检次数"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="漏检率"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="不合格数"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="不合格率%"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="评分"
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
            </el-tab-pane>
            <el-tab-pane label="巡检完成情况月报表" name='1'>
                <div class="QueryStatistics_top">
                    <div>
                        <span>用户名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                    </div>
                    <div>
                        <span>姓名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                    </div>
                    <div>
                        <span>电话:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                    </div>
                    <div style="margin-left:15px;">
                        <el-button type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="QueryStatistics_bottom">
                    <el-table
                    :data="tableData2"
                    ref="moviesTable"
                    show-summary
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        prop="date"
                        label="项目名称"
                        align='center'
                        width="150">
                        </el-table-column>
                            <el-table-column label="1月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                align='center'
                                min-width=45>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                align='center'
                                min-width=45>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="2月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="3月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="4月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="5月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="6月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="7月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="8月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="9月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="10月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="11月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="12月" align='center'>
                                <el-table-column
                                prop="province"
                                label="计划"
                                min-width=45
                                align='center'>
                                </el-table-column>
                                <el-table-column
                                prop="city"
                                label="完成"
                                min-width=45
                                align='center'>
                                </el-table-column>
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
            </el-tab-pane>
            <el-tab-pane label="计划执行情况查询" name='2'>
                <div class="QueryStatistics_top">
                    <div>
                        <span>用户名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入用户名">
                    </div>
                    <div>
                        <span>姓名:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入姓名">
                    </div>
                    <div>
                        <span>电话:</span>
                        <input type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入电话">
                    </div>
                    <div style="margin-left:15px;">
                        <el-button type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="QueryStatistics_bottom">
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
                        label="点名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="点编号"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="巡检人员"
                        min-width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='0'">用户</span>
                                <span v-if="scope.row.operatModule=='1'">机构</span>
                                <span v-if="scope.row.operatModule=='2'">项目</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="巡检时间"
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
                        label="执行情况"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="是否合格"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="评分"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="巡检路线"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="计划名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="计划开始时间"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="计划结束时间"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="任务编号"
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
            </el-tab-pane>        
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'QueryStatistics',
    data () {
        return {
            activeName:'0',
            tableData:[],
            tableData2:[
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '1',
                    city: '1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '1',
                    city: '1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },
            ],
            tableData3:[],
            pageIndex:1,
            pageSize:10,
            total:10,
        }
    },
    mounted(){
        
    },
    methods:{
        handleClick(val){
            this.pageIndex = 1
            this.pageSize = 10
        },
        sizechange(val){
            this.pageSize = val;
            // this.ready()
        },
        currentchange(val){
            this.pageIndex = val;
            // this.ready()
        },
    },
    created(){
        
    },
}
</script>
<style scoped>
.block{text-align: center;}
.QueryStatistics{width: 100%;height: 100%;border: 1px solid #E4E4F1;padding: 5px;}

.QueryStatistics_top{height: 46px;display: flex;justify-content: center;}
.QueryStatistics_top>div{display:flex;align-items: center;}
.QueryStatistics_top>div>span{line-height: 46px;width: 60px;text-align: right}
.QueryStatistics_top>div>input{width: 126px;}
.QueryStatistics_bottom{position: absolute;top: 60px;left:5px;right: 5px;bottom: 5px;}
</style>