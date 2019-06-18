<template>
    <!-- 气象站历史数据 -->
    <div class="historicalData">
        <el-button @click="backtrack" type="warning" size='small' icon="el-icon-arrow-left" style="position:absolute;top:5px;left:220px;z-index:9999;">返回</el-button>
        <el-tabs v-model="activeName" @tab-click="activeName_change" type="border-card" style="height:100%;">
            <el-tab-pane label="列表展示" name="0">
                <div class="historicalData_top">
                    <div>
                        <span>日期:</span>
                        <el-date-picker
                        v-model="value"
                        style="width:340px;"
                        size='small'
                        type="datetimerange"
                        range-separator="-"
                        value-format='yyyy-MM-dd HH:mm:ss'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-button type="primary" @click="search" size='small' style="height:32px;margin-top:4px;margin-left:15px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="historicalData_bottom">
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
                        prop="concentratorSn"
                        align='center'
                        label="集中器标识"
                        min-width="120">
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
                        prop="pM2"
                        align='center'
                        label="PM2.5"
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="pM10"
                        label="PM10"
                        align='center'
                        min-width="80"
                        :formatter="formatRole">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="时间"
                        align='center'
                        min-width="160"
                        :formatter="formatRole">
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
            </el-tab-pane>
            <el-tab-pane label="图表展示" name="1">
                <div class="historicalData_top">
                    <div>
                        <span>日期:</span>
                        <el-date-picker
                        v-model="value1"
                        style="width:340px;"
                        size='small'
                        type="datetimerange"
                        range-separator="-"
                        value-format='yyyy-MM-dd HH:mm:ss'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-button @click="search" type="primary" size='small' style="height:32px;margin-top:4px;margin-left:15px;" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="historicalData_bottom historicalData_bottom2">
                    <div class="historicalData_bottom_echarts" id="myChart"></div>
                    <div class="historicalData_bottom_echarts" id="myChart1"></div>
                    <div class="historicalData_bottom_echarts" id="myChart2"></div>
                    <div class="historicalData_bottom_echarts" id="myChart3"></div>
                    <div class="historicalData_bottom_echarts" id="myChart4"></div>
                    <div class="historicalData_bottom_echarts" id="myChart5"></div>
                    <div class="historicalData_bottom_echarts" id="myChart6"></div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

