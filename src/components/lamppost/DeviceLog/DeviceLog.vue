<template>
    <div class="CommonStyle">
        <div class="CommonStyle_left">
            <div id="jstree"></div>
        </div>
        <div class="CommonStyle_right">
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
        this.readyLeft()
    },
    methods:{
        //请求左侧树
        readyLeft(){
            var that = this;
            $('#jstree').jstree("destroy");
            $('#jstree').jstree({
                "types" : {
                    "1" : {
                        "icon" : 'jstree_Journal',
                    },
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
                            data:{parentId:sessionStorage.menuId2},
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    var datas = [
                                        {
                                            text:'设备日志',
                                            id:'',
                                            type:'1',
                                            "state": {"opened" : true},
                                            children:[]
                                        }
                                    ]
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        arr.type = '1'
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        arr.state = {"opened" : true}
                                        if(data.result.menus[i].code=='solinLampLog'){
                                            $.ajax({
                                                type:"GET",
                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                dataType:"json",
                                                async: false,
                                                data:{},
                                                success:function(data){
                                                    let array = [];
                                                    let data2 = {}
                                                    for(let i=0;i<data.result.menus.length;i++){
                                                        data2 = {}
                                                        data2.text = data.result.menus[i].menuName
                                                        data2.type = '1'
                                                        data2.id = data.result.menus[i].id
                                                        array.push(data2)
                                                    }
                                                    arr.children=array
                                                },
                                            })
                                        }
                                        if(data.result.menus[i].code=='solinScreenLog'){
                                            $.ajax({
                                                type:"GET",
                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                dataType:"json",
                                                async: false,
                                                data:{},
                                                success:function(data){
                                                    let array = [];
                                                    let data2 = {}
                                                    for(let i=0;i<data.result.menus.length;i++){
                                                        data2 = {}
                                                        data2.text = data.result.menus[i].menuName
                                                        data2.type = '1'
                                                        data2.id = data.result.menus[i].id
                                                        array.push(data2)
                                                    }
                                                    arr.children=array
                                                },
                                            })
                                            // arr.children=[
                                            //     {text:'操作日志',id:'2-1',type:'1'},{text:'控制日志',id:'2-2',type:'1'}
                                            // ]
                                        }
                                        if(data.result.menus[i].code=='solin485DeviceLog'){
                                            $.ajax({
                                                type:"GET",
                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                dataType:"json",
                                                async: false,
                                                data:{},
                                                success:function(data){
                                                    let array = [];
                                                    let data2 = {}
                                                    for(let i=0;i<data.result.menus.length;i++){
                                                        data2 = {}
                                                        data2.text = data.result.menus[i].menuName
                                                        data2.type = '1'
                                                        data2.state = {"opened" : true}
                                                        data2.id = data.result.menus[i].id
                                                        if(data.result.menus[i].code=='solinRelayLog'){
                                                            $.ajax({
                                                                type:"GET",
                                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                                dataType:"json",
                                                                async: false,
                                                                data:{},
                                                                success:function(data){
                                                                    let array2 = [];
                                                                    let data3 = {}
                                                                    for(let s=0;s<data.result.menus.length;s++){
                                                                        data3 = {}
                                                                        data3.text = data.result.menus[s].menuName
                                                                        data3.type = '1'
                                                                        data3.id = data.result.menus[s].id
                                                                        array2.push(data3)
                                                                    }
                                                                    data2.children=array2
                                                                },
                                                            })
                                                        }
                                                        array.push(data2)
                                                    }
                                                    arr.children=array
                                                },
                                            })
                                        }
                                        if(data.result.menus[i].code=='solinConcentratorLog'){
                                            $.ajax({
                                                type:"GET",
                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                dataType:"json",
                                                async: false,
                                                data:{},
                                                success:function(data){
                                                    let array = [];
                                                    let data2 = {}
                                                    for(let i=0;i<data.result.menus.length;i++){
                                                        data2 = {}
                                                        data2.text = data.result.menus[i].menuName
                                                        data2.type = '1'
                                                        data2.id = data.result.menus[i].id
                                                        array.push(data2)
                                                    }
                                                    arr.children=array
                                                },
                                            })
                                        }
                                        if(data.result.menus[i].code=='solinCameraLog'){
                                            $.ajax({
                                                type:"GET",
                                                url:that.serverurl+'/v1/manage/menu/'+data.result.menus[i].id,
                                                dataType:"json",
                                                async: false,
                                                data:{},
                                                success:function(data){
                                                    let array = [];
                                                    let data2 = {}
                                                    for(let i=0;i<data.result.menus.length;i++){
                                                        data2 = {}
                                                        data2.text = data.result.menus[i].menuName
                                                        data2.type = '1'
                                                        data2.id = data.result.menus[i].id
                                                        array.push(data2)
                                                    }
                                                    arr.children=array
                                                },
                                            })
                                        }
                                        datas[0].children.push(arr)
                                    }
                                    jsonarray= datas;
                                    sessionStorage.menuId3 = data.result.menus[0].id
                                    if(sessionStorage.menuId3=='56'){
                                        that.$router.push({'path':'/solinPoleLog'})
                                    }
                                    if(sessionStorage.menuId3=='57'){
                                        that.$router.push({'path':'/solinLampLog'})
                                    }
                                    if(sessionStorage.menuId3=='58'){
                                        that.$router.push({'path':'/solinScreenLog'})
                                    }
                                    if(sessionStorage.menuId3=='59'){
                                        that.$router.push({'path':'/solinEnvLog'})
                                    }
                                    if(sessionStorage.menuId3=='60'){
                                        that.$router.push({'path':'/solinLoraSensorsLog'})
                                    }
                                    if(sessionStorage.menuId3=='61'){
                                        that.$router.push({'path':'/solinRelayLog'})
                                    }
                                    if(sessionStorage.menuId3=='91'){
                                        that.$router.push({'path':'/solinIlluminanceLog'})
                                    }
                                    if(sessionStorage.menuId3=='123'){
                                        that.$router.push({'path':'/solinSceneryControllerLog'})
                                    }
                                    if(sessionStorage.menuId3=='140'){
                                        that.$router.push({'path':'/solinRadarLog'})
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
                if(data.node.id=='57'||data.node.id=='58'||data.node.id=='61'||data.node.id=='103'){return;}
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    sessionStorage.menuId3 = data.node.id
                    if(data.node.id=='56'){
                        that.$router.push({'path':'/solinPoleLog'})
                    }
                    if(data.node.id=='93'||data.node.id=='94'){
                        that.$router.push({'path':'loadingLog'})
                        setTimeout(function(){
                            that.$router.push({
                                'path':'/solinLampLog',
                                query:{
                                    id:data.node.id
                                }
                            })
                        },200)
                    }
                    if(data.node.id=='95'||data.node.id=='96'){
                        that.$router.push({'path':'loadingLog'})
                        setTimeout(function(){
                            that.$router.push({
                                'path':'/solinScreenLog',
                                query:{
                                    id:data.node.id
                                }
                            })
                        },200)
                    }
                    if(data.node.id=='59'){
                        that.$router.push({'path':'/solinEnvLog'})
                    }
                    if(data.node.id=='60'){
                        that.$router.push({'path':'/solinLoraSensorsLog'})
                    }
                    if(data.node.id=='99'||data.node.id=='100'){
                        that.$router.push({'path':'loadingLog'})
                        setTimeout(function(){
                            that.$router.push({
                                'path':'/solinRelayLog',
                                query:{
                                    id:data.node.id
                                }
                            })
                        },200)
                    }
                    if(data.node.id=='104'||data.node.id=='105'){
                        that.$router.push({'path':'loadingLog'})
                        setTimeout(function(){
                            that.$router.push({
                                'path':'/solinConcentratorLog',
                                query:{
                                    id:data.node.id
                                }
                            })
                        },200)
                    }
                    if(data.node.id=='115'||data.node.id=='116'){
                        that.$router.push({'path':'loadingLog'})
                        setTimeout(function(){
                            that.$router.push({
                                'path':'/solinCameraLog',
                                query:{
                                    id:data.node.id
                                }
                            })
                        },200)
                    }
                    if(data.node.id=='91'){
                        that.$router.push({'path':'/solinIlluminanceLog'})
                    }
                    if(data.node.id=='123'){
                        that.$router.push({'path':'/solinSceneryControllerLog'})
                    }
                    if(data.node.id=='140'){
                        that.$router.push({'path':'/solinRadarLog'})
                    }
                }
            });
            
        },
    },
    created() {
        var that = this
    },
}
</script>
<style scoped>

</style>