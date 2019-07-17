<template>
    <div class="LampPole">
        <!-- 灯杆模式 -->
        <div class="LampPole_top">
            <el-button v-if="addPole" @click="addLampPole(0)" type="primary" icon='el-icon-plus' size='small'>添加</el-button>
            <el-button v-if="editPole" @click="addLampPole(1)" type="primary" icon="el-icon-edit" size='small'>编辑</el-button>
            <el-button v-if="delPole" @click="deleteLampPole" type="primary" icon='el-icon-delete' size='small'>删除</el-button>
            <el-dropdown v-if="poleBindProject" size="small" split-button type="primary">
                <i class="el-icon-setting el-icon--left"></i>设置
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="poleBindProjects">绑定项目</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="search">
                <el-dropdown size="small" split-button @command="handleCommand">
                    {{name}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="name='名称';type='1';">名称</el-dropdown-item>
                        <el-dropdown-item @click.native="name='序列号';type='2';">序列号</el-dropdown-item>
                        <el-dropdown-item @click.native="name='类别';type='3';">类型</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <template v-if="type=='1'">
                        <el-input v-model="nickName" size="small" placeholder="请输入名称" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='2'">
                        <el-input v-model="serialNumber" size="small" placeholder="请输入序列号" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></el-input>
                    </template>
                    <template v-if="type=='3'">
                        <el-select v-model="value_search" size='small' style="width:194px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div>
                    <el-button @click="search" type="primary" size='small' icon="el-icon-search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="LampPole_bottom">
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
                label="名称"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                align='center'
                label="序列号"
                min-width="80">
                </el-table-column>
                <el-table-column
                align='center'
                label="类型"
                min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.poleType=='0'">普通灯杆</span>
                        <span v-if="scope.row.poleType=='1'">智慧灯杆</span>
                    </template>
                </el-table-column>
                <el-table-column
                align='center'
                label="灯具"
                min-width="80">
                    <template slot-scope="scope">
                        <button @click="LampPole_click(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                    </template>
                </el-table-column>
                <el-table-column
                label="LED屏幕"
                align='center'
                min-width="80">
                    <template slot-scope="scope">
                        <button @click="relevancelanterns(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                    </template>
                </el-table-column>
                <el-table-column
                label="传感器"
                align='center'
                min-width="80">
                    <template slot-scope="scope">
                        <button @click="loar(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                    </template>
                </el-table-column>
                <el-table-column
                label="气象站"
                align='center'
                min-width="80">
                    <template slot-scope="scope">
                        <button @click="sensor(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                    </template>
                </el-table-column>
                <el-table-column
                label="摄像头"
                align='center'
                min-width="80">
                    <template slot-scope="scope">
                        <button @click="camera(scope.row.id)" style="height:20px;line-height:15px;">...</button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                align='center'
                :formatter="formatRole"
                min-width="120">
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
                            <label><span class="Required">*</span>名称:</label>
                            <input type="text" v-model="LampPoleData.nickName" class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入名称">
                        </div>
                        <div class="form-group">
                            <label><span class="Required">*</span>序列号:</label>
                            <input type="text" v-model="LampPoleData.serialNumber" id="serialNumber" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入序列号">
                        </div>
                        <div class="form-group">
                            <label>灯杆类型:</label>
                            <el-select v-model="value" size='small' style="width:195px" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <!--<div class="form-group">
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
                            <input type="text" v-model="LampPoleData.location" class="form-control" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入地址">
                        </div>  -->
                        <div class="form-group">
                            <label>位置:</label>
                            <input type="text" v-model="LampPoleData.coord" :disabled='true' class="form-control" id="email" oninput="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="地图选点">
                            <i @click="mapClick" class="iconfont icon-baidumap mappoint"></i>
                        </div>
                        <div class="form-group">
                            <label>备注:</label>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:195px;"
                                placeholder="请输入内容"
                                v-model="LampPoleData.remark">
                            </el-input>
                        </div>
                        <!-- <div class="form-group" v-if="addtype=='0'"> -->
                            <!-- <el-button v-if="addLamp" @click="addlamp(0)" type="primary" size='small'>添加灯具</el-button> -->
                            <!-- <el-button v-if="relationLamp" @click="LampPole_data(0)" type="primary" size='small'>关联灯具</el-button> -->
                        <!-- </div> -->
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
                            prop="concentratorSn"
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
                            prop="concentratorSn"
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
                            :formatter="formatRole"
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
                            :formatter="formatRole"
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
                            prop="concentratorSn"
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
                            prop="concentratorSn"
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
        <!-- 关联传感器 -->
        <div class="modal fade" id="loarModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button v-if="relationSensor" @click="loar_data(0)" type="primary" size='small'>关联传感器</el-button>
                            <el-button v-if="relationSensor" @click="loar_data(1)" type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: left;">已关联传感器</div>
                        <el-table
                            :data="tableData8"
                            @row-click="clickRow8" 
                            ref="moviesTable8"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange8"
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
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            :formatter="formatRole"
                            label="序列号"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            :formatter="formatRole"
                            label="型号"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            align='center'
                            label="备注"
                            :formatter="formatRole"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联传感器 -->
        <div class="modal fade" id="loarModalTwo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4>请选择传感器进行关联</h4>
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData9"
                            @row-click="clickRow9" 
                            ref="moviesTable9"
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange9"
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
                            :formatter="formatRole"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="serialNumber"
                            align='center'
                            :formatter="formatRole"
                            label="序列号"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="modelName"
                            align='center'
                            :formatter="formatRole"
                            label="型号"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            align='center'
                            label="备注"
                            :formatter="formatRole"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange9"
                            @current-change="currentchange9"
                            :current-page="pageIndex9"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize9"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total9">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="Relationfour" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 关联摄像头 -->
        <div class="modal fade" id="camearModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <div>
                            <el-button v-if="relationSensor" @click="camear_data(0)" type="primary" size='small'>关联摄像头</el-button>
                            <el-button v-if="relationSensor" @click="camear_data(1)" type="primary" size='small'>解除关联</el-button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: left;">已关联摄像头</div>
                        <el-table
                            :data="tableData10" 
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange10"
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
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="ipAddress"
                            align='center'
                            label="IP"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="producerName"
                            align='center'
                            label="厂商"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="cameraNumber"
                            align='center'
                            label="编号"
                            :formatter="formatRole"
                            xshow-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 点击关联摄像头 -->
        <div class="modal fade" id="camearModalTwo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        请选择摄像头进行关联
                    </div>
                    <div class="modal-body">
                        <el-table
                            :data="tableData11" 
                            border
                            stripe
                            size='small'
                            tooltip-effect="dark"
                            @selection-change="SelectionChange11"
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
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="ipAddress"
                            align='center'
                            label="IP"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="producerName"
                            align='center'
                            label="厂商"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="cameraNumber"
                            align='center'
                            label="编号"
                            :formatter="formatRole"
                            xshow-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            background
                            @size-change="sizechange11"
                            @current-change="currentchange11"
                            :current-page="pageIndex11"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize11"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total11">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button @click="RelationFive" type="button" class="btn btn-primary">确定</button>
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
        <!-- 地图选点 -->
        <div class="modal fade" id="map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:700px;">
                <div class="modal-content">
                    <div class="modal-body map_Z" style='height:550px'>
                        <div>点击地图选取坐标--坐标:{{referencePosition}}</div>
                        <div>
                            <div style="width:100%;height:100%;" id="allmap">

                            </div>
                        </div>
                        <div>
                            <el-button @click="mapSubmit" type="primary" size='mini'>确定</el-button>
                        </div>
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
            name:'名称',
            type:'1',
            type:'1',
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
            options2:[],
            value2:'',
            options3:[],
            value3:'',
            
            referencePosition:'',
            LampPoleData:{
                nickName:'',
                serialNumber:'',
                // location:'',
                coord:'',
                remark:'',
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
            tableData8:[], //传感器
            site8:[],
            tableData9:[],
            site9:[],
            pageIndex9:1,
            pageSize9:10,
            total9:10,
            tableData10:[], //摄像头
            site10:[],
            tableData11:[],
            site11:[],
            pageIndex11:1,
            pageSize11:10,
            total11:10,
        }
    },
    mounted(){
        this.province(3)
    },
    methods:{
        handleCommand(){
            this.nickName=''
            this.serialNumber=''
            this.value_search=''
        },
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
        clickRow8(row){
            this.$refs.moviesTable8.toggleRowSelection(row)
        },
        clickRow9(row){
            this.$refs.moviesTable9.toggleRowSelection(row)
        },
        //点击拉取地图
        mapClick(){
            var that = this
            $('#map').modal('show')
            $('#map').on('shown.bs.modal', function (e) {
                var map = new BMap.Map("allmap",{enableMapClick:false});    // 创建Map实例
                var coord = ''
                if(that.LampPoleData.coord!=''){
                    coord = that.LampPoleData.coord
                    coord = coord.split(',')
                    var point = new BMap.Point(coord[0],coord[1]);
                    map.centerAndZoom(point, 12);  // 初始化地图,设置中心点坐标和地图级别
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                }else{
                    map.centerAndZoom(sessionStorage.areaname, 12);  // 初始化地图,设置中心点坐标和地图级别
                }
                map.addEventListener("click", function(e){
                    map.clearOverlays();
                    var point = new BMap.Point(e.point.lng,e.point.lat);
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中  
                    that.referencePosition = e.point.lng+','+e.point.lat   
                });
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var size = new BMap.Size(10, 20);
                map.addControl(new BMap.CityListControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: size,
                }));
            })
        },
        //地图确定
        mapSubmit(){
            $('#map').modal('hide')
            this.LampPoleData.coord = this.referencePosition
        },
        //省请求
        province(val){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/0',
                contentType:'application/json;charset=UTF-8',
                data:{
                    id:1
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options1 = data.result.areas
                        if(val=='3'){
                            
                        }else{
                            if(val=='1'){
                                if(that.site[0].provinceId==''||that.site[0].provinceId==null||that.site[0].provinceId==undefined){}else{
                                    that.value1 = Number(that.site[0].provinceId)
                                }
                            }else{
                                that.value1 = data.result.areas[0].id
                            }
                            that.city(val)
                        }
                    }else{
                        that.errorCode(data)
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
            data.parentId = that.value1
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value1,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options2 = data.result.areas
                        if(val=='3'){

                        }else{
                            if(val=='1'){
                                if(that.site[0].cityId==''||that.site[0].cityId==null||that.site[0].cityId==undefined){}else{
                                    that.value2 = Number(that.site[0].cityId)
                                }
                            }else{
                                that.value2 = data.result.areas[0].id
                            }  
                            that.area(val)
                        }
                    }else{
                        that.errorCode(data)
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
            data.parentId = that.value2
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/manage/areas/subset/'+that.value2,
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options3 = data.result.areas
                        if(val=='3'){
                            
                        }else{
                            if(val=='1'){
                                if(that.site[0].areaId==''||that.site[0].areaId==null||that.site[0].areaId==undefined){}else{
                                    that.value3 = Number(that.site[0].areaId)
                                }
                            }else{
                                that.value3 = data.result.areas[0].id 
                            }
                        }
                    }else{
                        that.errorCode(data)
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
                // this.LampPoleData.location = ''
                this.LampPoleData.remark = ''
                this.LampPoleData.serialNumber = ''
                this.LampPoleData.coord = ''
                this.referencePosition = ''
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
                this.LampPoleData.remark = this.site[0].remark
                this.LampPoleData.coord = this.site[0].coord
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
            var type = ''
            var lampIds = []
            if(this.addtype=='0'){
                url='/v1/solin/lighting/pole';
                type = 'post'
                for(var i=0;i<this.site3.length;i++){
                    lampIds.push(this.site3[i].id)
                }
                data.lampIds = lampIds.join(',')
            }
            if(this.addtype=='1'){
                url='/v1/solin/lighting/pole';
                type = 'put'
                data.id=this.site[0].id;
            };
            data.nickName = this.LampPoleData.nickName;
            data.poleType = this.value;
            data.areaId = this.value3;
            // data.location = this.LampPoleData.location;
            data.remark = this.LampPoleData.remark;
            data.serialNumber = this.LampPoleData.serialNumber;
            data.coord = this.LampPoleData.coord
            data.projectId = sessionStorage.projectId
            $.ajax({
                type:type,
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
                        that.errorCode(data)
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
                    url:that.serverurl+'/v1/solin/lighting/pole/deletes',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify({
                        poles:arr
                    }),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            that.ready()
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
                url:that.serverurl+'/v1/manage/owner/projects/type/1',
                contentType:'application/json;charset=UTF-8',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options5 = data.result.projects
                        that.value5 = ''
                    }else{
                        that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/lighting/pole/project',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify({
                    poles:arr,
                    projectId:that.value5
                }),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '绑定成功!',
                            type: 'success'
                        });
                        that.ready()
                        $('#poleBindProjectModal').modal('hide')
                    }else{
                        that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/lighting/lamp',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:50,
                    nickName:'',
                    serialNumber:'',
                    areaId:'',
                    poleId:val,
                    projectIds:sessionStorage.projectId,
                    online:''
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData2 = data.result.list
                    }else{
                        that.errorCode(data)
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
                data.poleId = this.poleId;
                data.lamps = arr
                data.command = '2'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/lamp/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除绑定成功!',
                                type: 'success'
                            });
                            that.LampData1(that.poleId)
                        }else{
                            that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/lighting/lamp',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex3,
                    size:that.pageSize3,
                    nickName:'',
                    serialNumber:'',
                    areaId:'',
                    poleId:'0',
                    projectIds:sessionStorage.projectId,
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
                        that.errorCode(data)
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
                data.lamps = arr
                data.command = '1'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lighting/lamp/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
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
                            that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/screen/device',
                data:{
                    page:1,
                    size:10,
                    status:'',
                    serialNumber:'',
                    poleId:this.poleId,
                    projectIds:sessionStorage.projectId
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData4 = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange4(val){this.site4=val;},
        //点击关联广告屏/解除关联广告屏
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
                data.poleId = this.poleId;
                data.screens  = arr
                data.command = '2'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/screen/device/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data),
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.relevancelanternsData(that.poleId)
                        }else{
                            that.errorCode(data)
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
                url:that.serverurl+'/v1/solin/screen/device',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:this.pageIndex5,
                    size:this.pageSize5,
                    status:'',
                    serialNumber:'',
                    poleId:'0',
                    projectIds:sessionStorage.projectId
                }, 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData5 = data.result.list
                        that.total5 = data.result.total
                    }else{
                        that.errorCode(data)
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
            data.screens  = arr
            data.command = '1'
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/screen/device/pole',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data),
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#relevanceadvertisingtwo').modal('hide')
                        that.relevancelanternsData(that.poleId)
                    }else{
                        that.errorCode(data)
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
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData6 = data.result.list
                        that.total6 = data.result.total
                    }else{
                        that.errorCode(data)
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
                data.envs  = arr
                data.poleId = 0;
                data.projectId = sessionStorage.projectId
                data.command = '2'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/sensor/env/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data), 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.sensorData()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //获取未关联灯杆的气象站
        sensorDataTwo(){
            var that = this;
            var data = {
                page:that.pageIndex7,
                size:that.pageSize7,
                poleId:'0',
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData7 = data.result.list
                        that.total7 = data.result.total
                    }else{
                        that.errorCode(data)
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
            data.envs = arr
            data.projectId = sessionStorage.projectId
            data.command = '1'
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/sensor/env/pole',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data), 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#sensorModalTwo').modal('hide')
                        that.sensorData()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },

        //关联传感器
        loar(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            this.poleId = val
            this.loarData();
            $('#loarModal').modal('show')
            /* 完成拖拽 */
            $('#loarModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#loarModal').css("overflow", "hidden")
        },
        //获取已关联传感器
        loarData(){
            var that = this;
            var data = {
                page:1,
                size:10,
                command:'1',
                poleId:this.poleId,
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/pole',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData8 = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取未关联传感器
        loarData2(){
            var that = this;
            var data = {
                page:that.pageIndex9,
                size:that.pageSize9,
                command:'2',
                poleId:this.poleId,
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/pole',
                contentType:'application/json;charset=UTF-8',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData9 = data.result.list
                        that.total9 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange8(val){this.site8=val;},
        SelectionChange9(val){this.site9=val;},
        sizechange9(val){this.pageSize9=val;this.loarData2()},
        currentchange9(val){this.pageIndex9=val;this.loarData2()},
        //点击关联传感器/解除关联传感器
        loar_data(val){
            var that = this;
            if(val=='0'){
                this.loarData2()
                $('#loarModalTwo').modal('show')
            }
            if(val=='1'){
                if(this.site8.length==0){
                    this.$message({
                        message: '请选择传感器进行操作!',
                        type: 'error'
                    });
                    return;
                }
                var data = {};
                var arr = [];
                for(var i = 0;i<that.site8.length;i++){
                    arr.push(that.site8[i].id)
                }
                data.loraSensors  = arr
                data.poleId = 0;
                data.projectId = sessionStorage.projectId
                data.command = '2'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/lora/device/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data), 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.loarData()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //关联传感器--确定按钮
        Relationfour(){
            var that = this
            var data = {};
            var arr = [];
            for(var i = 0;i<that.site9.length;i++){
                arr.push(that.site9[i].id)
            }
            data.poleId = this.poleId;
            data.loraSensors = arr
            data.projectId = sessionStorage.projectId
            data.command = '1'
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lora/device/pole',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data), 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#loarModalTwo').modal('hide')
                        that.loarData()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },

        //关联摄像头
        camera(val){
            if(sessionStorage.projectId=='0'){
                this.$message({
                    message: '此操作请选择具体项目!',
                    type: 'warning'
                });
                return;
            }
            this.poleId = val
            this.cameraData();
            $('#camearModal').modal('show')
            /* 完成拖拽 */
            $('#camearModal').draggable({
                cursor: "move",
                handle: '.modal-header'
            });
            $('#camearModal').css("overflow", "hidden")
        },
        //获取已关联摄像头
        cameraData(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/pole',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:1,
                    size:10,
                    poleId:that.poleId,
                    command :'1',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData10 = data.result.list
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        //获取未关联摄像头
        cameraData2(){
            var that = this;
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/pole',
                contentType:'application/json;charset=UTF-8',
                data:{
                    page:that.pageIndex11,
                    size:that.pageSize11,
                    poleId:that.poleId,
                    command :'2',
                    projectIds:sessionStorage.projectId,
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        that.tableData11 = data.result.list
                        that.total11 = data.result.total
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },
        SelectionChange10(val){this.site10=val;},
        SelectionChange11(val){this.site11=val;},
        sizechange11(val){this.pageSize11=val;this.cameraData2()},
        currentchange11(val){this.pageIndex11=val;this.cameraData2()},
        camear_data(val){
            var that = this;
            if(val=='0'){
                this.cameraData2()
                $('#camearModalTwo').modal('show')
            }
            if(val=='1'){
                if(this.site10.length==0){
                    this.$message({
                        message: '请选择摄像头进行操作!',
                        type: 'error'
                    });
                    return;
                }
                var data = {};
                var arr = [];
                for(var i = 0;i<that.site10.length;i++){
                    arr.push(that.site10[i].id)
                }
                data.cameras  = arr
                data.poleId = that.poleId;
                data.projectId = sessionStorage.projectId
                data.command = '2'
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    url:that.serverurl+'/v1/solin/camera/device/pole',
                    contentType:'application/json;charset=UTF-8',
                    data:JSON.stringify(data), 
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '解除关联成功!',
                                type: 'success'
                            });
                            that.cameraData()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        //关联摄像头确认按钮
        RelationFive(){
            var that = this
            if(this.site11.length==0){
                this.$message({
                    message: '请选择摄像头进行操作!',
                    type: 'error'
                });
                return;
            }
            var data = {};
            var arr = [];
            for(var i = 0;i<that.site11.length;i++){
                arr.push(that.site11[i].id)
            }
            data.cameras  = arr
            data.poleId = that.poleId;
            data.projectId = sessionStorage.projectId
            data.command = '1'
            $.ajax({
                type:'post',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/camera/device/pole',
                contentType:'application/json;charset=UTF-8',
                data:JSON.stringify(data), 
                success:function(data){
                    if(data.errorCode=='0'){
                        that.$message({
                            message: '关联成功!',
                            type: 'success'
                        });
                        $('#camearModalTwo').modal('hide')
                        that.cameraData()
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        },

        //获取灯杆列表
        ready(){
            var that = this;
            var areaId='';
            var data = {
                page:that.pageIndex,
                size:that.pageSize,
                nickName:that.nickName,
                poleType:that.value_search,
                serialNumber:that.serialNumber,
                projectIds:sessionStorage.projectId
            }
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                url:that.serverurl+'/v1/solin/lighting/pole',
                contentType:'application/json;charset=UTF-8',
                data:data, 
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
                url:that.serverurl+'/v1/manage/operat/'+sessionStorage.menuId3,
                contentType:'application/json;charset=UTF-8',
                data:{},
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

                            if(data.result.operats[i].code=='poleAssociateLamp'){
                                that.relationLamp = true
                            }
                            if(data.result.operats[i].code=='poleAssociateScreen'){
                                that.relationScreen = true
                            }
                            if(data.result.operats[i].code=='poleAssociateEnv'){
                                that.relationSensor = true
                            }
                            if(data.result.operats[i].code=='addPoleLamp'){
                                that.addLamp = true
                            }
                            if(data.result.operats[i].code=='setPoleProject'){
                                that.poleBindProject = true
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
        that.Jurisdiction()
        that.ready()
    },
}
</script>
<style scoped>
.Required{color: red;font-size: 17px;}
.LampPole{width: 100%;height: 100%;}
.LampPole>div{width: 100%;position: absolute;}
.LampPole_top{height: 46px;border: 1px solid #E4E4F1;border-bottom: none !important;display: flex;}
.LampPole_top>button,.LampPole_top>div{height:33px;margin:8px 0 0 10px;}
.LampPole_bottom{top: 46px;bottom: 0;border: 1px solid #E4E4F1;padding: 5px;overflow: auto;}
.block{text-align: center;}


.modal-body>div{margin-bottom: 10px;text-align: center;}
.form-group{display:flex;justify-content: center;}
.form-group>label{width: 95px;line-height: 34px;text-align: center;}
.form-group>input{width: 195px;}
.mappoint{font-size: 24px;position: absolute;right: 110px;cursor: pointer;}
.modal_body_table>div{margin-bottom: 10px;border: 1px solid #E4E4F1;padding: 5px;text-align: center;}

.search{display: flex;align-items: center;margin-left: 50px !important;}
.search>div{margin-left: 5px;}
.search>input{width: 146px;}

.map_Z{margin: 0;padding: 0;position: relative;}
.map_Z>div:nth-of-type(1){width: 100%;height: 30px;line-height: 30px;}
.map_Z>div:nth-of-type(2){width: 100%;position: absolute;top: 30px;bottom: 30px;}
.map_Z>div:nth-of-type(3){width: 100%;height: 30px;line-height: 30px;position: absolute;bottom: 1px;text-align: center;}
</style>