export default {
    name: 'chargingPile',
    data () {
        return {
            serverurl:localStorage.serverurl,
            activeName:'0',
            tableData:[],
            site:[],
            pageSize:10,
            pageIndex:1,
            total:50,
            value:'',
            value1:''
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
        activeName_change(){
            this.ready()
        },
        ready(){
            var that = this;
            var url = ''
            var data = {}
            data.projectIds = sessionStorage.projectId
            url='/v1/solin/sensor/env/log/data'
            data.concentratorSn = sessionStorage.concentratorSn 
            if(this.activeName=='0'){
                data.page = this.pageIndex
                data.size = this.pageSize
                if(this.value==null||this.value==''||this.value==undefined||this.value.length==0){
                    
                }else{
                    data.startTime=that.value[0]
                    data.endTime=that.value[1]
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+url,
                    contentType:'application/json;charset=UTF-8',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.activeName=='0'){
                                that.tableData = data.result.envDatas
                                that.total = data.result.total
                            }
                        }else{
                            that.errorCode(data)
                        }
                    },
                })
            };
            if(this.activeName=='1'){
                if(this.value1==null||this.value1==''||this.value1==undefined||this.value1.length==0){   
                }else{
                    data.startTime=that.value1[0]
                    data.endTime=that.value1[1]
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+url,
                    contentType:'application/json;charset=UTF-8',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            var key = data.result
                            // 将二进制字符串转换为字符数组
                            var charData = key.split('').map(function (x) { return x.charCodeAt(0); });
                            // 将数字数组转换成字节数组
                            var binData = new Uint8Array(charData);
                            // 解压
                            var datas = pako.inflate(binData);
                            // 将GunZip ByTAREAR转换回ASCII字符串
                            var key2 = String.fromCharCode.apply(null, new Uint16Array(datas));
                            //  解压后解码，防止中文乱码
                            key2 = unescape(key2)
                            //将string对象转化为json对象并重新赋值
                            data.result = $.parseJSON(key2)
                            var myChart = that.$echarts.init(document.getElementById('myChart'))
                            var myChart1 = that.$echarts.init(document.getElementById('myChart1'))
                            var myChart2 = that.$echarts.init(document.getElementById('myChart2'))
                            var myChart3 = that.$echarts.init(document.getElementById('myChart3'))
                            var myChart4 = that.$echarts.init(document.getElementById('myChart4'))
                            var myChart5 = that.$echarts.init(document.getElementById('myChart5'))
                            var myChart6 = that.$echarts.init(document.getElementById('myChart6'))
                            var time = [];var temperature = [];var humidity = [];var pressure = [];var Noise = [];var PM2 =[];var PM10 = [];var windspeed = []
                            for(let i=0;i<data.result.envDatas.length;i++){
                                time.push(data.result.envDatas[i].createTime) //时间
                                temperature.push(data.result.envDatas[i].temperature.substr(0, data.result.envDatas[i].temperature.length - 1))  //温度
                                humidity.push(data.result.envDatas[i].humidity.substr(0, data.result.envDatas[i].humidity.length - 1))  //湿度
                                pressure.push(data.result.envDatas[i].pressure.substr(0, data.result.envDatas[i].pressure.length - 1))  //气压
                                Noise.push(data.result.envDatas[i].noiseAverage.substr(0, data.result.envDatas[i].noiseAverage.length - 1))  //噪声
                                PM2.push(data.result.envDatas[i].pM2.substr(0, data.result.envDatas[i].pM2.length - 1))  //PM2.5
                                PM10.push(data.result.envDatas[i].pM10.substr(0, data.result.envDatas[i].pM10.length - 1))  //PM2.5
                                windspeed.push(data.result.envDatas[i].windSpeedAverage.substr(0, data.result.envDatas[i].windSpeedAverage.length - 1)) //风速
                            }
                            //温度
                            myChart.setOption({
                                title: {
                                    text: '温度',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    name:'℃',
                                    nameGap:10,
                                    min:-40,
                                    max:60,
                                    type: 'value',
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 48,
                                },
                                series: [
                                    {
                                        name:'温度',
                                        type:'line',
                                        smooth: true,
                                        data: temperature,
                                    }
                                ]
                            })
                            //湿度
                            myChart1.setOption({
                                title: {
                                    text: '湿度',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'%RH',
                                    nameGap:10,
                                    min:0,
                                    max:100,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 48
                                },
                                series: [
                                    {
                                        name:'湿度',
                                        type:'line',
                                        smooth: true,
                                        data: humidity,
                                    }
                                ]
                            })
                            //气压
                            myChart2.setOption({
                                title: {
                                    text: '气压',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'百帕',
                                    nameGap:10,
                                    min:10,
                                    max:1300,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 55
                                },
                                series: [
                                    {
                                        name:'气压',
                                        type:'line',
                                        smooth: true,
                                        data: pressure,
                                    }
                                ]
                            })
                            //噪声
                            myChart3.setOption({
                                title: {
                                    text: '噪声',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'dB(A)',
                                    nameGap:10,
                                    min:30,
                                    max:130,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 40
                                },
                                series: [
                                    {
                                        name:'噪声',
                                        type:'line',
                                        smooth: true,
                                        data: Noise,
                                    }
                                ]
                            })
                            //PM2.5
                            myChart4.setOption({
                                title: {
                                    text: 'PM2.5',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'ug/m3',
                                    nameGap:10,
                                    min:0,
                                    max:1000,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 40
                                },
                                series: [
                                    {
                                        name:'PM2.5',
                                        type:'line',
                                        smooth: true,
                                        data: PM2,
                                    }
                                ]
                            })
                            //PM10
                            myChart5.setOption({
                                title: {
                                    text: 'PM10',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'ug/m3',
                                    nameGap:10,
                                    min:0,
                                    max:1000,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 40
                                },
                                series: [
                                    {
                                        name:'PM10',
                                        type:'line',
                                        smooth: true,
                                        data: PM10,
                                    }
                                ]
                            })
                            //风速
                            myChart6.setOption({
                                title: {
                                    text: '风速',
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: time,
                                },
                                axisLabel:{  
                                    interval: 0,  
                                    formatter:function(value)  
                                    {  
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
                                yAxis: {
                                    type: 'value',
                                    name:'米/秒',
                                    nameGap:10,
                                    min:0,
                                    max:60,
                                    scale: true,
                                    axisLabel: {
                                        margin: 8,
                                        formatter:'{value}'
                                    },
                                },
                                grid: {
                                    left: 40
                                },
                                series: [
                                    {
                                        name:'风速',
                                        type:'line',
                                        smooth: true,
                                        data: windspeed,
                                    }
                                ]
                            })
                        }else{
                            that.errorCode(data)
                        }
                    },
                })
            };
        },
        search(){
            this.ready()
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
        //返回上一级
        backtrack(){this.$router.go(-1);},
    },
    created() {
        
    },
}
</script>
<style scoped>
.historicalData{width: 100%;height: 100%;border: 1px solid #E4E4F1;}
.historicalData_top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: center;}
.historicalData_bottom{position: absolute;top: 60px;bottom: 0;left: 0;right: 0;}
.historicalData_bottom2{display: flex;justify-content: center;flex-wrap: wrap;overflow: auto;}
.historicalData_bottom_echarts{width: 350px;height: 250px;margin-left: 3%;}
.block{text-align: center;}
</style>
