<template>
    <!-- 摄像头日志 -->
    <div class="CameraLog">
        <div class="CameraLog_top">
            <div class="search">
                <span>名称:</span>
                <input type="text" v-model="nickName" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
            </div>
            <div class="search">
                <span>IP:</span>
                <input type="text" v-model="ipAddress" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入IP">
            </div>
            <template v-if="type=='115'">
                <div class="search">
                    <span>操作类别:</span>
                    <el-select v-model="value" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </template>
            <template v-if="type=='116'">
                <div class="search">
                    <span>操作类型:</span>
                    <el-select v-model="value1" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </template>
            <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="CameraLog_bottom">
            <template v-if="type=='115'">
                <el-table
                    :data="tableData"
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
                    prop="createUser"
                    align='center'
                    label="操作用户"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="名称"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="ipAddress"
                    align='center'
                    label="IP"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    align='center'
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
                    align='center'
                    label="操作状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatStatus=='0'">成功</span>
                            <span v-if="scope.row.operatStatus=='1'">失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    align='center'
                    label="操作内容"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="操作时间"
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
            </template>
            <template v-if="type=='116'">
                <el-table
                    :data="tableData"
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
                    prop="createUser"
                    align='center'
                    label="操作用户"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="名称"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="ipAddress"
                    align='center'
                    label="IP"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操控类别"
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
                    align='center'
                    label="操控状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.controlStatus=='0'">成功</span>
                            <span v-if="scope.row.controlStatus=='1'">失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="操作时间"
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
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CameraLog',
    data () {
        return {
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
                },{
                value: '3',
                label: '启用/禁用'
                },{
                value: '4',
                label: '审核'
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
.CameraLog{width: 100%;height: 100%;}
.CameraLog>div{width: 100%;position:absolute;}
.CameraLog_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;line-height: 46px;padding-left: 15px;}
.CameraLog_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}

.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 110px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 110px;}
.block{text-align: center;}
</style>
