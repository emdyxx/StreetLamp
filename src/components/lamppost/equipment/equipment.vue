<template>
    <div class="equipment">
        <div class="equipment_left">
            <div id="jstree"></div>
        </div>
        <div class="equipment_right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
        
        }
    },
    mounted(){
        var that = this
        $(function () {
            $('#jstree').jstree({
                'core' : {
                    'data' : [
                        {
                            "text" : "快越科技灯杆系统",
                            id:'1',
                            "state" : { "opened" : true },
                            "children" : [
                                {
                                    "text" : "灯具",
                                    "icon" : "jstree-file",
                                    id:'2',
                                },
                                // {
                                //     "text" : "充电桩",
                                //     "icon" : "jstree-file",
                                //     id:'3',
                                // },
                                {
                                    "text" : "广告屏",
                                    "icon" : "jstree-file",
                                    id:'4',
                                },
                                {
                                    "text" : "摄像头",
                                    "icon" : "jstree-file",
                                    id:'5'
                                },
                                // {
                                //     "text" : "传感设备",
                                //     "icon" : "jstree-file",
                                //     id:'6'
                                // },
                                // {
                                //     "text" : "WIFI设备",
                                //     "icon" : "jstree-file",
                                //     id:'7'
                                // }
                            ]
                        },
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            // console.log(data.node.id);
            if(data.node.id=='1'){
                that.$router.push({'path':'/homepage'})
            }
            if(data.node.id=='2'){
                that.$router.push({'path':'lampslanterns'})
            }
            if(data.node.id=='3'){
                that.$router.push({'path':'chargingPiles'})
            }
            if(data.node.id=='4'){
                that.$router.push({'path':'advertisingScreens'})
            }
            if(data.node.id=='5'){
                that.$router.push({'path':'cameras'})
            }
            if(data.node.id=='6'){
                that.$router.push({'path':'lampslanterns'})
            }
            if(data.node.id=='7'){
                that.$router.push({'path':'lampslanterns'})
            }
        });
    },
    methods:{
        
    },
}
</script>
<style scoped>
.equipment{width: 100%;height: 100%;padding: 5px;}
.equipment_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.equipment_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>