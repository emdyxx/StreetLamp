<template>
    <!-- 气象站日志 -->
    <div class="section">
        <div class="section_top">
            <div class="search_Log">
                <span>集中器序列号:</span>
                <input type="text" v-model="concentratorSn" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
            </div>
            <div class="search_Log">
                <span>操作类型:</span>
                <el-select v-model="value" clearable size='small' style="width:126px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search_Log">
                <span style="margin-left:15px;">操作状态:</span>
                <el-select v-model="value1" clearable size='small' style="width:126px;" placeholder="请选择">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="section_bottom">
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
                prop="username"
                align='center'
                label="操作用户"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="地址"
                min-width="130">
                </el-table-column>
                <el-table-column
                prop="concentratorSn"
                align='center'
                label="集中器序列号"
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
                    </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="操作时间"
                min-width="150">
                </el-table-column>
                <el-table-column
                prop="content"
                label="操作明细"
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
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