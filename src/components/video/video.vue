<template>
    <div class="video">
        <header class="header">
            <i @click="backtrack" class="iconfont icon-fanhui2"></i>
            <div class="video_header_left">
                <i class="iconfont icon-hengpai"></i>
                视频管理系统
            </div>
            <el-select size='small' v-model="value2" @change='projectChange' style="margin-left:20px;margin-top: 15px;">
                <el-option
                    v-for="item in options2"
                    style="height:30px;"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id">
                </el-option>
            </el-select>
            <div class="header_center">
                <div class='header_center_color'>视频管理</div>
            </div>
            <div class="header_right">
            <i @click="backtrack" class="iconfont icon-guanbi"></i>
            </div>
        </header>
        <div class="bottom">
            <div class="bottom_left">
                <div class="bottom_left_top">
                    <div id="jstree"></div>
                </div>
                <div class="bottom_left_bottom">
                    <p>MAC:{{data.MAC}}</p>
                    <p>IP:{{data.IP}}</p>
                    <p>状态:离线</p>
                    <p>位置:{{data.位置}}</p>
                </div>
            </div>
            <div class="bottom_right"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'usercenter',
    data () {
        return {
            serverurl:localStorage.serverurl,
            options2:[],
            value2:'',
            data:{
                MAC:'11:22:33:44:55:66',
                IP:'192.168.1.1',
                位置:'浙江省杭州市滨江区长河街道',
            }
        }
    },
    mounted(){
        var that = this
        //初始化左侧树
        setTimeout(function(){
            that.readyLeft()
        },200)
    },
    methods:{
        backtrack(){
            this.$router.push({'path':'/index'})
        },
        //获取有权限的项目
        project(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getMyAllProject',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.projects
                        if(sessionStorage.projectId==''||sessionStorage.projectId==undefined||sessionStorage.projectId==null){
                            that.value2 = that.options2[0].id
                            sessionStorage.projectId = that.options2[0].id
                        }else{
                            that.value2 = Number(sessionStorage.projectId)
                        }
                    }else{
                        that.errorCode(data)
                    }
                },
            })
        },
        projectChange(){
            
        },
        readyLeft(){
            var that = this
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
                    'data':[{
                        text:'监控点',
                        id:'0',
                        type:'1',
                        "state": {"opened" : true},
                        children:[
                            {
                                text:'摄像头1',
                                id:'1',
                                type:'4',
                                "state": {"opened" : true},
                            },
                            {
                                text:'摄像头2',
                                id:'2',
                                type:'4',
                                "state": {"opened" : true},
                            },
                            {
                                text:'摄像头3',
                                id:'3',
                                type:'4',
                                "state": {"opened" : true},
                            },
                        ]
                    }]
                }
            });
            $('#jstree').bind("activate_node.jstree.jstree", function (e, data) {
                console.log(data.node.id);
                if(data.node.id=='1'){
                    that.data = {
                        MAC:'11:22:33:44:55:66',
                        IP:'192.168.1.1',
                        位置:'浙江省杭州市滨江区长河街道',
                    }
                }
                if(data.node.id=='2'){
                    that.data = {
                        MAC:'aa:bb:cc:dd:ee:ff',
                        IP:'192.168.10.12',
                        位置:'浙江省杭州市萧山区旺角新天地',
                    }
                }
                if(data.node.id=='3'){
                    that.data = {
                        MAC:'qq:ww:ee:rr:tt:yy',
                        IP:'192.168.80.112',
                        位置:'浙江省绍兴市柯桥区',
                    }
                }
            });
        }
    },
    created() {
        this.project()
    },
}
</script>
<style  scoped>
.video{width: 100%;height: 100%;}
.header{width:100%;height: 60px;background: #409EFF;display: flex;}
.header>i{font-size: 32px;color: white;cursor: pointer;position: absolute;left: 20px;top:10px;}
.header>i:hover{color: aquamarine;}
.video_header_left{height: 100%;display: inline-block;margin-left: 70px;color: white;font-size: 24px;line-height: 50px;}
.video_header_left>i{color: white;font-size: 26px;line-height: 62px;}
.header_center{height: 100%;margin-left: 25px;display: flex;justify-content: center;align-items: center;}
.header_center>div{color: white;font-size: 16px;width: 110px;height: 30px;text-align: center;line-height: 30px;border-radius: 8px;cursor: pointer;}
.header_center>div:hover{background: #66b1ff;}
.header_center_color{background:#2B6BC3;}
.header_right{position: absolute;right: 30px;height: 60px;;display: flex;align-items:center;}
.header_right>i{color: white;font-size: 34px;cursor: pointer;}
.header_right>i:hover{color: aquamarine;}

.bottom{width: 100%;position: absolute;top:60px;bottom:0;display: flex;padding: 5px;}
.bottom_left{width:200px;height: 100%;border:1px solid #e4e4f1;}
.bottom_left_top{width: 100%;height: 300px;}
.bottom_left_bottom{width: 100%;padding-left:10px;padding-top:15px;border-top:1px solid #e4e4f1;}
.bottom_right{position: absolute;left:210px;right: 5px;top:5px;bottom:5px;border:1px solid #e4e4f1;background: gray;}



</style>
