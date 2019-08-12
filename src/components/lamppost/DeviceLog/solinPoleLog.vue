<template>
    <!-- 灯杆日志 -->
    <div class="LampPoleJournal">
        <div class="LampPoleJournal_top">
            <div class="search">
                <span>名称:</span>
                <input type="text" v-model="nickName" style="width:126px;" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入灯杆名称">
            </div>
            <div class="search">
                <span>序列号:</span>
                <input type="text" v-model="serialNumber" style="width:126px;" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入灯杆编号">
            </div>
            <div class="search">
                <span>操作类别:</span>
                <el-select v-model="value" clearable size='small' style="width:126px;" placeholder="请选择">
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
        <div class="LampPoleJournal_bottom">
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
                prop="nickName"
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
                label="操作类别"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.operatType=='0'">添加</span>
                        <span v-if="scope.row.operatType=='1'">编辑</span>
                        <span v-if="scope.row.operatType=='2'">删除</span>
                        <span v-if="scope.row.operatType=='3'">绑定项目</span>
                        <span v-if="scope.row.operatType=='4'">设置位置</span>
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
                    label: '绑定项目'
                },{
                    value: '4',
                    label: '设置位置'
                },
            ],
            value:'',
            nickName:'',
            serialNumber:'',
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
                url:that.serverurl+'/v1/solin/lighting/pole/log/operation',
                contentType:'application/json;charset=UTF-8',
                data:{
                    nickName:that.nickName,
                    serialNumber:that.serialNumber,
                    operatType:that.value,
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
.LampPoleJournal{width: 100%;height: 100%;}
.LampPoleJournal>div{width: 100%;position: absolute;}
.LampPoleJournal_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;line-height: 46px;padding-left: 15px;}
.LampPoleJournal_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}

.search{display: flex;margin-left:10px;}
.search>span{line-height: 30px;line-height: 45px;}
.search>input{height: 30px;width: 110px;margin-top: 6px;height: 33px;}
.search>div{height: 30px;width: 110px;}
.block{text-align: center;}
</style>