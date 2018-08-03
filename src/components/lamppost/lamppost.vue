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
            <template v-if="item.menuName=='灯杆概览'">
              <div @click="headercolor(1,item.id)" :class="headercolorType=='1'?'header_center_color':''">灯杆概览</div>
            </template>
            <template v-if="item.menuName=='设备管理'">
              <div @click="headercolor(2,item.id)" :class="headercolorType=='2'?'header_center_color':''">设备管理</div>
            </template>
            <template v-if="item.menuName=='设备部署'">
              <div @click="headercolor(3,item.id)" :class="headercolorType=='3'?'header_center_color':''">设备部署</div>
            </template>
            <template v-if="item.menuName=='设备日志'">
              <div @click="headercolor(4,item.id)" :class="headercolorType=='4'?'header_center_color':''">设备日志</div>
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
    backtrack(){this.$router.push({'path':'/index'})},
    headercolor(val,id){
      var that = this
      sessionStorage.menuId2 = id
      sessionStorage.headercolorType = val
      this.headercolorType = val
      if(val=='1'){
        sessionStorage.menuId3='01'
        this.$router.push({'path':'/pandect'})
      }
      if(val=='2'){
        sessionStorage.menuId3='02'
        this.$router.push({'path':'/equipment'})
      }
      if(val=='3'){
        sessionStorage.menuId3='03'
        this.$router.push({'path':'/deploy'})
      }
      if(val=='4'){
        sessionStorage.menuId3='04'
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
        url:that.serverurl+'/project/getMyAllProject',
        contentType:'application/json;charset=UTF-8',
        data:{},
        success:function(data){
          if(data.errorCode=='0'){
            that.options2 = data.result.projects
            var datas = {
              projectName:'全部',
              id:0,
            } 
            that.options2.unshift(datas)
            that.value2 = that.options2[0].id
            sessionStorage.projectId = that.options2[0].id
          }else{
            that.errorCode(data.errorCode)
          }
        },
      })
    },
    projectChange(){
      var that = this;
      sessionStorage.projectId = this.value2 
      this.$router.push({'path':'/Refresh'})
      setTimeout(function(){
        if(sessionStorage.menuId3=='02'){
            that.$router.push({'path':'/homepage'})
        }
        if(sessionStorage.menuId3=='03'){
            that.$router.push({'path':'/deployhomepage'})
        }
        if(sessionStorage.menuId3=='04'){
            that.$router.push({'path':'/DeviceLog'})
        }
        if(sessionStorage.menuId3=='10'){
            that.$router.push({'path':'/lampslanterns'})
        }
        if(sessionStorage.menuId3=='11'){
            that.$router.push({'path':'/advertisingScreens'})
        }
        if(sessionStorage.menuId3=='14'){
            that.$router.push({'path':'/LampPole'})
        }
        if(sessionStorage.menuId3=='15'){
            that.$router.push({'path':'/Lampsandlanterns'})
        }
        if(sessionStorage.menuId3=='16'){
            that.$router.push({'path':'/advertisingscreen'})
        }
        if(sessionStorage.menuId3=='18'){
            that.$router.push({'path':'/sensor'})
        }
        if(sessionStorage.menuId3=='21'){
            that.$router.push({'path':'/LampPoleJournal'})
        }
        if(sessionStorage.menuId3=='22'){
            that.$router.push({'path':'/lampJournal'})
        }
        if(sessionStorage.menuId3=='23'){
            that.$router.push({'path':'/screenJournal'})
        }
        if(sessionStorage.menuId3=='24'){
            that.$router.push({'path':'/sensorJournal'})
        }
        if(sessionStorage.menuId3=='25'){
            that.$router.push({'path':'sensors'})
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
            url:that.serverurl+'/privilege/getMyMenu',
            contentType:'application/json;charset=UTF-8',
            data:{
                parentId:sessionStorage.menuId
            },
            success:function(data){
                if(data.errorCode==0){
                    that.menu = data.result.menus
                }else{
                    that.errorCode(data.errorCode)
                }
            },
        })
    },
  },
  created(){
    this.headercolorType = sessionStorage.headercolorType
    this.Jurisdiction()
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
