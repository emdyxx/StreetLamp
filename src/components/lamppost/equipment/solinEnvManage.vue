<template>
    <!-- 气象站管理 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备操作>气象站操作</p>
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="JurisdictionS.viewEnvManage">
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
                            <el-input type="number" v-model="serialNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                            <!-- <el-input-number v-model="serialNumber" size="small" :precision="0" :min="0" :max="253" label="请输入地址" style="width:200px;"></el-input-number> -->
                            <!-- <el-input v-model="serialNumber" size="small" placeholder="请输入地址" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
                        </template>
                        <template v-if="type=='3'">
                            <el-select v-model="value" clearable placeholder="请选择" size='small'>
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
                    <el-button v-if="JurisdictionS.envControl" @click="details" type="primary" plain size='small'>查询最新数据</el-button>
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
                    prop="serialNumber"
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
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="风向/风速"
                    min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.windDirectionAverage}}/{{scope.row.windSpeedAverage}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="温度/湿度"
                    min-width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.temperature}}/{{scope.row.humidity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="pressure"
                    show-overflow-tooltip
                    label="气压"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="noiseAverage"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="噪声"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    show-overflow-tooltip
                    label="PM2.5/PM10"
                    min-width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.PM2}}/{{scope.row.PM10}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="latestTime"
                    :formatter="formatRole"
                    label="采集时间"
                    show-overflow-tooltip
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="historicalData(scope.row.concentratorSn)" type="primary" size='mini'>历史数据</el-button>
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
    name: 'section',
    data () {
        return {
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            JurisdictionS:{
                viewEnvManage:false,
                envControl:false,
            },
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            nickName:'',
            serialNumber:'',
            options:[{label:'在线',value:'1'},{label:'离线',value:'0'}],
            value:'',
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
        //查询最新数据
        details(){
            var that = this;
            var arr = [];
            if(this.site.length==0){
                this.$message({
                    message: '请选择气象站进行查询!',
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
                url:that.serverurl+'/v1/solin/sensor/env/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    command:'1',
                    envs:arr
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
        //查看历史数据
        historicalData(concentratorSn){
            sessionStorage.concentratorSn = concentratorSn
            this.$router.push({'path':'/historicalData'})
        },
        ready(){
            var that = this;
            console.log(this.serialNumber)
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                poleId:'',
                projectIds:sessionStorage.projectId,
                nickName:that.nickName,
                serialNumber:that.serialNumber,
                online:that.value,
                dataType:1,
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env',
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
        search(){this.ready();},
        // 列表数据选中事件  进行编辑,删除操作
        SelectionChange(val){
            this.site = val;
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
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
                            if(data.result.operats[i].code=='viewEnvManage'){
                                that.JurisdictionS.viewEnvManage = true
                            }
                            if(data.result.operats[i].code=='envControl'){
                                that.JurisdictionS.envControl = true
                            }
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        }
    },
    created() {
        this.ready()
        this.Jurisdiction()
    },
}
</script>
<style scoped>

</style>