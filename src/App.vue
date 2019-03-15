<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    localStorage.serverurl = 'http://192.168.10.54:8080/SD-IOT-API'
    // localStorage.serverurl = 'http://192.168.70.10/solin-consumer'
    // localStorage.serverurl = 'http://192.168.10.10:8080/SD-IOT-API'
      
    // $.ajax({
    //   type:'post',
    //   async:true,
    //   xhrFields:{withCredentials:true},
    //   url:'json/url.json',
    //   dataType:'json',
    //   success:function(data){
    //       localStorage.serverurl = data.url;
    //   }
    // })
    // $.ajax({
    //   type:'post',
    //   async:true,
    //   xhrFields:{withCredentials:true},
    //   url:'json/versionNumber.json',
    //   dataType:'json',
    //   success:function(data){
    //       localStorage.versionNumber = data.versionNumber;
    //   }
    // })
  },
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}
.el-tabs__content {
    position: absolute;
    left: 0;
    right: 0;
    top: 30px;
    bottom: 15px;
}
</style>
