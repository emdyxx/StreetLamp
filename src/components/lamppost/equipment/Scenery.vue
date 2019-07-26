<template>
    <!-- 风光 -->
    <div class="Scenery">
        <div class="Scenery_top">
            <el-dropdown v-if="viewSceneryControllerStatus" trigger='click'>
                <el-button type="primary" size='small' style="width:115px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="details">获取数据</el-dropdown-item>
                    <el-dropdown-item @click.native="SceneryHistory">历史数据</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{names}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="names='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="names='序列号';type='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="names='状态';type='3';">状态</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
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
        <div class="Scenery_bottom">
            <el-table
                :data="tableData"
                @row-click="clickRow" 
                ref="moviesTable"
                border
                stripe
                size='small'
                tooltip-effect="dark"
                @selection-change="SelectionChange"
                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="名称"
                min-width="110">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="序列号"
                min-width="110">
                </el-table-column>
                <el-table-column
                align='center'
                label="状态"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online=='0'">离线</span>
                        <span v-if="scope.row.online=='1'">在线</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="electricPower"
                align='center'
                label="电量"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                align='center'
                label="太阳能电流/功率/电压"
                min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.solarEngIma}}/{{scope.row.solarEngPower}}/{{scope.row.solarEngVoltage}}
                    </template>
                </el-table-column>
                <el-table-column
                align='center'
                label="风机电流/功率/电压"
                min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.fanIma}}/{{scope.row.fanPower}}/{{scope.row.fanVoltage}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="batteryVoltage"
                align='center'
                label="电池电压"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="batteryStatus"
                align='center'
                label="电池状态"
                :formatter="formatRole"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="createTime"
                align='center'
                label="创建时间"
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
    name: 'Scenery',
    data () {
        return {
            viewSceneryControllerStatus:false,
            serverurl:localStorage.serverurl,
            names:'名称',
            nickName:'',
            type:'1',
            serialNumber:'',
            options:[{
                    value:0,
                    label:'离线'
                },
                {
                    value:1,
                    label:'在线'
            }],
            value:'',
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:10,
        }
    },
    mounted(){
        
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
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
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        details(){
            var that = this;
            var arr = [];
            if(this.site.length==0){
                this.$message({
                    message: '请选择传感器进行查询!',
                    type: 'warning'
                });
                return;
            }
            for(var i =0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/windSolarSensors/control/status',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:'0',
                    windSolars:arr
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '请稍后查询,正在获取最新数据!',
                            type: 'success'
                        });
                        setTimeout(function(){
                            that.ready()
                        },10000)
                    }else{
                        that.errorCode(data)
                    }
                },
            }) 
        },
        //历史数据
        SceneryHistory(){
            if(this.site.length==0){
                this.$message({
                    message: '请选择风光控制器进行查询!',
                    type: 'warning'
                });
                return;
            }
            sessionStorage.SceneryID = this.site[0].id
            this.$router.push({'path':'/SceneryHistory'})
        },
        //请求风光基本数据
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                poleId:'',
                projectIds:sessionStorage.projectId,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                online:that.value,
                dataType:'1',
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/windSolarSensors/device',
                contentType:'application/json;charset=UTF-8',
                data:data,
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
        SelectionChange(val){this.site = val;},
        sizechange(val){this.pageSize = val;this.ready()},
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
                            if(data.result.operats[i].code=='viewSceneryControllerStatus'){
                                that.viewSceneryControllerStatus = true
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
        this.ready();   
        this.Jurisdiction()
    }
}
</script>
<style scoped>
.block{text-align: center;}
.Scenery{width: 100%;height: 100%;}
.Scenery>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.Scenery_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.Scenery_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}
</style>
