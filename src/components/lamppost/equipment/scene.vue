<template>
    <!-- 场景管理 -->
    <div class="scene">
        <div class="scene_top">
            <el-button @click="backtrack" type="success" plain icon='el-icon-arrow-left' size='small'>返回</el-button>
            <el-button @click="sceneOperation(0)" type="primary" icon='el-icon-plus' size='small'>添加场景</el-button>
            <el-button @click="sceneOperation(1)" type="primary" icon="el-icon-edit" size='small'>编辑场景</el-button>
            <el-button @click="sceneOperation(2)" type="primary" icon='el-icon-delete' size='small'>删除场景</el-button>
        </div>
        <div class="scene_bottom">
            <div class="scene_bottom_top">
                <div class="search">
                    <label style="width:90px;">场景名字:</label>
                    <input v-model="nickName" type="text" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入场景名字">
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="scene_bottom_bottom">
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
                    label="场景名称"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    :formatter="formatRole"
                    label="集中器序列号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="relayCount"
                    align='center'
                    :formatter="formatRole"
                    label="包含继电器数量"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="下发状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sendStatus=='0'">未下发</span>
                            <span v-if="scope.row.sendStatus=='1'">已下发</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    :formatter="formatRole"
                    label="创建时间"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操作"
                    :formatter="formatRole"
                    min-width="170"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button @click="details(scope.row.id)" type="primary" size='mini'>详情</el-button>
                            <el-button @click="Lowerhair(scope.row.id)" type="primary" size='mini'>下发</el-button>
                            <template v-if="scope.row.status=='0'">
                                <el-button @click="status(scope.row.id,scope.row.status)" type="primary" size='mini'>启用</el-button>
                            </template>
                            <template v-if="scope.row.status=='1'">
                                <el-button @click="status(scope.row.id,scope.row.status)" type="danger" size='mini'>禁用</el-button>
                            </template>
                        </template>
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
        <!-- 添加场景 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:650px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="type=='0'" class="modal-title" id="myModalLabel">添加继电器场景</h4>
                        <h4 v-if="type=='1'" class="modal-title" id="myModalLabel">编辑继电器场景</h4>
                    </div>
                    <div class="modal-body">
                        <div class="sceneDataTop">
                            <span><span class="Required">*</span>场景名称:</span>
                            <input v-model="nickName_s" type="text" style="width:156px;" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入场景名称">
                            <span style="margin-left:10px;"><span class="Required">*</span>集中器:</span>
                            <el-select v-model="value" @change="optionsChange" size='small' style='width:176px;' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.concentratorSn"
                                :label="item.concentratorName"
                                :value="item.concentratorSn">
                                    <span style="float: left">{{ item.concentratorName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.concentratorSn }}</span>
                                </el-option>
                            </el-select>
                        </div>
                        <div class="sceneDataCenter">
                            <div>继电器信息:</div>
                            <div>
                                <el-table
                                    :data="tableData2"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow:auto;height:auto;">
                                    <el-table-column
                                    align='center'
                                    label="继电器名称"
                                    min-width="80">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.relayVO.nickName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="继电器地址"
                                    min-width="80">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.relayVO.relayNumber}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="继电器型号"
                                    min-width="80">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.relayVO.modelName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="creatime"
                                    align='center'
                                    label="输入通道数量"
                                    min-width="80">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.relayVO.inputChannelTotal}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="creatime"
                                    align='center'
                                    label="输出通道数量"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span>{{scope.row.relayVO.outputChannelTotal}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="sceneDataBottom">
                            <div>
                                通道设置:
                                <el-button @click="addPassageway" type="primary" size='mini'>添加</el-button>
                            </div>
                            <div>
                                <el-table
                                    :data="tableData3"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow:auto;height:auto;">
                                    <el-table-column
                                    align='center'
                                    label="控制条件"
                                    min-width="190">
                                        <template slot-scope="scope">
                                            <el-button @click="SetupInput(scope,0)" type="primary" size='mini'>设置</el-button>
                                            <span v-if='scope.row.controlType=="1"'>时间控制-{{scope.row.controlTime}}</span>
                                            <span v-if='scope.row.controlType=="2"'>
                                                输入控制/{{scope.row.relayName}}/{{scope.row.inputChannelName}}/
                                                <template v-if="scope.row.inputState=='3'">有效</template>
                                                <template v-if="scope.row.inputState=='4'">无效</template>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="输出"
                                    min-width="110">
                                        <template slot-scope="scope">
                                            <el-button type="primary" @click="SetupInput(scope,1)" size='mini'>详情</el-button>
                                            <el-button type="primary" @click="SetupInput(scope,2)" size='mini'>设置</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="操作"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <el-button @click="SetupInput(scope,3)" type="primary" size='mini'>删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="sceneSubmit" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 通道设置-输入接口 -->
        <el-dialog
            title="输入通道设置"
            :visible.sync="dialogVisible"
            width="50%">
            <span>
                <div>
                    <span>控制类别:</span>
                    <el-select v-model="value2" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="value2=='1'" style="margin-top:20px;text-align:center;">
                    <el-time-picker
                        v-model="time"
                        size='small'
                        value-format='HH:mm'
                        placeholder="任意时间点">
                    </el-time-picker>
                </div>
                <div v-if="value2=='2'" style="margin-top:10px;max-height:250px;overflow:auto;">
                    <el-table
                        :data="tableData4"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        @selection-change="tableData4Change"
                        style="width: 100%;overflow:auto;height:auto;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="relayName"
                        align='center'
                        label="继电器名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        align='center'
                        label="通道名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="channelNumber"
                        align='center'
                        label="通道编号"
                        min-width="60">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="输入状态"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.inputState" size="mini" placeholder="请选择">
                                    <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="inputSubmit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 通道设置-输出接口 -->
        <el-dialog
            title="输出通道设置"
            :visible.sync="dialogVisible2"
            width="50%">
            <span>
                <div style="max-height:250px;overflow:auto;">
                    <el-table
                        :data="tableData5"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        @selection-change="tableData5Change"
                        style="width: 100%;overflow:auto;height:auto;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="relayName"
                        align='center'
                        label="继电器名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        align='center'
                        label="通道名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="channelNumber"
                        align='center'
                        label="通道编号"
                        min-width="60">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="输出状态"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.outputState" size="mini" placeholder="请选择">
                                    <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button @click="outputSubmit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 通道设置-输出详情 -->
        <el-dialog
            title="输出通道详情"
            :visible.sync="dialogVisible3"
            width="50%">
            <span>
                <div style="max-height:250px;overflow:auto;">
                    <el-table
                        :data="tableData6"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;">
                        <el-table-column
                        prop="relayName"
                        align='center'
                        label="继电器名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        align='center'
                        label="通道名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="channelNumber"
                        align='center'
                        label="通道编号"
                        min-width="60">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="输出状态"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.outputState=='1'">开启</span>
                                <span v-if="scope.row.outputState=='2'">关闭</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">关 闭</el-button>
            </span>
        </el-dialog>
        <!-- 场景通道详情 -->
        <el-dialog
            title="场景通道详情"
            :visible.sync="dialogVisible4"
            width="50%">
            <span>
                <div style="max-height:300px;overflow:auto;">
                    <el-table
                        :data="tableData3"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table
                                :data=props.row.relaySceneOutputDTOs
                                border
                                size='mini'
                                style="width: 100%;">
                                    <el-table-column
                                    prop="relayName"
                                    label="继电器名称"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    prop="nickName"
                                    label="通道名称"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    prop="channelNumber"
                                    label="通道编号"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    label="输出状态"
                                    align='center'>
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.outputState=='1'">开启</span>
                                            <span v-if="scope.row.outputState=='2'">关闭</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="控制类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='1'">时间控制</span>
                                <span v-if="scope.row.controlType=='2'">输入通道控制</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        align='center'
                        label="控制详情">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='1'">{{scope.row.controlTime}}</span>
                                <span v-if="scope.row.controlType=='2'">
                                    {{scope.row.relayName}}/{{scope.row.nickName}}/
                                    <template v-if="scope.row.inputState=='3'">有效</template>
                                    <template v-if="scope.row.inputState=='4'">无效</template>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'scene',
    data () {
        return {
            serverurl:localStorage.serverurl, 
            tableData:[],
            site:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            //添加,编辑
            type:'0',
            nickName_s:'',
            value:'',
            options:[],
            tableData2:[],
            tableData3:[],
            //输入通道
            $index:'',//点击操作的下标
            dialogVisible:false,
            dialogVisible2:false,
            dialogVisible3:false,
            dialogVisible4:false,
            options2:[
                {
                    label:'时间选择',
                    value:1
                },
                {
                    label:'输入控制',
                    value:2
                }
            ],
            value2:'',
            time:'',
            tableData4:[],
            site4:[],
            options3:[
                {
                    label:'有效',
                    value:3
                },
                {
                    label:'无效',
                    value:4
                }
            ],
            tableData5:[],
            site5:[],
            options4:[
                {
                    label:'开启',
                    value:1
                },
                {
                    label:'关闭',
                    value:2
                }
            ],
            tableData6:[],//详情
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
        //点击  添加,编辑,删除按钮
        sceneOperation(val){
            var that = this;
            if(val=='0'){
                that.type = '0'
                this.concentratorSnData()
                this.nickName_s = ''
                this.value = ''
                this.tableData2 = []
                this.tableData3 = []
                this.tableData4 = []
                this.tableDat5 = []
                this.site4 = []
                this.site5 = []
                this.value2 = ''
                this.time = ''
                $('#myModal').modal('show')
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择单个场景进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.type = '1'
                this.concentratorSnData()
                this.scenedetailed()
                this.nickName_s = this.site[0].nickName
                this.value = this.site[0].concentratorSn
                this.optionsChange()
                $('#myModal').modal('show')
            }
            if(val=='2'){
                if(this.site.length=='0'){
                    this.$message({
                        message: '请选择场景进行删除!',
                        type: 'warning'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.site.length;i++){
                    arr.push(that.site[i].id)
                }
                this.$confirm('是否删除所选场景？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/relay/scene/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify({
                            relayScenes:arr
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
        //添加  编辑  保存
        sceneSubmit(){
            var that = this;
            if(this.nickName_s==''){
                this.$message({
                    message: '场景名称不能为空!',
                    type: 'error'
                });
                return;
            }
            if(this.tableData3.length==0){
                this.$message({
                    message: '请设置通道信息!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            var type = ''
            if(this.type=='0'){type='post';}
            if(this.type=='1'){type='put';data.id=this.site[0].id;}
            data.nickName = this.nickName_s
            data.concentratorSn = this.value
            data.projectId = sessionStorage.projectId
            data.sceneList = this.tableData3
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
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
        //请求场景详细信息
        scenedetailed(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene/'+that.site[0].id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3 = data.result
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //点击查看场景通道详情
        details(val){
            var that = this;
            that.dialogVisible4 = true
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene/'+val,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3 = data.result
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //集中器序列号
        concentratorSnData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/concentrator',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    relayUsed:'1',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //集中器change事件
        optionsChange(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/device/'+that.value,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i=0;i<data.result.length;i++){
                            for(var j=0;j<data.result[i].inputChannelList.length;j++){
                                data.result[i].inputChannelList[j].relayName = data.result[i].relayVO.nickName
                            }
                            for(var s=0;s<data.result[i].outputChannelList.length;s++){
                                data.result[i].outputChannelList[s].relayName = data.result[i].relayVO.nickName
                            }
                        }
                        that.tableData2 = data.result
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //通道设置--添加
        addPassageway(){
            if(this.tableData2.length==0){
                this.$message({
                    message: '无通道信息不能添加',
                    type: 'error'
                });
                return;
            }
            this.tableData3.push(
                {
                    controlTime:'',
                    controlType:'',
                    inputChannelId:'',
                    inputState:'',
                    nickName:'',
                    relaySceneOutputDTOs:[]
                }
            )
        },
        //控制条件--点击设置||输出--详情--点击设置||操作--删除
        SetupInput(val,index){
            this.$index = val.$index
            if(index=='0'){
                var arr = []
                for(var i = 0;i<this.tableData2.length;i++){
                    for(var j = 0;j<this.tableData2[i].inputChannelList.length;j++){
                        arr.push(this.tableData2[i].inputChannelList[j])
                    }
                }
                this.tableData4 = arr
                this.dialogVisible = true;
                console.log(this.tableData4)
            }
            if(index=='1'){
                this.tableData6 = this.tableData3[val.$index].relaySceneOutputDTOs
                this.dialogVisible3 = true;
            }
            if(index=='2'){
                var arr = []
                for(var i = 0;i<this.tableData2.length;i++){
                    for(var j = 0;j<this.tableData2[i].outputChannelList.length;j++){
                        arr.push(this.tableData2[i].outputChannelList[j])
                    }
                }
                this.tableData5 = arr
                this.dialogVisible2 = true;
            }
            if(index=='3'){
                this.tableData3.splice(val.$index,1)
            }
        },
        tableData4Change(val){this.site4 = val},
        tableData5Change(val){this.site5 = val},
        //输入通道点击确定
        inputSubmit(){
            if(this.value2==''){
                this.$message({
                    message: '请选择控制类别!',
                    type: 'error'
                });
                return;
            }
            if(this.value2==1){
                if(this.time==''){
                    this.$message({
                        message: '请选择时间点!',
                        type: 'error'
                    });
                    return;
                }
                this.tableData3[this.$index].controlTime = this.time
            }
            if(this.value2==2){
                if(this.site4.length==0||this.site4.length>=2){
                    this.$message({
                        message: '请选择单个输入通道!',
                        type: 'error'
                    });
                    return;
                }
                if(this.site4[0].inputState==''||this.site4[0].inputState==undefined){
                    this.$message({
                        message: '请选择通道输入状态!',
                        type: 'error'
                    });
                    return;
                }
                this.tableData3[this.$index].inputChannelId = this.site4[0].id
                this.tableData3[this.$index].inputState = this.site4[0].inputState
                this.tableData3[this.$index].relayId = this.site4[0].relayId
                this.tableData3[this.$index].relayName = this.site4[0].relayName
                this.tableData3[this.$index].inputChannelName = this.site4[0].nickName
            }
            this.tableData3[this.$index].controlType = this.value2
            this.dialogVisible = false;
        },
        //输出通道点击确定
        outputSubmit(){
            this.tableData3[this.$index].relaySceneOutputDTOs = [];
            for(var i=0;i<this.site5.length;i++){
                if(this.site5[i].outputState==''||this.site5[i].outputState==undefined){
                    this.$message({
                        message: '请选择输出通道的输出状态!',
                        type: 'error'
                    });
                    return;
                }
            }
            for(var j=0;j<this.site5.length;j++){
                this.tableData3[this.$index].relaySceneOutputDTOs.push({
                    outputChannelId:this.site5[j].id,
                    outputState:this.site5[j].outputState,
                    nickName:this.site5[j].nickName,
                    channelNumber:this.site5[j].channelNumber,
                    relayId:this.site5[j].relayId,
                    relayName:this.site5[j].relayName,
                })
            }
            this.dialogVisible2 = false;
        },
        //启用,禁用
        status(id,val){
            var that = this;
            var data = {}
            if(val=='0'){
                data.command = '2'
            }
            if(val=='1'){
                data.command = '1'
            }
            data.sceneId = id
            $.ajax({
                type:'put',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene/status',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        if(val=='0'){
                            that.$message({
                                message: '启用成功',
                                type: 'success'
                            });
                        }
                        if(val=='1'){
                            that.$message({
                                message: '禁用成功',
                                type: 'success'
                            });
                        }
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //下发
        Lowerhair(id){
            var that = this;
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:'1',
                    relaySceneId:id
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '下发成功',
                            type: 'success'
                        });
                        that.ready()
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //场景列表请求
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/relay/scene',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
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
        //返回上一级
        backtrack(){this.$router.go(-1)}
    },
    created(){
        this.tableData = []
        console.log(123456789)
        this.ready()
    }
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.scene{width: 100%;height: 100%;}
.scene>div{width: 100%;position: absolute;}
.scene_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.scene_top>button{height:33px;margin:8px 0 0 10px;}
.scene_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.scene_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.scene_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}

.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
.block{text-align: center;}

.sceneDataTop{display: flex;}
.sceneDataTop>span{display: inline-block;padding-top:8px;}
.sceneDataCenter{width: 100%;max-height: 150px;border: 1px solid #E4E4F1;margin-top:10px;overflow: auto;}
.sceneDataBottom{width: 100%;max-height: 250px;border: 1px solid #E4E4F1;margin-top:10px;overflow: auto;}
</style>
