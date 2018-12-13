<template>
    <div class="LampPole">
        <!-- 灯杆模式 -->
        <div class="LampPole_top">
            <el-button v-if="addPole" @click="addLampPole(0)" type="primary" icon='el-icon-plus' size='small'>添加灯杆</el-button>
            <el-button v-if="editPole" @click="addLampPole(1)" type="primary" icon="el-icon-edit" size='small'>编辑灯杆</el-button>
            <el-button v-if="delPole" @click="deleteLampPole" type="primary" icon='el-icon-delete' size='small'>删除灯杆</el-button>
            <el-button v-if="poleBindProject" @click="poleBindProjects" type="primary" icon='el-icon-setting' size='small'>绑定项目</el-button>
        </div>
        <div class="LampPole_bottom">
            <div class="LampPole_bottom_top">
                <div class="search">
                    <label>灯杆名称:</label>
                    <input type="text" v-model="nickName" style="width:126px;" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入灯杆名称">
                </div>
                <div class="search">
                    <label>灯杆类型:</label>
                    <el-select v-model="value_search" size='small' style="width:126px;" clearable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <label>灯杆编号:</label>
                    <input type="text" v-model="serialNumber" style="width:126px;" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" class="form-control" id="fullName" placeholder="请输入灯杆编号">
                </div>
                <!-- <div class="search">
                    <label style="width:25px;">省:</label>
                    <el-select @change="city(3)" v-model="value1_search" clearable size='small' style="width: 126px;" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <label style="width:25px;">市:</label>
                    <el-select @change="area(3)" v-model="value2_search" clearable size='small' style="width: 126px;" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="search">
                    <label style="width:35px;">区/县:</label>
                    <el-select v-model="value3_search" clearable size='small' style="width: 126px;" placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
                <div style="margin-left:15px;">
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
            <div class="LampPole_bottom_bottom">
                <el-table
                    :data="tableData"
                    @row-click="clickRow" 
                    ref="moviesTable"
                    border
                    stripe
                    size='small'
                    tooltip-effect="dark"
                    show-overflow-tooltip=true
                    @selection-change="SelectionChange"
                    style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="nickName"
                    align='center'
                    label="昵称"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="serialNumber"
                    align='center'
                    label="编号"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="灯杆类型"
                    min-width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.poleType=='0'">普通灯杆</span>
                            <span v-if="scope.row.poleType=='1'">智慧灯杆</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="location"
                    align='center'
                    label="位置"
                    :formatter="formatRole"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="关联灯具"
                    min-width="80">
                        <template slot-scope="scope">
                            <button @click="LampPole_click(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="关联屏幕"
                    align='center'
                    min-width="80">
                        <template slot-scope="scope">
                            <button @click="relevancelanterns(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="关联气象站"
                    align='center'
                    min-width="80">
                        <template slot-scope="scope">
                            <button @click="sensor(scope.row.id)" style="height:20px;line-height:15px;">...</button>
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
        <!-- 添加编辑灯杆 -->
        <div class="modal fade" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addtype=='0'" class="modal-title" id="myModalLabel">添加灯杆</h4>
                        <h4 v-if="addtype=='1'" class="modal-title" id="myModalLabel">编辑灯杆</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>昵称:</label>
                            <input type="text" v-model="LampPoleData.nickName" class="form-control" id="email" placeholder="请输入名称">
                            <label>灯杆类型:</label>
                            <el-select v-model="value" size='small' style="width:126px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="form-group">
                            <label>经度:</label>
                            <input type="text" v-model="LampPoleData.longitude" class="form-control" id="email" placeholder="请输入经度">
                            <label>纬度:</label>
                            <input type="text" v-model="LampPoleData.latitude" class="form-control" id="email" placeholder="请输入纬度">
                        </div> 
                        <div class="form-group">
                            <label>省:</label>
                            <el-select @change="provinceChange" v-model="value1" size='small' style="width: 126px;" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <label>市:</label>
                            <el-select  @change="cityChange" v-model="value2" size='small' style="width: 126px;" placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label>区/县:</label>
                            <el-select v-model="value3" size='small' style="width: 126px;" placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <label>地址:</label>
                            <input type="text" v-model="LampPoleData.location" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入地址">
                        </div> 
                        <div class="form-group" style=" justify-content: left;margin-left: 35px;">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="1"
                                style="width:126px;"
                                placeholder="请输入内容"
                                v-model="LampPoleData.remark">
                            </el-input>
                            <label><span class="Required">*</span>灯杆编号:</label>
                            <input type="text" v-model="LampPoleData.serialNumber" id="serialNumber" class="form-control" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入灯杆编号">
                        </div>
                        <div class="form-group" v-if="addtype=='0'">
                            <el-button v-if="addLamp" @click="addlamp(0)" type="primary" size='small'>添加灯具</el-button>
                            <el-button v-if="relationLamp" @click="LampPole_data(0)" type="primary" size='small'>关联灯具</el-button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联灯具 -->
        <div class="modal fade" id="LampPole_click"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button v-if="relationLamp" @click="LampPole_data(1)" type="primary" size='small'>关联灯具</el-button>
                            <el-button v-if="relationLamp" @click="LampPole_data(2)" type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: left;">已关联灯具</div>
                        <el-table
                            :data="tableData2"
                            @row-click="clickRow2" 
                            ref="moviesTable2"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange2"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="名称"
                            width="102">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            label="终端ID"
                            :formatter="formatRole"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="concentratorSN"
                            align='center'
                            label="控制器ID"
                            :formatter="formatRole"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="型号"
                            :formatter="formatRole"
                            width="90">
                            </el-table-column>
                            <el-table-column
                            prop="lampNumber"
                            align='center'
                            label="编号"
                            :formatter="formatRole"
                            width="80">
                            </el-table-column>
                        </el-table>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联灯具 -->
        <div class="modal fade" id="LampPole_data"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择灯具进行关联</h4>
                    </div>
                    <div class="modal-body" style='max-height:600px;overflow:auto;'>
                        <el-table
                            :data="tableData3"
                            @row-click="clickRow3" 
                            ref="multipleTable"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange3"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="名称"
                            width="102">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            label="终端ID"
                            :formatter="formatRole"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="concentratorSN"
                            align='center'
                            label="控制器ID"
                            :formatter="formatRole"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="型号"
                            :formatter="formatRole"
                            width="90">
                            </el-table-column>
                            <el-table-column
                            prop="lampNumber"
                            align='center'
                            label="编号"
                            :formatter="formatRole"
                            width="60">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange3"
                            @current-change="currentchange3"
                            :current-page="pageIndex3"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize3"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total3">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Relation" class="btn btn-primary">确认</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联广告屏 -->
        <div class="modal fade" id="relevanceadvertising"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button v-if='relationScreen' @click="relevancelanterntwo(0)" type="primary" size='small'>关联屏幕</el-button>
                            <el-button v-if='relationScreen' @click="relevancelanterntwo(1)" type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: left;">已关联屏幕</div>
                        <el-table
                            :data="tableData4"
                            @row-click="clickRow4" 
                            ref="moviesTable4"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange4"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="名称"
                            width="122">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            label="屏幕序列号"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="设备型号"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'
                            width="130">
                            </el-table-column>
                        </el-table>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联广告屏 -->
        <div class="modal fade" id="relevanceadvertisingtwo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择屏幕进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData5"
                            @row-click="clickRow5" 
                            ref="moviesTable5"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange5"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="nickName"
                            align='center'
                            label="名称"
                            width="122">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            label="屏幕序列号"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="设备型号"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'
                            width="130">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange5"
                            @current-change="currentchange5"
                            :current-page="pageIndex5"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total5">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="Relationtwo" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联气象站 -->
        <div class="modal fade" id="sensorModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button v-if="relationSensor" @click="sensor_data(0)" type="primary" size='small'>关联气象站</el-button>
                            <el-button v-if="relationSensor" @click="sensor_data(1)" type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: left;">已关联气象站</div>
                        <el-table
                            :data="tableData6"
                            @row-click="clickRow6" 
                            ref="moviesTable6"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange6"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
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
                            width="102">
                            </el-table-column>
                            <el-table-column
                            prop="concentratorSN"
                            align='center'
                            label="集中器标识"
                            :formatter="formatRole"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="型号"
                            :formatter="formatRole"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="mark"
                            align='center'
                            label="备注"
                            width="180"
                            :formatter="formatRole">
                            </el-table-column>
                        </el-table>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联气象站 -->
        <div class="modal fade" id="sensorModalTwo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择气象站进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData7"
                            @row-click="clickRow7" 
                            ref="moviesTable7"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange7"
                            style="width: 100%;overflow:auto;height:auto;max-height:90%;margin-bottom:10px;">
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
                            width="102">
                            </el-table-column>
                            <el-table-column
                            prop="concentratorSN"
                            align='center'
                            label="集中器标识"
                            :formatter="formatRole"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            label="型号"
                            :formatter="formatRole"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="mark"
                            align='center'
                            label="备注"
                            width="180"
                            :formatter="formatRole">
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange7"
                            @current-change="currentchange7"
                            :current-page="pageIndex7"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize7"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total7">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="Relationthree" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 添加灯具 -->
        <div class="modal fade" id="addlamp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:500px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加灯具</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><span class="Required">*</span>灯控器标识:</label>
                            <input type="text" v-model="lampData.serialNumber" class="form-control" id="serialNumber" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯序列号">
                            <label><span class="Required">*</span>集中器标识:</label>
                            <input type="text" v-model="lampData.concentratorSN" class="form-control" id="concentratorSN" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入集中器标识">
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>昵称:</label>
                            <input type="text" v-model="lampData.nickName" class="form-control" id="nickName" onblur="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入单灯名称">
                            <label><span class="Required">*</span>型号:</label>
                            <el-select v-model="lampData.modelId" size='small' style='width:126px;' placeholder="请选择">
                                <el-option
                                v-for="item in options4"
                                :key="item.id"
                                :label="item.modelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                        <div class="form-group">
                            <label><span class="Required">*</span>灯具编号:</label>
                            <input type="text" v-model="lampData.lampNumber" class="form-control" id="lampNumber" placeholder="请输入灯具编号(自定义)">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                style="width:126px"
                                :rows="1"
                                v-model="lampData.mark"
                                placeholder="请输入内容">
                            </el-input>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="submitLamp" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 绑定项目 -->
        <div class="modal fade" id="poleBindProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:350px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">绑定项目</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <span style="line-height:35px;">项目:</span>
                            <el-select size='small' v-model="value5" style="margin-left:20px;" placeholder="请选择">
                                <el-option
                                    v-for="item in options5"
                                    style="height:30px;"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="Submit_poleBindProject" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
