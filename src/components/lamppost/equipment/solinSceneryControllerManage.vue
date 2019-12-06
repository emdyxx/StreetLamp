<template>
    <!-- 风光 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备操作>风光传感器操作</p>    
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewSceneryControllerManage">
                    <el-dropdown size="small" split-button @command="handleCommand">
                        {{names}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="names='名称';type='1';">名称</el-dropdown-item>
                            <el-dropdown-item @click.native="names='地址';type='2';">地址</el-dropdown-item>
                            <el-dropdown-item @click.native="names='状态';type='3';">状态</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        <template v-if="type=='1'">
                            <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                        </template>
                        <template v-if="type=='2'">
                            <el-input type="number" v-model="windSolarNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                            <!-- <el-input-number v-model="windSolarNumber" size="small" :precision="0" :min="1" :max="253" label="请输入地址" style="width:200px;"></el-input-number> -->
                            <!-- <el-input v-model="windSolarNumber" size="small" placeholder="请输入地址" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
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
                <div class="section_bottom_right">
                    <el-button @click="details" v-if="JurisdictionS.viewSceneryControllerStatus" size="small" type="primary" plain>查询最新数据</el-button>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    size='small'
                    tooltip-effect="dark"
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="windSolarNumber"
                    show-overflow-tooltip
                    label="地址"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="在线状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="electricPower"
                    show-overflow-tooltip
                    label="电量"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="太阳能电流/电压/功率"
                    min-width="120">
                        <template slot-scope="scope">
                            {{scope.row.solarEngIma}}/{{scope.row.solarEngVoltage}}/{{scope.row.solarEngPower}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="风机电流/电压/功率"
                    min-width="120">
                        <template slot-scope="scope">
                            {{scope.row.fanIma}}/{{scope.row.fanVoltage}}/{{scope.row.fanPower}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="batteryVoltage"
                    show-overflow-tooltip
                    label="电池电压"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="batteryStatus"
                    show-overflow-tooltip
                    label="电池状态"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="timestamp"
                    show-overflow-tooltip
                    label="采集时间"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="SceneryHistory(scope.row.id)" type="primary" size='mini'>历史数据</el-button>
                        </template>
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
    name: 'Scenery',
    data () {
        return {
            JurisdictionS:{
                viewSceneryControllerManage:false,
                viewSceneryControllerStatus:false,
            },
            serverurl:localStorage.serverurl,
            names:'名称',
            nickName:'',
            type:'1',
            windSolarNumber:'',
            options:[
                {
                    value:1,
                    label:'在线'
                },
                {
                    value:0,
                    label:'离线'
                }
            ],
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
            this.windSolarNumber=''
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
                url:that.serverurl+'/v1/solin/sensor/wind-solar/control/status',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:'1',
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
        SceneryHistory(id){
            sessionStorage.SceneryID = id
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
                windSolarNumber:that.windSolarNumber,
                online:that.value,
                dataType:'1',
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/wind-solar',
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
                            if(data.result.operats[i].code=='viewSceneryControllerManage'){
                                that.JurisdictionS.viewSceneryControllerManage = true
                            }
                            if(data.result.operats[i].code=='viewSceneryControllerStatus'){
                                that.JurisdictionS.viewSceneryControllerStatus = true
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

</style>
