<template>
    <!-- 广告屏日志 -->
    <div class="screenJournal">
        <el-tabs v-model="activeName" style="height:100%;" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name='0' style="height: 100%;position:relative;">
                <div class="screenJournal_top">
                    <div class="search">
                        <span>操作模块:</span>
                        <el-select v-model="value3" size='small' placeholder="请选择">
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
                        <el-select v-model="value" size='small' placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="screenJournal_bottom">
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
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        align='center'
                        label="屏幕序列号"
                        width="130">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操做模块"
                        width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='0'">屏幕</span>
                                <span v-if="scope.row.operatModule=='1'">节目</span>
                                <span v-if="scope.row.operatModule=='2'">媒体</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操做类别"
                        width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                                <span v-if="scope.row.operatType=='3'">启用/禁用</span>
                                <span v-if="scope.row.operatType=='4'">审核</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操做状态"
                        width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatStatus=='0'">成功</span>
                                <span v-if="scope.row.operatStatus=='1'">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        width="145">
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="控制日志" name='1' style="height: 100%;position:relative;">
                <div class="screenJournal_top">
                    <div class="search">
                        <span>设备序列号:</span>
                        <input type="text" v-model="serialNumber" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯序列号">
                    </div>
                    <div class="search">
                        <span>操作状态:</span>
                        <el-select v-model="value1" size='small' placeholder="请选择">
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
                        <el-select v-model="value2" size='small' placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button @click="search" type="primary" size='small' style="margin-left:15px;height:34px;margin-top:5px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="screenJournal_bottom">
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
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="serialNumber"
                        align='center'
                        label="屏幕序列号"
                        width="130">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作类别"
                        width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlType=='0'">添加</span>
                                <span v-if="scope.row.controlType=='1'">编辑</span>
                                <span v-if="scope.row.controlType=='2'">删除</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作状态"
                        width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.controlStatus=='0'">成功</span>
                                <span v-if="scope.row.controlStatus=='1'">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        width="145">
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            serverurl:localStorage.serverurl,
            activeName:'0',
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
            options2:[{
                value: '0',
                label: '下发'
                }
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
                }
            ],
            value3:'',
        }
    },
    mounted(){
        
    },
    methods:{
        handleClick(){
            this.pageIndex = 1,
            this.pageSize = 10,
            this.ready()
        },
        ready(){
            var that = this;
            var url = ''
            var data = {
                page:that.pageIndex,
                rows:that.pageSize,
                projectId:sessionStorage.projectId,
                serialNumber:this.serialNumber,
            }
            if(this.activeName=='0'){
                url='/screenOperatLog/getScreenOperatLogList'
                data.operatType = this.value
                data.operatModule = this.value3
            }
            if(this.activeName=='1'){
                url='/screenControlLog/getScreenControlLogList'
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
                        that.errorCode2(data.errorCode)
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
        this.ready()
    },
}
</script>  
<style scoped>
.screenJournal{position: absolute;top:10px;left: 10px;right: 10px;bottom: 10px;width:auto;height: auto;border-radius: 4px;}
.screenJournal_top{width: 100%;height: 46px;display: flex;justify-content: center;line-height: 45px;}
.screenJournal_bottom{width: 100%;height:auto;position: absolute;top:46px;bottom:10px;}
.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 110px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 110px;}
.block{text-align: center;}
</style>