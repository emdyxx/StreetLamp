<template>
    <!-- 巡检计划 -->
    <div class="PatrolPlan">
        <div class="PatrolPlan_top">
            <el-button @click="PatrolPlan(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button @click="PatrolPlan(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button @click="PatrolPlan(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='计划名称';types='1';">计划名称</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="types=='1'">
                        <el-input v-model="planName" size="small" placeholder="请输入计划名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="PatrolPlan_bottom">
            <!-- <div class="PatrolPlan_bottom_top">
                <div class="search">
                    <label>计划名称:</label>
                    <input v-model="planName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入巡检计划名称">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div> -->
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
                    prop="planName"
                    align='center'
                    label="计划名称"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="routeName"
                    align='center'
                    label="巡检路线"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    prop="inspectorName"
                    align='center'
                    label="巡检员"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
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
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加巡检计划</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑巡检计划</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>计划名称:</label>
                            <input v-model="data.planName" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入计划名称">
                        </div>
                        <div class="form-group" style="position:relative;">
                            <label><span class="Required">*</span>巡检路线:</label>
                            <input v-model="data.route.routeName" :disabled=true type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请选择巡检路线">
                            <img @click="Appoint(0)" src="../../../assets/route.png" style="position:absolute;top:5px;right:60px;width:25px;height:25px;;" alt="">
                        </div>
                        <div class="form-group" style="position:relative;">
                            <label><span class="Required">*</span>指定巡检员:</label>
                            <input v-model="data.inspector.inspectorName" :disabled=true type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请指定巡检员">
                            <img @click="Appoint(1)" src="../../../assets/login.png" style="position:absolute;top:5px;right:60px;width:25px;height:25px;;" alt="">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>按顺序巡检:</label>
                            <el-radio-group v-model="data.inspectionOrder">
                                <el-radio :label="0">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>开始日期:</label>
                            <el-date-picker
                            size="small"
                            align="right"
                            type="date"
                            value-format='yyyy-MM-dd'
                            v-model="data.startDate"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>结束日期:</label>
                            <el-date-picker
                            size="small"
                            align="right"
                            type="date"
                            value-format='yyyy-MM-dd'
                            v-model="data.endDate"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>开始时间:</label>
                            <el-time-picker
                                size='small'
                                v-model="data.dayStartTime"
                                value-format='HH:mm:ss'
                                placeholder="任意时间点">
                            </el-time-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>结束时间:</label>
                            <el-time-picker
                                size='small'
                                v-model="data.dayEndTime"
                                placeholder="任意时间点"
                                value-format='HH:mm:ss'>
                            </el-time-picker>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>计划周期:</label>
                            <el-select v-model="data.planPeriod" size="small" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group_s" v-if="data.planPeriod=='2'">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="1">周一</el-checkbox>
                                <el-checkbox label="2">周二</el-checkbox>
                                <el-checkbox label="3">周三</el-checkbox>
                                <el-checkbox label="4">周四</el-checkbox>
                                <el-checkbox label="5">周五</el-checkbox>
                                <el-checkbox label="6">周六</el-checkbox>
                                <el-checkbox label="7">周日</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="form-group" v-if="data.planPeriod=='3'">
                            <label><span class="Required">*</span>选择日期:</label>
                            <el-select v-model="value3" size="small" clearable multiple placeholder="可多选">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group_s" v-if="data.planPeriod=='4'">
                            <el-checkbox-group v-model="checkList2">
                                <el-checkbox label="1">第一周</el-checkbox>
                                <el-checkbox label="2">第二周</el-checkbox>
                                <el-checkbox label="3">第三周</el-checkbox>
                                <el-checkbox label="4">第四周</el-checkbox>
                                <el-checkbox label="5">第五周</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox-group v-model="checkList3">
                                <el-checkbox label="1">周一</el-checkbox>
                                <el-checkbox label="2">周二</el-checkbox>
                                <el-checkbox label="3">周三</el-checkbox>
                                <el-checkbox label="4">周四</el-checkbox>
                                <el-checkbox label="5">周五</el-checkbox>
                                <el-checkbox label="6">周六</el-checkbox>
                                <el-checkbox label="7">周日</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>计划类别:</label>
                            <el-select v-model="data.dayPlanType" size="small" placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group" v-if="data.dayPlanType=='1'||data.dayPlanType=='2'">
                            <label>第一次执行时间:</label>
                            <el-time-picker
                                size='small'
                                v-model="data.executionTime"
                                placeholder="任意时间点"
                                value-format='HH:mm:ss'>
                            </el-time-picker>
                        </div>
                        <div class="form-group" v-if="data.dayPlanType=='2'">
                            <label>固定间隔时间:</label>
                            <input v-model="data.executionInterval" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="固定间隔时间(分钟)">
                        </div>
                        <div v-if="data.dayPlanType=='3'">
                            <el-button @click="custom(0)" type="primary" size="small">添加</el-button>
                            <el-button @click="custom(1)" type="primary" size="small">删除</el-button>
                            <el-table
                                :data="tableData2"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                @selection-change="customChange"
                                style="width: 100%;margin-top:5px;">
                                <el-table-column
                                type="selection"
                                align='center'
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="beginTime"
                                align='center'
                                label="开始时间"
                                min-width="100">
                                </el-table-column>
                                <el-table-column
                                prop="finishTime"
                                label="结束时间"
                                align='center'
                                min-width="100"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="PatrolPlanSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <el-dialog
            title="自定义时间"
            :visible.sync="dialogVisible"
            width="30%">
            <span>
                <div class="form-group">
                    <label><span class="Required">*</span>开始时间:</label>
                    <el-time-picker
                        size='small'
                        v-model="beginTime"
                        value-format='HH:mm:ss'
                        placeholder="任意时间点">
                    </el-time-picker>
                </div>
                <div class="form-group">
                    <label><span class="Required">*</span>结束时间:</label>
                    <el-time-picker
                        size='small'
                        v-model="finishTime"
                        placeholder="任意时间点"
                        value-format='HH:mm:ss'>
                    </el-time-picker>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="addcustom" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="巡检信息"
            :visible.sync="dialogVisible2"
            width="70%">
            <span>
                <template v-if="type3=='0'">
                    <el-table
                        :data="tableData3"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        @selection-change="SelectionChange3"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="routeName"
                        align='center'
                        label="路线名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="创建时间"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注说明"
                        align='center'
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="type3=='1'">
                    <el-table
                        :data="tableData3"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        @selection-change="SelectionChange3"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="inspectorName"
                        align='center'
                        label="姓名"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="inspectorNumber"
                        align='center'
                        label="编号"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        align='center'
                        label="手机号码"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="创建时间"
                        align='center'
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </template>
                <div class="block">
                    <el-pagination
                    background
                    @size-change="sizechange3"
                    @current-change="currentchange3"
                    :current-page="pageIndex3"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total3">
                    </el-pagination>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button @click="addAppoint" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'PatrolPlan',
    data () {
        return {
            name:'计划名称',
            types:'1',
            addPatrolPlan:false,
            editPatrolPlan:false,
            delPatrolPlan:false,
            serverurl:localStorage.serverurl,
            planName:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            options:[
                {
                    value:'1',
                    label:'天',
                },
                {
                    value:'2',
                    label:'周',
                },
                {
                    value:'3',
                    label:'月',
                },
                {
                    value:'4',
                    label:'月(周)',
                }
                
            ],
            options2:[
                {
                    value:'1',
                    label:'仅一次',
                },
                {
                    value:'2',
                    label:'固定间隔时间',
                },
                {
                    value:'3',
                    label:'自定义时间及次数',
                }
            ],
            options3:[],
            data:{
                planName:'',
                route:{},
                inspector:{},
                inspectionOrder:0,
                startDate:'',
                endDate:'',
                dayStartTime:'',
                dayEndTime:'',
                planPeriod:'1',
                dayPlanType:'1',
                executionTime:'',
                executionInterval:'',//间隔时间
            },
            checkList:[],//周
            value3:[],//月
            checkList2:[],//月周
            checkList3:[],//月周
            tableData2:[],//自定义时间数据
            customSite:[],
            dialogVisible: false,
            beginTime:'',
            finishTime:'',
            //巡检员,巡检路线数据
            dialogVisible2:false,
            type3:"0",
            tableData3:[],
            site3:[],
            pageIndex3:1,
            pageSize3:10,
            total3:10,
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.planName=''
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },   
        //添加,编辑,删除用户
        PatrolPlan(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0'
                that.data.planName = ''
                that.data.route = {}
                that.data.inspector = {}
                that.data.inspectionOrder = 0
                that.data.startDate = ''
                that.data.endDate = ''
                that.data.dayStartTime = ''
                that.data.dayEndTime = ''
                that.data.planPeriod = '1'
                that.data.dayPlanType = '1'
                that.data.executionTime = ''
                that.data.executionInterval = ''
                that.checkList=[]
                that.value3=[]
                that.checkList2=[]
                that.checkList3=[]
                that.tableData2=[]
                that.customSite=[]
                that.type3 = '0'
                that.tableData3 = []
                that.site3 = []
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
                that.PatrolPlanData()
                $('#addPatrolPlan').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择计划进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选巡检计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/plan/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            plans:arr
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
        },
        //添加,编辑  保存
        PatrolPlanSubmit(val){
            var that = this;
            if(that.data.planName==''){
                that.$message({
                    message: '计划名称不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.data.route.id==''||that.data.inspector.id==''||that.data.route.id==undefined||that.data.inspector.id==undefined){
                that.$message({
                    message: '请指定巡检路线和巡检员!',
                    type: 'error'
                });
                return;
            }
            if(that.data.startDate==''||that.data.endDate==''){
                that.$message({
                    message: '开始结束日期不能为空!',
                    type: 'error'
                });
                return;
            }
            if(that.data.dayStartTime==''||that.data.dayEndTime==''){
                that.$message({
                    message: '开始结束时间不能为空!',
                    type: 'error'
                });
                return;
            }
            var type = ''
            var data = {}
            if(that.type=='0'){type='post';}
            if(that.type=='1'){type='put';data.id = that.site[0].id;}
            data.planName = that.data.planName
            data.routeId = that.data.route.id
            data.inspectorId = that.data.inspector.id
            data.inspectionOrder = that.data.inspectionOrder
            data.startDate = that.data.startDate
            data.endDate = that.data.endDate
            data.dayStartTime = that.data.dayStartTime
            data.dayEndTime = that.data.dayEndTime
            data.planPeriod = that.data.planPeriod
            if(that.data.planPeriod=='2'){
                data.weeks = that.checkList.join(',')
            }
            if(that.data.planPeriod=='3'){
                data.day = that.value3.join(',')
            }
            if(that.data.planPeriod=='4'){
                data.weekOfMonth = that.checkList2.join(',')
                data.weeks = that.checkList3.join(',')
            }
            data.dayPlanType = that.data.dayPlanType
            data.dayPlanList = []
            if(that.data.dayPlanType=='1'){
                data.dayPlanList.push({
                    executionTime:that.data.executionTime
                })
            }
            if(that.data.dayPlanType=='2'){
                data.dayPlanList.push({
                    executionTime:that.data.executionTime,
                    executionInterval:that.data.executionInterval
                })
            }
            if(that.data.dayPlanType=='3'){
                data.dayPlanList = that.tableData2
            }
            data.projectId = sessionStorage.projectId;
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/plan',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#addPatrolPlan').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //获取巡检计划详细信息
        PatrolPlanData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/plan/information/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        if(that.type=='1'){
                            that.data.planName = data.result.patrolPlan.planName
                            that.data.route = data.result.patrolRoute
                            that.data.inspector = data.result.patrolInspector
                            that.data.inspectionOrder = data.result.patrolPlan.inspectionOrder
                            that.data.startDate = data.result.patrolPlan.startDate
                            that.data.endDate = data.result.patrolPlan.endDate
                            that.data.dayStartTime = data.result.patrolPlan.dayStartTime
                            that.data.dayEndTime = data.result.patrolPlan.dayEndTime
                            that.data.planPeriod = String(data.result.patrolPlan.planPeriod)
                            if(data.result.patrolPlan.planPeriod=='2'){
                                that.checkList = data.result.patrolPlan.weeks.split(',')
                            }
                            if(data.result.patrolPlan.planPeriod=='3'){
                                that.value3 = data.result.patrolPlan.day.split(',')
                                for(var i=0;i<that.value3.length;i++){
                                   that.value3[i] =  Number(that.value3[i])
                                }
                            }
                            if(data.result.patrolPlan.planPeriod=='4'){
                                that.checkList2 = data.result.patrolPlan.weekOfMonth.split(',')
                                that.checkList3 = data.result.patrolPlan.weeks.split(',')
                            }
                            that.data.dayPlanType = String(data.result.patrolPlan.dayPlanType)
                            if(data.result.patrolPlan.dayPlanType=='1'){
                                that.data.executionTime = data.result.patrolPlanDayList[0].executionTime
                            }
                            if(data.result.patrolPlan.dayPlanType=='2'){
                                that.data.executionTime = data.result.patrolPlanDayList[0].executionTime
                                that.data.executionInterval = data.result.patrolPlanDayList[0].executionInterval
                            }
                            if(data.result.patrolPlan.dayPlanType=='3'){
                                that.tableData2 = data.result.patrolPlanDayList
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //执行巡检员以及巡检路线
        Appoint(val){
            this.dialogVisible2 = true
            this.type3 = val
            this.AppointData(val)
        },
        //巡检员以及巡检路线  确定按钮
        addAppoint(){
            if(this.site3.length==0||this.site3.length>=2){
                this.$message({
                    message: '请选择单条数据!',
                    type: 'error'
                });
                return;
            }
            if(this.type3=='0'){
                this.data.route = this.site3[0]
            }
            if(this.type3=='1'){
                this.data.inspector = this.site3[0]
            }
            this.dialogVisible2 = false
        },
        SelectionChange3(val){this.site3 = val;},
        sizechange3(val){this.pageSize3=val;this.ready();},
        currentchange3(val){this.pageIndex3=val;this.ready();},
        //请求巡检员  以及巡检路线数据
        AppointData(val){
            var that = this;
            var data = {
                page:that.pageIndex3,
                size:that.pageSize3,
                projectIds:sessionStorage.projectId,
            }
            var url = ''
            if(val=='0'){
                url='/v1/solin/patrol/route'}
            if(val=='1'){
                url='/v1/solin/patrol/inspector'}
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3 = data.result.list
                        that.total3 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //自定义时间点击添加,删除
        custom(val){
            var that = this
            if(val=='0'){
                this.dialogVisible = true;
            }
            if(val=='1'){
                if(this.customSite.length==0||this.customSite.length>=2){
                    this.$message({
                        message: '请选中单条数据删除!',
                        type: 'error'
                    });
                    return;
                }
                for(var i=0;i<this.tableData2.length;i++){
                    if(this.customSite[0].id==this.tableData2[i].id){
                        this.tableData2.splice(i,1)
                    }
                }
            }
        },
        customChange(val){this.customSite = val;},
        //自定义时间 确定
        addcustom(){
            if(this.dayStartTime==''||this.dayEndTime==''){
                that.$message({
                    message: '时间不能为空!',
                    type: 'error'
                });
                return;
            }
            this.tableData2.push({
                beginTime:this.beginTime,
                finishTime:this.finishTime,
                value:this.tableData2.length+1
            })
            this.dialogVisible = false;
        },
        //请求计划列表数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/plan',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    planName:that.planName,
                    projectIds:sessionStorage.projectId
                },
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
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+43,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addPatrolPlan'){
                                that.addPatrolPlan = true
                            }
                            if(data.result.operats[i].code=='editPatrolPlan'){
                                that.editPatrolPlan = true
                            }
                            if(data.result.operats[i].code=='delPatrolPlan'){
                                that.delPatrolPlan = true
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
        this.options3 = []
        this.Jurisdiction()
        this.ready()
        for(var i=0;i<31;i++){
            this.options3.push({
                value:i+1,
                label:i+1+'号',
            })
        }
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
/* .PatrolPlan_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;} */
.PatrolPlan_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 70px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 115px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}
.form-group>div>label,.form-group_s>div>label{margin-left:10px !important;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>
