<template>
    <div class="ScreenContent">
        <!-- 屏幕内容管理 -->
        <el-dialog
            title='内容管理'
            :visible.sync="dialogVisible3"
            top="5vh"
            width="970px">
            <span>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="气象设置" name="0">
                        <div class="handtop">
                            <div>
                                <span>是否显示气象信息:</span>
                                <el-radio v-model="handradio" label="0">显示</el-radio>
                                <el-radio v-model="handradio" label="1">不显示</el-radio>
                            </div>
                            <div>
                                <span>气象数据来源:</span>
                                <el-select v-model="handvalue" size='small' style="width:155px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in handoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="handbottom" v-if="handvalue=='1'">
                            <div>
                                <span><strong>*温馨提示</strong>:若该气象站与LED屏绑定同一灯杆,气象站默认为勾选,若没有绑定同一灯杆显示为该项目下所有气象站</span>
                            </div>
                            <el-table
                                :data="handtableData" 
                                ref="multipleTable"
                                border
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;"
                                @selection-change="handtableChange">
                                <el-table-column
                                align="center"
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                show-overflow-tooltip
                                label="名称"
                                :formatter="formatRole"
                                min-width="110">
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
                                min-width="100">
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
                                min-width="120">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.pm2}}/{{scope.row.pm10}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="latestTime"
                                show-overflow-tooltip
                                label="采集时间"
                                :formatter="formatRole"
                                min-width="150">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="handbottom" v-if="handvalue=='2'">
                            <div>
                                <span>*温馨提示:默认显示项目地址气象信息,如需修改点击下方地址重新设置</span>
                            </div>
                            <div style="text-align:center;margin-top:15px;">
                                地址:
                                <el-select v-model="provinceVal" @change="provinceChange" size='mini' style="width: 100px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in province"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="cityVal" @change="cityChange" size='mini' style="width: 100px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in city"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="areaVal" size='mini' style="width: 100px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in area"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="雷达测速设置" name="1">
                        <div class="handtop">
                            <div>
                                <span>是否显示测速信息:</span>
                                <el-radio v-model="handradio2" label="0">显示</el-radio>
                                <el-radio v-model="handradio2" label="1">不显示</el-radio>
                            </div>
                            <div>
                                <span>设置限制车速:</span>
                                <el-input-number v-model="num1" :min="5" :max="120" size='small' label="请输入"></el-input-number>
                                <span>km/h</span>
                            </div>
                            <div>
                                <span>测速模式设置:</span>
                                <el-select v-model="handvalue2" size='small' style="width:130px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in handoptions2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="handbottom" v-if="handvalue2=='1'">
                            <div>
                                <span>*温馨提示:策略时效内,若无车辆通过,屏幕显示限制车速</span>
                            </div>
                            <p>
                                <el-button @click="clickStrategy(0)" size='small' type="primary">添加策略</el-button>
                            </p>
                            <el-table
                                :data="handtableData2" 
                                ref="multipleTable2"
                                border
                                size='small'
                                tooltip-effect="dark"
                                style="width: 100%;overflow:auto;"
                                @selection-change="handtableChange2">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="strategyName"
                                show-overflow-tooltip
                                label="策略名称"
                                :formatter="formatRole"
                                min-width="110">
                                </el-table-column>
                                <el-table-column
                                prop="strategy"
                                show-overflow-tooltip
                                label="策略时效"
                                min-width="190">
                                </el-table-column>
                                <el-table-column
                                prop="expire"
                                show-overflow-tooltip
                                label="有效期"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                :formatter="formatRole"
                                min-width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="clickStrategy(1,scope.row)" type="primary" size="mini">编辑</el-button>
                                        <el-button @click="clickStrategy(2,scope.row.id)" type="primary" size="mini">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="handbottom" v-if="handvalue2=='2'">
                            <div>
                                <span>*温馨提示:该模式下,当车速超过设置的限制车速时,会自动提醒司机,没有超速车辆显示led屏幕广告</span>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false" size="small">关 闭</el-button>
                <el-button @click="submit" type="primary" size="small">保 存</el-button>
            </span>
        </el-dialog>
        <!-- 添加编辑策略 -->
        <el-dialog
            title='策略操作'
            :visible.sync="dialogVisible4"
            width="500px">
            <span>
                <div class="strategy_div">
                    <span>策略名称:</span>
                    <el-input v-model="strategyName" size='small' placeholder="策略名称"></el-input>
                </div>
                <div class="strategy_div">
                    <span>有 效 期:</span>
                    <el-date-picker v-model="expire" value-format='yyyy-MM-dd HH:mm:ss' size='small' type="datetime" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="strategy_div_02">
                    <template v-for="(item,index) in itemArr">
                        <div :key="index">
                            <span>
                                <div v-if="index==0">时间范围:</div>
                            </span>  
                            <el-time-picker is-range arrow-control size='small'
                                v-model="items[index]"
                                :clearable = 'false'
                                range-separator="至"
                                value-format='HH:mm:ss'
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                            </el-time-picker>
                            <el-button @click="strategyNode(0,index)" v-if="index=='0'" type="primary" icon="el-icon-plus" circle size='mini'></el-button>
                            <el-button @click="strategyNode(1,index)" v-if="index!='0'" type="danger" icon="el-icon-minus" circle size='mini'></el-button>
                        </div>
                    </template>
                </div>  
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">关 闭</el-button>
                <el-button @click="submitStrategy" type="primary">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'ScreenContent',
    data () {
        return {
            id:'',
            serverurl:localStorage.serverurl,
            //内容管理
            dialogVisible3:false,
            activeName:'0',
            handradio:'0', //气象设置
            handoptions:[{value:'1',label:'气象站'},{value:'2',label:'中国气象网'}],
            handvalue:'1',
            handtableData:[],//气象站列表数据
            handsite:[],
            province:[],//省市区
            provinceVal:'',
            city:[],
            cityVal:'',
            area:[],
            areaVal:'',
            num1:5, //雷达测速信息
            handradio2:'0',
            handoptions2:[{value:'1',label:'策略模式'},{value:'2',label:'超速测速模式'}],
            handvalue2:'1',
            handtableData2:[],//雷达列表数据
            handsite2:[], 
            dialogVisible4:false, //添加雷达测速策略
            type:'0',
            radarid:"",
            strategyName:'',
            expire:'',
            itemArr:1,
            ele:['08:00:00','18:00:00'],
            items:[['08:00:00','18:00:00']],
        }
    },
    mounted(){
        
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue === ''){
                return '----'
            }else{
                return cellValue
            }
        },
        handtableChange(val){this.handsite = val;},
        handtableChange2(val){this.handsite2 = val;},
        //气象站,雷达保存
        submit(){
            var that = this;
            var data = {}
            var url = ''
            if(that.activeName=='0'){
                if(that.handradio=='0'){
                    data.screenId = that.id
                    data.command = that.handvalue
                    if(that.handvalue=='1'){
                        if(that.handsite.length==0||that.handsite.length>=2){
                            that.$message({
                                message: '请选择单个气象站进行保存!',
                                type: 'error'
                            });
                            return;
                        }else{
                            data.envSensorsId = that.handsite[0].id
                        }
                    }else{
                        data.weatherAreaId = that.areaVal
                        
                    }
                }else{
                    data.command = '0'
                    data.screenId = that.id
                }
                url = '/v1/solin/screen/control/weather'
            }
            if(that.activeName=='1'){
                if(that.handradio2=='0'){
                    data.screenId = that.id
                    data.command = that.handvalue2
                    data.limitSpeed = that.num1
                    if(that.handvalue2=='1'){
                        if(that.handsite2.length==0||that.handsite2.length>=2){
                            that.$message({
                                message: '请选择单个进行保存!',
                                type: 'error'
                            });
                            return;
                        }else{
                            data.radarStrategyId = that.handsite2[0].id
                        }
                    }
                }else{
                    data.screenId = that.id
                    data.command = '0'
                }
                url = '/v1/solin/screen/control/radar'
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.dialogVisible3 = false;
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击添加,编辑,删除策略
        clickStrategy(type,val){
            var that = this;
            if(type=='0'){
                this.type = '0'
                this.strategyName = ''
                this.expire = ''
                this.itemArr = 1
                this.items = [['08:00:00','18:00:00']]
                this.dialogVisible4 = true;
            }
            if(type=='1'){
                this.type = '1'
                this.radarid = val.id
                this.strategyName = val.strategyName
                this.expire = val.expire
                var dataTime = JSON.parse(val.strategy)
                this.itemArr = dataTime.length
                for(var i=0;i<dataTime.length;i++){
                    this.items[i] = dataTime[i].split('-')
                }
                this.dialogVisible4 = true;
            }
            if(type=='2'){
                that.$confirm('确认删除此策略?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/v1/solin/screen/radar/strategy/deletes',
                        contentType:'application/json;charset=UTF-8',
                        data:JSON.stringify(
                            {
                                radarStrategys:[val]
                            }
                        ),
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.strategy(that.id)
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        //时间范围添加,删除
        strategyNode(val,index){
            if(val=='0'&&this.itemArr<3){
                this.itemArr++
                this.items.push(this.ele)
            }
            if(val=='1'){
                this.itemArr--
                this.items.splice(index,1)
            }
        },
        //点击保存策略
        submitStrategy(){
            var that = this;
            var data = {}
            var type = ''
            if(that.strategyName==''||that.expire==''){
                that.$message({
                    message: '策略名称或有效期不能为空!',
                    type: 'error'
                });
                return;
            }
            data.strategyName = that.strategyName
            data.expire = that.expire
            data.screenId = that.id
            data.radarStrategyList = []
            for(var i = 0;i<that.items.length;i++){
                data.radarStrategyList.push(that.items[i][0]+'-'+that.items[i][1])
            }
            if(that.type=='0'){type = 'post'}
            if(that.type=='1'){type = 'put';data.id = that.radarid}
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/radar/strategy',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        that.strategy(that.id)
                        that.dialogVisible4 = false;
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求策略列表
        strategy(id){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/radar/strategy',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:500,
                    screenId:id
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.handtableData2 = data.result.list
                        if(that.handtableData2[0].selected=='1'){
                            setTimeout(() => {
                                that.$refs.multipleTable2.toggleRowSelection(that.handtableData2[0]);
                            }, 50);
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //省请求
        provinceData(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/0',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.province = data.result.areas
                        that.cityData(val)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        provinceChange(){
            this.cityData(true)
        },
        //获取市的信息
        cityData(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.provinceVal,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.city = data.result.areas
                        if(val){
                            that.cityVal = data.result.areas[0].id
                        }
                        that.areaData(val)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        cityChange(){
            this.areaData(true)
        },
        //获取区的信息
        areaData(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.cityVal,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.area = data.result.areas
                        if(val){
                            that.areaVal = data.result.areas[0].id
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //初始化调用
        readyIntive(id){
            var that = this;
            this.id = id
            this.dialogVisible3 = true;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/playDetails/'+id,
                data:{
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.provinceData(false)
                        if(data.result.screenVo.envSensorsState=='0'){
                            that.handradio = '1'
                        }else{
                            that.handradio = '0'
                            that.handvalue = String(data.result.screenVo.envSensorsState)
                        }
                        if(data.result.screenVo.radarState=='0'){
                            that.handradio2 = '1'
                        }else{
                            that.handradio2 = '0'
                            that.handvalue2 = String(data.result.screenVo.radarState)
                        }
                        if(data.result.envSensorsSelectedVOs!=''){
                            that.handtableData = data.result.envSensorsSelectedVOs
                            if(that.handtableData[0].selected=='1'){
                                setTimeout(() => {
                                    that.$refs.multipleTable.toggleRowSelection(that.handtableData[0]);
                                }, 50);
                            }
                        }
                        if(data.result.screenRadarStrategyVOs!=''){
                            that.handtableData2 = data.result.screenRadarStrategyVOs
                            if(that.handtableData2[0].selected=='1'){
                                setTimeout(() => {
                                    that.$refs.multipleTable2.toggleRowSelection(that.handtableData2[0]);
                                }, 50);
                            }
                        }
                        that.num1 = data.result.screenVo.limitSpeed
                        that.provinceVal = data.result.areaJson.firstAreaId
                        that.cityVal = data.result.areaJson.secondAreaId
                        that.areaVal = data.result.areaJson.thirdAreaId
                        
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created(){

    }
}
</script>
<style scoped>
.handtop{width: 100%;border-bottom: 1px solid #E4E4F1;padding:20px 20px 10px 20px;}
.handtop span{margin-right: 20px;}
.handtop label{margin-bottom: 20px;}
.handtop>div:nth-of-type(2),.handtop>div:nth-of-type(3){margin-left: 27px;}
.handtop>div:nth-of-type(3){margin-top: 20px;}
.handbottom{width: 100%;height: 240px;padding: 15px;position: relative;overflow: auto;}
.handbottom>div:nth-of-type(1){display: flex;justify-content: center;}
.handbottom>div>span{font-size: 12px;color: #606266;display: inline-block;height:40px;line-height:40px;border-radius:3px;border:1px solid #94d4fe;background:#e6f8ff;text-align: center;margin-bottom: 10px;padding: 0 15px 0 15px;}
.handbottom strong{color: #20a5ff;}
.handbottom>p{position: absolute;left: 15px;top: 20px;}

.strategy_div,.strategy_div_02>div{margin-bottom: 10px;}
.strategy_div>span,.strategy_div_02>div>span{display: inline-block;width: 60px;}
.strategy_div>div{width: 226px;}
</style>
<style lang='less'>
.ScreenContent{
    .el-dialog__header{
        padding: 8px 20px 8px;background:#4382e6;
        color: #ffffff;
        span,i{color: #ffffff;}
        button{top:10px;}
    }
    .el-tabs__header{margin: 0;}
    .el-tabs__content{border: 1px solid #e4e8ee;border-top: none;}
}
.strategy_div_02{
    .el-button{padding: 4px;margin-left: 10px;}
}
</style>
