<template>
    <div class="DeviceLog">
        <div class="DeviceLog_left">
            <div id="jstree"></div>
        </div>
        <div class="DeviceLog_right">
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
                            data:{parentId:sessionStorage.menuId2},
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    var datas = []
                                    var arr = {}
                                    for(var i=0;i<data.result.menus.length;i++){
                                        arr = {}
                                        arr.type = '1'
                                        arr.text = data.result.menus[i].menuName
                                        arr.id = data.result.menus[i].id
                                        datas.push(arr)
                                    }
                                    jsonarray= datas;
                                    if(sessionStorage.menuId3=='56'){
                                        that.$router.push({'path':'/LampPoleJournal'})
                                    }
                                    if(sessionStorage.menuId3=='57'){
                                        that.$router.push({'path':'/lampJournal'})
                                    }
                                    if(sessionStorage.menuId3=='58'){
                                        that.$router.push({'path':'/screenJournal'})
                                    }
                                    if(sessionStorage.menuId3=='59'){
                                        that.$router.push({'path':'/sensorJournal'})
                                    }
                                    if(sessionStorage.menuId3=='60'){
                                        that.$router.push({'path':'/loraJournal'})
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
                    if(data.node.id=='56'){
                        that.$router.push({'path':'/LampPoleJournal'})
                    }
                    if(data.node.id=='57'){
                        that.$router.push({'path':'/lampJournal'})
                    }
                    if(data.node.id=='58'){
                        that.$router.push({'path':'/screenJournal'})
                    }
                    if(data.node.id=='59'){
                        that.$router.push({'path':'/sensorJournal'})
                    }
                    if(data.node.id=='60'){
                        that.$router.push({'path':'/loraJournal'})
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
.DeviceLog{width: 100%;height: 100%;}
.DeviceLog_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.DeviceLog_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}
</style>