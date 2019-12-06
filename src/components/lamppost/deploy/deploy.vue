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
        setTimeout(function(){
            that.readyLeft()
        },300)
    },
    methods:{
        //请求左侧树
        readyLeft(){
            var that = this;
            $('#jstree').jstree("destroy");
            $('#jstree').jstree({
                "types" : {
                    "equipment" : {
                        "icon" : 'equipment',
                    },
                    "solinPoleDeploy" : {
                        "icon" : 'solinPoleDeploy',
                    },
                    "solinLampDeploy" : {
                        "icon" : 'solinLampDeploy',
                    },
                    "solinScreenDeploy" : {
                        "icon" : 'solinScreenDeploy',
                    },
                    "solinLoraSensorsDeploy" : {
                        "icon" : 'solinLoraSensorsDeploy',
                    },
                    "solinConcentratorDeploy" : {
                        "icon" : 'solinConcentratorDeploy',
                    },
                    "solin485Device" : {
                        "icon" : 'solin485Device',
                    },
                    "solinEnvDeploy" : {
                        "icon" : 'solinEnvDeploy',
                    },
                    "solinRelayDeploy" : {
                        "icon" : 'solinRelayDeploy',
                    },
                    "solinIlluminance" : {
                        "icon" : 'solinIlluminance',
                    },
                    "solinCameraDeploy" : {
                        "icon" : 'solinCameraDeploy',
                    },
                    "solinSceneryControllerDeploy" : {
                        "icon" : 'solinSceneryControllerDeploy',
                    },
                    "solinRadarDeploy":{
                        "icon" : 'solinRadar',
                    }
                },
                // "state" : { "key" : that.sizeType.text },
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
                                var datas = [{
                                    text:'设备管理',
                                    id:'03',
                                    type:'equipment',
                                    "state": {"opened" : true},
                                    children:[]
                                }]
                                if(data.errorCode=='0'){
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        arr.type = data.result.menus[i].code
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        arr.state = {"opened" : true}
                                        datas[0].children.push(arr)
                                    }
                                    if(sessionStorage.menuId3==''||sessionStorage.menuId3==undefined||sessionStorage.menuId3==null){
                                        sessionStorage.menuId3 = data.result.menus[0].id
                                    }  
                                    //485设备下侧菜单请求
                                    $.ajax({
                                        type:"GET",
                                        url:that.serverurl+'/v1/manage/menu/86',
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
                                                if(datas[0].children[j].id=='86'){
                                                    datas[0].children[j].children = array
                                                }
                                            }
                                            jsonarray= datas;
                                        },
                                    })
                                    if(sessionStorage.menuId3=='45'){
                                        that.$router.push({'path':'/solinPoleDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='46'){
                                        that.$router.push({'path':'/solinLampDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='47'){
                                        that.$router.push({'path':'/solinScreenDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='48'){
                                        that.$router.push({'path':'/solinEnvDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='49'){ //loar
                                        that.$router.push({'path':'/solinLoraSensorsDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='50'){
                                        that.$router.push({'path':'/solinRelayDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='80'){
                                        that.$router.push({'path':'/solinConcentratorDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='87'){
                                        that.$router.push({'path':'/solinIlluminance'})
                                    }
                                    if(sessionStorage.menuId3=='106'){
                                        that.$router.push({'path':'/solinCameraDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='118'){
                                        that.$router.push({'path':'/solinSceneryControllerDeploy'})
                                    }
                                    if(sessionStorage.menuId3=='138'){
                                        that.$router.push({'path':'/solinRadarDeploy'})
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
                    if(data.node.id=='45'){
                        that.$router.push({'path':'/solinPoleDeploy'})
                    }
                    if(data.node.id=='46'){
                        that.$router.push({'path':'/solinLampDeploy'})
                    }
                    if(data.node.id=='47'){
                        that.$router.push({'path':'/solinScreenDeploy'})
                    }
                    if(data.node.id=='48'){
                        that.$router.push({'path':'/solinEnvDeploy'})
                    }
                    if(data.node.id=='49'){//loar
                        that.$router.push({'path':'/solinLoraSensorsDeploy'})
                    }
                    if(data.node.id=='50'){
                        that.$router.push({'path':'/solinRelayDeploy'})
                    }
                    if(data.node.id=='80'){
                        that.$router.push({'path':'/solinConcentratorDeploy'})
                    }
                    if(data.node.id=='87'){
                        that.$router.push({'path':'/solinIlluminance'})
                    }
                    if(data.node.id=='106'){
                        that.$router.push({'path':'/solinCameraDeploy'})
                    }
                    if(data.node.id=='118'){
                        that.$router.push({'path':'/solinSceneryControllerDeploy'})
                    }
                    if(data.node.id=='138'){
                        that.$router.push({'path':'/solinRadarDeploy'})
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