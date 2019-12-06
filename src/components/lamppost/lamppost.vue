<template>
  <div class="OverallSituation">
      <header class="header">
        <div class="backtrack" @click="backtrack">
            <i class="iconfont icon-fanhuishangyiji1"></i>
            <span>返回</span>
        </div>
        <div class="header-left">
            <img src="../../assets/header-img.png" alt="">
        </div>
        <el-select size='small' id="borderRadiu40" v-model="value2" @change='projectChange' style="margin-left:55px;width:225px;" placeholder="请选择">
          <el-option
            v-for="item in options2"
            style="height:30px;"
            :key="item.id"
            :label="item.projectName"
            :value="item.id">
          </el-option>
        </el-select>
        <div class="header-center">
          <template v-for="item in menu">
            <template v-if="item.code=='solinDeviceDeploy'">
                <div @click="headercolor(2,item.id)" :class="headercolorType=='2'?'header-center-color':''" :key="item.id">
                    <p class="iconfont icon-yunbushu" style="font-size:32px;padding-top:1px;"></p>
                    {{item.menuName}}
                </div>
            </template>
            <template v-if="item.code=='solinDeviceControl'">
                <div @click="headercolor(3,item.id)" :class="headercolorType=='3'?'header-center-color':''" :key="item.id">
                    <p class="iconfont icon-mofagongjubao-ss"></p>
                    {{item.menuName}}
                </div>
            </template>
            <template v-if="item.code=='solinDeviceLog'">
                <div @click="headercolor(4,item.id)" :class="headercolorType=='4'?'header-center-color':''" :key="item.id">
                    <p class="iconfont icon-shebeirizhi"></p>
                    {{item.menuName}}
                </div>
            </template>
          </template>
        </div>
        <!-- <div class="header-right">
          <i @click="backtrack" class="iconfont icon-guanbi"></i>
        </div> -->
      </header>
      <div class="footer">
        <router-view></router-view> 
      </div>
  </div>
