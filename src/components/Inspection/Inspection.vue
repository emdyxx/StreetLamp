<template>
    <!-- 巡检主页 -->
    <div class="Inspection">
        <header class="header">
            <i @click="backtrack" class="iconfont icon-fanhui2"></i>
            <div class="Inspection_header_left">
                <i class="iconfont icon-hengpai"></i>
                巡检管理
            </div>
            <div class="header_right">
                <i @click="backtrack" class="iconfont icon-guanbi"></i>
            </div>
        </header>
        <div class="bottom">
            <div class="bottom_left">
                <div id="jstree"></div>
            </div>
            <div class="bottom_right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Inspection',
    data () {
        return {}
    },
    mounted(){
        var that = this;
        this.ready()
    },
    methods:{
        backtrack(){
            this.$router.push({'path':'/index'})
        },
        ready(){
            var that = this;
            $('#jstree').jstree("destroy");
            $('#jstree').jstree({
                "types" : {
                    "1" : {
                        "icon" : 'jstree_Inspection1',
                    },
                    "2" : {
                        "icon" : 'jstree_Inspection2',
                    },
                    "3" : {
                        "icon" : 'jstree_Inspection3',
                    },
                    "4" : {
                        "icon" : 'jstree_Inspection4',
                    },
                    "5" : {
                        "icon" : 'jstree_Inspection5',
                    },
                    "6" : {
                        "icon" : 'jstree_Inspection6',
                    },
                    "7" : {
                        "icon" : 'jstree_Inspection7',
                    },
                    "8" : {
                        "icon" : 'jstree_Inspection8',
                    }
                },
                // "state" : { "key" : that.sizeType.text },
                "plugins" : ['types'],
                'core' : {
                    'data':function(obj,callback){
                        var jsonstr="[]";
                        var jsonarray = eval('('+jsonstr+')');
                        var datas = [
                            {
                               type:'1',
                               text:'巡检员',
                               id:'1',
                            },
                            {
                               type:'2',
                               text:'查询统计',
                               id:'2',
                            },
                            {
                               type:'3',
                               text:'检查项目',
                               id:'3',
                            },
                            {
                               type:'4',
                               text:'巡检地点',
                               id:'4',
                            },
                            {
                               type:'5',
                               text:'巡检路线',
                               id:'5',
                            },
                            {
                               type:'6',
                               text:'巡检计划',
                               id:'6',
                            },
                            {
                               type:'7',
                               text:'巡检记录',
                               id:'7',
                            },
                            {
                               type:'8',
                               text:'巡检报告',
                               id:'8',
                            },
                        ]
                        var arr = {}
                        jsonarray= datas;
                        callback.call(this, jsonarray);
                    }
                }
            });
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    if(data.node.id=='1'){
                        that.$router.push({'path':'/UserSettings'})
                    }
                    if(data.node.id=='2'){
                        that.$router.push({'path':'/QueryStatistics'})
                    }
                    if(data.node.id=='3'){
                        that.$router.push({'path':'/InspectionItems'})
                    }
                    if(data.node.id=='4'){
                        that.$router.push({'path':'/InspectionSite'})
                    }
                    if(data.node.id=='5'){
                        that.$router.push({'path':'/InspectionRoute'})
                    }
                    if(data.node.id=='6'){
                        that.$router.push({'path':'/PatrolPlan'})
                    }
                    if(data.node.id=='7'){
                        that.$router.push({'path':'/Record'})
                    }
                    // if(data.node.id=='8'){
                    //     that.$router.push({'path':''})
                    // }
                }
            });
        },
    },
    created(){

    },
}
</script>
<style scoped>
.Inspection{width: 100%;height: 100%;}
.header{width:100%;height: 60px;background: #409EFF;display: flex;}
.header>i{font-size: 32px;color: white;cursor: pointer;position: absolute;left: 20px;top:10px;}
.header>i:hover{color: aquamarine;}
.Inspection_header_left{height: 100%;display: inline-block;margin-left: 70px;color: white;font-size: 24px;line-height: 50px;}
.Inspection_header_left>i{color: white;font-size: 26px;line-height: 62px;}
.header_right{position: absolute;right: 30px;height: 60px;;display: flex;align-items:center;}
.header_right>i{color: white;font-size: 34px;cursor: pointer;}
.header_right>i:hover{color: aquamarine;}

.bottom{width: 100%;position: absolute;top:60px;bottom:0;display: flex;padding: 5px;}
.bottom_left{width:200px;height: 100%;border:1px solid #e4e4f1;}
.bottom_right{position: absolute;left:210px;right: 5px;top:5px;bottom:5px;}
</style>
