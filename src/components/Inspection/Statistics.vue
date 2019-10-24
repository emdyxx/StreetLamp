<template>
    <!-- 统计信息 -->
    <div class="section">
        <div class="section_top">
            <el-select v-model="value" @change="Recordchange" size="small" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <template v-if="value=='1'">
                <div class="search_Log">
                    <span>姓名:</span>
                    <input v-model="inspectorName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入巡检员姓名">
                </div>
            </template>
            <div class="search_Log">
                <span>开始日期:</span>
                <el-date-picker
                    size="small"
                    align="right"
                    type="date"
                    value-format='yyyy-MM-dd'
                    v-model="startTime"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="search_Log">
                <span>结束日期:</span>
                <el-date-picker
                    size="small"
                    align="right"
                    type="date"
                    value-format='yyyy-MM-dd'
                    v-model="endTime"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div style="margin-left:15px;">
                <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
            </div>
        </div>
        <div class="section_bottom">
            <!-- <div class="Record_bottom_top">
                <template v-if="value=='1'">
                    <div class="search">
                        <label>巡检员姓名:</label>
                        <input v-model="inspectorName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入巡检员姓名">
                    </div>
                </template>
                <div class="search">
                    <label>开始日期:</label>
                    <el-date-picker
                        size="small"
                        align="right"
                        type="date"
                        value-format='yyyy-MM-dd'
                        v-model="startTime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="search">
                    <label>结束日期:</label>
                    <el-date-picker
                        size="small"
                        align="right"
                        type="date"
                        value-format='yyyy-MM-dd'
                        v-model="endTime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div> -->
            <div class="Record_bottom_bottom">
                <template v-if="value=='0'">
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
                        prop="patrolPlanName"
                        align='center'
                        label="计划名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="factSiteNum"
                        align='center'
                        label="点实际巡检次数"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="omissionFactor"
                        align='center'
                        label="漏检率"
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        prop="totalSiteNum"
                        align='center'
                        label="点巡检总次数"
                        show-overflow-tooltip
                        min-width="120">
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="value=='1'">
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
                        prop="inspectorName"
                        align='center'
                        label="巡检员姓名"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="factNum"
                        align='center'
                        label="巡检员已巡检次数"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="totalNum"
                        align='center'
                        label="巡检员需要巡检总次数"
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        prop="finishRate"
                        align='center'
                        label="完成率"
                        show-overflow-tooltip
                        min-width="120">
                        </el-table-column>
                    </el-table> 
                </template>
                <template v-if="value=='2'">
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
                        prop="patrolSiteName"
                        align='center'
                        label="巡检点名称"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="factSiteNum"
                        align='center'
                        label="巡检点实际巡检次数"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="totalSiteNum"
                        align='center'
                        label="巡检点巡检总次数"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="lossRate"
                        label="漏检率"
                        align='center'
                        min-width="120"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </template>
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
            serverurl:localStorage.serverurl,
            options:[
                {
                    value: '0',
                    label: '巡检计划统计'
                }, 
                {
                    value: '1',
                    label: '巡检员统计'
                }, 
                {
                    value: '2',
                    label: '巡检点统计'
                }
            ],
            value:'0',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            inspectorName:'',
            startTime:'',
            endTime:'',
        }
    },
    mounted(){
        
    },
    methods:{
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        Recordchange(val){
            this.pageIndex = 1;
            this.pageSize = 10;
            this.inspectorName = ''
            this.startTime = ''
            this.endTime = ''
            this.ready()
        },   
        //
        ready(){
            var that = this;
            var url = '';
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                startTime:that.startTime,
                endTime:that.endTime,
                projectIds:sessionStorage.projectId,
            }
            if(that.value=='0'){
                url='/v1/solin/patrol/statistics/execute';
            }
            if(that.value=='1'){
                data.inspectorName = that.inspectorName
                url='/v1/solin/patrol/statistics/execute/inspector';
            }
            if(that.value=='2'){
                url='/v1/solin/patrol/statistics/execute/site';
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.ready();},
        currentchange(val){this.pageIndex=val;this.ready();},
        search(){this.ready();},
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>

</style>
