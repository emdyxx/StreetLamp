<template>
    <div class="TheTaskPage">
        <div class="TheTaskPage_left">
            <el-menu
                :default-active=active
                router
                class="el-menu-vertical-demo">
                <el-menu-item index="mediaLibrary" v-if="viewMedia">
                    <i class="iconfont icon-meitiku"></i>
                    <div>媒体库</div>
                </el-menu-item>
                <el-menu-item index="ProgramList" v-if="viewProgram">
                    <i class="iconfont icon-favorite"></i>
                    <div slot="title">节目管理</div>
                </el-menu-item>
                <el-menu-item index="taskManage" v-if="viewTask">
                    <i class="iconfont icon-renwux"></i>
                    <div slot="title">任务管理</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="TheTaskPage_right">
            <router-view></router-view>
        </div>
        <!-- <div @click="Returns" class="Return iconfont icon-fanhuishangyiji"></div> -->
    </div>
</template>

<script>
export default {
    name:'TheTaskPage',
    data () {
        return {
            viewMedia:'',
            viewProgram:'',
            viewTask:'',
            serverurl:localStorage.serverurl,
            active:'' 
        }
    },
    mounted(){

    },
    methods:{
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            for(var i=0;i<data.result.operats.length;i++){
                                if(data.result.operats[i].code=='viewMedia'){
                                    that.viewMedia = true
                                    if(that.active==''){
                                        that.active = 'mediaLibrary'
                                        that.$router.push({'path':'/mediaLibrary'})
                                    }
                                }
                                if(data.result.operats[i].code=='viewProgram'){
                                    that.viewProgram = true
                                    if(that.active==''){
                                        that.active = 'ProgramList'
                                        that.$router.push({'path':'/ProgramList'})
                                    }
                                }
                                if(data.result.operats[i].code=='viewTask'){
                                    that.viewTask = true
                                    if(that.active==''){
                                        that.active = 'taskManage'
                                        that.$router.push({'path':'/taskManage'})
                                    }
                                }
                                
                            }
                            
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // Returns(){
        //     this.$router.push({path:'solinScreenManage'})
        // },
    },
    created(){
        if(sessionStorage.type=='2'){
            this.active = 'ProgramList'
        }
        this.Jurisdiction()
    },
}
</script>

<style scoped>
.TheTaskPage{width: 100%;height: 100%;}
/* .TheTaskPage>div{box-shadow: -0.5px 1px 3px gray;} */
.TheTaskPage_left{position:absolute;top:0;bottom:0;width:110px;}

.TheTaskPage_left>ul>li{width: 110px;height: 110px;text-align: center;line-height: 30px;font-size: 16px;padding-top: 30px;}
.TheTaskPage_left>ul>li:nth-of-type(1)>i{font-size: 22px;}
.TheTaskPage_left>ul>li:nth-of-type(2)>i{font-size: 27px;}
.TheTaskPage_left>ul>li:nth-of-type(3)>i{font-size: 25px;}
.TheTaskPage_left>ul>li:nth-of-type(4)>i{font-size: 28px;}

.TheTaskPage_right{position: absolute;left: 108px;right: 0;top:0;bottom: 0;border-left: 7px solid #eaeef2;}
/* .Return{position: absolute;right: 20px;top: -53px;width: 35px;height: 35px;line-height: 30px;border-radius: 50%;color: white;border: 2px solid white;cursor: pointer;text-align: center;font-size: 22px;} */
</style>
<style lang='less'>
.TheTaskPage_left{
    .el-menu-item{line-height: 0;width:110px;height: 20px;}
}
</style>
