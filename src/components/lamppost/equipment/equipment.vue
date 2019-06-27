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
                    "1" : {
                        "icon" : 'jstree_icon1',
                    },
                    "2" : {
                        "icon" : 'jstree_icon2',
                    },
                    "3" : {
                        "icon" : 'jstree_icon3',
                    },
                    "4" : {
                        "icon" : 'jstree_icon4',
                    },
                    "5" : {
                        "icon" : 'jstree_icon5',
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
                                        type:'1',
                                        "state": {"opened" : true},
                                        children:[]
                                    }]
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        if(data.result.menus[i].code=='solinLampManage'){
                                            arr.type = '3'
                                        }
                                        if(data.result.menus[i].code=='solinScreenManage'){
                                            arr.type = '4'
                                        }
                                        if(data.result.menus[i].code=='solinEnvManage'){
                                            arr.type = '5'
                                        }
                                        if(data.result.menus[i].code=='solinLoraSensorsManage'){
                                            arr.type = '5'
                                        }
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
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
                                    if(data.node.id=='54'||data.node.id=='64'||data.node.id=='65'||data.node.id=='66'||data.node.id=='67'||data.node.id=='68'||data.node.id=='69'||data.node.id=='70'){
                                        that.$router.push({'path':'loraQuery'})
                                    }
                                    if(sessionStorage.menuId3=='55'){
                                        that.$router.push({'path':'Relay'})
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
                    console.log(data.node.id)
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
                    if(data.node.id=='54'||data.node.id=='64'||data.node.id=='65'||data.node.id=='66'||data.node.id=='67'||data.node.id=='68'||data.node.id=='69'||data.node.id=='70'){
                        that.$router.push({'path':'loading'})
                        setTimeout(function(){
                            that.$router.push({'path':'loraQuery'})
                        },200)
                    }
                    if(data.node.id=='55'){
                        that.$router.push({'path':'Relay'})
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
.equipment{width: 100%;height: 100%;padding: 5px;}
.equipment_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.equipment_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>