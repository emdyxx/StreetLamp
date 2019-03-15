<template>
    <!-- 传感器管理 -->
    <div class="cameras">
        <div class="cameras_top">
            <el-button v-if="envControl" @click="details" type="primary" icon='el-icon-search' size='small'>获取数据</el-button>
        </div>
        <div class="cameras_bottom">
            <div class="cameras_bottom_top">
                <div class="search">
                    <label style="width:100px;">集中器标识:</label>
                    <input type="text" v-model="concentratorSn" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入集中器标识">
                </div>
                <div class="search">
                    <label style="width:90px;">气象站名称:</label>
                    <input type="text" v-model="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入气象站名称">
                </div>
                <div class="search">
                    <label>型号:</label>
                    <el-select v-model="modelId" size='small' clearable style='width:146px;' placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.modelName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="cameras_bottom_bottom">
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
                    label="气象站名称"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="concentratorSn"
                    align='center'
                    label="集中器标识"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="modelName"
                    align='center'
                    label="型号标识"
                    min-width="100">
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
                    prop="windDirectionAverage"
                    align='center'
                    label="风向"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="windSpeedAverage"
                    align='center'
                    label="风速"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="temperature"
                    align='center'
                    label="温度"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="humidity"
                    align='center'
                    label="湿度"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="pressure"
                    align='center'
                    label="气压"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="noiseAverage"
                    align='center'
                    label="噪声"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="PM2"
                    align='center'
                    label="PM2.5"
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    prop="PM10"
                    label="PM10"
                    align='center'
                    min-width="80"
                    :formatter="formatRole">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align='center'
                    min-width="120">
                        <template slot-scope="scope">
                            <el-button @click="historicalData(scope.row.concentratorSn)" type="primary" size='small'>历史数据</el-button>
                        </template>
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
    </div>
</template>
<script>
export default {
    name: 'chargingPile',
    data () {
        return {
            serverurl:localStorage.serverurl,
            envControl:false,
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            concentratorSn:'',
            nickName:'',
            options:[],
            modelId:'',
        }
    },
    mounted(){
        this.ModelData()
    },
    methods:{
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
        //获取型号列表
        ModelData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/model',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.list
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //查询最新数据
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
                        that.errorCode2(data.errorCode)
                    }
                },
            })
        },
        //查看历史数据
        historicalData(val){
            console.log(val)
            sessionStorage.concentratorSn = val
            this.$router.push({'path':'/historicalData'})
        },
        ready(){
            var that = this;
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                poleId:'',
                projectId:sessionStorage.projectId,
                concentratorSn:that.concentratorSn,
                nickName:that.nickName,
                modelId:that.modelId,
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
                        that.errorCode2(data.errorCode)
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
                            if(data.result.operats[i].code=='envControl'){
                                that.envControl = true
                            }
                        }
                    }else{
                        that.errorCode(data.errorCode)
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
.cameras{width: 100%;height: 100%;}
.cameras>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.cameras_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.cameras_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.cameras_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.cameras_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.cameras{text-align: center;}
.search{display: flex;}
.search>label{width: 60px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>