<template>
    <!--广告屏 -->
    <div class="advertisingScreens">
        <div class="advertisingScreens_top">
            <el-dropdown v-if="operation" trigger='click' @command="handleCommand">
                <el-button type="primary" size='small' style="width:125px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">下发节目</el-dropdown-item>
                    <el-dropdown-item command="1">开启屏幕</el-dropdown-item>
                    <el-dropdown-item command="2">关闭屏幕</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="programManagement" type="primary" size='small' @click="notice" style="width:125px;margin-left:25px;">节目管理</el-button>
            <el-button v-if="mediaLibrarys" type="primary" size='small' @click="mediaLibrary" style="width:125px;margin-left:25px;">媒体库</el-button>
            <!-- <el-button type="primary" size='small' @click="readymeadia" style="width:125px;margin-left:25px;">初始化配置</el-button> -->
        </div>
        <div class="advertisingScreens_bottom">
            <div class="advertisingScreens_bottom_top">
                <div class="search">
                    <label>序列号:</label>
                    <input type="text" v-model="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入屏幕序列号">
                </div>
                <div class="search">
                    <label>状态:</label>
                    <el-select v-model="value" style="width:126px;" size='small' clearable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="advertisingScreens_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
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
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    min-width="125">
                    </el-table-column>
                    <el-table-column
                    prop="width"
                    align='center'
                    label="宽度(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="height"
                    align='center'
                    label="高度(像素)"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status=='0'">关闭</span>
                            <span v-if="scope.row.status=='1'">开启</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="programName"
                    align='center'
                    label="当前播放节目"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="操作"
                    min-width="130">
                        <template slot-scope="scope">
                            <el-button type="primary" size='mini' @click="status(scope.row)">节目下发进度</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    :formatter="formatRole"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    background
                    @size-change="sizechange"
                    @current-change="currentchange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 媒体库 -->
        <div class="modal fade" id="mediaLibraryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:850px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">媒体库</h4>
                    </div>
                    <div class="modal-body">
                        <div class="mediaLibrary_top">
                            <span>状态:</span>
                            <el-select v-model="stateValue" size='small' style='width:120px;'>
                                <el-option
                                v-for="item in stateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <span>类型:</span>
                            <el-select v-model="typeValue" @change='typeChange' clearable size='small' style='width:90px;'>
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
                                @row-click="clickRow2" 
                                border
                                stripe
                                size='small'
                                ref="mediartableData"
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
                                align='center'
                                label="文件别名"
                                min-width="200">
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.isFocus">{{scope.row.nickName}}</span>
                                        <span v-if="!scope.row.isFocus" @click="handleEdit(scope.row)"><i class="el-icon-edit" style="font-size:18px;color:#409EFF;"></i></span>
                                        <span v-if="scope.row.isFocus==true" style="display: inline-block;">
                                            <input type="text" v-model="inputColumn" @blur='handleSave(scope.row)' style='width:110px;' class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入文件别名">
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="mediaSizeKb"
                                align='center'
                                label="文件大小"
                                min-width="80">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                align='center'
                                label="上传时间"
                                min-width="180">
                                </el-table-column>
                                <el-table-column
                                prop="username"
                                align='center'
                                label="上传者"
                                min-width="80">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="duration"
                                align='center'
                                label="审核者"
                                width="80">
                                </el-table-column> -->
                                <el-table-column
                                label="操作"
                                align='center'
                                min-width="140">
                                    <template slot-scope="scope">
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
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目管理模态框 -->
        <div class="modal fade" id="noticeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                                @row-click="clickRow3" 
                                ref="moviesTable3" 
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
                                label="宽(像素)"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="height"
                                align='center'
                                label="高(像素)"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                align='center'
                                label="创建时间"
                                width="322">
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                background
                                @size-change="sizechange2"
                                @current-change="currentchange2"
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
        <div class="modal fade" id="addprogram" style="width:1070px;"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:695px;overflow:auto;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="addprogramModalLabel">创建节目</h4>
                    </div>
                    <div class="modal-body" style="overflow:auto;">
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
                            <br>
                            <span><i>*</i>宽(像素):</span>
                            <el-input v-model="programDate.programWidth" size='small' style="width:146px" placeholder="请输入宽"></el-input>
                            <span style="margin-left:5px;"><i>*</i>高(像素):</span>
                            <el-input v-model="programDate.programHeight" size='small' style="width:146px" placeholder="请输入高"></el-input>
                        </div>
                        <div class="el-upload__tip" v-if="programDate.setProgramType==true" style="text-align: center;">请谨慎设置节目宽高,须与屏幕宽高保持一致</div>
                        <div class="setProgram" v-if="programDate.setProgramType==false">
                            <div class="setProgram_left">
                                <div class="setProgram_div_top">
                                    <el-select v-model="setProgramValue" @change="setProgramChange" clearable size='small' style="width:80px;margin:2px 0 0 5px;">
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
                                        @row-click="clickRow4" 
                                        ref="moviesTable4" 
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        height='350'
                                        style="width: 100%;overflow:auto;max-height:85%;margin-bottom:10px;"
                                        @selection-change="leftMediaChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="文件名"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="mediaSizeKb"
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
                                    <el-button type="primary" @click="preview" size='small' style="margin:4px 0 0 15px;">预览</el-button>
                                </div>
                                <div class="setProgram_div_bottom">
                                    <el-table
                                        :data="filesSelected"
                                        @row-click="clickRow5" 
                                        ref="moviesTable5" 
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        height='370'
                                        style="width: 100%;overflow:auto;max-height:85%;margin-bottom:5px;"
                                        @selection-change="centerMediaChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        align='center'
                                        label="播放时长"
                                        min-width="80">
                                            <template slot-scope="scope">
                                                <el-input v-model=scope.row.duration  placeholder="请输入内容" size='mini'></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        label="文件名"
                                        align='center'
                                        min-width="120">
                                        </el-table-column>
                                    </el-table>
                                    <div>
                                        <el-checkbox v-model="programDate.checked">是否使用滚动文字</el-checkbox>
                                        <input v-model="programDate.text" type="text" class="form-control" id="fullName" placeholder="请输入滚动文字">
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
        <div class="modal fade" id="filesupload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" v-loading="filesuploadLoading" element-loading-text="文件上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">文件上传</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input style="margin-left: -50px;" type="file" ref="upload" @change="uploadChange">
                        </div>
                        <div class="form-group">
                            <label>文件别名:</label>
                            <input type="text" id="nickName" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入文件别名">
                        </div> 
                        <div class="el-upload__tip" style="text-align: center;font-size: 14px;">只能上传jpg/png/gif图片，MP4/MKV视频,且不超过50M</div>
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
                                    @row-click="clickRow6" 
                                    ref="moviesTable6"
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
                                    width="195">
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
                                    label="操作"
                                    align='center'
                                    width="176">
                                        <template slot-scope="scope">
                                            <el-button @click="previewS(scope.row)" type="primary" size='mini'>预览</el-button>
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
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 创建节目-点击预览 -->
        <div class="modal fade" id="myModal_preview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content previews_div_content">
                    <div class="modal-body previews_div_body">
                        <div id="previews_div" style='position:relative;border: 1px solid red;overflow: hidden;'>
                               
                        </div>
                    </div>
                    <div class="modal-footer" style="text-align: center;padding:5px;">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 节目设置-预览模态框 -->
        <div class="modal fade" id="programSetting_previewS" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog previewS_width" style="width:309px;">
                <div class="modal-content">
                    <div class="modal-body previewS_height  previews_div_body2" style="height:409px;overflow: hidden;padding:0;marggin:0;">
                        <div id="previews_div2" style="position:relative;margin: 0 auto;">
                            
                        </div>
                    </div>
                    <div class="modal-footer" style="text-align: center;padding:5px;"> 
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <el-dialog
        title="节目下发进度"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        width="50"
        center>
        <span>
            <el-progress :percentage=percentage status="success"></el-progress>
            <span style="position: absolute;right: 10px;top: 76px;">{{percentage}}%</span>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'chargingPile',
    data () {
        return {
            inputColumn:'',
            serverurl:localStorage.serverurl,
            operation:false,
            programManagement:false,
            mediaLibrarys:false,
            // 屏幕
            tableData:[],
            tableSite1:[],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            pageSize:10,
            pageIndex:1,
            total:10,
            site:[],
            centerDialogVisible:false,
            percentage:0,
            serialNumber:'',
            options:[
                {
                    value:0,
                    label:'关闭'
                },
                {
                    value:1,
                    label:'开启'
                }
            ],
            value:'',
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
                // {
                //     value:0,
                //     label:'未审核'
                // },
                {
                    value:1,
                    label:'审核通过'
                },
                // {
                //     value:2,
                //     label:'审核未通过'
                // }
            ],
            stateValue:1,
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
                checked:false, //是否使用滚动文字
                text:'',//滚动文字内容
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
                    label:'图片'
                },
                {
                    value:1,
                    label:'视频'
                }
            ],
            setProgramValue:'',
            timer2:null,
        }
    },
    mounted(){
        
    },
    methods:{
        formatRole:function(val, column, cellValue, index){
            if(cellValue == null||cellValue == undefined||cellValue == ''){
                return '----'
            }else{
                return cellValue
            }
        },
        clickRow(row){
            this.$refs.moviesTable.toggleRowSelection(row)
        },
        clickRow2(row){
            this.$refs.mediartableData.toggleRowSelection(row)
        },
        clickRow3(row){
            this.$refs.moviesTable3.toggleRowSelection(row)
        },
        clickRow4(row){
            this.$refs.moviesTable4.toggleRowSelection(row)
        },
        clickRow5(row){
            this.$refs.moviesTable5.toggleRowSelection(row)
        },
        clickRow6(row){
            this.$refs.moviesTable6.toggleRowSelection(row)
        },
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
            if(val=='0'){//下发节目
                if(sessionStorage.projectId=='0'){
                    this.$message({
                        message: '此操作请选择具体项目!',
                        type: 'warning'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<this.tableSite1.length;i++){
                    arr.push(this.tableSite1[i].height/this.tableSite1[i].width)
                }
                for(var j=0;j<arr.length;j++){
                    if(arr[0]==arr[j]){

                    }else{
                        that.$message({
                            message: '所选屏幕宽高比例不一致,不能进行此操作!',
                            type: 'error'
                        });
                        return;
                    }
                }
                $('#programSetting').modal('show')
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/program/getProgramList',
                    data:{
                        page:that.noticeIndex,
                        rows:that.noticeSize,
                        programType:0,
                        nickName:'',
                        projectId:sessionStorage.projectId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.programSettingData = data.result.list
                            that.programSettingTotal = data.result.total
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
            if(val=='1'){
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/screen/setScreenOpen',
                    data:{
                       screenIds:arr.join(','),
                       controlType:true
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '屏幕开启成功!',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },3000)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                }) 
                // $.ajax({
                //     type:'post',
                //     async:true,
                //     dataType:'json',
                //     url:that.serverurl+'/screen/openScreen',
                //     data:{
                //        screenIds:arr.join(',')
                //     },
                //     success:function(data){
                //         if(data.errorCode=='0'){
                //             that.$message({
                //                 message: '屏幕开启成功!',
                //                 type: 'success'
                //             });
                //             setTimeout(function(){
                //                 that.ready()
                //             },3000)
                //         }else{
                //             that.errorCode2(data.errorCode)
                //         }
                //     }
                // }) 
            }
            if(val=='2'){
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/screen/setScreenOpen',
                    data:{
                       screenIds:arr.join(','),
                       controlType:false,
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '屏幕关闭成功!',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },3000)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                }) 
                // $.ajax({
                //     type:'post',
                //     async:true,
                //     dataType:'json',
                //     url:that.serverurl+'/screen/shutScreen',
                //     data:{
                //        screenIds:arr.join(',')
                //     },
                //     success:function(data){
                //         if(data.errorCode=='0'){
                //             that.$message({
                //                 message: '屏幕关闭成功!',
                //                 type: 'success'
                //             });
                //             setTimeout(function(){
                //                 that.ready()
                //             },3000)
                //         }else{
                //             that.errorCode2(data.errorCode)
                //         }
                //     }
                // }) 
            }
        },
        //节目设置表格选择事件
        programSettingChange(val){
            this.programSettingSite = val
        },
        //发送节目
        sendMedia(){
            var that = this
            var arr = [];
            if(that.programSettingSite.length=='0'||that.programSettingSite.length>1){
                that.$message({
                    message: '请选择一个节目进行下发!',
                    type: 'error'
                });
                return;
            }
            var Proportion = that.programSettingSite[0].height/that.programSettingSite[0].width
            var Proportion2 = this.tableSite1[0].height/this.tableSite1[0].width
            if(Proportion==Proportion2){

            }else{
                that.$message({
                    message: '所选节目宽高比例与屏幕宽高比例不一致,不能下发!',
                    type: 'error'
                });
                return;
            }
            for(var i = 0;i<this.tableSite1.length;i++){
                arr.push(this.tableSite1[i].id)
            }
            var data = {
                "programId": that.programSettingSite[0].id,
            }
            data.screenIds = arr.join(',')
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/setProgramUpload',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '节目正在下发种请稍后!',
                            type: 'success'
                        });
                        setTimeout(function(){
                            $('#programSetting').modal('hide')
                            that.ready()
                        },2000)
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //节目设置预览
        previewS(val){
            var that = this;
            var val2 = val.width/val.height
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/program/getProgramDetailsList',
                data:{
                    programId:val.id
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.filesSelected = data.result.list
                        if(data.result.isAddText=='0'){
                            that.programDate.checked = false
                            that.programDate.text = ''
                        }
                        if(data.result.isAddText=='1'){
                            that.programDate.checked = true
                            that.programDate.text = data.result.textContent
                        }
                        $('#programSetting_previewS').modal('show')
                        clearInterval(animationMedia)
                        var width='';
                        var height='';
                        if(val2>1){
                            // 宽大于高 横屏
                            width=299;
                            height = 299/val2
                        }else{
                            // 竖屏
                            height=398;
                            width=398*val2
                        }
                        var ss = 0;
                        var htmls = ''
                        var length = that.filesSelected.length
                        var i = 0;
                        // previews
                        $('#previews_div2').css('width',width)
                        $('#previews_div2').css('height',height)
                        $('.previewS_width').css('width',width)
                        $('.previewS_height').css('height',height+32)
                        if(that.filesSelected.length<2){
                            if(that.filesSelected[0].type=='0'){ //0为图片
                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[0].mediaUrl+"'></div>"
                            }else{
                                htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[0].mediaUrl+"' autoplay></video></div>"
                            }
                            $('#previews_div2').append(htmls)
                        }else{
                            for(var s=0;s<that.filesSelected.length;s++){
                                htmls=''
                                if(that.filesSelected[s].type=='0'){
                                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><img style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[s].mediaUrl+"'></div>"
                                }else{
                                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><video id='video' style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[s].mediaUrl+"' loop></video></div>"
                                }
                                $('#previews_div2').append(htmls)
                            }
                            var media = $('#previews_div2');
                            for(var t=0;t<that.filesSelected.length;t++){
                                $('#previews_div2>div').eq(t).css('left',width * t +"px" )
                                // media[0].childNodes[t].style.left = width * t +"px"    
                            }
                            if(that.filesSelected[0].type=='1'){
                                media[0].childNodes[0].childNodes[0].play()
                            }
                            var animationMedia = setInterval(() => {
                                ss++
                                if(ss==that.filesSelected[i].duration||ss>that.filesSelected[i].duration){
                                    ss = 0;
                                    for(var t =0;t<that.filesSelected.length;t++){
                                        var widths = $('#previews_div2>div').eq(t).css('left')
                                        widths = widths.split('px')
                                        $('#previews_div2>div').eq(t).css('left',widths[0]-width+"px" )
                                        // media[0].childNodes[t].style.left = media[0].childNodes[t].offsetLeft-width+'px'
                                    }
                                    if(that.filesSelected[i].type=='1'){
                                        media[0].childNodes[i].childNodes[0].pause();
                                        media[0].childNodes[i].childNodes[0].currentTime=0;
                                    }
                                    i++
                                    if(i==length){
                                        i=0
                                        for(var t=0;t<that.filesSelected.length;t++){
                                            $('#previews_div2>div').eq(t).css('left',width * t +"px" )
                                            // media[0].childNodes[t].style.left = width * t +"px"    
                                        }
                                    }
                                    if(that.filesSelected[i].type=='1'){
                                        media[0].childNodes[i].childNodes[0].play()
                                    }
                                }
                            }, 1000);
                        }
                        if(that.programDate.checked==true){
                            var html = "<div id='RollTexts_a' style='position:relative;background:black;color:white;font-size:16px;text-align:center;height:30px;line-height:30px;overflow:hidden;white-space:nowrap;'></div>"
                            var div = "<div id='RollTexts' style='position:absolute;left:0;'>"+that.programDate.text+"</div>"
                            $('.previews_div_body2').append(html)
                            $('#RollTexts_a').append(div)
                            setTimeout(function(){
                                var rollWord = {
                                    container:document.getElementById("RollTexts"),
                                    content:document.getElementById("RollTexts"),
                                    _containerWidth:1,
                                    _contentWidth:1,
                                    _speed:1,
                                    setSpeed:function(opt){
                                        var This = this;
                                        This._speed = opt;
                                    },
                                    setContainerWidth:function(){
                                        var This = this;
                                        This._containerWidth = This.container.offsetWidth;
                                    },
                                    setContentWidth:function(){
                                        var This = this;
                                        This._contentWidth = This.content.offsetWidth;
                                        console.log(This.content.offsetWidth)
                                    },
                                    roll:function(){
                                        var This = this;
                                        This.content.style.left = 95 + "px";
                                        that.timer2 = setInterval(function(){This.move()},20);
                                        This.container.onmouseover = function(){
                                            clearInterval(that.timer2);
                                        };
                                        This.container.onmouseout = function(){
                                            that.timer2 = setInterval(function(){This.move()},20);
                                        };
                                    },
                                    move:function(){
                                        var This = this;
                                        if(parseInt(This.content.style.left)+This._contentWidth > 0)
                                        {
                                            This.content.style.left = parseInt(This.content.style.left)-This._speed + "px";
                                        }
                                        else
                                        {
                                            This.content.style.left = 95 + "px";
                                        }                 
                                    },
                                    init:function(opt){
                                        var This = this;
                                        var speed = opt.speed || 1;
                                        This.setSpeed(speed);
                                        This.setContainerWidth();
                                        This.setContentWidth();
                                        This.roll();
                                    }
                                }
                                rollWord.init({speed:1});  //数值越小，滚动速度越慢。
                            },500)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }

                    $('#programSetting_previewS').on('hide.bs.modal', function () {
                        clearInterval(animationMedia)
                        clearInterval(that.timer2)
                        $("#RollTexts_a").remove();
                        $('#previews_div2').html('')
                    })
                }
            })     
        },
        //表格change事件
        tableChange1(val){
            this.tableSite1 = val
        },
        // 节目管理
        notice(){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
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
                url:that.serverurl+'/program/getProgramList',
                data:{
                   page:that.noticeIndex,
                   rows:that.noticeSize,
                   programType:'',
                   nickName:'',
                   projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.noticetableData = data.result.list
                        that.noticeTotal = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        sizechange2(val){this.noticeSize = val;this.noticeready();},
        currentchange2(val){this.noticeIndex = val;this.noticeready();},
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
                that.programDate.checked = false
                that.programDate.text = ''
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
                that.$confirm('是否删除所选节目？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/program/deleteProgram',
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
                                that.errorCode2(data.errorCode)
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
            this.animationMediaType = 0
            this.filesSelected = []
            this.programDate.setProgramType = false
            this.mediaready()
            this.previewType = 0
            that.programDate.checked = false
            that.programDate.text = ''
            if(that.submitMeadioType=='1'){
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/program/getProgramDetailsList',
                    data:{
                        programId:that.noticeSite[0].id,
                        projectId:sessionStorage.projectId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.filesSelected = data.result.list
                            console.log(data.result.isAddText)
                            if(data.result.isAddText=='0'){
                                that.programDate.checked = false
                                that.programDate.text = ''
                            }
                            if(data.result.isAddText=='1'){
                                that.programDate.checked = true
                                that.programDate.text = data.result.textContent
                            }
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        //
        setProgramChange(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/media/getMediaList',
                data:{
                   page:that.mediaIndex,
                   rows:that.mediaSize,
                   audit:that.stateValue,
                   type:that.setProgramValue,
                   nickName:'',
                   projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediartableData = data.result.list
                        that.mediaTotal = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //左侧选中媒体文件change事件
        leftMediaChange(val){
            this.leftMediaSize = val
        },
        //左侧分页
        leftMediaSizechange(val){
            this.mediaSize = val
            this.setProgramChange()
        },
        leftMediaCurrentchange(val){
            this.mediaIndex = val
            this.setProgramChange()
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
            if(this.filesSelected.length>=10){
                this.$message({
                    message: '最多添加10个媒体文件!',
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
            if(type>4){
                this.$message({
                    message: '已选取媒体文件最多存在四个媒体视频文件',
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
            for(var i = 0;i<this.leftMediaSize.length;i++){
                this.filesSelected.push(this.leftMediaSize[i])
                this.filesSelected[this.filesSelected.length-1].mediaId = this.leftMediaSize[i].id
            }
        },
        //移动改变数据位置
        fluctuation(val){
            var vals = '';
            if(this.centerMediaSize.length==0||this.centerMediaSize.length>1){
                this.$message({
                    message: '请选择媒体文件进行改变位置操作',
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
            if(vals==0){
                if(val=='0'){
                    return;
                }
            }
            var tem1 = this.filesSelected[vals]
            var tem2 = this.filesSelected[vals+1]
            var tem3 = this.filesSelected[vals-1]
            this.filesSelected.splice(vals,1)
            if(val=='0'){
                this.filesSelected.splice(vals-1,0,tem1)
            }
            if(val=='1'){
                this.filesSelected.splice(vals+1,0,tem1)
            }
        },
        //删除已选择文件
        deleteMedia(){
            var vals = '';
            if(this.centerMediaSize.length==0){
                this.$message({
                    message: '请选择媒体文件进行删除!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i=0;i<this.centerMediaSize.length;i++){
                for(var j=0;j<this.filesSelected.length;j++){
                    if(this.centerMediaSize[i].mediaId==this.filesSelected[j].mediaId){
                        this.filesSelected.splice(j,1)
                    }
                }
            }
        },
        //点击预览生成html
        preview(vals){
            var that = this
            if(this.filesSelected.length==0){
                this.$message({
                    message: '请选择媒体文件!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.programDate.checked==true){
                if(that.programDate.text==''){
                    this.$message({
                        message: '请输入滚动文字!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }
            $('#myModal_preview').modal('show')
            var htmls = '';
            var width='';
            var height='';
            var val = this.programDate.programWidth/this.programDate.programHeight
            if(val>1){
                // 宽大于高 横屏
                width=299;
                height = 299/val
            }else{
                // 竖屏
                height=398;
                width=398*val
            }
            var length = this.filesSelected.length
            // previews
            $('#previews_div').css('width',width)
            $('#previews_div').css('height',height)
            $('.previews_div_body').css('width',width+32)
            $('.previews_div_content').css('width',width+32)
            if(this.filesSelected.length<2){
                if(this.filesSelected[0].type=='0'){ //0为图片
                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><img style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[0].mediaUrl+"'></div>"
                }else{
                    htmls = "<div id='previews_div_div' style='width:100%;height:100%;'><video style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[0].mediaUrl+"' autoplay></video></div>"
                }
                $('#previews_div').append(htmls)
            }else{
                var media = $('#previews_div');
                    for(var s=0;s<this.filesSelected.length;s++){
                        htmls=''
                        if(this.filesSelected[s].type=='0'){
                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><img style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[s].mediaUrl+"'></div>"
                        }else{
                            htmls = "<div id='previews_div_div' style='width:100%;height:100%;position:absolute;'><video id='video' style='width:100%;height:100%;' src='"+that.serverurl+that.filesSelected[s].mediaUrl+"' loop></video></div>"
                        }
                        $('#previews_div').append(htmls)
                    }
                    if(this.filesSelected[0].type=='1'){
                        media[0].childNodes[0].childNodes[0].play()
                    }
                for(var t=0;t<this.filesSelected.length;t++){
                    $('#previews_div>div').eq(t).css('left',width * t +"px" )
                    // media[0].childNodes[t].style.left = width * t +"px"    
                }
                var ss = 0;
                var i = 0;
                var animationMedia = window.setInterval(() => {
                    ss++
                    if(ss==this.filesSelected[i].duration||ss>this.filesSelected[i].duration){
                        ss = 0;
                        for(var t =0;t<this.filesSelected.length;t++){
                            var widths = $('#previews_div>div').eq(t).css('left')
                            widths = widths.split('px')
                            $('#previews_div>div').eq(t).css('left',widths[0]-width+"px" )
                            // media[0].childNodes[t].style.left = media[0].childNodes[t].offsetLeft-width+'px'
                        }
                        if(this.filesSelected[i].type=='1'){
                            media[0].childNodes[i].childNodes[0].pause();
                            media[0].childNodes[i].childNodes[0].currentTime=0;
                        }
                        i++
                        if(i==length){
                            i=0
                            for(var t=0;t<this.filesSelected.length;t++){
                                $('#previews_div>div').eq(t).css('left',width * t +"px" )
                                // media[0].childNodes[t].style.left = width * t +"px"    
                            }
                        }
                        if(this.filesSelected[i].type=='1'){
                            media[0].childNodes[i].childNodes[0].play()
                        }
                    }
                }, 1000);
            }
            if(that.programDate.checked==true){
                // var html = "<div id='RollText' style='background:black;color:white;font-size:14px;text-align:center;line-height:30px;overflow:hidden;white-space:nowrap;'>"+that.programDate.text+"</div>"
                // $('.previews_div_body').append(html)
                // $('#RollText').css('width',width)
                // $('#RollText').css('height','30px')
                // var obj = document.getElementById("RollText");
                // var timer = setInterval(function(){
                //      var tmp=(obj.scrollLeft)++;
                //     if(obj.scrollLeft==tmp){
                //         obj.innerHTML += obj.innerHTML;
                //     }
                //     if(obj.scrollLeft>=obj.firstChild.offsetWidth){
                //         obj.scrollLeft=0;
                //     }
                // },50)
                var html = "<div id='RollTexts_a' style='position:relative;background:black;color:white;font-size:16px;text-align:center;height:30px;line-height:30px;overflow:hidden;white-space:nowrap;'></div>"
                var div = "<div id='RollTexts' style='position:absolute;left:0;'>"+that.programDate.text+"</div>"
                $('.previews_div_body').append(html)
                $('#RollTexts_a').append(div)
                setTimeout(function(){
                    var rollWord = {
                        container:document.getElementById("RollTexts"),
                        content:document.getElementById("RollTexts"),
                        _containerWidth:1,
                        _contentWidth:1,
                        _speed:1,
                        setSpeed:function(opt){
                            var This = this;
                            This._speed = opt;
                        },
                        setContainerWidth:function(){
                            var This = this;
                            This._containerWidth = This.container.offsetWidth;
                        },
                        setContentWidth:function(){
                            var This = this;
                            This._contentWidth = This.content.offsetWidth;
                            console.log(This.content.offsetWidth)
                        },
                        roll:function(){
                            var This = this;
                            This.content.style.left = 95 + "px";
                            that.timer2 = setInterval(function(){This.move()},20);
                            This.container.onmouseover = function(){
                                clearInterval(that.timer2);
                            };
                            This.container.onmouseout = function(){
                                that.timer2 = setInterval(function(){This.move()},20);
                            };
                        },
                        move:function(){
                            var This = this;
                            if(parseInt(This.content.style.left)+This._contentWidth > 0)
                            {
                                This.content.style.left = parseInt(This.content.style.left)-This._speed + "px";
                            }
                            else
                            {
                                This.content.style.left = 95 + "px";
                            }                 
                        },
                        init:function(opt){
                            var This = this;
                            var speed = opt.speed || 1;
                            This.setSpeed(speed);
                            This.setContainerWidth();
                            This.setContentWidth();
                            This.roll();
                        }
                    }
                    rollWord.init({speed:1});  //数值越小，滚动速度越慢。
                },500)
                
            }
            $('#myModal_preview').on('hide.bs.modal', function () {
                clearInterval(animationMedia)
                clearInterval(that.timer2)
                $("#RollTexts_a").remove();
                $('#previews_div').html('')
            })
        },
        //节目管理保存
        mediaSave(){
            var that = this;
            var url = '';
            var data = {};
            var array = []; //已选中节目的名称,以及播放时间
            var programDetails = [];
            data.nickName = that.programDate.programName
            data.programType = that.programDate.programValue
            data.width = that.programDate.programWidth
            data.height = that.programDate.programHeight
            for(var i=0;i<that.filesSelected.length;i++){
                var object = {}
                var object2 = {}
                object.nickName = that.filesSelected[i].nickName 
                object.duration = that.filesSelected[i].duration
                object.type = that.filesSelected[i].type
                if(that.filesSelected[i].duration==''||that.filesSelected[i].duration==undefined){
                    object2.duration = 10
                }else{
                    object2.duration = that.filesSelected[i].duration
                }
                object2.sort = i
                object.sort = i
                if(that.submitMeadioType=='0'){
                    object.mediaId = that.filesSelected[i].id
                    object2.mediaId = that.filesSelected[i].id
                }
                if(that.submitMeadioType=='1'){
                    object.mediaId = that.filesSelected[i].mediaId
                    object2.mediaId = that.filesSelected[i].mediaId
                }
                object.mediaName = that.filesSelected[i].mediaName
                object.mediaUrl = that.filesSelected[i].mediaUrl
                array.push(object)
                programDetails.push(object2)
            }
            if(that.programDate.checked==false){
                data.isAddText = 0
            }else{
                data.isAddText = 1
                data.textContent = that.programDate.text
            }
            data.programDetails = programDetails
            if(that.submitMeadioType=='0'){
                url = '/program/addProgram'
            }
            if(that.submitMeadioType=='1'){
                url = '/program/updateProgram'
                data.id = this.noticeSite[0].id
            }
            data.projectId=sessionStorage.projectId
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
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
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //媒体库
        mediaLibrary(){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            $('#mediaLibraryModal').modal('show')
            this.mediaready()
            /* 完成拖拽 */
            $('#mediaLibraryModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#mediaLibraryModal').css("overflow", "hidden")
        },
        typeChange(){
            this.mediaready()
        },
        //媒体库列表获取
        mediaready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/media/getMediaList',
                data:{
                   page:that.mediaIndex,
                   rows:that.mediaSize,
                   audit:that.stateValue,
                   type:that.typeValue,
                   nickName:'',
                   projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediartableData = data.result.list
                        that.mediaTotal = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //修改媒体别名
        handleEdit(val){
            for(var i=0;i<this.mediartableData.length;i++){
                if(this.mediartableData[i].id==val.id){
                    this.mediartableData[i].isFocus = true
                }
            }
            this.inputColumn = val.nickName
        },
        handleSave(val){
            var that =this
            if(this.inputColumn==''){
                this.$message({
                    message: '文件别名不能为空!',
                    type: 'warning'
                });
                return;  
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/media/editMediaName',
                // contentType:'application/json;charset=UTF-8',
                data:{
                    mediaId:val.id,
                    projectId:sessionStorage.projectId,
                    nickName:that.inputColumn
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        that.mediaready()
                    }else{
                        that.errorCode2(data.errorCode)
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
            that.$confirm('是否删除所选媒体？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/media/deleteMoreMedia',
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
                            that.errorCode2(data.errorCode)
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
            var type = '';
            var value = this.$refs.upload.files[0].type.split('/')
            var that= this;
            var formdate = new FormData();
            formdate.append("file", this.$refs.upload.files[0]);
            formdate.append('nickName',$('#nickName').val())
            formdate.append('creatorId',1)
            console.log(value)
            if(value[0]=='video'){
                type='1'
                if(value[1]=='mp4'||value[1]=='mkv'||value[1]=='MP4'||value[1]=='MKV'){
                    
                }else{
                    that.$message({
                        message: '不支持的文件格式!',
                        type:'success',
                        showClose: true,
                    });
                    return;
                }
            }else if(value[0]=='image'){
                type='0'
            }else{
                that.$message({
                    message: '不支持的文件格式!',
                    type:'success',
                    showClose: true,
                });
                return;
            }
            formdate.append('type ',type)
            formdate.append('projectId ',sessionStorage.projectId)
            that.filesuploadLoading = true
            $.ajax({
                url:that.serverurl+'/media/addMedia',
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
                    that.errorCode2(res.errorCode)
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
            window.open(that.serverurl+"/file/download?fileName="+that.serverurl+url)
        },
        //获取广告屏列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/getScreenList',
                data:{
                   page:that.pageIndex,
                   rows:that.pageSize,
                   status:that.value,
                   serialNumber:that.serialNumber,
                   poleId:'',
                   projectId:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
        search(){
            this.ready()
        },
        //获取节目下发进度
        status(val){
            var that = this
            this.centerDialogVisible = true
            that.percentage = 0
            var s = 0
            var clearstatus = setInterval(function(){
                if(s==0){
                    s++
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        url:that.serverurl+'/screen/getDownLoadProgress',
                        contentType:'application/json;charset=UTF-8',
                        data:{
                            // programId:that.programSettingSite[0].id,
                            serialNumber:val.serialNumber,
                            // projectId:sessionStorage.projectId
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                s=0
                                if(Number(data.result.num)*100==100||Number(data.result.num)*100>100){
                                    that.ready()
                                    clearInterval(clearstatus)
                                }
                                that.percentage = Number(data.result.num*100).toFixed(1)
                            }else{
                                s=0
                                clearInterval(clearstatus)
                                that.centerDialogVisible = false
                                that.errorCode2(data.errorCode)
                                that.ready()
                            }
                        }
                    })
                }
            },2000)
            $('#myModal_preview').on('hide.bs.modal', function () {
                clearInterval(clearstatus) 
            })
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
                serialNumber:this.tableSite1[0].serialNumber,
                projectId:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/downloadJsToSD',
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
                        that.errorCode2(data.errorCode)
                    }
                } 
            })
        },
        //权限请求
        Jurisdiction(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/privilege/getMyOperatMenu',
                contentType:'application/json;charset=UTF-8',
                data:{
                    menuId:sessionStorage.menuId3
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        for(var i = 0;i<data.result.operats.length;i++){
                            if(data.result.operats[i].code=='operation'){
                                that.operation = true
                            }
                            if(data.result.operats[i].code=='programManagement'){
                                that.programManagement = true
                            }
                            if(data.result.operats[i].code=='mediaLibrary'){
                                that.mediaLibrarys = true
                            }
                        }
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
        this.Jurisdiction()
    }
}
</script>
<style scoped>
.setPercentage i{color: red;}
.advertisingScreens{width: 100%;height: 100%;overflow:auto;}
.advertisingScreens>div{width: 100%;position: absolute;overflow:auto;}
.advertisingScreens_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;align-items: center;font-size: 16px;padding-left: 20px;}
.advertisingScreens_bottom{top: 46px;border: 1px solid #E4E4F1;bottom: 0;padding: 5px;overflow:auto;}
.advertisingScreens_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.advertisingScreens_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}
.table_button{height: 20px;padding: 5px;}
.notice_bottom{margin-top: 10px;}
.setPercentage{width: 100%;text-align: center;}
.setPercentage>span{font-size: 15px;line-height: 35px;}
.setPercentage>p{font-size: 12px;color: #606266;margin-top: 7px;}
.mediaLibrary_top,{width: 100%;height: 35px;}
.mediaLibrary_top>span,{font-size: 15px;line-height: 35px;}
.mediaLibrary_top>span:nth-of-type(2){margin-left: 30px;}
.mediaLibrary_bottom{width: 100%;height: auto;margin-top:5px;}
.setProgram{width: 100%;display: flex;height: 450px;overflow: auto;}
.setProgram>div{width:320px;border: 1px solid #e5e5e5;border-radius: 5px;position: relative;overflow: auto;}
.setProgram_left{}
.setProgram_center{margin-left: 5%;}
.setProgram_div_top{width: 100%;height: 40px;line-height: 35px;border-bottom: 1px solid #e5e5e5;}
.setProgram_div_bottom{position: absolute;top:40px;bottom: 0;left: 0;right: 0;padding: 5px;}
.positionTop{position: absolute;top: 0;left:0;right: 0;width: 100%;height:50px;background: red;}
.programSetting{width: 100%;height: 340px;position: relative;}
.programSetting_top{width: 100%;height: 40px;line-height: 38px;}
.programSetting_bottom{width: 100%;position: absolute;top:45px;bottom: 0;height: auto;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}

.search{display: flex;}
.search>label{width: 85px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>