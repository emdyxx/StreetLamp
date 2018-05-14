<template>
    <!--广告屏 -->
    <div class="advertisingScreens">
        <div class="advertisingScreens_top">
            目录:
            <el-cascader
            size='small'
            :options="options"
            change-on-select
            v-model="selectedOptions3">
            </el-cascader>
            <el-dropdown style="margin-left:25px;">
                <el-button type="primary" size='small' style="width:125px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>节目设置</el-dropdown-item>
                    <el-dropdown-item>开始播放广告</el-dropdown-item>
                    <el-dropdown-item>停止播放广告</el-dropdown-item>
                    <el-dropdown-item>广告状态查询</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size='small' @click="notice" style="width:125px;margin-left:25px;">节目管理</el-button>
        </div>
        <div class="advertisingScreens_bottom">
            <el-table
                :data="tableData"
                border
                stripe
                size='small'
                tooltip-effect="dark"
                height='250'
                style="width: 100%;max-height:80%;margin-bottom:10px;">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="区域"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="名称"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="地址"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="状态"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="警报"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="当前节目"
                width="180">
                </el-table-column>
                <el-table-column
                prop="date"
                label="备注"
                align='center'
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="block">
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
        <!-- 广告数量模态框 -->
        <div class="modal fade" id="NumberofadsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">当前配置</h4>
                    </div>
                    <div class="modal-body">在这里添加一些文本</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目管理模态框 -->
        <div class="modal fade" id="noticeModal" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">节目管理</h4>
                    </div>
                    <div class="modal-body">
                        <div class="notice_top">
                           <el-button type="primary" @click="program(0)" size='small' style="width:100px;margin-left:10px;">创建节目</el-button>
                           <el-button type="primary" @click="program(1)" size='small' style="width:100px;margin-left:10px;">编辑节目</el-button>
                           <el-button type="primary" size='small' style="width:100px;margin-left:10px;">删除节目</el-button>
                        </div>
                        <div class="notice_bottom">
                            <el-table
                                :data="tableData"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                height='250'
                                style="width: 100%;max-height:80%;margin-bottom:10px;">
                                <el-table-column
                                type="selection"
                                align='center'
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                align='center'
                                label="名称"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                align='center'
                                label="类型"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                align='center'
                                label="创建时间"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="date"
                                label="备注"
                                align='center'
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 创建编辑节目 -->
        <div class="modal fade" id="addprogram" style="width:980px;" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:960px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">创建节目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="program_top">
                            <div>
                                <span>节目名称:</span>
                                <el-input v-model="input" size='small' placeholder="请输入节目名称"></el-input>
                            </div>
                            <div>
                                <span>节目类型:</span>
                                <el-input v-model="input" size='small' placeholder="请输入节目类型"></el-input>
                            </div>
                            <div>
                                <span>备注:</span>
                                <el-input v-model="input" style="width:340px;" size='small' placeholder="请输入备注"></el-input>
                            </div>
                        </div>
                        <div class="program_bottom">
                            <div class="program_bottom_left">
                                <div class="program_bottom_left_top">广告库</div>
                                <div class="program_bottom_left_center">
                                    <el-button type="primary" @click="upload" size='mini' icon='el-icon-upload'>上传</el-button>
                                    <el-button type="primary" size='mini' icon='el-icon-delete'>移除</el-button>
                                </div>
                                <div class="program_bottom_left_bottom">
                                    <el-table
                                        :data="tableData"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        height='250'
                                        style="width: 100%;max-height:80%;margin-bottom:10px;">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        align='center'
                                        label="名称"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="date"
                                        label="备注"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <section>
                                <div style="display: flex;align-items: center;"><el-button type="primary" icon='el-icon-arrow-left' size='mini'>到左边</el-button></div>
                                <div><el-button type="primary" style="" icon='el-icon-arrow-right' size='mini'>到右边</el-button></div>
                            </section>
                            <div class="program_bottom_right">
                                <div class="program_bottom_right_top">当前配置</div>
                                <div class="program_bottom_right_center">
                                    <div>
                                        <el-checkbox v-model="checked1">在广告屏上显示天气信息</el-checkbox>
                                        <el-checkbox v-model="checked1">在广告屏上显示环境数据</el-checkbox>
                                    </div>
                                    <div>
                                        <el-checkbox v-model="checked1">在广告屏上显示灯具信息</el-checkbox>
                                        <el-checkbox v-model="checked1">在广告屏上显示报警联动</el-checkbox>
                                    </div>
                                </div>
                                <div class="program_bottom_right_bottom">
                                    <div>
                                        <span>部署广告:</span>
                                        <el-button type="primary" style="margin-left:150px;" size='mini' icon='el-icon-delete'>移除</el-button>
                                        <el-button type="primary" @click="editor" size='mini' icon='el-icon-edit'>编辑</el-button>
                                    </div>
                                    <div>
                                        <el-table
                                            :data="tableData"
                                            border
                                            stripe
                                            size='small'
                                            tooltip-effect="dark"
                                            height='250'
                                            style="width: 100%;max-height:80%;margin-bottom:10px;">
                                            <el-table-column
                                            type="selection"
                                            align='center'
                                            width="55">
                                            </el-table-column>
                                            <el-table-column
                                            prop="name"
                                            align='center'
                                            label="名称"
                                            width="120">
                                            </el-table-column>
                                            <el-table-column
                                            prop="date"
                                            label="备注"
                                            align='center'
                                            show-overflow-tooltip>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 上传 -->
        <div class="modal fade" id="filesupload" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">文件上传</h4>
                    </div>
                    <div class="modal-body">
                        <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false">
                        <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/MP4文件</div>
                        </el-upload>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 编辑 -->
        <div class="modal fade" id="fileeditor" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:300px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">编辑数据</h4>
                    </div>
                    <div class="modal-body">
                        <span>名称:</span>
                        <el-input size='small'></el-input>
                        <span>文件类型:</span>
                        <el-input size='small'></el-input>
                        <span>播放时长(秒)::</span>
                        <el-input size='small'></el-input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'chargingPile',
    data () {
        return {
            selectedOptions3:[1,2],
            options:[
                {
                    value: 1,
                    label: '浙江',
                    children:[
                        {
                            value: 2,
                            label: '杭州',
                        },
                        {
                            value: 3,
                            label: '嘉兴',
                        },
                    ]
                }
            ],
            tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            pageSize:10,
            pageIndex:1,
            total:50,
            textarea:"上海亚明照明有限公司欢迎各位领导莅临指导！！！智慧照明、智慧城市。城市改变生活！！！",
            input:'',
            checked1:'',
            fileList:[{}],
        }
    },
    mounted(){
        
    },
    methods:{
        //广告数量
        Numberofads(){
            $('#NumberofadsModal').modal('show')
        },
        // 节目管理
        notice(){
            $('#noticeModal').modal('show')
            /* 完成拖拽 */
            $('#noticeModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#noticeModal').css("overflow", "hidden")
        },
        //创建节目
        program(val){
            $('#addprogram').modal('show')
            /* 完成拖拽 */
            $('#addprogram').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addprogram').css("overflow", "hidden")
        },
        //上传文件
        upload(){
            $('#filesupload').modal('show')
            /* 完成拖拽 */
            $('#filesupload').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#filesupload').css("overflow", "hidden")
        },
        //编辑文件
        editor(){
            $('#fileeditor').modal('show')
            /* 完成拖拽 */
            $('#fileeditor').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#fileeditor').css("overflow", "hidden")
        },
    },
}
</script>
<style scoped>
.advertisingScreens{width: 100%;height: 100%;}
.advertisingScreens>div{width: 100%;position: absolute;}
.advertisingScreens_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.advertisingScreens_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow:auto;}
.block{text-align: center;}
.table_button{height: 20px;padding: 5px;}
.notice_bottom{margin-top: 10px;}
.program_top{display: flex;flex-wrap: nowrap;}
.program_top>div{margin-left: 5px;}
.program_top>div>span{width: 70px;line-height: 34px;}
.program_top>div>div{width: 164px;}
.program_bottom{margin-top: 10px;display: flex;}
.program_bottom>div{border: 1px solid #E4E4F1;width: 45%;height: 450px;}
.program_bottom>section{width: 10%;display: flex;justify-content: center;flex-wrap: wrap;}
.program_bottom_left,.program_bottom_right{position: relative;}
.program_bottom_left>div,.program_bottom_right>div{width: 95%;margin: 5px auto;}
.program_bottom_left_top,.program_bottom_right_top{border-bottom: 1px solid #C5C5C5;height: 30px;line-height: 30px;font-size: 16px;text-align: center;}
.program_bottom_left_center{border: 1px solid #C5C5C5;height: 35px;}
.program_bottom_left_center>button{margin-top:3px;margin-left: 10px;}
.program_bottom_left_bottom{border: 1px solid #C5C5C5;height:auto;position: absolute !important;top: 75px;left:2.5%;bottom: 3px;}
.program_bottom_right_bottom{position: absolute;top:80px;bottom: 3px;left: 2.5%;border: 1px solid #C5C5C5;}
.program_bottom_right_bottom>div:nth-of-type(1){padding: 5px;}
.program_bottom_right_bottom>div:nth-of-type(2){width:100%;position: absolute;top:35px;bottom: 0;}
</style>