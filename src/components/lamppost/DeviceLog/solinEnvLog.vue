<template>
    <!-- 气象站日志 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备日志>气象站日志</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="name='集中器序列号';types='1';">集中器序列号</el-dropdown-item>
                            <el-dropdown-item @click.native="name='操作类别';types='2';">操作类别</el-dropdown-item>
                            <el-dropdown-item @click.native="name='操作状态';types='3';">操作状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="types=='1'">
                             <input type="text" v-model="concentratorSn" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </template>
                        <template v-if="types=='2'">
                            <el-select v-model="value" clearable size='small' style="width:126px;" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-if="types=='3'">
                            <el-select v-model="value1" clearable size='small' style="width:126px;" placeholder="请选择">
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
                    prop="username"
                    show-overflow-tooltip
                    label="操作用户"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    show-overflow-tooltip
                    label="地址"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    show-overflow-tooltip
                    label="集中器序列号"
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
            name:'集中器序列号',
            types:'1',
            serverurl:localStorage.serverurl,
            concentratorSn:'',
            options:[{
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
            options1:[{
                    value: '0',
                    label: '成功'
                },{
                    value: '1',
                    label: '失败'
                }
            ],
            value1:'',
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
            this.concentratorSn=''
            this.value1 = ''
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
                url:that.serverurl+'/v1/solin/sensor/env/log/operation',
                contentType:'application/json;charset=UTF-8',
                data:{
                    concentratorSn:that.concentratorSn,
                    operatType:that.value,
                    operatStatus:that.value1,
                    page:that.pageIndex,
                    size:that.pageSize,
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