</template>
<script>
export default {
  name: 'lamppost',
  data () {
    return {
      serverurl:localStorage.serverurl,
      options2: [],
      value2: '',
      headercolorType:'',
      menu:[],
    }
  },
  methods:{
    backtrack(){
        this.$router.push({path:'/index'})
        sessionStorage.removeItem('menuId');
        sessionStorage.removeItem('menuId2');
        sessionStorage.removeItem('menuId3');
        sessionStorage.removeItem('projectId');
    },
    headercolor(val,id){
      var that = this
      if(val==this.headercolorType){return;}
      sessionStorage.menuId2 = id
      sessionStorage.headercolorType = val
      sessionStorage.removeItem('menuId3');
      this.headercolorType = val
      if(val=='2'){
        this.$router.push({'path':'/deploy'})
      }
      if(val=='3'){
        this.$router.push({'path':'/equipment'})
      }
      if(val=='4'){
        this.$router.push({'path':'/DeviceLog'})
      }
    },
    //获取有权限的项目
    project(){
      var that = this;
      $.ajax({
        type:'get',
        async:true,
        dataType:'json',
        url:that.serverurl+'/v1/manage/owner/projects/type/2',
        contentType:'application/json;charset=UTF-8',
        data:{},
        success:function(data){
          if(data.errorCode=='0'){
            that.Jurisdiction()
            that.options2 = data.result.projects
            if(sessionStorage.projectId==''||sessionStorage.projectId==undefined||sessionStorage.projectId==null){
              that.value2 = that.options2[0].id
              sessionStorage.projectId = that.options2[0].id
              sessionStorage.areaname = that.options2[0].area.name
            }else{
              that.value2 = Number(sessionStorage.projectId)
            }
          }else{
            that.Jurisdiction()
            that.errorCode(data)
          }
        },
      })
    },
    projectChange(val){
        var that = this;
        if(val!='0'){
            for(var i=0;i<this.options2.length;i++){
                if(this.options2[i].id==val){
                    if(this.options2[i].area.name!=null){
                        sessionStorage.areaname = this.options2[i].area.name
                    }
                }
            }
        }
        sessionStorage.projectId = this.value2
        this.$router.push({'path':'/Refresh'})
        setTimeout(function(){
            if(sessionStorage.menuId2=='36'){
                that.$router.push({'path':'/DeviceLog'})
            }
            if(sessionStorage.menuId3=='45'){
                that.$router.push({'path':'/solinPoleDeploy'})
            }
            if(sessionStorage.menuId3=='46'){
                that.$router.push({'path':'/solinLampDeploy'})
            }
            if(sessionStorage.menuId3=='47'){
                that.$router.push({'path':'/solinScreenDeploy'})
            }
            if(sessionStorage.menuId3=='48'){
                that.$router.push({'path':'/solinEnvDeploy'})
            }
            if(sessionStorage.menuId3=='49'){
                that.$router.push({'path':'/solinLoraSensorsDeploy'})
            }
            if(sessionStorage.menuId3=='50'){
                that.$router.push({'path':'/solinRelayDeploy'})
            }
            if(sessionStorage.menuId3=='51'){
                that.$router.push({'path':'/solinLampManage'})
            }
            if(sessionStorage.menuId3=='52'){
                that.$router.push({'path':'/solinScreenManage'})
            }
            if(sessionStorage.menuId3=='53'){
                that.$router.push({'path':'/solinEnvManage'})
            }
            if(sessionStorage.menuId3=='55'){
                that.$router.push({'path':'solinRelayManage'})
            }
            if(sessionStorage.menuId3=='54'||sessionStorage.menuId3=='64'||sessionStorage.menuId3=='65'||sessionStorage.menuId3=='66'||sessionStorage.menuId3=='67'||sessionStorage.menuId3=='68'||sessionStorage.menuId3=='69'||sessionStorage.menuId3=='70'||sessionStorage.menuId3=='117'){
                that.$router.push({'path':'loading'})
                setTimeout(function(){
                    that.$router.push({'path':'solinLoraSensorsManage'})
                },200)
            }
            if(sessionStorage.menuId3=='80'){
                that.$router.push({'path':'/solinConcentratorDeploy'})
            }
            if(sessionStorage.menuId3=='87'){
                that.$router.push({'path':'/solinIlluminance'})
            }
            if(sessionStorage.menuId3=='106'){
                that.$router.push({'path':'/solinCameraDeploy'})
            }
            if(sessionStorage.menuId3=='107'){
                that.$router.push({'path':'solinCameraManage'})
            }
            if(sessionStorage.menuId3=='88'){
                that.$router.push({'path':'solinIlluminanceManage'})
            }
            if(sessionStorage.menuId3=='118'){
                that.$router.push({'path':'/solinSceneryControllerDeploy'})
            }
            if(sessionStorage.menuId3=='119'){
                that.$router.push({'path':'solinSceneryControllerManage'})
            }
            if(sessionStorage.menuId3=='138'){
                that.$router.push({'path':'/solinRadarDeploy'})
            }
            if(sessionStorage.menuId3=='139'){
                that.$router.push({'path':'/solinRadarManage'})
            }
        },200)
    },
    //请求权限
    Jurisdiction(){
        var that = this;
        $.ajax({
            type:'get',
            async:true,
            dataType:'json',
            url:that.serverurl+'/v1/manage/menu/'+sessionStorage.menuId,
            contentType:'application/json;charset=UTF-8',
            data:{},
            success:function(data){
                if(data.errorCode==0){
                    that.menu = data.result.menus
                    if(sessionStorage.menuId2==''||sessionStorage.menuId2==undefined||sessionStorage.menuId2==null){
                      sessionStorage.menuId2 = data.result.menus[0].id
                    }  
                    if(sessionStorage.menuId2=='34'){
                        that.headercolorType = '2'
                        that.$router.push({'path':'/deploy'})
                    }
                    if(sessionStorage.menuId2=='35'){
                        that.headercolorType = '3'
                        that.$router.push({'path':'/equipment'})
                    }
                    if(sessionStorage.menuId2=='36'){
                        that.headercolorType = '4'
                        that.$router.push({'path':'/DeviceLog'})
                    }
                }else{
                    that.errorCode(data)
                }
            },
        })
    },
  },
  created(){
    this.project()
  },
}
</script>
<style scoped>
.header_center_color{background:#2B6BC3;}
</style>
