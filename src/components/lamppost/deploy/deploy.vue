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
            serverurl:localStorage.serverurl,
            // controlhousing
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
                // "state" : { "key" : that.sizeType.text },
                "plugins" : ['types'],
                'core' : {
                    'data':function(obj,callback){
                        var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        $.ajax({
                            type:"GET",
                            url:that.serverurl+'/privilege/getMyMenu',
                            dataType:"json",
                            async: false,
                            data:{parentId:sessionStorage.menuId2},
                            success:function(data) {
                                var datas = [{
                                    text:'智慧灯杆',
                                    id:'03',
                                    type:'1',
                                    "state": {"opened" : true},
                                    children:[]
                                }]
                                if(data.errorCode=='0'){
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        if(data.result.menus[i].code=='poleDeploy'){
                                            arr.type = '2'
                                        }
                                        if(data.result.menus[i].code=='lampDeploy'){
                                            arr.type = '3'
                                        }
                                        if(data.result.menus[i].code=='screenDeploy'){
                                            arr.type = '4'
                                        }
                                        if(data.result.menus[i].code=='sensorsDeploy'){
                                            arr.type = '5'
                                        }
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        datas[0].children.push(arr)
                                    }
                                    
                                    jsonarray= datas;
                                    if(sessionStorage.menuId3=='03'){
                                        that.$router.push({'path':'/deployhomepage'})
                                    }
                                    if(sessionStorage.menuId3=='14'){
                                        that.$router.push({'path':'/LampPole'})
                                    }
                                    if(sessionStorage.menuId3=='15'){
                                        that.$router.push({'path':'/Lampsandlanterns'})
                                    }
                                    if(sessionStorage.menuId3=='16'){
                                        that.$router.push({'path':'/advertisingscreen'})
                                    }
                                    if(sessionStorage.menuId3=='18'){
                                        that.$router.push({'path':'/sensor'})
                                    }
                                }else{
                                    that.errorCode(data.errorCode)
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
                    if(data.node.id=='03'){
                        that.$router.push({'path':'/deployhomepage'})
                    }
                    if(data.node.id=='14'){
                        that.$router.push({'path':'/LampPole'})
                    }
                    if(data.node.id=='15'){
                        that.$router.push({'path':'/Lampsandlanterns'})
                    }
                    if(data.node.id=='16'){
                        that.$router.push({'path':'/advertisingscreen'})
                    }
                    if(data.node.id=='18'){
                        that.$router.push({'path':'/sensor'})
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
.deploy{width: 100%;height: 100%;}
.deploy_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.deploy_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>