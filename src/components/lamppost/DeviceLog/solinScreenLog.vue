<template>
    <!-- 广告屏日志 -->
    <div class="screenJournal">
        <div class="screenJournal_top">
            <div class="search">
                <span>屏幕序列号:</span>
                <input type="text" v-model="serialNumber" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入屏幕序列号">
            </div>
            <template v-if="type=='95'">
                <div class="search">
                    <span>操作模块:</span>
                    <el-select v-model="value3" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
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
                <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
            </template>
            <template v-if="type=='96'">
                <div class="search">
                    <span>操作状态:</span>
                    <el-select v-model="value1" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <span>操作类别:</span>
                    <el-select v-model="value2" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
            </template>
        </div>
        <div class="screenJournal_bottom">
            <template v-if="type=='95'">
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
                    min-width="55">
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
                    label="设备名称"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操做模块"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatModule=='0'">屏幕</span>
                            <span v-if="scope.row.operatModule=='1'">节目</span>
                            <span v-if="scope.row.operatModule=='2'">媒体</span>
                            <span v-if="scope.row.operatModule=='3'">任务</span>
                            <span v-if="scope.row.operatModule=='4'">定时信息</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操做类别"
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
                    align='center'
                    label="操作时间"
                    min-width="145">
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="控制明细"
                    align='center'
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
            <template v-if="type=='96'">
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
                    label="设备名称"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="控制类别"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.controlType=='0'">下发任务</span>
                            <span v-if="scope.row.controlType=='1'">开</span>
                            <span v-if="scope.row.controlType=='2'">关</span>
                            <span v-if="scope.row.controlType=='3'">设置亮度</span>
                            <span v-if="scope.row.controlType=='4'">设置音量</span>
                            <span v-if="scope.row.controlType=='5'">查询状态</span>
                            <span v-if="scope.row.controlType=='6'">截图</span>
                            <span v-if="scope.row.controlType=='7'">重启</span>
                            <span v-if="scope.row.controlType=='8'">app更新</span>
                            <span v-if="scope.row.controlType=='9'">清空定时信息</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="控制状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.controlStatus=='0'">成功</span>
                            <span v-if="scope.row.controlStatus=='1'">失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    align='center'
                    label="控制时间"
                    min-width="145">
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="控制明细"
                    align='center'
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
    name: 'lamppost',
    data () {
        return {
            serverurl:localStorage.serverurl,
            type:'',
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:50,
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
            options1:[{
                value: '0',
                label: '成功'
                },{
                value: '1',
                label: '失败'
                }
            ],
            value1:'',
            options2:[
                {
                value: '0',
                label: '下发任务'
                },
                {
                value: '1',
                label: '开'
                },
                {
                value: '2',
                label: '关'
                },
                {
                value: '3',
                label: '设置亮度'
                },
                {
                value: '4',
                label: '设置音量'
                },
                {
                value: '5',
                label: '查询状态'
                },
                {
                value: '6',
                label: '截图'
                },
                {
                value: '7',
                label: '重启'
                },
                {
                value: '8',
                label: 'app更新'
                },
                {
                value: '9',
                label: '清空定时信息'
                },
                {
                value: '11',
                label: '同步播放'
                },
            ],
            value2:'',
            options3:[{
                value: '0',
                label: '屏幕'
                },{
                value: '1',
                label: '节目'
                },{
                value: '2',
                label: '媒体'
                },
                {
                value: '3',
                label: '任务'
                },
                {
                value: '4',
                label: '定时信息'
                },
            ],
            value3:'',
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
        ready(){
            var that = this;
            var url = ''
            var data = {
                projectIds:sessionStorage.projectId,
                serialNumber:this.serialNumber,
                page:that.pageIndex,
                size:that.pageSize
            }
            if(this.type=='95'){
                url='/v1/solin/screen/log/operation'
                data.operatType = this.value
                data.operatModule = this.value3
            }
            if(this.type=='96'){
                url='/v1/solin/screen/log/control'
                data.controlStatus = this.value1
                data.controlType = this.value2
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
        search(){
            this.ready()
        },
        sizechange(val){this.pageSize=val;this.ready();},
        currentchange(val){this.pageIndex=val;this.ready();},
    },
    created() {
        this.type = this.$route.query.id
        this.ready()
    },
}
</script>  
<style scoped>
.screenJournal{width: 100%;height: 100%;}
.screenJournal>div{width: 100%;position:absolute;}
.screenJournal_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;line-height: 46px;padding-left: 15px;}
.screenJournal_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}


.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 110px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 110px;}

.block{text-align: center;}
</style>