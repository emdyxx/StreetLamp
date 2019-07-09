<template>
  <div class="lamppost">
      <header class="header">
        <i @click="backtrack" class="iconfont icon-fanhui2"></i>
        <div class="lamppost-header-left">
          智慧灯杆系统
        </div>
        <el-select size='small' v-model="value2" @change='projectChange' style="margin-left:20px;" placeholder="请选择">
          <el-option
            v-for="item in options2"
            style="height:30px;"
            :key="item.id"
            :label="item.projectName"
            :value="item.id">
          </el-option>
        </el-select>
        <div class="header_center">
          <template v-for="item in menu">
            <!-- <template v-if="item.code=='poleOverview'">
              <div @click="headercolor(1,item.id)" :class="headercolorType=='1'?'header_center_color':''">灯杆概览</div>
            </template> -->
            <template v-if="item.code=='solinDeviceDeploy'">
              <div @click="headercolor(2,item.id)" :class="headercolorType=='2'?'header_center_color':''">{{item.menuName}}</div>
            </template>
            <template v-if="item.code=='solinDeviceControl'">
              <div @click="headercolor(3,item.id)" :class="headercolorType=='3'?'header_center_color':''">{{item.menuName}}</div>
            </template>
            <template v-if="item.code=='solinDeviceLog'">
              <div @click="headercolor(4,item.id)" :class="headercolorType=='4'?'header_center_color':''">{{item.menuName}}</div>
            </template>
          </template>
        </div>
        <div class="header_right">
          <i @click="backtrack" class="iconfont icon-guanbi"></i>
        </div>
      </header>
      <div class="lamppost_bottom">
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
      headercolorType:'1',
      menu:[],
    }
  },
  methods:{
    backtrack(){
      this.$router.push({'path':'/index'})
      sessionStorage.removeItem('menuId');
      sessionStorage.removeItem('menuId2');
      sessionStorage.removeItem('menuId3');
      sessionStorage.removeItem('projectId');
    },
    headercolor(val,id){
      var that = this
      sessionStorage.menuId2 = id
      sessionStorage.headercolorType = val
      this.headercolorType = val
      if(val=='2'){
        this.$router.push({'path':'/deploy'})
        if(sessionStorage.menuId3=='45'){
            that.$router.push({'path':'/LampPole'})
        }
        if(sessionStorage.menuId3=='46'){
            that.$router.push({'path':'/Lampsandlanterns'})
        }
        if(sessionStorage.menuId3=='47'){
            that.$router.push({'path':'/advertisingscreen'})
        }
        if(sessionStorage.menuId3=='48'){
            that.$router.push({'path':'/sensor'})
        }
        if(sessionStorage.menuId3=='49'){ //loar
            that.$router.push({'path':'/loraSensor'})
        }
        if(sessionStorage.menuId3=='50'){
            that.$router.push({'path':'/solinRelayDeploy'})
        }
        if(sessionStorage.menuId3=='80'){
            that.$router.push({'path':'/concentrator'})
        }
        if(sessionStorage.menuId3=='106'){
            that.$router.push({'path':'/solinCameraDeploy'})
        }
        
      }
      if(val=='3'){
        this.$router.push({'path':'/equipment'})
        if(sessionStorage.menuId3=='51'){
            that.$router.push({'path':'lampslanterns'})
        }
        if(sessionStorage.menuId3=='52'){
            that.$router.push({'path':'advertisingScreens'})
        }
        if(sessionStorage.menuId3=='53'){
            that.$router.push({'path':'sensors'})
        }
        if(sessionStorage.menuId3=='54'){
            that.$router.push({'path':'loraQuery'})
        }
        if(sessionStorage.menuId3=='55'){
            that.$router.push({'path':'Relay'})
        }
        if(sessionStorage.menuId3=='107'){
            that.$router.push({'path':'CameraManage'})
        }
      }
      if(val=='4'){
        this.$router.push({'path':'/DeviceLog'})
        if(sessionStorage.menuId3=='56'){
            that.$router.push({'path':'/LampPoleJournal'})
        }
        if(sessionStorage.menuId3=='57'){
            that.$router.push({'path':'/lampJournal'})
        }
        if(sessionStorage.menuId3=='58'){
            that.$router.push({'path':'/screenJournal'})
        }
        if(sessionStorage.menuId3=='59'){
            that.$router.push({'path':'/sensorJournal'})
        }
        if(sessionStorage.menuId3=='60'){
            that.$router.push({'path':'/loraJournal'})
        }
        if(sessionStorage.menuId3=='61'){
            that.$router.push({'path':'/RelayJournal'})
        }
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
        for(var i=0;i<this.options2.length;i++){
            if(this.options2[i].id==val){
                if(this.options2[i].area.name!=null){
                    sessionStorage.areaname = this.options2[i].area.name
                }
            }
        }
        sessionStorage.projectId = this.value2
        this.$router.push({'path':'/Refresh'})
        setTimeout(function(){
            if(sessionStorage.menuId3=='45'){
                that.$router.push({'path':'/LampPole'})
            }
            if(sessionStorage.menuId3=='46'){
                that.$router.push({'path':'/Lampsandlanterns'})
            }
            if(sessionStorage.menuId3=='47'){
                that.$router.push({'path':'/advertisingscreen'})
            }
            if(sessionStorage.menuId3=='48'){
                that.$router.push({'path':'/sensor'})
            }
            if(sessionStorage.menuId3=='49'){
                that.$router.push({'path':'/loraSensor'})
            }
            if(sessionStorage.menuId3=='50'){
                that.$router.push({'path':'/solinRelayDeploy'})
            }
            if(sessionStorage.menuId3=='51'){
                that.$router.push({'path':'/lampslanterns'})
            }
            if(sessionStorage.menuId3=='52'){
                that.$router.push({'path':'/advertisingScreens'})
            }
            if(sessionStorage.menuId3=='53'){
                that.$router.push({'path':'/sensors'})
            }
            if(sessionStorage.menuId3=='55'){
                that.$router.push({'path':'Relay'})
            }
            if(sessionStorage.menuId3=='56'){
                that.$router.push({'path':'/LampPoleJournal'})
            }
            if(sessionStorage.menuId3=='57'){
                that.$router.push({'path':'/lampJournal'})
            }
            if(sessionStorage.menuId3=='58'){
                that.$router.push({'path':'/screenJournal'})
            }
            if(sessionStorage.menuId3=='59'){
                that.$router.push({'path':'/sensorJournal'})
            }
            if(sessionStorage.menuId3=='60'){
                that.$router.push({'path':'/loraJournal'})
            }
            if(sessionStorage.menuId3=='61'){
                that.$router.push({'path':'/RelayJournal'})
            }
            if(sessionStorage.menuId3=='54'||sessionStorage.menuId3=='64'||sessionStorage.menuId3=='65'||sessionStorage.menuId3=='66'||sessionStorage.menuId3=='67'||sessionStorage.menuId3=='68'||sessionStorage.menuId3=='69'||sessionStorage.menuId3=='70'){
                that.$router.push({'path':'loading'})
                setTimeout(function(){
                    that.$router.push({'path':'loraQuery'})
                },200)
            }
            if(sessionStorage.menuId3=='80'){
                that.$router.push({'path':'/concentrator'})
            }
            if(sessionStorage.menuId3=='106'){
                that.$router.push({'path':'/solinCameraDeploy'})
            }
            if(sessionStorage.menuId3=='107'){
                that.$router.push({'path':'CameraManage'})
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
                      if(data.result.menus[0].id=='34'){
                        sessionStorage.headercolorType = '2'
                        that.$router.push({'path':'/deploy'})
                      }
                      if(data.result.menus[0].id=='35'){
                        sessionStorage.headercolorType = '3'
                        that.$router.push({'path':'/equipment'})
                      }
                      if(data.result.menus[0].id=='36'){
                        sessionStorage.headercolorType = '4'
                        that.$router.push({'path':'/DeviceLog'})
                      }
                    }
                }else{
                    that.errorCode(data)
                }
            },
        })
    },
  },
  created(){
    this.headercolorType = sessionStorage.headercolorType
    this.project()
  },
}
</script>
<style scoped>
.lamppost{width: 100%;height: 100%;}
.header{width:100%;height: 60px;background: #409EFF;display: flex;align-items: center;}
.header>i{font-size: 32px;color: white;cursor: pointer;position: absolute;left: 20px;top:10px;}
.header>i:hover{color: aquamarine;}
.lamppost-header-left{height: 100%;display: inline-block;margin-left: 70px;color: white;font-size: 22px;line-height: 60px;}
.lamppost_bottom{width: 100%;position: absolute;top: 60px;bottom: 0;}
.header_center{height: 100%;margin-left: 25px;display: flex;justify-content: center;align-items: center;}
.header_center>div{color: white;font-size: 16px;width: 110px;height: 30px;text-align: center;line-height: 30px;border-radius: 8px;cursor: pointer;}
.header_center>div:hover{background: #66b1ff;}
.header_center_color{background:#2B6BC3;}
.header_right{position: absolute;right: 30px;height: 60px;;display: flex;align-items:center;}
.header_right>i{color: white;font-size: 34px;cursor: pointer;}
.header_right>i:hover{color: aquamarine;}
</style>
