<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    localStorage.serverurl = 'http://192.168.10.89:8010/solin-consumer'
    // localStorage.serverurl = 'http://192.168.10.129:8010/solin-consumer'
      
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
