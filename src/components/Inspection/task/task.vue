<template>
    <div class="task">
        <div class="task_top">
            <div @click="actives(1)" :class='active==1 ? "background" : ""'>
                <span>巡检项</span>
            </div>
            <div @click="actives(2)" :class='active==2 ? "background" : ""'>
                <span>巡检点</span>
            </div>
            <div @click="actives(3)" :class='active==3 ? "background" : ""'>
                <span>巡检线路</span>
            </div>
            <div @click="actives(4)" :class='active==4 ? "background" : ""'>
                <span>巡检计划</span>
            </div>
        </div>
        <div class="task_bottom">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'task',
    data () {
        return {
            active:4,
        }
    },
    mounted(){
        
    },
    methods:{
        actives(val){
            this.active = val;
            if(val=='1'){this.$router.push({'path':'/patrolItem'})}
            if(val=='2'){this.$router.push({'path':'/InspectionSite'})}
            if(val=='3'){this.$router.push({'path':'/InspectionRoute'})}
            if(val=='4'){this.$router.push({'path':'/PatrolPlan'})}
        }
    },
    created(){
        this.actives(4)
    }
}
</script>
<style scoped>
.task{width: 100%;height:100%;}
.task_top{width: 100%;height: 40px;background: #f5f7fa;position: relative;display: flex;justify-content: center;align-items: center;}
.task_top>div{position:relative;width: 25%;height: 100%;text-align: center;line-height: 40px;font-size: 14px;font-weight: 600;cursor: pointer;}
.background{background: #409eff;color: white;font-size: 15px;}
.task_bottom{width: 100%;width: 100%;position: absolute;top: 45px;bottom: 0;}
</style>