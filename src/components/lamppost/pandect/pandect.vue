<template>
    <div class="pandect">
        <div class="pandect_left">
            <div id="jstree"></div>
        </div>
        <div class="pandect_right">
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
        setTimeout(function(){
            that.readyLeft()
        },500)
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
                // "state" : {},
                "plugins" : ['types'],
                'core' : {
                    'check_callback': true,
                    'data':function(obj,callback){
                        var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        var datas = []
                        var dataType = true
                        $.ajax({
                            type:'get',
                            async:true,
                            dataType:'json',
                            url:that.serverurl+'/pole/getPoleAreaTrueList',
                            contentType:'application/json;charset=UTF-8',
                            data:{projectId:sessionStorage.projectId}, 
                            success:function(data){
                                if(data.errorCode=='0'){
                                    callback.call(this, data.result);
                                }else{
                                    that.errorCode(data)
                                }
                            }
                        })
                        if(sessionStorage.menuId3=='02'){
                            that.$router.push({'path':'/homepage'})
                        }
                        if(sessionStorage.menuId3=='10'){
                            that.$router.push({'path':'lampslanterns'})
                        }
                        if(sessionStorage.menuId3=='11'){
                            that.$router.push({'path':'advertisingScreens'})
                        }
                    }
                }
            });
            $('#jstree').bind("changed.jstree", function (e, data) {
                if(data.node.type=='3'){
                    var inst = data.instance;
                    var selectedNode = inst.get_node(data.selected);
                    console.log(data.node.id)
                    $.ajax({
                        url :that.serverurl+'/pole/getPoleTrueListByAreaId',
                        async:true,
                        dataType:"json",
                        type:"get",
                        contentType:'application/json;charset=UTF-8',
                        data:{
                            projectId:sessionStorage.projectId,
                            areaId:data.node.original.areaId
                        },
                        success : function(data) {
                            if(data.errorCode=='0') {
                                var demo = data.result.list;
                                selectedNode.children = [];
                                $.each(demo, function (i, item) {
                                    item.text = item.nickName
                                    item.type = 4
                                    inst.create_node(selectedNode,item,"last");
                                });
                                inst.open_node(selectedNode);
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
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
                }
            });
            $('#jstree').on("open_node.jstree",function(e, data){
                if(data.node.type=='3'){
                    that.loadConfig(e, data)
                }
            });
        },
        loadConfig(e, data){
            var that = this
            var inst = data.instance;
            var selectedNode = inst.get_node(data.node.id);
            $.ajax({
                url :that.serverurl+'/pole/getPoleTrueListByAreaId',
                async:true,
                dataType:"json",
                type:"get",
                contentType:'application/json;charset=UTF-8',
                data:{
                    projectId:sessionStorage.projectId,
                    areaId:data.node.original.areaId
                },
                success : function(data) {
                    if(data.errorCode=='0') {
                        var demo = data.result.list;
                        selectedNode.children = [];
                        $.each(demo, function (i, item) {
                            item.text = item.nickName
                            item.type = 4
                            inst.create_node(selectedNode,item,"last");
                        });
                        inst.open_node(selectedNode);
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
    },
    created() {
        sessionStorage.menuId2 = 3
    },
}
</script>
<style scoped>
.pandect{width: 100%;height: 100%;padding: 5px;}
.pandect_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;overflow: auto;}
.pandect_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}

</style>