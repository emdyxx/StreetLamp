<template>
  <div class="lamppost">
      <header class="header">
        <i @click="backtrack" class="iconfont icon-fanhui2"></i>
        <div class="lamppost-header-left">
          智慧灯杆系统
        </div>
        <el-select size='small' style="margin-left:20px;" v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            style="height:30px;"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <div class="header_center">
          <div @click="headercolor(1)" :class="headercolorType=='1'?'header_center_color':''">总览</div>
          <div @click="headercolor(2)" :class="headercolorType=='2'?'header_center_color':''">设备</div>
          <div @click="headercolor(3)" :class="headercolorType=='3'?'header_center_color':''">部署</div>
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
      options2: [{
          value: '选项1',
          label: '快越科技灯杆系统'
        }, {
          value: '选项2',
          label: '龙泉公安灯杆系统'
      }],
      value2: '选项1',
      headercolorType:'1'
    }
  },
  methods:{
    backtrack(){this.$router.push({'path':'/index'})},
    headercolor(val){
      this.headercolorType = val
      if(val=='1'){
        this.$router.push({'path':'/pandect'})
      }
      if(val=='2'){
        this.$router.push({'path':'/equipment'})
      }
      if(val=='3'){
        this.$router.push({'path':'/deploy'})
      }
    },
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
