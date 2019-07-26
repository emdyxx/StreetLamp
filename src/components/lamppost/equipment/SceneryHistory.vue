<template>
    <div class="SceneryHistory">
        <div class="SceneryHistory_top">
            <el-select v-model="value" @change="SceneryHistoryChange" clearable size='small' style="width:120px;" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="backtrack" type="warning" size='small' icon="el-icon-arrow-left" style="position:absolute;top:5px;right:30px;z-index:9999;">返回</el-button>
        </div>
        <div class="SceneryHistory_bottom">
            <el-table
                :data="tableData"
                ref="moviesTable"
                border
                stripe
                size='small'
                tooltip-effect="dark"
                style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
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
    name: 'SceneryHistory',
    data () {
        return {
            serverurl:localStorage.serverurl,
            options:[
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
            value:'0',
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10,
        }
    },
    mounted(){
        this.ready()
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        ready(){
            var that = this;
            var url = ''
            var data = {
                projectIds:sessionStorage.projectId,
                windSolarSensorsId:sessionStorage.SceneryID,
                page:that.pageIndex,
                size:that.pageSize,
                command:that.value,
            }
            url='/v1/solin/windSolarSensors/log/data'
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready();},
        SceneryHistoryChange(){
           this.ready() 
        },
        //返回上一级
        backtrack(){this.$router.go(-1);},
    },
    created(){

    },
}
</script>
<style scoped>
.block{text-align: center;}
.SceneryHistory{width: 100%;height: 100%;border: 1px solid #E4E4F1;}
.SceneryHistory_top{width: 100%;height: 40px;line-height: 40px;padding-left: 40px;}
.SceneryHistory_bottom{position: absolute;top: 40px;bottom: 0;left: 0;right: 0;border-top: 1px solid #E4E4F1;padding: 5px;}
</style>
