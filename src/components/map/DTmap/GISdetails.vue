<template>
    <!-- GIS详情 -->
    <div class="GISdetails">
        <div class="map_right" @click="backtrack">
            <i class="backtrack el-icon-back"></i>
        </div>
        <div class="mapDetails">
            <!-- 单灯 -->
            <div class="LampPost">
                <div class="bg"></div>
            </div>
            <!-- 摄像头 -->
            <div class="Camera">
                <div class="bg"></div>
            </div>
            <!-- 气象站 -->
            <div class="sensor" v-if="sensorType&&rightType=='1'">
                <div class="sensorbg"></div>
                <p class="title">名称:{{envSensorsVoList[0].nickName}}</p>
                <div class="section">
                    <div class="section_top_left" style="border-top:1px solid #203f82;">
                        <p>
                            <img src="../../../assets/img/sunlight.png" alt="">
                            空气质量
                        </p>
                        <div>
                            <p>
                                <span>PM2.5:</span>
                                <span class="colorpm2">{{envSensorsVoList[0].pm2}}</span>
                            </p>
                            <p>
                                <span>PM 10:</span>
                                <span class="colorpm10">{{envSensorsVoList[0].pm10}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="section_top_right" style="border-top:1px solid #203f82;border-left:1px solid #203f82;">
                        <p>
                            <img src="../../../assets/img/noise.png" alt="">
                            噪音
                        </p>
                        <div>
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
                            </div>
                            <div>40.2B</div>
                        </div>
                    </div>
                    <div class="section_bottom_left" style="border-top:1px solid #203f82;">
                        <p>
                            <img src="../../../assets/img/Leaf.png" alt="">
                            风向
                        </p>
                        <div class="wind">
                            <div class="wind1">
                                <img class="wind2" src="../../../assets/wind3.png" alt="">
                            </div>
                        </div>
                        <div>
                            <p>风向:{{envSensorsVoList[0].windDirectionAverage}} {{Sdata.winddirection}}/风速:{{envSensorsVoList[0].windSpeedAverage}} {{Sdata.windspeed}}</p>
                            <p></p>
                        </div>
                    </div>
                    <div class="section_bottom_right" style="border-top:1px solid #203f82;border-left:1px solid #203f82;">
                        <p>
                            <img src="../../../assets/img/humidity.png" alt="">
                            温度 湿度 气压
                        </p>
                        <div class="sensors_bottom">
                            <div>
                                <p>&nbsp;&nbsp;温度/℃</p>
                                <div style="width:100%;height:170px;float:left;" id="demo1"></div>
                            </div>
                            <div>
                                <p>&nbsp;&nbsp;湿度/P</p>
                                <div style="width:100%;height:170px;float:left;" id="demo2"></div>
                            </div>
                            <div>
                                <p style="margin: 0;">&nbsp;&nbsp;气压/H</p>
                                <div style="width:100%;height:140px;" id='pressure_div'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 广告屏 -->
            <div class="Screen" v-if="screenType&&rightType=='2'">
                <div class="bg"></div>
            </div>
            <div class="mapIMG">
                <!-- 灯杆 -->
                <img src="../../../assets/img/LampPost.png" alt="">
                <img src="../../../assets/img/d0.png" alt="" style="right:110%;top:30px;">
                <!-- 广告屏 -->
                <img v-if="screenType" src="../../../assets/img/AdvertisingScreen.png" alt="" style="top:45%;right:-42px;">
                <img v-if="screenType&&rightType=='2'" @click="rightType='2'" src="../../../assets/img/p0.png" alt="" style="left:138%;top:50%;">
                <img v-if="screenType&&rightType!='2'" @click="rightType='2'" src="../../../assets/img/p1.png" alt="" style="left:138%;top:50%;">
                <!-- 气象站 -->
                <img v-if="sensorType" src="../../../assets/img/sensor.png" alt="" style="top:0;right:5px;">
                <img v-if="sensorType&&rightType=='1'" @click="rightType='1'" src="../../../assets/img/q0.png" alt="" style="left:100%;top:-20px;">
                <img v-if="sensorType&&rightType!='1'" @click="rightType='1'" src="../../../assets/img/q1.png" alt="" style="left:100%;top:-20px;">
                <!-- 摄像头 -->
                <img v-if="cameraType" src="../../../assets/img/Camera.png" alt="" style="top:45%;right:17px;">  
                <img v-if="cameraType" src="../../../assets/img/t0.png" alt="" style="right:57%;top:42%;">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GIS',
    data () {
        return {
            serverurl:localStorage.serverurl,
            id:'',

            LampVoList:[], //灯具
            LampType:false,
            cameraVoList:[],//摄像头
            cameraType:false,
            envSensorsVoList:[],//气象站
            sensorType:false,
            screenVoList:[], //广告屏
            screenType:false,
            rightType:'',//1为气象站 2为广告屏

            Sdata:{
                winddirection:'',//风向
                windspeed:'',//风速
                temperature:'',//温度
                humidity:'',//湿度
            }
        }
    },
    mounted(){
    },
    methods:{
        //请求灯杆基本数据以及挂载数据
        ready(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole/'+that.id,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    console.log(data)
                    //灯具
                    if(data.LampVoList.length==0){
                        that.LampVoList = []
                        that.LampType = false
                    }else{
                        that.LampVoList = data.LampVoList
                        that.LampType = true
                    }
                    //摄像头
                    if(data.cameraVoList.length==0){
                        that.LampVoList = []
                        that.cameraType = false
                    }else{
                        that.cameraVoList = data.cameraVoList
                        that.cameraType = true
                    }
                    //气象站
                    if(data.envSensorsVoList.length==0){
                        that.LampVoList = []
                        that.sensorType = false
                        that.rightType = ''
                    }else{
                        that.envSensorsVoList = data.envSensorsVoList
                        that.sensorType = true
                        that.rightType = '1'
                    }
                    //屏幕
                    if(data.screenVoList.length==0){
                        that.screenVoList = []
                        that.screenType = false
                    }else{
                        that.screenVoList = data.screenVoList
                        that.screenType = true
                        if(that.rightType==''){
                            that.rightType = '2'
                        }
                    }
                    setTimeout(function(){
                        that.Rendering(that.rightType)
                    },100)
                }
            })
        },
        //气象站/广告屏切换
        Rendering(val){
            var that = this
            //1为气象站 2为广告屏
            if(val=='1'){
                // PM2.5   PM10
                if(that.envSensorsVoList[0].pm2<35){
                    $('.colorpm2').css('background','#a7cf8c')
                }else if(that.envSensorsVoList[0].pm2>=35&&that.envSensorsVoList[0].pm2<75){
                    $('.colorpm2').css('background-color','#f7da64')
                }else if(that.envSensorsVoList[0].pm2>=75&&that.envSensorsVoList[0].pm2<115){
                    $('.colorpm2').css('background','#f29e39')
                }else if(that.envSensorsVoList[0].pm2>=115&&that.envSensorsVoList[0].pm2<150){
                    $('.colorpm2').css('background','#da555d')
                }else if(that.envSensorsVoList[0].pm2>=150&&that.envSensorsVoList[0].pm2<250){
                    $('.colorpm2').css('background','#b9377a')
                }else if(that.envSensorsVoList[0].pm2>=250){
                    $('.colorpm2').css('background','#881326')
                }
                if(that.envSensorsVoList[0].pm10<=50){
                    $('.colorpm10').css('background','#a7cf8c')
                }else if(that.envSensorsVoList[0].pm10>=51&&that.envSensorsVoList[0].pm10<=150){
                    $('.colorpm10').css('background-color','#f7da64')
                }else if(that.envSensorsVoList[0].pm10>=151&&that.envSensorsVoList[0].pm10<=250){
                    $('.colorpm10').css('background','#f29e39')
                }else if(that.envSensorsVoList[0].pm10>=251&&that.envSensorsVoList[0].pm10<=350){
                    $('.colorpm10').css('background','#da555d')
                }else if(that.envSensorsVoList[0].pm10>=351&&that.envSensorsVoList[0].pm10<=420){
                    $('.colorpm10').css('background','#b9377a')
                }else if(that.envSensorsVoList[0].pm10>=421){
                    $('.colorpm10').css('background','#881326')
                }
                // 噪声
                for(var i=1;i<12;i++){
                    $('.Noise2>span').eq(i).css({
                        'display':'inline-block',
                        'width':'5px',
                        'height':i*7+'px',
                        'background':'white',
                    })
                }
                if(that.envSensorsVoList[0].noiseAverage!=null){
                    var noiseAverage = Number(that.envSensorsVoList[0].noiseAverage.split('.')[0])
                    var noiseAverageNumber = ''
                    if(noiseAverage<=28){
                        noiseAverageNumber = 2
                    }else if(noiseAverage>28&&noiseAverage<=42){
                        noiseAverageNumber = 3
                    }else if(noiseAverage>42&&noiseAverage<=56){
                        noiseAverageNumber = 4
                    }else if(noiseAverage>56&&noiseAverage<=70){
                        noiseAverageNumber = 5
                    }else if(noiseAverage>70&&noiseAverage<=84){
                        noiseAverageNumber = 6
                    }else if(noiseAverage>84&&noiseAverage<=126){
                        noiseAverageNumber = 7
                    }else if(noiseAverage>126&&noiseAverage<=140){
                        noiseAverageNumber = 8
                    }else if(noiseAverage>140&&noiseAverage<=154){
                        noiseAverageNumber = 9
                    }else if(noiseAverage>154&&noiseAverage<=168){
                        noiseAverageNumber = 10
                    }else if(noiseAverage>168){
                        noiseAverageNumber = 11
                    }
                    for(var s=1;s<noiseAverageNumber;s++){
                        $('.Noise2>span').eq(s).css('background','#ff6707')
                    }
                }
                // 风向
                if(that.envSensorsVoList[0].windDirectionAverage!=null){
                    var windDirectionAverage = that.envSensorsVoList[0].windDirectionAverage.split('D')[0]
                    $('.wind2').css({
                        'transform':'rotate('+windDirectionAverage+'deg)',
                        '-ms-transform':'rotate('+windDirectionAverage+'deg)',
                        '-moz-transform':'rotate('+windDirectionAverage+'deg)',
                        '-webkit-transform':'rotate('+windDirectionAverage+'deg)',
                        '-o-transform':'rotate('+windDirectionAverage+'deg)'
                    })
                    if(windDirectionAverage>=0&&windDirectionAverage<=22.5||windDirectionAverage>337.5&&windDirectionAverage<=360){
                        that.Sdata.winddirection = '北'
                    }else if(windDirectionAverage>22.5&&windDirectionAverage<=67.5){
                        that.Sdata.winddirection = '东北'
                    }else if(windDirectionAverage>37.5&&windDirectionAverage<=112.5){
                        that.Sdata.winddirection = '东'
                    }else if(windDirectionAverage>112.5&&windDirectionAverage<=157.5){
                        that.Sdata.winddirection = '东南'
                    }else if(windDirectionAverage>157.5&&windDirectionAverage<=202.5){
                        that.Sdata.winddirection = '南'
                    }else if(windDirectionAverage>202.5&&windDirectionAverage<=247.5){
                        that.Sdata.winddirection = '西南'
                    }else if(windDirectionAverage>247.5&&windDirectionAverage<=292.5){
                        that.Sdata.winddirection = '西'
                    }else if(windDirectionAverage>292.5&&windDirectionAverage<=337.5){
                        that.Sdata.winddirection = '西北'
                    }
                }
                // 风速
                if(that.envSensorsVoList[0].windSpeedAverage!=null){
                    var windSpeedAverage = that.envSensorsVoList[0].windSpeedAverage.split('M')[0]
                    if(windSpeedAverage<=0.2){
                        that.Sdata.windspeed = '无风'
                    }else if(windSpeedAverage>=0.3&&windSpeedAverage<=1.5){
                        that.Sdata.windspeed = '软风'
                    }else if(windSpeedAverage>=1.6&&windSpeedAverage<=3.3){
                        that.Sdata.windspeed = '轻风'
                    }else if(windSpeedAverage>=3.4&&windSpeedAverage<=5.4){
                        that.Sdata.windspeed = '微风'
                    }else if(windSpeedAverage>=5.5&&windSpeedAverage<=7.9){
                        that.Sdata.windspeed = '和风'
                    }else if(windSpeedAverage>=8.0&&windSpeedAverage<=10.7){
                        that.Sdata.windspeed = '劲风'
                    }else if(windSpeedAverage>=10.8&&windSpeedAverage<=13.8){
                        that.Sdata.windspeed = '强风'
                    }else if(windSpeedAverage>=13.9&&windSpeedAverage<=17.1){
                        that.Sdata.windspeed = '疾风'
                    }else if(windSpeedAverage>=17.2&&windSpeedAverage<=20.7){
                        that.Sdata.windspeed = '大风'
                    }else if(windSpeedAverage>=20.8&&windSpeedAverage<=24.4){
                        that.Sdata.windspeed = '烈风'
                    }else if(windSpeedAverage>=24.5&&windSpeedAverage<=28.4){
                        that.Sdata.windspeed = '狂风'
                    }else if(windSpeedAverage>=28.5&&windSpeedAverage<=32.6){
                        that.Sdata.windspeed = '暴风'
                    }else if(windSpeedAverage>=32.7){
                        that.Sdata.windspeed = '飓风'
                    }
                }
                //温度
                // if(that.envSensorsVoList[0].temperature!=null){
                    // var temperature = that.envSensorsVoList[0].temperature.split('C')[0]
                    var temperature = '40'
                    that.Sdata.temperature = temperature
                    var temper1 = new canvasPanel();
                    temper1.bgColor = '#b52206';
                    temper1.MaxNum = 45;
                    temper1.MinNum = -15;
                    temper1.danwei = '℃'
                    temper1.init('demo1');
                    setTimeout(function(){
                        temper1.paintNowValue(temperature);
                    },20)
                // }

                //湿度
                // if(that.envSensorsVoList[0].humidity!=null){
                    // var humidity = that.envSensorsVoList[0].humidity.split('P')[0]
                    var humidity = '35'
                    that.Sdata.humidity = humidity
                    var temper2 = new canvasPanel();
                    temper2.bgColor = '#001462';
                    temper2.MaxNum = 45;
                    temper2.MinNum = -15;
                    temper2.danwei = 'P'
                    temper2.init('demo2');
                    setTimeout(function(){
                        temper2.paintNowValue(humidity);
                    },20)
                // }
                
                //气压
                // if(that.envSensorsVoList[0].pressure!=null){
                    // var pressure = that.tableData5[0].pressure.split('.')[0]
                    var pressure = '150'
                    var myChart3 = that.$echarts.init(document.getElementById('pressure_div'))
                    myChart3.setOption({
                        series : [
                            {
                                name:'气压',
                                type:'gauge',
                                min:1000,
                                max:1080,
                                splitNumber:4,
                                radius: '80%',
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
                // }
            }
            if(val=='2'){}
        },
        //返回上一级
        backtrack(){this.$router.go(-1)},
    },
    created(){
        this.id = this.$route.query.id
        this.ready()
    },
    watch:{
        // rightType(val){
        //     this.Rendering(val)
        // }
    },
    beforeDestroy(){

    }
}
</script>
<style scoped> 
.GISdetails{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;min-height: 800px;overflow: auto;background: linear-gradient(to right, #050913, #0a235c, #2161d6, #0a235c, #010920);}
.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.backtrack{font-size: 34px;cursor: pointer;padding-top: 5px;}
.mapDetails{position: relative;display: flex;width: 500px;justify-content: center;margin-left: 70px;}
.mapDetails div{color: white;}
.LampPost{position: absolute;left:0;top:0;margin-left: -470px;width: 450px;height: 150px;}
.Camera{position: absolute;left:0;top:45%;margin-left: -470px;width: 450px;height: 150px;}
.sensor{position: absolute;right:0;top:0;margin-right: -620px;width: 600px;}
.Screen{position: absolute;right:0;top:50%;margin-right: -470px;width: 450px;height: 150px;}
.bg{position: absolute;width: 100%;height: 100%;background: #303e60;opacity: 0.3;border-radius: 10px;}
.sensorbg{position: absolute;width: 100%;height: 100%;background: #303e60;opacity: 0.3;border-radius: 10px;}
.title{font-size: 18px;margin: 0;padding: 20px 0 20px 15px;}
.section{width: 570px;margin: 0 30px 20px 15px;display: flex;flex-wrap: wrap;}
.section>div{display: inline-block;width: 50%;}
.section_top_left>p,.section_top_right>p,.section_bottom_left>p,.section_bottom_right>p{margin: 0;padding: 20px 0px;text-align: center;font-size: 22px;color: #666d7a}
.section_top_left>div{margin-top:40px;text-align: center;}
.section_top_left>div>p{margin-bottom:20px;text-align: center;font-size: 16px;}
.section_top_left>div>p>span:nth-of-type(2){display:inline-block;width:70px;height:30px;line-height:30px;font-weight:600;border-radius:5px;color: #010000;font-size: 19px;background:#72d671;}
.section_top_right>div{display: flex;justify-content: center;margin-top: 50px;}
.section_top_right div:nth-of-type(2){font-size: 20px;font-weight: 600;padding-top: 45px;}
.Noise2{width:100px;height:70px;}
.Noise2>span{border-radius: 5px;} 
.wind{display: flex;justify-content: center;}
.wind1{width: 170px;height:170px;background: url('../../../assets/wind1.png') no-repeat;background-size: 100% 100%;}
.wind2{width: 60px;margin-left: 55px;margin-top: 35px;}
.section_bottom_left>div:nth-of-type(2){text-align: center;font-size: 16px;}
.sensors_bottom{display: flex;width: 100%;height: 190px;}
.sensors_bottom>div:nth-of-type(1),.sensors_bottom>div:nth-of-type(2){width: 25%}
.sensors_bottom>div:nth-of-type(3){width: 50%;padding-top: 30px;padding-left: 5px;}
.sensors_bottom>div{height: 190px;text-align: center;}

.mapIMG{position: relative;height: 767px;margin-left: -70px;}
.mapIMG>img:nth-of-type(1){height: 100%;}
.mapIMG>img:nth-child(n+2){position: absolute;}
</style>
