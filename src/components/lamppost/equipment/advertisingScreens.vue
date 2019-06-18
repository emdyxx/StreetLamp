<template>
    <!--广告屏 -->
    <div class="advertisingScreens">
        <div class="advertisingScreens_top">
            <el-dropdown trigger='click' @command="handleCommand">
                <el-button type="primary" size='small' style="width:125px;">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0">下发任务</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="1">屏幕开关</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="2">屏幕调光</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="3">屏幕音量</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="4">屏幕截图</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="5">屏幕重启</el-dropdown-item>
                    <el-dropdown-item v-if="operation" command="6">状态查询</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="viewProgram" type="primary" size='small' @click="notice" style="width:125px;margin-left:25px;">节目管理</el-button>
            <el-button v-if="viewMedia" type="primary" size='small' @click="mediaLibrary" style="width:125px;margin-left:25px;">媒体库</el-button>
            <el-button v-if="viewTask" @click="taskManagement" type="primary" size='small' style="width:125px;margin-left:25px;">任务管理</el-button>
            <el-button @click="update" type="primary" size='small' style="width:125px;margin-left:25px;">在线更新</el-button>
        </div>
        <div class="advertisingScreens_bottom">
            <div class="advertisingScreens_bottom_top">
                <div class="search">
                    <label>序列号:</label>
                    <input type="text" v-model="serialNumber" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入屏幕序列号">
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
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="序列号"
                    :formatter="formatRole"
                    min-width="125">
                    </el-table-column>
                    <el-table-column
                    prop="width"
                    align='center'
                    label="宽度(像素)"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="height"
                    align='center'
                    label="高度(像素)"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="屏幕状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status=='0'">关闭</span>
                            <span v-if="scope.row.status=='1'">开启</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="在线状态"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.online=='0'">离线</span>
                            <span v-if="scope.row.online=='1'">在线</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="taskName"
                    align='center'
                    label="当前播放任务"
                    :formatter="formatRole"
                    min-width="110">
                    </el-table-column>
                    <el-table-column
                    prop="brightness"
                    align='center'
                    label="亮度"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="volume"
                    align='center'
                    label="音量"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="versionName"
                    align='center'
                    label="版本号"
                    :formatter="formatRole"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="timestamp"
                    align='center'
                    label="采集时间"
                    :formatter="formatRole"
                    min-width="120">
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
                            <el-button v-if="addMedia" @click="upload" type="primary" size='small' style="margin-left:30px;">上传</el-button>
                            <el-button v-if="delMedia" @click="mediaDelete" type="primary" size='small'>删除</el-button>
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
                                height='350'
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
                                        <span>{{scope.row.nickName}}</span>
                                        <span v-if="editMedia=true" @click="handleEdit(scope.row)"><i class="el-icon-edit" style="font-size:18px;color:#409EFF;"></i></span>
                                        <span v-if="scope.row.isFocus==true" style="display: inline-block;">
                                            <input type="text" v-model="inputColumn" @blur='handleSave(scope.row)' style='width:110px;' class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入文件别名">
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="mediaSize"
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
                                prop="createUser"
                                align='center'
                                label="上传者"
                                min-width="80">
                                </el-table-column>
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
                            <input type="text" id="nickName" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入文件别名">
                        </div> 
                        <div class="el-upload__tip" style="text-align: center;font-size: 14px;">只能上传jpg/png/gif图片，MP4/3GP视频,且不超过50M</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="uploadSubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 下发任务 -->
        <div class="modal fade" id="taskMyModal0" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">下发任务</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tasktableData" 
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;margin-top:10px;"
                            @selection-change="tasktableChange">
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
                            prop="createTime"
                            label="创建时间"
                            align='center'
                            :formatter="formatRole"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="tasksizechange"
                            @current-change="taskcurrentchange"
                            :current-page="taskpageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="taskpageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tasktotal">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="LowerHair" type="button" class="btn btn-primary">下发</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 屏幕开关 -->
        <div class="modal fade" id="switchModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">屏幕开关</h4>
                    </div>
                    <div class="modal-body">
                        <el-tabs v-model="switchType" type="card" @tab-click="switchClick">
                            <el-tab-pane label="手动" name="0">
                                <el-button @click="switchs(0)" type="primary" size='small'>开启屏幕</el-button>
                                <el-button @click="switchs(1)" type="primary" size='small'>关闭屏幕</el-button>
                            </el-tab-pane>
                            <el-tab-pane label="定时" name="1">
                                <el-button @click="switchOperation(0)" type="primary" size='small'>添加</el-button>
                                <el-button @click="switchOperation(1)" type="primary" size='small'>编辑</el-button>
                                <el-button @click="switchOperation(2)" type="primary" size='small'>删除</el-button>
                                <el-button @click="switchOperation(3)" type="primary" size='small'>发送</el-button>
                                <el-button @click="switchOperation(4)" type="primary" size='small'>清除定时信息</el-button>
                                <div v-if="addType=='0'||addType=='1'" style="width:100%;height:auto;margin-top:10px">
                                    <div>
                                        <span>定时名称:</span>
                                        <el-input v-model="switchData.name" placeholder="请输入定时名称称" size='small' oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" style="width:156px;"></el-input>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="switchData.radio0">
                                            <el-radio :label="0">永久</el-radio>
                                            <el-radio :label="1">指定日期</el-radio>
                                        </el-radio-group>
                                        <div v-if="switchData.radio0=='1'">
                                            <el-date-picker
                                                v-model="switchData.value1"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="开始日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                            <el-date-picker
                                                v-model="switchData.value2"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="结束日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="switchData.radio1">
                                            <el-radio :label="0">全天</el-radio>
                                            <el-radio :label="1">指定时间</el-radio>
                                        </el-radio-group>
                                        <div v-if="switchData.radio1=='1'">
                                            <el-time-picker
                                                v-model="switchData.value3"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="开始时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                            <el-time-picker
                                                v-model="switchData.value4"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="结束时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="switchData.radio2">
                                            <el-radio :label="0">无指定</el-radio>
                                            <el-radio :label="1">指定星期</el-radio>
                                        </el-radio-group>
                                        <div v-if="switchData.radio2=='1'">
                                            <el-checkbox-group v-model="switchData.checkList">
                                                <el-checkbox :label="1">周一</el-checkbox>
                                                <el-checkbox :label="2">周二</el-checkbox>
                                                <el-checkbox :label="3">周三</el-checkbox>
                                                <el-checkbox :label="4">周四</el-checkbox>
                                                <el-checkbox :label="5">周五</el-checkbox>
                                                <el-checkbox :label="6">周六</el-checkbox>
                                                <el-checkbox :label="7">周日</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-button @click="switchSubmit" type="primary" size='small'>保存</el-button>
                                        <el-button @click="switchOperation(5)" type="primary" size='small'>关闭</el-button>
                                    </div>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-table
                                        :data="switchdata"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
                                        @selection-change="switchtableChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="定时名称"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startDate"
                                        align='center'
                                        label="开始日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endDate"
                                        align='center'
                                        label="结束日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startTime"
                                        align='center'
                                        label="开始时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endTime"
                                        align='center'
                                        label="结束时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="filterValue"
                                        align='center'
                                        label="星期"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="查询" name="2">
                                <template v-for="item in searchData">
                                    <div :key="item.key">
                                        <span>屏幕序列号:{{item.screenSerialNumber}}</span>
                                        <span style="margin-left:20px;">时间:{{item.timestamp}}</span>     
                                    </div>
                                    <div :key="item.key">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>日期范围</th>
                                                    <th>时间范围</th>
                                                    <th>指定星期</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item2 in item.schedules" :key="item2.key">
                                                    <td>{{item2.startDate}}--{{item2.endDate}}</td>
                                                    <td>{{item2.startTime}}--{{item2.endTime}}</td>
                                                    <td>{{item2.filterValue}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 屏幕调光 -->
        <div class="modal fade" id="DimmingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">屏幕调光</h4>
                    </div>
                    <div class="modal-body">
                        <el-tabs v-model="DimmingType" type="card" @tab-click="DimmingClick">
                            <el-tab-pane label="手动" name="0">
                                <el-input-number v-model="brightness" :min="1" :max="64" size='small' label="屏幕亮度"></el-input-number>
                                <el-button @click="DimmingSubmit" type="primary" size='small'>发送</el-button>
                                <p>提示:1（最暗）~ 64（最亮）</p>
                            </el-tab-pane>
                            <el-tab-pane label="定时" name="1">
                                <el-button @click="DimmingOperation(0)" type="primary" size='small'>添加</el-button>
                                <el-button @click="DimmingOperation(1)" type="primary" size='small'>编辑</el-button>
                                <el-button @click="DimmingOperation(2)" type="primary" size='small'>删除</el-button>
                                <el-button @click="DimmingOperation(3)" type="primary" size='small'>发送</el-button>
                                <el-button @click="DimmingOperation(4)" type="primary" size='small'>清除定时信息</el-button>
                                <div v-if="addType=='0'||addType=='1'" style="width:100%;height:auto;margin-top:10px">
                                    <div>
                                        <span>定时名称:</span>
                                        <el-input v-model="DimmingDatas.DimmingName" placeholder="请输入定时名称" size='small' style="width:156px;"></el-input>
                                        <span style="margin-left:20px;">默认亮度:</span>
                                        <el-input-number v-model="DimmingDatas.defaultBrightness" :min="1" :max="64" size='small' label="默认亮度"></el-input-number>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="DimmingDatas.radio0">
                                            <el-radio :label="0">永久</el-radio>
                                            <el-radio :label="1">指定日期</el-radio>
                                        </el-radio-group>
                                        <div v-if="DimmingDatas.radio0=='1'">
                                            <el-date-picker
                                                v-model="DimmingDatas.value1"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="开始日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                            <el-date-picker
                                                v-model="DimmingDatas.value2"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="结束日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="DimmingDatas.radio1">
                                            <el-radio :label="0">全天</el-radio>
                                            <el-radio :label="1">指定时间</el-radio>
                                        </el-radio-group>
                                        <div v-if="DimmingDatas.radio1=='1'">
                                            <el-time-picker
                                                v-model="DimmingDatas.value3"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="开始时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                            <el-time-picker
                                                v-model="DimmingDatas.value4"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="结束时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="DimmingDatas.radio2">
                                            <el-radio :label="0">无指定</el-radio>
                                            <el-radio :label="1">指定星期</el-radio>
                                        </el-radio-group>
                                        <div v-if="DimmingDatas.radio2=='1'" style="margin-left:10px;">
                                            <el-checkbox-group v-model="DimmingDatas.checkList">
                                                <el-checkbox :label="1">周一</el-checkbox>
                                                <el-checkbox :label="2">周二</el-checkbox>
                                                <el-checkbox :label="3">周三</el-checkbox>
                                                <el-checkbox :label="4">周四</el-checkbox>
                                                <el-checkbox :label="5">周五</el-checkbox>
                                                <el-checkbox :label="6">周六</el-checkbox>
                                                <el-checkbox :label="7">周日</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                    <div>
                                        <span style="margin-left:20px;">屏幕亮度:</span>
                                        <el-input-number v-model="DimmingDatas.brightness2" :min="1" :max="64" size='small' label="屏幕亮度"></el-input-number>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-button @click="DimmingSubmit2" type="primary" size='small'>保存</el-button>
                                        <el-button @click="DimmingOperation(5)" type="primary" size='small'>关闭</el-button>
                                    </div>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-table
                                        :data="Dimmingdata"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
                                        @selection-change="DimmingtableChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="定时名称"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startDate"
                                        align='center'
                                        label="开始日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endDate"
                                        align='center'
                                        label="结束日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startTime"
                                        align='center'
                                        label="开始时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endTime"
                                        align='center'
                                        label="结束时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="filterValue"
                                        align='center'
                                        label="星期"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="brightness"
                                        align='center'
                                        label="亮度"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="查询" name="2">
                                <template v-for="item in searchData">
                                    <div :key="item.key">
                                        <span>屏幕序列号:{{item.screenSerialNumber}}</span>
                                        <span style="margin-left:20px;">时间:{{item.timestamp}}</span>     
                                    </div>
                                    <div :key="item.key">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>日期范围</th>
                                                    <th>时间范围</th>
                                                    <th>指定星期</th>
                                                    <th>亮度</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item2 in item.schedules" :key="item2.key">
                                                    <td>{{item2.startDate}}--{{item2.endDate}}</td>
                                                    <td>{{item2.startTime}}--{{item2.endTime}}</td>
                                                    <td>{{item2.filterValue}}</td>
                                                    <td>{{item2.brightness}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 屏幕音量 -->
        <div class="modal fade" id="volumeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">屏幕音量</h4>
                    </div>
                    <div class="modal-body">
                        <el-tabs v-model="volumeType" type="card" @tab-click="volumeClick">
                            <el-tab-pane label="手动" name="0">
                                <el-input-number v-model="volume" :min="0" :max="15" size='small' label="屏幕音量"></el-input-number>
                                <el-button @click="volumeSubmit" type="primary" size='small'>发送</el-button>
                                <p>提示:0（最小）~ 15(最大)</p>
                            </el-tab-pane>
                            <el-tab-pane label="定时" name="1">
                                <el-button @click="volumeOperation(0)" type="primary" size='small'>添加</el-button>
                                <el-button @click="volumeOperation(1)" type="primary" size='small'>编辑</el-button>
                                <el-button @click="volumeOperation(2)" type="primary" size='small'>删除</el-button>
                                <el-button @click="volumeOperation(3)" type="primary" size='small'>发送</el-button>
                                <el-button @click="volumeOperation(4)" type="primary" size='small'>清除定时信息</el-button>
                                <div v-if="addType=='0'||addType=='1'" style="width:100%;height:auto;margin-top:10px">
                                    <div>
                                        <span>定时名称:</span>
                                        <el-input v-model="volumeDatas.volumeName" placeholder="请输入定时名称" size='small' style="width:156px;"></el-input>
                                        <span style="margin-left:20px;">默认音量:</span>
                                        <el-input-number v-model="volumeDatas.defaultVolume" :min="0" :max="15" size='small' label="默认音量"></el-input-number>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="volumeDatas.radio0">
                                            <el-radio :label="0">永久</el-radio>
                                            <el-radio :label="1">指定日期</el-radio>
                                        </el-radio-group>
                                        <div v-if="volumeDatas.radio0=='1'">
                                            <el-date-picker
                                                v-model="volumeDatas.value1"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="开始日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                            <el-date-picker
                                                v-model="volumeDatas.value2"
                                                type="date"
                                                size='small'
                                                value-format='yyyy-MM-dd'
                                                placeholder="结束日期"
                                                style="width:126px;margin-left:10px;">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="volumeDatas.radio1">
                                            <el-radio :label="0">全天</el-radio>
                                            <el-radio :label="1">指定时间</el-radio>
                                        </el-radio-group>
                                        <div v-if="volumeDatas.radio1=='1'">
                                            <el-time-picker
                                                v-model="volumeDatas.value3"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="开始时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                            <el-time-picker
                                                v-model="volumeDatas.value4"
                                                value-format='HH:mm'
                                                size='small'
                                                placeholder="结束时间"
                                                style="width:126px;margin-left:10px;">
                                            </el-time-picker>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-radio-group v-model="volumeDatas.radio2">
                                            <el-radio :label="0">无指定</el-radio>
                                            <el-radio :label="1">指定星期</el-radio>
                                        </el-radio-group>
                                        <div v-if="volumeDatas.radio2=='1'" style="margin-left:10px;">
                                            <el-checkbox-group v-model="volumeDatas.checkList">
                                                <el-checkbox :label="1">周一</el-checkbox>
                                                <el-checkbox :label="2">周二</el-checkbox>
                                                <el-checkbox :label="3">周三</el-checkbox>
                                                <el-checkbox :label="4">周四</el-checkbox>
                                                <el-checkbox :label="5">周五</el-checkbox>
                                                <el-checkbox :label="6">周六</el-checkbox>
                                                <el-checkbox :label="7">周日</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                    <div>
                                        <span style="margin-left:20px;">屏幕音量:</span>
                                        <el-input-number v-model="volumeDatas.volume" :min="0" :max="15" size='small' label="屏幕音量"></el-input-number>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-button @click="volumeSubmit2" type="primary" size='small'>保存</el-button>
                                        <el-button @click="volumeOperation(5)" type="primary" size='small'>关闭</el-button>
                                    </div>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-table
                                        :data="volumedata"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
                                        @selection-change="volumetableChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="定时名称"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startDate"
                                        align='center'
                                        label="开始日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endDate"
                                        align='center'
                                        label="结束日期"
                                        min-width="85">
                                        </el-table-column>
                                        <el-table-column
                                        prop="startTime"
                                        align='center'
                                        label="开始时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="endTime"
                                        align='center'
                                        label="结束时间"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="filterValue"
                                        align='center'
                                        label="星期"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="volume"
                                        align='center'
                                        label="音量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="查询" name="2">
                                <template v-for="item in searchData">
                                    <div :key="item.key">
                                        <span>屏幕序列号:{{item.screenSerialNumber}}</span>
                                        <span style="margin-left:20px;">时间:{{item.timestamp}}</span>     
                                    </div>
                                    <div :key="item.key">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>日期范围</th>
                                                    <th>时间范围</th>
                                                    <th>指定星期</th>
                                                    <th>音量</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item2 in item.schedules" :key="item2.key">
                                                    <td>{{item2.startDate}}--{{item2.endDate}}</td>
                                                    <td>{{item2.startTime}}--{{item2.endTime}}</td>
                                                    <td>{{item2.filterValue}}</td>
                                                    <td>{{item2.volume}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 屏幕截图 -->
        <div class="modal fade" id="screenshotMyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">屏幕截图</h4>
                    </div>
                    <div class="modal-body" v-loading="loading"
                    element-loading-text="正在获取截屏信息"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)" style="min-height:80px;">
                        <template v-for="item in screenshotData">
                            <div :key="item.key">
                                <span>屏幕序列号:{{item.screenSerialNumber}}</span>
                                <span style="margin-left:20px;">时间:{{item.timestamp}}</span>     
                            </div>
                            <div :key="item.key">
                                <img :src=item.screenshotMsg class="imgClass" style="width:100%;" alt="">
                            </div>
                        </template>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 屏幕重启 -->
        <div class="modal fade" id="restartMyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">屏幕重启</h4>
                    </div>
                    <div class="modal-body">
                        <el-tabs v-model="restartType" type="card" @tab-click="restartClick">
                            <el-tab-pane label="手动" name="0">
                                <el-button @click="restart(0)" size='small' type="primary">重启</el-button>
                            </el-tab-pane>
                            <el-tab-pane label="定时" name="1">
                                <el-button @click="restartOperation(0)" type="primary" size='small'>添加</el-button>
                                <el-button @click="restartOperation(1)" type="primary" size='small'>编辑</el-button>
                                <el-button @click="restartOperation(2)" type="primary" size='small'>删除</el-button>
                                <el-button @click="restartOperation(3)" type="primary" size='small'>发送</el-button>
                                <el-button @click="restartOperation(4)" type="primary" size='small'>清除定时信息</el-button>
                                <div v-if="addType=='0'||addType=='1'" style="width:100%;height:auto;margin-top:10px">
                                    <div>
                                        <span>定时名称:</span>
                                        <el-input v-model="restartName" placeholder="请输入定时名称" size='small' style="width:156px;"></el-input>
                                        <span style="margin-left:20px;">重启时间:</span>
                                        <el-time-picker
                                            v-model="rebootTime"
                                            value-format='HH:mm'
                                            size='small'
                                            placeholder="重启时间"
                                            style="width:126px;margin-left:10px;">
                                        </el-time-picker>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-button @click="restartSubmit" type="primary" size='small'>保存</el-button>
                                        <el-button @click="restartOperation(5)" type="primary" size='small'>关闭</el-button>
                                    </div>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-table
                                        :data="restartdata"
                                        border
                                        stripe
                                        size='small'
                                        tooltip-effect="dark"
                                        style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;"
                                        @selection-change="restarttableChange">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickName"
                                        align='center'
                                        label="定时名称"
                                        min-width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="rebootTime"
                                        align='center'
                                        label="定时时间"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="查询" name="2">
                                <template v-for="item in searchData">
                                    <div :key="item.key">
                                        <span>屏幕序列号:{{item.screenSerialNumber}}</span>
                                        <span style="margin-left:20px;">时间:{{item.timestamp}}</span>     
                                    </div>
                                    <div :key="item.key">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>时间范围</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item2 in item.schedules" :key="item2.key">
                                                    <td>{{item2.timer}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 任务管理列表 -->
        <div class="modal fade" id="taskMyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">任务管理</h4>
                    </div>
                    <div class="modal-body">
                        <el-button v-if="addTask" @click="taskoperation(0)" type="primary" size="small">添加</el-button>
                        <el-button v-if="editTask" @click="taskoperation(1)" type="primary" size="small">编辑</el-button>
                        <el-button v-if="delTask" @click="taskoperation(2)" type="primary" size="small">删除</el-button>
                        <el-table
                            :data="tasktableData" 
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;margin-top:10px;"
                            @selection-change="tasktableChange">
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
                            prop="createTime"
                            label="创建时间"
                            align='center'
                            :formatter="formatRole"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="tasksizechange"
                            @current-change="taskcurrentchange"
                            :current-page="taskpageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="taskpageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tasktotal">
                            </el-pagination>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 添加/编辑 任务 -->
        <div class="modal fade" id="taskMyModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body">
                        <el-button @click="programOperation(0)" size='small' type="primary">添加节目</el-button>
                        <el-button @click="programOperation(1)" size='small' type="primary">编辑节目</el-button>
                        <el-button @click="programOperation(2)" size='small' type="primary">删除节目</el-button>
                        <div style="margin-top:10px;">
                            <span>任务名称:</span>
                            <el-input v-model="tasknickName" placeholder="请输入任务名称" size='small' style="width:156px;" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                            <el-tooltip class="item" effect="dark" content="上移(排序)" placement="top-start">
                                <el-button @click="move(0)" icon="el-icon-caret-top" size='mini' type="primary"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="下移(排序)" placement="top-start">
                                <el-button @click="move(1)" icon="el-icon-caret-bottom" size='mini' type="primary"></el-button>
                            </el-tooltip>
                        </div>
                        <el-table
                            :data="taskDetailsData" 
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;margin-top:10px;"
                            @selection-change="taskDetailsChange">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="programName"
                            align='center'
                            label="名称"
                            min-width="80">
                            </el-table-column>
                            <el-table-column
                            prop="repeatTimes"
                            align='center'
                            label="播放次数"
                            min-width="70">
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="播放日期"
                            min-width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.taskSchedule.startDate}}-{{scope.row.taskSchedule.endDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="播放时间"
                            min-width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.taskSchedule.startTime}}-{{scope.row.taskSchedule.endTime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            label="播放星期"
                            align='center'
                            :formatter="formatRole"
                            show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.taskSchedule.filterValue}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top:10px;">
                            <el-button @click="addtask" size='small' type="primary">保存</el-button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 添加 编辑节目模态框 -->
        <div class="modal fade" id="taskMyModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType2=='0'" class="modal-title" id="myModalLabel">添加</h4>
                        <h4 v-if="addType2=='1'" class="modal-title" id="myModalLabel">编辑</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="programtableData" 
                            ref="multipleTable"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            style="width: 100%;max-height:80%;margin-bottom:10px;overflow:auto;margin-top:10px;"
                            @selection-change="programtableChange">
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
                            prop="programSizeM"
                            align='center'
                            label="大小"
                            min-width="60">
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            label="创建时间"
                            align='center'
                            :formatter="formatRole"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="programsizechange"
                            @current-change="programcurrentchange"
                            :current-page="programpageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="programpageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="programtotal">
                            </el-pagination>
                        </div>
                        <div style="margin-top:10px;">
                            <el-radio-group v-model="taskSchedule.radio0">
                                <el-radio :label="0">永久</el-radio>
                                <el-radio :label="1">指定日期</el-radio>
                            </el-radio-group>
                            <div v-if="taskSchedule.radio0=='1'">
                                <el-date-picker
                                    v-model="taskSchedule.value1"
                                    type="date"
                                    size='small'
                                    value-format='yyyy-MM-dd'
                                    placeholder="开始日期"
                                    style="width:126px;margin-left:10px;">
                                </el-date-picker>
                                <el-date-picker
                                    v-model="taskSchedule.value2"
                                    type="date"
                                    size='small'
                                    value-format='yyyy-MM-dd'
                                    placeholder="结束日期"
                                    style="width:126px;margin-left:10px;">
                                </el-date-picker>
                            </div>
                        </div>
                        <div style="margin-top:10px;">
                            <el-radio-group v-model="taskSchedule.radio1">
                                <el-radio :label="0">全天</el-radio>
                                <el-radio :label="1">指定时间</el-radio>
                            </el-radio-group>
                            <div v-if="taskSchedule.radio1=='1'">
                                <el-time-picker
                                    v-model="taskSchedule.value3"
                                    value-format='HH:mm'
                                    size='small'
                                    placeholder="开始时间"
                                    style="width:126px;margin-left:10px;">
                                </el-time-picker>
                                <el-time-picker
                                    v-model="taskSchedule.value4"
                                    value-format='HH:mm'
                                    size='small'
                                    placeholder="结束时间"
                                    style="width:126px;margin-left:10px;">
                                </el-time-picker>
                            </div>
                        </div>
                        <div style="margin-top:10px;">
                            <el-radio-group v-model="taskSchedule.radio2">
                                <el-radio :label="0">无指定</el-radio>
                                <el-radio :label="1">指定星期</el-radio>
                            </el-radio-group>
                            <div v-if="taskSchedule.radio2=='1'" style="margin-left:10px;">
                                <el-checkbox-group v-model="taskSchedule.checkList">
                                    <el-checkbox :label="1">周一</el-checkbox>
                                    <el-checkbox :label="2">周二</el-checkbox>
                                    <el-checkbox :label="3">周三</el-checkbox>
                                    <el-checkbox :label="4">周四</el-checkbox>
                                    <el-checkbox :label="5">周五</el-checkbox>
                                    <el-checkbox :label="6">周六</el-checkbox>
                                    <el-checkbox :label="7">周日</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div style="margin-top:10px;">
                            <span>播放次数:</span>
                            <el-input v-model="taskSchedule.repeatTimes" placeholder="请输入播放次数" size='small' style="width:156px;"  oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                            <el-button @click="addprogram" size='small' type="primary">添加</el-button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 在线更新 -->
        <div class="modal fade" id="updateMyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">在线更新</h4>
                    </div>
                    <div class="modal-body">
                        <span>请选择升级包:</span>
                        <input style="display: inline-block;" type="file" ref="update">
                        <div class="el-upload__tip" style="font-size: 14px;">只能上传APK文件</div>
                        <el-button @click="updateSubmit" type="primary" size='small'>更新</el-button>
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
            inputColumn:'',
            serverurl:localStorage.serverurl,
            operation:false,
            viewProgram:false,
            viewMedia:false,
            addMedia:false,
            editMedia:false,
            delMedia:false,
            viewTask:false,
            addTask:false,
            editTask:false,
            delTask:false,
            // 屏幕
            tableData:[],
            tableSite1:[],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            pageSize:10,
            pageIndex:1,
            total:10,
            site:[],
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
            //屏幕开关
            switchdata:[],
            switchsite:[],
            switchType:'0',//手动/定时/查询
            addType:'2',//添加模块开启/关闭
            switchData:{
                name:'',
                radio0:0,
                radio1:0,
                radio2:0,
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                checkList:[],
            },
            searchData:[],
            //屏幕调光
            Dimmingdata:[],
            Dimmingsite:[],
            DimmingType:'0',//手动/定时/查询
            brightness:1,//手动-屏幕亮度
            DimmingDatas:{
                DimmingName:'',
                defaultBrightness:5,
                radio0:0,
                radio1:0,
                radio2:0,
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                checkList:[],
                brightness2:1,
            },
            //屏幕音量
            volumedata:[],
            volumesite:[],
            volumeType:'0',//手动/定时/查询
            volume:1,
            volumeDatas:{
                volumeName:'',
                defaultVolume:'',
                radio0:0,
                radio1:0,
                radio2:0,
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                checkList:[],
                volume:1
            },
            //屏幕截图
            loading:false,
            screenshotData:[],
            // 定时重启
            restartdata:[],
            restartsite:[],
            restartType:'0',
            restartName:'',
            rebootTime:'',
            //任务管理
            tasktableData:[],//任务列表
            tasktableSite:[],//选中数据
            taskpageIndex:1,
            taskpageSize:10,
            tasktotal:10,
            //任务中 节目列表
            tasknickName:'',
            taskDetailsData:[],
            taskDetailsSite:[],
            //节目模态框
            addType2:'0',
            programtableData:[],
            programtablesite:[],
            programpageIndex:1,
            programpageSize:10,
            programtotal:10,
            taskSchedule:{
                repeatTimes:'1',
                radio0:0,
                radio1:0,
                radio2:0,
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                checkList:[]
            }
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
        //表格change事件
        tableChange1(val){this.tableSite1 = val},
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
            if(val=='0'){//下发任务
                if(sessionStorage.projectId=='0'){
                    this.$message({
                        message: '此操作请选择具体项目!',
                        type: 'warning'
                    });
                    return;
                }
                $('#taskMyModal0').modal('show')
                that.taskready()
            }
            //屏幕开关
            if(val=='1'){
                $('#switchModal').modal('show')
                that.switchType = '0'
                that.addType='2'
                $('#switchModal').on('hide.bs.modal', function () {
                    that.ready()
                })
            }
            //屏幕调光
            if(val=='2'){
                $('#DimmingModal').modal('show')
                that.DimmingType='0'
                that.addType='2'
                $('#DimmingModal').on('hide.bs.modal', function () {
                    that.ready()
                })
            }
            //屏幕音量
            if(val=='3'){
                $('#volumeModal').modal('show')
                that.volumeType='0'
                that.addType='2'
                $('#volumeModal').on('hide.bs.modal', function () {
                    that.ready()
                })
            }
            //屏幕截图
            if(val=='4'){
                $('#screenshotMyModal').modal('show')
                that.loading = true
                var data = {}
                data.screens = []
                for(var i=0;i<that.tableSite1.length;i++){
                    data.screens.push(that.tableSite1[i].id)
                }
                data.command = '6'
                var screens = data.screens.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            setTimeout(function(){
                                $.ajax({
                                    type:'get',
                                    async:true,
                                    dataType:'json',
                                    url:that.serverurl+'/v1/solin/screen/device/screenshot',
                                    contentType:'application/json;charset=UTF-8',
                                    data:{
                                        screens:screens
                                    },
                                    success:function(data){
                                        if(data.errorCode=='0'){
                                            for(var i=0;i<data.result.length;i++){
                                                data.result[i].screenshotMsg='data:image/jpeg;base64,'+data.result[i].screenshotMsg
                                            }
                                            that.screenshotData = data.result
                                            that.loading = false
                                        }else{
                                            that.errorCode(data)
                                        }
                                    }
                                })
                            },2500)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                
            }
            //屏幕重启
            if(val=='5'){
                $('#restartMyModal').modal('show')
                that.restartType = '0'
                that.addType='2'
                $('#restartMyModal').on('hide.bs.modal', function () {
                    that.ready()
                })
            }
            //状态查询
            if(val=='6'){
                var data = {}
                data.screens = []
                for(var i=0;i<that.tableSite1.length;i++){
                    data.screens.push(that.tableSite1[i].id)
                }
                data.command = '5'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '状态查询中...',
                                type: 'success'
                            });
                            setTimeout(function(){
                                that.ready()
                            },3000)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //下发任务
        LowerHair(){
            var that = this;
            if(that.tasktableSite.length==0||that.tasktableSite.length>=2){
                that.$message({
                    message: '请选择单个任务进行下发!',
                    type: 'error'
                });
                return;
            }
            var array = []
            for(var i = 0;i<that.tableSite1.length;i++){
                array.push(that.tableSite1[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control/task',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    screens:array,
                    taskId:that.tasktableSite[0].id
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '发送成功!',
                            type: 'success'
                        });
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //请求屏幕定时信息列表 0开关/调光/音量
        screenData(val){
            var that = this;
            var data = {}
            data.nickName = ''
            data.projectIds = sessionStorage.projectId
            data.page = '1'
            data.size = '50'
            if(val=='0'){
                data.type = '2'
            }
            if(val=='1'){
                data.type = '3'
            }
            if(val=='2'){
                data.type = '4'
            }
            if(val=='3'){
                data.type = '5'
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        if(val=='0'){
                            that.switchdata = data.result.list
                        }
                        if(val=='1'){
                            that.Dimmingdata = data.result.list
                        }
                        if(val=='2'){
                            that.volumedata = data.result.list
                        }
                        if(val=='3'){
                            that.restartdata = data.result.list
                        }
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 获取标签页屏幕定时信息
        screenData2(val){
            var that = this
            var data = {}
            data.screens = []
            for(var i=0;i<that.tableSite1.length;i++){
                data.screens.push(that.tableSite1[i].id)
            }
            //屏幕开关
            if(val=='1'){
                data.command = '1'
            }
            if(val=='2'){
                data.command = '2'
            }
            if(val=='3'){
                data.command = '3'
            }
            if(val=='4'){
                data.command='4'
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control/schedule/information',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            setTimeout(function(){
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/device/schedule',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.searchData = data.result
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },3500)
        },
        //开关标签页事件  手动开关/定时开关/查询
        switchClick(){
            //定时信息页面
            if(this.switchType=='1'){this.screenData(0)}
            //查询当前屏幕定时信息
            if(this.switchType=='2'){this.screenData2(1) }
        },
        //屏幕开启关闭
        switchs(val){
            var that = this;
            if(val=='0'){
                //开启屏幕
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                       screens:arr,
                       brightness:'1',
                       command:'1'
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '屏幕开启成功!',
                                type: 'success'
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                }) 
            }
            if(val=='1'){
                //关闭屏幕
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                       screens:arr,
                       brightness:'1',
                       command:'2'
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '屏幕关闭成功!',
                                type: 'success'
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                }) 
            }
        },
        //开关定时信息页面 添加/编辑/删除/发送/关闭
        switchOperation(val){
            var that = this;
            if(val=='0'){
                that.addType='0'
                that.switchData.name=''
                that.switchData.radio0=0
                that.switchData.radio1=0
                that.switchData.radio2=0
                that.switchData.value1=''
                that.switchData.value2=''
                that.switchData.value3=''
                that.switchData.value4=''
                that.switchData.checkList = []
            }
            if(val=='1'){
                if(that.switchsite.length==0||that.switchsite.length>1){
                    that.$message({
                        message: '请选择单条定时信息编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                that.addType='1'
                that.switchData.name=that.switchsite[0].nickName
                that.switchData.radio0=that.switchsite[0].dateType
                that.switchData.radio1=that.switchsite[0].timeType
                that.switchData.radio2=that.switchsite[0].filterType
                that.switchData.value1=that.switchsite[0].startDate
                that.switchData.value2=that.switchsite[0].endDate
                that.switchData.value3=that.switchsite[0].startTime
                that.switchData.value4=that.switchsite[0].endTime
                if(that.switchsite[0].filterValue==''){
                    that.switchData.checkList = []
                }else{
                    that.switchData.checkList=that.switchsite[0].filterValue.split(',')
                }
                for(var i=0;i<that.switchData.checkList.length;i++){
                    that.switchData.checkList[i] = Number(that.switchData.checkList[i])
                }
                console.log(that.switchData)
            }
            if(val=='2'){
                if(that.switchsite.length==0){
                    that.$message({
                        message: '请选择定时信息删除!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.switchsite.length;i++){
                    arr.push(that.switchsite[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/schedule/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        schedules:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.screenData(0)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='3'){
                if(that.switchsite.length==0){
                    that.$message({
                        message: '请选择定时信息发送!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var data = {}
                data.command='8'
                data.schedules=[]
                data.screens=[]
                for(var i ='0';i<that.switchsite.length;i++){
                    data.schedules.push(that.switchsite[i].id)
                }
                for(var j=0;j<that.tableSite1.length;j++){
                    data.screens.push(that.tableSite1[j].id)
                }
                $.ajax({  
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '发送成功',
                                type:'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='4'){
                var data = {}
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                data.command = '1'
                data.screens = arr
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule/clear',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '清除成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#switchModal').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='5'){that.addType='2'}
        },
        //屏幕开关定时信息列表changge事件
        switchtableChange(val){this.switchsite = val;},
        //保存定时开关信息   添加/编辑
        switchSubmit(){
            var that = this;
            if(that.switchData.name==''){
                that.$message({
                    message: '定时名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.switchData.radio0=='1'){
                if(that.switchData.value1==''||that.switchData.value2==''){
                    that.$message({
                        message: '开始结束日期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.switchData.value1 = ''
                that.switchData.value2 = ''
            }
            if(that.switchData.radio1=='1'){
                if(that.switchData.value3==''||that.switchData.value4==''){
                    that.$message({
                        message: '开始结束时间不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.switchData.value3 = ''
                that.switchData.value4 = ''
            }
            if(that.switchData.radio2=='1'){
                if(that.switchData.checkList.length==0){
                    that.$message({
                        message: '星期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.switchData.checkList = []
            }
            var data = {}
            var type = ''
            if(that.addType == '0'){type='post'}
            if(that.addType == '1'){type='put';data.id = that.switchsite[0].id}
            data.type = '2'
            data.nickName = that.switchData.name
            data.dateType = that.switchData.radio0
            data.timeType = that.switchData.radio1
            data.filterType = that.switchData.radio2
            data.startDate = that.switchData.value1
            data.endDate = that.switchData.value2
            data.startTime = that.switchData.value3
            data.endTime = that.switchData.value4
            data.filterValue = that.switchData.checkList.join(',')
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type:'success',
                            showClose: true,
                        });
                        that.screenData(0)
                        that.addType = '2'
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //调光标签页事件   手动调光/定时调光/查询
        DimmingClick(){
            if(this.DimmingType=='1'){this.screenData(1)}
            if(this.DimmingType=='2'){this.screenData2(2)}
        },
        //屏幕亮度手动页面  --  发送按钮
        DimmingSubmit(){
            var that = this;
            if(that.brightness==''){
                this.$message({
                    message: '请输入屏幕亮度!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            data.command = '3'
            data.brightness = that.brightness
            data.screens = []
            for(var i = 0;i<that.tableSite1.length;i++){
                data.screens.push(that.tableSite1[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '发送成功!',
                            type: 'success'
                        });
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //调光定时信息页面 添加/编辑/删除/发送/关闭
        DimmingOperation(val){
            var that = this;
            if(val=='0'){
                that.addType='0'
                that.DimmingDatas.DimmingName=''
                that.DimmingDatas.defaultBrightness=5
                that.DimmingDatas.radio0 = 0
                that.DimmingDatas.radio1 = 0
                that.DimmingDatas.radio2 = 0
                that.DimmingDatas.value1 = ''
                that.DimmingDatas.value2 = ''
                that.DimmingDatas.value3 = ''
                that.DimmingDatas.value4 = ''
                that.DimmingDatas.checkList = []
                that.DimmingDatas.brightness2 = 1
            }
            if(val=='1'){
                if(that.Dimmingsite.length==0||that.Dimmingsite.length>1){
                    that.$message({
                        message: '请选择单条定时信息编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                that.addType='1'
                that.DimmingDatas.DimmingName=that.Dimmingsite[0].nickName
                that.DimmingDatas.defaultBrightness=that.Dimmingsite[0].defaultBrightness
                that.DimmingDatas.radio0 = that.Dimmingsite[0].dateType 
                that.DimmingDatas.radio1 = that.Dimmingsite[0].timeType 
                that.DimmingDatas.radio2 = that.Dimmingsite[0].filterType 
                that.DimmingDatas.value1 = that.Dimmingsite[0].startDate
                that.DimmingDatas.value2 = that.Dimmingsite[0].endDate
                that.DimmingDatas.value3 = that.Dimmingsite[0].startTime
                that.DimmingDatas.value4 = that.Dimmingsite[0].endTime
                if(that.Dimmingsite[0].filterValue==''){
                    that.DimmingDatas.checkList = []
                }else{
                    that.DimmingDatas.checkList=that.Dimmingsite[0].filterValue.split(',')
                }
                for(var i=0;i<that.DimmingDatas.checkList.length;i++){
                    that.DimmingDatas.checkList[i] = Number(that.DimmingDatas.checkList[i])
                }
                that.DimmingDatas.brightness2=Number(that.Dimmingsite[0].brightness)
            }
            if(val=='2'){
                //删除
                if(that.Dimmingsite.length==0){
                    that.$message({
                        message: '请选择定时信息删除!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.Dimmingsite.length;i++){
                    arr.push(that.Dimmingsite[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/schedule/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        schedules:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.screenData(1)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='3'){
                //发送
                if(that.Dimmingsite.length==0){
                    that.$message({
                        message: '请选择定时信息发送!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var data = {}
                data.command='9'
                data.schedules=[]
                data.screens=[]
                for(var i ='0';i<that.Dimmingsite.length;i++){
                    data.schedules.push(that.Dimmingsite[i].id)
                }
                for(var j=0;j<that.tableSite1.length;j++){
                    data.screens.push(that.tableSite1[j].id)
                }
                $.ajax({  
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '发送成功',
                                type:'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='4'){
                var data = {}
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                data.command = '2'
                data.screens = arr
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule/clear',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '清除成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#DimmingModal').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='5'){that.addType='2'}
        },
        //屏幕亮度定时信息列表changge事件
        DimmingtableChange(val){this.Dimmingsite = val;},
        //调光定时信息页面 添加/编辑 保存
        DimmingSubmit2(){
            var that = this;
            if(that.DimmingDatas.DimmingName==''){
                that.$message({
                    message: '定时名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.DimmingDatas.radio0==1){
                if(that.DimmingDatas.value1==''||that.DimmingDatas.value2==''){
                    that.$message({
                        message: '开始结束日期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.DimmingDatas.value1=''
                that.DimmingDatas.value2=''
            }
            if(that.DimmingDatas.radio1==1){
                if(that.DimmingDatas.value3==''||that.DimmingDatas.value4==''){
                    that.$message({
                        message: '开始结束时间不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.DimmingDatas.value3 = ''
                that.DimmingDatas.value4 = ''
            }
            if(that.DimmingDatas.radio2==1){
                if(that.DimmingDatas.checkList.length==0){
                    that.$message({
                        message: '星期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.DimmingDatas.checkList = []
            }
            var data = {}
            var type = ''
            if(that.addType == '0'){type='post'}
            if(that.addType == '1'){type='put';data.id = that.Dimmingsite[0].id}
            data.type = '3'
            data.nickName = that.DimmingDatas.DimmingName
            data.defaultBrightness = that.DimmingDatas.defaultBrightness
            data.dateType = that.DimmingDatas.radio0
            data.timeType = that.DimmingDatas.radio1
            data.filterType = that.DimmingDatas.radio2
            data.startDate = that.DimmingDatas.value1
            data.endDate = that.DimmingDatas.value2
            data.startTime = that.DimmingDatas.value3
            data.endTime = that.DimmingDatas.value4
            data.filterValue = that.DimmingDatas.checkList.join(',')
            data.brightness = that.DimmingDatas.brightness2
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type:'success',
                            showClose: true,
                        });
                        that.screenData(1)
                        that.addType = '2'
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //屏幕音量标签页事件 手动/定时/查询
        volumeClick(){
            if(this.volumeType=='1'){this.screenData(2)}
            if(this.volumeType=='2'){this.screenData2(3)}
        },
        //屏幕音量定时信息列表changge事件
        volumetableChange(val){this.volumesite = val;},
        //屏幕音量手动页面   --发送按钮
        volumeSubmit(){
            var that = this;
            if(that.volume==''){
                this.$message({
                    message: '请输入屏幕音量!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            data.command = '4'
            data.volume = that.volume
            data.screens = []
            for(var i = 0;i<that.tableSite1.length;i++){
                data.screens.push(that.tableSite1[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '发送成功!',
                            type: 'success'
                        });
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //音量定时信息页面 添加/编辑/删除/发送/关闭
        volumeOperation(val){
            var that= this;
            if(val=='0'){
                that.addType='0'
                that.volumeDatas.volumeName=''
                that.volumeDatas.defaultVolume=0
                that.volumeDatas.radio0 = 0
                that.volumeDatas.radio1 = 0
                that.volumeDatas.radio2 = 0
                that.volumeDatas.value1 = ''
                that.volumeDatas.value2 = ''
                that.volumeDatas.value3 = ''
                that.volumeDatas.value4 = ''
                that.volumeDatas.checkList = []
                that.volumeDatas.volume=1
            }
            if(val=='1'){
                if(that.volumesite.length==0||that.volumesite.length>1){
                    that.$message({
                        message: '请选择单条定时信息编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                that.addType='1'
                that.volumeDatas.volumeName=that.volumesite[0].nickName
                that.volumeDatas.defaultVolume=that.volumesite[0].defaultVolume
                that.volumeDatas.radio0 = that.volumesite[0].dateType 
                that.volumeDatas.radio1 = that.volumesite[0].timeType 
                that.volumeDatas.radio2 = that.volumesite[0].filterType 
                that.volumeDatas.value1 = that.volumesite[0].startDate
                that.volumeDatas.value2 = that.volumesite[0].endDate
                that.volumeDatas.value3 = that.volumesite[0].startTime
                that.volumeDatas.value4 = that.volumesite[0].endTime
                if(that.volumesite[0].filterValue==''){
                    that.volumeDatas.checkList = []
                }else{
                    that.volumeDatas.checkList=that.volumesite[0].filterValue.split(',')
                }
                for(var i=0;i<that.volumeDatas.checkList.length;i++){
                    that.volumeDatas.checkList[i] = Number(that.volumeDatas.checkList[i])
                }
                that.volumeDatas.volume=that.volumesite[0].volume
            }
            if(val=='2'){
                //删除
                if(that.volumesite.length==0){
                    that.$message({
                        message: '请选择定时信息删除!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.volumesite.length;i++){
                    arr.push(that.volumesite[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/schedule/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        schedules:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.screenData(2)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='3'){
                //发送
                if(that.volumesite.length==0){
                    that.$message({
                        message: '请选择定时信息发送!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var data = {}
                data.command='10'
                data.schedules=[]
                data.screens=[]
                for(var i ='0';i<that.volumesite.length;i++){
                    data.schedules.push(that.volumesite[i].id)
                }
                for(var j=0;j<that.tableSite1.length;j++){
                    data.screens.push(that.tableSite1[j].id)
                }
                $.ajax({  
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '发送成功',
                                type:'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='4'){
                var data = {}
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                data.command = '3'
                data.screens = arr
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule/clear',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '清除成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#volumeModal').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='5'){that.addType='2'}
        },
        //音量定时信息页面 添加/编辑 保存
        volumeSubmit2(){
            var that = this;
            if(that.volumeDatas.volumeName==''){
                that.$message({
                    message: '定时名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.volumeDatas.radio0==1){
                if(that.volumeDatas.value1==''||that.volumeDatas.value2==''){
                    that.$message({
                        message: '开始结束日期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.volumeDatas.value1 = ''
                that.volumeDatas.value2 = ''
            }
            if(that.volumeDatas.radio1==1){
                if(that.volumeDatas.value3==''||that.volumeDatas.value4==''){
                    that.$message({
                        message: '开始结束时间不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.volumeDatas.value3 = ''
                that.volumeDatas.value4 = ''
            }
            if(that.volumeDatas.radio2==1){
                if(that.volumeDatas.checkList.length==0){
                    that.$message({
                        message: '星期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.volumeDatas.checkList = []
            }
            var data = {}
            var type = ''
            if(that.addType == '0'){type='post'}
            if(that.addType == '1'){type='put';data.id = that.volumesite[0].id}
            data.type = '4'
            data.nickName = that.volumeDatas.volumeName
            data.defaultVolume = that.volumeDatas.defaultVolume
            data.dateType = that.volumeDatas.radio0
            data.timeType = that.volumeDatas.radio1
            data.filterType = that.volumeDatas.radio2
            data.startDate = that.volumeDatas.value1
            data.endDate = that.volumeDatas.value2
            data.startTime = that.volumeDatas.value3
            data.endTime = that.volumeDatas.value4
            data.filterValue = that.volumeDatas.checkList.join(',')
            data.volume = that.volumeDatas.volume
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type:'success',
                            showClose: true,
                        });
                        that.screenData(2)
                        that.addType = '2'
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //屏幕重启标签页事件   手动/定时/查询
        restartClick(){
            if(this.restartType=='1'){this.screenData(3)}
            if(this.restartType=='2'){this.screenData2(4)}
        },
        //屏幕手动重启
        restart(){
            var that = this
            var data = {}
            data.command = '7'
            data.screens = []
            for(var i = 0;i<that.tableSite1.length;i++){
                data.screens.push(that.tableSite1[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/control',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '发送成功!',
                            type: 'success'
                        });
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        restarttableChange(val){this.restartsite=val;},
        //重启定时页面   添加/编辑/删除/发送/关闭
        restartOperation(val){
            var that = this
            if(val=='0'){
                that.addType='0'
                that.restartName = ''
                that.rebootTime = ''
            }
            if(val=='1'){
                that.addType='1'
                if(that.restartsite.length==0||that.restartsite.length>1){
                    this.$message({
                        message: '请选择单条定时信息编辑!',
                        type: 'error'
                    });
                    return;
                }
                that.restartName = that.restartsite[0].nickName
                that.rebootTime = that.restartsite[0].rebootTime
            }
            if(val=='2'){
                //删除
                if(that.restartsite.length==0){
                    this.$message({
                        message: '请选择定时信息删除!',
                        type: 'error'
                    });
                    return;
                }
                var arr = []
                for(var i=0;i<that.restartsite.length;i++){
                    arr.push(that.restartsite[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/schedule/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        schedules:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.screenData(3)
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='3'){
                //发送
                if(that.restartsite.length==0||that.restartsite.length>1){
                    this.$message({
                        message: '请选择单条定时信息发送!',
                        type: 'error'
                    });
                    return;
                }
                var data = {}
                data.command='11'
                data.schedules=[]
                data.screens=[]
                for(var i ='0';i<that.restartsite.length;i++){
                    data.schedules.push(that.restartsite[i].id)
                }
                for(var j=0;j<that.tableSite1.length;j++){
                    data.screens.push(that.tableSite1[j].id)
                }
                $.ajax({  
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '发送成功',
                                type:'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='4'){
                var data = {}
                var arr = []
                for(var i=0;i<that.tableSite1.length;i++){
                    arr.push(that.tableSite1[i].id)
                }
                data.command = '4'
                data.screens = arr
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/control/schedule/clear',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '清除成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#restartMyModal').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
            if(val=='5'){that.addType='2'}
        },
        //重启定时信息保存
        restartSubmit(){
            var that = this
            if(that.restartName==''||that.rebootTime==''){
                that.$message({
                    message: '定时重启信息不能为空!',
                    type: 'error'
                });
                return;
            }
            var data = {}
            var type = ''
            if(that.addType=='0'){type='post'}
            if(that.addType=='1'){type='put';data.id=that.restartsite[0].id;}
            data.nickName = that.restartName
            data.rebootTime = that.rebootTime
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/schedule/reboot',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功',
                            type:'success',
                            showClose: true,
                        });
                        that.screenData(3)
                        that.addType = '2'
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        // 点击节目管理
        notice(){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            //跳转节目管理新页面
            this.$router.push({'path':'/program'})
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
                url:that.serverurl+'/v1/solin/screen/media',
                data:{
                   page:that.mediaIndex,
                   size:that.mediaSize,
                   audit:that.stateValue,
                   mediaType:that.typeValue,
                   nickName:'',
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.mediartableData = data.result.list
                        that.mediaTotal = data.result.total
                    }else{
                        that.errorCode(data)
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
                type:'put',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/media',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    id:val.id,
                    projectId:sessionStorage.projectId,
                    nickName:that.inputColumn
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        that.mediaready()
                    }else{
                        that.errorCode(data)
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
                    url:that.serverurl+'/v1/solin/screen/media/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        medias:ids
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.mediaready()
                        }else{
                            that.errorCode(data)
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
        //上传文件change事件
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
            if(value[0]=='video'){
                type='1'
                console.log(value)
                if(value[1]=='mp4'||value[1]=='3gpp'||value[1]=='MP4'||value[1]=='3GPP'){
                    
                }else{
                    that.$message({
                        message: '不支持的文件格式!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else if(value[0]=='image'){
                type='0'
                if(value[1]=='jpg'||value[1]=='jpeg'||value[1]=='png'||value[1]=='gif'||value[1]=='JPEG'||value[1]=='PNG'||value[1]=='GIF'||value[1]=='JPG'){
                    
                }else{
                    that.$message({
                        message: '不支持的文件格式!',
                        type:'success',
                        showClose: true,
                    });
                    return;
                }
            }
            formdate.append('mediaType ',type)
            formdate.append('projectId ',sessionStorage.projectId)
            that.filesuploadLoading = true
            $.ajax({
                url:that.serverurl+'/v1/solin/screen/media',
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
                    that.errorCode(res)
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
            window.open(that.serverurl+"/v1/solin/file/download?fileUrl="+url)
        },
        //任务管理
        taskManagement(){
            $('#taskMyModal').modal('show');
            this.taskready();
        },
        //请求任务列表数据
        taskready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task',
                data:{
                   page:that.taskpageIndex,
                   size:that.taskpageSize,
                   nickName:'',
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tasktableData = data.result.list
                        that.tasktotal = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //列表选中数据
        tasktableChange(val){this.tasktableSite = val;},
        taskcurrentchange(val){this.taskpageIndex = val;this.taskready();},
        tasksizechange(val){this.taskpageSize = val;this.taskready();},
        //点击添加/编辑/删除任务按钮
        taskoperation(val){
            var that = this;
            if(val=='0'){
                this.tasknickName =''
                this.taskDetailsData = []
                $('#taskMyModal2').modal('show')
                this.addType='0'
            }
            if(val=='1'){
                if(this.tasktableSite.length==0||this.tasktableSite.length>=2){
                    this.$message({
                        message: '请选择单个任务进行编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/task/information/'+this.tasktableSite[0].id,
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tasknickName =  that.tasktableSite[0].nickName
                            that.taskDetailsData = data.result.list
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                $('#taskMyModal2').modal('show')
                this.addType='1'
            }
            if(val=='2'){
                if(this.tasktableSite.length==0){
                    this.$message({
                        message: '请选择任务进行删除!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var data = {}
                data.taskIds = [];
                for(var i=0;i<that.tasktableSite.length;i++){
                    data.taskIds.push(that.tasktableSite[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/task/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type:'success',
                                showClose: true,
                            });
                            that.taskready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //点击添加 编辑 删除节目按钮
        programOperation(val){
            var that = this;
            if(val=='0'){
                this.addType2='0'
                $('#taskMyModal3').modal('show')
                this.program()
                that.taskSchedule.radio0 = 0
                that.taskSchedule.radio1 = 0
                that.taskSchedule.radio2 = 0
                that.taskSchedule.value1 = ''
                that.taskSchedule.value2 = ''
                that.taskSchedule.value3 = ''
                that.taskSchedule.value4 = ''
                that.taskSchedule.checkList = []
                that.taskSchedule.repeatTimes = '1'
            }
            if(val=='1'){
                if(this.taskDetailsSite.length==0||this.taskDetailsSite.length>=2){
                    this.$message({
                        message: '请选择单个节目进行编辑!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                this.addType2='1'
                $('#taskMyModal3').modal('show')
                this.program()
                that.taskSchedule.radio0 = that.taskDetailsSite[0].taskSchedule.dateType 
                that.taskSchedule.radio1 = that.taskDetailsSite[0].taskSchedule.timeType 
                that.taskSchedule.radio2 = that.taskDetailsSite[0].taskSchedule.filterType 
                that.taskSchedule.value1 = that.taskDetailsSite[0].taskSchedule.startDate 
                that.taskSchedule.value2 = that.taskDetailsSite[0].taskSchedule.endDate 
                that.taskSchedule.value3 = that.taskDetailsSite[0].taskSchedule.startTime 
                that.taskSchedule.value4 = that.taskDetailsSite[0].taskSchedule.endTime 
                if(that.taskDetailsSite[0].taskSchedule.filterValue==''){
                    that.taskSchedule.checkList = []
                }else{
                    that.taskSchedule.checkList = that.taskDetailsSite[0].taskSchedule.filterValue.split(',')
                    for(var i=0;i<that.taskSchedule.checkList.length;i++){
                        that.taskSchedule.checkList[i] = Number(that.taskSchedule.checkList[i])
                    }
                }
                
                that.taskSchedule.repeatTimes = that.taskDetailsSite[0].repeatTimes 
            }
            if(val=='2'){
                var arr = false
                for(var i=0;i<that.taskDetailsSite.length;i++){
                    arr = false
                    for(var j = 0;j<that.taskDetailsData.length;j++){
                        if(that.taskDetailsSite[i].programId==that.taskDetailsData[j].programId){
                            that.taskDetailsData.splice(j,1)
                            arr = true
                        }
                    }
                    if(arr == true){
                        i--
                        j--
                    }
                }
            }
        },
        taskDetailsChange(val){this.taskDetailsSite = val},
        //上下移动
        move(val){
            if(this.taskDetailsSite.length==0||this.taskDetailsSite.length>=2){
                this.$message({
                    message: '请选择单个节目进行移动!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            var length = this.taskDetailsData.length - 1 
            var s = ''
            for(var i=0;i<this.taskDetailsData.length;i++){
                if(this.taskDetailsSite[0].programId==this.taskDetailsData[i].programId){
                    s=i
                }
            }
            var data = this.taskDetailsSite[0]
            //上移
            if(val=='0'){
                if(s==0){
                    return;
                }
                this.taskDetailsData.splice(s,1)
                this.taskDetailsData.splice(s-1,0,data)
            }
            //下移
            if(val=='1'){
                if(s==length){
                    return;
                }
                this.taskDetailsData.splice(s,1)
                this.taskDetailsData.splice(s+1,0,data)
            }
        },
        //请求节目列表
        program(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/program',
                data:{
                    page:that.programpageIndex,
                    size:that.programpageSize,
                    programType:'',
                    nickName:'',
                    projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.programtableData = data.result.list
                        that.programtotal = data.result.total
                        var array = []
                        if(that.addType2=='1'){
                            for(var i = 0;i<that.programtableData.length;i++){
                                if(that.taskDetailsSite[0].programId==that.programtableData[i].id){
                                    array.push(that.programtableData[i])
                                    
                                }
                            }
                        }
                        setTimeout(function(){
                            array.forEach(row => {
                                that.$refs.multipleTable.toggleRowSelection(row);
                            });
                        },500)
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //节目列表事件
        programtableChange(val){this.programtablesite = val;},
        programcurrentchange(val){this.programpageIndex = val;this.program();},
        programsizechange(val){this.programpageSize = val;this.program();},
        //添加节目
        addprogram(){
            var that = this;
            if(that.programtablesite.length==0||that.programtablesite.length>=2){
                this.$message({
                    message: '请选择单个节目!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(this.addType2=='0'){
                for(var i = 0;i<that.taskDetailsData.length;i++){
                    if(that.programtablesite[0].id == that.taskDetailsData[i].programId){
                        that.$message({
                            message: '请不要选择重复节目!',
                            type:'error',
                            showClose: true,
                        });
                        return;
                    }
                }
            }
            if(that.taskSchedule.radio0==1){
                if(that.taskSchedule.value1==''||that.taskSchedule.value2==''){
                    that.$message({
                        message: '开始结束日期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.taskSchedule.value1=''
                that.taskSchedule.value2=''
            }
            if(that.taskSchedule.radio1==1){
                if(that.taskSchedule.value3==''||that.taskSchedule.value4==''){
                    that.$message({
                        message: '开始结束时间不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
                that.taskSchedule.value3=''
                that.taskSchedule.value4=''
            }
            if(that.taskSchedule.radio2==1){
                if(that.taskSchedule.checkList.length==0){
                    that.$message({
                        message: '星期不能为空!',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
            }else{
               that.taskSchedule.checkList = [] 
            }
            if(that.taskSchedule.repeatTimes==''){
                that.$message({
                    message: '播放次数不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            var data = {}
            data.taskSchedule ={}
            data.programName = that.programtablesite[0].nickName
            data.priority = ''
            data.programId = that.programtablesite[0].id
            data.repeatTimes = that.taskSchedule.repeatTimes
            data.taskSchedule.dateType = that.taskSchedule.radio0
            data.taskSchedule.timeType = that.taskSchedule.radio1
            data.taskSchedule.filterType = that.taskSchedule.radio2
            data.taskSchedule.startDate = that.taskSchedule.value1
            data.taskSchedule.endDate = that.taskSchedule.value2
            data.taskSchedule.startTime = that.taskSchedule.value3
            data.taskSchedule.endTime = that.taskSchedule.value4
            data.taskSchedule.filterValue = that.taskSchedule.checkList.join(',')
            if(that.addType2=='0'){
                that.taskDetailsData.push(data)
            }
            if(that.addType2=='1'){
                for(var i =0;i<that.taskDetailsData.length;i++){
                    if(that.taskDetailsSite[0].programId==that.taskDetailsData[i].programId){
                        that.taskDetailsData.splice(i,1,data)
                    }
                }
            }
            $('#taskMyModal3').modal('hide')
        },
        //保存任务
        addtask(){
            var that = this
            if(that.tasknickName==''){
                this.$message({
                    message: '节目名称不能为空!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            if(that.taskDetailsData.length==0){
                this.$message({
                    message: '请设置节目!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            for(var i=0;i<that.taskDetailsData.length;i++){
                that.taskDetailsData[i].priority = i+1
            }
            var data = {}
            var type = ''
            if(that.addType=='0'){
                type = 'post'
            }
            if(that.addType=='1'){
                type = 'put'
                data.id = that.tasktableSite[0].id
            }
            data.nickName = that.tasknickName
            data.projectId = sessionStorage.projectId
            data.taskDetails = that.taskDetailsData
            $.ajax({
                type:type,
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/task',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type:'success',
                            showClose: true,
                        });
                        $('#taskMyModal2').modal('hide')
                        that.taskready()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //点击在线更新按钮
        update(){
            if(this.tableSite1.length==0){
                this.$message({
                    message: '请选择屏幕进行在线升级!',
                    type:'error',
                    showClose: true,
                });
                return;
            }
            $('#updateMyModal').modal('show')
        },
        //更新
        updateSubmit(){
            var that = this;
            var arr = []
            for(var i=0;i<that.tableSite1.length;i++){
                arr.push(that.tableSite1[i].id)
            }
            var formdate = new FormData();
            formdate.append("file", this.$refs.update.files[0]);
            formdate.append("screens", arr.join(','));
            $.ajax({
                url:that.serverurl+'/v1/solin/screen/control/app/upgrade',
                type: 'POST',
                cache: false,
                data: formdate,
                dataType:'json',
                processData: false,
                contentType: false,
            }).done(function(res){
                if(res.errorCode=='0'){
                    that.$message({
                        message: '任务正在更新中,请稍后...',
                        type:'success',
                        showClose: true,
                    });
                }else{
                    that.errorCode(res.errorCode)
                }
            }).error(function(res){
                
            })
        },
        //获取广告屏列表
        ready(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device',
                data:{
                   page:that.pageIndex,
                   size:that.pageSize,
                   status:that.value,
                   serialNumber:that.serialNumber,
                   poleId:'',
                   projectIds:sessionStorage.projectId
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData = data.result.list
                        that.total = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        sizechange(val){this.pageSize = val;this.ready()},
        currentchange(val){this.pageIndex = val;this.ready()},
        search(){
            this.ready()
        },
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
                            if(data.result.operats[i].code=='screenControl'){
                                that.operation = true
                            }
                            if(data.result.operats[i].code=='viewProgram'){
                                that.viewProgram = true
                            }
                            if(data.result.operats[i].code=='viewMedia'){
                                that.viewMedia = true
                            }
                            if(data.result.operats[i].code=='addMedia'){
                                that.addMedia = true
                            }
                            if(data.result.operats[i].code=='editMedia'){
                                that.editMedia = true
                            }
                            if(data.result.operats[i].code=='delMedia'){
                                that.delMedia = true
                            }
                            if(data.result.operats[i].code=='viewTask'){
                                that.viewTask = true
                            }
                            if(data.result.operats[i].code=='addTask'){
                                that.addTask = true
                            }
                            if(data.result.operats[i].code=='editTask'){
                                that.editTask = true
                            }
                            if(data.result.operats[i].code=='delTask'){
                                that.delTask = true
                            }
                        }
                    }else{
                        that.errorCode(data)
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

.setProgram_center{margin-left: 5%;}
.setProgram_div_top{width: 100%;height: 40px;line-height: 35px;border-bottom: 1px solid #e5e5e5;}
.setProgram_div_bottom{position: absolute;top:40px;bottom: 0;left: 0;right: 0;padding: 5px;}
.positionTop{position: absolute;top: 0;left:0;right: 0;width: 100%;height:50px;background: red;}
.programSetting{width: 100%;height: 340px;position: relative;}
.programSetting_top{width: 100%;height: 40px;line-height: 38px;}
.programSetting_bottom{width: 100%;position: absolute;top:45px;bottom: 0;height: auto;}
.form-group{display:flex;justify-content: center;margin:10px;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 196px;}

.search{display: flex;}
.search>label{width: 85px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>
<style>
/* .el-tabs__content{position: relative !important;top:0 !important;height: auto !important;} */
</style>
