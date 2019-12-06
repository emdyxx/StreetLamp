<template>
    <!-- 摄像头日志 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备日志>摄像头日志</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';types='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='IP';types='2';">IP</el-dropdown-item>
                            <el-dropdown-item v-if="type=='115'" @click.native="name='操作类别';types='3';">操作类别</el-dropdown-item>
                            <el-dropdown-item v-if="type=='116'" @click.native="name='控制类别';types='4';">控制类别</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </template>
                        <template v-if="types=='2'">
                            <input type="text" v-model="ipAddress" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入IP">
                        </template>
                        <template v-if="types=='3'&&type=='115'">
                            <el-select v-model="value" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='4'&&type=='116'">
                            <el-select v-model="value1" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options1"
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
            <template v-if="type=='115'">
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
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        prop="ipAddress"
                        show-overflow-tooltip
                        label="IP"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作状态"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatStatus=='0'" class="onLine">成功</span>
                                <span v-if="scope.row.operatStatus=='1'" class="Warning">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        show-overflow-tooltip
                        label="操作时间"
                        min-width="150">
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
            <template v-if="type=='116'">
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
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="ipAddress"
                        show-overflow-tooltip
                        label="IP"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="控制类别"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='1'">预览</span>
                                <span v-if="scope.row.controlType=='11'">焦距变大</span>
                                <span v-if="scope.row.controlType=='12'">焦距变小</span>
                                <span v-if="scope.row.controlType=='13'">焦点前调</span>
                                <span v-if="scope.row.controlType=='14'">焦点后调</span>
                                <span v-if="scope.row.controlType=='15'">光圈扩大</span>
                                <span v-if="scope.row.controlType=='16'">光圈缩小</span>

                                <span v-if="scope.row.controlType=='21'">云台上仰</span>
                                <span v-if="scope.row.controlType=='22'">云台下仰</span>
                                <span v-if="scope.row.controlType=='23'">云台左转</span>
                                <span v-if="scope.row.controlType=='24'">云台右转</span>
                                <span v-if="scope.row.controlType=='25'">云台上仰和左转</span>
                                <span v-if="scope.row.controlType=='26'">云台上仰和右转</span>
                                <span v-if="scope.row.controlType=='27'">云台下俯和左转</span>
                                <span v-if="scope.row.controlType=='28'">云台下俯和右转</span>
                                <span v-if="scope.row.controlType=='29'">云台左右自动扫描</span>
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
                        min-width="150">
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
    name: 'CameraLog',
    data () {
        return {
            name:'名称',
            types:'1',
            serverurl:localStorage.serverurl,
            type:'',
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:10,
            nickName:'',
            ipAddress:'',
            options:[
                {
                value: '0',
                label: '添加'
                },{
                value: '1',
                label: '编辑'
                },{
                value: '2',
                label: '删除'
                }
            ],
            value:'',
            options1:[
                {
                value: '1',
                label: '预览'
                },{
                value: '11',
                label: '焦距变大'
                },{
                value: '12',
                label: '焦距变小'
                },{
                value: '13',
                label: '焦点前调'
                },{
                value: '14',
                label: '焦点后调'
                },{
                value: '15',
                label: '光圈扩大'
                },{
                value: '16',
                label: '光圈缩小'
                },{
                value: '21',
                label: '云台上仰'
                },{
                value: '22',
                label: '云台下俯'
                },{
                value: '23',
                label: '云台左转'
                },{
                value: '24',
                label: '云台右转'
                },{
                value: '25',
                label: '云台上仰和左转'
                },{
                value: '26',
                label: '云台上仰和右转'
                },{
                value: '27',
                label: '云台下俯和左转'
                },{
                value: '28',
                label: '云台下俯和右转'
                },{
                value: '29',
                label: '云台左右自动扫描'
                },
            ],
            value1:'',
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.ipAddress = ''
            this.value = ''
            this.value1 = ''
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
            data.nickName = that.nickName
            data.ipAddress = that.ipAddress
            if(this.type=='115'){
                url='/v1/solin/camera/log/operat'
                data.operatType = that.value
            }
            if(this.type=='116'){
                url='/v1/solin/camera/log/control'
                data.controlType = that.value1
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
    }
}
</script>
<style scoped>

</style>
