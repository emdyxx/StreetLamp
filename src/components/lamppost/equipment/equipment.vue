<template>
    <div class="equipments">
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
            serverurl:localStorage.serverurl,
        }
    },
    mounted(){
        var that = this
        //初始化左侧树
        setTimeout(function(){
            that.readyLeft()
        },400)
    },
    methods:{
        //请求左侧树
        readyLeft(){
            var that = this;
            $('#jstree').jstree({
                "types" : {
                    "solinPoleDeploy" : {
                        "icon" : 'solinPoleDeploy',
                    },
                    "solinLampManage" : {
                        "icon" : 'solinLampManage',
                    },
                    "solinScreenManage" : {
                        "icon" : 'solinScreenManage',
                    },
                    "solinLoraSensorsManage" : {
                        "icon" : 'solinLoraSensorsManage',
                    },
                    "solin485DeviceManage" : {
                        "icon" : 'solin485DeviceManage',
                    },
                    "solinCameraManage" : {
                        "icon" : 'solinCameraManage',
                    },
                    "solinEnvManage" : {
                        "icon" : 'solinEnvManage',
                    },
                    "solinRelayManage" : {
                        "icon" : 'solinRelayManage',
                    },
                    "solinIlluminanceManage" : {
                        "icon" : 'solinIlluminanceManage',
                    },
                    "solinLoraSmoke" : {
                        "icon" : 'solinLoraSmoke',
                    },
                    "solinLoraHumiture" : {
                        "icon" : 'solinLoraHumiture',
                    },
                    "solinLoraGeomagnetism" : {
                        "icon" : 'solinLoraGeomagnetism',
                    },
                    "solinLoraManholeCover" : {
                        "icon" : 'solinLoraManholeCover',
                    },
                    "solinLoraPressure" : {
                        "icon" : 'solinLoraPressure',
                    },
                    "solinLoraMagneticDoor" : {
                        "icon" : 'solinLoraMagneticDoor',
                    },
                    "solinLoraInfrared" : {
                        "icon" : 'solinLoraInfrared',
                    },
                    "solinLoraWaterLevel" : {
                        "icon" : 'solinLoraWaterLevel',
                    },
                    "solinSceneryControllerManage" : {
                        "icon" : 'solinSceneryControllerDeploy',
                    }
                },
                "plugins" : ['types'],
                'core' : {
                    'data':function(obj,callback){
                        var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        $.ajax({
                            type:"GET",
                            url:that.serverurl+'/v1/manage/menu/'+sessionStorage.menuId2,
                            dataType:"json",
                            async: false,
                            data:{},
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    var datas = [{
                                        text:'智慧灯杆',
                                        id:'02',
                                        type:'solinPoleDeploy',
                                        "state": {"opened" : true},
                                        children:[]
                                    }]
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        arr.type = data.result.menus[i].code
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        arr.state = {"opened" : true}
                                        datas[0].children.push(arr)
                                    }
                                    sessionStorage.menuId3 = data.result.menus[0].id
                                    //lora下侧菜单请求
                                    $.ajax({
                                        type:"GET",
                                        url:that.serverurl+'/v1/manage/menu/54',
                                        dataType:"json",
                                        async: false,
                                        data:{},
                                        success:function(data){
                                            let array = [];
                                            let data2 = {}
                                            for(let i=0;i<data.result.menus.length;i++){
                                                data2 = {}
                                                data2.type = data.result.menus[i].code
                                                data2.text = data.result.menus[i].menuName
                                                data2.id = data.result.menus[i].id
                                                array.push(data2)
                                            }
                                            for(let j=0;j<datas[0].children.length;j++){
                                                if(datas[0].children[j].id=='54'){
                                                    datas[0].children[j].children = array
                                                }
                                            }
                                        },
                                    })
                                    //485设备下侧菜单请求
                                    $.ajax({
                                        type:"GET",
                                        url:that.serverurl+'/v1/manage/menu/89',
                                        dataType:"json",
                                        async: false,
                                        data:{},
                                        success:function(data){
                                            let array = [];
                                            let data2 = {}
                                            for(let i=0;i<data.result.menus.length;i++){
                                                data2 = {}
                                                data2.type = data.result.menus[i].code
                                                data2.text = data.result.menus[i].menuName
                                                data2.id = data.result.menus[i].id
                                                array.push(data2)
                                            }
                                            for(let j=0;j<datas[0].children.length;j++){
                                                if(datas[0].children[j].id=='89'){
                                                    datas[0].children[j].children = array
                                                }
                                            }
                                            jsonarray= datas;
                                        },
                                    })
                                    if(sessionStorage.menuId3=='51'){
                                        that.$router.push({'path':'lampslanterns'})
                                    }
                                    if(sessionStorage.menuId3=='52'){
                                        that.$router.push({'path':'advertisingScreens'})
                                    }
                                    if(sessionStorage.menuId3=='53'){
                                        that.$router.push({'path':'sensors'})
                                    }
                                    if(sessionStorage.menuId3=='64'||sessionStorage.menuId3=='65'||sessionStorage.menuId3=='66'||sessionStorage.menuId3=='67'||sessionStorage.menuId3=='68'||sessionStorage.menuId3=='69'||sessionStorage.menuId3=='70'||sessionStorage.menuId3=='117'){
                                        that.$router.push({'path':'loraQuery'})
                                    }
                                    if(sessionStorage.menuId3=='55'){
                                        that.$router.push({'path':'Relay'})
                                    }
                                    if(sessionStorage.menuId3=='107'){
                                        that.$router.push({'path':'CameraManage'})
                                    }
                                    if(sessionStorage.menuId3=='88'){
                                        that.$router.push({'path':'IlluminanceManage'})
                                    }
                                    if(sessionStorage.menuId3=='119'){
                                        that.$router.push({'path':'Scenery'})
                                    }
                                }else{
                                    that.errorCode(data)
                                }
                            }
                        });
                        callback.call(this, jsonarray);
                    }
                }
            });
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    sessionStorage.menuId3 = data.node.id
                    if(data.node.id=='51'){
                        that.$router.push({'path':'lampslanterns'})
                    }
                    if(data.node.id=='52'){
                        that.$router.push({'path':'advertisingScreens'})
                    }
                    if(data.node.id=='53'){
                        that.$router.push({'path':'sensors'})
                    }
                    if(data.node.id=='64'||data.node.id=='65'||data.node.id=='66'||data.node.id=='67'||data.node.id=='68'||data.node.id=='69'||data.node.id=='70'||data.node.id=='117'){
                        that.$router.push({'path':'loading'})
                        setTimeout(function(){
                            that.$router.push({'path':'loraQuery'})
                        },200)
                    }
                    if(data.node.id=='55'){
                        that.$router.push({'path':'Relay'})
                    }
                    if(data.node.id=='107'){
                        that.$router.push({'path':'CameraManage'})
                    }
                    if(data.node.id=='88'){
                        that.$router.push({'path':'IlluminanceManage'})
                    }
                    if(data.node.id=='119'){
                        that.$router.push({'path':'Scenery'})
                    }
                }
            });
        },
    },
    created() {
        
    },
}
</script>
<style scoped>
.equipments{width: 100%;height: 100%;padding: 5px;}
.equipment_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.equipment_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>