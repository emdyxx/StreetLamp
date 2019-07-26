<template>
    <div class="SceneryDetails">
        <div class="map_right" @click="backtrack">
            <i class="backtrack el-icon-back"></i>
        </div>
        <div class="SceneryDetails_top">
            <span>时间检索:</span>
            <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            value-format='yyyy-MM-dd HH:mm:ss'
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange">
            </el-date-picker>
        </div>
        <div class="SceneryDetails_bottom">
            <div>
                <div>
                    <div class="title">
                        <img src="../../../assets/img/Ellipse.png" alt="">
                        <span>电量&nbsp;/&nbsp;</span>
                        <span>(单位: &nbsp;%)</span>
                    </div>
                    <div id="myCharts1"></div>
                </div>
                <div>
                    <div class="title">
                        <img src="../../../assets/img/Ellipse.png" alt="">
                        <span>电流&nbsp;/&nbsp;</span>
                        <span>(单位: &nbsp;MA)</span>
                    </div>
                    <div id="myCharts2"></div>
                </div>
            </div>
            <div>
                <div>
                    <div class="title">
                        <img src="../../../assets/img/Ellipse.png" alt="">
                        <span>功率&nbsp;/&nbsp;</span>
                        <span>(单位: &nbsp;W)</span>
                    </div>
                    <div id="myCharts3"></div>
                </div>
                <div>
                    <div class="title">
                        <img src="../../../assets/img/Ellipse.png" alt="">
                        <span>电压&nbsp;/&nbsp;</span>
                        <span>(单位: &nbsp;V)</span>
                    </div>
                    <div id="myCharts4"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SceneryDetails',
    data () {
        return {
            serverurl:localStorage.serverurl,
            id:'',
            value1:'',
            value3:'',
            value2:'',
            value4:'',
            value5:'',
        }
    },
    mounted(){
        
    },
    methods:{
        ready(){
            var that = this;
            var startTime = ''
            var endTime = ''
            if(that.value1==null||that.value1.length==0){
                startTime = ''
                endTime = ''
            }else{
                startTime = that.value1[0]
                endTime = that.value1[1]
            }
            $.ajax({
                type:"get",
                url:that.serverurl+'/v1/solin/windSolarSensors/log/data',
                dataType:"json",
                async: false,
                data:{
                    windSolarSensorsId:that.id,
                    startTime:startTime,
                    endTime:endTime
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        setTimeout(() => {
                            var myChart0 = that.$echarts.init(document.getElementById('myCharts1'))
                            var myChart1 = that.$echarts.init(document.getElementById('myCharts2'))
                            var myChart2 = that.$echarts.init(document.getElementById('myCharts3'))
                            var myChart3 = that.$echarts.init(document.getElementById('myCharts4'))
                            var time = []
                            var electricPower = []//电量
                            var solarEngIma = []//太阳能电流
                            var fanIma = []//风机电流
                            var solarEngPower = []//太阳能功率
                            var fanPower = []//风机功率
                            var batteryVoltage = [] //电池电压
                            var solarEngVoltage = []//太阳能电压
                            var fanVoltage = []//风机电压
                            for(var i=0;i<data.result.list.length;i++){
                                time.push(data.result.list[i].createTime)
                                electricPower.push(data.result.list[i].electricPower)
                                solarEngIma.push(data.result.list[i].solarEngIma)
                                fanIma.push(data.result.list[i].fanIma)
                                solarEngPower.push(data.result.list[i].solarEngPower)
                                fanPower.push(data.result.list[i].fanPower)
                                batteryVoltage.push(data.result.list[i].batteryVoltage)
                                solarEngVoltage.push(data.result.list[i].solarEngVoltage)
                                fanVoltage.push(data.result.list[i].fanVoltage)
                            }
                            //电量
                            myChart0.setOption({
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '3%',
                                    bottom: '0',
                                    top:'8%',
                                    containLabel: true
                                },
                                xAxis :{
                                    type : 'category',
                                    boundaryGap : false,
                                    data :  time,
                                    splitNumber:5,
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        },
                                        interval:10
                                    },
                                    axisTick:{show:false},
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  {  
                                        var ret = "";//拼接加\n返回的类目项  
                                        var maxLength = 10;//每项显示文字个数  
                                        var valLength = value.length;//X轴类目项的文字个数  
                                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                        if (rowN > 1)//如果类目项的文字大于3,  
                                        {  
                                            for (var i = 0; i < rowN; i++) {  
                                                var temp = "";//每次截取的字符串  
                                                var start = i * maxLength;//开始截取的位置  
                                                var end = start + maxLength;//结束截取的位置  
                                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                                temp = value.substring(start, end) + "\n";  
                                                ret += temp; //凭借最终的字符串  
                                            }  
                                            return ret;  
                                        }  
                                        else {  
                                            return value;  
                                        }  
                                    }  
                                },
                                yAxis : {
                                    type : 'value',
                                    // min:0,
                                    // max:100,
                                    axisTick:{show:false},
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        }
                                    },
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    splitLine:{
                                        show:false
                                    }
                                },
                                series : [
                                    {
                                        name:'电量',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#026B6F',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#009991'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#009895',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        symbol:'none',
                                        data:  electricPower
                                    }
                                ]
                            });
                            //电流
                            myChart1.setOption({
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                    data:[
                                        {
                                            name: '太阳能',
                                            textStyle: {
                                                color: '#009991'
                                            }
                                        },
                                        {
                                            name: '风机',
                                            textStyle: {
                                                color: '#e86d0d'
                                            }
                                        }
                                    ]
                                },
                                grid: {
                                    left: '3%',
                                    right: '3%',
                                    bottom: '0',
                                    top:'8%',
                                    containLabel: true
                                },
                                xAxis :{
                                    type : 'category',
                                    boundaryGap : false,
                                    data :  time,
                                    splitNumber:5,
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        },
                                        interval:10
                                    },
                                    axisTick:{show:false},
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  {  
                                        var ret = "";//拼接加\n返回的类目项  
                                        var maxLength = 10;//每项显示文字个数  
                                        var valLength = value.length;//X轴类目项的文字个数  
                                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                        if (rowN > 1)//如果类目项的文字大于3,  
                                        {  
                                            for (var i = 0; i < rowN; i++) {  
                                                var temp = "";//每次截取的字符串  
                                                var start = i * maxLength;//开始截取的位置  
                                                var end = start + maxLength;//结束截取的位置  
                                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                                temp = value.substring(start, end) + "\n";  
                                                ret += temp; //凭借最终的字符串  
                                            }  
                                            return ret;  
                                        }  
                                        else {  
                                            return value;  
                                        }  
                                    }  
                                },
                                yAxis : {
                                    type : 'value',
                                    // min:0,
                                    // max:100,
                                    axisTick:{show:false},
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        }
                                    },
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    splitLine:{
                                        show:false
                                    }
                                },
                                series : [
                                    {
                                        name:'太阳能',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#026B6F',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#009991'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#009895',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        symbol:'none',
                                        data:solarEngIma
                                    },
                                    {
                                        name:'风机',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#e86d0d',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#e86d0d'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#e86d0d',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        symbol:'none',
                                        data:fanIma
                                    }
                                ]
                            });
                            //功率
                            myChart2.setOption({
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                    data:[
                                        {
                                            name: '太阳能',
                                            textStyle: {
                                                color: '#009991'
                                            }
                                        },
                                        {
                                            name: '风机',
                                            textStyle: {
                                                color: '#e86d0d'
                                            }
                                        }
                                    ]
                                },
                                grid: {
                                    left: '3%',
                                    right: '3%',
                                    bottom: '0',
                                    top:'8%',
                                    containLabel: true
                                },
                                xAxis :{
                                    type : 'category',
                                    boundaryGap : false,
                                    data :  time,
                                    splitNumber:5,
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        },
                                        interval:10
                                    },
                                    axisTick:{show:false},
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  {  
                                        var ret = "";//拼接加\n返回的类目项  
                                        var maxLength = 10;//每项显示文字个数  
                                        var valLength = value.length;//X轴类目项的文字个数  
                                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                        if (rowN > 1)//如果类目项的文字大于3,  
                                        {  
                                            for (var i = 0; i < rowN; i++) {  
                                                var temp = "";//每次截取的字符串  
                                                var start = i * maxLength;//开始截取的位置  
                                                var end = start + maxLength;//结束截取的位置  
                                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                                temp = value.substring(start, end) + "\n";  
                                                ret += temp; //凭借最终的字符串  
                                            }  
                                            return ret;  
                                        }  
                                        else {  
                                            return value;  
                                        }  
                                    }  
                                },
                                yAxis : {
                                    type : 'value',
                                    // min:0,
                                    // max:100,
                                    axisTick:{show:false},
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        }
                                    },
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    splitLine:{
                                        show:false
                                    }
                                },
                                series : [
                                    {
                                        name:'太阳能',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#026B6F',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#009991'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#009895',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        symbol:'none',
                                        data:solarEngPower
                                    },
                                    {
                                        name:'风机',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#e86d0d',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#e86d0d'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#e86d0d',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        symbol:'none',
                                        data:fanPower
                                    }
                                ]
                            });
                            //电压
                            myChart3.setOption({
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                    data:[
                                        {
                                            name: '电池',
                                            textStyle: {
                                                color: '#007ce5'
                                            }
                                        },
                                        {
                                            name: '太阳能',
                                            textStyle: {
                                                color: '#009991'
                                            }
                                        },
                                        {
                                            name: '风机',
                                            textStyle: {
                                                color: '#e86d0d'
                                            }
                                        }
                                    ]
                                },
                                grid: {
                                    left: '3%',
                                    right: '3%',
                                    bottom: '0',
                                    top:'8%',
                                    containLabel: true
                                },
                                xAxis :{
                                    type : 'category',
                                    boundaryGap : false,
                                    data :  time,
                                    splitNumber:5,
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        },
                                        interval:10
                                    },
                                    axisTick:{show:false},
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  {  
                                        var ret = "";//拼接加\n返回的类目项  
                                        var maxLength = 10;//每项显示文字个数  
                                        var valLength = value.length;//X轴类目项的文字个数  
                                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                        if (rowN > 1)//如果类目项的文字大于3,  
                                        {  
                                            for (var i = 0; i < rowN; i++) {  
                                                var temp = "";//每次截取的字符串  
                                                var start = i * maxLength;//开始截取的位置  
                                                var end = start + maxLength;//结束截取的位置  
                                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                                temp = value.substring(start, end) + "\n";  
                                                ret += temp; //凭借最终的字符串  
                                            }  
                                            return ret;  
                                        }  
                                        else {  
                                            return value;  
                                        }  
                                    }  
                                },
                                yAxis : {
                                    type : 'value',
                                    // min:0,
                                    // max:100,
                                    axisTick:{show:false},
                                    axisLabel:{
                                        textStyle:{
                                            color:"white", //刻度颜色
                                            fontSize:8  //刻度大小
                                        }
                                    },
                                    axisLine:{
                                        show:true,
                                        lineStyle:{
                                            color: '#0B3148',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    splitLine:{
                                        show:false
                                    }
                                },
                                series : [
                                    {
                                        name:'电池',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#007ce5',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#007ce5'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#007ce5',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        symbol:'none',
                                        data:batteryVoltage
                                    },
                                    {
                                        name:'太阳能',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#026B6F',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#009991'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#009895',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        symbol:'none',
                                        data:solarEngVoltage
                                    },
                                    {
                                        name:'风机',
                                        type:'line',
                                        smooth:true,
                                        areaStyle:{
                                            normal:{
                                                color:'#e86d0d',
                                                opacity:0.2
                                            }
                                        },
                                        itemStyle : {  
                                                normal : {  
                                                    color:'#e86d0d'
                                                },
                                                lineStyle:{
                                                    normal:{
                                                    color:'#e86d0d',
                                                    opacity:1
                                                }
                                            }
                                        },
                                        symbol:'none',
                                        data:fanVoltage
                                    }
                                ]
                            });
                        }, 100);
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        timeChange(val){
            this.ready()
        },
        //返回上一级
        backtrack(){this.$router.go(-1)},
    },
    created(){
        this.id = this.$route.query.id
        this.ready()
    },
}
</script>
<style scoped>
/*  */
.SceneryDetails{width: 100%;height: 100%;background: url('../../../assets/img/nybj.png') 100% 100% no-repeat;position: relative;}
.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;box-shadow: 1px 2px 1px rgba(0,0,0,.15);z-index: 99;}
.backtrack{font-size: 34px;cursor: pointer;padding-top: 5px;}
.SceneryDetails_top{width: 100%;color: white;font-size: 16px;display: flex;align-items: center;padding: 50px 0 0 50px;}
.SceneryDetails_top>span{padding-right:15px;}
.SceneryDetails_bottom{position: absolute;left: 12%;right: 12%;top: 15%;bottom: 10%;}
.SceneryDetails_bottom>div{width: 100%;height: 45%;display: flex;}
.SceneryDetails_bottom>div:nth-of-type(2){margin-top: 7%;}
.SceneryDetails_bottom>div>div{width: 45%;position: relative;}
.SceneryDetails_bottom>div>div{margin-left: 5%;}
.title{width: 100%;height: 30px;display: flex;align-items: center;}
.title>span:nth-of-type(1){color: white;font-size: 19px;padding-left: 15px;font-weight: 600;}
.title>span:nth-of-type(2){color: #af641b;font-size: 14px;font-weight: bold;}
#myCharts1,#myCharts2,#myCharts3,#myCharts4{position: absolute;top: 30px;bottom: 0;width: 100%;}
</style>
<style lang='less'>
.SceneryDetails_top{
    .el-input__inner{
        background: none !important;
        input{
            background: none !important;
        }
        .el-range-separator{color: white;}
    }
}
</style>

