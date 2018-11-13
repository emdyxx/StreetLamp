<template>
  <div class="usercenter">
      <header class="header">
        <i @click="backtrack" class="iconfont icon-fanhui2"></i>
        <div class="user-header-left">
          <i class="iconfont icon-hengpai"></i>
          系统管理
        </div>
        <div class="header-center">
          <template v-for="item in menu">
            <template v-if="item.code=='userManage'">
              <div @click="headercolor(1,item.id)" :class="headercolorType=='1'?'header-center-color':''">用户</div>
            </template>
            <template v-if="item.code=='orgManage'">
              <div @click="headercolor(2,item.id)" :class="headercolorType=='2'?'header-center-color':''">机构</div>
            </template>
            <template v-if="item.code=='projectManage'">
              <div @click="headercolor(3,item.id)" :class="headercolorType=='3'?'header-center-color':''">项目</div>
            </template>
            <template v-if="item.code=='managementLog'">
              <div @click="headercolor(4,item.id)" :class="headercolorType=='4'?'header-center-color':''">日志</div>
            </template>
          </template>
        </div>
        <div class="header-right">
          <i @click="backtrack" class="iconfont icon-guanbi"></i>
        </div>
      </header>
      <div class="bottom">
        <router-view></router-view> 
      </div>
  </div>
</template>

<script>
export default {
  name: 'usercenter',
  data () {
    return {
      serverurl:localStorage.serverurl,
      headercolorType:'1',
      menu:[],
    }
  },
  mounted(){
    
  },
  methods:{
    headercolor(val,id){
      this.headercolorType = val;
      sessionStorage.menuId2 = id
      sessionStorage.headercolorType = val
      if(val=='1'){
        this.$router.push({'path':'/user'})
      }
      if(val=='2'){
        this.$router.push({'path':'/organization'})
      }
      if(val=='3'){
        this.$router.push({'path':'/article'})
      }
      if(val=='4'){
        this.$router.push({'path':'/journal'})
      }
    },
    backtrack(){
      this.$router.push({'path':'/index'})
      sessionStorage.removeItem('menuId');
      sessionStorage.removeItem('menuId2');
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
                    sessionStorage.menuId2 = data.result.menus[0].id
                    if(data.result.menus[0].id=='3'){
                      sessionStorage.headercolorType = '1'
                      that.$router.push({'path':'/user'})
                    }
                    if(data.result.menus[0].id=='4'){
                      sessionStorage.headercolorType = '2'
                      that.$router.push({'path':'/organization'})
                    }
                    if(data.result.menus[0].id=='5'){
                      sessionStorage.headercolorType = '3'
                      that.$router.push({'path':'/article'})
                    }
                    if(data.result.menus[0].id=='6'){
                      sessionStorage.headercolorType = '4'
                      that.$router.push({'path':'/journal'})
                    }
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
  },
}
</script>
<style scoped>
.usercenter{width: 100%;height: 100%;}
.header{width:100%;height: 60px;background: #409EFF;display: flex;}
.header>i{font-size: 32px;color: white;cursor: pointer;position: absolute;left: 20px;top:10px;}
.header>i:hover{color: aquamarine;}
.user-header-left{height: 100%;display: inline-block;margin-left: 70px;color: white;font-size: 24px;line-height: 50px;}
.user-header-left>i{color: white;font-size: 26px;line-height: 62px;}
.header-center{height: 100%;margin-left: 25px;display: flex;justify-content: center;align-items: center;}
.header-center>div{color: white;font-size: 16px;width: 110px;height: 30px;text-align: center;line-height: 30px;border-radius: 8px;cursor: pointer;}
.header-center>div:hover{background: #66b1ff;}
.header-center-color{background:#2B6BC3;}
.header-right{position: absolute;right: 30px;height: 60px;;display: flex;align-items:center;}
.header-right>i{color: white;font-size: 34px;cursor: pointer;}
.header-right>i:hover{color: aquamarine;}
.bottom{width: 100%;position: absolute;top: 60px;bottom: 0;}
</style>
