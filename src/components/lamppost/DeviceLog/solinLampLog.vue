<template>
    <!-- 灯具日志 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备日志>灯具日志</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='序列号';types='1';">序列号</el-dropdown-item>
                            <el-dropdown-item v-if="type=='93'" @click.native="name='日志模块';types='2';">日志模块</el-dropdown-item>
                            <el-dropdown-item v-if="type=='93'" @click.native="name='操作类别';types='3';">操作类别</el-dropdown-item>
                            <el-dropdown-item v-if="type=='94'" @click.native="name='操作类别';types='4';">操作类别</el-dropdown-item>
                            <el-dropdown-item v-if="type=='94'" @click.native="name='操作状态';types='5';">操作状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="types=='2'&&type=='93'">
                            <el-select v-model="value2" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='3'&&type=='93'">
                            <el-select v-model="value" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='4'&&type=='94'">
                            <el-select v-model="value5" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='5'&&type=='94'">
                            <el-select v-model="value6" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options6"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div>
                        <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                    </div>
                </div>
            </div>
            <template v-if="type=='93'">
                <div>
                    <el-table
                        :data="tableData"
                        border
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="createUser"
                        show-overflow-tooltip
                        label="操作用户"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        show-overflow-tooltip
                        label="设备名称"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        show-overflow-tooltip
                        label="序列号"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作模块"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='0'">单灯</span>
                                <span v-if="scope.row.operatModule=='1'">单灯策略</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                                <span v-if="scope.row.operatType=='3'">绑定灯杆</span>
                                <span v-if="scope.row.operatType=='4'">解绑灯杆</span>
                                <span v-if="scope.row.operatType=='5'">绑定项目</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        show-overflow-tooltip
                        label="操作时间"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="操作明细"
                        show-overflow-tooltip>
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
            </template>
            <template v-if="type=='94'">
                <div>
                    <el-table
                        :data="tableData"
                        border
                        size='small'
                        tooltip-effect="dark"
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="createUser"
                        show-overflow-tooltip
                        label="操作用户"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        show-overflow-tooltip
                        label="设备名称"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        show-overflow-tooltip
                        label="序列号"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="控制类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='1'">开启</span>
                                <span v-if="scope.row.controlType=='2'">关闭</span>
                                <span v-if="scope.row.controlType=='3'">调光</span>
                                <span v-if="scope.row.controlType=='4'">刷新状态</span>
                                <span v-if="scope.row.controlType=='5'">下发策略</span>
                                <span v-if="scope.row.controlType=='6'">清空策略</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="控制状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlStatus=='0'" class="onLine">成功</span>
                                <span v-if="scope.row.controlStatus=='1'" class="Warning">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        show-overflow-tooltip
                        label="控制时间"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="控制明细"
                        show-overflow-tooltip>
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
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            name:'序列号',
            types:'1',
            serverurl:localStorage.serverurl,
            type:'',
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            serialNumber:'',
            options:[{
                value: '0',
                label: '添加'
                },{
                value: '1',
                label: '编辑'
                },{
                value: '2',
                label: '删除'
                },{
                value: '3',
                label: '绑定灯杆'
                },{
                value: '4',
                label: '解绑灯杆'
                },{
                value: '5',
                label: '绑定项目'
                },
            ],
            value:'',
            options2:[{
                value: '0',
                label: '单灯'
                },{
                value: '1',
                label: '单灯策略'
            }],
            value2:'',
            options3:[{
                value: '1',
                label: '故障'
                }
            ],
            value3:'',
            options4:[{
                value: '1',
                label: '紧急'
                }
            ],
            value4:'',
            options5:[
                {
                    value: '1',
                    label: '开启'
                },
                {
                    value: '2',
                    label: '关闭'
                },
                {
                    value: '3',
                    label: '调光'
                },
                {
                    value: '4',
                    label: '刷新状态'
                },
                {
                    value: '5',
                    label: '下发策略'
                },
                {
                    value: '6',
                    label: '清空策略'
                }
            ],
            value5:'',
            options6:[
                {
                    value: '0',
                    label: '成功'
                },
                {
                    value: '1',
                    label: '失败'
                }
            ],
            value6:'',
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.serialNumber=''
            this.value = ''
            this.value2 = ''
            this.value5 = ''
            this.value6 = ''
        },
        search(){
            this.ready()
        },
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize
            };
            var url = '';
            data.projectIds = sessionStorage.projectId
            data.serialNumber = this.serialNumber
            if(this.type=='93'){
                url='/v1/solin/lighting/lamp/log/operation'
                data.operatType = this.value
                data.operatModule = this.value2
            }
            if(this.type=='94'){
                url='/v1/solin/lighting/lamp/log/control'
                data.controlType = that.value5
                data.controlStatus = that.value6
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
                        that.tableData = data.result.list;
                        that.total = Number(data.result.total)
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        currentchange(val){
            this.pageIndex = val;
            this.ready()
        },
        sizechange(val){
            this.pageSize = val;
            this.ready()
        },
    },
    created() {
        var that = this
        this.type = this.$route.query.id
        this.ready()
    },
}
</script>
<style scoped>

</style>