<template>
    <!-- 继电器管理 -->
    <div class="Relay">
        <div class="Relay_top">
            <el-dropdown style="margin-left:10px;" @command='operation'> 
                <el-button type="primary" size='small' style="margin-top:8px;margin-left:5px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item command='1'>状态查询</el-dropdown-item>
                    <el-dropdown-item command='2'>输出控制</el-dropdown-item>
                    <el-dropdown-item command='3'>工作模式切换</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>  
            <el-button @click="sceneRouter" type="primary" size='small'>场景管理</el-button>
        </div>
        <div class="Relay_bottom">
            <div class="Relay_bottom_top">
                <div class="search">
                    <label style="width:90px;">继电器名称:</label>
                    <input v-model="nickName" type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入继电器名称">
                </div>
                <div class="search">
                    <label style="width:100px;">继电器编号:</label>
                    <input v-model="relayNumber" type="text" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入继电器编号">
                </div>
                <div class="search">
                    <label style="width:90px;">继电器状态:</label>
                    <el-select v-model="value" size='small' clearable style='width:146px;' placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="Relay_bottom_bototm">
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
                    prop="nickName"
                    align='center'
                    label="继电器名称"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="relayNumber"
                    align='center'
                    :formatter="formatRole"
                    label="继电器地址"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    :formatter="formatRole"
                    label="集中器序列号"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="在线状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    :formatter="formatRole"
                    label="当前场景"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="工作模式"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.relaySceneId=='0'">正常</span>
                            <span v-if="scope.row.relaySceneId=='1'">联动</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="通道状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <el-button @click="details(scope.row.id)" type="primary" size='mini'>详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="创建时间"
                    :formatter="formatRole"
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
        <!-- 输出控制模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">继电器通道控制(输出通道)</h4>
                    </div>
                    <div class="modal-body" style="max-height:350px;overflow: auto;">
                        <el-table
                            :data="myModalData"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="通道名称"
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="通道编号"
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="通道状态"
                            show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.channelState" size="mini" placeholder="请选择">
                                        <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="submitPassageway" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>
                <span>工作模式:</span>
                <el-select v-model="value3" size="small" style="width:166px;" placeholder="请选择">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="addControl" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 输出控制模态框 -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:650px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">继电器通道详情</h4>
                    </div>
                    <div class="modal-body" style="display:flex;max-height:550px;overflow: auto;">
                        <div style="width:49%;">
                            <span>输入通道</span>
                            <el-table
                                :data="myModalData2"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;height:auto;">
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="通道名称"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="通道编号"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                align='center'
                                label="通道状态"
                                :formatter="formatRole"
                                show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.channelState=='3'">有效</span>
                                        <span v-if="scope.row.channelState=='4'">无效</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="width:49%;margin-left:2%;">
                            <span>输出通道</span>
                            <el-table
                                :data="myModalData3"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;height:auto;">
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="通道名称"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="通道编号"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                align='center'
                                label="通道状态"
                                :formatter="formatRole"
                                show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.channelState=='1'">开启</span>
                                        <span v-if="scope.row.channelState=='2'">关闭</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'Relay',
    data () {
        return {
            serverurl:localStorage.serverurl, 
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            relayNumber:'',
            value:'',
            options:[
                {
                    name:'离线',
                    id:'0'
                },
                {
                    name:'在线',
                    id:'1'
                }
            ],
            options2:[
                {
                    label:'开启',
                    value:1
                },
                {
                    label:'关闭',
                    value:2
                }
            ],
            value3:'',
            options3:[
                {
                    label:'正常',
                    value:1
                },
                {
                    label:'联动',
                    value:2
                }
            ],
            //输出通道控制
            myModalData:[],
            dialogVisible:false,
            myModalData2:[],
            myModalData3:[],
        }
    },
    mounted(){
        
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        //继电器操作
        operation(val){
            var that = this;
            if(val=='1'){
                if(this.site.length==0){
                    this.$message({
                        message: '请选择单个继电器进行查询!',
                        type: 'warning'
                    });
                    return;
                }
                var arr = []
                for(var i = 0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/relay/control/status',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        command:'3',
                        relays:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '数据查询中,请稍后...',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },6000)
                        }else{
                            that.errorCode(data)
                        }
                    },
                })
            }
            if(val=='2'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个继电器进行操作!',
                        type: 'warning'
                    });
                    return;
                }
                that.passageway()
                $('#myModal').modal('show')
            }
            if(val=='3'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个继电器进行操作!',
                        type: 'warning'
                    });
                    return;
                }
                that.dialogVisible = true
            }
        },
        //继电器通道控制提交
        submitPassageway(){
            var that = this;
            var arr = []
            for(var i = 0;i<that.myModalData.length;i++){
                arr.push({
                    channelId:that.myModalData[i].id,
                    channelState:that.myModalData[i].channelState,
                })
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/control/output/multiple',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    relaylist:arr
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        that.ready()
                        $('#myModal').modal('hide')
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //继电器工作模式切换
        addControl(){
            var that = this
            if(that.value3==''){
                that.$message({
                    message: '请选择工作模式!',
                    type: 'warning'
                });
                return;
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/pattern/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:that.value3,
                    relayId:that.site[0].id
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '模式切换成功',
                            type: 'success'
                        });
                        that.dialogVisible = false
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求继电器所有通道信息
        passageway(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/channel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    relayId:that.site[0].id,
                    nickName:'',
                    channelType:'1'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.myModalData = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求继电器通道详情
        details(val){
            $('#myModal2').modal('show')
            var that = this;
            that.myModalData2 = []
            that.myModalData3 = []
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/channel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    relayId:val,
                    nickName:'',
                    channelType:''
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.list.length;i++){
                            if(data.result.list[i].channelType=='0'){
                                that.myModalData2.push(data.result.list[i])
                            }
                            if(data.result.list[i].channelType=='1'){
                                that.myModalData3.push(data.result.list[i])
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //点击场景管理跳转场景页面
        sceneRouter(){
            this.$router.push({'path':'/scene'})
        },
        //继电器列表请求
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    concentratorSn:'',
                    relayNumber:that.relayNumber,
                    online:that.value,
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        SelectionChange(val){this.site = val;},
        currentchange(val){this.pageIndex = val;this.ready();},
        sizechange(val){this.pageSize = val;this.ready()},
        search(){this.ready();},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='addRelay'){
                                that.addRelay = true
                            }
                            if(data.result.operats[i].code=='editRelay'){
                                that.editRelay = true
                            }
                            if(data.result.operats[i].code=='delRelay'){
                                that.delRelay = true
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
    }
}
</script>
<style scoped> 
.Required{color: red;font-size: 17px;}
.Relay{width: 100%;height: 100%;}
.Relay>div{width: 100%;position: absolute;}
.Relay_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.Relay_top>button{height:33px;margin:8px 0 0 10px;}
.Relay_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.Relay_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.Relay_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}

.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.block{text-align: center;}
</style>
