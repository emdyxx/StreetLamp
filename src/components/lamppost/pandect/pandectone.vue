<template>
  <div class="pandectone">
        <div class="pandectone_center">
            
        </div>
  </div>
</template>
<script>
export default {
  name: 'lamppost',
  data () {
    return {
      data:{
          serverurl:localStorage.serverurl,
          poleCount:'',
          poleAlarmCount:'',
          lampCount:'',
          lampAlarmCount:'',
          screenCount:'',
          screenAlarmCount:'',
          sensorsCount:'',
          sensorsAlarmCount:'',
      }
    }
  },
  mounted(){this.ready()},
  methods:{
    ready(){
        var that = this
        // $.ajax({
        //     type:"GET",
        //     url:that.serverurl+'/statistics/getCount',
        //     dataType:"json",
        //     async: false,
        //     data:{projectId:sessionStorage.projectId},
        //     success:function(data){
        //         that.data = data.result
        //     }
        // })
    }
  },
}
</script>
<style scoped>
.pandectone{width: 100%;height: 100%;padding: 5px;background: url('../../../assets/bg4.jpg') no-repeat;display: flex;justify-content: center;align-items: center;background-size:100% 100%;}
/* .pandectone_center{width:350px;height:300px;background: #6E7A81;border-radius: 5px;opacity: 0.7;} */
.pandectone_top,.pandectone_bottom>div{width: 90%;padding: 5px;display: flex;justify-content: center;margin: 0 auto;}
.pandectone_top>span,.pandectone_bottom>div>span{display: inline-block;width: 105px;height: 100%;text-align: center;}
.pandectone_top{border-bottom:1px solid white;color: white;height:56px;}
.pandectone_top>span{line-height:56px;}
.pandectone_bottom>div>span{line-height:50px;}
.pandectone_bottom{background: white;width: 90%;margin: 0 auto;margin-top: 20px;border-radius: 5px;}
.pandectone_bottom>div{height: 50px;}
</style>