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
                        "icon" : that.serverurl+"/image/1.png",
                    },
                    "2" : {
                        "icon" : that.serverurl+"/image/2.png",
                    },
                    "3" : {
                        "icon" : that.serverurl+"/image/2.png",
                    },
                    "4" : {
                        "icon" : that.serverurl+"/image/2.png",
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
                                if(data.errorCode=='0'){
                                    var datas = [{
                                        text:'智慧灯杆',
                                        id:'02',
                                        type:'2',
                                        "state": {"opened" : true},
                                        children:[]
                                    }]
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        arr.type = '2'
                                        datas[0].children.push(arr)
                                    }
                                    jsonarray= datas;
                                    if(sessionStorage.menuId3=='02'){
                                        that.$router.push({'path':'/homepage'})
                                    }
                                    if(sessionStorage.menuId3=='10'){
                                        that.$router.push({'path':'lampslanterns'})
                                    }
                                    if(sessionStorage.menuId3=='11'){
                                        that.$router.push({'path':'advertisingScreens'})
                                    }
                                    if(sessionStorage.menuId3=='25'){
                                        that.$router.push({'path':'sensors'})
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
                console.log(data.node);
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    sessionStorage.menuId3 = data.node.id
                    if(data.node.id=='02'){
                        that.$router.push({'path':'/homepage'})
                    }
                    if(data.node.id=='10'){
                        that.$router.push({'path':'lampslanterns'})
                    }
                    if(data.node.id=='11'){
                        that.$router.push({'path':'advertisingScreens'})
                    }
                    if(data.node.id=='25'){
                        that.$router.push({'path':'sensors'})
                    }
                }
            });
        },
    },
    created() {
        console.log(789456123)
    },
}
</script>
<style scoped>
.equipment{width: 100%;height: 100%;padding: 5px;}
.equipment_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.equipment_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>