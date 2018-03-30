<template>
  <div class="usercenter">
      <header class="header">
        <i @click="backtrack" class="iconfont icon-fanhui2"></i>
        <div class="user-header-left">
          <i class="iconfont icon-hengpai"></i>
          用户中心
        </div>
        <div class="header-center">
          <div @click="headercolor(1)" :class="headercolorType=='1'?'header-center-color':''">用户</div>
          <div @click="headercolor(2)" :class="headercolorType=='2'?'header-center-color':''">机构</div>
          <div @click="headercolor(3)" :class="headercolorType=='3'?'header-center-color':''">项目</div>
          <div @click="headercolor(4)" :class="headercolorType=='4'?'header-center-color':''">日志</div>
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
      headercolorType:'1',
      data: [
        {
          label: '一级 1',
          icon:'el-icon-search',
          id:'1',
          children: [{
            label: '二级 1-1',
            icon:'el-icon-search',
            id:'2',
          },{
            label: '二级 1-2',
            icon:'el-icon-search',
            id:'3',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  mounted(){
    
  },
  methods:{
    headercolor(val){
      this.headercolorType = val;
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
    }
  },
  created(){
    
  },
}
</script>
<style lang='less' scoped>
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
