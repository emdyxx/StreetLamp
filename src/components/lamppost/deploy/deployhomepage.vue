<template>
    <div class="deployhomepage">
        <!-- 一级菜单 -->
        <div class="deployhomepage_center">
            <div class="deployhomepage_top">
                <span>设备</span>
                <span>数量</span>
                <span>警报</span>
            </div>
            <div class="deployhomepage_bottom">
                <div>
                    <span>灯杆</span>
                    <span>{{data.poleCount}}</span>
                    <span>{{data.poleAlarmCount}}</span>
                </div>
                <div>
                    <span>灯具</span>
                    <span>{{data.lampCount}}</span>
                    <span>{{data.lampAlarmCount}}</span>
                </div>
                <div>
                    <span>广告屏</span>
                    <span>{{data.screenCount}}</span>
                    <span>{{data.screenAlarmCount}}</span>
                </div>
                <div>
                    <span>传感设备</span>
                    <span>{{data.sensorsCount}}</span>
                    <span>{{data.sensorsAlarmCount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            serverurl:localStorage.serverurl,
            data:{}
        }
    },
    mounted(){
        this.ready()
    },
    methods:{
        ready(){
            var that = this
            $.ajax({
                type:"GET",
                url:that.serverurl+'/statistics/getCount',
                dataType:"json",
                async: false,
                data:{projectId:sessionStorage.projectId},
                success:function(data){
                    that.data = data.result
                }
            })
        }
    },
    created() {
        
    },
}
</script>
<style scoped>
.deployhomepage{width: 100%;height: 100%;background: url('../../../assets/bg4.jpg') no-repeat;display: flex;justify-content: center;align-items: center;background-size:100% 100%;}
.deployhomepage_center{width:450px;height:350px;background: #6E7A81;border-radius: 5px;opacity: 0.7;}
.deployhomepage_top,.deployhomepage_bottom>div{width: 90%;padding: 5px;display: flex;justify-content: center;margin: 0 auto;}
.deployhomepage_top>span,.deployhomepage_bottom>div>span{display: inline-block;width: 135px;height: 100%;text-align: center;font-size: 18px;}
.deployhomepage_top{border-bottom:1px solid white;color: white;height:56px;}
.deployhomepage_top>span{line-height:63px;}
.deployhomepage_bottom>div>span{line-height:63px;}
.deployhomepage_bottom{background: white;width: 90%;margin: 0 auto;margin-top: 20px;border-radius: 5px;}
.deployhomepage_bottom>div{height: 63px;}
</style>