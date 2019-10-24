<template>
    <!-- 集中器日志 -->
    <div class="section">
        <div class="section_top">
            <template v-if="type=='104'">
                <div class="search_Log">
                    <span>名称:</span>
                    <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                </div>
                <div class="search_Log">
                    <span>序列号:</span>
                    <input type="text" v-model="concentratorSn" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                </div>
                <div class="search_Log">
                    <span>操作类型:</span>
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
            <template v-if="type=='105'">
                <div class="search_Log">
                    <span>名称:</span>
                    <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                </div>
                <div class="search_Log">
                    <span>序列号:</span>
                    <input type="text" v-model="concentratorSn" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                </div>
                <div class="search_Log">
                    <span>控制类型:</span>
                    <el-select v-model="value1" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search_Log">
                    <span>控制状态:</span>
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
        <div class="section_bottom">
            <template v-if="type=='104'">
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
                    min-width="145">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="设备名称"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="序列号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操作模块"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatModule=='1'">集中器</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操作类型"
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
            </template>
            <template v-if="type=='105'">
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
                    min-width="145">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="设备名称"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="序列号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="控制类型"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.controlType=='1'">下发群组策略</span>
                            <span v-if="scope.row.controlType=='2'">清空群组策略</span>
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
                    min-width="150">
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
            nickName:'',
            concentratorSn:'',
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
                label: '下发群组策略'
                },{
                value: '2',
                label: '清空群组策略'
                }
            ],
            value1:'',
            options2:[
                {
                value: '0',
                label: '成功'
                },{
                value: '1',
                label: '失败'
                }
            ],
            value2:'',
        }
    },
    mounted(){
        
    },
    methods:{
        ready(){
            var that = this;
            var url = ''
            var data = {
                projectIds:sessionStorage.projectId,
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName,
                concentratorSn:that.concentratorSn
            }
            if(this.type=='104'){
                url='/v1/solin/concentrator/log/operation'
                data.operatType = that.value
            }
            if(this.type=='105'){
                url='/v1/solin/concentrator/log/control'
                data.controlType = that.value1
                data.controlStatus = that.value2
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
