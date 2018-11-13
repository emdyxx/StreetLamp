<template>
    <div class="video">
        <header class="header">
            <i @click="backtrack" class="iconfont icon-fanhui2"></i>
            <div class="video_header_left">
                <i class="iconfont icon-hengpai"></i>
                广播管理系统
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
                <div class='header_center_color'>广播管理</div>
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
                <div class="bottom_right_top">
                    <el-button style="margin-left:20px;" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
                    <el-button type="primary" icon='el-icon-edit' size='small'>编辑</el-button>
                    <el-button type="primary" icon='el-icon-delete' size='small'>删除</el-button>
                    <el-button type="primary" icon='el-icon-sort' size='small'>时时播报</el-button>
                    <el-button type="primary" icon='el-icon-service' size='small'>定时播报</el-button>
                </div>
                <div class="bottom_right_bottom">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        size='small'
                        tooltip-effect="dark"
                        show-overflow-tooltip=true
                        style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="data"
                        align='center'
                        label="终端ID"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="data1"
                        align='center'
                        label="名称"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data2"
                        align='center'
                        label="IP地址"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data3"
                        align='center'
                        label="状态"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data4"
                        align='center'
                        label="音量"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data5"
                        label="监听"
                        align='center'
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data6"
                        label="音频接收"
                        align='center'
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data7"
                        label="任务"
                        align='center'
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data8"
                        label="音源"
                        align='center'
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data9"
                        label="任务队列"
                        align='center'
                        min-width="180">
                        </el-table-column>
                    </el-table>
                    <div style="text-align:center;">
                        <el-pagination
                        background
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
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
            tableData:[
                {
                    data:'C0:F6:36:00:05:EA',
                    data1:'T1',
                    data2:'192.168.10.116',
                    data3:'离线',
                    data4:'8',
                    data5:'--',
                    data6:'组播',
                    data7:'空闲',
                    data8:'--',
                    data9:'0',
                },
                {
                    data:'C0:F6:36:10:20:20',
                    data1:'T1',
                    data2:'192.168.10.112',
                    data3:'离线',
                    data4:'8',
                    data5:'--',
                    data6:'组播',
                    data7:'空闲',
                    data8:'--',
                    data9:'0',
                },
                {
                    data:'C0:F6:36:00:06:78',
                    data1:'T1',
                    data2:'192.168.10.19',
                    data3:'离线',
                    data4:'8',
                    data5:'--',
                    data6:'组播',
                    data7:'空闲',
                    data8:'--',
                    data9:'0',
                },
                {
                    data:'C0:F6:36:03:24:23',
                    data1:'T1',
                    data2:'192.168.10.116',
                    data3:'离线',
                    data4:'8',
                    data5:'--',
                    data6:'组播',
                    data7:'空闲',
                    data8:'--',
                    data9:'0',
                },
                {
                    data:'C0:F6:36:FF:00:24',
                    data1:'T1',
                    data2:'192.168.10.211',
                    data3:'离线',
                    data4:'8',
                    data5:'--',
                    data6:'组播',
                    data7:'空闲',
                    data8:'--',
                    data9:'0',
                },
            ],
            pageIndex:1,
            pageSize:10,
            total:5,
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
                        that.errorCode(data.errorCode)
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
                        text:'广播站点',
                        id:'0',
                        "state": {"opened" : true},
                        children:[
                            {
                                text:'区域1',
                                id:'1',
                                "state": {"opened" : true},
                            },
                            {
                                text:'区域2',
                                id:'2',
                                "state": {"opened" : true},
                            },
                            {
                                text:'区域3',
                                id:'3',
                                "state": {"opened" : true},
                            },
                        ]
                    }]
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
.bottom_right{position: absolute;left:210px;right: 5px;top:5px;bottom:5px;border:1px solid #e4e4f1;}
.bottom_right_top{width: 100%;height: 40px;line-height: 40px;border-bottom: 1px solid #e4e4f1;}
.bottom_right_bottom{width: 100%;position: absolute;top: 40px;bottom: 0;}




</style>
