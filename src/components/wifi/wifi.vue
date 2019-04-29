<template>
    <div class="video">
        <header class="header">
            <i @click="backtrack" class="iconfont icon-fanhui2"></i>
            <div class="video_header_left">
                <i class="iconfont icon-hengpai"></i>
                wifi管理
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
                <div class='header_center_color'>wifi设备管理</div>
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
                        prop=""
                        align='center'
                        label="图片"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="data1"
                        align='center'
                        label="设备标示"
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
                        label="型号"
                        min-width="80">
                        </el-table-column>
                        <el-table-column
                        prop="data5"
                        label="软件版本"
                        align='center'
                        min-width="95">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        align='center'
                        min-width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size='mini'>查看</el-button>
                                <el-button type="primary" size='mini'>配置</el-button>
                                <el-button type="primary" size='mini'>管理</el-button>
                            </template>
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
                    data1:'00:10:1E:3B:CE:4E',
                    data2:'192.168.10.116',
                    data3:'离线',
                    data4:'TSBG3061',
                    data5:'TSBC811_V1.1.0',
                },
                {
                    data1:'C0:F6:36:00:04:36',
                    data2:'192.168.70.12',
                    data3:'离线',
                    data4:'TSBC72M141',
                    data5:'TSBC72M141_V1.5.0b',
                },
                {
                    data1:'00:03:7F:10:12:19',
                    data2:'192.168.11.101',
                    data3:'离线',
                    data4:'TSBA721',
                    data5:'TSBA721_V1.5.1f',
                }
            ],
            pageIndex:1,
            pageSize:10,
            total:3,
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
                        text:'WIFI设备',
                        id:'0',
                        "state": {"opened" : true},
                        children:[
                            {
                                text:'列表',
                                id:'1',
                                "state": {"opened" : true},
                            },
                            {
                                text:'图标',
                                id:'2',
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
