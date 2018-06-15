<template>
    <div class="lampslanterns">
        <!-- 灯具 -->
        <div class="lampslanterns_top">
            目录:
            <el-cascader
            size='small'
            :options="options"
            change-on-select
            v-model="selectedOptions3">
            </el-cascader>
            <el-button @click="switchOff('1')" type="primary" size='small' style="margin-left:25px;">开灯</el-button>
            <el-button @click="switchOff('2')" type="primary" size='small'>关灯</el-button>
            <el-dropdown style="margin-left:10px;" @command='dropdown'>
                <el-button type="primary" size='small' style="width:85px;">
                    调光<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item command='10'>100%</el-dropdown-item>
                    <el-dropdown-item command='9'>90%</el-dropdown-item>
                    <el-dropdown-item command='8'>80%</el-dropdown-item>
                    <el-dropdown-item command='7'>70%</el-dropdown-item>
                    <el-dropdown-item command='6'>60%</el-dropdown-item>
                    <el-dropdown-item command='5'>50%</el-dropdown-item>
                    <el-dropdown-item command='4'>40%</el-dropdown-item>
                    <el-dropdown-item command='3'>30%</el-dropdown-item>
                    <el-dropdown-item command='2'>20%</el-dropdown-item>
                    <el-dropdown-item command='1'>10%</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button @click="RefreshStatus" type="primary" size='small' style="margin-left:10px;">刷新状态</el-button>
        </div>
        <div class="lampslanterns_bottom">
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
                prop="address"
                align='center'
                label="区域"
                width="120">
                </el-table-column>
                <el-table-column
                align='center'
                label="灯状态"
                width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.lanmpStStr=='open'">开启</span>
                        <span v-if="scope.row.lanmpStStr=='close'">关闭</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lux"
                align='center'
                label="亮度"
                width="80">
                </el-table-column>
                <el-table-column
                prop="voltage"
                align='center'
                label="电压(V)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="electric_current"
                align='center'
                label="电流(A)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="txpower"
                align='center'
                label="功率(W)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="date"
                label="采集时间"
                align='center'
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                background
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
    name: 'lampslanterns',
    data () {
        return {
            selectedOptions3:[1,2],
            options:[
                {
                    value: 1,
                    label: '浙江',
                    children:[
                        {
                            value: 2,
                            label: '杭州',
                        },
                        {
                            value: 3,
                            label: '嘉兴',
                        },
                    ]
                }
            ],
            tableData:[
                {
                    date: '2016-05-02',
                    address: '杭州/滨江',
                    armmac:'--',
                    termmac:'--',
                    lux:'--',
                    voltage:'--',
                    electric_current:'--',
                    txpower:'--',
                    lanmpStStr:'--',
                }
            ],
            pageSize:10,
            pageIndex:1,
            total:50,
        }
    },
    mounted(){

    },
    methods:{
        // 调光下拉事件
        dropdown(val){
            var that = this;
            console.log(val)
            var data = {
                "brightness": val*10,
                "lampId": 1
            }
            this.$confirm('确认调节光亮度为'+val*10+'%', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/lampControl/setLampBrightness',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '亮度调节成功!',
                                type: 'success'
                            });
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消调节光亮度'
                });          
            });
        },
        //开关灯事件
        switchOff(val){
            var that = this
            console.log(val)
            var data = {
                "command": val,
                "lampId": 1
            }
            this.$confirm('确认进行此操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/lampControl/setLampSwitch',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val=='1'){
                                that.$message({
                                    message: '开灯成功',
                                    type: 'success'
                                });
                            }
                            if(val=='2'){
                                that.$message({
                                    message: '关灯成功',
                                    type: 'success'
                                });
                            }
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '此操作'
                });          
            });
            
        },
        //初始化列表
        ready(){
            var that = this;
            var data = {
                "lampId":1
            }
            $.ajax({
               type:'post',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/lampControl/getLampStatus',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data), 
                success:function(data){
                    if(data.errorCode=='0'){
                        if(data.result==''){
                            var array = [
                                {
                                    date: '2016-05-02',
                                    address: '杭州/滨江',
                                    armmac:'--',
                                    termmac:'--',
                                    lux:'--',
                                    voltage:'--',
                                    electric_current:'--',
                                    txpower:'--',
                                    lanmpStStr:'--',
                                }
                            ]
                            that.tableData = array
                        }else{
                            var array = []
                            array[0] = data.result
                            array[0].date = '2016-05-02'
                            array[0].address = '杭州/滨江'
                            that.tableData = array
                            console.log(array)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                        var array = [
                            {
                                date: '2016-05-02',
                                address: '杭州/滨江',
                                armmac:'--',
                                termmac:'--',
                                lux:'--',
                                voltage:'--',
                                electric_current:'--',
                                txpower:'--',
                                lanmpStStr:'--',
                            }
                        ]
                        that.tableData = array
                    }
                }
            })
        },
        //刷新状态
        RefreshStatus(){
            this.ready()
        },
    },
    created(){
        
    },
}
</script>
<style scoped>
.lampslanterns{width: 100%;height: 100%;}
.lampslanterns>div{width: 100%;border: 1px solid #E4E4F1;position: absolute;}
.lampslanterns_top{height: 46px;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.lampslanterns_bottom{top: 46px;bottom: 0;padding: 5px;overflow: auto;}
.block{text-align: center;}
</style>