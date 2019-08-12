<template>
    <!-- 继电器日志 -->
    <div class="RelayJournal">
        <div class="RelayJournal_top">
            <template v-if="type=='99'">
                <div class="search">
                    <span>名称:</span>
                    <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                </div>
                <div class="search">
                    <span>操作模块:</span>
                    <el-select v-model="value" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
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
                <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
            </template>
            <template v-if="type=='100'">
                <div class="search">
                    <span>继电器名称:</span>
                    <input type="text" v-model="nickName" class="form-control logManage_main_input" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入继电器名称">
                </div>
                <div class="search">
                    <span>控制类型:</span>
                    <el-select v-model="value2" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <span>控制状态:</span>
                    <el-select v-model="value3" clearable size='small' placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
            </template>
        </div>
        <div class="RelayJournal_bottom">
            <template v-if="type=='99'">
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
                    prop="relayNumber"
                    align='center'
                    label="地址"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="集中器序列号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操作模块"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatModule=='1'">继电器</span>
                            <span v-if="scope.row.operatModule=='2'">通道</span>
                            <span v-if="scope.row.operatModule=='3'">场景</span>
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
                            <span v-if="scope.row.operatType=='3'">启用</span>
                            <span v-if="scope.row.operatType=='4'">禁用</span>
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
            <template v-if="type=='100'">
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
                    prop="relayNumber"
                    align='center'
                    label="地址"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="集中器序列号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    align='center'
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
.RelayJournal{width: 100%;height: 100%;}
.RelayJournal>div{width: 100%;position:absolute;}
.RelayJournal_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;line-height: 46px;padding-left: 15px;}
.RelayJournal_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}


.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 135px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 135px;}
.block{text-align: center;}
</style>
