<template>
    <!-- 地图主页 -->
    <div class="mapHomgPage">
        <div id="allmap"></div>
        <div class="map_left">
            <div class="map_left_left">
                <el-select v-model="value" size='small' style="width:150px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value1" size='small' style="width:150px;" placeholder="请选择">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="map_left_right">
                <i class="el-icon-search"></i>
            </div>
        </div>
        <div class="map_right">
            <i @click="backtrack" class="backtrack iconfont icon-guanbi"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            serverurl:localStorage.serverurl,
            options:[
                {
                    value: '0',
                    label: '杭州快越项目'
                }, 
                {
                    value: '1',
                    label: '嘉兴快越项目'
                }
            ],
            value:'0',
            options1:[
                {
                    value: '0',
                    label: '灯杆'
                }, 
                {
                    value: '1',
                    label: '灯具'
                },
                {
                    value: '2',
                    label: '广告屏'
                },
                {
                    value: '3',
                    label: '气象站'
                }
            ],
            value1:'0',
        }
    },
    mounted(){
        this.ready()
    },
    methods:{
        ready(){
            var that = this;
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            map.centerAndZoom(new BMap.Point(116.331398,39.897445),12);// 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            function myFun(result){
                var cityName = result.name;
                map.setCenter(cityName);
            } 
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        },
        //返回首页
        backtrack(){this.$router.push({'path':'/index'})}
    },
    created(){
        
    },
}
</script>
<style scoped>
.mapHomgPage{width: 100%;height: 100%;position: relative;}
#allmap{width: 100%;height: 100%;}
.map_left{position: absolute;top: 15px;left: 15px;background: white;width:350px;height: 38px;line-height: 38px;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}
.map_left_left{position: absolute;left: 0;right: 50px;height: 100%;display: flex;}
.map_left_right{position: absolute;width: 50px;height: 100%;right: 0;top: 0;background:#3385ff;cursor: pointer;text-align: center;line-height: 47px;}
.map_left_right>i{color: white;font-size: 26px;}
.map_left_right:hover{background:#5D9CF9;}

.map_right{position: absolute;right: 20px;top: 15px;height: 45px;width: 45px;background: white;border-radius: 50%;line-height: 45px;text-align: center;    box-shadow: 1px 2px 1px rgba(0,0,0,.15);}

.backtrack{font-size: 34px;cursor: pointer;}
.backtrack:hover{color: aquamarine;}
</style>
