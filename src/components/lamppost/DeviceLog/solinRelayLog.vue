<template>
    <!-- 继电器日志 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备日志>继电器日志</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='名称';types='1';">名称</el-dropdown-item>
                            <el-dropdown-item v-if="type=='99'" @click.native="name='操作模块';types='2';">操作模块</el-dropdown-item>
                            <el-dropdown-item v-if="type=='99'" @click.native="name='操作类型';types='3';">操作类型</el-dropdown-item>
                            <el-dropdown-item v-if="type=='100'" @click.native="name='控制类型';types='4';">控制类型</el-dropdown-item>
                            <el-dropdown-item v-if="type=='100'" @click.native="name='控制状态';types='5';">控制状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                            <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </template>
                        <template v-if="types=='2'">
                            <el-select v-model="value" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='3'">
                            <el-select v-model="value1" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='4'">
                            <el-select v-model="value2" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='5'">
                            <el-select v-model="value3" clearable size='small' placeholder="请选择">
                                <el-option
                                v-for="item in options3"
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
            <template v-if="type=='99'">
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
                        min-width="55">
                        </el-table-column>
                        <el-table-column
                        prop="createUser"
                        show-overflow-tooltip
                        label="操作用户"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        show-overflow-tooltip
                        label="设备名称"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="relayNumber"
                        show-overflow-tooltip
                        label="地址"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        prop="concentratorSn"
                        show-overflow-tooltip
                        label="集中器序列号"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作模块"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='1'">继电器</span>
                                <span v-if="scope.row.operatModule=='2'">通道</span>
                                <span v-if="scope.row.operatModule=='3'">场景</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="操作类型"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                                <span v-if="scope.row.operatType=='3'">启用</span>
                                <span v-if="scope.row.operatType=='4'">禁用</span>
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
            <template v-if="type=='100'">
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
                        min-width="55">
                        </el-table-column>
                        <el-table-column
                        prop="createUser"
                        show-overflow-tooltip
                        label="操作用户"
                        min-width="145">
                        </el-table-column>
                        <el-table-column
                        prop="nickName"
                        show-overflow-tooltip
                        label="设备名称"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        prop="relayNumber"
                        show-overflow-tooltip
                        label="地址"
                        min-width="130">
                        </el-table-column>
                        <el-table-column
                        prop="concentratorSn"
                        show-overflow-tooltip
                        label="集中器序列号"
                        min-width="100">
                        </el-table-column>
                        <el-table-column
                        show-overflow-tooltip
                        label="控制类型"
                        min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='3'">多控开启</span>
                                <span v-if="scope.row.controlType=='4'">多控关闭</span>
                                <span v-if="scope.row.controlType=='7'">切换正常工作模式</span>
                                <span v-if="scope.row.controlType=='8'">切换联动模式</span>
                                <span v-if="scope.row.controlType=='9'">场景控制</span>
                                <span v-if="scope.row.controlType=='10'">清空场景控制</span>
                                <span v-if="scope.row.controlType=='11'">状态查询</span>
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
    name: 'lamppost',
    data () {
        return {
            name:'名称',
            types:'1',
            serverurl:localStorage.serverurl,
            type:'',
            tableData:[],
            pageIndex:1,
            pageSize:10,
            total:50,
            nickName:'',
            options:[
                {
                value: '1',
                label: '继电器'
                },{
                value: '3',
                label: '场景'
                }
            ],
            value:'',
            options1:[
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
                label: '启用'
                },{
                value: '4',
                label: '禁用'
                }
            ],
            value1:'',
            options2:[
                {
                value: '3',
                label: '多控开启'
                },{
                value: '4',
                label: '多控关闭'
                },{
                value: '11',
                label: '状态查询'
                },{
                value: '7',
                label: '切换正常工作模式'
                },{
                value: '8',
                label: '切换联动模式'
                },{
                value: '9',
                label: '场景控制'
                },{
                value: '10',
                label: '清空场景控制'
                }
            ],
            value2:'',
            options3:[
                {
                value: '0',
                label: '成功'
                },{
                value: '1',
                label: '失败'
                }
            ],
            value3:'',
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.value = ''
            this.value1 = ''
            this.value2 = ''
            this.value3 = ''
        },
        ready(){
            var that = this;
            var url = ''
            var data = {
                projectIds:sessionStorage.projectId,
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName
            }
            data.concentratorSn = ''
            data.relayNumber = ''
            if(this.type=='99'){
                url='/v1/solin/relay/log/operation'
                data.operatModule = that.value
                data.operatType = that.value1
            }
            if(this.type=='100'){
                url='/v1/solin/relay/log/control'
                data.controlType = that.value2
                data.controlStatus = that.value3
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
    created(){
        this.type = this.$route.query.id
        this.ready()
    }
}
</script>
<style scoped>

</style>
