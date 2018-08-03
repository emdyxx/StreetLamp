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
        $(function () {
            $('#jstree').jstree({
                'core' : {
                    'data' : [
                        {
                            "text" : "浙江",
                            id:'1',
                            level:'1',
                            "state" : { "opened" : true },
                            "children" : [
                                {
                                    "text" : "杭州",
                                    id:'2',
                                    level:'2',
                                    'children':[
                                        {
                                            "text" : "滨江",
                                            id:'5',
                                            level:'3',
                                            'children':[
                                                {
                                                    "text" : "测试灯杆添加",
                                                    "icon" : "jstree-file",
                                                    id:'6',
                                                    level:'4',
                                                }
                                            ]
                                        },
                                        
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            if(data.node.original.level=='4'){
                that.$router.push({'path':'/pandecttwo'})
            }else{
                that.$router.push({'path':'/pandectone'})
            }
        });
        // this.readyLeft()
    },
    methods:{
        //请求左侧树
        // readyLeft(){
        //     var that = this;
        //     $('#jstree').jstree("destroy");
        //     $('#jstree').jstree({
        //         "types" : {
        //             "1" : {
        //                 "icon" : that.serverurl+"/image/1.png",
        //             },
        //             "2" : {
        //                 "icon" : that.serverurl+"/image/2.png",
        //             },
        //             "3" : {
        //                 "icon" : that.serverurl+"/image/2.png",
        //             },
        //             "4" : {
        //                 "icon" : that.serverurl+"/image/2.png",
        //             }
        //         },
        //         // "state" : { "key" : that.sizeType.text },
        //         "plugins" : ['types'],
        //         'core' : {
        //             'data':function(obj,callback){
        //                 var jsonstr="[]";
        //                 var jsonarray = eval('('+jsonstr+')');
        //                 var datas = []
        //                 var dataType = true
        //                 $.ajax({
        //                     type:'get',
        //                     async:true,
        //                     dataType:'json',
        //                     url:that.serverurl+'/pole/getPoleTrueList',
        //                     contentType:'application/json;charset=UTF-8',
        //                     data:{projectId:sessionStorage.projectId}, 
        //                     success:function(data){
        //                         if(data.errorCode=='0'){
                                    
        //                         }else{
        //                             that.errorCode2(data.errorCode)
        //                         }
        //                     }
        //                 })
                        
        //                 jsonarray= datas;
        //                 callback.call(this, jsonarray);
        //                 if(sessionStorage.menuId3=='02'){
        //                     that.$router.push({'path':'/homepage'})
        //                 }
        //                 if(sessionStorage.menuId3=='10'){
        //                     that.$router.push({'path':'lampslanterns'})
        //                 }
        //                 if(sessionStorage.menuId3=='11'){
        //                     that.$router.push({'path':'advertisingScreens'})
        //                 }
                        
        //             }
        //         }
        //     });
        //     $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
        //         console.log(data.node);
        //         if(data.node.id==''||data.node.id==undefined){
        //         }else{
        //             sessionStorage.menuId3 = data.node.id
        //             if(data.node.id=='02'){
        //                 that.$router.push({'path':'/homepage'})
        //             }
        //             if(data.node.id=='10'){
        //                 that.$router.push({'path':'lampslanterns'})
        //             }
        //             if(data.node.id=='11'){
        //                 that.$router.push({'path':'advertisingScreens'})
        //             }
        //         }
        //     });
        // },
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