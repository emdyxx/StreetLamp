<template>
    <!-- 灯杆灯具详情 -->
    <div class="mapDetails">
        <div class="map_right">
            <i @click="backtrack" class="backtrack iconfont icon-guanbi"></i>
        </div>
        <div style="position:relative;" class="mapDetails_div">
            <!-- 灯光效果 -->
            <img v-if="brightness=='1'&&lighting==true" id="dg" src="../../assets/dg1.png" alt="">
            <img v-if="brightness=='2'&&lighting==true" id="dg" src="../../assets/dg2.png" alt="">
            <img v-if="brightness=='3'&&lighting==true" id="dg" src="../../assets/dg3.png" alt="">
            <img v-if="brightness=='4'&&lighting==true" id="dg" src="../../assets/dg4.png" alt="">
            <img v-if="brightness=='5'&&lighting==true" id="dg" src="../../assets/dg5.png" alt="">
            <img v-if="brightness=='6'&&lighting==true" id="dg" src="../../assets/dg6.png" alt="">
            <img v-if="brightness=='7'&&lighting==true" id="dg" src="../../assets/dg7.png" alt="">
            <img v-if="brightness=='8'&&lighting==true" id="dg" src="../../assets/dg8.png" alt="">
            <img v-if="brightness=='9'&&lighting==true" id="dg" src="../../assets/dg9.png" alt="">
            <img v-if="brightness=='10'&&lighting==true" id="dg" src="../../assets/dg10.png" alt="">
            <!-- 灯杆 灯具 -->            <!-- 灯杆 灯具 -->
            <img id="lampPole" src="../../assets/IMG_001.png" alt="">
            <canvas id="lampPolecanvas" style="position:absolute;left:-150px;top:60px;" width="300" height="120"></canvas>
            <div class="lampPoleDiv" v-if="lampPoleType">
                <div class="transparent"></div>
                <div class="panel-group" id="accordion" style="margin:0;">
                    <template v-for="(item,key) in tableData3">
                        <div class="panel panel-default" style="border: none;background: none;">
                            <div class="panel-heading" style="color:#cac2c2;background: none;">
                                <h4 class="panel-title" style="position:relative;font-size:20px;">
                                    <span style="margin-right:80px;">名称:{{item.nickName}}</span>
                                </h4>
                                <span class="online">
                                    <img v-if="item.online=='0'" src="../../assets/status_0.jpg" alt="">
                                    <img v-if="item.online=='1'" src="../../assets/status_1.jpg" alt="">
                                    <!-- <img v-if="item.lampStatus=='2'" src="../../assets/status_2.jpg" alt=""> -->
                                </span>
                            </div>
                            <div :id="'lampDtoList'+key" class="panel-collapse collapse in" style="color: #cac2c2;background: none;">
                                <div class="panel-body" style="border-top: 1px solid black;padding:15px 15px 0 15px;">
                                    <div class="brightness">
                                        <span :class="brightness>=1 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=2 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=3 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=4 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=5 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=6 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=7 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=8 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=9 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                        <span :class="brightness>=10 ? 'brightness_span_color2':'brightness_span_color1'"></span>
                                    </div>
                                    <div style="text-align:center;">亮度:{{item.brightness}}%</div>
                                    <div style="margin-top:10px;">
                                        <div id="myChart" style="width:100%;height:230px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- 广告屏 -->
            <img v-if="screenType" id="screen" src="../../assets/IMG_002.png" alt=""> 
            <canvas id="screencanvas" style="position:absolute;top:55%;right:0px;" width="600" height="120"></canvas>
            <div class="screenDiv" v-if="screenType" style="max-width:262px;padding:0;overflow:hidden;">
                <div class="panel-group" id="accordionc" style="margin:0;">
                    <div id="previews_div" class="panel panel-default" style="border: none;height:380px;position:relative;margin: 0 auto;">
                        
                    </div>
                </div>
            </div>
            <!-- 气象站 -->
            <img v-if="sensorsType" id="sensors" src="../../assets/IMG_003.png" alt=""> 
            <canvas id="sensorscanvas" style="position:absolute;top:0;left:237px;" width="300" height="120"></canvas>
            <div class="sensorsDiv" id="sensorsDiv" v-if="sensorsType" style="margin-top:67px;">
                <div class="transparent"></div>
                <div class="panel-group" id="accordions" style="margin:0;">
                    <template v-for="(item,key) in tableData5">
                        <div class="panel panel-default" style="border: none;background: none;">
                            <div class="panel-heading" style="background: none;color:#cac2c2;">
                                <h4 class="panel-title" style="position:relative;font-size:20px;">
                                    <span style="margin-right:80px;">名称:{{item.nickName}}</span>
                                </h4>
                                <span class="online">
                                    <img v-if="item.online=='0'" src="../../assets/status_0.jpg" alt="">
                                    <img v-if="item.online=='1'" src="../../assets/status_1.jpg" alt="">
                                </span>
                            </div>
                            <div :id="'sensorsList'+key" class="panel-collapse collapse in" style="background: none;color: #cac2c2;">
                                <div class="panel-body" style="border-top: 1px solid black;">
                                    <div style="margin-top:10px;">
                                        <div class="Environmental">
                                            <div>
                                                <p class="colorpm2">{{item.pm2}}</p>
                                                <p>
                                                    <span v-if="item.pm2<35">优</span>
                                                    <span v-if="item.pm2>=35&&item.pm2<75">良</span>
                                                    <span v-if="item.pm2>=75&&item.pm2<115">轻度</span>
                                                    <span v-if="item.pm2>=115&&item.pm2<150">重度</span>
                                                    <span v-if="item.pm2>=150&&item.pm2<250">重度</span>
                                                    <span v-if="item.pm2>=250">严重</span>
                                                    <span>PM2.5  {{item.pm2}}U</span> 
                                                </p>
                                            </div>
                                            <div>
                                                <p class="colorpm10">{{item.pm10}}</p>
                                                <p>
                                                    <span v-if="item.pm2<=50">优</span>
                                                    <span v-if="item.pm2>=51&&item.pm2<=150">良</span>
                                                    <span v-if="item.pm2>=151&&item.pm2<=250">轻度</span>
                                                    <span v-if="item.pm2>=251&&item.pm2<=350">重度</span>
                                                    <span v-if="item.pm2>=351&&item.pm2<=420">重度</span>
                                                    <span v-if="item.pm2>=421">严重</span>
                                                    <span>PM10  {{item.pm10}}U</span> 
                                                </p>
                                            </div>
                                        </div>
                                        <div class="Noise">
                                            <div>
                                                噪声
                                            </div>
                                            <div class="Noise2">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <div>{{item.noiseAverage}}</div>
                                        </div>
                                        <div class="wind">
                                            <div class="wind1">
                                                <img src="../../assets/wind3.png" alt="">
                                            </div>
                                            <div>
                                                <p>风向&nbsp;&nbsp;{{item.windDirectionAverage}}&nbsp;&nbsp;{{winddirection}}风</p>
                                                <p>风速&nbsp;&nbsp;{{item.windSpeedAverage}}&nbsp;&nbsp;{{windspeed}}</p>
                                            </div>
                                        </div>
                                        <div class="sensors_bottom">
                                            <div class="temperature">
                                                <div style="width:100%;height:100%;float:left;" id="demo1"></div>
                                            </div>
                                            <div class="humidity">
                                                <div id='humidity_div'>
                                                    
                                                </div>
                                            </div>
                                            <div class="pressure">
                                                <div id='pressure_div'></div>
                                            </div>
                                        </div>
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
            timer:null,
            timer2:null,
            timer3:null,
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
            brightness:0,//灯光亮度
            programId:'',
            winddirection:'',
            windspeed:'',
            temperature_s:'',//温度
        }
    },
    mounted(){
        var that = this
        var bodyHeight = $('.mapDetails').height()
        $('#lampPole').css('height', bodyHeight*0.8+'px')
        window.onresize = function temp() {
            that.readytwo(that.tableDataType)
        };
        that.ready(that.$route.query.id,that.$route.query.type)
        that.timer3 = setInterval(function(){
            that.ready(that.$route.query.id,that.$route.query.type)
        },60000)
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
                            for(let i = 0;i<that.tableData3.length;i++){
                                for(let s in that.tableData3[i]){
                                    if(that.tableData3[i][s]==null||that.tableData3[i][s]===''||that.tableData3[i][s]==undefined){
                                        that.tableData3[i][s] = '0.0'
                                    }
                                }
                            }
                            for(let i = 0;i<that.tableData5.length;i++){
                                for(let s in that.tableData5[i]){
                                    if(that.tableData5[i][s]==null||that.tableData5[i][s]===''||that.tableData5[i][s]==undefined){
                                        that.tableData5[i][s] = '0.0'
                                    }
                                }
                            }
                            that.tableDataType = '0'
                            if(data.result.EnvSensorDtoList.length!=0){
                                if(data.result.EnvSensorDtoList[0].pm2!=''||data.result.EnvSensorDtoList[0].pm2!=null){
                                    var pm2 = data.result.EnvSensorDtoList[0].pm2.split('.')[0]
                                    that.tableData5[0].pm2 = pm2
                                }
                                if(data.result.EnvSensorDtoList[0].pm10!=''||data.result.EnvSensorDtoList[0].pm10!=null){
                                    var pm10 = data.result.EnvSensorDtoList[0].pm10.split('.')[0]
                                    that.tableData5[0].pm10 = pm10
                                }
                            }
                            
                        }
                        if(type=='1'){
                            that.tableData3=[]
                            that.tableData3.push(data.result.lampDto)
                            that.tableDataType = '1'
                            for(let i = 0;i<that.tableData3.length;i++){
                                for(let s in that.tableData3[i]){
                                    if(that.tableData3[i][s]==null||that.tableData3[i][s]===''||that.tableData3[i][s]==undefined){
                                        that.tableData3[i][s] = '0.0'
                                    }
                                }
                            }
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
                            for(let i = 0;i<that.tableData5.length;i++){
                                for(let s in that.tableData5[i]){
                                    if(that.tableData5[i][s]==null||that.tableData5[i][s]===''||that.tableData5[i][s]==undefined){
                                        that.tableData5[i][s] = '0.0'
                                    }
                                }
                            }
                        }
                        that.readytwo(type)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        readytwo(type){
            var that = this
            var bodyWidth = $('.mapDetails').width()
            var bodyHeight = $('.mapDetails').height()
            $('#lampPole').css('height', bodyHeight*0.85+'px')
            var lampPoleWidth = $('#lampPole').width()
            var lampPoleHeight = $('#lampPole').height()
            if(type==0){
                //灯具
                if(this.tableData3.length==0||this.tableData3==undefined){    
                    this.lampPoleType = false   
                }else{
                    var brightness_s = (that.tableData3[0].brightness/10).toFixed(0)
                    this.lampPoleType = true
                    that.brightness = brightness_s
                    var canvas = document.getElementById('lampPolecanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(165, 15);
                    ctx.lineTo(36, 15); 
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
                        $('#dg').css('left','-'+screenWidth/2.6+'px')
                    },60)
                    //绘制仪表盘
                    setTimeout(function(){
                        var myChart = that.$echarts.init(document.getElementById('myChart'))
                        myChart.setOption({
                            series : [
                                {
                                    name:'电流',
                                    type:'gauge',
                                    min:0,
                                    max:360,
                                    splitNumber:12,
                                    radius: '90%',
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                            width: 3,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :10,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :15,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:3,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {           // 分隔线
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    detail : {
                                        backgroundColor: 'rgba(30,144,255,0.8)',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        offsetCenter: [-5, '50%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 16,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].electricity*1000, name: '电流/mA'}]
                                },
                                {
                                    name:'电压',
                                    type:'gauge',
                                    center : ['15%', '55%'],    // 默认全局居中
                                    radius : '60%',
                                    min:0,
                                    max:300,
                                    endAngle:45,
                                    splitNumber:5,
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                                            width: 1,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :6,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :10,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:1,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {
                                        width:5,
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        offsetCenter: [0, '-30%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5,
                                            fontSize: 12,
                                        }
                                    },
                                    detail : {
                                        //backgroundColor: 'rgba(30,144,255,0.8)',
                                    // borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        width: 80,
                                        height:30,
                                        offsetCenter: [5, '40%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 18,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].voltage, name: '电压/V'}]
                                },
                                {
                                    name:'功率',
                                    type:'gauge',
                                    center : ['85%', '55%'],    // 默认全局居中
                                    radius : '60%',
                                    min:0,
                                    max:100,
                                    startAngle:135,
                                    splitNumber:5,
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                                            width: 1,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :6,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :10,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:1,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {
                                        width:5,
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        offsetCenter: [0, '-30%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5,
                                            fontSize: 12,
                                        }
                                    },
                                    detail : {
                                        //backgroundColor: 'rgba(30,144,255,0.8)',
                                    // borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        width: 80,
                                        height:30,
                                        offsetCenter: [-8, '40%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 18,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].power, name: '功率/W'}]
                                },
                            ]
                        })
                    },80)
                }
                //广告屏
                if(this.tableData4.length==0||this.tableData4==undefined){       
                    this.screenType = false
                }else{
                    this.screenType = true
                    setTimeout(function(){
                        $('#screen').css({'height':bodyHeight*0.25+'px','margin-left':'-26px'})
                    },20)
                    var canvas = document.getElementById('screencanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.moveTo(555, 15);
                    ctx.lineTo(425, 15); 
                    ctx.lineTo(425, 98);
                    ctx.lineTo(53, 98);
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                    if(that.tableData4[0].status=='1'){
                        $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/program/getProgramDetailsList',
                        data:{
                            programId:that.tableData4[0].programId
                        },
                        success:function(data){
                            if(that.tableData4[0].programId!='0'){
                                if(that.programId==''||that.tableData4[0].programId!=that.programId){
                                    $('#previews_div').css('background','#ffffff')
                                    clearInterval(that.timer); 
                                    clearInterval(that.timer2); 
                                    that.timer = null
                                    that.timer2 = null
                                    that.programId = that.tableData4[0].programId                          
                                    $("#RollTexts_a").remove();
                                    $('#previews_div').html('')
                                    var ss = 0;
                                    var htmls = ''
                                    var length = data.result.list.length
                                    var i = 0;
                                    var width=262
                                    if(data.result.list.length<2){
                                        if(data.result.list[0].type=='0'){ //0为图片
                                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[0].mediaUrl+"'></div>"
                                        }else{
                                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[0].mediaUrl+"' autoplay loop></video></div>"
                                        }
                                        $('#previews_div').append(htmls)
                                    }else{
                                        for(var s=0;s<data.result.list.length;s++){
                                            htmls=''
                                            if(data.result.list[s].type==0){
                                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><img style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[s].mediaUrl+"'></div>"
                                            }else{
                                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><video id='video' style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[s].mediaUrl+"' loop></video></div>"
                                            }
                                            $('#previews_div').append(htmls)
                                        }
                                        var media = $('#previews_div');
                                        for(var t=0;t<data.result.list.length;t++){
                                            $('#previews_div>div').eq(t).css('left',width * t +"px" ) 
                                        }
                                        if(data.result.list[0].type=='1'){
                                            media[0].childNodes[0].childNodes[0].play()
                                        }
                                        that.timer = setInterval(() => {
                                            ss++
                                            if(ss==data.result.list[i].duration||ss>data.result.list[i].duration){
                                                ss = 0;
                                                for(var t =0;t<data.result.list.length;t++){
                                                    var widths = $('#previews_div>div').eq(t).css('left')
                                                    widths = widths.split('px')
                                                    $('#previews_div>div').eq(t).css('left',widths[0]-width+"px" )
                                                }
                                                if(data.result.list[i].type=='1'){
                                                    media[0].childNodes[i].childNodes[0].pause();
                                                    media[0].childNodes[i].childNodes[0].currentTime=0;
                                                }
                                                i++
                                                if(i==length){
                                                    i=0
                                                    for(var t=0;t<data.result.list.length;t++){
                                                        $('#previews_div>div').eq(t).css('left',width * t +"px" )
                                                    }
                                                }
                                                if(data.result.list[i].type=='1'){
                                                    media[0].childNodes[i].childNodes[0].play()
                                                }
                                            }
                                        }, 1000);
                                    }
                                    if(data.result.isAddText=='1'){
                                        var html = "<div id='RollTexts_a' style='position:relative;background:black;color:white;font-size:16px;text-align:center;line-height:40px;overflow:hidden;white-space:nowrap;'></div>"
                                        var div = "<div id='RollTexts' style='position:absolute;left:0;'>"+data.result.textContent+"</div>"
                                        $('#accordionc').append(html)
                                        $('#RollTexts_a').append(div)
                                        $('#RollTexts_a').css('height','40px')
                                        var rollWord = {
                                            container:document.getElementById("RollTexts"),
                                            content:document.getElementById("RollTexts"),
                                            _containerWidth:1,
                                            _contentWidth:1,
                                            _speed:1,
                                            setSpeed:function(opt){
                                                var This = this;
                                                This._speed = opt;
                                            },
                                            setContainerWidth:function(){
                                                var This = this;
                                                This._containerWidth = This.container.offsetWidth;
                                            },
                                            setContentWidth:function(){
                                                var This = this;
                                                This._contentWidth = This.content.offsetWidth;
                                            },
                                            roll:function(){
                                                var This = this;
                                                This.content.style.left = 131 + "px";
                                                that.timer2 = setInterval(function(){This.move()},20);
                                                This.container.onmouseover = function(){
                                                    clearInterval(that.timer2);
                                                };
                                                This.container.onmouseout = function(){
                                                    that.timer2 = setInterval(function(){This.move()},20);
                                                };
                                            },
                                            move:function(){
                                                var This = this;
                                                if(parseInt(This.content.style.left)+This._contentWidth > 0)
                                                {
                                                    This.content.style.left = parseInt(This.content.style.left)-This._speed + "px";
                                                }
                                                else
                                                {
                                                    This.content.style.left = 131 + "px";
                                                }                 
                                            },
                                            init:function(opt){
                                                var This = this;
                                                var speed = opt.speed || 1;
                                                This.setSpeed(speed);
                                                This.setContainerWidth();
                                                This.setContentWidth();
                                                This.roll();
                                            }
                                        }
                                        rollWord.init({speed:1});  //数值越小，滚动速度越慢。
                                    }
                                }
                            }else{
                                clearInterval(that.timer); 
                                clearInterval(that.timer2); 
                                $('#previews_div').html('')
                                $("#RollTexts_a").remove();
                                that.timer = null
                                that.timer2 = null
                                that.programId=''
                                $('#previews_div').css('background','#ffffff')
                            }
                        }
                    })
                    }else{
                        $("#RollTexts_a").remove();
                        $('#previews_div').html('')
                        clearInterval(that.timer); 
                        clearInterval(that.timer2); 
                        that.timer = null
                        that.timer2 = null
                        that.programId=''
                        $('#previews_div').css('background','rgba(32, 35, 56,1)')
                    }
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
                            'top':'-11px',
                            'right':'55px'
                        })
                        if(that.tableData4.length==0||that.tableData4==undefined){}else{
                            var right = $('#screen').width()
                            $('#sensors').css({
                                'right':right-11+'px'
                            })
                        }
                        // PM2.5   PM10
                        if(that.tableData5[0].pm2<35){
                            $('.colorpm2').css('background','#a7cf8c')
                        }else if(that.tableData5[0].pm2>=35&&that.tableData5[0].pm2<75){
                            $('.colorpm2').css('background-color','#f7da64')
                        }else if(that.tableData5[0].pm2>=75&&that.tableData5[0].pm2<115){
                            $('.colorpm2').css('background','#f29e39')
                        }else if(that.tableData5[0].pm2>=115&&that.tableData5[0].pm2<150){
                            $('.colorpm2').css('background','#da555d')
                        }else if(that.tableData5[0].pm2>=150&&that.tableData5[0].pm2<250){
                            $('.colorpm2').css('background','#b9377a')
                        }else if(that.tableData5[0].pm2>=250){
                            $('.colorpm2').css('background','#881326')
                        }
                        if(that.tableData5[0].pm10<=50){
                            $('.colorpm10').css('background','#a7cf8c')
                        }else if(that.tableData5[0].pm10>=51&&that.tableData5[0].pm10<=150){
                            $('.colorpm10').css('background-color','#f7da64')
                        }else if(that.tableData5[0].pm10>=151&&that.tableData5[0].pm10<=250){
                            $('.colorpm10').css('background','#f29e39')
                        }else if(that.tableData5[0].pm10>=251&&that.tableData5[0].pm10<=350){
                            $('.colorpm10').css('background','#da555d')
                        }else if(that.tableData5[0].pm10>=351&&that.tableData5[0].pm10<=420){
                            $('.colorpm10').css('background','#b9377a')
                        }else if(that.tableData5[0].pm10>=421){
                            $('.colorpm10').css('background','#881326')
                        }
                        // 噪声
                        for(var i=1;i<16;i++){
                            $('.Noise2>span').eq(i).css({
                                'display':'inline-block',
                                'width':'5px',
                                'height':i*6+'px',
                                'background':'#5f605b',
                            })
                        }
                        // if(that.tableData5[0].noiseAverage!=''||that.tableData5[0].noiseAverage!=null){
                            var noiseAverage = Number(that.tableData5[0].noiseAverage.split('.')[0])
                            var noiseAverageNumber = ''
                            if(noiseAverage<=14){
                                noiseAverageNumber = 2
                            }else if(noiseAverage>14&&noiseAverage<=24){
                                noiseAverageNumber = 3
                            }else if(noiseAverage>24&&noiseAverage<=34){
                                noiseAverageNumber = 4
                            }else if(noiseAverage>34&&noiseAverage<=44){
                                noiseAverageNumber = 5
                            }else if(noiseAverage>44&&noiseAverage<=54){
                                noiseAverageNumber = 6
                            }else if(noiseAverage>54&&noiseAverage<=64){
                                noiseAverageNumber = 7
                            }else if(noiseAverage>64&&noiseAverage<=74){
                                noiseAverageNumber = 8
                            }else if(noiseAverage>74&&noiseAverage<=84){
                                noiseAverageNumber = 9
                            }else if(noiseAverage>84&&noiseAverage<=94){
                                noiseAverageNumber = 10
                            }else if(noiseAverage>94&&noiseAverage<=104){
                                noiseAverageNumber = 11
                            }else if(noiseAverage>104&&noiseAverage<=114){
                                noiseAverageNumber = 12
                            }else if(noiseAverage>114&&noiseAverage<=124){
                                noiseAverageNumber = 13
                            }else if(noiseAverage>124&&noiseAverage<=134){
                                noiseAverageNumber = 14
                            }else if(noiseAverage>134&&noiseAverage<=144){
                                noiseAverageNumber = 15;
                            }else if(noiseAverage>144){
                                noiseAverageNumber = 16
                            }
                            for(var s=1;s<noiseAverageNumber;s++){
                                $('.Noise2>span').eq(s).css('background','#f7da64')
                            }
                        // }
                        
                        // 风向
                        // if(that.tableData5[0].windDirectionAverage!=''||that.tableData5[0].windDirectionAverage!=null){
                            var windDirectionAverage = that.tableData5[0].windDirectionAverage.split('D')[0]
                            $('.wind1>img').css({
                                'transform':'rotate('+windDirectionAverage+'deg)',
                                '-ms-transform':'rotate('+windDirectionAverage+'deg)',
                                '-moz-transform':'rotate('+windDirectionAverage+'deg)',
                                '-webkit-transform':'rotate('+windDirectionAverage+'deg)',
                                '-o-transform':'rotate('+windDirectionAverage+'deg)'
                            })
                            if(windDirectionAverage>=0&&windDirectionAverage<=22.5||windDirectionAverage>337.5&&windDirectionAverage<=360){
                                that.winddirection = '北'
                            }else if(windDirectionAverage>22.5&&windDirectionAverage<=67.5){
                                that.winddirection = '东北'
                            }else if(windDirectionAverage>37.5&&windDirectionAverage<=112.5){
                                that.winddirection = '东'
                            }else if(windDirectionAverage>112.5&&windDirectionAverage<=157.5){
                                that.winddirection = '东南'
                            }else if(windDirectionAverage>157.5&&windDirectionAverage<=202.5){
                                that.winddirection = '南'
                            }else if(windDirectionAverage>202.5&&windDirectionAverage<=247.5){
                                that.winddirection = '西南'
                            }else if(windDirectionAverage>247.5&&windDirectionAverage<=292.5){
                                that.winddirection = '西'
                            }else if(windDirectionAverage>292.5&&windDirectionAverage<=337.5){
                                that.winddirection = '西北'
                            }
                        // }
                        
                        // 风速
                        // if(that.tableData5[0].windSpeedAverage!=''||that.tableData5[0].windSpeedAverage!=null){
                            var windSpeedAverage = that.tableData5[0].windSpeedAverage.split('M')[0]
                            if(windSpeedAverage<=0.2){
                                that.windspeed = '无风'
                            }else if(windSpeedAverage>=0.3&&windSpeedAverage<=1.5){
                                that.windspeed = '软风'
                            }else if(windSpeedAverage>=1.6&&windSpeedAverage<=3.3){
                                that.windspeed = '轻风'
                            }else if(windSpeedAverage>=3.4&&windSpeedAverage<=5.4){
                                that.windspeed = '微风'
                            }else if(windSpeedAverage>=5.5&&windSpeedAverage<=7.9){
                                that.windspeed = '和风'
                            }else if(windSpeedAverage>=8.0&&windSpeedAverage<=10.7){
                                that.windspeed = '劲风'
                            }else if(windSpeedAverage>=10.8&&windSpeedAverage<=13.8){
                                that.windspeed = '强风'
                            }else if(windSpeedAverage>=13.9&&windSpeedAverage<=17.1){
                                that.windspeed = '疾风'
                            }else if(windSpeedAverage>=17.2&&windSpeedAverage<=20.7){
                                that.windspeed = '大风'
                            }else if(windSpeedAverage>=20.8&&windSpeedAverage<=24.4){
                                that.windspeed = '烈风'
                            }else if(windSpeedAverage>=24.5&&windSpeedAverage<=28.4){
                                that.windspeed = '狂风'
                            }else if(windSpeedAverage>=28.5&&windSpeedAverage<=32.6){
                                that.windspeed = '暴风'
                            }else if(windSpeedAverage>=32.7){
                                that.windspeed = '飓风'
                            }
                        // }
                        
                        //温度
                        // if(that.tableData5[0].temperature!=''||that.tableData5[0].temperature!=null){
                            var temperature = that.tableData5[0].temperature.split('C')[0]
                            if(that.temperature_s==''||temperature!=that.temperature_s){
                                that.temperature_s = temperature
                                var temper1 = new canvasPanel();
                                temper1.bgColor = 'rgb(159,3,3)';
                                temper1.MaxNum = 50;
                                temper1.MinNum = -10;
                                temper1.init('demo1');
                                setTimeout(function(){
                                    temper1.paintNowValue(temperature);
                                },20)
                            }
                        // }
                        //湿度
                        // if(that.tableData5[0].humidity!=''||that.tableData5[0].humidity!=null){
                            var humidity = that.tableData5[0].humidity.split('P')[0]
                            setTimeout(function(){
                                var myChart2 = that.$echarts.init(document.getElementById('humidity_div'))
                                myChart2.setOption({
                                    series : [
                                        {
                                            name:'湿度',
                                            type:'gauge',
                                            min:10,
                                            max:100,
                                            splitNumber:9,
                                            radius: '90%',
                                            axisLine: {            // 坐标轴线
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                                    width: 3,
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisLabel: {            // 坐标轴小标记
                                                textStyle: {       // 属性lineStyle控制线条样式
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisTick: {            // 坐标轴小标记
                                                length :10,        // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: 'auto',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            splitLine: {           // 分隔线
                                                length :15,         // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                                    width:3,
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            pointer: {           // 分隔线
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5
                                            },
                                            title : {
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            detail : {
                                                backgroundColor: 'rgba(30,144,255,0.8)',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5,
                                                offsetCenter: [0, '85%'],       // x, y，单位px
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    fontSize: 16,
                                                }
                                            },
                                            data:[{value: humidity, name: '湿度/P'}]
                                        }
                                    ]
                                })
                            },80)
                        // }
                        
                        //气压
                        if(that.tableData5[0].pressure!=''||that.tableData5[0].pressure!=null){
                            var pressure = that.tableData5[0].pressure.split('.')[0]
                            setTimeout(function(){
                                var myChart3 = that.$echarts.init(document.getElementById('pressure_div'))
                                myChart3.setOption({
                                    series : [
                                        {
                                            name:'气压',
                                            type:'gauge',
                                            min:1000,
                                            max:1080,
                                            splitNumber:4,
                                            radius: '90%',
                                            axisLine: {            // 坐标轴线
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                                    width: 3,
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisLabel: {            // 坐标轴小标记
                                                textStyle: {       // 属性lineStyle控制线条样式
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisTick: {            // 坐标轴小标记
                                                length :10,        // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: 'auto',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            splitLine: {           // 分隔线
                                                length :15,         // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                                    width:3,
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            pointer: {           // 分隔线
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5
                                            },
                                            title : {
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            detail : {
                                                backgroundColor: 'rgba(30,144,255,0.8)',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5,
                                                offsetCenter: [0, '85%'],       // x, y，单位px
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    fontSize: 16,
                                                }
                                            },
                                            data:[{value: pressure, name: '气压/H'}]
                                        }
                                    ]
                                })
                            },80)
                        }
                        
                    },40)
                    $('#sensorscanvas').css('left',lampPoleWidth-15+'px')
                    var canvas = document.getElementById('sensorscanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(5, 15);
                    ctx.lineTo(80, 15); 
                    ctx.lineTo(80,80);
                    ctx.lineTo(180,80); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                }
                setTimeout(function(){
                    var right = $('.mapDetails_div').width()+115
                    var screenWidth = $('#screen').width()
                    $('.lampPoleDiv').css({
                        'right':right+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                    $('.screenDiv').css({
                        'right':right+120+'px',
                        'width':bodyWidth*0.3+'px'
                    })
                    $('.sensorsDiv').css({
                        'left':lampPoleWidth+165+'px',
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
                    var brightness_s = (that.tableData3[0].brightness/10).toFixed(0)
                    this.lampPoleType = true
                    that.brightness = brightness_s
                    var canvas = document.getElementById('lampPolecanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(165, 15);
                    ctx.lineTo(36, 15); 
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
                        $('#dg').css('left','-'+screenWidth/2.6+'px')
                    },60)
                    //绘制仪表盘
                    setTimeout(function(){
                        var myChart = that.$echarts.init(document.getElementById('myChart'))
                        myChart.setOption({
                            series : [
                                {
                                    name:'电流',
                                    type:'gauge',
                                    min:0,
                                    max:360,
                                    splitNumber:12,
                                    radius: '90%',
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                            width: 3,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :10,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :15,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:3,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {           // 分隔线
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontSize: 14,
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    detail : {
                                        backgroundColor: 'rgba(30,144,255,0.8)',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        offsetCenter: [-5, '50%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 16,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].electricity*1000, name: '电流/mA'}]
                                },
                                {
                                    name:'电压',
                                    type:'gauge',
                                    center : ['15%', '55%'],    // 默认全局居中
                                    radius : '60%',
                                    min:0,
                                    max:300,
                                    endAngle:45,
                                    splitNumber:5,
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                                            width: 1,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :6,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :10,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:1,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {
                                        width:5,
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        offsetCenter: [0, '-30%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5,
                                            fontSize: 12,
                                        }
                                    },
                                    detail : {
                                        //backgroundColor: 'rgba(30,144,255,0.8)',
                                    // borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        width: 80,
                                        height:30,
                                        offsetCenter: [5, '40%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 18,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].voltage, name: '电压/V'}]
                                },
                                {
                                    name:'功率',
                                    type:'gauge',
                                    center : ['85%', '55%'],    // 默认全局居中
                                    radius : '60%',
                                    min:0,
                                    max:100,
                                    startAngle:135,
                                    splitNumber:5,
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                                            width: 1,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :6,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 2
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :10,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:1,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5
                                        }
                                    },
                                    pointer: {
                                        width:5,
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        offsetCenter: [0, '-30%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 5,
                                            fontSize: 12,
                                        }
                                    },
                                    detail : {
                                        //backgroundColor: 'rgba(30,144,255,0.8)',
                                    // borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        width: 80,
                                        height:30,
                                        offsetCenter: [0, '40%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize: 18,
                                        }
                                    },
                                    data:[{value: that.tableData3[0].power, name: '功率/W'}]
                                },
                            ]
                        })
                    },80)
                }
                setTimeout(function(){
                    var right = $('.mapDetails_div').width()+115
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
                        $('#screen').css({'height':bodyHeight*0.25+'px','margin-left':'-26px'})
                    },20)
                    var canvas = document.getElementById('screencanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.moveTo(555, 15);
                    ctx.lineTo(425, 15); 
                    ctx.lineTo(425, 98);
                    ctx.lineTo(53, 98);
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                    if(that.tableData4[0].status=='1'){
                        $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/program/getProgramDetailsList',
                        data:{
                            programId:that.tableData4[0].programId
                        },
                        success:function(data){
                            if(that.tableData4[0].programId!='0'){
                                if(that.programId==''||that.tableData4[0].programId!=that.programId){
                                    $('#previews_div').css('background','#ffffff')
                                    clearInterval(that.timer); 
                                    clearInterval(that.timer2); 
                                    that.timer = null
                                    that.timer2 = null
                                    that.programId = that.tableData4[0].programId                          
                                    $("#RollTexts_a").remove();
                                    $('#previews_div').html('')
                                    var ss = 0;
                                    var htmls = ''
                                    var length = data.result.list.length
                                    var i = 0;
                                    var width=262
                                    if(data.result.list.length<2){
                                        if(data.result.list[0].type=='0'){ //0为图片
                                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[0].mediaUrl+"'></div>"
                                        }else{
                                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[0].mediaUrl+"' autoplay loop></video></div>"
                                        }
                                        $('#previews_div').append(htmls)
                                    }else{
                                        for(var s=0;s<data.result.list.length;s++){
                                            htmls=''
                                            if(data.result.list[s].type==0){
                                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><img style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[s].mediaUrl+"'></div>"
                                            }else{
                                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><video id='video' style='width:100%;height:100%;' src='"+that.serverurl+data.result.list[s].mediaUrl+"' loop></video></div>"
                                            }
                                            $('#previews_div').append(htmls)
                                        }
                                        var media = $('#previews_div');
                                        for(var t=0;t<data.result.list.length;t++){
                                            $('#previews_div>div').eq(t).css('left',width * t +"px" ) 
                                        }
                                        if(data.result.list[0].type=='1'){
                                            media[0].childNodes[0].childNodes[0].play()
                                        }
                                        that.timer = setInterval(() => {
                                            ss++
                                            if(ss==data.result.list[i].duration||ss>data.result.list[i].duration){
                                                ss = 0;
                                                for(var t =0;t<data.result.list.length;t++){
                                                    var widths = $('#previews_div>div').eq(t).css('left')
                                                    widths = widths.split('px')
                                                    $('#previews_div>div').eq(t).css('left',widths[0]-width+"px" )
                                                }
                                                if(data.result.list[i].type=='1'){
                                                    media[0].childNodes[i].childNodes[0].pause();
                                                    media[0].childNodes[i].childNodes[0].currentTime=0;
                                                }
                                                i++
                                                if(i==length){
                                                    i=0
                                                    for(var t=0;t<data.result.list.length;t++){
                                                        $('#previews_div>div').eq(t).css('left',width * t +"px" )
                                                    }
                                                }
                                                if(data.result.list[i].type=='1'){
                                                    media[0].childNodes[i].childNodes[0].play()
                                                }
                                            }
                                        }, 1000);
                                    }
                                    if(data.result.isAddText=='1'){
                                        var html = "<div id='RollTexts_a' style='position:relative;background:black;color:white;font-size:16px;text-align:center;line-height:40px;overflow:hidden;white-space:nowrap;'></div>"
                                        var div = "<div id='RollTexts' style='position:absolute;left:0;'>"+data.result.textContent+"</div>"
                                        $('#accordionc').append(html)
                                        $('#RollTexts_a').append(div)
                                        $('#RollTexts_a').css('height','40px')
                                        var rollWord = {
                                            container:document.getElementById("RollTexts"),
                                            content:document.getElementById("RollTexts"),
                                            _containerWidth:1,
                                            _contentWidth:1,
                                            _speed:1,
                                            setSpeed:function(opt){
                                                var This = this;
                                                This._speed = opt;
                                            },
                                            setContainerWidth:function(){
                                                var This = this;
                                                This._containerWidth = This.container.offsetWidth;
                                            },
                                            setContentWidth:function(){
                                                var This = this;
                                                This._contentWidth = This.content.offsetWidth;
                                            },
                                            roll:function(){
                                                var This = this;
                                                This.content.style.left = 131 + "px";
                                                that.timer2 = setInterval(function(){This.move()},20);
                                                This.container.onmouseover = function(){
                                                    clearInterval(that.timer2);
                                                };
                                                This.container.onmouseout = function(){
                                                    that.timer2 = setInterval(function(){This.move()},20);
                                                };
                                            },
                                            move:function(){
                                                var This = this;
                                                if(parseInt(This.content.style.left)+This._contentWidth > 0)
                                                {
                                                    This.content.style.left = parseInt(This.content.style.left)-This._speed + "px";
                                                }
                                                else
                                                {
                                                    This.content.style.left = 131 + "px";
                                                }                 
                                            },
                                            init:function(opt){
                                                var This = this;
                                                var speed = opt.speed || 1;
                                                This.setSpeed(speed);
                                                This.setContainerWidth();
                                                This.setContentWidth();
                                                This.roll();
                                            }
                                        }
                                        rollWord.init({speed:1});  //数值越小，滚动速度越慢。
                                    }
                                }
                            }else{
                                clearInterval(that.timer); 
                                clearInterval(that.timer2); 
                                $('#previews_div').html('')
                                $("#RollTexts_a").remove();
                                that.timer = null
                                that.timer2 = null
                                that.programId=''
                                $('#previews_div').css('background','#ffffff')
                            }
                        }
                    })
                    }else{
                        $("#RollTexts_a").remove();
                        $('#previews_div').html('')
                        clearInterval(that.timer); 
                        clearInterval(that.timer2); 
                        that.timer = null
                        that.timer2 = null
                        that.programId=''
                        $('#previews_div').css('background','rgba(32, 35, 56,1)')
                    }
                } 
                setTimeout(function(){
                    var right = $('.mapDetails_div').width()+115
                    $('.screenDiv').css({
                        'right':right+120+'px',
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
                            'top':'-13px',
                            'right':'55px'
                        })
                        if(that.tableData4.length==0||that.tableData4==undefined){}else{
                            var right = $('#screen').width()
                            $('#sensors').css({
                                'right':right-9+'px'
                            })
                        }
                        // PM2.5   PM10
                        if(that.tableData5[0].pm2<35){
                            $('.colorpm2').css('background','#a7cf8c')
                        }else if(that.tableData5[0].pm2>=35&&that.tableData5[0].pm2<75){
                            $('.colorpm2').css('background-color','#f7da64')
                        }else if(that.tableData5[0].pm2>=75&&that.tableData5[0].pm2<115){
                            $('.colorpm2').css('background','#f29e39')
                        }else if(that.tableData5[0].pm2>=115&&that.tableData5[0].pm2<150){
                            $('.colorpm2').css('background','#da555d')
                        }else if(that.tableData5[0].pm2>=150&&that.tableData5[0].pm2<250){
                            $('.colorpm2').css('background','#b9377a')
                        }else if(that.tableData5[0].pm2>=250){
                            $('.colorpm2').css('background','#881326')
                        }
                        if(that.tableData5[0].pm10<=50){
                            $('.colorpm10').css('background','#a7cf8c')
                        }else if(that.tableData5[0].pm10>=51&&that.tableData5[0].pm10<=150){
                            $('.colorpm10').css('background-color','#f7da64')
                        }else if(that.tableData5[0].pm10>=151&&that.tableData5[0].pm10<=250){
                            $('.colorpm10').css('background','#f29e39')
                        }else if(that.tableData5[0].pm10>=251&&that.tableData5[0].pm10<=350){
                            $('.colorpm10').css('background','#da555d')
                        }else if(that.tableData5[0].pm10>=351&&that.tableData5[0].pm10<=420){
                            $('.colorpm10').css('background','#b9377a')
                        }else if(that.tableData5[0].pm10>=421){
                            $('.colorpm10').css('background','#881326')
                        }
                        // 噪声
                        for(var i=1;i<16;i++){
                            $('.Noise2>span').eq(i).css({
                                'display':'inline-block',
                                'width':'5px',
                                'height':i*6+'px',
                                'background':'#5f605b',
                            })
                        }
                        if(that.tableData5[0].noiseAverage!=''||that.tableData5[0].noiseAverage!=null){
                            var noiseAverage = Number(that.tableData5[0].noiseAverage.split('.')[0])
                            var noiseAverageNumber = ''
                            if(noiseAverage<=14){
                                noiseAverageNumber = 2
                            }else if(noiseAverage>14&&noiseAverage<=24){
                                noiseAverageNumber = 3
                            }else if(noiseAverage>24&&noiseAverage<=34){
                                noiseAverageNumber = 4
                            }else if(noiseAverage>34&&noiseAverage<=44){
                                noiseAverageNumber = 5
                            }else if(noiseAverage>44&&noiseAverage<=54){
                                noiseAverageNumber = 6
                            }else if(noiseAverage>54&&noiseAverage<=64){
                                noiseAverageNumber = 7
                            }else if(noiseAverage>64&&noiseAverage<=74){
                                noiseAverageNumber = 8
                            }else if(noiseAverage>74&&noiseAverage<=84){
                                noiseAverageNumber = 9
                            }else if(noiseAverage>84&&noiseAverage<=94){
                                noiseAverageNumber = 10
                            }else if(noiseAverage>94&&noiseAverage<=104){
                                noiseAverageNumber = 11
                            }else if(noiseAverage>104&&noiseAverage<=114){
                                noiseAverageNumber = 12
                            }else if(noiseAverage>114&&noiseAverage<=124){
                                noiseAverageNumber = 13
                            }else if(noiseAverage>124&&noiseAverage<=134){
                                noiseAverageNumber = 14
                            }else if(noiseAverage>134&&noiseAverage<=144){
                                noiseAverageNumber = 15;
                            }else if(noiseAverage>144){
                                noiseAverageNumber = 16
                            }
                            for(var s=1;s<noiseAverageNumber;s++){
                                $('.Noise2>span').eq(s).css('background','#f7da64')
                            }
                        }
                        
                        // 风向
                        if(that.tableData5[0].windDirectionAverage!=''||that.tableData5[0].windDirectionAverage!=null){
                            var windDirectionAverage = that.tableData5[0].windDirectionAverage.split('D')[0]
                            $('.wind1>img').css({
                                'transform':'rotate('+windDirectionAverage+'deg)',
                                '-ms-transform':'rotate('+windDirectionAverage+'deg)',
                                '-moz-transform':'rotate('+windDirectionAverage+'deg)',
                                '-webkit-transform':'rotate('+windDirectionAverage+'deg)',
                                '-o-transform':'rotate('+windDirectionAverage+'deg)'
                            })
                            if(windDirectionAverage>=0&&windDirectionAverage<=22.5||windDirectionAverage>337.5&&windDirectionAverage<=360){
                                that.winddirection = '北'
                            }else if(windDirectionAverage>22.5&&windDirectionAverage<=67.5){
                                that.winddirection = '东北'
                            }else if(windDirectionAverage>37.5&&windDirectionAverage<=112.5){
                                that.winddirection = '东'
                            }else if(windDirectionAverage>112.5&&windDirectionAverage<=157.5){
                                that.winddirection = '东南'
                            }else if(windDirectionAverage>157.5&&windDirectionAverage<=202.5){
                                that.winddirection = '南'
                            }else if(windDirectionAverage>202.5&&windDirectionAverage<=247.5){
                                that.winddirection = '西南'
                            }else if(windDirectionAverage>247.5&&windDirectionAverage<=292.5){
                                that.winddirection = '西'
                            }else if(windDirectionAverage>292.5&&windDirectionAverage<=337.5){
                                that.winddirection = '西北'
                            }
                        }
                        
                        // 风速
                        if(that.tableData5[0].windSpeedAverage!=''||that.tableData5[0].windSpeedAverage!=null){
                            var windSpeedAverage = that.tableData5[0].windSpeedAverage.split('M')[0]
                            if(windSpeedAverage<=0.2){
                                that.windspeed = '无风'
                            }else if(windSpeedAverage>=0.3&&windSpeedAverage<=1.5){
                                that.windspeed = '软风'
                            }else if(windSpeedAverage>=1.6&&windSpeedAverage<=3.3){
                                that.windspeed = '轻风'
                            }else if(windSpeedAverage>=3.4&&windSpeedAverage<=5.4){
                                that.windspeed = '微风'
                            }else if(windSpeedAverage>=5.5&&windSpeedAverage<=7.9){
                                that.windspeed = '和风'
                            }else if(windSpeedAverage>=8.0&&windSpeedAverage<=10.7){
                                that.windspeed = '劲风'
                            }else if(windSpeedAverage>=10.8&&windSpeedAverage<=13.8){
                                that.windspeed = '强风'
                            }else if(windSpeedAverage>=13.9&&windSpeedAverage<=17.1){
                                that.windspeed = '疾风'
                            }else if(windSpeedAverage>=17.2&&windSpeedAverage<=20.7){
                                that.windspeed = '大风'
                            }else if(windSpeedAverage>=20.8&&windSpeedAverage<=24.4){
                                that.windspeed = '烈风'
                            }else if(windSpeedAverage>=24.5&&windSpeedAverage<=28.4){
                                that.windspeed = '狂风'
                            }else if(windSpeedAverage>=28.5&&windSpeedAverage<=32.6){
                                that.windspeed = '暴风'
                            }else if(windSpeedAverage>=32.7){
                                that.windspeed = '飓风'
                            }
                        }
                        
                        //温度
                        if(that.tableData5[0].temperature!=''||that.tableData5[0].temperature!=null){
                            var temperature = that.tableData5[0].temperature.split('C')[0]
                            if(that.temperature_s==''||temperature!=that.temperature_s){
                                that.temperature_s = temperature
                                var temper1 = new canvasPanel();
                                temper1.bgColor = 'rgb(159,3,3)';
                                temper1.MaxNum = 50;
                                temper1.MinNum = -10;
                                temper1.init('demo1');
                                setTimeout(function(){
                                    temper1.paintNowValue(temperature);
                                },20)
                            }
                        }
                        //湿度
                        if(that.tableData5[0].humidity!=''||that.tableData5[0].humidity!=null){
                            var humidity = that.tableData5[0].humidity.split('P')[0]
                            setTimeout(function(){
                                var myChart2 = that.$echarts.init(document.getElementById('humidity_div'))
                                myChart2.setOption({
                                    series : [
                                        {
                                            name:'湿度',
                                            type:'gauge',
                                            min:10,
                                            max:100,
                                            splitNumber:9,
                                            radius: '90%',
                                            axisLine: {            // 坐标轴线
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                                    width: 3,
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisLabel: {            // 坐标轴小标记
                                                textStyle: {       // 属性lineStyle控制线条样式
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisTick: {            // 坐标轴小标记
                                                length :10,        // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: 'auto',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            splitLine: {           // 分隔线
                                                length :15,         // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                                    width:3,
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            pointer: {           // 分隔线
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5
                                            },
                                            title : {
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            detail : {
                                                backgroundColor: 'rgba(30,144,255,0.8)',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5,
                                                offsetCenter: [0, '85%'],       // x, y，单位px
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    fontSize: 16,
                                                }
                                            },
                                            data:[{value: humidity, name: '湿度/P'}]
                                        }
                                    ]
                                })
                            },80)
                        }
                        
                        //气压
                        if(that.tableData5[0].pressure!=''||that.tableData5[0].pressure!=null){
                            var pressure = that.tableData5[0].pressure.split('.')[0]
                            setTimeout(function(){
                                var myChart3 = that.$echarts.init(document.getElementById('pressure_div'))
                                myChart3.setOption({
                                    series : [
                                        {
                                            name:'气压',
                                            type:'gauge',
                                            min:1000,
                                            max:1080,
                                            splitNumber:4,
                                            radius: '90%',
                                            axisLine: {            // 坐标轴线
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                                    width: 3,
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisLabel: {            // 坐标轴小标记
                                                textStyle: {       // 属性lineStyle控制线条样式
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            axisTick: {            // 坐标轴小标记
                                                length :10,        // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle控制线条样式
                                                    color: 'auto',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            splitLine: {           // 分隔线
                                                length :15,         // 属性length控制线长
                                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                                    width:3,
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            pointer: {           // 分隔线
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5
                                            },
                                            title : {
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    color: '#fff',
                                                    shadowColor : '#fff', //默认透明
                                                    shadowBlur: 5
                                                }
                                            },
                                            detail : {
                                                backgroundColor: 'rgba(30,144,255,0.8)',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                shadowColor : '#fff', //默认透明
                                                shadowBlur: 5,
                                                offsetCenter: [0, '85%'],       // x, y，单位px
                                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                                    fontWeight: 'bolder',
                                                    color: '#fff',
                                                    fontSize: 16,
                                                }
                                            },
                                            data:[{value: pressure, name: '气压/H'}]
                                        }
                                    ]
                                })
                            },80)
                        }
                        
                    },40)
                    $('#sensorscanvas').css('left',lampPoleWidth-15+'px')
                    var canvas = document.getElementById('sensorscanvas');
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath(); //新建一条path
                    ctx.moveTo(5, 15);
                    ctx.lineTo(80, 15); 
                    ctx.lineTo(80,80);
                    ctx.lineTo(180,80); 
                    ctx.strokeStyle = "#00ffff";
                    ctx.stroke(); //绘制路径。
                }
                setTimeout(function(){
                    $('.sensorsDiv').css({
                        'left':lampPoleWidth+165+'px',
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
        window.onresize="";
        clearInterval(this.timer)
        clearInterval(this.timer2)
        clearInterval(this.timer3)
        this.timer = null
        this.timer2 = null
        this.timer3 = null
        $("#RollTexts_a").remove();
        $('#previews_div').html('')
        
    },
    beforeDestroy() {
        window.onresize="";
        clearInterval(this.timer)
        clearInterval(this.timer2)
        clearInterval(this.timer3)
        this.timer = null
        this.timer2 = null
        this.timer3 = null
        $("#RollTexts_a").remove();
        $('#previews_div').html('')
    },
}
</script>
<style scoped>
.mapDetails{width: 100%;height:100%;display: flex;justify-content: center;align-items: center;overflow: auto;background: linear-gradient(to right, #050913, #0a235c, #2161d6, #0a235c, #010920);}
#dg{position: absolute;top:35px;}
/* background-color: rgba(10,24,57,1); */
.lampPoleDiv,.sensorsDiv,.screenDiv{position: absolute;max-width:580px;min-height:70px;top: -30px;font-size: 18px;border-radius: 10px;}
.transparent{width: 100%;height: 100%;border-radius: 10px;position: absolute;top: 0;left: 0;background: black;opacity: 0.1;}
.screenDiv{top:40%;margin-top:100px;}
.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.backtrack{font-size: 34px;cursor: pointer;}
.panel-default,.panel-heading{border-top-left-radius: 10px;border-top-right-radius: 10px;}
.panel-default,.panel-default>div:nth-of-type(2){border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;}
 
.brightness{text-align: center;}
.brightness>span{display: inline-block;width: 35px;height: 40px;margin-left: 5px;}
.brightness_span_color1{background: #5f605b;}
.brightness_span_color2{background: #ffff00;}
.online{position: absolute;height: 42px;right: 15px;display: inline-block;top:7px;}
.online>img{height: 60%;}
.Environmental{display: flex;justify-content: center;}
.Environmental>div{width:50%;text-align: center;display: flex;justify-content: center;}
.Environmental>div>p:nth-of-type(1){width:120px;height: 75px;color: black;font-size: 55px;line-height: 75px;font-weight: 600;}
.Environmental>div>p:nth-of-type(2){width: 100px;height: 85px;margin-top:-7px;}
.Environmental>div>p:nth-of-type(2)>span{display: inline-block;color: aquamarine;}
.Environmental>div>p:nth-of-type(2)>span:nth-of-type(1){font-size: 36px;}
.Environmental>div>p:nth-of-type(2)>span:nth-of-type(2){font-size: 16px;padding-top: 10px;}
.Noise{display: flex;justify-content: center;margin-top:25px;}
.Noise>div:nth-of-type(1),.Noise>div:nth-of-type(3){font-size: 40px;line-height: 70px;padding-top: 27px;}
.Noise>div:nth-of-type(1){padding-right: 15px;}
.Noise>div:nth-of-type(3){padding-left: 15px;}
.wind{display: flex;margin-top: 30px;justify-content: center;}
.wind>div:nth-of-type(1){width: 190px;height: 190px;background: url('../../assets/wind1.png') no-repeat;background-size: 100% 100%;}
.wind>div:nth-of-type(1)>img{width: 60px;margin-left: 65px;margin-top: 39px;}
.wind>div:nth-of-type(2){height: 190px;margin-left:40px;}
.wind>div:nth-of-type(2)>p{height: 95px;line-height: 95px;margin: 0;font-size: 30px;}
.sensors_bottom{width: 100%;height: 190px;display: flex;margin-top: 25px;}
.sensors_bottom>div:nth-of-type(1){width: 20%;height: 100%;}
.sensors_bottom>div:nth-of-type(2){margin-left: 15px;}
.sensors_bottom>div:nth-of-type(2),.sensors_bottom>div:nth-of-type(3){width: 40%;height: 100%;}
.humidity>div,.pressure>div{width: 90%;height: 100%;}
</style>

