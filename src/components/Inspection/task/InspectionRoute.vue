<template>
    <!-- 巡检路线 -->
    <div class="InspectionRoute">
        <div class="InspectionRoute_top">
            <el-button v-if="addPatrolRoute" @click="InspectionRoute(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editPatrolRoute" @click="InspectionRoute(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="delPatrolRoute" @click="InspectionRoute(2)" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='路线名称';types='1';">路线名称</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="types=='1'">
                        <el-input v-model="routeName" size="small" placeholder="请输入路线名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="InspectionRoute_bottom">
            <!-- <div class="UserSettings_bottom_top">
                <div class="search">
                    <label>路线名称:</label>
                    <input v-model="routeName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" placeholder="请输入路线名称">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div> -->
            <div class="UserSettings_bottom_bottom">
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
                    prop="routeName"
                    align='center'
                    label="路线名称"
                    min-width="120">
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
        <div class="modal fade" id="addInspectionRoute" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:690px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加巡检路线</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑巡检路线</h4>
                    </div>
                    <div class="modal-body" style='min-height:200px;max-height:590px;overflow:auto;'>
                        <div class="form-group">
                            <label><span class="Required">*</span>路线名称:</label>
                            <input v-model="data.routeName" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入路线名称">
                        </div>
                        <div class="form-group">
                            <label>备注说明:</label>
                            <input v-model="data.remark" type="text" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入备注说明">
                        </div>
                        <div class="spot">
                            <div>
                                <div class="el-upload__tip">
                                    已关联巡检点:
                                    <el-button @click='leftDelete' type="primary" size="mini">移除</el-button>  
                                </div>
                                <div style="width:100%;">
                                    <el-table
                                        :data="tableData3"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        @selection-change="SelectionChange3"
                                        style="width: 100%;max-height:250px;;overflow:auto;">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="siteName"
                                        align='center'
                                        label="点名称"
                                        min-width="50">
                                        </el-table-column>
                                        <el-table-column
                                        prop="siteNumber"
                                        align='center'
                                        label="点编号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div>
                                <el-button @click='moveIn' type="primary" icon="el-icon-d-arrow-left" size="mini"></el-button>
                            </div>
                            <div>
                                <div class="el-upload__tip">未关联巡检点:</div>
                                <div style="width:100%;">
                                    <el-table
                                        :data="tableData2"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        @selection-change="SelectionChange2"
                                        style="width: 100%;max-height:250px;;overflow:auto;">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="siteName"
                                        align='center'
                                        label="点名称"
                                        min-width="50">
                                        </el-table-column>
                                        <el-table-column
                                        prop="siteNumber"
                                        align='center'
                                        label="点编号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="block">
                                    <el-pagination
                                        small
                                        background
                                        @current-change="currentchange2"
                                        :current-page="pageIndex2"
                                        :page-size="pageSize2"
                                        layout="prev, pager, next"
                                        :total="total2">
                                    </el-pagination>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="submitRoute" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'InspectionRoute',
    data () {
        return {
            name:'路线名称',
            types:'1',
            addPatrolRoute:false,
            editPatrolRoute:false,
            delPatrolRoute:false,
            serverurl:localStorage.serverurl,
            routeName:'',
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            type:'0',
            //巡检点数据
            tableData2:[],
            site2:[],
            pageIndex2:1,
            pageSize2:10,
            total2:10,
            tableData3:[],
            site3:[],
            data:{
                routeName:'',
                remark:'',
            },
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.routeName=''
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },   
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        //添加,编辑,删除用户
        InspectionRoute(val){
            // 0 添加,1 编辑,2 删除
            var that = this;
            if(val=='0'){
                that.type = '0'
                that.spotData()
                that.data.routeName = ''
                that.data.remark = ''
                that.tableData3 = []
                that.site3 = []
                $('#addInspectionRoute').modal('show')
            }
            if(val=='1'){
                that.type = '1'
                if(that.site.length==0||that.site.length>1){
                    that.$message({
                        message: '请选择单个路线进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.site2 = []
                that.site3 = []
                that.data.routeName = that.site[0].routeName
                that.data.remark = that.site[0].remark
                that.RouteData()
                that.spotData()
                $('#addInspectionRoute').modal('show')
            }
            if(val=='2'){
                if(that.site.length==0){
                    that.$message({
                        message: '请选择路线进行删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                that.$confirm('是否删除所选巡检路线？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/patrol/route/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            routes:arr
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
        //添加,编辑保存
        submitRoute(){
            var that = this;
            if(this.data.routeName==''){
                this.$message({
                    message: '路线名称不能为空!',
                    type: 'error'
                });
                return;
            }
            if(this.tableData3.length==0){
                this.$message({
                    message: '请选取巡检点!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            var type = ''
            if(this.type=='0'){type='post';}
            if(this.type=='1'){type='put';data.id = this.site[0].id;}
            data.routeName = this.data.routeName
            data.remark = this.data.remark
            data.projectId = sessionStorage.projectId
            data.siteIds = []
            for(var i=0;i<this.tableData3.length;i++){
                data.siteIds.push(this.tableData3[i].id)
            }
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/route',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#addInspectionRoute').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //获取巡检点详细信息
        RouteData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/route/information/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        if(that.type=='1'){
                            that.tableData3 = data.result.patrolSiteList
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求巡检点
        spotData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/site',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex2,
                    size:that.pageSize2,
                    siteName:'',
                    siteStatus:'',
                    siteNumber:'',
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange2(val){this.site2 = val;},
        currentchange2(val){this.pageIndex2=val;this.spotData();},
        search2(){this.ready()},
        SelectionChange3(val){this.site3 = val;},
        //左侧移除已关联数据
        leftDelete(){
            if(this.site3.length==0||this.tableData3.length==0){return;}
            var type = true
            for(var i=0;i<this.tableData3.length;i++){
                type = false
                for(var j=0;j<this.site3.length;j++){
                    if(this.tableData3[i].id==this.site3[j].id){
                        type = true
                    }
                }
                if(type==true){
                    this.tableData3.splice(i,1)
                    i--
                }
            }
        },
        //像左移动
        moveIn(){
            if(this.site2.length==0){return;}
            if(this.tableData3.length==0){
                this.tableData3 = this.site2
            }else{
                var type = false
                for(var i=0;i<this.site2.length;i++){
                    type = true
                    for(var j=0;j<this.tableData3.length;j++){
                        if(this.site2[i].id==this.tableData3[j].id){
                            type = false
                        }
                    }
                    if(type==true){
                        this.tableData3.push(this.site2[i])
                    }
                }
            }
        },
        //请求巡检线路列表
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/patrol/route',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    routeName:that.routeName,
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
        sizechange(val){this.pageSize=val;this.readyRight();},
        currentchange(val){this.pageIndex=val;this.readyRight();},
        search(){this.ready()},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+42,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addPatrolRoute'){
                                that.addPatrolRoute = true
                            }
                            if(data.result.operats[i].code=='editPatrolRoute'){
                                that.editPatrolRoute = true
                            }
                            if(data.result.operats[i].code=='delPatrolRoute'){
                                that.delPatrolRoute = true
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
        this.Jurisdiction()
        this.ready()
    },
}
</script>
<style scoped>
.block{text-align: center;}
.InspectionRoute{width: 100%;height: 100%;}
.InspectionRoute>div{width: 100%;position: absolute;}
.InspectionRoute_top{height: 46px;border-bottom: none !important;display: flex;border: 1px solid #E4E4F1;}
.InspectionRoute_top>button{height:33px;margin:6px 0 0 10px;}
.InspectionRoute_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;border: 1px solid #E4E4F1;}
/* .UserSettings_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;} */
.UserSettings_bottom_bottom{position: absolute;top:0;bottom: 0;left: 0;right: 0;padding:5px;overflow: auto;}
.search{display: flex;}
.search>label{width: 70px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.Required{color: red;font-size: 17px;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 156px;}
.form-group>div{width: 156px;display: flex;justify-content: center;align-items: center;}

.spot{display: flex;width: 100%;}
.spot>div:nth-of-type(1){width: 46%;}
.spot>div:nth-of-type(2){width: 8%;display: flex;align-items: center;justify-content: center;}
.spot>div:nth-of-type(3){width: 46%;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>
