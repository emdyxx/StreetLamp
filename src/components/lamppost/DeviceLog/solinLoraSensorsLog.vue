<template>
    <!-- lora日志 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备日志>lora传感器日志</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';types='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="name='序列号';types='2';">序列号</el-dropdown-item>
                            <el-dropdown-item @click.native="name='操作类型';types='3';">操作类型</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </template>
                        <template v-if="types=='2'">
                            <input type="text" v-model="serialNumber" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </template>
                        <template v-if="types=='3'">
                            <el-select v-model="value" clearable size='small' style="width:126px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            name:'名称',
            types:'1',
            serverurl:localStorage.serverurl,
            serialNumber:'',
            nickName:'',
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
                }
            ],
            value:'',
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:10,
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber = ''
            this.value = ''
        },
        search(){
            this.ready()
        },
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/sensor/log/operation',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    serialNumber:that.serialNumber,
                    nickName:that.nickName,
                    operatType:that.value,
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list;
                        that.total = data.result.total;
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
        this.ready()
    },
}
</script>
<style scoped>

</style>