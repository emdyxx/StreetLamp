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
                                    "text" : "嘉兴",
                                    "icon" : "jstree-file",
                                    id:'2',
                                    level:'2',
                                    'children':[
                                        {
                                            
                                            "text" : "智慧灯杆1",
                                            "icon" : "jstree-file",
                                            id:'5',
                                            level:'3',
                                        },
                                        {
                                            
                                            "text" : "智慧灯杆2",
                                            "icon" : "jstree-file",
                                            id:'6',
                                            level:'3',
                                        }
                                    ]
                                }
                            ]
                        },
                        { 
                            "text" : "江苏",
                            id:'3',
                            level:'1',
                            "children" : [
                                {
                                    "text" : "无锡",
                                    "icon" : "jstree-file",
                                    id:'7',
                                    level:'2',
                                    'children':[
                                        {
                                            
                                            "text" : "智慧灯杆1",
                                            "icon" : "jstree-file",
                                            id:'8',
                                            level:'3',
                                        },
                                        {
                                            
                                            "text" : "智慧灯杆2",
                                            "icon" : "jstree-file",
                                            id:'9',
                                            level:'3',
                                        }
                                    ]
                                }
                            ]
                        },
                        { 
                            "text" : "河南",
                            id:'4',
                            level:'1',
                        }
                    ]
                }
            }); 
        });
        $('#jstree').on("changed.jstree", function (e, data) {
            if(data.node.original.level=='1'||data.node.original.level=='2'){
                that.$router.push({'path':'/pandectone'})
            }
        });
    },
    methods:{
        
    },
}
</script>
<style scoped>
.pandect{width: 100%;height: 100%;padding: 5px;}
.pandect_left{width: 200px;height: 100%;border: 1px solid #E4E4F1;}
.pandect_right{position: absolute;left: 210px;right: 5px;top:5px;bottom:5px;}

</style>