export default {
    name: 'user',
    data () {
        return {
            serverurl:localStorage.serverurl,
            addPole:false,
            editPole:false,
            delPole:false,
            relationLamp:false,
            relationScreen:false,
            relationSensor:false,
            poleBindProject:false,
            addLamp:false,
            options5:[],
            value5:'',
            site:[], //灯杆列表选中数据
            addtype:'0', //判断是添加还是编辑的参数
            tableData:[],
            pageSize:10,
            pageIndex:1,
            total:10, 
            options: [{
                value: 0,
                label: '普通灯杆'
                }, {
                value: 1,
                label: '智慧灯杆'
            }],
            value: 0,
            nickName:'',
            value_search:'',
            serialNumber:'',
            radio1: '0', //模态框单选按钮
            options1:[],
            value1:'',
            value1_search:'',
            options2:[],
            value2:'',
            value2_search:'',
            options3:[],
            value3:'',
            value3_search:'',
            options4:[],
            lampData:{
                serialNumber:'',
                concentratorSN:'',
                nickName:'',
                modelId:'',
                lampNumber:'1',
                mark:'',
            },//添加灯具的信息
            LampPoleData:{
                nickName:'',
                longitude:'',
                latitude:'',
                
                location:'',
                remark:'',
                serialNumber:''
            },//添加灯杆的信息
            tableData2:[],//已关联灯杆的灯具信息
            site2:[],
            tableData3:[],//未关联灯杆的灯具信息
            RelationType:'',
            poleId:'',
            site3:[],
            pageIndex3:1,
            pageSize3:10,
            total3:10,
            tableData4:[],//已关联灯杆的广告屏信息
            site4:[],
            tableData5:[],
            site5:[],
            pageIndex5:1,
            pageSize5:10,
            total5:10,
            tableData6:[],//已关联灯杆的气象站信息
            site6:[],
            tableData7:[],
            site7:[],
            pageIndex7:1,
            pageSize7:10,
            total7:10,
        }
    },
    mounted(){
        this.province(3)
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
            this.$refs.moviesTable2.toggleRowSelection(row)
        },
        clickRow3(row){
            this.$refs.multipleTable.toggleRowSelection(row)
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
        clickRow7(row){
            this.$refs.moviesTable7.toggleRowSelection(row)
        },
        //省请求
        province(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getSonArea',
                contentType:'application/json;charset=UTF-8',
                data:{
                    parentId:0,
                    id:1
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options1 = data.result.areas
                        if(val=='3'){
                            // that.value1_search = data.result.areas[0].id
                        }else{
                            if(val=='1'){
                                that.value1 = Number(that.site[0].provinceId)
                            }else{
                                that.value1 = data.result.areas[0].id
                            }
                            that.city(val)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        provinceChange(){
            this.city()
        },
        //获取市的信息
        city(val){
            var that = this;
            var data = {
                id:2
            }
            if(val=='3'){
                data.parentId = that.value1_search
            }else{
                data.parentId = that.value1
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getSonArea',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.areas
                        if(val=='3'){
                            // that.value2_search = data.result.areas[0].id
                        }else{
                            if(val=='1'){
                                that.value2 = Number(that.site[0].cityId)
                            }else{
                                that.value2 = data.result.areas[0].id
                            }  
                            that.area(val)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        cityChange(){
            this.area()
        },
        //获取区的信息
        area(val){
            var that = this;
            var data = {id:3}
            if(val=='3'){
                data.parentId = that.value2_search
            }else{
                data.parentId = that.value2
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/project/getSonArea',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.areas
                        if(val=='3'){
                            // that.value3_search = data.result.areas[0].id
                        }else{
                            if(val=='1'){
                                that.value3 = Number(that.site[0].areaId)
                            }else{
                                that.value3 = data.result.areas[0].id 
                            }
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        // 点击添加还是编辑按钮
        addLampPole(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            // 0位添加 1为编辑
            if(val=='0'){
                $('#addModal').modal('show')
                $('#serialNumber').removeAttr('disabled')
                this.province(0)
                this.addtype = val
                this.LampPoleData.nickName = ''
                this.LampPoleData.longitude = ''
                this.LampPoleData.latitude = ''
                this.LampPoleData.location = ''
                this.LampPoleData.remark = ''
                this.LampPoleData.serialNumber = ''
            }
            if(val=='1'){
                if(this.site.length==0||this.site.length>=2){
                    this.$message({
                        message: '请选择灯杆进行编辑!',
                        type: 'error'
                    });
                    return;
                }
                this.addtype = val
                this.province(1)
                $('#addModal').modal('show')
                $('#serialNumber').attr('disabled','disabled')
                this.LampPoleData.nickName = this.site[0].nickName
                this.value = this.site[0].poleType
                this.LampPoleData.location = this.site[0].location
                this.LampPoleData.remark = this.site[0].remark
                var arr = this.site[0].coord.split(','); 
                this.LampPoleData.longitude = arr[0]
                this.LampPoleData.latitude = arr[1]
                this.LampPoleData.serialNumber = this.site[0].serialNumber
            }
            /* 完成拖拽 */
            $('#addModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addModal').css("overflow", "hidden")
        },
        //添加编辑灯杆保存
        addSubmit(){
            var that = this;
            if(this.LampPoleData.nickName==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            var data = {};
            var url = '';

            var coord = [this.LampPoleData.longitude,this.LampPoleData.latitude];
            var lampIds = []
            if(this.addtype=='0'){
                url='/pole/addPole';
                for(var i=0;i<this.site3.length;i++){
                    lampIds.push(this.site3[i].id)
                }
                data.lampIds = lampIds.join(',')
            }
            if(this.addtype=='1'){url='/pole/updatePole';data.id=this.site[0].id;};
            data.nickName = this.LampPoleData.nickName;
            data.poleType = this.value;
            if(this.LampPoleData.longitude=='0'||this.LampPoleData.latitude==''){
                data.coord=''
            }else{
                data.coord = coord.join(',');
            }
            data.areaId = this.value3;
            data.location = this.LampPoleData.location;
            data.remark = this.LampPoleData.remark;
            data.serialNumber = this.LampPoleData.serialNumber;
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+url,
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '保存成功!',
                            type: 'success'
                        });
                        $('#addModal').modal('hide')
                        that.ready()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        // 列表chang事件
        userSelectionChange(val){
            this.site = val
        },
        //删除按钮
        deleteLampPole(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯杆进行删除!',
                    type: 'warning'
                });
                return;
            }
            var arr = []
            for(var i=0;i<that.site.length;i++){
                arr.push(that.site[i].id)
            }
            this.$confirm('是否删除所选灯杆？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 这里进行删除请求
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/pole/deletePole',
                    data:{
                        ids:arr.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            that.ready()
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
        //绑定项目
        poleBindProjects(){
            var that = this;
            if(this.site.length=='0'){
                this.$message({
                    message: '请选择灯杆进行绑定项目!',
                    type: 'warning'
                });
                return;
            }
            $('#poleBindProjectModal').modal('show')
            this.project()
        },
        //请求所有项目接口
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
                        that.options5 = data.result.projects
                        that.value5 = ''
                    }else{
                        that.errorCode(data.errorCode)
                    }
                },
            })
        },
        //绑定项目提交
        Submit_poleBindProject(){
            var that = this;
            var arr = [];
            for(var i=0;i<this.site.length;i++){
                arr.push(this.site[i].id)
            }
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/poleBindProject',
                data:{
                    poleIds:arr.join(','),
                    projectId:that.value5
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#poleBindProjectModal').modal('hide')
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                },
            })
        },

        //关联灯具
        LampPole_click(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            $('#LampPole_click').modal('show')
            this.poleId = val
            this.LampData1(val)
            /* 完成拖拽 */
            $('#LampPole_click').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#LampPole_click').css("overflow", "hidden")
        },
        //获取已关联此灯杆的灯具
        LampData1(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/lamp/getLampList',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    rows:10,
                    nickName:'',
                    serialNumber:'',
                    areaId:'',
                    poleId:val,
                    projectId:sessionStorage.projectId,
                    online:''
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                        that.total2 = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //灯具选中信息 --  解除关联
        SelectionChange2(val){
            this.site2 = val
        },
        //点击关联/解除关联灯具
        LampPole_data(val){
            var that = this;
            if(val=='0'||val=='1'){
                $('#LampPole_data').modal('show')
                this.LampData2()
                this.RelationType = val
            }
            if(val=='2'){
                if(this.site2.length=='0'){
                    this.$message({
                        message: '请选择灯具解除关联!',
                        type: 'error'
                    });
                    return;
                }
                var data = {};
                var arr = [];
                for(var i=0;i<this.site2.length;i++){
                    arr.push(this.site2[i].id)
                }
                data.lampIds = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lamp/lampUnbindPole',
                    data:data, 
                    success:function(data){
                        console.log(data.errorCode)
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除绑定成功!',
                                type: 'success'
                            });
                            that.LampData1(that.poleId)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
            /* 完成拖拽 */
            $('#LampPole_data').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#LampPole_data').css("overflow", "hidden")
        },
        //获取所有未关联灯杆的灯具信息
        LampData2(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/lamp/getLampList',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex3,
                    rows:that.pageSize3,
                    nickName:'',
                    serialNumber:'',
                    areaId:'',
                    poleId:'0',
                    projectId:sessionStorage.projectId,
                    online:'',
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData3 = data.result.list
                        that.total3 = data.result.total
                        if(that.RelationType=='0'){
                            var arr = []
                            for(let i = 0;i<that.site3.length;i++){
                                for(let j = 0;j<data.result.list.length;j++){
                                    if(that.site3[i].id==data.result.list[j].id){
                                        arr.push(data.result.list[j])
                                    }
                                }
                            }
                            setTimeout(function(){
                                arr.forEach(row => {
                                    that.$refs.multipleTable.toggleRowSelection(row);
                                });
                            },200)
                        }
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        sizechange3(val){this.pageSize3 = val;this.LampData2();},
        currentchange3(val){this.pageIndex3 = val;this.LampData2();},
        //灯具选中信息 ---进行关联
        SelectionChange3(val){
            this.site3 = val
        },
        //关联灯具--确定按钮
        Relation(){
            var that = this
            if(this.RelationType=='0'){
                $('#LampPole_data').modal('hide')
            }
            if(this.RelationType=='1'){
                var data = {};
                var arr = [];
                for(var i = 0;i<that.site3.length;i++){
                    arr.push(that.site3[i].id)
                }
                data.poleId = this.poleId;
                data.lampIds = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/lamp/lampBindPole',
                    data:data, 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '关联成功!',
                                type: 'success'
                            });
                            that.site3 = []
                            $('#LampPole_data').modal('hide')
                            that.LampData1(that.poleId)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },

        //关联广告屏
        relevancelanterns(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            this.poleId = val
            this.relevancelanternsData()
            $('#relevanceadvertising').modal('show')
            /* 完成拖拽 */
            $('#relevanceadvertising').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#relevanceadvertising').css("overflow", "hidden")
        },
        //获取已关联此设备的广告屏
        relevancelanternsData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/getScreenList',
                data:{
                    page:1,
                    rows:10,
                    status:'',
                    serialNumber:'',
                    poleId:this.poleId,
                    projectId:sessionStorage.projectId
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData4 = data.result.list
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        SelectionChange4(val){this.site4=val;},
        //点击关联广告屏
        relevancelanterntwo(val){
            var that = this;
            if(val=='0'){
                this.relevancelanternsDataTwo()
                $('#relevanceadvertisingtwo').modal('show')
            }
            if(val=='1'){
                var that = this
                var data = {};
                var arr = [];
                if(that.site4.length==0){
                    this.$message({
                        message: '请选择屏幕进行解除关联!',
                        type: 'error'
                    });
                    return;
                }
                for(var i = 0;i<that.site4.length;i++){
                    arr.push(that.site4[i].id)
                }
                data.screenIds  = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/screen/screenUnbindPole',
                    data:data, 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.relevancelanternsData(that.poleId)
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
            /* 完成拖拽 */
            $('#relevanceadvertisingtwo').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#relevanceadvertisingtwo').css("overflow", "hidden")
        },
        //获取所有未关联灯杆的广告屏信息
        relevancelanternsDataTwo(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/getScreenList',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:this.pageIndex5,
                    rows:this.pageSize5,
                    status:'',
                    serialNumber:'',
                    poleId:0,
                    projectId:sessionStorage.projectId
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData5 = data.result.list
                        that.total5 = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        SelectionChange5(val){this.site5=val;},
        sizechange5(val){this.pageSize5=val;this.relevancelanternsDataTwo()},
        currentchange5(val){this.pageIndex5=val;this.relevancelanternsDataTwo()},
        //关联广告屏--确定按钮
        Relationtwo(){
            var that = this
            var data = {};
            var arr = [];
            for(var i = 0;i<that.site5.length;i++){
                arr.push(that.site5[i].id)
            }
            data.poleId = this.poleId;
            data.screenIds  = arr.join(',')
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/screen/screenBindPole',
                data:data, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#relevanceadvertisingtwo').modal('hide')
                        that.relevancelanternsData(that.poleId)
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //关联气象站
        sensor(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            this.poleId = val
            this.sensorData();
            $('#sensorModal').modal('show')
            /* 完成拖拽 */
            $('#sensorModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#sensorModal').css("overflow", "hidden")
        },
        //获取已关联灯杆的气象站
        sensorData(){
            var that = this;
            var data = {
                page:1,
                size:10,
                poleId:this.poleId,
                projectId:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/envSensors/getAssociated',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData6 = data.result.list
                        that.total6 = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },  
        SelectionChange6(val){this.site6=val;},
        //点击关联气象站/解除关联气象站
        sensor_data(val){
            var that = this;
            if(val=='0'){
                this.sensorDataTwo()
                $('#sensorModalTwo').modal('show')
            }
            if(val=='1'){
                if(this.site6.length==0){
                    this.$message({
                        message: '请选择气象站进行操作!',
                        type: 'error'
                    });
                    return;
                }
                var data = {};
                var arr = [];
                for(var i = 0;i<that.site6.length;i++){
                    arr.push(that.site6[i].id)
                }
                data.ids  = arr.join(',')
                data.poleId = 0;
                data.projectId = sessionStorage.projectId
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/envSensors/bindPole',
                    data:data, 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.sensorData()
                        }else{
                            that.errorCode2(data.errorCode)
                        }
                    }
                })
            }
        },
        //获取未关联灯杆的气象站
        sensorDataTwo(){
            var that = this;
            var data = {
                page:1,
                size:10,
                poleId:0,
                projectId:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/envSensors/getAssociated',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData7 = data.result.list
                        that.total7 = data.result.total
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },  
        SelectionChange7(val){this.site7=val;},
        sizechange7(val){this.pageSize7=val;this.sensorDataTwo()},
        currentchange7(val){this.pageIndex7=val;this.sensorDataTwo()},
        //关联气象站--确定按钮
        Relationthree(){
            var that = this
            var data = {};
            var arr = [];
            for(var i = 0;i<that.site7.length;i++){
                arr.push(that.site7[i].id)
            }
            data.poleId = this.poleId;
            data.ids = arr.join(',')
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/envSensors/bindPole',
                data:data, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#sensorModalTwo').modal('hide')
                        that.sensorData()
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //添加灯具
        addlamp(){
            var that = this
            $('#addlamp').modal('show')
            $('#lampNumber').attr('disabled','disabled')
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/model/getModel',
                contentType:'application/json;charset=UTF-8',
                data:{
                    modelType:'1'
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options4 = data.result.models
                            that.lampData.modelId = data.result.models[0].id
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
            this.lampData.serialNumber=''
            this.lampData.concentratorSN=''
            this.lampData.nickName='',
            this.lampData.modelName=''
            // this.lampData.lampNumber = ''
            this.lampData.mark=''
            /* 完成拖拽 */
            $('#addlamp').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#addlamp').css("overflow", "hidden")
        },
        //添加灯具保存
        submitLamp(){
            var that = this;
            //中文验证
            var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if(this.lampData.serialNumber==''||this.lampData.concentratorSN==''||this.lampData.nickName==''||this.lampData.lampNumber==''){
                this.$message({
                    message: '必填字段不能为空!',
                    type: 'error'
                });
                return;
            }
            if(result.test(this.lampData.serialNumber)){
                that.$message({
                    message: '终端ID不能有中文',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            if(result.test(this.lampData.concentratorSN)){
                that.$message({
                    message: '控制器ID不能有中文',
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            var data = {};
            data = this.lampData
            data.projectId=sessionStorage.projectId
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/lamp/addLamp',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '添加灯具成功',
                            type: 'success'
                        });
                        $('#addlamp').modal('hide')
                    }else{
                        that.errorCode2(data.errorCode)
                    }
                }
            })
        },
        //获取灯杆列表
        ready(){
            var that = this;
            var areaId='';
            if(that.value3_search!=''){
                areaId = that.value3_search
            }
            if(that.value3_search==''){
                if(that.value2_search!=''){
                    areaId = that.value2_search
                }
            }
            if(that.value3_search==''){
                if(that.value2_search==''){
                    if(that.value1_search!=''){
                        areaId = that.value1_search
                    }
                }
            }
            var data = {
                page:that.pageIndex,
                rows:that.pageSize,
                nickName:that.nickName,
                poleType:that.value_search,
                serialNumber:that.serialNumber,
                areaId:areaId,
                projectId:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/pole/getPoleList',
                contentType:'application/json;charset=UTF-8',
                data:data, 
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
        search(){this.ready()},
        //灯杆列表选中
        SelectionChange(val){this.site = val},
        sizechange(val){this.pageSize = val;this.ready();},
        currentchange(val){this.pageIndex = val;this.ready();},
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
                            if(data.result.operats[i].code=='addPole'){
                                that.addPole = true
                            }
                            if(data.result.operats[i].code=='editPole'){
                                that.editPole = true
                            }
                            if(data.result.operats[i].code=='delPole'){
                                that.delPole = true
                            }

                            if(data.result.operats[i].code=='relationLamp'){
                                that.relationLamp = true
                            }
                            if(data.result.operats[i].code=='relationScreen'){
                                that.relationScreen = true
                            }
                            if(data.result.operats[i].code=='relationSensor'){
                                that.relationSensor = true
                            }
                            if(data.result.operats[i].code=='addLamp'){
                                that.addLamp = true
                            }
                            if(data.result.operats[i].code=='poleBindProject'){
                                that.poleBindProject = true
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
        this.ready()
        this.Jurisdiction()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.LampPole{width: 100%;height: 100%;}
.LampPole>div{width: 100%;position: absolute;}
.LampPole_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.LampPole_top>button{height:33px;margin:8px 0 0 10px;}
.LampPole_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.LampPole_bottom_top{width: 100%;height: 46px;line-height: 46px;text-align: center;display: flex;justify-content: center;}
.LampPole_bottom_bottom{position: absolute;top:46px;bottom: 0;left: 0;right: 0;padding:5px;}
.block{text-align: center;}


.modal-body>div{margin-bottom: 10px;text-align: center;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 75px;line-height: 34px;text-align: center;}
.form-group>input{width: 125px;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}

.search{display: flex;}
.search>label{width: 85px;}
.search>input{width: 146px;margin-top:7px;height: 34px;}
</style>