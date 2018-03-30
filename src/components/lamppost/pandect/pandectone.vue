<template>
    <div class="pandectone">
        <div class="pandectone_center">
          <div class="pandectone_top">
            <span>设备</span>
            <span>数量</span>
            <span>警报</span>
          </div>
          <div class="pandectone_bottom">
            <div>
              <span>灯杆</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>灯具</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>充电桩</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>广告屏</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>摄像头</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>传感设备</span>
              <span>0</span>
              <span>0</span>
            </div>
            <div>
              <span>WIFI设备</span>
              <span>0</span>
              <span>0</span>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'lamppost',
  data () {
    return {
      
    }
  },
  mounted(){},
  methods:{
    
  },
}
</script>
<style scoped>
.pandectone{width: 100%;height: 100%;padding: 5px;background: url('../../../assets/login/bg0.jpg') no-repeat;display: flex;justify-content: center;align-items: center;}
.pandectone_center{width:350px;height:450px;background: #6E7A81;border-radius: 5px;opacity: 0.7;}
.pandectone_top,.pandectone_bottom>div{width: 90%;padding: 5px;display: flex;justify-content: center;margin: 0 auto;}
.pandectone_top>span,.pandectone_bottom>div>span{display: inline-block;width: 105px;height: 100%;text-align: center;}
.pandectone_top{border-bottom:1px solid white;color: white;height:56px;}
.pandectone_top>span{line-height:56px;}
.pandectone_bottom>div>span{line-height:50px;}
.pandectone_bottom{background: white;width: 90%;margin: 0 auto;margin-top: 20px;border-radius: 5px;}
.pandectone_bottom>div{height: 50px;}
</style>