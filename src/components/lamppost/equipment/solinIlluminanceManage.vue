<template>
    <!-- 光照度 -->
    <div class="IlluminanceManage">
        <div class="IlluminanceManage_top">
            <el-dropdown v-if="JurisdictionS.controlIlluminance" style="margin-left:10px;"> 
                <el-button type="primary" size='small' style="margin-top:8px;margin-left:5px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item v-if="JurisdictionS.controlIlluminance" @click.native="state">查询最新数据</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>  
            <div class="search" v-if="JurisdictionS.viewIlluminanceManage">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='地址';type='2';">地址</el-dropdown-item>
                        <el-dropdown-item @click.native="name='状态';type='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="lightNumber" size="small" placeholder="请输入地址" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='3'">
                        <el-select v-model="value" size='small' style="width:194px;" clearable placeholder="请选择">
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
        <div class="IlluminanceManage_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="myModalmoviesTable"
                border
                stripe
                size='small'
                slot="empty"
                tooltip-effect="dark"
                @selection-change="myModalChange"
                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;margin-top:10px;">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="名称"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="lightNumber"
                align='center'
                label="地址"
                min-width="100">
                </el-table-column>
                <el-table-column
                align='center'
                label="在线状态"
                min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="modelName"
                align='center'
                label="型号"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="lux"
                align='center'
                label="光照度"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="remark"
                align='center'
                label="备注"
                :formatter="formatRole"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="timestamp"
                align='center'
                label="采集时间"
                :formatter="formatRole"
                xshow-overflow-tooltip>
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
    name: 'IlluminanceManage',
    data () {
        return {
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewIlluminanceManage:false,//查看光照度管理
                controlIlluminance:false,//控制光照度
            },
            name:'名称',
            type:'1',
            nickName:'',
            lightNumber:'',
            options:[
                {
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
                }
            ],
            value:'',
            tableData:[],
            site:[],
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
            this.lightNumber=''
            this.value=''
        },
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.myModalmoviesTable.toggleRowSelection(row)
        },
        //查询状态
        state(){
            var that = this;
            if(that.site.length==0){
                that.$message({
                    message: '请选择设备进行查询!',
                    type: 'error'
                });
                return
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[0].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lightSensors/control/status',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:'1',
                    lights:arr
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '请稍后,正在获取最新数据!',
                            type: 'success'
                        });
                        setTimeout(function(){
                            that.ready()
                        },5000)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //初始化列表数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lightSensors/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex,
                    size:that.pageSize,
                    nickName:that.nickName,
                    lightNumber:that.lightNumber,
                    online:that.value,
                    dataType:'1',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        myModalChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready();},
        currentchange(val){this.pageIndex = val;this.ready();},
        search(){this.ready()},
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='viewIlluminanceManage'){
                                that.JurisdictionS.viewIlluminanceManage = true
                            }
                            if(data.result.operats[i].code=='controlIlluminance'){
                                that.JurisdictionS.controlIlluminance = true
                            }
                        }
                    }else{
                        that.errorCode(data)
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
.Required{color: red;font-size: 17px;}
.IlluminanceManage{width: 100%;height: 100%;}
.IlluminanceManage>div{width: 100%;position: absolute;}
.IlluminanceManage_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.IlluminanceManage_top>button,.solinIlluminance_top>div{height:33px;margin:8px 0 0 10px;}
.IlluminanceManage_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}

.search{display: flex;align-items: center;margin-left: 10px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>
