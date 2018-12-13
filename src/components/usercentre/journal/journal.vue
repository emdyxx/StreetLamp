<template>
    <div class="journal">
        <!-- 日志 -->
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录日志" v-if="viewLoginLog" name='0'>
                <div class="journal_top">
                    <div class="search">
                        <span>用户名称:</span>
                        <input type="text" v-model="userName" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div>
                        <span>日期:</span>
                        <el-date-picker
                        v-model="value3"
                        style="width:340px;"
                        size='small'
                        type="datetimerange"
                        range-separator="--"
                        value-format='yyyy-MM-dd HH:mm:ss'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
                <div class="journal_bottom">
                    <el-table
                        :data="tableData"
                        @row-click="clickRow" 
                        ref="moviesTable"
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
                        label="登录账号"
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        prop="ipAddress"
                        align='center'
                        label="登录IP"
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="登录状态"
                        min-width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status=='0'">成功</span>
                                <span v-if="scope.row.status=='1'">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="登录时间"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="登录明细"
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
            <el-tab-pane label="操作日志" v-if="viewOperatLog" name='1'>
                <div class="journal_top">
                    <div>
                        <span>操作类别:</span>
                        <el-select style="width:156px;" v-model="value" size='small' clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div >
                        <span>操作模块:</span>
                        <el-select style="width:156px;" v-model="value2" size='small' clearable placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>日期:</span>
                        <el-date-picker
                        v-model="value3"
                        style="width:340px;"
                        size='small'
                        type="datetimerange"
                        range-separator="--"
                        value-format='yyyy-MM-dd HH:mm:ss'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
                <div class="journal_bottom">
                    <el-table
                        :data="tableData"
                        @row-click="clickRow2" 
                        ref="moviesTable2"
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
                        label="用户名"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="orgName"
                        align='center'
                        label="机构名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作模块"
                        min-width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatModule=='0'">用户</span>
                                <span v-if="scope.row.operatModule=='1'">机构</span>
                                <span v-if="scope.row.operatModule=='2'">项目</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="操作类别"
                        min-width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.operatType=='0'">添加</span>
                                <span v-if="scope.row.operatType=='1'">编辑</span>
                                <span v-if="scope.row.operatType=='2'">删除</span>
                                <span v-if="scope.row.operatType=='3'">启用/禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        align='center'
                        label="操作时间"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="描述"
                        align='center'
                        min-width="180"
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
    name: 'journal',
    data () {
        return {
            serverurl:localStorage.serverurl,
            viewLoginLog:false,
            viewOperatLog:false,
            activeName:'0',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            userName:'',
            options: [{
                value: '0',
                label: '添加'
                }, {
                value: '1',
                label: '编辑'
                }, {
                value: '2',
                label: '删除'
                }, {
                value: '3',
                label: '启用/禁用'
            }],
            value: '',
            options2: [{
                value: '0',
                label: '用户'
                }, {
                value: '1',
                label: '机构'
                }, {
                value: '2',
                label: '项目'
            }],
            value2: '',
            value3:''
        }
    },
    mounted(){
        
    },
    methods:{
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.moviesTable2.toggleRowSelection(row)
        },
        handleClick(){
            this.pageIndex = 1
            this.pageSize = 10
            this.value3 = []
            this.ready();
        },
        search(){
            this.ready()
        },
        ready(){
            var that = this;
            var url = '';
            var data = {
                page:this.pageIndex,
                size:this.pageSize,
            }
            if(this.value3==null||this.value3==''||this.value3==undefined||this.value3.length==0){

            }else{
                data.beginTime=that.value3[0]
                data.endTime=that.value3[1]
            }
            if(this.activeName=='0'){
                url='/privilege/getLoginLogs'
                data.username = this.userName
            }
            if(this.activeName=='1'){
                url='/privilege/getOperatLogs'
                data.operatType=that.value,
                data.operatModule=that.value2
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
                        that.total = data.result.total;
                    }else{
                        that.errorCode(data.errorCode)
                    }
                },
            })
        },
        sizechange(val){
            this.pageSize = val;
            this.ready()
        },
        currentchange(val){
            this.pageIndex = val;
            this.ready()
        },
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/privilege/getMyOperatMenu',
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId2
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewLoginLog'){
                                that.viewLoginLog = true
                            }
                            if(data.result.operats[i].code=='viewOperatLog'){
                                that.viewOperatLog = true
                            }
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
    },
    created(){
        this.Jurisdiction()
        this.ready()
    },
}
</script>
<style scoped>
.journal{position: absolute;top:10px;left: 10px;right: 10px;bottom: 10px;width:auto;height: auto;border-radius: 4px;}
.journal>div{width: 100%;height: 100%;}
.journal_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;}
.journal_top>div{margin-left: 15px;}
.journal_top>button{height:33px;margin-left: 15px;}
.journal_bottom{top: 56px;left:5px;right: 5px;bottom: 5px;padding: 5px;overflow: auto;position: absolute;}

.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 32px !important;width: 110px;margin-top: 6px;height: 33px;padding: 0;}
.search>div{height: 30px;width: 110px;}
.block{text-align: center;}
</style>