<template>
    <div class="mapHome">
        <div class="mapHome_left">
            <div class="mapHome_left_top">
                <img @click="returns" src="../../assets/img/return.png" alt="">
            </div>
            <div class="mapHome_left_bottom">
                <div v-for="item in menu" :id=item.id :key=item.id :class="item.id==type? 'background':''" @click="Jump(item)">
                    <template v-if="item.code=='managementService'">
                        <img src="../../assets/img/system.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='solinDeviceService'">
                        <img src="../../assets/img/Setup.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='solinMapService'">
                        <img src="../../assets/img/GIS.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='patrolService'">
                        <img src="../../assets/img/patrolService.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='solinLampMap'">
                        <img src="../../assets/img/Singlelamp.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='solinCameraMap'">
                        <img src="../../assets/img/Monitor.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                    <template v-if="item.code=='solinScreenMap'">
                        <img src="../../assets/img/LED.png" alt="">
                        <p>{{item.menuName}}</p>
                    </template>
                </div>
            </div>
        </div>
        <div class="mapHome_right">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mapHome',
    data () {
        return {
            serverurl:localStorage.serverurl,
            menu:[],
            type:'',
        }
    },
    mounted(){
        
    },
    methods:{
        Jump(val){
            if(val.code=='managementService'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '1'
                this.$router.push({'path':'/usercenter'})
            }
            if(val.code=='solinDeviceService'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '2'
                this.$router.push({'path':'/lamppost'})
            }
            if(val.code=='solinMapService'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '2'
                this.$router.push({'path':'/mapHomg',query:{id:val.id}})
            }
            if(val.code=='patrolService'){
                sessionStorage.menuId = val.id
                sessionStorage.menuId3 = '38'
                this.$router.push({'path':'/Inspection'})
            }
            if(val.code=='solinLampMap'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '1'
                this.$router.push({'path':'/SingleLamp',query:{id:val.id}})
            }
            if(val.code=='solinCameraMap'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '1'
                this.$router.push({'path':'/Camera',query:{id:val.id}})
            }
            if(val.code=='solinScreenMap'){
                sessionStorage.menuId = val.id
                sessionStorage.headercolorType = '1'
                this.$router.push({'path':'/LED',query:{id:val.id}})
            }
            this.type = val.id
        },
        //请求权限
        Jurisdiction(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/menu/3',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode==0){
                        that.menu = data.result.menus
                        $.ajax({
                            type:'get',
                            async:true,
                            dataType:'json',
                            url:that.serverurl+'/v1/manage/menu/0',
                            contentType:'application/json;charset=UTF-8',
                            data:{},
                            success:function(data){
                                if(data.errorCode==0){
                                    that.menu.unshift(data.result.menus[0])
                                }else{
                                    that.errorCode(data)
                                }
                            },
                        })
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        //返回上一级菜单
        returns(){
            this.$router.push({'path':'/index'})
        },
    },
    created() {
        this.type = this.$route.query.id
        this.Jurisdiction();
    },
}
</script>
<style scoped>
.mapHome{width: 100%;height: 100%;}
.mapHome_left{width: 90px;height: 100%;background: #303e60;}
.mapHome_left_top{width: 100%;height: 80px;display: flex;justify-content: center;align-items: center;}
.mapHome_left_top>img{cursor: pointer;}
.mapHome_left_bottom{padding-top: 20px;}
.mapHome_left_bottom>div{padding: 15px 10px 15px 10px;cursor: pointer;text-align: center;}
.mapHome_left_bottom>div>img:hover{transition: all .5s;transform: scale(1.1);}
.mapHome_left_bottom>div>p{margin: 0;padding:10px 0 0 0;color: #b2bdca;}
.background{background: #1f293d;}

.mapHome_right{position: absolute;top: 0;left: 90px;right: 0;bottom:0;}
</style>
