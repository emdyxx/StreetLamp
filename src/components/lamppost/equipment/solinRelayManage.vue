<template>
    <!-- 继电器管理 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备操作>继电器操作</p>
            <div v-if="JurisdictionS.viewRelayStrategy">
                <span style="background: #4382e6;color:white;">继电器操作</span>
                <span @click="sceneRouter">场景管理</span>
            </div>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewRelayManage">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='地址';type='2';">地址</el-dropdown-item>
                            <el-dropdown-item @click.native="name='类型';type='3';">状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="type=='1'">
                            <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type=='2'">
                            <el-input type="number" v-model="relayNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                            <!-- <el-input-number v-model="relayNumber" size="small" :precision="0" :min="1" :max="253" label="请输入地址" style="width:200px;"></el-input-number> -->
                            <!-- <el-input v-model="relayNumber" size="small" placeholder="请输入地址" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
                        </template>
                        <template v-if="type=='3'">
                            <el-select v-model="value" clearable placeholder="请选择" size='small'>
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div>
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
                <div class="section_bottom_right">
                    <el-button @click="operation(1)" v-if="JurisdictionS.relayControl" size="small" type="primary" plain>查询最新数据</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="relayNumber"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="地址"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="在线状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="工作模式"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.pattern=='0'">正常</span>
                            <span v-if="scope.row.pattern=='1'">联动</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="relaySceneName"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="当前场景"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="通道状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <el-button @click="details(scope.row.id)" type="primary" size='mini'>详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="timestamp"
                    show-overflow-tooltip
                    label="采集时间"
                    :formatter="formatRole"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    v-if="JurisdictionS.relayControl"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-dropdown size="mini" trigger="click" split-button type="primary">
                                更多
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="operation(2,scope.row.id)">输出控制</el-dropdown-item>
                                    <el-dropdown-item @click.native="operation(3,scope.row.id)">工作模式切换</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
        <!-- 输出控制模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:550px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">继电器通道控制(输出通道)</h4>
                    </div>
                    <div class="modal-body" style="max-height:350px;overflow: auto;">
                        <el-table
                            :data="myModalData"
                            border
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;">
                            <el-table-column
                            align="center"
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            show-overflow-tooltip
                            label="通道名称"
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="channelNumber"
                            show-overflow-tooltip
                            label="通道编号"
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
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
        <!-- 工作模式模态框 -->
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
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;height:auto;">
                                <el-table-column
                                prop="nickName"
                                show-overflow-tooltip
                                label="通道名称"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="channelNumber"
                                show-overflow-tooltip
                                label="通道编号"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
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
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;height:auto;">
                                <el-table-column
                                prop="nickName"
                                show-overflow-tooltip
                                label="通道名称"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="channelNumber"
                                show-overflow-tooltip
                                label="通道编号"
                                :formatter="formatRole"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
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
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl, 
            JurisdictionS:{
                viewRelayManage:false,//查看继电器管理
                relayControl:false,//继电器控制
                viewRelayStrategy:false,//查看继电器场景
            },
            tableData:[],
            site:[],
            siteId:'',
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            relayNumber:'',
            value:'',
            options:[
                {
                    name:'在线',
                    id:'1'
                },
                {
                    name:'离线',
                    id:'0'
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
        handleCommand(){
            this.nickName=''
            this.relayNumber=''
            this.value=''
        },
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
        operation(val,id){
            var that = this;
            if(val=='1'){
                if(this.site.length==0){
                    this.$message({
                        message: '请选择继电器进行查询!',
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
                
                that.passageway(id)
                $('#myModal').modal('show')
            }
            if(val=='3'){
                that.siteId = id
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
                    relayId:that.siteId
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '模式切换成功',
                            type: 'success'
                        });
                        that.dialogVisible = false
                        that.siteId = ''
                        setTimeout(function(){
                            that.ready()
                        },2000)
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //请求继电器所有通道信息
        passageway(id){
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
                    relayIds:id,
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
                    relayIds:val,
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
                            if(data.result.operats[i].code=='viewRelayManage'){
                                that.JurisdictionS.viewRelayManage = true
                            }
                            if(data.result.operats[i].code=='relayControl'){
                                that.JurisdictionS.relayControl = true
                            }
                            if(data.result.operats[i].code=='viewRelayStrategy'){
                                that.JurisdictionS.viewRelayStrategy = true
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

</style>
