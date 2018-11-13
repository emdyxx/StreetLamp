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
        },800)
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
                                        if(data.result.menus[i].code=='lampManage'){
                                            arr.type = '3'
                                        }
                                        if(data.result.menus[i].code=='screenManage'){
                                            arr.type = '4'
                                        }
                                        if(data.result.menus[i].code=='sensorsManage'){
                                            arr.type = '5'
                                        }
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        datas[0].children.push(arr)
                                    }
                                    jsonarray= datas;
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
        
    },
}
</script>
<style scoped>
.equipment{width: 100%;height: 100%;padding: 5px;}
.equipment_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.equipment_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>