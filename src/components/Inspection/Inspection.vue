<template>
    <!-- 巡检主页 -->
    <div class="Inspection">
        <header class="header">
            <i @click="backtrack" class="iconfont icon-fanhui2"></i>
            <div class="Inspection_header_left">
                <i class="iconfont icon-hengpai"></i>
                巡检管理
            </div>
            <div class="Inspection_header_project">
                <el-select size='small' v-model="value" @change='projectChange' style="margin-left:20px;" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        style="height:30px;"
                        :key="item.id"
                        :label="item.projectName"
                        :value="item.id">
                    </el-option>
                </el-select>
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
        return {
            serverurl:localStorage.serverurl,
            options:[],
            value:'',
        }
    },
    mounted(){
        var that = this;
        //初始化左侧树
        setTimeout(function(){
            that.ready()
        },200)
    },
    methods:{
        backtrack(){
            this.$router.push({'path':'/index'})
            sessionStorage.removeItem('projectId');
            sessionStorage.removeItem('menuId3');
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
                            
                        ]
                        $.ajax({
                            type:"GET",
                            url:that.serverurl+'/v1/manage/menu/'+sessionStorage.menuId,
                            dataType:"json",
                            async: false,
                            data:{},
                            success:function(data) {
                                if(data.errorCode=='0'){
                                    for(var i=0;i<data.result.menus.length;i++){
                                        if(data.result.menus[i].code=='patrolInspector'){
                                            data.result.menus[i].type = '1'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolItem'){
                                            data.result.menus.splice(i,1)
                                            // data.result.menus[i].type = '7'
                                            // data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolSite'){
                                            data.result.menus.splice(i,1)
                                            // data.result.menus[i].type = '4'
                                            // data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolRoute'){
                                            data.result.menus.splice(i,1)
                                            // data.result.menus[i].type = '5'
                                            // data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolPlan'){
                                            data.result.menus[i].type = '6'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolStatistics'){
                                            data.result.menus[i].type = '2'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='todayPatrolPlan'){
                                            data.result.menus[i].type = '6'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='historyPatrolRecord'){
                                            data.result.menus[i].type = '6'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolRecord'){
                                            data.result.menus[i].type = '6'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                        if(data.result.menus[i].code=='patrolApp'){
                                            data.result.menus[i].type = '6'
                                            data.result.menus[i].text = data.result.menus[i].menuName
                                        }
                                    }
                                    datas = data.result.menus
                                }else{
                                    that.errorCode(data)
                                }
                            }
                        });
                        jsonarray= datas;
                        callback.call(this, jsonarray);
                    }
                }
            });
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                if(data.node.id==''||data.node.id==undefined){
                }else{
                    sessionStorage.menuId3 = data.node.id
                    if(data.node.id=='38'){
                        that.$router.push({'path':'/UserSettings'})
                    }
                    // if(data.node.id=='39'){
                    //     that.$router.push({'path':'/patrolItem'})
                    // }
                    // if(data.node.id=='41'){
                    //     that.$router.push({'path':'/InspectionSite'})
                    // }
                    // if(data.node.id=='42'){
                    //     that.$router.push({'path':'/InspectionRoute'})
                    // }
                    if(data.node.id=='43'){
                        that.$router.push({'path':'/task'})
                    }
                    if(data.node.id=='44'){
                        that.$router.push({'path':'/Statistics'})
                    }
                    if(data.node.id=='82'){
                        that.$router.push({'path':'/todayPatrolPlan'})
                    }
                    if(data.node.id=='83'){
                        that.$router.push({'path':'/historyPatrolRecord'})
                    }
                    if(data.node.id=='84'){
                        that.$router.push({'path':'/Record'})
                    }
                    if(data.node.id=='85'){
                        that.$router.push({'path':'/AppUpgrade'})
                    }
                }
            });
        },
        //请求所有项目接口
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/owner/projects/type/1',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result.projects
                        that.value = data.result.projects[0].id
                        sessionStorage.projectId = data.result.projects[0].id
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        projectChange(){
            var that = this;
            sessionStorage.projectId = this.value
            this.$router.push({'path':'/loading2'})
            setTimeout(function(){
                if(sessionStorage.menuId3=='38'){
                    that.$router.push({'path':'/UserSettings'})
                }
                // if(sessionStorage.menuId3=='39'){
                //     that.$router.push({'path':'/patrolItem'})
                // }
                // if(sessionStorage.menuId3=='41'){
                //     that.$router.push({'path':'/InspectionSite'})
                // }
                // if(sessionStorage.menuId3=='42'){
                //     that.$router.push({'path':'/InspectionRoute'})
                // }
                if(sessionStorage.menuId3=='43'){
                    that.$router.push({'path':'/task'})
                }
                if(sessionStorage.menuId3=='44'){
                    that.$router.push({'path':'/Statistics'})
                }
                if(sessionStorage.menuId3=='82'){
                    that.$router.push({'path':'/todayPatrolPlan'})
                }
                if(sessionStorage.menuId3=='83'){
                    that.$router.push({'path':'/historyPatrolRecord'})
                }
                if(sessionStorage.menuId3=='84'){
                    that.$router.push({'path':'/Record'})
                }
                if(sessionStorage.menuId3=='85'){
                    that.$router.push({'path':'/AppUpgrade'})
                }
            },200)
        },
    },
    created(){
        this.project()
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
.Inspection_header_project{line-height: 60px;}
.header_right{position: absolute;right: 30px;height: 60px;;display: flex;align-items:center;}
.header_right>i{color: white;font-size: 34px;cursor: pointer;}
.header_right>i:hover{color: aquamarine;}

.bottom{width: 100%;position: absolute;top:60px;bottom:0;display: flex;padding: 5px;}
.bottom_left{width:200px;height: 100%;border:1px solid #e4e4f1;}
.bottom_right{position: absolute;left:210px;right: 5px;top:5px;bottom:5px;}
</style>
