<template>
    <!-- 雷达传感器 -->
    <div class="section">
        <div class="section_top">
            <p>位置: &nbsp;设备操作>雷达传感器操作</p>    
        </div>
        <div class="section_bottom">
            <div class="section_bottom_bottom">
                <div class="search" v-if="DataType=='0'">
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
                            <el-input type="number" v-model="radarNumber" size="small" placeholder="请输入地址" style="width:200px;"></el-input>
                        </template>
                        <template v-if="type=='3'">
                            <el-select v-model="online" size='small' style="width:194px;" clearable placeholder="请选择">
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
                <div class="section_bottom_right"  v-if="DataType=='1'">
                    <el-select v-model="value2" @change="SceneryHistoryChange" size='small' style="width:120px;" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button @click="backtrack" size="small" type="primary" plain>返回</el-button>
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
                    v-if="DataType=='0'"
                    prop="nickName"
                    show-overflow-tooltip
                    label="名称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    v-if="DataType=='0'"
                    prop="radarNumber"
                    show-overflow-tooltip
                    label="地址"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    v-if="DataType=='0'"
                    show-overflow-tooltip
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'" class="offLine">离线</span>
                            <span v-if="scope.row.online=='1'" class="onLine">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="DataType=='0'"
                    prop="modelName"
                    show-overflow-tooltip
                    label="型号"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="speed"
                    show-overflow-tooltip
                    label="当前车速"
                    :formatter="formatRole"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="timestamp"
                    show-overflow-tooltip
                    :formatter="formatRole"
                    label="采集时间"
                    min-width="150">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    v-if="DataType=='0'"
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="radarHistory(scope.row.id)" type="primary" size='mini'>历史数据</el-button>
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
    name: '',
    data () {
        return {
            JurisdictionS:{
                viewRadarManage:false,
                viewRadarHistoryData:false
            },
            name:'名称',
            type:'1',
            serverurl:localStorage.serverurl,
            radarId:'',
            DataType:'0',//数据类型
            options2:[
                {
                    value:'0',
                    label:'近24小时'
                },
                {
                    value:'1',
                    label:'近一周'
                },
                {
                    value:'2',
                    label:'近一月'
                },
                {
                    value:'3',
                    label:'近一年'
                }
            ],
            value2:'0',
            nickName:'',
            radarNumber:'',
            options:[{label:'在线',value:'1'},{label:'离线',value:'0'}],
            online:'',
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
            this.radarNumber=''
            this.online=''
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
        //历史数据
        radarHistory(id,type){
            var that = this;
            if(type=='1'){
                
            }else{
                this.pageIndex = 1
                this.pageSize = 10
            }
            this.radarId = id
            this.DataType = '1'
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/radar/log/data',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   radarId:id,
                   command:that.value2
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
        SceneryHistoryChange(){
           this.radarHistory() 
        },
        //返回
        backtrack(){
            this.DataType = '0'
            this.pageIndex = 1
            this.pageSize = 10
            this.ready()
        },
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/radar',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   nickName:that.nickName,
                   radarNumber:that.radarNumber,
                   online:that.online,
                   projectIds:sessionStorage.projectId,
                   dataType:1,
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
        SelectionChange(val){this.site = val;},
        sizechange(val){
            this.pageSize = val;
            if(this.DataType=='1'){
                this.radarHistory(this.radarId,1)
            }else{
                this.ready()
            }
        },
        currentchange(val){
            this.pageIndex = val;
            if(this.DataType=='1'){
                this.radarHistory(this.radarId,1)
            }else{
                this.ready()
            }
        },
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
                            if(data.result.operats[i].code=='viewRadarManage'){
                                that.JurisdictionS.viewRadarManage = true
                            }
                            if(data.result.operats[i].code=='viewRadarHistoryData'){
                                that.JurisdictionS.viewRadarHistoryData = true
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
        this.ready()
        this.Jurisdiction()
    },
}
</script>
<style scoped>

</style>
