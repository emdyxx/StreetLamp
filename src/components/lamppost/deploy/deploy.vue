<template>
    <div class="deploy">
        <div class="deploy_left">
            <div id="jstree"></div>
        </div>
        <div class="deploy_right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'lamppost',
    data () {
        return {
            // controlhousing
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
                                    "text" : "控制柜",
                                    "icon" : "jstree-file",
                                    id:'2',
                                },
                                { 
                                    "text" : "灯杆",
                                    "icon" : "jstree-file",
                                    id:'3',
                                },
                                // { 
                                //     "text" : "充电桩",
                                //     "icon" : "jstree-file",
                                //     id:'4',
                                // },
                                { 
                                    "text" : "广告屏",
                                    "icon" : "jstree-file",
                                    id:'5',
                                },
                                { 
                                    "text" : "摄像头",
                                    "icon" : "jstree-file",
                                    id:'6',
                                },
                                // { 
                                //     "text" : "传感设备",
                                //     "icon" : "jstree-file",
                                //     id:'7',
                                // },
                                // { 
                                //     "text" : "WIFI设备",
                                //     "icon" : "jstree-file",
                                //     id:'8',
                                // }
                            ]
                        }
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            if(data.node.id=='1'){
                that.$router.push({'path':'/deployhomepage'})
            }
            if(data.node.id=='2'){
                that.$router.push({'path':'/controlhousing'})
            }
            if(data.node.id=='3'){
                that.$router.push({'path':'/lampslanternstwo'})
            }
            if(data.node.id=='4'){
                that.$router.push({'path':'/chargingpile'})
            }
            if(data.node.id=='5'){
                that.$router.push({'path':'/advertisingscreen'})
            }
            if(data.node.id=='6'){
                that.$router.push({'path':'/camera'})
            }
        });
    },
    methods:{
        
    },
}
</script>
<style scoped>
.deploy{width: 100%;height: 100%;}
.deploy_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.deploy_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>