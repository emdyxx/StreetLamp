<template>
    <!-- 历史巡检记录 -->
    <div class="historyPatrolRecord"> 
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" style="height:100%;">
            <el-tab-pane label="历史任务" name="0" style="height: 100%;position:relative;">
                <div class="historyPatrolRecord_top">
                    <div>
                        <span>计划名称:</span>
                        <input type="text" v-model="planName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入计划名称">
                    </div>
                    <div>
                        <span>巡检员:</span>
                        <input type="text" v-model="inspectorName" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入巡检员">
                    </div>
                    <div style="margin-left:15px;">
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="historyPatrolRecord_bottom">
                    <el-table
                        :data="tableData"
                        row-key="id"
                        :expand-row-keys="expands"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;"
                        @expand-change='clickTable'>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table
                                :data='tableData2'
                                border
                                size='mini'
                                style="width: 100%;">
                                    <el-table-column
                                    prop="siteName"
                                    align='center'
                                    label="点名称"
                                    min-width="50">
                                    </el-table-column>
                                    <el-table-column
                                    prop="siteNumber"
                                    label="点编号"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="点状态"
                                    min-width="50">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.siteStatus=='1'" style="color:#67C23A;">正常</span>
                                            <span v-if="scope.row.siteStatus=='2'" style="color:#F56C6C;">异常</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="巡检状态"
                                    min-width="50">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.recordId=='0'" style="color:#F56C6C;">未巡检</span>
                                            <span v-if="scope.row.recordId=='1'" style="color:#67C23A;">已巡检</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="updateTime"
                                    label="上报时间"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="操作"
                                    min-width="50">
                                        <template slot-scope="scope">
                                            <el-button @click="details(scope.row)" :disabled="scope.row.recordId=='0'" type="primary" size='mini'>详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    background
                                    @size-change="sizechange2"
                                    @current-change="currentchange2"
                                    :current-page="pageIndex2"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="pageSize2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total2">
                                    </el-pagination>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="planName"
                        align='center'
                        label="计划名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="routeName"
                        align='center'
                        label="巡检路线"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="inspectorName"
                        align='center'
                        label="巡检员"
                        min-width="180">
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
        <!-- 巡检计划详情模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">巡检点详情</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data=tableData3.patrolRecordItemList
                            border
                            size='mini'
                            style="width: 100%;">
                            <el-table-column
                            prop="itemName"
                            align='center'
                            label="项名称"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="itemCategoryName"
                            label="项类别"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="状态"
                            min-width="50">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.itemCheckStatus=='0'" style="color:#F56C6C;">不合格</span>
                                    <span v-if="scope.row.itemCheckStatus=='1'" style="color:#67C23A;">合格</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="itemCheckResults"
                            label="备注"
                            align='center'>
                            </el-table-column>
                        </el-table>
                        <div style="display:flex;flex-wrap: wrap;">
                            <template v-for="item in tableData3.patrolRecordImgList">
                                <div :key="item.id" style="width:25%;padding:5px;">
                                    <img :src=serverurl+item.imgUrl alt=""  style="width:100%;">
                                </div>
                            </template>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'historyPatrolRecord',
    data () {
        return {
            serverurl:localStorage.serverurl,
            activeName:'0',
            tableData:[],
            pageIndex:1,
            site:[],
            total:10,
            pageSize:10,
            planName:'',
            inspectorName:'',
            planId:'',
            tableData2:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
            expands: [],
            tableData3:[],
        }
    },
    mounted(){
        
    },
    methods:{
        handleClick(){
            this.pageSize= 10
            this.pageIndex= 1
            this.inspectorName = ''
            this.ready()
        },
        ready(){
            var that = this;
            var url = ''
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                projectIds:sessionStorage.projectId,
                inspectorName:that.inspectorName
            }
            if(this.activeName=='0'){
                url='/v1/solin/patrol/execute/log';
                data.planName = that.planName
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
        sizechange(val){this.pageSize=val;this.ready();},
        currentchange(val){this.pageIndex=val;this.ready();},
        search(){this.ready()},
        //获取计划详情
        clickTable(row, expandedRows){
            var that = this
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.id)
                }
                that.planId = row.id
                that.ready2()
            } else {
                that.expands = []
            }
        },
        ready2(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/execute/site/log',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    size:that.pageSize2,
                    executeLogId:that.planId,
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2=data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        sizechange2(val){this.pageSize2=val;this.ready2();},
        currentchange2(val){this.pageIndex2=val;this.ready2();},
        //获取点详情
        details(row){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/execute/site/record/information/'+row.recordId,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3=data.result
                        $('#myModal').modal('show')
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created(){
        this.ready()
    },
}
</script>
<style scoped>
.block{text-align: center;}
.historyPatrolRecord{width: 100%;height: 100%;}
.historyPatrolRecord_top{height: 40px;display: flex;justify-content: center;align-items: center;}
.historyPatrolRecord_top>div{display:flex;align-items: center;}
.historyPatrolRecord_top>div>span{line-height: 46px;width: 60px;text-align: right}
.historyPatrolRecord_top>div>input{width: 126px;}
.historyPatrolRecord_bottom{position: absolute;top: 40px;bottom: 0;width: 100%;}
</style>