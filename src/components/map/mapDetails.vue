<template>
    <!-- 灯杆灯具详情 -->
    <div class="mapDetails">
        <div class="map_right">
            <i @click="backtrack" class="backtrack iconfont icon-guanbi"></i>
        </div>
        <div style="position:relative;" class="mapDetails_div">
            <!-- 灯光效果 -->
            <img v-if='lighting' id="dg" src="../../assets/dg.png" alt="">
            <!-- 灯杆 灯具 -->
            <img id="lampPole" src="../../assets/lampPole.png" alt=""> 
            <canvas id="lampPolecanvas" style="position:absolute;left:-150px;top:0;" width="300" height="120"></canvas>
            <div class="lampPoleDiv" v-if="lampPoleType">
                <div class="panel-group" id="accordion">
                    <template v-for="(item,key) in tableData3">
                        <div class="panel panel-default" style="border: none;">
                            <div class="panel-heading" style="background:#112459;color:#cac2c2;">
                                <h4 class="panel-title" style="position:relative;">
                                    <span style="margin-right:30px;">名称:{{item.nickName}}</span>
                                    <span>编号:{{item.lampNumber}}</span>
                                    <a data-toggle="collapse" data-parent="#accordion" :id="'iconright'+key"
                                    :href="'#lampDtoList'+key" @click="lamprotate(key)">
                                        <i class="iconfont icon-right rotatebottom" style="position:absolute;right:0;"></i>
                                    </a>
                                </h4>
                            </div>
                            <div :id="'lampDtoList'+key" class="panel-collapse collapse in" style="background: #172856;color: #cac2c2;">
                                <div class="panel-body" style="border-top: 1px solid black;">
                                    <div>灯控器标识:{{item.serialNumber}}</div>
                                    <div>集中器标识:{{item.concentratorSN}}</div>
                                    <div style="margin-top:10px;">
                                        <table class="table">
                                            <tr>
                                                <td style="width:61px;">在线状态:</td>
                                                <td>
                                                    <span v-if="item.online=='1'" style="color:#67C23A;">在线</span>
                                                    <span v-else style="color:#909399;">离线</span>
                                                </td>
                                                <td>灯状态:</td>
                                                <td>
                                                    <span v-if="item.lampStatus=='0'" style="color:#909399;">关闭</span>
                                                    <span v-if="item.lampStatus=='1'" style="color:#67C23A;">开启</span>
                                                    <span v-if="item.lampStatus=='2'" style="color:#F56C6C;">告警</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>亮度:</td>
                                                <td>{{item.brightness}}%</td>
                                                <td>电流:</td>
                                                <td>{{item.electricity}}A</td>
                                            </tr>
                                            <tr>
                                                <td>电压:</td>
                                                <td>{{item.voltage}}V</td>
                                                <td>功率:</td>
                                                <td>{{item.power}}W</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="margin-top:10px;">
                                        告警内容:
                                        <template v-if="item.jsonContent!=null||item.jsonContent!=undefined">
                                            <table>
                                                <tr>
                                                    <template v-if="item.jsonContent.closeLanmpAlarm!=undefined||item.jsonContent.closeLanmpAlarm!=''">
                                                        <td v-if="item.jsonContent.closeLanmpAlarm=='breakdown'" style="color:#F56C6C;">关灯故障</td>
                                                        &nbsp;&nbsp;
                                                    </template>
                                                    <template v-if="item.jsonContent.IAMAlarm!=undefined||item.jsonContent.IAMAlarm!=''">
                                                        <td v-if="item.jsonContent.IAMAlarm=='overload'" style="color:#F56C6C;">电流过载</td>
                                                        &nbsp;&nbsp;
                                                    </template>
                                                    <template v-if="item.jsonContent.electricRelayAlarm!=undefined||item.jsonContent.electricRelayAlarm!=''">
                                                        <td v-if="item.jsonContent.electricRelayAlarm=='breakdown'" style="color:#F56C6C;">继电器故障</td>
                                                        &nbsp;&nbsp;
                                                    </template>
                                                    <template v-if="item.jsonContent.lampAlarm!=undefined||item.jsonContent.lampAlarm!=''">
                                                        <td v-if="item.jsonContent.lampAlarm=='breakdown'" style="color:#F56C6C;">光源故障</td>
                                                    </template>
                                                    <template v-if="item.jsonContent.underVoltage!=undefined||item.jsonContent.underVoltage!=''">
                                                        <td v-if="item.jsonContent.underVoltage=='overload'">欠压</td>
                                                    </template>
                                                    <template v-if="item.jsonContent.overVoltage!=undefined||item.jsonContent.overVoltage!=''">
                                                        <td v-if="item.jsonContent.overVoltage=='overload'">过压</td>
                                                    </template>
                                                </tr>
                                            </table>
                                        </template>
                                        <template v-else>
                                            ----
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- 广告屏 -->
            <img v-if="screenType" id="screen" src="../../assets/screen.png" alt=""> 
            <canvas id="screencanvas" style="position:absolute;top:50%;left:102px;" width="300" height="120"></canvas>
            <div class="screenDiv" v-if="screenType">
                <div class="panel-group" id="accordionc">
                    <template v-for="(item,key) in tableData4">
                        <div class="panel panel-default" style="border: none;">
                            <div class="panel-heading" style="background:#112459;color:#cac2c2;">
                                <h4 class="panel-title" style="position:relative;">
                                    <span style="margin-right:30px;">名称:{{item.nickName}}</span>
                                    <a data-toggle="collapse" data-parent="#accordionc" :id="'iconright3'+key"
                                    :href="'#screenList'+key" @click="screenrotate(key)">
                                        <i class="iconfont icon-right rotatebottom" style="position:absolute;right:0;"></i>
                                    </a>
                                </h4>
                            </div>
                            <div :id="'screenList'+key" class="panel-collapse collapse in" style="background: #172856;color: #cac2c2;">
                                <div class="panel-body" style="border-top: 1px solid black;">
                                    <div>屏幕标识:{{item.serialNumber}}</div>
                                    <div>型号:{{item.modelName}}</div>
                                    <div style="margin-top:10px;">
                                        <table class="table">
                                            <tr>
                                                <td>状态:</td>
                                                <td>
                                                    <span v-if="item.status=='1'" style="color:#67C23A;">开启</span>
                                                    <span v-else style="color:#909399;">关闭</span>
                                                </td>
                                                <td>宽度:</td>
                                                <td>{{item.width}}</td>
                                            </tr>
                                            <tr>
                                                <td>高度:</td>
                                                <td>{{item.height}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="margin-top:10px;">
                                        当前播放节目:{{item.programName}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- 气象站 -->
            <img v-if="sensorsType" id="sensors" src="../../assets/sensors.png" alt=""> 
            <canvas id="sensorscanvas" style="position:absolute;top:0px;left:102px;" width="300" height="120"></canvas>
            <div class="sensorsDiv" id="sensorsDiv" v-if="sensorsType">
                <div class="panel-group" id="accordions">
                    <template v-for="(item,key) in tableData5">
                        <div class="panel panel-default" style="border: none;">
                            <div class="panel-heading" style="background:#112459;color:#cac2c2;">
                                <h4 class="panel-title" style="position:relative;">
                                    <span style="margin-right:30px;">名称:{{item.nickName}}</span>
                                    <span>编号:{{item.serialNumber}}</span>
                                    <a data-toggle="collapse" data-parent="#accordions" :id="'iconright2'+key"
                                    :href="'#sensorsList'+key" @click="sensorsrotate(key)">
                                        <i class="iconfont icon-right rotatebottom" style="position:absolute;right:0;"></i>
                                    </a>
                                </h4>
                            </div>
                            <div :id="'sensorsList'+key" class="panel-collapse collapse in" style="background: #172856;color: #cac2c2;">
                                <div class="panel-body" style="border-top: 1px solid black;">
                                    <div>型号标识:{{item.modelName}}</div>
                                    <div>集中器标识:{{item.concentratorSN}}</div>
                                    <div style="margin-top:10px;">
                                        <table class="table">
                                            <tr>
                                                <td>状态:</td>
                                                <td>
                                                    <span v-if="item.online=='1'" style="color:#67C23A;">在线</span>
                                                    <span v-else style="color:#909399;">离线</span>
                                                </td>
                                                <td>风向:</td>
                                                <td>{{item.windDirectionAverage}}</td>
                                            </tr>
                                            <tr>
                                                <td>风速:</td>
                                                <td>{{item.windSpeedAverage}}</td>
                                                <td>温度:</td>
                                                <td>{{item.temperature}}</td>
                                            </tr>
                                            <tr>
                                                <td>湿度:</td>
                                                <td>{{item.humidity}}</td>
                                                <td>气压:</td>
                                                <td>{{item.pressure}}</td>
                                            </tr>
                                            <tr>
                                                <td>噪声:</td>
                                                <td>{{item.noiseAverage}}</td>
                                                <td>PM2.5:</td>
                                                <td>{{item.PM2}}</td>
                                            </tr>
                                            <tr>
                                                <td>PM10:</td>
                                                <td>{{item.PM10}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>   
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            serverurl:localStorage.serverurl,
            tableDataType:'',
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData5:[],
            lampPoleType:false,
            screenType:false,
            sensorsType:false,
            lighting:false,//灯光
        }
    },
    mounted(){
        var that = this
        var bodyHeight = $('.mapDetails').height()
        $('#lampPole').css('height', bodyHeight*0.8+'px')
        window.onresize = function temp() {
            that.readytwo(that.tableDataType)
        };
        this.ready(this.$route.query.id,this.$route.query.type)
    },
    methods:{
        ready(id,type){
            var that = this;
            var id = id
            var type = type
            var url = ''
            var data = {}
            that.tableDataType = ''
            if(type=='0'){url='/pole/getBindDeviceListByPoleId';data.poleId=id;}
            if(type=='1'){url='/lamp/getLampDetailsById';data.lampId=id;}
            if(type=='2'){url='/screen/getScreenDetailsById';data.screenId =id;}
            if(type=='3'){url='/envSensors/getEnvSensorsInformation';data.id = id}
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        if(type=='0'){
                            that.tableData2=[]
                            that.tableData2.push(data.result.poleDto)
                            that.tableData3 = data.result.lampDtoList
                            that.tableData4 = data.result.screenDtoList
                            that.tableData5 = data.result.EnvSensorDtoList
                            that.tableDataType = '0'
                        }
                        if(type=='1'){
                            that.tableData3=[]
                            that.tableData3.push(data.result.lampDto)
                            that.tableDataType = '1'
                        }
                        if(type=='2'){
                            that.tableData4=[]
                            that.tableData4.push(data.result.screenDto)
                            that.tableDataType = '2'
                        }
                        if(type=='3'){
                            that.tableData5=[]
                            that.tableData5.push(data.result)
                            that.tableDataType = '3'
                        }
                        that.readytwo(type)
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        readytwo(type){
            var that = this
            var bodyWidth = $('.mapDetails').width()
            var bodyHeight = $('.mapDetails').height()
            $('#lampPole').css('height', bodyHeight*0.8+'px')
            var lampPoleWidth = $('#lampPole').width()
            var lampPoleHeight = $('#lampPole').height()
            if(type==0){
                //灯具
                if(this.tableData3.length==0||this.tableData3==undefined){    
                    this.lampPoleType = false   
                }else{
                    this.lampPoleType = true
                    var canvas = document.getElementById('lampPolecanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(165, 15);
                    ctx.lineTo(165, 50); 
                    ctx.lineTo(120,50); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                    setTimeout(function(){
                        for(var i=0;i<that.tableData3.length;i++){
                            if(that.tableData3[i].lampStatus=='1'){
                                that.lighting = true
                            }else{
                                that.lighting = false
                            }
                        }
                    },20)
                    setTimeout(function(){
                        $('#dg').css('height',bodyHeight*0.5+'px',)
                        var screenWidth = $('#dg').width()
                        $('#dg').css('left','-'+screenWidth/2.3+'px')
                    },60)
                }
                //广告屏
                if(this.tableData4.length==0||this.tableData4==undefined){       
                    this.screenType = false
                }else{
                    this.screenType = true
                    setTimeout(function(){
                        $('#screen').css({'height':bodyHeight*0.25+'px','margin-left':'-5px'})
                        var screenWidth = $('#screen').width()
                        $('#screencanvas').css('left',lampPoleWidth+screenWidth+'px')
                    },20)
                    var canvas = document.getElementById('screencanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.moveTo(0, 10);
                    ctx.lineTo(170, 10); 
                    ctx.lineTo(170, 70);
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                } 
                //气象站
                if(this.tableData5.length==0||this.tableData5==undefined){       
                    this.sensorsType = false
                }else{
                    this.sensorsType = true
                    setTimeout(function(){
                        $('#sensors').css({
                            'height':bodyHeight*0.05+'px',
                            'position':'absolute',
                            'top':'0',
                            'right':'0'
                        })
                        if(that.tableData4.length==0||that.tableData4==undefined){}else{
                            var right = $('#screen').width()
                            $('#sensors').css({
                                'right':right+'px'
                            })
                        }
                    },40)
                    $('#sensorscanvas').css('left',lampPoleWidth+'px')
                    var canvas = document.getElementById('sensorscanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(5, 15);
                    ctx.lineTo(80, 15); 
                    ctx.lineTo(80,80);
                    ctx.lineTo(130,80); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                }
                setTimeout(function(){
                    var right = $('.mapDetails_div').width()+30
                    var screenWidth = $('#screen').width()
                    $('.lampPoleDiv').css({
                        'right':right+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                    $('.sensorsDiv').css({
                        'left':lampPoleWidth+130+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                    $('.screenDiv').css({
                        'left':lampPoleWidth+screenWidth+75+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                },50)
            }
            if(type==1){
                $('.lampPoleDiv').css('display','inline-block')
                $('.sensorsDiv').css('display','none')
                $('.screenDiv').css('display','none')
                //灯具
                if(this.tableData3.length==0||this.tableData3==undefined){       
                }else{
                    this.lampPoleType = true
                    var canvas = document.getElementById('lampPolecanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(165, 15);
                    ctx.lineTo(165, 50); 
                    ctx.lineTo(120,50); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                    setTimeout(function(){
                        for(var i=0;i<that.tableData3.length;i++){
                            if(that.tableData3[i].lampStatus=='1'){
                                that.lighting = true
                            }else{
                                that.lighting = false
                            }
                        }
                    },20)
                    setTimeout(function(){
                        $('#dg').css('height',bodyHeight*0.5+'px',)
                        var screenWidth = $('#dg').width()
                        $('#dg').css('left','-'+screenWidth/2.3+'px')
                    },60)
                }
                var right = $('.mapDetails_div').width()+30
                setTimeout(function(){
                    $('.lampPoleDiv').css({
                        'right':right+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                },20)
            }
            if(type==2){
                $('.lampPoleDiv').css('display','none')
                $('.screenDiv').css('display','inline-block')
                $('.sensorsDiv').css('display','none')
                if(this.tableData4.length==0||this.tableData4==undefined){       
                    this.screenType = false
                }else{
                    this.screenType = true
                    setTimeout(function(){
                        $('#screen').css({'height':bodyHeight*0.25+'px','margin-left':'-5px'})
                        var screenWidth = $('#screen').width()
                        $('#screencanvas').css('left',lampPoleWidth+screenWidth+'px')
                    },20)
                    var canvas = document.getElementById('screencanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.moveTo(0, 10);
                    ctx.lineTo(170, 10); 
                    ctx.lineTo(170, 70);
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                } 
                var screenWidth = $('#screen').width()
                setTimeout(function(){
                    $('.screenDiv').css({
                        'left':lampPoleWidth+screenWidth+75+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                },20)
            }
            if(type==3){
                $('.lampPoleDiv').css('display','none')
                $('.screenDiv').css('display','none')
                $('.sensorsDiv').css('display','inline-block')
                if(this.tableData5.length==0||this.tableData5==undefined){       
                    this.sensorsType = false
                }else{
                    this.sensorsType = true
                    setTimeout(function(){
                        $('#sensors').css({
                            'height':bodyHeight*0.05+'px',
                            'position':'absolute',
                            'top':'0',
                            'right':'0'
                        })
                        if(that.tableData4.length==0||that.tableData4==undefined){}else{
                            var right = $('#screen').width()
                            $('#sensors').css({
                                'right':right+'px'
                            })
                        }
                    },40)
                    $('#sensorscanvas').css('left',lampPoleWidth+'px')
                    var canvas = document.getElementById('sensorscanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(5, 15);
                    ctx.lineTo(80, 15); 
                    ctx.lineTo(80,80);
                    ctx.lineTo(130,80); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                }
                setTimeout(function(){
                    $('.sensorsDiv').css({
                        'left':lampPoleWidth+130+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                },20)
            }
        },
        //点击灯具  展开数据
        lamprotate(key){
            $('.icon-right').removeClass("rotatebottom")
            if($('#lampDtoList'+key).css('display')=='none'){
                $("#iconright"+key+'>i').addClass("rotatebottom");
            }else{
                $("#iconright"+key+'>i').removeClass("rotatebottom");
            }
        },
        //点击传感器  展开数据
        sensorsrotate(key){
            $('.icon-right').removeClass("rotatebottom")
            if($('#sensorsList'+key).css('display')=='none'){
                $("#iconright2"+key+'>i').addClass("rotatebottom");
            }else{
                $("#iconright2"+key+'>i').removeClass("rotatebottom");
            } 
        },
        //点击广告屏  展开数据
        screenrotate(key){
            $('.icon-right').removeClass("rotatebottom")
            if($('#screenList'+key).css('display')=='none'){
                $("#iconright3"+key+'>i').addClass("rotatebottom");
            }else{
                $("#iconright3"+key+'>i').removeClass("rotatebottom");
            } 
        },
        //返回地图首页
        backtrack(){this.$router.push({'path':'/mapHomgPage'});},
    },
    created(){
        // this.ready(this.$route.query.id,this.$route.query.type)
    },
    beforeDestroy() {
        window.onresize="";
    },
}
</script>
<style scoped>
.mapDetails{width: 100%;height:100%;background: linear-gradient(to right, #050913, #0a235c, #2161d6, #0a235c, #010920);display: flex;justify-content: center;align-items: center;overflow: auto;}
/* .mapDetails>img{height:800px;} */
#dg{position: absolute;top:15px;}
.lampPoleDiv,.sensorsDiv,.screenDiv{position: absolute;max-width:380px;min-height:70px;border: 1px solid #00ffff;top: 0px;background: #0a1839;padding: 10px;}
.screenDiv{top:50%;margin-top:70px;}
.rotatebottom{transform:rotate(90deg);}
.table>tr>td:nth-of-type(3){padding-left: 25px;}
.table>tr>td:nth-of-type(2n){padding-left: 5px;}
.table>tr>td:nth-child(2n+1){text-align: right;}


.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.backtrack{font-size: 34px;cursor: pointer;}
</style>
