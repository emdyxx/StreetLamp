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
            <el-dropdown style="margin-left:25px;" trigger='click' @command="handleCommand">
                <el-button type="primary" size='small' style="width:125px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">节目设置</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size='small' @click="notice" style="width:125px;margin-left:25px;">节目管理</el-button>
            <el-button type="primary" size='small' @click="mediaLibrary" style="width:125px;margin-left:25px;">媒体库</el-button>
            <el-button type="primary" size='small' @click="readymeadia" style="width:125px;margin-left:25px;">初始化配置</el-button>
        </div>
        <div class="advertisingScreens_bottom">
            <el-table
                :data="tableData"
                border
                stripe
                size='small'
                tooltip-effect="dark"
                style="width: 100%;max-height:80%;margin-bottom:10px;"
                @selection-change="tableChange1">
                <el-table-column
                type="selection"
                align='center'
                width="55">
                </el-table-column>
                <el-table-column
                prop="nickName"
                align='center'
                label="名称"
                width="80">
                </el-table-column>
                <el-table-column
                prop="width"
                align='center'
                label="宽度"
                width="80">
                </el-table-column>
                <el-table-column
                prop="height"
                align='center'
                label="高度"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                align='center'
                label="屏幕状态"
                width="80">
                </el-table-column>
                <el-table-column
                prop="programId"
                align='center'
                label="当前播放节目"
                width="130">
                </el-table-column>
                <el-table-column
                prop="offlineTime"
                align='center'
                label="最后下线时间"
                width="130">
                </el-table-column>
                <el-table-column
                prop="uploadStatus"
                align='center'
                label="当前节目状态"
                width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.uploadStatus=='0'">未上传</span>
                        <span v-if="scope.row.uploadStatus=='1'">上传中</span>
                        <span v-if="scope.row.uploadStatus=='2'">上传成功</span>
                        <span v-if="scope.row.uploadStatus=='3'">上传失败</span>
                    </template>
                </el-table-column>
                <el-table-column
                align='center'
                label="操作"
                width="130">
                    <template slot-scope="scope">
                        <el-button type="primary" size='small' @click="status(scope.row)">节目下发进度</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remark"
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
        <!-- 媒体库 -->
        <div class="modal fade" id="mediaLibraryModal" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:850px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">媒体库</h4>
                    </div>
                    <div class="modal-body">
                        <div class="mediaLibrary_top">
                            <span>状态:</span>
                            <el-select v-model="stateValue" clearable size='small' style='width:120px;'>
                                <el-option
                                v-for="item in stateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span>类型:</span>
                            <el-select v-model="typeValue" clearable size='small' style='width:90px;'>
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button @click="upload" type="primary" size='small' style="margin-left:30px;">上传</el-button>
                            <el-button @click="mediaDelete" type="primary" size='small'>删除</el-button>
                        </div>
                        <div class="mediaLibrary_bottom">
                            <el-table
                                :data="mediartableData"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                height='250'
                                style="width: 100%;overflow:auto;max-height:80%;margin-bottom:10px;"
                                @selection-change="mediartableChange">
                                <el-table-column
                                type="selection"
                                align='center'
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="名称"
                                width="170">
                                </el-table-column>
                                <el-table-column
                                prop="mediaSize"
                                align='center'
                                label="文件大小"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="ts"
                                align='center'
                                label="上传时间"
                                width="190">
                                </el-table-column>
                                <el-table-column
                                prop="creator"
                                align='center'
                                label="上传者"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="duration"
                                align='center'
                                label="审核者"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                align='center'
                                width="160">
                                    <template slot-scope="scope">
                                        <!-- <a @click="download(scope.row.mediaUrl)" id="download">下载</a> -->
                                        <el-button type="primary" @click="download(scope.row)" size='mini'>下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                @size-change="MediaSizechange"
                                @current-change="MediaCurrentchange"
                                background
                                :current-page="mediaIndex"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="mediaSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="mediaTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div> -->
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目管理模态框 -->
        <div class="modal fade" id="noticeModal" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">节目管理</h4>
                    </div>
                    <div class="modal-body">
                        <div class="notice_top">
                           <el-button type="primary" @click="program(0)" size='small' style="width:100px;margin-left:10px;">创建节目</el-button>
                           <el-button type="primary" @click="program(1)" size='small' style="width:100px;margin-left:10px;">编辑节目</el-button>
                           <el-button type="primary" @click="program(2)" size='small' style="width:100px;margin-left:10px;">删除节目</el-button>
                        </div>
                        <div class="notice_bottom">
                            <el-table
                                :data="noticetableData"
                                border
                                stripe
                                size='small'
                                tooltip-effect="dark"
                                height='250'
                                style="width: 100%;overflow:auto;max-height:80%;margin-bottom:10px;"
                                @selection-change='noticeTableChange'>
                                <el-table-column
                                type="selection"
                                align='center'
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                align='center'
                                label="名称"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                align='center'
                                label="类型"
                                width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.programType=='0'">简易节目</span>
                                        <span v-if="scope.row.programType=='1'">高级节目</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="width"
                                align='center'
                                label="宽"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="height"
                                align='center'
                                label="高"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="ts"
                                align='center'
                                label="创建时间"
                                width="305">
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                background
                                :current-page="noticeIndex"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="noticeSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="noticeTotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer"> -->
                        <!-- <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button> -->
                    <!-- </div> -->
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 创建编辑节目 -->
        <div class="modal fade" id="addprogram" style="width:1070px;" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:1070px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="addprogramModalLabel">创建节目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="setPercentage" v-if="programDate.setProgramType==true">
                            <span><i>*</i>节目名称:</span>
                            <el-input v-model="programDate.programName" size='small' style="width:146px" placeholder="请输入节目名称"></el-input>
                            <span style="margin-left:30px;"><i>*</i>类型:</span>
                            <el-select v-model="programDate.programValue" size='small' style="width:146px" placeholder="请选择">
                                <el-option
                                    v-for="item in programType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <span style="margin-left:30px;"><i>*</i>宽:</span>
                            <el-input v-model="programDate.programWidth" size='small' style="width:146px" placeholder="请输入宽"></el-input>
                            <span style="margin-left:30px;"><i>*</i>高:</span>
                            <el-input v-model="programDate.programHeight" size='small' style="width:146px" placeholder="请输入高"></el-input>
                            <p>请您谨慎输出宽高/宽高为比例(例:1:3)</p>
                        </div>
                        <div class="setProgram" v-if="programDate.setProgramType==false">
                            <div class="setProgram_left">
                                <div class="setProgram_div_top">
                                    <el-select v-model="setProgramValue" size='small' style="width:80px;margin:2px 0 0 5px;">
                                        <el-option
                                        v-for="item in setProgramOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span style="margin-left:50px;">媒体库</span>
                                    <el-button @click="rightMedia" type="primary" size='small'>移入<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                </div>
                                <div class="setProgram_div_bottom">
                                    <el-table
                                        :data="mediartableData"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        height='250'
                                        style="width: 100%;overflow:auto;max-height:85%;margin-bottom:10px;"
                                        @selection-change="leftMediaChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        align='center'
                                        label="图片"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="文件名"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="mediaSize"
                                        label="文件大小"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block" style="overflow:auto;">
                                        <el-pagination
                                        @size-change="leftMediaSizechange"
                                        @current-change="leftMediaCurrentchange"
                                        background
                                        :current-page="mediaIndex"
                                        :page-sizes="[10,30, 50]"
                                        :page-size="mediaSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="mediaTotal">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                            <div class="setProgram_center">
                                <div class="setProgram_div_top">
                                    <el-button type="primary" @click="fluctuation(0)" size='small' style="margin:4px 0 0 8px;">上移</el-button>
                                    <el-button type="primary" @click="fluctuation(1)" size='small' style="margin:4px 0 0 8px;">下移</el-button>
                                    <el-button type="primary" @click="deleteMedia" size='small' style="margin:4px 0 0 8px;">删除</el-button>
                                    <el-button type="primary" @click="modificationMedia" size='small' style="margin:4px 0 0 8px;">修改</el-button>
                                    <!-- <span style="font-size:12px;color: #606266;">已选择文件</span> -->
                                </div>
                                <div class="setProgram_div_bottom">
                                    <el-table
                                        :data="filesSelected"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        height='250'
                                        style="width: 100%;overflow:auto;max-height:85%;margin-bottom:10px;"
                                        @selection-change="centerMediaChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        align='center'
                                        label="图片"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        align='center'
                                        label="播放时间"
                                        width="80">
                                            <template slot-scope="scope">
                                                <el-input v-model=scope.row.duration placeholder="请输入内容" size='mini'></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        label="文件名"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="setProgram_right">
                                <div class="setProgram_div_top">
                                    <span style="margin-left:15px;">宽:{{programDate.programWidth}}</span>
                                    <span style="margin-left:15px;">高:{{programDate.programHeight}}</span>
                                    <el-button type="primary" @click="preview" size='small' style="margin:4px 0 0 15px;">预览</el-button>
                                </div>
                                <div class="setProgram_div_bottom previews" style="display:flex;justify-content: center;align-items: center;">
                                    <div id="previews_div" style='position:relative;border: 1px solid red;overflow: hidden;'>
                                        <!-- <div style='position:absolute;'>
                                            <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=10" width="100%" height="27" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe>
                                        </div> -->
                                        <!-- <div id="previews_div" style="position:relative;border: 1px solid red;overflow: hidden;"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="text-align:center;">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" v-if="programDate.setProgramType==true" @click="nextStep" class="btn btn-primary">下一步</button>
                        <button type="button" v-if="programDate.setProgramType==false" @click="mediaSave" class="btn btn-primary">保存</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 上传 -->
        <div class="modal fade" id="filesupload" draggable="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" v-loading="filesuploadLoading" element-loading-text="文件上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">文件上传</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" style="padding-left:80px;">
                            <input type="file" ref="upload" @change="uploadChange">
                        </div>
                        <div class="form-group">
                            <label>名称:</label>
                            <input type="text" id="nickName" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="uploadSubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目设置模态框 -->
        <div class="modal fade" id="programSetting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:700px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">节目设置</h4>
                    </div>
                    <div class="modal-body">
                        <div class="programSetting">
                            <div class="programSetting_top">
                                <el-button @click="sendMedia" type="primary" size='small'>发送节目</el-button>
                            </div>
                            <div class="programSetting_bottom">
                                <el-table
                                    :data="programSettingData"
                                    border
                                    stripe
                                    size='small'
                                    tooltip-effect="dark"
                                    height='250'
                                    style="width: 100%;overflow:auto;max-height:80%;margin-bottom:10px;"
                                    @selection-change="programSettingChange">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="nickName"
                                    align='center'
                                    label="节目名称"
                                    width="212">
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    label="类型"
                                    width="80">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.programType=='0'">简易节目</span>
                                            <span v-if="scope.row.programType=='1'">高级节目</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="width"
                                    align='center'
                                    label="宽度"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="height"
                                    align='center'
                                    label="高度"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    prop="mediaSize"
                                    align='center'
                                    label="大小"
                                    width="80">
                                    </el-table-column>
                                    <el-table-column
                                    label="操作"
                                    align='center'
                                    width="80">
                                        <template slot-scope="scope">
                                            <el-button type="primary" size='mini'>预览</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    background
                                    :current-page="programSettingIndex"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="programSettingSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="programSettingTotal">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">提交更改</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <el-dialog
        title="节目下发进度"
        :visible.sync="centerDialogVisible"
        width="50"
        center>
        <span>
            <el-progress :percentage=percentage status="success"></el-progress>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'chargingPile',
    data () {
        return {
            sessionStorageServerurl:sessionStorage.serverurl,
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
            // 屏幕
            tableData:[],
            tableSite1:[],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            pageSize:10,
            pageIndex:1,
            total:50,
            site:[],
            centerDialogVisible:false,
            percentage:0,
            //媒体库
            typeOptions:[
                {
                    value:0,
                    label:'图片'
                },
                {
                    value:1,
                    label:'视频'
                }
            ],
            typeValue:'',
            stateOptions:[
                {
                    value:0,
                    label:'未审核'
                },
                {
                    value:1,
                    label:'审核通过'
                },
                {
                    value:2,
                    label:'审核未通过'
                }
            ],
            stateValue:'',
            mediartableData:[],
            mediaSize:10,
            mediaIndex:1,
            mediaTotal:50,
            mediaSite:[],
            filesuploadLoading:false,
            //节目管理
            noticetableData:[],
            noticeSize:10,
            noticeIndex:1,
            noticeTotal:10,
            noticeSite:[],
            programType:[
                {
                    value:0,
                    label:'简易节目'
                },
                // {
                //     value:1,
                //     label:'高级节目',
                //     disabled:true
                // },
            ],
            programDate:{
                setProgramType:true,
                programName:'', //节目名称
                programValue:0, //节目类型
                programWidth:'', //节目宽度
                programHeight:'', //节目高度
            },// 创建节目数据
            leftMediaSize:[],
            centerMediaSize:[],
            filesSelected:[], //已选中节目列表
            submitMeadioType:'',
            //节目设置
            programSettingData:[],
            programSettingSite:[],
            programSettingIndex:1,
            programSettingSize:10,
            programSettingTotal:10,

            input:'',
            checked1:'',
            setProgramOptions:[
                {
                    value:0,
                    label:'全部'
                },
                {
                    value:1,
                    label:'图片'
                },
                {
                    value:2,
                    label:'视频'
                }
            ],
            setProgramValue:0,
        }
    },
    mounted(){
        
    },
    methods:{
        //操作按钮点击事件
        handleCommand(val){
            var that = this
            if(this.tableSite1.length=='0'){
                this.$message({
                    message: '请选择广告屏!',
                    type: 'error'
                });
                return;
            }
            if(val=='0'){//节目设置
                $('#programSetting').modal('show')
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/program/getProgramList',
                    data:{
                        page:that.noticeIndex,
                        rows:that.noticeSize,
                        programType:0,
                        nickName:'',
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.programSettingData = data.result.list
                            that.programSettingTotal = data.result.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }
        },
        //节目设置表格选择事件
        programSettingChange(val){
            this.programSettingSite = val
        },
        //发送节目
        sendMedia(){
            var that = this
            if(that.programSettingSite.length=='0'||that.programSettingSite.length>1){
                that.$message({
                    message: '请选择一个节目进行下发!',
                    type: 'error'
                });
                return;
            }
            var data = {
                "programId": that.programSettingSite[0].id,
                "serialNumber": this.tableSite1[0].serialNumber,
                "screenId":this.tableSite1[0].id
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/screen/setProgramUpload',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '节目正在下发种请稍后!',
                            type: 'success'
                        });
                        setTimeout(function(){
                            that.ready()
                        },2000)
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //表格change事件
        tableChange1(val){
            this.tableSite1 = val
        },
        // 节目管理
        notice(){
            $('#noticeModal').modal('show')
            this.noticeready()
            /* 完成拖拽 */
            $('#noticeModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#noticeModal').css("overflow", "hidden")
        },
        // 节目列表获取
        noticeready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/program/getProgramList',
                data:{
                   page:that.noticeIndex,
                   rows:that.noticeSize,
                   programType:0,
                   nickName:'',
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.noticetableData = data.result.list
                        that.noticeTotal = data.result.total
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //选择节目列表数据
        noticeTableChange(val){
            this.noticeSite = val
        },
        //创建编辑删除节目
        program(val){
            var that = this;
            if(val=='0'){
                //添加
                $('#addprogram').modal('show')
                $('#addprogramModalLabel').text('创建节目')
                that.submitMeadioType = '0'
                this.programDate.setProgramType = true
                that.programDate.programName = ''
                that.programDate.programWidth = ''
                that.programDate.programHeight = ''
                that.filesSelected = [];
            }
            if(val=='1'){
                //修改
                if(that.noticeSite.length=='0'||that.noticeSite.length>1){
                    that.$message({
                        message: '请选择一个节目进行编辑',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                $('#addprogram').modal('show')
                $('#addprogramModalLabel').text('编辑节目')
                that.submitMeadioType = '1'
                that.programDate.programName = that.noticeSite[0].nickName
                that.programDate.programWidth = that.noticeSite[0].width
                that.programDate.programHeight = that.noticeSite[0].height
                this.programDate.setProgramType = true
            }
            if(val=='2'){
                //删除
                if(that.noticeSite.length=='0'||that.noticeSite.length>1){
                    that.$message({
                        message: '请选择一个节目进行删除',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                that.$confirm('此操作将删除此节目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:sessionStorage.serverurl+'/program/deleteProgram',
                        data:{
                            id:that.noticeSite[0].id
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                that.noticeready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
            /* 完成拖拽 */
            $('#addprogram').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addprogram').css("overflow", "hidden")
        },
        //创建编辑节目下一步
        nextStep(){
            var that = this
            if(this.programDate.programName==''||this.programDate.programWidth==''||this.programDate.programHeight==''){
                this.$message.error('必填字段不能为空');
                return;
            }
            this.programDate.setProgramType = false
            this.mediaready()
            if(that.submitMeadioType=='1'){
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/program/getProgramDetailsList',
                    data:{
                        programId:that.noticeSite[0].id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.filesSelected = data.result.list
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }
        },
        //左侧选中媒体文件change事件
        leftMediaChange(val){
            this.leftMediaSize = val
        },
        //左侧分页
        leftMediaSizechange(val){
            this.mediaSize = val
            this.mediaready()
        },
        leftMediaCurrentchange(val){
            this.mediaIndex = val
            this.mediaready()
        },
        //中间选中媒体文件change事件
        centerMediaChange(val){
            this.centerMediaSize = val
        },
        //向右侧移入媒体文件
        rightMedia(){
            var type = 0;
            if(this.leftMediaSize.length==0){
                this.$message({
                    message: '请选择媒体文件进行移入操作',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i = 0;i<this.filesSelected.length;i++){
                if(this.filesSelected[i].type=='1'){
                    type = type+1
                }
            }
            for(var s=0;s<this.leftMediaSize.length;s++){
                if(this.leftMediaSize[s].type=='1'){
                    type = type+1
                }
            }
            if(type>2){
                this.$message({
                    message: '已选取媒体文件最多存在两个媒体视频文件',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i = 0;i<this.leftMediaSize.length;i++){
                for(var s = 0;s<this.filesSelected.length;s++){
                    if(this.leftMediaSize[i].id==this.filesSelected[s].mediaId){
                        this.$message({
                            message: '媒体文件重复!',
                            type:'error',
                            showClose: true,
                        });
                        return;
                    }
                }
            }
            if(this.filesSelected.length>10){
                this.$message({
                    message: '最多添加10个媒体文件!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            
            for(var i = 0;i<this.leftMediaSize.length;i++){
                this.filesSelected.push(this.leftMediaSize[i])
                this.filesSelected[this.filesSelected.length-1].mediaId = this.leftMediaSize[i].id
            }
            console.log(this.filesSelected)
        },
        //移动改变数据位置
        fluctuation(val){
            var vals = '';
            var data = {}
            if(this.centerMediaSize.length==0||this.centerMediaSize.length>1){
                this.$message({
                    message: '请选择媒体文件进行改变位置操作',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i = 0;i<this.filesSelected.length;i++){
                if(this.centerMediaSize[0].id==this.filesSelected[i].id){
                    vals = i;
                }
            }
            data = this.centerMediaSize[0]
            this.filesSelected.splice(vals,1)
            if(val=='0'){
                this.filesSelected.splice(vals-1,0,data)
            }
            if(val=='1'){
                this.filesSelected.splice(vals+1,0,data)
            }
        },
        //删除已选择文件
        deleteMedia(){
            var vals = '';
            if(this.centerMediaSize.length==0||this.centerMediaSize.length>1){
                this.$message({
                    message: '请选择一个媒体文件进行删除!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i = 0;i<this.filesSelected.length;i++){
                if(this.centerMediaSize[0].mediaId==this.filesSelected[i].mediaId){
                    vals = i;
                }
            }
            this.filesSelected.splice(vals,1)
        },
        //编辑已选择文件的播放时间
        modificationMedia(){
            if(this.centerMediaSize.length==0||this.centerMediaSize.length>1){
                this.$message({
                    message: '请选择一个媒体文件进行删除!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
        },
        //点击预览生成html
        preview(){
            clearInterval(animationMedia)
            $('#previews_div').html('')
            var that = this
            if(this.filesSelected.length==0){
                this.$message({
                    message: '请选择媒体文件!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            var width='';
            var height='';
            var val = this.programDate.programWidth/this.programDate.programHeight
            if(val>1){
                // 宽大于高 横屏
                width=299;
                height = 299/val
            }else{
                // 竖屏
                height=298;
                width=298*val
            }
            var ss = 0;
            var htmls = ''
            var length = this.filesSelected.length
            var i = 0;
            // previews
            $('#previews_div').css('width',width)
            $('#previews_div').css('height',height)
            if(this.filesSelected.length<2){
                if(this.filesSelected[0].type=='0'){ //0为图片
                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[0].mediaUrl+"'></div>"
                }else{
                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[0].mediaUrl+"' autoplay></video></div>"
                }
                $('#previews_div').append(htmls)
            }else{
                for(var s=0;s<this.filesSelected.length;s++){
                    if(this.filesSelected[s].type=='0'){
                        htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><img style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[i].mediaUrl+"'></div>"
                    }else{
                        htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><video id='video' style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[i].mediaUrl+"' loop></video></div>"
                    }
                    $('#previews_div').append(htmls)
                }
                var media = $('#previews_div');
                for(var t=0;t<this.filesSelected.length;t++){
                    media[0].childNodes[t].style.left = width * t +"px"    
                }
                if(this.filesSelected[0].type=='1'){
                    media[0].childNodes[0].childNodes[0].play()
                }
                // htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[i].mediaUrl+"'></div>"
                // $('#previews_div').append(htmls)
                var animationMedia = setInterval(() => {
                    ss++
                    if(ss==this.filesSelected[i].duration||ss>this.filesSelected[i].duration){
                        ss = 0;
                        for(var t =0;t<this.filesSelected.length;t++){
                            media[0].childNodes[t].style.left = media[0].childNodes[t].offsetLeft-width+'px'
                        }
                        if(this.filesSelected[i].type=='1'){
                            media[0].childNodes[i].childNodes[0].pause();
                            media[0].childNodes[i].childNodes[0].currentTime=0;
                        }
                        i++
                        if(i==length){
                            i=0
                            for(var t=0;t<this.filesSelected.length;t++){
                                media[0].childNodes[t].style.left = width * t +"px"    
                            }
                        }
                        if(this.filesSelected[i].type=='1'){
                            media[0].childNodes[i].childNodes[0].play()
                        }
                        // if(this.filesSelected[i].type=='0'){//0为图片
                        //     htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[i].mediaUrl+"'></div>"
                        //     $('#previews_div').append(htmls)
                        // }else{
                        //     htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+sessionStorage.serverurl+that.filesSelected[i].mediaUrl+"' autoplay></video></div>"
                        //     $('#previews_div').append(htmls)
                        // }
                    }
                    console.log(i,ss)
                }, 1000);
            }
            $('#addprogram').on('hide.bs.modal', function () {
                clearInterval(animationMedia)
                $('#previews_div').html('')
            })
        },
        //节目管理保存
        mediaSave(){
            var that = this;
            var url = '';
            var data = {};
            var array = []; //已选中节目的名称,以及播放时间
            data.nickName = that.programDate.programName
            data.programType = that.programDate.programValue
            data.width = that.programDate.programWidth
            data.height = that.programDate.programHeight
            for(var i=0;i<that.filesSelected.length;i++){
                var object = {}
                object.nickName = that.filesSelected[i].nickName 
                object.duration = that.filesSelected[i].duration
                object.type = that.filesSelected[i].type
                object.sort = i
                if(that.submitMeadioType=='0'){
                    object.mediaId = that.filesSelected[i].id
                }
                if(that.submitMeadioType=='1'){
                    object.mediaId = that.filesSelected[i].mediaId
                }
                object.mediaName = that.filesSelected[i].mediaName
                object.mediaUrl = that.filesSelected[i].mediaUrl
                array.push(object)
            }
            data.programDetails = array
            var html = "<!DOCTYPE html>"+
            "<html lang='en'>"+
                "<head>"+
                    "<meta charset='UTF-8'>"+
                    "<META HTTP-EQUIV='pragma' CONTENT='no-cache'>"+
                    "<META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'>"+
                    "<META HTTP-EQUIV='expires' CONTENT='0'>"+
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
                    "<meta http-equiv='X-UA-Compatible 'content='ie=edge'>"+
                    "<title>测试</title>"+
                    "<script src='../js/jquery.min.js'><\/script>"+
                    "<style>*{margin:0;padding:0}</style>"+
                "</head>"+
                "<body>"+
                    "<div id='previews_div' style='width:80px;height:160px;background:white;margin-top:1120px;margin-left:0;position:relative;'>"
                        // "<div style='position:absolute;'>"
                        //     '<iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=10" width="100%" height="27" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe>'+
                        // "</div>"+
                        // "<div id='previews_div'></div>"+
                    "</div>"+
                "</body>"+
                "<script>var ss = 0;var htmls = '';var i = 0;"+
                    "$('#previews_div').html('');"+
                    "var array2 = "+JSON.stringify(array)+";"+
                    "var array = array2;"+
                    "var length = array.length;"+
                    "var width ="+that.programDate.programWidth+";"+
                    "var height ="+that.programDate.programHeight+";"+
                    "$('#previews_div').css('width',width);"+
                    "$('#previews_div').css('width',width);"+
                    // "$('#previews').css('width',width);"+
                    // "$('#previews').css('height',height);"+
                "<\/script>"+
                "<script src='../js/media.js'><\/script>"+
            "</html>";
            data.htmlMsg = html
            if(that.submitMeadioType=='0'){
                url = '/program/addProgram'
            }
            if(that.submitMeadioType=='1'){
                url = '/program/updateProgram'
                data.id = this.noticeSite[0].id
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        if(that.submitMeadioType=='0'){
                            that.$message({
                                message: '节目添加成功;',
                                type:'success',
                                showClose: true,
                            });
                        }
                        if(that.submitMeadioType=='1'){
                            that.$message({
                                message: '节目修改成功;',
                                type:'success',
                                showClose: true,
                            });
                        }
                        $('#addprogram').modal('hide')
                        that.noticeready()
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //媒体库
        mediaLibrary(){
            $('#mediaLibraryModal').modal('show')
            this.mediaready()
            /* 完成拖拽 */
            $('#mediaLibraryModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#mediaLibraryModal').css("overflow", "hidden")
        },
        //媒体库列表获取
        mediaready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/media/getMediaList',
                data:{
                   page:that.mediaIndex,
                   rows:that.mediaSize,
                   audit:'0',
                   type:'',
                   nickName:''
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediartableData = data.result.list
                        that.mediaTotal = data.result.total
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //媒体库分页
        MediaSizechange(val){
            this.mediaSize = val
            this.mediaready()
        },
        MediaCurrentchange(val){
            this.mediaIndex = val
            this.mediaready()
        },
        //媒体库列表选择change事件
        mediartableChange(val){
            this.mediaSite = val
        },
        //删除,批量删除文件
        mediaDelete(){
            var that = this
            var ids = []
            if(that.mediaSite.length==''){
                that.$message({
                    message: '请选择媒体进行删除',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i = 0;i<that.mediaSite.length;i++){
                ids.push(that.mediaSite[i].id)
            }
            that.$confirm('此操作将删除选中媒体, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:sessionStorage.serverurl+'/media/deleteMoreMedia',
                    data:{
                        ids:ids.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.mediaready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
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
        //上传文件change时间
        uploadChange(){
            $('#nickName').val(this.$refs.upload.files[0].name)
        },
        //上传文件确定
        uploadSubmit(){
            var that = this;
            that.filesuploadLoading = true
            var type = ''
            var value = this.$refs.upload.files[0].type.split('/')
            var that= this;
            var formdate = new FormData();
            formdate.append("file", this.$refs.upload.files[0]);
            formdate.append('nickName',$('#nickName').val())
            formdate.append('creatorId',1)
            if(value[0]=='video'){
                type='1'
            }
            if(value[0]=='image'){
                type='0'
            }
            formdate.append('type ',type)
            $.ajax({
                url:sessionStorage.serverurl+'/media/addMedia',
                type: 'POST',
                cache: false,
                data: formdate,
                dataType:'json',
                processData: false,
                contentType: false,
            }).done(function(res){
                if(res.errorCode=='0'){
                    that.$message({
                        message: '上传成功',
                        type:'success',
                        showClose: true,
                    });
                    that.filesuploadLoading = false
                    $('#filesupload').modal('hide')
                    that.mediaready()
                }else{
                    that.filesuploadLoading = false
                    that.errorCode(res.errorCode)
                    $('#filesupload').modal('hide')
                }
            }).error(function(res){
                that.filesuploadLoading = false
            })
        },
        //媒体库文件下载
        download(val){
            var that = this;
            var url = val.mediaUrl
            var data = {
                fileName:sessionStorage.serverurl+url
            }
            window.open(sessionStorage.serverurl+"/file/download?fileName="+sessionStorage.serverurl+url)
            $.get(sessionStorage.serverurl+"/file/download",data,function(data){
                
            })
            // if(val.type=='0'){
                // $.ajax({
                //     type:'get',
                //     async:true,
                //     dataType:'json',
                //     url:sessionStorage.serverurl+'/file/download',
                //     data:{
                //         fileName:sessionStorage.serverurl+url
                //     },
                //     success:function(data){
                //         if(data.errorCode=='0'){

                //         }else{
                //             that.errorCode(data.errorCode)
                //         }
                //     }
                // })
            // }
        },
        //获取广告屏列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/screen/getScreenList',
                data:{
                   page:that.pageIndex,
                   rows:that.pageSize,
                   status:'',
                   serialNumber:'',
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
        },
        //获取节目下发进度
        status(val){
            var that = this
            if(val.uploadStatus=='0'){
                that.$message({
                    message: '节目未上传!',
                    type:'error',
                    showClose: true,
                });
            }
            if(val.uploadStatus=='1'){
                this.centerDialogVisible = true
                var clearstatus = setInterval(function(){
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        url:sessionStorage.serverurl+'/screen/getDownLoadProgress',
                        contentType:'application/json;charset=UTF-8',
                        data:{
                            programId:val.programId,
                            serialNumber:val.serialNumber
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                if(data.result.num*100==100||data.result.num*100>100){
                                    that.ready()
                                    clearInterval(clearstatus)
                                }
                                that.percentage = Number(data.result.num*100)
                            }else{
                                clearInterval(clearstatus)
                                that.errorCode(data.errorCode)
                                that.ready()
                            }
                        }
                    })
                },2000)
            }
            if(val.uploadStatus=='2'){
                that.percentage = 100
                this.centerDialogVisible = true    
            }
            if(val.uploadStatus=='3'){
                // 70
                that.$message({
                    message: '节目上传失败!',
                    type:'error',
                    showClose: true,
                });
            }
        },
        //初始化配置js
        readymeadia(){
            var that = this;
            if(this.tableSite1.length==0||this.tableSite1.length>2){
                that.$message({
                    message: '请选择单个屏幕进行初始化!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            var data = {
                programId:this.tableSite1[0].id,
                serialNumber:this.tableSite1[0].serialNumber
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:sessionStorage.serverurl+'/screen/downloadJsToSD',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '初始化配置中,请稍后!',
                            type:'success',
                            showClose: true,
                        });
                    }else{
                        that.errorCode(data.errorCode)
                    }
                } 
            })
        },
    },
    created(){
        var that = this 
        that.ready()
    }
}
</script>
<style scoped>
.setPercentage i{color: red;}
.advertisingScreens{width: 100%;height: 100%;}
.advertisingScreens>div{width: 100%;position: absolute;}
.advertisingScreens_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.advertisingScreens_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow:auto;}
.block{text-align: center;}
.table_button{height: 20px;padding: 5px;}
.notice_bottom{margin-top: 10px;}
.setPercentage{width: 100%;height: 45px;text-align: center;}
.setPercentage>span{font-size: 15px;line-height: 35px;}
.setPercentage>p{font-size: 12px;color: #606266;margin-top: 7px;}
.mediaLibrary_top,{width: 100%;height: 35px;}
.mediaLibrary_top>span,{font-size: 15px;line-height: 35px;}
.mediaLibrary_top>span:nth-of-type(2){margin-left: 30px;}
.mediaLibrary_bottom{width: 100%;height: auto;margin-top:5px;}
.setProgram{width: 100%;display: flex;height: 350px;}
.setProgram>div{width: 30%;border: 1px solid #e5e5e5;border-radius: 5px;position: relative;}
.setProgram>div:nth-of-type(2){margin-left: 5%;margin-right: 5%;}.setProgram>div:nth-of-type(2){margin-left: 5%;margin-right: 5%;}
.setProgram_div_top{width: 100%;height: 40px;line-height: 35px;border-bottom: 1px solid #e5e5e5;}
.setProgram_div_bottom{position: absolute;top:40px;bottom: 0;left: 0;right: 0;padding: 5px;}
.positionTop{position: absolute;top: 0;left:0;right: 0;width: 100%;height:50px;background: red;}
.programSetting{width: 100%;height: 340px;position: relative;}
.programSetting_top{width: 100%;height: 40px;line-height: 38px;}
.programSetting_bottom{width: 100%;position: absolute;top:45px;bottom: 0;height: auto;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}
</style>